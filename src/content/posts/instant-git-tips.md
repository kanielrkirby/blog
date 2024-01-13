---
title: "Instant Git Tips"
description: "Git is super powerful, but it can be hard to remember all the commands. Here are some of my favorite git tips compressed into a few minutes."
date: 2024-01-16T14:00:00-06:00
image: "/images/posts/instant-git-tips/git-logo.jpg"
image_alt: "Photo by robokoboto on https://alphacoders.com/users/profile/69089/robokoboto"
categories: ["git"]
authors: ["Kaniel Kirby"]
tags: ["git", "tips", "tricks", "github", "version-control", "source-control"]
draft: false
---

## Basics

These are the commands that you'll use every day.

- `git init` - Initialize a git repository
- `git add .` - Add all files to the staging area
- `git commit -m "Commit message"` - Commit all staged files with the given message
- `git push` - Push all commits to the remote repository
- `git status` - Show the current status of the repository

## Branching

Branching is a powerful feature of git that allows you to work on multiple features at once, without affecting the main branch.

- `git branch` - List all branches
- `git branch <branch-name>` - Create a new branch
- `git checkout <branch-name>` - Switch to the given branch
- `git checkout -b <branch-name>` - Create a new branch and switch to it
- `git merge <branch-name>` - Merge the given branch into the current branch
- `git branch -d <branch-name>` - Delete the given branch

## Remotes

Remotes are the remote repositories that you push to and pull from, i.e. GitHub, GitLab, BitBucket, etc.

- `git remote add <remote-name> <remote-url>` - Add a new remote with the given name and url (probably the only one you'll use)
- `git remote -v` - List all remotes with their urls
- `git push <remote-name> <branch-name>` - Push the given branch to the given remote
- `git pull <remote-name> <branch-name>` - Pull the given branch from the given remote

## Advanced

These are some of the more advanced commands that you'll use less often, but are still very useful.

- `git cherry-pick <commit-hash>` - Apply the given commit to the current branch
- `git rebase <branch-name>` - Rebase the current branch onto the given branch
- `git reset --hard <commit-hash>` - Reset the current branch to the given commit
- `git revert <commit-hash>` - Revert the given commit
- `git stash` - Stash all changes
- `git stash pop` - Apply the most recent stash

## Typical Workflows

### Starting a new feature

```bash
git checkout -b "<branch-name>"    # Create a new branch and switch to it
                                   # ... Make changes ...
git add .                          # Add all changes to the staging area
git commit -m "Commit message"     # Commit all staged changes
git push -u origin "<branch-name>" # Push the branch to the remote
git checkout main                  # Switch back to the main branch
git branch -d "<branch-name>"      # Delete the branch locally (if you're done with it)
```

### Removing a file from the last commit

```bash
git reset --soft HEAD~1            # Reset the last commit, but keep the changes
git reset "<file-name>"            # Remove the given file from the staging area
git commit -m "Commit message"     # Commit the changes again
git push                           # Push the changes to the remote
```

### Undoing a commit

```bash
git revert "<commit-hash>"         # Revert the given commit
git push                           # Push the changes to the remote
```

### Squashing commits into one

```bash
git rebase -i HEAD~3               # Rebase the last 3 commits
                                   # ... Change the first two commits to "squash" ...
git push --force-with-lease        # Force push the changes to the remote (safer than --force)
```

### Stashing changes

```bash
git stash                          # Stash all changes
                                   # Switch to a different branch, or do whatever you need to do
git stash pop                      # Apply the most recent stash
```

## Something I should mention...

GitHub CLI has an AI "Copilot" that is built into the shell, which you can easily alias to `? "some goal"` (or anything really), and it will show you how to achieve that in the shell using shell commands, `git`, and `gh`. It's super useful, and I use it all the time. Just make sure you know what it's *actually* doing before you run something potentially dangerous on your repository.

To install it, just make sure you have `gh` installed and have a subscription to GitHub CLI. Then:

```bash
# Install the copilot
gh extension install github/gh-copilot

# Put this in your .bashrc or .zshrc (with whatever alias you want, these are mine)
alias "?"="gh copilot suggest"
alias "??"="gh copilot explain"

# Reload your shell
source ~/.zshrc (or ~/.bashrc)

# Use it!
? "some goal"
?? "some fancy command"
```

## Conclusion

Git is a very powerful tool, and these are just a few of the commands that you'll use every day. If you want to learn more, check out [Git's documentation](https://git-scm.com/docs).
