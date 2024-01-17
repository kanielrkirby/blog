---
title: "Git - Overview"
description: "Git is a robust version control system. But what all can you do with it?"
date: 2024-01-18T14:00:00-06:00
image: "/images/posts/git-overview/git-logo.jpg"
image_alt: "Git Logo"
categories: ["git", "github"]
authors: ["Kaniel Kirby"]
tags: ["git", "github", "overview", "tutorial", "beginner", "version-control", "source-control"]
draft: false
---

Knowing what a tool is capable of is more important than knowing the fine details of every feature. Having a good mental model of what a tool can do will help you use it more effectively, and leverage it to its full potential.

This is the first entry in my Git / GitHub series. This will be an overview of the rest of the series.

## What is Git?

In the "before times", developers would opt for large, complex version control systems such as Subversion (SVN) or Perforce. These systems were very powerful, but they were also very complex. They required a server to be set up, and a lot of configuration to get working. They were also very slow, and didn't work well with distributed teams.

So, many developers wouldn't even bother with version control. They would just copy and paste their code into a folder with the date and time, and call it a day, which of course led to loss of code, and a lot of headaches.

Git was created to solve these problems. It was created by Linus Torvalds, the creator of Linux, to help manage the development of the Linux kernel. It was designed to be fast, distributed, and easy to use. In other words, it was designed to be the opposite of SVN.

## Alright... So what can I do with Git?

While Git's primary focus is version control, it can do a lot more than that, relating to most steps in the version control process. Speaking of that...

### Version Control

Fundamentally, Git is a version control system. It allows you to track changes to your code over time. This allows you to easily revert to a previous version of your code if you make a mistake, or if you want to go back to a previous version for any other reason.

### Source Control

Git is also a source control system. It allows you to collaborate with others on your code. You can work on the same code at the same time, and Git will automatically merge your changes together. If there are any conflicts, Git will let you know, and allow you to resolve them.

### Backup

A good backup solution allows you to store your code in a remote location, so that if your computer crashes, or your hard drive dies, you won't lose your code. You can also use it to store your code in multiple locations, so that if one location goes down, you can still access your code from another location.

### Deployment

Through Git hooks, you can automatically deploy your code to a server whenever you push to a certain branch. This allows you to easily deploy your code to a production server, or a staging server, or any other server you want, even checking for errors before deploying.

### Migrating From Other Version Control Systems

Git has built-in tools to help you migrate from other version control systems, such as SVN, Arch, and CVS. This allows you to easily migrate your code from one version control system to Git.

### Rewriting History Recursively

Git has a feature called "rebase", which allows you to rewrite history recursively. This allows you to rewrite the history of your code, and change the order of commits, or even remove commits entirely.

## And what is GitHub?

If Git is the storage container, GitHub is the warehouse. GitHub is a website that hosts Git repositories. It's a place where you can store your code, and collaborate with others. It's also a place where you can find other people's code, and contribute to it.

GitHub is not the only website that hosts Git repositories. There are many others, such as GitLab, BitBucket, and Azure DevOps. However, GitHub is the most popular, and the one I will be using for this series.

## What's so special about GitHub?

GitHub helps to fill in the gaps that Git itself can't cover. Why doesn't it? Well, Git follows the Unix philosophy of "do one thing and do it well". It's a version control system, and that's it. It doesn't do anything else. It doesn't have any features that aren't related to version control in some substantial way.

### Issue Tracking

The primary feature that hosts like GitHub provide is issue tracking. This allows you to create issues for your code, and assign them to people, so that they can work on them. You can also use it to track bugs, feature requests, and other things.

### Projects and Milestones

GitHub also provides a feature called "projects", which allows you to create projects for your code, and assign them to people, so that they can work on them. You can also use it to track milestones, and other things, to help keep track of progress.

### Discussions

GitHub also provides a place for discussions about the codebase for people to get assistance with things that aren't necessarily requests or bugs.

### GitHub Actions

GitHub Actions is like a CI/CD pipeline, but it's built into GitHub. It allows you to run tests, build your code, and deploy it to a server, all from within GitHub. This is a very powerful feature, and it's one of the main reasons why GitHub is so popular. It helps to protect your code from bugs, and it helps to ensure that your code is always up-to-date, automating the process of deploying your code to a server.

### GitHub Packages

GitHub Packages is a package manager for GitHub. It allows you to publish packages to GitHub, and install packages from GitHub for things like Node.js, Ruby, and Python.

### GitHub CLI

GitHub CLI is a command-line interface for GitHub. It allows you to do things like create issues, create pull requests, and merge pull requests, all from the command line, without having to use the GitHub website.

### GitHub Copilot

GitHub has actually recently shifted from being the "version control" platform, to being the "AI" platform. GitHub Copilot is an AI that can help you write code. It can suggest code for you, and it can explain code to you. So far, after testing several different ones, this one is the best one I've found.

And so much more...

### Conclusion

To sum up, Git is more than just a version control system; it's a versatile tool essential for modern software development. It simplifies tracking changes, collaborating on code, backing up projects, and streamlining deployments. GitHub enhances this experience by offering additional features like issue tracking, project management, automated workflows with GitHub Actions, and AI-powered coding assistance with GitHub Copilot. Together, Git and GitHub form a powerful ecosystem that supports developers in efficiently managing and evolving their software projects.
