---
title: "ERP Is a Platform for Process"
desc: "What Odoo taught me about all-in-one software."
published: 2026-02-01T14:00:00-06:00
authors:
- Kaniel Kirby
draft: false
featured: true
---

## The Learning Curve

Getting productive in Odoo took longer than I expected.

Not because any one part of it was impossible to understand, but because the system is large enough that knowing one part almost never means you understand the whole. There are models, views, actions, reports, permissions, workflows, modules, computed fields, inherited methods, scheduled jobs, and that's not getting into nearly _any_ of the custom business logic for apps like Accounting.

The important part is developing intuition. Over time, you start to learn when to extend an existing model, when to create a new one, when to lean on Odoo’s workflow, and when a customization is fighting the platform instead of using it.

That intuition is _expensive_. Reading code, tracing methods, breaking things, fixing them, and slowly realizing that almost nothing in an ERP is isolated.

## What the ERP Gives You

The value of Odoo is not that every module is perfect, or done The Best Way™.

The value is that it gives you a base layer of business software: accounting, sales, inventory, payroll, reports, permissions, documents, portals, and process. Some of those areas may only be “decent” for a particular client (I'm looking at you, U.S. Payroll), but decent matters when the alternative is building all of that from scratch, or paying 7 different services a high subscription fee.

For one company, that might mean leaving accounting mostly as-is and spending most of the development effort on manufacturing. The system already has invoices, customers, RFQs, orders, reports, etc. The custom work can go into making the company’s actual production process fit: custom manufacturing, order-making, pricing,  document generation, or machine file generation.

The ERP is not a database with screens. It's a high-level opinion about what _process_ should look like.

## Process as a Feature

One thing I underestimated is the role that process plays.

Clients may or may not like every process an ERP gives them. Sometimes they want the system to behave exactly like their old workflow. Sometimes the old workflow exists because nobody had a system strong enough to push back.

With an ERP, instead of the client being entirely in charge of every detail, the platform brings its own default answer: this is how a quote becomes an order, this is how an invoice works, this is how inventory moves, this is how accounting records are preserved.

That can be frustrating, but it shifts the conversation from "You can't do that without paying for more development time" to "Here's the standard way we do this, and if that doesn't work for you, we can talk about tweaking it".

Another perk is that it's free. We spent no development time coming up with that default answer, prototyping it, implementing it, reviewing and testing it.

## The Cost of the Platform

The tradeoff is that once you build on the platform, you have to respect it.

Exploring a new area of Odoo can still feel slow and uncertain. There are methods calling methods calling methods, inherited behavior across a dozen modules, side effects from modules you never explicitly installed, and business logic that is not obvious until you trace the flow.

That makes certain things feel dangerous.

For example, while I'd feel fine running SQL to update a random record or field in one project, I would be very hesitant to run raw SQL against Odoo data without a lot of research (especially if it involves accounting), because the system is complex enough that looking at the database (and sometimes even some of the code) doesn't tell the full story.

That is part of the bargain.

You get the platform’s process, integration, and structure. You also inherit its complexity.

## Why I Still Like the Model

I understand why people dislike ERPs.

I kind of do too. Most ERPs are old, expensive, poorly maintained, painful and expensive to customize, and fundamentally aren't tailored to the company enough.

But it's always a tradeoff. For some businesses, ecosystem and maturity matters, or integration layer matters, or having a system that already covers broad operational needs matters. A company often does not need the best possible tool for every department. Most have a speciality, a place they spend 80-90% of their time, whether that's accounting, or manufacturing, or sales, or something else entirely that we add on top.

That is where Odoo makes sense to me. It gives us a solid enough platform to offer clients without building every ordinary business feature from scratch. Then our custom software work can sit on top of that base and optimize the parts that matter most, because those are always going to be different client-to-client.

## The Lesson

The main thing I’ve learned is that an ERP is not just a pile of business modules. It is a platform with opinions about how work should move.

That's what makes it useful, and also what makes it difficult.

Odoo gives you accounting, inventory, payroll, reports, permissions, and enough process that you do not have to invent every business workflow from scratch. But once you accept that base, you also accept that the platform’s rules matter. You cannot treat every record like a row you own completely, or every customization like a small isolated feature.

The skill is learning where to spend your effort. Leave the standard parts standard when they are good enough. Customize the parts where the client’s business actually needs to be great. And when the platform pushes back, take that seriously before assuming it is just in your way.
