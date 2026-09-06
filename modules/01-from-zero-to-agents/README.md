# Module 01: From Zero to Agents

## Outcome

Explain what makes a system agentic, describe the observe-decide-act loop, build intuition for language models, and show how probabilistic components fit inside deterministic software.

## Before you start

No AI or agent experience is required. Read the chapters in order: each one introduces
terms and boundaries used by the next.

## Chapters

1. [**Why Agentic Systems**](chapters/01-why-agentic-systems.md): agents versus automation, assistants, and workflows; autonomy as a spectrum; when not to use an agent.
2. [**The Observe-Decide-Act Loop**](chapters/02-observe-decide-act-loop.md): environment, goals, state, policy, actions, feedback, and termination.
3. [**AI and LLM Primer**](chapters/03-ai-and-llm-primer.md): tokens, embeddings, inference, probability, transformers, context windows, hallucination, and nondeterminism.
4. [**From Software to AI Systems**](chapters/04-from-software-to-ai-systems.md): deterministic controls around probabilistic models, contracts, state machines, and control/data planes.

## Northstar milestone

Northstar is the course's running example: a bounded research helper that searches
only approved sources, returns evidence with its summaries, and cannot publish or
change records. In this module, define its environment, goal, observations, permitted
actions, state, stop conditions, and fixed-workflow baseline before writing
model-dependent code. Module 2 will implement that design offline.

**Continue:** [Book overview](../../README.md) | [Next module: Build the Smallest Useful Agent](../02-smallest-useful-agent/README.md)