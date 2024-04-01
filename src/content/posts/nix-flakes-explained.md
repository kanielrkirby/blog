---
title: "Nix Flakes Explained"
description: "Here, I'll explain Nix Flakes in depth, going over the syntax and common use-cases as best as I can."
date: 2024-04-04T14:00:00-06:00
image: "/images/posts/"
image_alt: ""
categories: ["nix"]
authors: ["Kaniel Kirby"]
tags: ["nixos", "nix", "linux", "operating-systems", "package-management", "flakes"]
draft: true
---

## Introduction

Normally, as a developer, when you need a reliable, reproducible environment,
you think "Virtual Machines", "Docker Containers", and sometimes even "Vagrant".
These solutions all have their purpose, and their short-comings.

But, when dealing with the complexities of actually installing the packages you
need, in a reproducible way, there seems to be a gap. Standard package managers
are... just ***okay***.

Don't get me wrong, they serve as a great solution to the problems they aim to
solve (to let ***users*** install packages quickly and easily). It just happens
to be that these are not the problems that ***developers*** need solved.

## Enter Nix

Nix fills in the gap that is DevOps-leaning developers who need an easy way to
deploy consistent, exact builds without shooting themselves in the foot with
something like snapshotting operating system state with Docker.

For example, let's use `zsh` as an example. First, I'll need to enable / install
it. This is easy, but there are a few ways of going about this. I can simply add
the package to my path, but then I won't be able to configure it as easily. I
could also use the `programs.zsh` option to pass some configurations, but by
far, the best option is to use the Home Manager options. For example:

```nix
home-manager.users.mx = {
    programs.zsh = {

        # Installs and adds ZSH to path
        enable = true;

        # Enables several ZSH plugins you would otherwise need to source
        enableAutosuggestions = true;
        syntaxHighlighting.enable = true;
        enableCompletion = true;

        # Declaring all your regular aliases and functions
        initExtra = ''
        alias vim="nvim"
        rebuild() {
            nixos-rebuild --flake /etc/nixos#nixos "@$"
        }
        '';
    };
};
```

I can also add upon this by adding files into my `$XDG_CONFIG_HOME` and sourcing
them declaritively:

```nix
xdg.configFile."zsh/catppuccin_mocha.zsh".source =
  "${pkgs.fetchFromGitHub {
    owner = "catppuccin";
    repo = "zsh-syntax-highlighting";
    rev = "master";
    sha256 = "sha256-Q7KmwUd9fblprL55W0Sf4g7lRcemnhjh4/v+TacJSfo=";
  }}/themes/catppuccin_mocha-zsh-syntax-highlighting.zsh";

home-manager.users.mx = {
    programs.zsh = {
        initExtra = ''
          source ${config.xdg.configHome}/zsh/catppuccin_mocha.zsh
        '';
    };
};
```

## I Thought This Article Was About Flakes?

It is. And with all this functionality, you might be wondering why you'd ever
need anything else. You usually have packages built in, you can tweak a few
options and manually download and symlink things you can't find (as we did
above).

But what happens when you install this for the first time again? We honestly
can't know, because all you said was `programs.zsh.enable = true;`. This is
where flakes come in. They encourage you to set what you download ***exactly***.
Not just a randdom version of Nix, with a random version of ZSH (if ZSH is what
you're concerned about). And not just the most updated. The ***exact*** commit
in which you first installed it is saved in a `flake.lock` file, so no matter
who you send this magical flake to, they will have the same versions.

This is the primary benefit of flakes. Instead of juggling `master` branches and
hoping they are compatible this week like they were last week, you set Nix to 
a specific version and commit, and install things building on top of that.

This provides the primary thing that is so hard to get when working with the
various other packaging solutions out there. Guaranteed package reproducibility.

## Alright, Let's Get Into Specifics

Typically, you'll use the Nix language to configure things. You're essentially
constructing a big object, and occasionally you'll want to calculate something.
Declaring `fzf.colors.bg` in one file, and importing another file that declares
`fzf.colors.fg` will result in them being combined into one. That's why the 
following works:

```nix
# fzf-1.nix
programs.fzf = {
    colors = {
        "bg+" = "#313244";
         bg = "#1e1e2e";
         spinner = "#f5e0dc";
         hl = "#f38ba8";
         fg = "#cdd6f4";
         header = "#f38ba8";
    };
};

# fzf-main.nix
imports = [
  ./fzf-1.nix
];

programs.fzf = {
    colors = {
        info = "#cba6f7";
        pointer = "#f5e0dc";
        marker = "#f5e0dc";
        "fg+" = "#cdd6f4";
        prompt = "#cba6f7";
        "hl+" = "#f38ba8";
    };
};

# interpretted as:
programs.fzf = {
    colors = {
        "bg+" = "#313244";
        bg = "#1e1e2e";
        spinner = "#f5e0dc";
        hl = "#f38ba8";
        fg = "#cdd6f4";
        header = "#f38ba8";
        info = "#cba6f7";
        pointer = "#f5e0dc";
        marker = "#f5e0dc";
        "fg+" = "#cdd6f4";
        prompt = "#cba6f7";
        "hl+" = "#f38ba8";
    };
};
```

However, ***this*** will not:

```nix
programs.fzf = {
    colors = {
        bg = "#1e1e2e";
    };
};

programs.fzf = {
    colors = {
        bg = "#ffffff";
    };
};
```

This is because Nix doesn't allow duplicate values for datatypes that aren't
attribute sets or arrays.
