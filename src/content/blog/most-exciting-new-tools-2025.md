---
title: "Most Exciting New Tools for 2025"
desc: "A list of cutting-edge developer tools that have revolutionized my workflow. Senior developers hate this one simple trick!"
published: 2026-01-06T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - linux
  - unix
  - cli
  - minimalism
draft: false
featured: true
---

## The Discovery

I've been exploring some incredibly powerful tools lately. They're lightweight, universally available, and compose beautifully. I wanted to share my findings with the community.

## find

This one's a game-changer. Locate files by any attribute - name, type, size, modification time.

It's almost a mini programming language. Conditions AND by default, `-o` for OR, `-not` for negation, parentheses for grouping. `find <where> <conditions>`:

```bash
$ find . -name "*.py"
./src/main.py
./src/utils.py

$ find /var/log -name "*.log" -mtime -7 -size +1M
/var/log/syslog
/var/log/auth.log

$ find . \( -name "*.js" -o -name "*.ts" \) -not -name "*.min.js"
./src/app.js
./src/utils.ts
```

That last one: JS or TS files, but not minified. Conditions AND by default, parens group the OR.

<details>
<summary>Advanced: executing commands on results</summary>

```bash
$ find . -name "*.js" -exec grep -l "TODO" {} \;
./src/app.js
```

The `{}` gets replaced with each filename. Find every JS file, grep it for TODOs.

</details>

## grep

Pattern matching in files. I know, I know - sounds basic. But hear me out.

`grep <pattern> <files>`. Returns every line that matches.

```bash
$ grep "error" log.txt
2024-01-15 10:23:01 error: connection timeout
2024-01-15 10:24:15 error: retry failed
```

```bash
$ grep -n "error" log.txt
23:2024-01-15 10:23:01 error: connection timeout
47:2024-01-15 10:24:15 error: retry failed
```

