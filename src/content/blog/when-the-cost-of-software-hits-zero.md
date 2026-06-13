---
title: "When the Cost of Software Hits Zero"
desc: "Software is getting cheap to create, but not every kind of software is getting cheap in the same way."
published: 2026-06-12T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - ai
  - software
  - product
  - automation
draft: true
---

## The New Baseline

There is a real sense in which software is getting close to free.

Not hosting. Not support. Not compliance. Not the long tail of maintenance.

I mean the first part: turning an idea into a working tool.

That part has changed dramatically. If the problem is narrow enough, and the environment is familiar enough, and the stakes are low enough, you can now build a useful tool in a day that used to take a week, a month, or a contractor.

That sounds like a small thing. It isn't.

It changes the economics of small software.

## What Actually Got Cheaper

The cheapest software is usually software that:

- solves one specific problem
- has one user, or one team
- lives close to the operator
- has simple inputs and obvious outputs
- can fail without causing a crisis

That is why the little utilities matter so much.

If you need a launcher for Nix flakes, a menu wrapper for Bitwarden, an OTP menu, or a clipboard TTS tool, you no longer need to justify a platform project. You need a sharp idea, a few hours, and enough judgment to know when the result is good enough.

That is the real shift: the cost of trying is collapsing.

## Why That Matters

When trying is cheap, the center of gravity moves.

You stop asking, "Is this worth building as a product?"
You start asking, "Is this worth making for my own use?"

That is a much lower bar, and it unlocks a lot of software that would never have been funded before.

Some of it is throwaway. Some of it becomes indispensable.

The interesting part is that the code can be disposable while the value is not. A tiny script can save you an hour every day. A small local tool can remove an annoying edge in a workflow that no vendor ever cared about.

## Where It Really Does Hit Zero

The cost of software approaches zero when the problem is:

- personal or internal
- repetitive
- bounded
- easy to verify
- tolerant of rough edges

In those cases, AI is less like a miracle and more like a force multiplier on templates, memory, and momentum.

You are not paying for invention.
You are paying for translation.

And translation is cheap when the domain is simple.

## Where It Doesn't

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

This is why "it works" is not the same thing as "it is cheap."

## The Hidden Bill

The hidden bill is usually not the code.

It is the context around the code.

What happens when the API changes? What happens when the OS changes? What happens when your clipboard behavior differs on Wayland? What happens when a password prompt encodes characters in a way you didn't expect? What happens when the thing you built for yourself becomes the thing you rely on every day?

That is where the cheap software starts to become real software.

And real software still costs something.

## The Personal-Sized Future

The most important consequence of all this may be that software gets smaller again.

Not in capability. In target size.

The default unit of software is shifting from "company product" to "personal tool." People will keep building tiny programs that exist for one workflow, one operator, one environment, one annoyance.

That is not a downgrade.

It is what happens when the cost of custom software gets low enough that you stop negotiating with generic tools.

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

That is the line.

And it is a useful line, because it tells you where AI is changing the world first: not in giant universal platforms, but in the little places where a sharp tool used to be too much trouble to make.

Those are the places where software is, for the first time, starting to feel free.
