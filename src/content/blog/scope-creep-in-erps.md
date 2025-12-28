---
title: "Scope Creep in ERPs"
desc: "How to run discovery for complex projects without drowning in scope creep - especially in ERP implementations."
published: 2026-01-13T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - project-management
  - erp
  - consulting
  - scope
draft: false
---

## The Problem

Client: "We need a system that does everything our old system did, plus these new features, and it should be flexible enough to handle anything."

This is not a requirements document. This is a wish. And wishes have a way of expanding indefinitely.

## The Approach

We've learned to treat scope as a first-class deliverable, not a preliminary step. The scope document isn't bureaucratic overhead - it's the artifact that protects everyone.

### 1. Document the Current State

Before discussing what they want, document what they have. Current workflows, current systems, current pain points.

This serves two purposes:

- It grounds the conversation in reality
- It creates a baseline for "did we actually improve things?"

### 2. Separate Wants from Needs

Everything the client asks for goes into one of three buckets:

**Must have:** The system literally cannot function without this. Payroll must calculate pay. Orders must track inventory.

**Should have:** Significantly improves the workflow but could launch without it. Reporting dashboards. Bulk operations.

**Nice to have:** Would be cool. Might do later. Not in this contract.

The discipline is putting things in the RIGHT bucket, not the bucket the client wants them in.

### 3. Define Acceptance Concretely

For each must-have, define what "done" looks like. Not "the system should handle orders" but:

- User can create an order with line items
- Order calculates totals and taxes
- Order can be confirmed, which updates inventory
- User can view order history filtered by date and status

This is your UAT checklist. If it's not on the list, it's not in scope.

### 4. Publish the Scope

Our scope documents have three sections:

1. **What you had:** The current state baseline
2. **What you want:** The requirements we've gathered and categorized
3. **What we're building:** The explicit checklist of features with acceptance criteria

This gets published, reviewed, and signed off before development starts. When someone later asks "can it also do X?" we can point to section 3 and have a conversation about change orders, not assumptions.

## The Pushback Conversation

On one project, we hit a point where additional feature requests would have doubled the complexity without doubling the budget. The client wanted more configurability in a component that was already pushing architectural limits.

The conversation:

"We can add this, but here's what it costs: [time estimate] and [budget impact]. Given the current timeline and budget, we recommend shipping without it and evaluating in phase 2."

This only works if you've established that scope is a real boundary, not a suggestion.

## The Maintenance Plan

Scope documents should include what happens after launch:

- What's the support period?
- What constitutes a bug vs. a feature request?
- What's the change request process?
- Who owns the system after handoff?

This prevents the project from becoming an indefinite commitment disguised as a fixed-price contract.

## ERP-Specific Challenges

Enterprise systems are particularly prone to scope creep because:

**Everything connects.** A small change to invoicing affects accounting, reporting, and integrations.

**Users have domain knowledge you don't.** The client knows their industry. You're learning it. Requirements emerge from that knowledge gap.

**Legacy systems did weird things.** "We've always done it this way" often means there's a business reason, but sometimes means nobody questioned it in 20 years.

The discipline is separating "we need this because of a real constraint" from "we want this because it's familiar." And early.

## The Hard Truth

You cannot build something that does everything. You _must_ think of constraints as features. Every "no" to one thing is a "yes" to shipping on time, staying on budget, and maintaining quality.

Clients often don't know what they want until they see what they don't want. A clear scope with explicit acceptance criteria lets you show them something concrete to react to, rather than chasing an infinitely expanding vision.
