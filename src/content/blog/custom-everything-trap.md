---
title: "The Custom Everything Trap"
desc: "How a product configurator became its own programming language, and why rewrites didn't save it."
published: 2026-01-20T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - architecture
  - complexity
  - frontend
  - erp
draft: false
---

## The Innocent Beginning

It started simple. A product configurator for custom packaging. Users pick box dimensions, materials, printing options - the system calculates prices and generates specs. Standard stuff.

The first version was clean: a handful of fields, some conditional visibility, a few validation rules. Ship it.

Then came the requests.

## The Creep

"Can we add a field that only shows when X and Y are both selected?"

Sure. Add an `invisible` function the returns true when X and Y.

"Can changing field A automatically update fields B, C, and D?"

Sure. Add an `onChange` callback.

"Can some fields be hidden but still track their value, while others reset to default when hidden?"

Sure. Now we have `invisible` AND `hidden` with different semantics.

"Can a field become visible and automatically set itself to a specific value?"

Sure. Add an `onVisible` callback.

"Can fields disable other fields, and disabled fields should reset to defaults?"

Sure. Add a `disabled` function with side effects.

Before long, the field definitions weren't configuration anymore. They were a programming language. A declarative DSL with conditionals, side effects, event handlers, and implicit state dependencies.

## The Breaking Point: Inserts

Every project has a feature that breaks the architecture. Ours was inserts.

The client wanted compartments and dividers inside boxes - slots, trays, nested sections. Each insert could have its own dimensions and materials, but they needed to fit within the box, share walls, and get priced as one unit. We initially planned for full flexibility: any position, any size ratio, any arrangement.

We tried. It destroyed us.

The math wasn't the hard part. Shared walls? A 60-inch box with two compartments doesn't have two 30-inch inserts - it has two 29-inch inserts plus a 2-inch shared divider. Different insert types have different constraints. We solved all of that.

The hard part was that we'd already built a highly custom frontend and attribute system on top of our ERP, and the data model underneath wasn't designed for composites. Full positional flexibility would have meant rebuilding significant chunks of UI we didn't have time for, on top of a data model that was already straining. The technical debt from earlier decisions compounded.

We eventually gave up on positional flexibility entirely. The shipped version only supports simple horizontal arrangements - if you have 3 compartments, they're equal-width slots left to right with shared walls auto-calculated. No grids, no nested trays, no custom sizes. Even that reduced scope was barely manageable.

The frontend state management, already strained, buckled. We had six reactive effect hooks, each with complex dependency arrays, each potentially triggering the others. Finding bugs meant tracing invisible causality chains through async state updates.

We did one major rewrite. It helped, but didn't fix the fundamental issue. A second rewrite might have, but we ran out of time and budget.

## What I'd Do Differently

I'm not sure I'd move more logic to the backend. The frontend complexity was somewhat necessary - the client wanted responsive, immediate feedback on a highly dynamic form. That requires client-side logic.

What I'd change:

**Invest more in the data contract early.** The communication between frontend and backend was a constant source of bugs. Requests were inefficient, responses required too much transformation, and the async state synchronization was fragile. A cleaner, more targeted API would have paid dividends.

**Simplify the reactive model.** Multiple effect hooks with overlapping concerns made debugging miserable. I'd look harder for ways to consolidate state updates and make data flow more linear and traceable.

**Push back earlier on scope.** We eventually had to refuse additional insert features because the complexity had grown faster than the budget. Earlier "no" decisions might have kept the system tractable.

**Accept that some complexity is inherent.** The client wanted a highly configurable product with dozens of interdependent options. That's genuinely hard. No architecture makes it easy. The goal should be managing complexity, not eliminating it.

## The Lesson

When you're building a system with lots of conditional behavior, you're building a language. You might call it "configuration" or "rules" or "field definitions," but it's a language.

Languages need:

- Clear semantics (what does each construct mean?)
- Predictable evaluation (when do things run?)
- Debuggability (how do I trace what happened?)
- Boundaries (what CAN'T be expressed?)

If you don't design these intentionally, they emerge accidentally. And accidental languages are always worse than intentional ones.

The custom everything trap isn't about refusing customization. It's about recognizing when you've crossed from "configurable system" into "bespoke runtime" - and treating it with the appropriate engineering rigor.

The natural first step is asking: do we actually need this? Sometimes the answer is no, and you save yourself months of pain.

But sometimes inserts are the core feature your client needs. Then our job as developers is to solve that problem - just with eyes open about what we're getting into.
