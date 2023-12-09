---
title: "Chat GPT Cheatsheet (2023)"
description: "A cheatsheet for better strategies to converse with LLMs like GPT, and the differences between different models."
date: 2023-12-4T14:00:00-06:00
image: "/images/posts/gpt-cheat-sheet-2023/pexels-google-deepmind-17485709.jpg"
image_alt: "Photo by Google DeepMind: https://www.pexels.com/photo/an-artist-s-illustration-of-artificial-intelligence-ai-this-image-visualises-the-input-and-output-of-neural-networks-and-how-ai-systems-perceive-data-it-was-created-by-rose-pilkington-17485709/"
categories: ["productivity", "ai", "cheatsheet"]
authors: ["Kaniel Kirby"]
tags: ["ai", "productivity", "github", "copilot", "cheatsheet"]
draft: false
---

Providing adjacent examples to the problem you're trying to solve is the best way to get good results from LLMs like GPT. Some examples include:

- "In React, you solve this problem by... how do you solve this in Vue?"
- "Tell me some productivity tips for MacOS users. Some things I already know are..."

A few general purpose lines to use that have been proven to generate better results include:

- "This is extremely important to my career."
- "Take a deep breath."
- "Take this step-by-step."

It's good to be clear about what you're asking for. Some examples of directions that can give differing results include:

- "Alternatives to..."
- "Comparisons between..."
- "Elaborations on..."
- "Speculations about..."
- "Benefits and drawbacks of..."

Especially in newer models like GPT-4, moderate verbosity is rewarded. Don't be scared of overwhelming the model's capabilities by asking for something "too specific". Try it, and adjust if needed.

Use for bugs: Send the entire error in it's own <span>```block```</span>, stack-trace and all. This will give the model the best chance of understanding the problem and providing a solution.

If you're working with bulks of text, try to divide them using backticks. This helps differentiate between the text and the prompt.

Sometimes, the context window that you're in can affect the results, and longer context windows can cause hallucinations. In other words, if you're getting weird, nonsensical results, try switching to a different conversation.
