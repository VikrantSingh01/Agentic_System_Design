# Contributing

## Authoring principles

1. Write the first pass so a curious child or nontechnical adult can follow it.
2. Introduce an everyday analogy before an abstract mechanism, then explain where the analogy stops working.
3. Define necessary AI jargon immediately in parentheses and include it in the vocabulary table.
4. Use short sections, concrete nouns, and one idea per paragraph. Never trade technical accuracy for a cute explanation.
5. Include at least two small visual explanations in every chapter: a concept picture and
   a process, data, or decision flow. Add another visual when a major mechanism would
   otherwise require several dense paragraphs.
6. Give every diagram plain labels, a one-sentence takeaway, and an equivalent step-by-step
   text description. Keep each beginner diagram focused on one teaching point.
7. Put advanced algorithms and production tradeoffs in an engineering deep dive.
8. Teach vendor-neutral concepts before framework or cloud implementations.
9. Use Python for every runnable example.
10. Support time-sensitive claims with approved primary sources.
11. Never present preview status, pricing, model limits, product names, or regulations as timeless facts.
12. Do not require or expose private chain-of-thought. Prefer observable plans, tool traces, outcomes, critiques, and structured rationale.

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
- diagrams, exercises, and runnable examples added
- defensive security and safety tests added
- validation commands run
- unresolved cross-module requests
- a completed chapter manifest

Review findings belong in `reviews/<chapter>/<role>.md`. Reviewers report issues but do not patch author-owned files.

## Validate changes

Before submitting content or visual changes, run these checks. The animation validator is dependency-free.

```powershell
python scripts/validate_repository.py
python -m unittest discover -s tests -v
python visuals\agent-system-journey\tests\check_asset_offline.py
```

## Source policy

Prefer official papers, system cards, standards, documentation, engineering posts, and source repositories. Record each factual claim in the source ledger with its publication date, access date, supported claim, chapter, and freshness class.

Use these freshness classes:

- `durable`: foundational material unlikely to change
- `evolving`: implementation guidance or a developing standard
- `volatile`: products, APIs, model properties, prices, benchmarks, or regulations

Volatile claims must be rechecked against primary sources within 30 days of a release.