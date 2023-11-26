---
title: "Astro, in Brief"
description: "Here, I want to go through as much of Astro as I can in as little time as possible. I'll explain what it is, when to use it, and what all the hype is about."
date: 2023-11-24T14:00:00-06:00
image: "/images/posts/astro-in-brief/pexels-killian-eon-2868665.jpg"
image_alt: "Photo by Killian Eon: https://www.pexels.com/photo/star-trail-photography-2868665/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "astro", "ssg", "ssr", "full stack", "javascript", "typescript", "framework", "react", "svelte", "vue"]
draft: false
---

Astro is awesome. That's the headline lately, and I can't help but agree.

Astro is a new framework for building websites. It's a static site generator (SSG) and server-side renderer (SSR) all in one. It's built on top of Vite, and it's built specifically for speed and ease of use.

Do you want to use React, mixed with a little Svelte and Vue (god knows why you'd ever *want* that, but I digress)? You can.

What about TypeScript, Sass, and Markdown? All supported, and built right in, no configuration required.

Do you need server side rendering for a couple complex pages, but you want the rest of your site to be static? It's easy to do with Astro.

## Table of Contents

- [What is Astro?](#what-is-astro)
- [When should I use Astro?](#when-should-i-use-astro)
- [What's the hype about?](#whats-the-hype-about)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Routing](#routing)
- [Components](#components)
- [Layouts](#layouts)
- [State Management](#state-management)
- [Data Fetching](#data-fetching)
- [Markdown](#markdown)
- [CSS](#css)
- [TypeScript](#typescript)
- [SSR](#ssr)
- [Conclusion](#conclusion)

## What is Astro?

## When should I use Astro?

With all these great things, you should know that Astro isn't a silver bullet. It's not a replacement for Next. It's an alternative, when you need a content-driven site, with the flexibility and interactivity of a React/Vue/Svelte app.

If you need docs, a blog, or a landing page, Astro is a great choice. Otherwise, it might just be a *good* choice.

## What's the hype about?

It's still in active development, and has a great community developing plugins, meaning we get new, awesome features pretty often, including View Transitions built-in, integrations with new frameworks like Qwik, and even internationalization features that are coming. You get all the features of whatever framework you choose, plus Astro's SSG/SSR features, and it's all built on top of Vite, everyone's favorite build tool. It's no wonder people are excited about it.

## Setup

Let's get started! First, we need to install Astro. We can do that with `npm` or `yarn`.

```bash
yarn create astro my-astro-project
```

It'll take you through the setup process, and let you customize frameworks, TypeScript, templates, etc.

## Project Structure

Astro projects are structured like this:

```bash
.
├── astro.config.mjs
├── package.json
├── dist
├── src
│   ├── components
│   ├── layouts
│   └── pages
└── public
```

- `astro.config.mjs` is the configuration file for Astro. It's where you can configure things like Vite, integrations, and experimental features.
- `package.json` is the standard package.json file.
- `dist` is where the built site goes. This is standard for Vite projects.
- `src` is where all the source code goes.
  - `components` is where all the components go, as a convention.
  - `layouts` is where all the layouts go, as a convention.
  - `pages` is where all the pages go, required.
- `public` is where all the static assets go, which is standard for Vite projects.

## Routing

Routing is super easy, as it's just handled by the file structure. If you have a file in `src/pages/about.astro`, it'll be available at `/about`. If you have a file in `src/pages/blog/[slug].astro`, it'll be available at `/blog/1` (or whatever the slug is). These files can be markdown or Astro components.

## Components

Components are the bread and butter of Astro. They're just like React components, except they can be written in React, Vue, or Svelte. They can also be written in Astro, without the reactivity of the other frameworks.

```astro
---
export interface Props {
  name: string
}
---

<h1>Hello, {name}!</h1>
```

```astro
---
import { Hello } from '../components/Hello.astro'
---

<Hello name="Kaniel" />
```

You can also make React components that don't even deliver JS to the browser, and are just used for server-side rendering. If you *do* need reactivity, there are different hydration modes that help.

```ts
interface Props {
  initialCount: number
}

export defaulot function Counter({ initialCount }: Props) {
  const [count, setCount] = useState(count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

```astro
---
import { Counter } from '../components/Counter.tsx'
---

<!-- No hydration, plain HTML with 10 hardcoded -->
<Counter count={10} />

<!-- Hydrate on load, immediately, onclick works just fine -->
<Counter count={10} client:load />

<!-- Hydrate when page is idle, onclick works just fine, lower priority -->
<Counter count={10} client:idle />

<!-- Hydrate when component is visible -->
<Counter count={10} client:visible />

<!-- Hydrate on a specific media query -->
<Counter count={10} client:media="(min-width: 768px)" />

<!-- Completely skip SSR, send as a normal React component -->
<!-- Must include framework name -->
<Counter count={10} client:only="react" />
```


## Layouts

Layouts are a great way to share common base code between pages, like <head>. They're exactly the same as Astro components, just as a convention for where they go and what they're used for.

```astro
---
export interface Props {
  title: string
  description: string
}

const { title, description } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

```astro
---
import { Layout } from '../layouts/Layout.astro'
---

<Layout title="About" description="This is the about page.">
  <h1>About</h1>
  <p>This is the about page.</p>
</Layout>
```

## State Management

Sometimes you need some reactivity in those components, and with Astro's "island" architecture, this isn't the easiest to find. Fortunately, there's a great solution: Nanostores.

It's a tiny state management library. Easy to install, and use with *any* framework, or even without one. It's a great solution for Astro. The entire point of it is to be separate from the framework you're using.

```bash
astro add nanostores @nanostores/react
```

Then we set up the store (typically in `src/stores/store.ts`):

```ts
import { atom } from 'nanostores';

export const count = atom(0);
```

Then we can use it in our components:

```ts
import { createStore } from '@nanostores/react'

export default function Counter() {
  const [count, setCount] = createStore(count);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Now this looks just like regular React, but it's framework agnostic, and it's easy to use with other frameworks or without one at all. Let's take Vue for example.

```bash
astro add @nanostores/vue
```

```vue
<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script>
import { createStore } from '@nanostores/vue'

export default {
  setup() {
    const [count, setCount] = createStore(count);

    return {
      count,
      increment: () => setCount(count + 1)
    }
  }
}
</script>
```

That easy. Instantly reactive and synced. No need to worry about anything else. I'll go into Nanostores another day though.

## Data Fetching

In Astro, you can easily fetch data asynchronously, and it'll be server-side rendered. This is great for things like blog posts, or other content-driven pages.

```astro
---
const data = await fetch('https://jsonplaceholder.typicode.com/todos/1').then((res) => res.json());

export interface Props {
  data: typeof data
}
---

<h1>{data.title}</h1>

<p>{data.body}</p>
```

Remember this won't be updated after the first build unless you set up SSR.

## CSS

Astro supports CSS out of the box, with Sass support as well. You can use CSS modules, or just regular CSS. It's all up to you.

```astro
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>```

All styles are scoped to the specific file or component you're working on, much like Svelte. You can also use Tailwind, just run the following:

```bash
astro add tailwind
```

Update the content in your `tailwind.config.cjs` file to match the files you need, and then you can use Tailwind in your components.

```astro
<h1 class="text-4xl font-bold text-center">Hello, world!</h1>

<style>
  .container {
    @apply flex flex-col items-center justify-center;
    .inner {
      @apply flex flex-col items-center justify-center;
    }
  }
</style>
```

## TypeScript

Astro has TypeScript support built-in, and it's super easy to use. Just say yes during the setup process, or add it using the following command:

```bash
astro add typescript
```

Then you can use TypeScript in your components, layouts, and pages.

## SSR

Finally, the most important part, how easy it is to set up a project using Server Side Rendering. It's as easy as going into your `astro.config.mjs` file, and adding the following:

```ts
import netlifyPlugin from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlifyPlugin({
  ..
  }),
});
```

You can take a look at their [adapters](https://docs.astro.build/en/guides/deploy/) for other options. The `output` can be `server`, `hybrid`, or the default. `server` is for primarily SSR sites, and `hybrid` is for primarily client side sites (SSG). In either of these cases, you can opt out pretty easily on any given page by just passing the following:

```astro
---
export const prerender = false; // prerender means not dynamic, determined at build time
---
```

## Conclusion

Astro is a great framework, and it's only getting better. It's easy to use, and it's easy to get started. It's a great choice for content-driven sites, and it's a great choice for sites that need a little more interactivity. I've loved using it, and I can't wait to see what the future holds for it.
