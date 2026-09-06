# Agentic System Design

A beginner-to-production guide for designing, building, evaluating, securing, deploying, and operating agentic systems.

The project teaches durable, vendor-neutral engineering principles first. Runnable examples use Python. Microsoft technologies are introduced through supported Python SDKs and architecture mappings where they add practical value.

## Learning path

The material is organized as 36 chapters across nine modules:

1. [From Zero to Agents](modules/01-from-zero-to-agents/README.md), Chapters 1-4
2. [Build the Smallest Useful Agent](modules/02-smallest-useful-agent/README.md), Chapters 5-8
3. [Context, Knowledge, and Memory](modules/03-context-knowledge-memory/README.md), Chapters 9-13
4. [Reasoning, Workflows, and Collaboration](modules/04-reasoning-workflows-collaboration/README.md), Chapters 14-18
5. [Evaluation and Improvement](modules/05-evaluation-improvement/README.md), Chapters 19-23
6. [Security, Safety, and Governance](modules/06-security-safety-governance/README.md), Chapters 24-27
7. [Production Architecture and Operations](modules/07-production-architecture-operations/README.md), Chapters 28-32
8. [Scale, Economics, and Lifecycle](modules/08-scale-economics-lifecycle/README.md), Chapters 33-35
9. [Microsoft Synthesis and Capstone](modules/09-microsoft-synthesis-capstone/README.md), Chapter 36

## Recurring case study

**Northstar Research Assistant** begins as a transparent agent loop and grows into an enterprise system that searches approved sources, creates cited reports, acts under delegated user identity, requests approval for consequential actions, resumes long-running work, and supports multiple tenants and regions.

## Repository map

- `modules/`: chapter content, module exercises, and local asset manifests
- `labs/python/`: runnable generic and Microsoft Python labs
- `case-study/northstar/`: cumulative production reference implementation
- `research/dossiers/`: independently owned research-agent outputs
- `research/source-ledger.csv`: approved claims and source freshness
- `coordination/contracts/`: frozen authoring and architecture contracts
- `coordination/dependency-graph.yml`: multi-agent stages and join gates
- `reviews/`: independent pedagogy, technical, and production reviews
- `scripts/`: repository validation tools

## Current status

Stage 0 is in progress. The editorial contract, chapter structure, module ownership boundaries, and orchestration graph are being established before research and chapter agents fan out.

## Validate locally

```powershell
python scripts/validate_repository.py
python -m unittest discover -s tests -v
```

See [CONTRIBUTING.md](CONTRIBUTING.md) before authoring or reviewing content.