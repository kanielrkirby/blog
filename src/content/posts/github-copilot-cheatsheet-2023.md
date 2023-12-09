---
title: "GitHub Copilot Cheatsheet (2023)"
description: "A cheatsheet for the most important and useful tools that GitHub Copilot has to offer."
date: 2023-12-4T14:00:00-06:00
image: "/images/posts/github-copilot-cheatsheet-2023/pexels-negative-space-97077.jpg"
image_alt: "Photo by Negative Space: https://www.pexels.com/photo/pink-white-black-purple-blue-textile-web-scripts-97077/"
categories: ["productivity", "ai", "cheatsheet"]
authors: ["Kaniel Kirby"]
tags: ["ai", "productivity", "github", "copilot", "cheatsheet"]
draft: false
---

---

## Table of Contents

- [Why you need a cheatsheet](#why-you-need-a-cheatsheet)
- [Quick Summary](#quick-summary) (pick this if you're in a hurry)
- [GitHub Copilot](#github-copilot)
- [GitHub Copilot for CLI](#github-copilot-for-cli)
- [Codebase Visualization Prototype](#codebase-visualization-prototype)
- [Things We Can't Do Yet, But To Look Forward To](#things-we-cant-do-yet-but-to-look-forward-to)
  - [GitHub Copilot for PRs (Enterprise only)](#github-copilot-for-prs-enterprise-only)
  - [GitHub Copilot Voice](#github-copilot-voice)
  - [GitHub Copilot for Docs](#github-copilot-for-docs)
  - [GitHub Coipilot for **your** codebase](#github-coipilot-for-your-codebase)

---

## Why you need this cheatsheet

This will help speed up development processes in terms of the shell / git, codebase visualization, and newer tools that may be coming out soon.

## Quick Summary

You should consider using:
- [GitHub Copilot](https://github.com/settings/copilot/) ($10/month) - AI pair programmer that helps you write code faster using "ghost text" suggestions.
- [GitHub Copilot for CLI](https://githubnext.com/projects/copilot-cli/) (comes with Copilot) - Get suggestions and explanations for shell commands and `git` / `gh` commands.
- [VSCode Extension for Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) (comes with Copilot) - Better features than regular Copilot, as it has a Copilot Chat, and "brushes" that help you easily add tests, documentation, types, etc.
- [Codebase Visualization Prototype](https://github.com/githubocto/repo-visualizer) (free) - Easily visualize your entire codebase instantly.

### GitHub Copilot

GitHub Copilot is an AI pair programmer that helps you write better code. It's trained on billions of lines of public code, so you can get suggestions based on what millions of developers are already using.

In VSCode, you get better features, as it has a Copilot Chat, and "brushes" that help you easily chat about and edit code.

**Setup:**

- [Buy at $10/month for personal use](https://github.com/settings/copilot/)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

**Usage:**

- Now you should be able to write code, and see suggestions from Copilot inline in "ghost text".
- You can use the "brushes" to add tests, documentation, types, etc.
- You can use Copilot Chat, which is like ChatGPT, but for code and in the context of your codebase.

### GitHub Copilot for CLI

Get advice for shell commands, git commands, and explanations for commands.

**Setup:**

- `gh` - GitHub CLI. You'll need to install this first in the terminal.
- `gh copilot` - GitHub Copilot CLI.
  - Install with `gh extension install github/gh-copilot`
  - Set an alias with anything, like `alias copilot="gh copilot"`

**Usage:**

- `gh copilot suggest [requirement] -t [git|gh|shell]` - Suggests a command.
  - `gh copilot suggest "create a new branch" -t git`: `git checkout -b [branch-name]`
  - `gh copilot suggest "clone the oldest commit" -t git`: `git checkout $(git rev-list --max-parents=0 HEAD)`
  - `gh copilot suggest "make a directory and cd into it" -t shell`: `mkdir new_directory && cd new_directory`
- `gh copilot explain [command]`: Explains a command.
  - `gh copilot explain "git checkout -b [branch-name]"`: `git checkout -b [branch-name]` creates a new branch named `[branch-name]` and switches to it.
  - `gh copilot explain "tail -f [file]"`: `tail -f [file]` is used to continuously display the last lines of a file and follow any new lines that are added. `-f` option stands for "follow", which means it will keep reading the file and append any new data that is written to it.

### Codebase Visualization Prototype

Easily visualize your entire codebase instantly. This is mostly useful to see where the bulk of the code is, and really understand a codebase by seeing the relationships of files and folders.

- There is a free view of the tool, [here](https://mango-dune-07a8b7110.1.azurestaticapps.net/?repo=paperjs%2Fpaper.js).
- And you can set up for your project [here](https://github.com/githubocto/repo-visualizer).

---

## Things To Look Forward To

### GitHub Copilot for PRs (Enterprise only)

Easily summarize PRs, get suggestions, make changes, review, add tests, etc., all from the issue page with commands.

**Setup:**

- [GitHub Copilot for PRs](https://githubnext.com/copilot-for-pull-requests/).
- It's enterprise only, and you have to sign up for a waitlist [here](https://github.com/github-copilot/copilot_enterprise_waitlist_signup) with the organization.
- After this, it should be on the website when you are working on PRs or issues.

**Usage:**

- You send comments in the issue thread, using `/` commands and `copilot:` commands.
- `/prbot` - Used to give commands to the PR related bot.
  - `/prbot how` - Helps flesh out how to fix an issue.
  - `/prbot suggest` - Suggests real code changes.
  - `/prbot describe` - Describes the changes in the PR.
  - `/prbot review` - Reviews the PR and gives suggestions.
- `copilot:` - Used to give Copilot specific commands while writing out the PR or issue.
  - `copilot:summary` - Expands to a one-paragraph summary of the changes in the PR.
  - `copilot:walkthrough` expands to a detailed list of changes, including links to the relevant pieces of code.
- Gentest - Generates tests for the code in the PR.
- Ghost-Text (coming) - Copilot-like suggestions for when you're writing the PR.

### GitHub Copilot Voice

Will allow you to talk to Copilot and have it write code for you. They're still working on this, and it's on a waitlist for preview.

### GitHub Copilot for Docs

I am not totally sure when or where this comes out, as I couldn't find a real link anywhere, but it should make writing documentation a lot better.

### GitHub Copilot for **your** codebase

Should allow you to train Copilot based on your specific codebase, so it can give you better suggestions.
