---
title: "Build AI Locally with Ollama"
description: "Recently, I learned about a criminally underused AI tool called Ollama. Use it to build AI models quickly, and more importantly, locally."
date: 2024-04-19T14:00:00-06:00
image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg"
image_alt: "Photo by Lisa Fotios from Pexels"
categories: ["ai"]
authors: ["Kaniel Kirby"]
tags: ["ai", "openai", "chatgpt", "automation", "self-hosted", "ollama"]
draft: false
---

Recently, I learned about a criminally underused AI tool called Ollama. Use it to build AI models quickly, and more importantly, ***locally***.

## Introduction

I've never really spent the time to delve into AI in terms of development, one of the reasons being, it can get quite complex and time-consuming. Ollama is a [self-hosted](https://github.com/lllyasviel/ollama) AI tool that makes the knowledge gap more manageable.

## Models

The most important part is the underlying models they make use of, and in the case of Ollama, they make use of [quite a few important ones](https://ollama.com/library), as well as allowing tweaked [model substitutions](https://ollama.com/blog/run-llama2-uncensored-locally) in place of existing models.

## Docker-like Syntax

Ollama uses typical syntaxes and workflows that come from the Docker ecosystem, meaning you can build `Modelfiles` (Dockerfile) and run commands like `ps`, `run`, `start/stop`, `pull`, etc., to control your AI system. This means less intellectual overhead to get started, as Docker is very well-documented and popular technology. There's also an official [Docker image](https://ollama.com/blog/ollama-is-now-available-as-an-official-docker-image), which can make this even more integrated in already-existing container setups.

## Compatibility with OpenAI API

Recently, they came out with an [OpenAI-like endpoint](https://ollama.com/blog/openai-compatibility) which allows you to use already existing AI implementations that make use of the standards from OpenAI's API.

## Modalities

Ollama has implemented most of the modalities we've come to expect from an advanced AI solution, including [Vision](https://ollama.com/blog/vision-models) and [Text-based Completions](https://ollama.com/blog/how-to-prompt-code-llama).

## Active Community and Team

Ollama also has a great community with many [extensions](https://github.com/ollama/ollama?tab=readme-ov-file#extensions--plugins) and [integrations](https://github.com/ollama/ollama?tab=readme-ov-file#web--desktop), a [Discord](https://discord.com/invite/ollama), and [over 50,000 stars](https://github.com/ollama/ollama/stargazers) on their GitHub.

Not only this, but they blog about their [most recent updates](https://ollama.com/blog) monthly at least (often with multiple posts a month), and are quite active on the project, just in the last week of writing merging/closing [~40-50 PRs in the last week](https://github.com/ollama/ollama/pulls?page=3&q=is%3Aclosed+is%3Apr+closed%3A2024-03-14..2024-03-28). Needless to say, this project is quite popular and well-supported.

## Hardware Support is Improving

Ollama also seems dedicated thus far on increasing the hardware support for different systems, including [Windows support](https://ollama.com/blog/windows-preview) and [AMD support](https://ollama.com/blog/amd-preview), most recently.

## Conclusion

If you're thinking about building AI locally, Ollama is looking to be the best option on the open-source market, and I'd highly recommend it.

That's all for this one. Happy coding! Feel free to @ me on LinkedIn if you have any questions or want to show me something cool you've done with AI recently!
