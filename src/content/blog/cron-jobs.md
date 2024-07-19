---
# slug:
title: "CRON Jobs, Simplified"
desc: "Here, I'll explain what CRON jobs are, how to use them, and show a basic example of them in GitHub Actions/Workflows."
published: 2023-11-21T03:21:56-06:00
# modified:
authors:
  - Kaniel Kirby
tags:
  - tutorial
  - beginner
  - linux
  - unix
  - cron
  - github
  - actions
  - workflows
  - automation
  - scheduling
# featured: true
img: /images/posts/cron-jobs/pexels-andrey-grushnikov-707676.jpg
alt: |
  Photo by Andrey Grushnikov: https://www.pexels.com/photo/black-and-white-photo-of-clocks-707676/
# canonicalURL:
draft: false
---

What are CRON jobs? What is crontab? What's type of CRON system does GitHub use? These are questions we've all had at some point or another, and in this quick article, I want to get to the bottom of it!

CRON, or Command Run ON, is a Unix scheduler. In other words, if you have xyz.sh script you want to run on a schedule, CRON let's you do that, be it every week, every day, or every other hour at six minutes after the hour, but only Sundays that align with the days 5th, 8th, and 9th.

Now, with all this complexity and fine grained detail, you'd think it would be complicated. And you'd be wrong! The syntax consists of 5 optional fields, and that's it! minute hour day/month month day/week. Here's a quick cheatsheet of the different operators provided in CRON!

## Cheatsheet and Examples

```bash
'*' = every
'/' = step
',' = and
'-' = range
'?' = no specific value
'L' = last
'W' = weekday
'#' = iteration
```

Let's use these in some real examples:

- Every Monday at noon: `0 12 * * 1`
- Every other hour, on the hour: `0 */2 * * *`
- M-F at 3:17 pm: `17 15 * * 1-5` or `17 15 * * W` (in Quartz-like systems)
- On the last day of each month, at `4:00 am: 0 4 L * *` (in Quartz-like systems)
- Every half hour on Fridays: `0,30 * * * 5`
- And, as promised, the super convoluted example from before: `6 */2 5,8,9 * 0`

Except... that doesn't quite work, now does it? Why is that? Well, CRON interprets day of week and day of month as "either or", where if either field is satisfied, it would run, so unfortunately, you'd need multiple CRON jobs to satisfy this requirement. Bummer, and a common "gotcha" for new users of this tool.

## `crontab`

`crontab` is the standard UNIX CLI tool to interact with and manage CRON jobs. Some people don't love the command-line. There's just a few commands to know, fortunately.

```bash
crontab -e Edit/Create a job in current file.
crontab -l List jobs in current file.
crontab -r Remove current file.
crontab /path/to/new-file Replaces current file with the new file.
# Combine -u username into other commands to specify for specific users.
```

That's about it for this utility, it's really that simple. Everything in crontab is relative to the current user unless otherwise specified, and each user only has one file.

## On to GitHub!

This section is only relevant if you make use of GitHub Actions/Workflows.

You're going to like this part... it's near exactly the same as standard UNIX CRON! So just open up your workflow .yml file and add something like the following!

```yml
on:
  schedule:
    - cron: "0 0 * * *" # every day at midnight
```

You may have noticed that this is YML list syntax. This means you can easily combine multiple CRON jobs to accomplish more complex tasks!

Here's the key differences between this and normal CRON, that you'll want to know before getting started:

- Max frequency of every 5 minutes.
- Sunday can be described using 0 or 7.
- You won't add anything after the time specified, like you do in CRON (to specify which executable). It just simply runs the jobs specified in that workflow file.
- That's about it for this blog post, I'll see if I can't talk about GitHub workflows in more depth in the coming posts!
