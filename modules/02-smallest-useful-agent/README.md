# Module 02: Build the Smallest Useful Agent

## Outcome

Implement Northstar's first transparent, bounded agent runtime. It accepts structured
messages, compares model routes, exposes only typed tools, enforces budgets, and ends
with an explicit status. Every lab runs offline with deterministic test doubles
(predictable substitutes for external systems).

Northstar remains a research assistant, not an independent publisher. It collects
invented source IDs from a read-only catalog and produces material for review; model
output never supplies identity, permission, approval, or extra budget.

## Before you start

Complete Module 01, especially the observe-decide-act loop and deterministic control
boundaries. Read this module in order because Chapters 5-8 assemble one runtime.

## Chapters

5. [**Messages, Prompts, and Structured Output**](chapters/05-messages-prompts-structured-output.md): separate instructions from untrusted research text and validate `DraftReportV1`.
6. [**Models and Inference**](chapters/06-models-and-inference.md): compare replaceable model routes against the same contract and hard limits.
7. [**Tools and Function Calling**](chapters/07-tools-and-function-calling.md): turn a generated proposal into a checked request for one narrow capability.
8. [**The Agent Runtime**](chapters/08-agent-runtime.md): assemble messages, model boundary, tools, state, budgets, traces, and named stopping conditions.

The progression is cumulative: Chapter 5 defines the data contract; Chapter 6 chooses
how to produce a candidate; Chapter 7 controls access to the environment; and Chapter
8 owns the loop. Each boundary keeps the previous chapter's guarantees rather than
handing them to a model or framework.

## Northstar milestone

Build the first offline-tested Northstar loop with typed research tools and explicit
step, token, time, retry, and cost budgets. The milestone is complete only when
malformed, unauthorized, repeated, injected, and over-budget fixtures reach a safe,
named stop without network access or consequential side effects.

Module 3 then separates **context** (information assembled for one model call),
**knowledge** (information available from sources), and **memory** (information
deliberately retained for later). Module 2's bounded messages, provenance, state, and
traces provide that foundation; they do not make every transcript or result permanent.

**Continue:** [Previous module: From Zero to Agents](../01-from-zero-to-agents/README.md) | [Book overview](../../README.md) | [Next module: Context, Knowledge, and Memory](../03-context-knowledge-memory/README.md)