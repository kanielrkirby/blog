---
title: "How I Use Nix, Sops, and Gopass"
description: "... I found that while the integration between Nix and SOPS existed, and Nix and Gopass ... there was nothing for SOPS and Gopass."
date: 2024-04-16T14:00:00-06:00
image: "https://images.pexels.com/photos/3715428/pexels-photo-3715428.jpeg"
image_alt: "Photo by Soulful Pizza on Pexels"
categories: ["privacy-and-security"]
authors: ["Kaniel Kirby"]
tags: ["nix", "sops", "gopass", "passwords", "privacy", "security", "nixos", "integrations", "aws", "secrets"]
draft: false
---


## Introduction

I'm a bit of a privacy and security nut. Now, please don't mistake me for an expert. I do this in my free time, and enjoy it, but my risk profile is quite low. I did this to see what was reasonably possible for my setup, and wanted to share what I've learned.

## Let's Talk Definitions

### Nix

Nix, as you might have heard, is an operating system. Or, well, maybe a package manager. Oh, and there's the functional language it's written in, Nix. And, of course, there's flakes, and NixOps, and..

Alright, scratch that, let's start over. Nix, at it's core, is something made to declaritively do ***things***. Now whether those things include setting up your personal NeoVim configuration for other's to use, to scaling an operating system for 1000 computers, to a development environment for the work project you're working on, will largely vary on your needs. But that's probably the best description of Nix I can manage at the moment.

### SOPS

