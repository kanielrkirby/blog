---
title: "Debugging Production: The JIT Parameter"
desc: 'PostgreSQL: FATAL: unrecognized configuration parameter "jit"'
published: 2026-02-17T14:00:00-06:00
authors:
  - Kaniel Kirby
tags:
  - debugging
  - postgresql
  - devops
  - odoo
draft: false
featured: true
---

## Situation Report

**Location:** Passenger seat

**Connection:** Mobile hotspot

**Production:** `FATAL: unrecognized configuration parameter "jit"`

We were running an ERP deployment on a managed platform. Everything tested perfectly in development. Push to production, immediate crash on a crucial database connection.

The error pointed to PostgreSQL's `jit` parameter - Just-In-Time compilation. But we hadn't configured anything with JIT, and I didn't even know what it was for. What's going on!?

## Research

Let's look up what this is all about. I Google "FATAL: unrecognized configuration parameter jit" (and various permutations).

**1st hit: `Odoo.com/forum` post**

> I'm trying using `psycopg2`, in my Odoo local I can access successfully, but not in Odoo.sh, I get this error: `connection to server at "xxx.xx.xxx.xxx", port xxxx failed: FATAL: unrecognized configuration parameter "jit"`
> To solve this issue you need to disable JIT explicitly when making the connection.

Great news. Let's verify by searching for where and why this happened, and what the most idiomatic solution is.

## Recon

First sweep: grep the codebase for `jit` locally, using `\b` to avoid hitting words that contain `jit`. `--binary-files=without-match` to avoid binary files.

```bash
grep -r "\bjit\b" --binary-files=without-match ~/project/directory/odoo  # Community
grep -r "\bjit\b" --binary-files=without-match ~/project/directory/enterprise  # Enterprise
grep -r "\bjit\b" --binary-files=without-match ~/project/directory/odoo-modules  # Our implementation
```

Nothing. Second sweep: login to Odoo.sh (PaaS for hosting and CI/CD), enter command line, and start greping the Linux box.

```bash
grep -r "\bjit\b" --binary-files=without-match /etc/
grep -r "\bjit\b" --binary-files=without-match /home/odoo/
grep -r "\bjit\b" --binary-files=without-match /var/log
find /var -path /var/log -prune -o -type f -print0 | xargs -0 grep -nH "jit"
```

`/var/log` is protect by Odoo.sh for whatever reason, nothing is found in `/etc`, and `/var` just contains packages for PostgreSQL's JIT.

A thousand lines of various `numba.jit` references (Numba is a math library in Python). Let's exclude that too.

```bash
grep -r "\bjit\b" --binary-files=without-match --context 10 /home/odoo | grep -v numba
```

```
/home/odoo/src/enterprise/sale_commission/report/commission_report.py:        # Deactivate the jit for this transaction
```

While this sounded very exciting, it turned out to be a leftover comment for a workaround that was removed. Not relevant at all.

What about `psycopg2`? How does it load things?

## The Break

Clearly there's nothing happening IN the Linux box. It's something happening TO the box, injected in from the platform. What about the environment?

```bash
env | grep jit
PGOPTIONS=-c jit=off
```

The evil is here. The platform was setting `PGOPTIONS` as an environment variable. This gets passed to libpq and applied to every PostgreSQL connection automatically. It wasn't in any config file - it was injected into the shell environment.

## Root Cause Analysis

The platform set `PGOPTIONS=-c jit=off` to disable JIT compilation (probably for performance consistency). This works fine when connecting to a modern PostgreSQL that understands the `jit` parameter.

Our external production database was PostgreSQL 10 or older (given by the first Stack Overflow result from the error message). It didn't recognize `jit` as a valid parameter at all - on OR off. When the connection tried to set an unknown parameter, Postgres rejected it outright.

Local worked because `PGOPTIONS` wasn't set in our development environment. No parameter, no problem.

## Resolution

At first, I searched for an idiomatic solution. Surely there's a list of environment variables in the platform, under this project, _somewhere_!

Alas, not Google, nor Stack Overflow, nor ChatGPT could tell me where this could be. The only option was to override it in the initialization logic for `psycopg2`.

```py
# Pass options='' to override PGOPTIONS env var which may contain
# parameters (like jit) unsupported by older PostgreSQL servers
conn = psycopg2.connect(CONNECTION_STRING, options='')
```

## Post-Incident

The next day, we pinned our local development Postgres version to match the production database, and I added `PGOPTIONS="-c jit=off"` to my local setup. Less variables, less to debug later.

I showed this process because that's what software development is about. You're not supposed to know what JIT is in PostgreSQL, or that versions before 10 don't support JIT, or that your PaaS sets things in your environment variables:

You're supposed to find out.
