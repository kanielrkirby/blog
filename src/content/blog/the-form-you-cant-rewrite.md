---
title: "The Form You Can't Rewrite"
desc: "How a product form stopped being a form and became infrastructure you are afraid to touch."
published: 2026-06-12T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - frontend
  - architecture
  - erp
  - complexity
draft: true
---

## The Problem

At first it is harmless. A few fields. A preview. A button that saves a record.

Then the business rules arrive. And the exceptions arrive. Then the exceptions get exceptions. And then an edge-case comes up.

That is what happened here. The order form stopped being an order form and became a configuration engine for everything under the sun, between configuring a product of various shifting types, managing programmatically gneerated previews for each type, handling line edits, validation, dependent fields, server-side integration at multiple points, and a special case for almost every product family.

At some point, the UI was no longer describing data. It was manufacturing it.

## How It Got There

The code is not bad because it is large. It is bad because it is trying to do too many jobs at once.

There is a reactive store for products, another for form state, another for status, and another for the current order. The same object is rewritten by effects, event handlers, server responses, and edit flows.

That means every change has side effects.

Change one field and the available product families changes, or half the attributes become invisible or forced to defaults, or suddenly you're editing a parent, or a child, or a cloned child, etc., etc.

That is not a form. It's a state machine, and it's split across the entire project.

## The Real Mistake

The biggest mistake I made was probably... making the client "smart". It deconstructed the data and information from the backend, used that to determine state and dependencies, and then sent it back over and over, rather than sending intent and keeping business logic localized to the server.

By the end, `fields.js` had become a small language:

- `hidden`
- `invisible`
- `disabled`
- `onChange`
- `onVisible`
- `limitOptions`
- `valueMapping`

So the code starts compensating for its own behavior. Defaults get re-applied. Readonly flags get cleared manually. Timeouts are used to wait for the UI to settle.

The system is no longer being designed. It is being patched back into consistency, because frankly we ran out of time.

## Lessons Learned

The architecture smell was there early.

When the UI needs to call back into the server to discover which fields should exist, you are not building a form builder anymore. You are building a configurator runtime that needs to keep a complete and accurate copy of state that already exists in the backend.

If a form becomes hard to rewrite, that is rarely because the code is ugly.

It is usually because the form has become infrastructure. Infrastructure is different. You do not casually replace it. You do not trust a rewrite to save you.

I think that's one of the hardest parts of software. After you've been on the wrong path for a while, and you didn't even know why it was happening, and you tried rewriting it 3 times, and it never actually solved the root problem, all because you were solving the wrong problem in the first place.
