---
title: "Git - Cheatsheet"
description: "Git is so expansive that it's hard to cover everything in a single blog post. However, as promised, here's the cheatsheet."
date: 2024-01-20T14:00:00-06:00
image: "/images/posts/git-cheatsheet/git-logo.webp"
image_alt: "Git Logo"
categories: ["git", "github"]
authors: ["Kaniel Kirby"]
tags: ["git", "github", "overview", "tutorial", "beginner", "version-control", "source-control", "cheatsheet"]
draft: false
---

If you need a refresher on what Git is, check out my [Git - Overview](/posts/git-overview) post. Otherwise, let's get started!

### Absolutely Necessary Basics

- `init` - Create a new Git repository
  ```bash
  git init "<directory>" # Create a new Git repository in the specified directory (default: current directory)
  ```
- `clone` - Clone a Git repository to your local machine
  ```bash
  git clone "<url>"               # Clone a Git repository from the specified URL
  git clone "<url>" "<directory>" # Clone a Git repository from the specified URL into the specified directory
  ```
- `add` - Add files to the staging area
  ```bash
  git add "<file>" # Add the specified file to the staging area
  git add .        # Add all files in the current directory to the staging area
  ```
- `commit` - Commit changes in the staging area
  ```bash
  git commit                # Commit the changes in the staging area
  git commit -m "<message>" # Commit the changes in the staging area with the specified message
  ```
- `push` - Push changes to a remote repository
  ```bash
  git push                          # Push the changes in the current branch to the remote repository
  git push -u "<remote>" "<branch>" # Push the changes in the current branch to the specified remote repository and branch
  ```
- `pull` - Pull changes from a remote repository
  ```bash
  git pull                       # Pull the changes from the remote repository into the current branch
  git pull "<remote>" "<branch>" # Pull the changes from the specified remote repository and branch into the current branch
  ```
- `status` - Show the status of the working tree
  ```bash
  git status # Show the status of the working tree
  ```
- `branch` - Manage branches
  ```bash
  git branch             # List all branches
  git branch "<name>"    # Create a new branch with the specified name
  git branch -d "<name>" # Delete the branch with the specified name
  git branch -m "<name>" # Rename the current branch to the specified name
  ```
- `checkout` - Switch branches
  ```bash
  git checkout "<name>"    # Switch to the branch with the specified name
  git checkout -b "<name>" # Create a new branch with the specified name and switch to it
  ```

### Commands You'll Need to Know Eventually

- `log` - Show the commit history
  ```bash
  git log           # Show the commit history
  git log --oneline # Show the commit history with each commit on a single line
  ```
- `fetch` - Download objects and refs from another repository
  ```bash
  git fetch # Fetch the changes from the remote repository
  ```
- `merge` - Merge branches
  ```bash
  git merge "<name>" # Merge the branch with the specified name into the current branch
  ```
- `stash` - Stash the changes in a dirty working directory away
  ```bash
  git stash     # Stash the changes in the working directory
  git stash pop # Apply the last stash and delete it from the stash list
  ```
- `reset` - Reset the working tree
  ```bash
  git reset        # Reset the working tree to the last commit
  git reset --hard # Reset the working tree to the last commit and discard all changes
  ```
- `revert` - Revert commits
  ```bash
  git revert "<commit>" # Revert the specified commit
  ```
- `diff` - Show changes between commits, commit and working tree, etc
  ```bash
  git diff                       # Show the changes between the working tree and the last commit
  git diff "<commit>"            # Show the changes between the working tree and the specified commit
  git diff "<commit>" "<commit>" # Show the changes between the two specified commits
  ```
- `remote` - Manage remote repositories
  ```bash
  git remote                      # List all remote repositories
  git remote add "<name>" "<url>" # Add a new remote repository with the specified name and URL
  git remote remove "<name>"      # Remove the remote repository with the specified name
  ```
- `rebase` - Reapply commits on top of another base tip
  ```bash
  git rebase "<branch>" # Rebase the current branch on top of the specified branch
  ```
