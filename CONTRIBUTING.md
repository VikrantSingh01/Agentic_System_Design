# Contributing

## Authoring principles

1. Write for a high-school or early-college reader on the first pass.
2. Put advanced algorithms and production tradeoffs in an engineering deep dive.
3. Teach vendor-neutral concepts before framework or cloud implementations.
4. Use Python for every runnable example.
5. Support time-sensitive claims with approved primary sources.
6. Never present preview status, pricing, model limits, product names, or regulations as timeless facts.
7. Do not require or expose private chain-of-thought. Prefer observable plans, tool traces, outcomes, critiques, and structured rationale.

## Agent ownership

Each agent receives an explicit list of owned paths and forbidden paths. An agent must not edit another owner's files. Requests that cross ownership boundaries go under `coordination/requests/` and are resolved at the next join gate.

Shared files have one owner per stage:

- Root navigation and module indexes: Editor-in-Chief
- `research/source-ledger.csv`: Source Editor
- Editorial and Northstar contracts: Editor-in-Chief or named architect
- Python dependency lockfile: Runtime Maintainer
- GitHub Actions workflows: Release Engineer

## Chapter pull requests

A chapter pull request must include:

- learning objectives covered
- approved sources used
- volatile claims requiring freshness review
- diagrams, exercises, and labs added
- validation commands run
- unresolved cross-module requests
- a completed chapter manifest

Review findings belong in `reviews/<chapter>/<role>.md`. Reviewers report issues but do not patch author-owned files.

## Source policy

Prefer official papers, system cards, standards, documentation, engineering posts, and source repositories. Record each factual claim in the source ledger with its publication date, access date, supported claim, chapter, and freshness class.

Use these freshness classes:

- `durable`: foundational material unlikely to change
- `evolving`: implementation guidance or a developing standard
- `volatile`: products, APIs, model properties, prices, benchmarks, or regulations

Volatile claims must be rechecked against primary sources within 30 days of a release.