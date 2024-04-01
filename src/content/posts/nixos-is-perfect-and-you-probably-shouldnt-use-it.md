---
title: "NixOS is Perfect, but You Probably Shouldn't Use It"
description: "At least as a beginner in Linux, general programming, or troubleshooting."
date: 2024-04-10T14:00:00-06:00
image: "https://images.pexels.com/photos/1424745/pexels-photo-1424745.jpeg"
image_alt: "Photo by Hasan Albari on Pexels"
categories: ["nix"]
authors: ["Kaniel Kirby"]
tags: ["nixos", "nix", "linux", "operating-systems", "package-management"]
draft: false
---

At least as a beginner in Linux, general programming, or troubleshooting.

## Introduction

As a preface, I love NixOS. It's ability to rollback to snapshots easily, and declaritively write out my entire configuration perfectly suits my style.

But I make a habit of breaking my system. I ***need*** something in which I can easily restore, iterate, and upgrade my system easily.

I value the reproducibility, flexibility, and simplicity of NixOS. If you move to MacOS, you can take much of your configuration. If you factory reset your PC, you can guarantee that with the same configuration file, you'll get the same system, ***especially if you're pinning your versions down***. And with Git, you can back up essentially your entire computer's state.

With all that said, there's a few reasons I don't think learning NixOS as a beginner is a good idea.

## Nix is a Bespoke, Functional Programming Language

That is to say, there's a bit of a steep learning curve, and it's only really useful for Nix-related things. This serves Nix well, allows more flexible configurations by default, but for someone just getting into programming, this just isn't ideal.

## Skills in Nix Aren't Transferable

When you learn Linux, any distro, you learn how Linux itself works, between general package management, systemd, or just how different concepts work.

When you learn Nix, you are learning an abstraction. And that's okay. It can speed up setup, moves all configurations to one spot, and allows easy iteration. But for a beginniner to Linux, you're not learning about how these things work under the hood, and therefore aren't learning how something as fundamental as Linux actually works.

This can be a hinder you growth and education pretty easily, making getting started a bit harder, and less transferable to other domains.

## There's a Complicated History

Nix has been around long enough to come up with several opposing ideas. An example of this is `nix-env` vs `nix-shell` vs `nix shell` vs `nix develop`. You almost need to understand the whole history of Nix just to get started with these ideas, and that's excluding flakes! (No one understands flakes though)

## Nix Documentation is Significantly Lacking

With all of this extra complexity, through the history, and abstractions, and the language itself, you would hope (or rather, expect) that things would be well documented. Unfortunately, this is not the case with NixOS.

As a beginner, you're going to need to learn to read documentation. That's true for anything. But with Nix, you have to learn to scour the web for information, looking through forum, GitHub issues, articles, and sometimes (but only sometimes) the official NixOS documentation.

This is actually pretty intimidating. It's hard to know for sure that you aren't missing something important, or that you aren't doing things in an outdated fashion. This makes learning Nix ***that*** much more difficult.

## Conclusion

I think Nix is great. I know enough about Linux and programming to be able to look around for what I need, and make some general assumptions. But when I first started learning Nix, I was ***not*** ready for it, and it showed.

All that to say, if you are ***new***, stick with a normal Linux distribution. And if you want to take on a challenge, one that allows guarranteed reproducibility, declarive configurations, and flexibility, then you should try Nix.

Hope you enjoyed this read, and happy hacking!