[Secure Operations](https://github.com/getsops/sops). This is a scalable method for handling your secrets, whether they're in Kubernetes, AWS, or just on your local machine. I liked this option, as it will aide me greatly in my professional life as well, and there's a direct integration for Nix called `sops-nix` ([link](https://github.com/Mic92/sops-nix) to their project).

### Gopass

[Gopass](https://github.com/gopasspw/gopass) is an open source password manager that's written in Go. It takes after the much older project, [pass](https://passwordstore.org), which gives it the great ecosystem that `pass` always had, with some added features for the CLI and API.

## Why Do This?

Well, it's a bit of a niche set of needs, but I personally love Nix. I break my system all the time out of the passion of learning how things work, and Nix suits that purpose wonderfully. SOPS is a much more enterprisey way to handle secrets, of which I have ~100 at the moment, so I was meaning to transition anyways, and Gopass provide better integration and access to secrets, through the CLI, [Browserpass](https://github.com/browserpass/browserpass-extension), and [Android Password Store](https://github.com/android-password-store/Android-Password-Store).

## How'd I Get This to Work?

Well, after some brief research, I found that while the integration between Nix and SOPS existed, and Nix and Gopass (through the `pass` module), there was nothing for SOPS and Gopass. While I would love to see a deeper integration between these two in the future, or at least better support as a user with SOPS, at the moment, I really just needed a way to port over my existing SOPS keys to a password store.

```bash
#!/bin/bash
# My path is different, as it's on NixOS

needed_commands=("sops" "yq" "gopass" "jq" "rg")

for command in "${needed_commands[@]}"; do
    if ! command -v "$command" &> /dev/null; then
        echo "Command \"$command\" not found"
        exit 1
    fi
done

force=""
args=("$@")
_args=("${args[@]}")
args=()
for arg in "${_args[@]}"; do
    if [ "$arg" = "-f" ]; then
        force="true"
    else
        args+=("$arg")
    fi
done
global_path="/home/mx/.config/password-store"
g_yaml="$(sops -d "/etc/nixos/config/secrets/secrets/primary.yaml")"

# Process each key in the JSON object recursively
function process() {
    local json="$1"
    local path="$2"

    for key in $(jq -r 'to_entries | .[] | .key' <<< "$json"); do
        inner_key="$(echo "$json" | yq -r ".\"$key\" | keys | .[0]")"
        inner_key_type="$(echo "$json" | yq -r ".\"$key\".\"$inner_key\" | type")"
        if [ "$inner_key_type" = "object" ]; then
            process "$(echo "$json" | yq -r ".\"$key\"")" "$path.\"$key\""
        else
            create_file "$path.\"$key\""
        fi
    done
}

# Create a Gopass entry using the content as YAML from the accessor
function create_file() {
    local accessor="$1"
    local basic_path
    basic_path="$(echo "$accessor" | sed 's/"."/\//g' | sed 's/^\."//' | sed 's/"$//')"
    local path
    path="$global_path/$basic_path"
    local content
    content="$(echo "$g_yaml" | yq -ry "$accessor")"
    # Password fix (remove password: prefix)
    content="$( echo "$content" | sed 's/^password: //' )"

    mkdir -p "$(dirname "$path")"
    if [ "$(gopass ls | rg "$basic_path")" != "" ]; then
        echo "File at \"$path.gpg\" already exists"
        if [ "$force" = "true" ]; then
            echo "Overwriting..."
            gopass rm -f "$basic_path"
        else
            echo "Skipping... (delete or move file, or pass -f to overwrite ALL files)"
            return
        fi
    fi
    echo "$content" | gopass insert -ma "$basic_path"
}

process "$(echo "$g_yaml" | yq -rj)"
```

## Explanation

That's a lot of Bash. Let's break it down with some pseudocode:

```py
def process(json, path) 
    for key in json 
        new_jq_path = path + "." + key
        if key.firstChild.type == "object" 
            process(json[key], new_jq_path)
        else
            create_gopass_entry(new_jq_path)
```

We make use of a recursive function to iterate through all keys, as I have a nested folder structure with Gopass, and want to properly handle that.

We use `jq`, because `yq` happens to be much slower, and it's faster to just convert the whole thing to `json` and iteratively use `yq`.

## SOPS Setup

I followed the guide on the GitHub to setup SOPS. This included setting up an `age` key, and adding the `.sops.yaml` and `secrets/primary.yaml` files. This was essentially their contents:

```yaml
# .sops.yaml
keys:
  - &primary age_key_stuff_here
creation_rules:
  - path_regex: secrets/.+\.(yaml|json|env|ini|txt)$
    key_groups:
      - age:
        - *primary

# secrets/primary.yaml
gpg:
    primary:
        key: ENC[AES256_GCM,data:...,iv:...,tag:...,type:str]
        content: ENC[AES256_GCM,data:...,iv:...,tag:...,type:str]
```

## The Nix Bits

To get this working in Nix, I simply added the script to my packages, as well as the SOPS module and configuration options:

```nix
{ config, pkgs, inputs, ... }:

{
    # import might be different, depending on how you installed SOPS and Nix
    imports = [ inputs.sops-nix.nixosModules.sops ];
  
    sops.secrets."gpg/primary/content" = { };
    sops.secrets."gpg/primary/key" = { };
  
    # Set up my password for NixOS securely

    sops.secrets."login/nixos/password".neededForUsers = true;
    users.users."${username}" = {
      hashedPasswordFile = config.sops.secrets."login/nixos/password".path;
    };
  
    sops.age.keyFile = "/home/${username}/.config/sops/age/keys.txt";
    sops.defaultSopsFile = ../secrets/secrets/primary.yaml;
    sops.defaultSopsFormat = "yaml";


    environment.systemPackages = with pkgs; [
        jq
        yq
        gopass
        rg
        (pkgs.writeShellScriptBin "sops-to-gopass" {
           # ... Previous script here
           # Before running process, add in the following to ensure GPG is found
           if [ "$(gpg --list-secret-keys | rg "$(sudo -E cat ${sops.secrets."gpg/primary/key"}")" ]; then
            sudo -E gpg --import ${sops.secrets."gpg/primary/content"}
          fi

          # This checks in the places in SOPS where our GPG key is, decrypts it, and loads it in
         })
    ];
}
```

## Conclusion

Now, if I wanted to add this on startup, I'd just add a systemd service with it, or something like that. This was a solution I came up with for my personal system, as I needed the ease-of-use of Gopass in my day-to-day, with the additional benefits of scalability in SOPS.
