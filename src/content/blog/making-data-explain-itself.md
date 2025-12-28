---
title: "Data Provenance: Making Data Explain Itself"
desc: "How building error tracking and source metadata into your data primitives can save your sanity within complex pipelines."
published: 2026-04-21T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - api
  - error-handling
  - python
  - debugging
draft: false
---

## The Problem

You're pulling data from five different government APIs. Each has its own quirks: some suppress data below certain thresholds, some are missing entire regions, some have rate limits, some return zeros when they mean null.

You feed all this into calculations. Derived metrics, ratios, scores. Then you hand the results to a data scientist for validation.

They come back: "This number looks wrong."

Okay... Which of the 37 data points is the problem? Was it a missing value that defaulted to zero? A suppressed value that should have triggered a fallback? An API error that got swallowed? A division by zero that got caught?

If you haven't tracked provenance, you're doing archaeology just to figure things out.

## The Solution

We built a data container that carries its history with it. Every value knows:

- **Where it came from:** Source API, endpoint, parameters
- **Whether it's clean:** Success, warning (used fallback), or error
- **What went wrong:** Specific error codes if something failed
- **How it was derived:** For calculated values, the formula and inputs

The core idea is a wrapper around values that accumulates metadata:

```python
# Pseudocode

@dataclass
class DataPoint:
    value: Any
    source: str          # Human-readable source
    status: Status       # SUCCESS, WARNING, ERROR
    code: str            # Specific error/fallback code
    message: str         # Human-readable explanation
```

When you do operations on the data, it creates new metadata:

```python
result = population / establishments
# result.source = "population / establishments"
# If establishments was 0: result.status = ERROR, result.code = "division_by_zero"
# If either input had a warning: result.status = WARNING
```

Errors and warnings bubble up. A calculation that depends on 10 inputs will reflect the worst status of any input.

## Fallback Tracking

Government data is notoriously sparse. You request data for a specific region and industry classification, and it's suppressed or missing. So you fall back to broader categories.

The data container tracks this:

```python
# Requested: NAICS 541511 (Custom Computer Programming) in Specific County
# Returned: NAICS 5415 (Computer Systems Design) at State level

value.code = "fallback.geographic_and_naics"
value.message = "Used state-level data with broader industry classification"
value.status = WARNING  # It's still usable, but flagged
```

Now when someone asks "why does this market look weird?" you can see immediately: it's using aggregated data because the specific data was unavailable.

## Safe Arithmetic

Division by zero is the classic case, but there are others:

- Missing dependencies in calculations
- Invalid input types
- Numeric overflow
- NaN propagation

Instead of throwing exceptions or silently returning garbage, operations return error-status DataPoints:

```python
def __truediv__(self, other):
    if other.value == 0:
        return DataPoint.error(
            code="division_by_zero",
            message=f"Cannot divide {self.value} by zero",
            source=f"{self.source} / {other.source}"
        )
    # ... normal division
```

The calculation continues, the error is recorded, and downstream code can decide how to handle it.

## Visualizing Results

For validation, we exported results to a spreadsheet with conditional formatting:

- **Green:** Clean data, successful calculation
- **Yellow:** Data with fallbacks or warnings
- **Red:** Errors, missing values, calculation failures

A data scientist could scan a sheet and immediately see: "Row 47 is yellow because the establishment count used state-level fallback. Row 52 is red because the API returned no data for that region."

This turned multi-hour debugging sessions into five-minute visual scans. Is that the most efficient debugging step? No, it's not, but it was much quicker to set up than a fully automated testing suite, especially when we didn't know _what_ could go wrong yet.

## What Prompted This

We didn't design this upfront. We started with basic error handling: try/except blocks, logging statements, default values for missing data.

Then the debugging started. "Where did this zero come from?" "Why is this null?" "Which API call failed?"

The logs and error handling wasn't localized - it was scattered across the entire codebase. Every function had its own approach to reporting problems. Nothing composed.

Building provenance into the data primitive consolidated all of that. One pattern, consistently applied, automatically propagating through every calculation.

## When To Use This Pattern

This is worth the overhead when:

- **Multiple data sources with different reliability characteristics**
- **Complex calculations where any input might be bad**
- **Human validation is part of the workflow**
- **Debugging requires tracing values back to their origin**
- **Fallback logic that needs to be visible, not hidden**

It's probably overkill for simple pipelines with trusted data sources.

## The Payoff

When the data scientist says "this number looks wrong," the response is:

"Click the cell. The comment shows: source is BLS QCEW, calculated as payroll divided by establishments, establishments value used state-level geographic fallback. Let me check if the state-level establishment count makes sense for this analysis."

That's not magic. That's just data that remembers where it came from.
