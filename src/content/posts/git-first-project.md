---
title: "Git - First Project"
description: "Git. That scary thing you should probably know. But it really isn't that scary. Let's start small."
date: 2024-01-22T14:00:00-06:00
image: "/images/posts/git-first-project/Dev Photos Ivan Samkov.jpg"
image_alt: "Photo by Ivan Samkov: https://www.pexels.com/photo/handwritten-people-desk-laptop-7213438/"
categories: ["git", "github"]
authors: ["Kaniel Kirby"]
tags: ["git", "github", "overview", "tutorial", "beginner", "version-control", "source-control", "first-project"]
draft: true
---

---

Git. That scary thing you should probably know. But it really isn't that scary. Let's start small. It's easy to get started.

## Making a Local Repository

First, you need to make a local repository. This is where you will store your code and changes. You can do this by running `git init` in the directory you want to store your code in. This will create a `.git` folder in that directory, which will store all of your code.

```bash
mkdir my-first-project
cd my-first-project
git init
```

## GitHub Setup

You'll need a GitHub account (or similar) to do this. If you don't have one, you can create one [here](https://github.com/join). Remember your username and password, you'll need them later.

Once you have an account, you'll need to authenticate your Git client with your GitHub account. Make sure you have the [GitHub CLI](https://github.com/cli/cli) installed, and run the following:

```bash
gh auth login
```

Then just follow the prompts.

Now, you'll need to create a repository on GitHub. You can do this by clicking the "New" button on the [repositories page](https://github.com/repositories/new), or by clicking the "+" button in the top right corner of the page. You can also stay in the CLI instead of going to the website:

```bash
gh repo create . --public
```

This will also save the repo on GitHub in the current state.

## The Staging Area

At the moment, this repository is completely empty. Let's add some files to it.

```bash
touch index.html
touch style.css
touch complicated.js
```

Now that we have some files, let's add them to the staging area. Git has no idea what these files are, so we need to tell it to track them. We can do this with the `git add` command.

```bash
git add index.html
git add style.css
git add complicated.js

# or, if you want to add all files in the current directory
git add .
```

## Committing

Now that we have added our files to the staging area, we can commit them. This will save the current state of the files in the staging area to the repository. We can do this with the `git commit` command.

```bash
git commit
```

This will open up a text editor, where you can enter a commit message. This is a message that describes the changes you made in this commit. It should be short, but descriptive. For example, if you added a new feature, you could say "Added new feature". If you fixed a bug, you could say "Fixed bug". If you added a new feature and fixed a bug, you could say "Added new feature and fixed bug". You get the idea.

<details>
  <summary><strong>Pro Tip</strong></summary>
  <p>
    If you want to skip the text editor, you can use the <code>-m</code> flag to specify a commit message. For example, <code>git commit -m "Added new feature"</code>.
  </p>
</details>

<p></p>

<details>
  <summary><strong>About the Editor</strong></summary>
  <p>
     The editor defaults to Vim, so you'll need to know how to use Vim. Press `i` to enter insert (or regular) mode, and type your message. Press `Esc` to exit insert mode, and type `:wq` to save and exit. You can also set it to use a different editor, such as VS Code, by running `git config --global core.editor "code --wait"`.
  </p>
</details>

## Pushing

This is where the saved changes leave your machine, and go to a remote repository. This is usually a website, such as GitHub, GitLab, or BitBucket. This allows you to collaborate with others on your code, and keep a backup of your code in case your computer crashes.

```bash
git push --set-upstream origin main
```

You may not have to run `--set-upstream origin main` if you are using GitHub CLI, as it will automatically set the upstream for you when running `gh repo create . --public`.

## Pulling

This is where the saved changes leave the remote repository, and come to your machine. This allows you to get the latest changes from the remote repository, and keep your local repository up-to-date.

Let's head to the GitHub website, and make some changes to our code. We'll add a new file, `README.md`, and add some text to it. Then, we'll commit the changes on GitHub. Just press the "Commit changes" button, and you're done.

Head back to your terminal, and run the following:

```bash
git pull
```

This will fetch the changes from the remote repository, and merge them with your local repository. You should now see the `README.md` file in your local repository.

## Conclusion

That's it! You've just created your first Git repository, and pushed it to GitHub. You can now collaborate with others on your code, and keep a backup of your code in case your computer crashes.

---

I hope you enjoyed this read! Check out my [Git - Under the Hood](/posts/git-under-the-hood) post for a more in-depth look at how Git works!
