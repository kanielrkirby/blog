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

Every project has one screen that grows past the point where anyone still believes it is a screen.

At first it is harmless. A few fields. A preview. A button that saves a record.

Then the business rules arrive.

Then the exceptions arrive.

Then the exceptions get exceptions.

That is what happened here. The order form stopped being an order form and became a configuration engine for windows, doors, glass, screens, and mulled units. It also had to manage previews, line edits, validation, dependent fields, server-side configurators, and a special case for almost every product family.

At some point, the UI was no longer describing data. It was manufacturing it.

## How It Got There

The code is not bad because it is large. It is bad because it is trying to do too many jobs at once.

There is a reactive store for products, another for form state, another for status, and another for the current order. The same object is rewritten by effects, event handlers, server responses, and edit flows.

That means every change has side effects.

Change a style and the available series changes.

Change a construction type and half the attributes become invisible or forced to defaults.

Change a mull parent and suddenly you are editing a parent, or a child, or a cloned child, depending on the exact branch you hit.

That is not a form. That is a state machine with a nice jacket on.

## The Real Mistake

The first mistake was treating business rules as field metadata.

The second mistake was letting the field metadata mutate state.

The third mistake was letting state mutation decide what the server should write.

By the end, `fields.js` had become a small language:

- `hidden`
- `invisible`
- `disabled`
- `onChange`
- `onVisible`
- `limitOptions`
- `valueMapping`

That sounds elegant until you realize each of those hooks can also change other fields, which can change previews, which can change validation, which can change what gets persisted.

So the code starts compensating for its own behavior.

Defaults get re-applied.

Readonly flags get cleared manually.

Timeouts are used to wait for the UI to settle.

The system is no longer being designed. It is being patched back into consistency.

## The Fragile Assumptions

There are a few assumptions that quietly make everything harder:

**String matching is identity.**

Products are classified by checking whether `display_name` contains words like `Door`, `Glass`, or `Mull`. That works until it does not.

**The frontend can reconstruct the truth.**

It often cannot. It can only reconstruct a version of the truth from partial server responses, local defaults, and whatever happened in the previous effect cycle.

**One reactive model is enough.**

It is not, when the domain includes edit mode, mull parents, mull children, order-level fields, product-level fields, server-derived configurators, and preview rendering.

**A rewrite will automatically simplify things.**

It usually will not. A rewrite often just gives you a fresh place to encode the same confusion more cleanly.

## What I Should Have Known

The architecture smell was there early.

When a form starts needing special rules for each product category, that means the categories are not just categories anymore. They are different workflows.

When the UI needs to call back into the server to discover which fields should exist, you are not building a form builder anymore. You are building a configurator runtime.

When the edit path cannot reuse the add path, the model is already split.

And when you find yourself saying things like, "just keep this one weird exception in the client for now," you are usually agreeing to carry that exception forever.

## What Might Have Been Better

Maybe the answer was not React.

Maybe the answer was a clearer domain boundary.

I think a better design would have been something like this:

- a canonical configuration object with explicit product type and workflow state
- pure rules for visibility, defaults, and derived values
- one transition layer for add/edit/duplicate/mull changes
- one server contract that returns validated configuration data instead of half-built state
- a real form library, but only after the domain model was stable

The UI can still be rich. It can still be dynamic. It just should not be the place where all the business logic lives.

## The Lesson

If a form becomes hard to rewrite, that is rarely because the code is ugly.

It is usually because the form has become infrastructure.

Infrastructure is different.

You do not casually replace it.

You do not trust a rewrite to save you.

You stabilize it, you isolate it, and you stop pretending it is simple.

That is the hard part of software engineering: recognizing when you are no longer building a form, and starting to treat the thing like the system it already is.