- `tag` - Create, list, delete or verify a tag object signed with GPG
  ```bash
  git tag             # List all tags
  git tag "<name>"    # Create a new tag with the specified name
  git tag -d "<name>" # Delete the tag with the specified name


  ```
- `show` - Show various types of objects
  ```bash
  git show            # Show the last commit
  git show "<commit>" # Show the specified commit
  ```

### Extras You Might Want to Know

- `rm` - Remove files from the working tree and from the index
  ```bash
  git rm "<file>" # Remove the specified file from the working tree and from the index
  ```
- `mv` - Move or rename a file, a directory, or a symlink
  ```bash
  git mv "<source>" "<destination>" # Move the specified source file to the specified destination
  ```
- `clean` - Remove untracked files from the working tree
  ```bash
  git clean # Remove untracked files from the working tree
  ```
- `gc` - Cleanup unnecessary files and optimize the local repository
  ```bash
  git gc # Cleanup unnecessary files and optimize the local repository
  ```
- `config` - Get and set repository or global options
  ```bash
  git config                             # List all options
  git config --global "<name>" "<value>" # Set the specified option globally
  git config --local "<name>" "<value>"  # Set the specified option locally
  ```
- `help` - Display help information about Git
  ```bash
  git help             # Display help information about Git
  git help "<command>" # Display help information about the specified command
  ```

### Great GitHub CLI Commands That Will Speed Up Your Workflow

- `gh auth` - Login, logout, and refresh your authentication
  ```bash
  gh auth login   # Login to GitHub
  gh auth logout  # Logout of GitHub
  gh auth refresh # Refresh your authentication
  ```
- `gh repo` - Create, clone, fork, and view repositories
  ```bash
  gh repo create # Create a new repository
  gh repo clone  # Clone a repository
  gh repo fork   # Fork a repository
  gh repo view   # View a repository
  ```
- `gh pr` - Create, view, and checkout pull requests
  ```bash
  gh pr create   # Create a new pull request
  gh pr view     # View a pull request
  gh pr checkout # Checkout a pull request
  ```
- `gh issue` - Create, view, and checkout issues
  ```bash
  gh issue create   # Create a new issue
  gh issue view     # View an issue
  gh issue checkout # Checkout an issue
  ```
- `gh run` - View and manage GitHub Actions workflow runs
  ```bash
  gh run list  # List all workflow runs
  gh run view  # View a workflow run
  gh run watch # Watch a workflow run
  ```
- `gh secret` - Manage GitHub Actions secrets
  ```bash
  gh secret list   # List all secrets
  gh secret set    # Set a secret
  gh secret remove # Remove a secret
  ```
- `gh workflow` - View and manage GitHub Actions workflows
  ```bash
  gh workflow list # List all workflows
  gh workflow view # View a workflow
  gh workflow run  # Run a workflow
  ```

### You Can Also Use AI to Get Suggestions!

- `gh copilot` - Get suggestions and explanations for shell commands
  ```bash
  gh extension install github/gh-copilot # Install the GitHub Copilot extension
  gh copilot suggest                     # Get a suggestion for a shell command
  gh copilot explain                     # Explain a shell command
  ```

Some examples...

- `gh copilot suggest "How to cherry-pick a commit into a branch"`:
  ```bash
  git checkout "<branch>"    # Switch to the specified branch
  git cherry-pick "<commit>" # Cherry-pick the specified commit
  ```
- `gh copilot explain "git checkout -b "<branch>""`:
  ```bash
  git checkout -b "<branch>" # Create a new branch with the specified name and switch to it
  ```

I also like to alias `gh copilot suggest` to `?` and `gh copilot explain` to `??`:

```bash
alias "?"="gh copilot suggest"
alias "??"="gh copilot explain"
```

### Conclusion

This is just a cheatsheet, and a very basic overview of what Git and GitHub can do. In a future post, I'll go over the confusing underlying functionality of Git, and how it works under the hood.
