---
title: "When the Cost of Software Hits Zero"
desc: "Software is getting cheap to create, but not every kind of software is getting cheap the same."
published: 2026-06-01T14:00:00-06:00
authors:
  - Kaniel Kirby
draft: false
---

## The New Baseline

There is a real sense in which software is getting close to free. Not hosting. Not support. Not compliance. Not the long tail of maintenance. Simply turning an idea into a working tool.

When the problem is narrow enough, and the environment is familiar enough, and the stakes are low enough, you can now build a useful tool in a day that used to take a week, a month, or a contractor.

## What Actually Got Cheaper

The cheapest software is usually software that:

- solves one specific problem
- has one user, or one team
- lives close to the operator
- has simple inputs and obvious outputs
- can fail without causing a crisis

That is why the little utilities matter so much.

If you need some helper scripts and infrastructure for confusing Nix stuff, or a menu wrapper for your password manager / 2FA manager, or a basically free TTS tool for your laptop (all of which I have developed for myself in a relatively short timespan), you no longer need to justify a platform project. You need a sharp idea, a few hours, and enough judgment to know when the result is good enough. Anyone can do that.

## Why That Matters

When trying is cheap, the center of gravity moves.

You stop asking, "Is this worth building?"
You start asking, "What specific problem would change my life if I had a basic solution to it?"

The interesting part is that the code can be disposable while the value is not. A tiny script can save you an hour every day. A small local tool can remove an annoying edge in a workflow that no vendor ever cared about.

## Where Cost Still Lives (and Why I Don't Think Software is Dead Yet)

The cost does not hit zero when the software is expected to carry real burden.

That includes:

- regulated systems
- security-sensitive systems
- multi-tenant systems
- heavily integrated systems
- software with many external dependencies
- software where failure is expensive

In those cases, the first draft may be cheap, but the real work arrives later.

The work is:

- proving correctness
- managing edge cases
- keeping data isolated
- making upgrades safe
- handling real users with real habits
- maintaining the system after the novelty wears off

This is why "it works" is not the same thing as "it is maintainable."

## The Hidden Bill

The hidden bill is usually not the code.

It is the context around the code.

What happens when the API changes? What happens when the OS changes? Or, more largely, what happens when you are truly _responsible_ and _accountable_ for keeping your software in working order?

_An aside here..._ I'm starting to think that part of the value developers are providing _today_ isn't just "solving problems"... it's accountability. Someone promised some feature, some constraint, some bottom line, and they are responsible for making sure that one way or another, with all the business's surrounding context, it's solved. More about that later, surely.

## The Personal-Sized Future

The most important consequence of all this may be that software gets smaller again. Not in capability. In target size.

The default unit of software is shifting from "company product" to "personal tool." People will keep building tiny programs that exist for one workflow, one operator, one environment, one annoyance.

I imagine it will appear in much the same way that some companies run their entire business off of an Excel spreadsheet, because it was something they could do without a software development team.

## The Practical Rule

If the software is:

- close to you
- easy to test
- easy to replace
- and cheap to break

then software is approaching zero cost.

If the software is:

- shared by many people
- hard to verify
- expensive to migrate
- and painful to get wrong

then software is still expensive.
