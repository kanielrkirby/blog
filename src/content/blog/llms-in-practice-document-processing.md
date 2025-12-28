---
title: "LLMs in Practice: Document Processing"
desc: "LLMs are powerful, but they're not always the right tool. Here's what we learned building an AI document pipeline."
published: 2026-03-17T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - ai
  - llm
  - ocr
  - document-processing
draft: false
---

## Just Use AI

You have a pile of documents. They're inconsistent, semi-structured, and need data extracted. Someone says "just use AI" and suddenly you're architecting an LLM pipeline.

We did. Here's how it went.

## Define Success First

"As accurate as possible" is not a number, and some clients will inevitably be very eager to point that out... at the end of implementation / UAT.

We sat down early and defined accuracy concretely: what specific errors are unacceptable? What's the cost of a false positive vs. false negative? How much human review capacity do we have?

We landed on 50%. This across thousands of documents is valuable, and can be improved over time during maintenance.

Having that number written down saved us. When someone asked "can it also do X?" we could check whether X fit within the agreed target or whether it was scope creep (read about that [here](/scope-creep)).

## Start With LLM, Then Optimize

We started with the LLM doing everything. MVP: throw documents at it, get structured output, see what works.

Once we understood the patterns, we optimized:

**Template-based extraction for known formats.** Most documents fell into a handful of recognizable layouts. For those, explicit parsing rules were fast, cheap, and deterministic.

**LLM as fallback.** When a document didn't match any template, then send it to the LLM.

This meant the expensive, probabilistic tool only handled genuinely ambiguous cases - maybe 20-30% of volume.

## Cache Everything

<details>
  <summary>...</summary>

> Just don't cache exceptions...

</details>

LLM API calls cost money. Vision APIs cost more. Iterating on the flow locally can burn money quickly.

To solve this, we built a caching layer that saved OCR results, API responses, and structured outputs to disk. Run the pipeline once against real documents, then iterate on post-processing logic without hitting APIs again.

<details>
  <summary>Sneak-peek</summary>

Here's the gist - a decorator that hashes function arguments and stores results to a JSON file:

```py
def cache_to_file(prefix):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            key = f"{prefix}_{hash_args(args, kwargs)}"
            cache = load_cache()
            if key in cache:
                return cache[key]
            result = func(*args, **kwargs)
            cache[key] = result
            save_cache(cache)
            return result
        return wrapper
    return decorator

@cache_to_file("ocr")
def extract_document(pdf_bytes, schema):
    return call_vision_api(pdf_bytes, schema)
```

Toggle it with an env var so production doesn't cache.

One gotcha: PDFs have unique IDs embedded in them. The same document re-exported will have a different hash. Strip those first or you'll never get cache hits. For example, in PyMuPDF:

```py
doc = fitz.open(stream=pdf_bytes, filetype="pdf")
pdf_bytes = doc.tobytes(no_new_id=True)
```

</details>

## Where LLMs Shine

The best use wasn't bulk extraction, though it was quite good at that too. It was semantic judgment calls.

Our database lookup sometimes returned multiple candidates with similar names. String distance says "Some Nice Property A" and "Some Nice Property B" are almost 99% similar - probably the same. But a human would look at context and say "no, these are distinct."

The LLM could make that call. Not strictly perfectly, but better than string matching and cheaper than human review on every ambiguous case.

Small, bounded, semantic tasks were the _best_ cost and performance. Things like:

- "Structure this text into these fields"
- "Which of these candidates is the best match?"
- "Classify this document"

## Tuning

It can take a lot of testing to find the right balance of cost and accuracy, or query size and hallucination.

We ended up with ~20 page chunks, sent with a very specific prompt rules: ONLY extract these fields, format codes like this, never include XYZ in descriptions, treat blank fields as null not "N/A". The difference between a lazy prompt and a precise one was massive.

Model choice mattered too. Cheaper models hallucinated more. Vision models handled layouts that text-only couldn't. You're trading money for accuracy at every point.

## Validation

We flagged extractions automatically:

- Unrecognized entities
- Values outside expected ranges
- Low confidence scores
- Fields that changed suspiciously from prior records

Flags routed documents to human review. The pipeline reduces how many documents humans see, not replaces them.

## The Takeaway

LLMs buy you flexibility and semantic understanding. You pay with speed, money, and determinism.

Start with LLM to learn your problem space. Optimize with templates where patterns emerge. Keep the LLM as a backup.

That's what worked for us.
