---
title: "Getting Started with Neovim"
description: "I found NeoVim a little over half a year ago, and have fallen in love with it. Here, I want to show you why, and how to get started with it."
date: 2023-11-26T14:00:00Z
image: "/images/posts/getting-started-with-neovim/pexels-pixabay-207580.jpg"
image_alt: "Photo by Pixabay: https://www.pexels.com/photo/blur-bright-business-codes-207580/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "neovim", "vim", "text editor", "terminal", "cli", "command line", "linux", "unix", "productivity", "lua", "plugins", "configuration"]
draft: false
---

I found NeoVim a little over half a year ago, and have fallen in love with it. Here, I want to show you why, and how to get started with it.

## Table of Contents

- [Why NeoVim?](#why-neovim)
- [Setup](#setup)
- [Cheat Sheet](#cheat-sheet)
- [Modes](#modes)
- [Configuration](#configuration)
- [Plugins](#plugins)
- [Conclusion](#conclusion)

## Why NeoVim?

You might be wondering, why use NeoVim over something like IntelliJ or VSCode? I think there's plenty of great reasons. Here's a few:

- It's a very fast, lightweight text editor based in the terminal.
- It's extensible with plugins using Lua.
- You get the chance to learn how things work under the hood.
- And most importantly, you'll get bragging rights over VSCode users.

## Setup

Standard way of setting up NeoVim is just to use a package manager:

<details>

  ---

  <summary>Pacman</summary>

  ```bash
  sudo pacman -S neovim
  ```

  ---

</details>

<details>

  ---

  <summary>Homebrew</summary>

  ```bash
  brew install neovim
  ```

  ---

</details>

<details>

  ---

  <summary>Chocolatey</summary>

  ```bash
  choco install neovim
  ```

  ---

</details>

<details>

  ---

  <summary>APT</summary>

  ```bash
  sudo apt install neovim
  ```

  ---

</details>

<details>

  ---

  <summary>YUM</summary>

  ```bash
  sudo yum install neovim
  ```

  ---

</details>

After that, you can just run `nvim` in your terminal to open it up.

## Cheat Sheet

To quit, use `:q`. To save, use `:w`. To save and quit, use `:wq`.

In NeoVim, there are modes, actions, motions, and commands.

<details>

  ---

  <summary>
    Motions - These are used to move around in your file.
  </summary>

  - Use `h`, `j`, `k`, and `l` to move left, down, up, and right respectively.
  - Use `w` to move forward one word, and `b` to move back one word.
  - Use `0` to move to the beginning of the line, and `$` to move to the end of the line.
  - Use `gg` to move to the beginning of the file, and `G` to move to the end of the file.
  - Use `H` to move to the top of the screen, `M` to move to the middle of the screen, and `L` to move to the bottom of the screen.
  - Use `{` to move up one paragraph, and `}` to move down one paragraph (a paragraph is a block of text separated by blank lines).

  ---

</details>

<details>

  ---

  <summary>
    Actions - These are used to perform actions on text, and can be used with motions and iterators.
  </summary>

  - Before anything, you'll need to know undo and redo. Use `u` to undo, and `ctrl + r` to redo.
  - Use `y` to copy. Does nothing on its own, but can be used with motions and iterators to copy text.
  - Use `d` to delete. Does nothing on its own, but can be used with motions and iterators to delete text. Also copies the deleted text.
  - Use `p` to paste. Pastes the copied text after the cursor.
  - Use `P` to paste. Pastes the copied text before the cursor.
  - Use `c` to delete text and enter insert mode. Does nothing on its own, but can be used with motions and iterators to delete text and enter insert mode.
  - Use `x` to delete the character under the cursor.
  - Use `r` to replace the character under the cursor with the next character you type.
  - Use `.` to repeat the last action.

  ---

</details>

<details>

  ---

  <summary>
    Modes - These are the different modes you can be in. Use `esc` to exit any mode and go back to normal mode.
  </summary>

  - Use `:` to enter command mode, then `Enter` to run the command.
  - Use `/` to enter search mode, then type your search query and press `Enter` to search, or `esc` to exit search mode.
  - Use `i` to enter insert mode, and `esc` to exit insert mode.
  - Use `a` to enter insert mode and move forward one character, and `A` to enter insert mode and move to the end of the line.
  - Use `o` to enter insert mode and create a new line below the current line, and `O` to enter insert mode and create a new line above the current line.
  - Use `v` to enter visual mode, `V` to enter visual line mode, and `ctrl + v` to enter visual block mode.
  - Use `R` to enter replace mode, which replaces characters as you type them.
  - Use `:!` to enter shell mode, then type your shell command and press `Enter` to run it, or `esc` to exit shell mode.

  ---

</details>

<details>

  ---

  <summary>
    Iterators - These are your basic iterators:
  </summary>

  - You can use a number before any motion to repeat it that many times.
  - Use `f` to move to the next occurrence of a character, and `F` to move to the previous occurrence of a character.
  - Use `t` to move to the character before the next occurrence of a character, and `T` to move to the character after the previous occurrence of a character.
  - Use `;` to repeat the last `f`, `F`, `t`, or `T` command, and `,` to repeat the last `f`, `F`, `t`, or `T` command in the opposite direction.

  ---

</details>

<details>

  ---

  <summary>
    Text Objects - Used to select text.
  </summary>

  - `i` is "inside", and `a` is "around".
  - Use `iw` to select the current word (not including the whitespace after it).
  - Use `is` to select the current sentence (not including the blank line after it).
  - Use `ap` to select the current paragraph (including the blank line after it).
  - Use `i"` to select the text inside the current quotes.
  - Use `a"` to select the text inside the current quotes, including the quotes.
  - Use `a(` to select the text inside the current parentheses, including the parentheses.
  - Use `at` to select the text inside the current HTML tag, including the tag.

  ---

</details>

<details>

  ---

  <summary>
    Other Navigation - You can also move around in the following ways:
  </summary>

  - Use `ctrl + u` to move up half a page, and `ctrl + d` to move down half a page.
  - Use `ctrl + b` to move up a page, and `ctrl + f` to move down a page.
  - Use `ctrl + y` to move up one line, and `ctrl + e` to move down one line.
  - Use `ctrl + o` to jump back to where you were before the last jump, and `ctrl + i` to jump forward to where you were before the last jump.
  - Use `ctrl + g` to show the current file name and position in the file.
  - Use `ctrl + ]` to jump to the definition of the word under the cursor, and `ctrl + t` to jump back to where you were before the last jump.
  - Use `ctrl + ^` to jump to the last file you were editing.

  ---

</details>

<details>

  ---

  <summary>
    Some examples to put it all together:
  </summary>

  - `dw` - Delete the next word.
  - `dd` - Delete the current line.
  - `3yy` - Copy the next 3 lines.
  - `2yb` - Copy the previous 2 words.
  - `2p` - Paste the copied text after the cursor 2 times.
  - `3cc` - Delete the next 3 lines and enter insert mode.
  - `4x` - Delete the next 4 characters.
  - `3r` - Replace the next 3 characters with the next character you type.
  - `dap` - Delete the current paragraph.
  - `ci"` - Delete the text inside the current quotes and enter insert mode.
  - `cit` - Delete the text inside the current HTML tag and enter insert mode.
  - `3.` - Repeat the last action 3 times.

  ---

</details>

<details>

  ---

  <summary>
    Windows/Tabs
  </summary>

  - Use `ctrl + w` to enter window mode, then use `h`, `j`, `k`, and `l` to move to the left, down, up, and right windows respectively.
  - Use `ctrl + w` to enter window mode, then use `H`, `J`, `K`, and `L` to move the current window to the left, down, up, and right respectively.
  - Use `ctrl + w` to enter window mode, then use `c` to close the current window.
  - Use `ctrl + w` to enter window mode, then use `o` to close all windows except the current one.
  - Use `ctrl + w` to enter window mode, then `n` to open a new window.
  - Use `ctrl + w` to enter window mode, then `s` to split the current window horizontally.
  - Use `ctrl + w` to enter window mode, then `v` to split the current window vertically.
  - Use `ctrl + w` to enter window mode, then `q` to quit the current window.
  - Use `ctrl + w` to enter window mode, then `t` to open the current window in a new tab.

  - Use `:tabnew` to open a new tab.
  - Use `:tabclose` to close the current tab.
  - Use `:tabonly` to close all tabs except the current one.
  - Use `:tabnext` to move to the next tab.
  - Use `:tabprevious` to move to the previous tab.
  - Use `:tabfirst` to move to the first tab.
  - Use `:tablast` to move to the last tab.

  ---

</details>

## Modes

There are several modes in NeoVim, and they all have different uses. Here's a quick overview of each one:

<details>

  ---

  <summary>Normal Mode</summary>

  This is the default mode. It's used for navigating around your file, and performing actions on text.

  Use `esc` to exit any mode and go back to normal mode.

  ---

</details>

<details>

  ---

  <summary>Insert Mode</summary>

  This is the mode you're probably used to. It's used for inserting text into your file.

  Use `i` to enter insert mode, and `esc` to exit insert mode.

  ---

</details>

<details>

  ---

  <summary>Visual Mode</summary>

  This mode is used for selecting text. You can use it to select text to copy, delete, or replace.

  Use `v` to enter visual mode, `V` to enter visual line mode, and `ctrl + v` to enter visual block mode.

  You can use `y`, `d`, and `c` to copy, delete, or replace the selected text, and use the typical motions and navigations to select text.

  There's multiple types of visual mode:

  - Visual mode - Used for selecting text. Use `v` to enter visual mode.
  - Visual line mode - Used for selecting lines. Use `V` to enter visual line mode.
  - Visual block mode - Used for selecting blocks of text. Use `ctrl + v` to enter visual block mode.
  - Visual block insert mode - Used for inserting text into blocks of text. Use `I` to enter visual block insert mode.
  - Visual block append mode - Used for appending text to blocks of text. Use `A` to enter visual block append mode.

  ---

</details>

<details>

  ---

  <summary>Command Mode</summary>

  This mode is used for running commands. You can use it to save, quit, search, and more.

  Use `:` to enter command mode, then type your command and press `Enter` to run it, or `esc` to exit command mode.

  Some useful commands:

  - `sed` is built straight in, here's some examples:
    - `:%s/foo/bar/g` - Replace all instances of `foo` with `bar`.
    - `:s/foo/\u\0/g` - Replace all instances of `foo` with the first letter capitalized.
    - `:s/\(foo\)\(bar\)/\2\1/g` - Replace all instances of `foobar` with `barfoo`.
    - `:s/"\(.*\)"/'\1'/g` - Replace all instances of `"foo"` with `'foo'`.
  - `:w` - Save the current file.
  - `:wq` - Save and quit the current file.
  - `:q` - Quit the current file.
  - `:q!` - Quit the current file without saving.
  - `:e` - Open a file.
  - `:e!` - Reload the current file.

  ---

</details>

<details>

  ---

  <summary>Replace Mode</summary>

  This mode is used for replacing text. You can use it to replace characters, words, or lines.

  Use `R` to enter replace mode, which replaces characters as you type them. Use `esc` to exit replace mode.

  ---

</details>

<details>

  ---

  <summary>Shell Mode</summary>

  This mode is used for running commands in a terminal. You can use it to run commands like `git` or `npm`.

  Use `:!` to enter shell mode, then type your shell command and press `Enter` to run it, or `esc` to exit shell mode.

  ---

</details>

## Configuration

With everything that's already been said, that's enough to get started. And honestly, if I was starting out, I would just use the Vim plugin for VSCode to get used to the motions. I think that's a fantastic way to get started.

Configuration is a whole other beast. There are plugin managers (Packer, Lazy, Plug, etc.), plugins (Telescope, LSP, Treesitter, etc.), and configuration files (init.vim, lua/init.lua, etc.). It's a lot to take in, and it can be overwhelming.

If I were just starting out on the configuration side of things, I would have gone with [`kickstart.nvim`](https://github.com/nvim-lua/kickstart.nvim). It's a great way to get started with NeoVim, and get used to setting things up without dealing with a dozen files.

I don't recommend you to use a distribution like Lunar or NVChad, unless you're already comfortable with NeoVim, otherwise you'll likely get confused when you try to customize anything, and won't know how to extend it or use just plain NeoVim.

## Plugins

Plugins are a great way to extend NeoVim. There are plugins for everything, from file trees to language servers to fuzzy finders. Check out [Awesome Neovim](https://github.com/rockerBOO/awesome-neovim) for a list of plugins.

Personally, I think the most important things you need are:

- An LSP setup. Lots of people use [lsp-zero](https://github.com/VonHeikemen/lsp-zero.nvim), but the standard is so close to it that you might as well just use that. VonHeikemen also has a guide on setting up everything *without* his plugin, [here](https://github.com/VonHeikemen/lsp-zero.nvim/blob/v3.x/doc/md/guides/you-might-not-need-lsp-zero.md). That's the guide I used to get started, and I'd recommend that to you as well.
- A fuzzy finder. I use [Telescope](https://github.com/nvim-telescope/telescope.nvim).
- Syntax highlighting. I use [Treesitter](https://github.com/nvim-treesitter/nvim-treesitter).
- Git integration. I use [gitsigns](https://github.com/lewis6991/gitsigns.nvim) and, more importantly, [fugitive](https://github.com/tpope/vim-fugitive).
- If you use Copilot, you should probably go with the Lua setup: [copilot.lua](https://github.com/zbirenbaum/copilot.lua).

Everything else is just extra! I'd recommend you to start with just those, and then add more as you need them. Check out other people's configurations to see what they use, and what you might want to use, how you might set it up, etc.

## Conclusion

NeoVim is a fantastic text editor, and I think you should give it a try. It's fast, lightweight, and extensible. The only problem you might have in the end is never leaving your config files... Still working on a solution for that one.

There's definitely way more to NeoVim than what I could fit in today's post, but I hope this was a good introduction to it.

With that said, I hope everyone has an amazing day, and give my other blogs a read if you'd like. Or just check out my [own config](https://github.com/kanielrkirby/nvim) if you'd like to see how I set things up myself. ThePrimeagen also has a great [video on getting set up](https://www.youtube.com/watch?v=w7i4amO_zaE&pp=ygUNcHJpbWVhZ2VuIHZpbQ%3D%3D), so definitely check that out.
