---
title: "Astro DB Launched"
description: "Astro DB is a new database that is content-based, performant, and framework-agnostic. It's built on top of Astro and can be used in any framework."
date: 2024-04-07T14:00:00-06:00
image: "https://images.pexels.com/photos/73871/rocket-launch-rocket-take-off-nasa-73871.jpeg"
image_alt: "Photo by Pixabay on Pexels"
categories: ["astro"]
authors: ["Kaniel Kirby"]
tags: ["astro", "database", "content-based", "performant", "framework-agnostic", "framework", "ssg", "ssr", "full stack", "javascript", "typescript", "framework", "react", "svelte", "vue"]
draft: false
---

## Introduction

When an open-source project starts gaining more profit-centric motives, it can be a bit worrisome for those who've invested into the ecosystem, especially after the recent incidents with companies like [Redis](https://redis.com/blog/redis-adopts-dual-source-available-licensing/), [Redhat](https://www.jeffgeerling.com/blog/2023/im-done-red-hat-enterprise-linux), and [VMWare](https://news.vmware.com/company/vmware-by-broadcom-business-transformation).

However, it also is a bit exciting knowing that Astro is starting to become profitable in a way that allows them to actually provide real value. Often times, companies start by taking away features, rather than providing additional ones, so this isn't exactly the worst of starts.

## What is Astro?

If you haven't been chronically online in the last few years waiting for [the next most important JavaScript framework in history](https://dayssincelastjavascriptframework.com/), Astro might have stayed off your radar, so let me start with who they are. Astro is an open source meta-framework that primarily focuses on being content-driven, performant, and framework agnostic.

It's got an [active, open-source community](https://github.com/withastro/astro), and it's been [loved by developers](https://2022.stateofjs.com/en-US/features/language/) (apologies for not showing the 2023 results, as they haven't been published as far as I can tell from their website), and a staggering amount of [integrations](https://astro.build/integrations/). Needless to say, they've been doing well for themselves in terms of popularity.

## Now a Database?

Astro DB is essentially just another managed database that's been built on [Turso](https://turso.dev/) and [Drizzle](https://orm.drizzle.team/). This isn't what makes it shine. Astro DB offers these note-worthy features:

### [Turso and LibSQL](https://turso.dev/)

Being built on LibSQL, a fork of SQLite, allows a much easier integration with local tooling for databases, which helps Astro stay easy to use.

### [Drizzle](https://orm.drizzle.team/)

Astro provides a wrapper around the Drizzle ORM, which simplifies database management a bit while working in TypeScript. Before you discount yet-another-ORM, it should be known that Drizzle is much closer to a [SQL builder](https://www.propelauth.com/post/drizzle-an-orm-that-lets-you-just-write-sql) than it is to anything else.

### [A Great Integration Layer with Astro](https://docs.astro.build/en/guides/integrations-guide/db)

Obviously, being an Astro product, this means Astro is going to be the ideal platform for building databases with Astro DB. The developers have a lot more freedom to really optimize with simple commands like `astro add db` and `astro db push` and full TypeScript support.

### [Pretty Reasonable Pricing for a Managed Database](https://astro.build/db/#pricing)

While the plan escalates quite fast (especially regarding storage, at this point being $1 / GB), the free tier that most solo developers are going to be using is quite generous.

## Conclusion

Astro DB looks to be a promising paid option for Astro developers who are looking to build databases easier while supporting Astro. Definitely give it a shot, as it's free to start!

Happy coding!