The `-n` gives you line numbers. `-i` makes it case-insensitive. `-v` inverts (lines that DON'T match):

```bash
$ grep -v "debug" log.txt
2024-01-15 10:23:01 error: connection timeout
2024-01-15 10:24:15 info: connected
```

Add `-r` and it searches entire directory trees:

```bash
$ grep -r "TODO" --include="*.py" .
./src/main.py:# TODO: add error handling
./src/utils.py:# TODO: optimize this loop
```

Every TODO in your Python codebase. Instantly. No IDE required.

<details>
<summary>Advanced: regex patterns</summary>

grep speaks regex:

```bash
$ grep "^import" *.py
main.py:import os
main.py:import sys
utils.py:import json
```

Lines starting with "import".

```bash
$ grep -E "error|warn|fatal" log.txt
2024-01-15 10:23:01 error: connection timeout
2024-01-15 10:23:45 warn: high memory usage
2024-01-15 10:24:15 fatal: out of memory
```

`-E` enables extended regex for the `|` (or) operator.

</details>

## sed

Stream editor. Transforms text as it flows through.

The magic incantation is `s/old/new/` - substitute old with new. Delimiter can be anything (useful for paths):

```bash
$ echo "hello world" | sed 's/world/universe/'
hello universe

$ echo "/usr/local/bin" | sed 's|/usr/local|/opt|'
/opt/bin

$ echo "foo foo foo" | sed 's/foo/bar/g'
bar bar bar
```

That `g` means global - all occurrences, not just first. Supports regex too:

```bash
$ echo "error: 404" | sed 's/[0-9]\+/XXX/'
error: XXX
```

Add `-i` to edit files in-place:

```bash
$ sed -i 's/oldfunction/newfunction/g' *.js
```

Find-and-replace across every JS file. No dialog. No "are you sure?" Done.

<details>
<summary>Advanced: line operations</summary>

```bash
$ sed '/^#/d' file.txt        # delete comment lines
$ sed -n '2,4p' file.txt      # print only lines 2-4
$ sed '1d' file.txt           # delete first line
```

</details>

## awk

This one's wild. It's basically a programming language disguised as a command.

awk splits each line into fields (`$1`, `$2`, etc.) and lets you filter and transform:

```bash
$ cat data.txt
alice 30 engineer
bob 25 designer

$ awk '{print $1, $3}' data.txt
alice engineer
bob designer

$ awk -F: '{print $1, $7}' /etc/passwd | head -2
root /bin/bash
daemon /usr/sbin/nologin
```

That `-F:` sets the delimiter to colon. The real power is conditions - `awk 'condition {action}'`:

```bash
$ awk '$2 > 28 {print $1, "is", $2}' data.txt
alice is 30

$ ps aux | awk '$3 > 50 {print $11, $3"%"}'
/usr/bin/firefox 67.2%
```

Every process using more than 50% CPU. Three seconds to write, instant results.

<details>
<summary>Advanced: this thing is actually insane</summary>

```bash
$ awk '{sum += $2} END {print "Average:", sum/NR}' data.txt
Average: 27.5

$ awk 'NR > 1 {print}' data.csv    # skip header row
$ awk '{print $NF}' file.txt       # last column ($NF = num fields)
```

It has arrays, functions, loops, printf. You can write actual programs:

```bash
$ awk '
  {count[$3]++}
  END {for (role in count) print role, count[role]}
' data.txt
engineer 1
designer 1
manager 1
```

That just grouped and counted by the third column. In a shell one-liner. From 1977.

</details>

## ps

List running processes. The `aux` flags are basically muscle memory at this point:

```bash
$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.1 169836 13256 ?        Ss   Dec01   0:12 /sbin/init
user      2847 67.2  3.0 4892736 487236 ?      Sl   10:15  42:15 /usr/bin/firefox
user     15234 52.1  1.2 1247832 189432 ?      Sl   14:01   8:42 node server.js
```

`a` = all users, `u` = user-oriented format, `x` = include processes without a terminal. You can also filter:

```bash
$ ps aux | grep firefox
user      2847 67.2  3.0 4892736 487236 ?      Sl   10:15  42:15 /usr/bin/firefox

$ ps -u root
    PID TTY          TIME CMD
      1 ?        00:00:12 init
    423 ?        00:00:01 sshd
```

Or just get PIDs for scripting:

```bash
$ pgrep firefox
2847

$ kill $(pgrep firefox)
```

## top

Okay, this one's almost too modern. It's got a LIVE UPDATING INTERFACE:

```
$ top

top - 14:23:01 up 2 days,  3:42,  1 user,  load average: 0.52, 0.48, 0.51
Tasks: 287 total,   1 running, 286 sleeping,   0 stopped,   0 zombie
%Cpu(s):  5.2 us,  1.3 sy,  0.0 ni, 93.2 id,  0.2 wa,  0.0 hi,  0.1 si
MiB Mem :  15896.4 total,   2847.2 free,   8294.1 used,   4755.1 buff/cache

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   2847 user      20   0 4892736 487236 142892 S  67.2   3.0  42:15.23 firefox
  15234 user      20   0 1247832 189432  45678 S  52.1   1.2   8:42.11 node
```

While it's running: `k` to kill a process, `q` to quit, `1` to show per-CPU stats, `M` to sort by memory, `P` to sort by CPU.

I hear there are fancier versions now - `htop`, `btop++` - but honestly, `top` ships everywhere. Every server, every container, every minimal VM. Zero installation required.

## `/proc` and `/sys`

These aren't even tools - they're virtual filesystems exposed by the kernel. They're on basically every Linux system, even minimal ones without GNU coreutils. If you can `cat` a file, you can use these.

```bash
$ cat /proc/meminfo
...
MemAvailable:    8053424 kB
...

$ cat /sys/class/power_supply/BAT0/capacity
73

$ ls /proc/$(pgrep firefox)/fd | wc -l
247
```

Memory, battery, and Firefox's 247 open file descriptors. Straight from the kernel. No libraries. No dependencies. Just files.

## vi

The editor that's already there. Always. Even in your initramfs. Even in your router's busybox. Even in that container image that has literally nothing else.

```bash
$ vi /etc/hosts
```

"But vi is hard!" Here's vi in 60 seconds:

**Move:** `h` `j` `k` `l` (left, down, up, right). `w` next word, `b` back word, `e` end of word. `0` line start, `$` line end. `gg` file top, `G` file bottom. `Ctrl-d` half-page down, `Ctrl-u` half-page up.

**Edit:** `i` insert mode, `Esc` back to normal. `a` append after cursor, `A` append end of line. `o` new line below, `O` new line above.

**Actions:** `d` delete, `c` change, `y` yank (copy). Combine with movements: `dw` delete word, `d$` delete to end of line, `dd` delete whole line. `yy` yank line, `p` paste.

**Save/quit:** `:w` save, `:q` quit, `:wq` both, `:q!` force quit.

**Search:** `/pattern` to search forward, `n` next match, `N` previous. `u` undoes one change.

That's it. You now know enough vi to edit any config file on any server anywhere. The rest is muscle memory.

<details>
<summary>If you have vim (not just vi)</summary>

**Visual mode:** `v` select characters, `V` select lines, `Ctrl-v` block select. Then `d`, `c`, or `y` to act on selection.

**Text objects:** `i` for inside, `a` for around. `di"` deletes inside quotes, `ca)` changes around parentheses, `dip` deletes inside paragraph.

**Undo/redo:** `u` undoes unlimited changes (not just one), `Ctrl-r` redo.

</details>

## man

Documentation that ships with the tool:

```bash
$ man grep
GREP(1)                     General Commands Manual                    GREP(1)

NAME
       grep - print lines that match patterns

SYNOPSIS
       grep [OPTION...] PATTERNS [FILE...]

DESCRIPTION
       grep searches for PATTERNS in each FILE...
```

Navigate with vi keys (or space/b for pages). Search with `/pattern`. Press `q` to quit.

No Stack Overflow. No "this page requires JavaScript." No "sign up to view this answer." Just the reference, offline, always available.

## Composition

Here's where it gets interesting. These tools COMBINE:

```bash
$ ps aux | awk '{print $3}' | sort -rn | head -5
67.2
52.1
23.4
12.1
8.3
```

Top 5 CPU percentages. `ps` generates, `awk` extracts, `sort` orders numerically in reverse, `head` limits.

```bash
$ find . -name "*.log" -exec grep -l "ERROR" {} \; | while read f; do
    echo "=== $f ==="
    tail -5 "$f"
done
=== ./logs/app.log ===
2024-01-15 10:23:01 ERROR: connection timeout
2024-01-15 10:24:15 info: retrying
2024-01-15 10:24:16 ERROR: retry failed
2024-01-15 10:24:20 info: giving up
2024-01-15 10:24:21 ERROR: fatal
```

Find all log files containing errors, show the last 5 lines of each.

## The Point

Listen. Modern tools aren't evil. I use VSCode, Nix tooling, Tmux, web browsers, etc., all the time. I find all of these massively useful for my day-to-day life.

But when you're debugging production at 2 AM over a flaky SSH connection, it's just better to know the universal basics that have been around for half a century.

Every one of these tools:

- Ships with essentially every Linux distribution
- Works over SSH
- Runs in containers with no additional installation
- Composes with every other tool via pipes

Welcome to the future of 1974.
