---
title: "Don’t Break the Web: Image Caching"
desc: "Exploring the cost of fighting the web’s default patterns."
published: 2026-03-01T14:00:00-06:00
authors:
- Kaniel Kirby
draft: false
featured: true
---

## The Starting Point

One of the projects I worked on for a client was a recipe application.

At the time, images were stored directly as base64 `data:image/...` strings in MongoDB, right on the recipe.

That did not feel like some mysterious design failure. It looked like normal software that was not optimized, but still worked. Only a few hundred recipes, you could save images to the recipe, the public pages could render them, the app worked.

That kind of simplicity felt so... tempting.

Unfortunately, that feeling was was mostly local.

Over time, the image field stopped feeling like just an image field, and I kept being lead to the wrong questions:

- Why is MongoDB or Heroku taking so long?
- Is the server sleeping?
- Do we need to upgrade our subscriptions?
- Should images be fetched separately from recipes?

Fetching images separately is a fine idea, but it was not the real issue. More of a bandaid.

## The Problem

A base64 image string is convenient because it is self-contained. You can put it in a document, return it to the client, and render it directly.

That convenience hides a few problems.

The first is payload size. Every image becomes larger before it is even stored, simply by being in Base64 strings.

Storage was another concern. MongoDB can store large strings, but storing and serving binary assets inside application documents is not what document storage is actually optimized for. GridFS exists specifically to handle larger files by splitting them into chunks and streaming them efficiently.

The biggest practical issue, though, was how images were loaded.

Browsers are very good at caching image assets when they are served as independent resources. Once an image has its own URL, the browser can store it, reuse it across page loads, and avoid downloading it again until it changes.

By embedding the image data directly into the recipe document, we unknowingly gave up a lot of those benefits. That meant larger payloads, unnecessary network traffic, and repeated image downloads that could have been avoided.

## The Migration

The actual conversion process was intentionally boring.

Before anything, I made sure Mongo's GridFS were already deployed and working. There was no point migrating to a storage system that wasn't available without another subscription we don't have. No issues yet, all built in.

We also made a conversion script that we could run against Mongo, which would make it pretty simple to test locally with a DB dump.

Lastly, I took backups, and executed the script. Success!

## What I Would Do Differently Next Time

The obvious lesson is not to store application images as base64 strings inside MongoDB documents.

Which, sure. 😅

I think the more useful lesson is making sure we're not fighting web standards / optimizations.

Browsers, CDNs, proxies, and application frameworks have spent decades optimizing common patterns. Images referenced by URLs can be cached. Assets can be requested independently. Clients can decide when they need them. Servers can stream them efficiently.

None of those optimizations require much effort because they are the path the platform expects you to take.

Data URLs bypass a lot of that. The image becomes inseparable from the document that contains it, and a reference to the image ends up being the image itself. Caching becomes basically impossible.

This shows up outside of image handling too. The web tends to reward designs that separate concerns cleanly and let each layer do its job:

- APIs that return only the data a client needs
- static assets served independently from application data
- cacheable resources with stable identifiers
- systems that make the common path easy and efficient

When a design starts fighting those assumptions, it does not always fail immediately. Sometimes it works perfectly well for a while.

But over time, you find yourself rebuilding optimizations that the platform would have given you for free.
