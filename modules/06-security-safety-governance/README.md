# Module 06: Security, Safety, and Governance

## Outcome

Threat-model an agentic system, restrict tool authority, propagate identity safely, protect data, and establish accountable human oversight.

## Before you start

Complete Modules 02-05. You should be able to trace a request through the runtime and
turn an expected outcome or denial into a repeatable test.

## Chapters

24. [**Threat Modeling Agentic Systems**](chapters/24-threat-modeling-agentic-systems.md): map assets, trust boundaries, adversaries, and testable abuse cases.
25. [**Secure Tools and Sandboxes**](chapters/25-secure-tools-and-sandboxes.md): enforce least authority, isolation, validation, and effect controls.
26. [**Identity, Privacy, and Content Safety**](chapters/26-identity-privacy-content-safety.md): preserve delegated identity and protect tenant data across every boundary.
27. [**Responsible AI and Governance**](chapters/27-responsible-ai-governance.md): assign accountable decisions, evidence, release gates, and human oversight.

## Northstar milestone

Defend against indirect prompt injection and data exfiltration, enforce delegated identity and tenant isolation, and preserve auditable approval evidence.

## Dedicated security testing track

Security is not one final check. Each chapter in this module adds tests to a growing,
offline **agent security test suite** (repeatable checks that try unsafe or unexpected
inputs without attacking a real system).

- **Map what could go wrong:** draw trust boundaries and turn threats into test cases.
- **Test tool boundaries:** verify invalid inputs, excessive permissions, repeated
   actions, timeouts, and sandbox escapes are blocked or contained.
- **Test identity and data boundaries:** verify one user or tenant cannot access
   another's data, secrets are redacted, and delegated permissions are enforced.
- **Test hostile content safely:** use harmless prompt-injection and data-exfiltration
   simulations to confirm untrusted instructions cannot override policy.
- **Test human control:** verify consequential actions pause for informed approval,
   denials remain denied, and audit evidence records what happened.
- **Retest after change:** keep failures as regression tests so a model, prompt, tool,
   policy, or dependency update cannot silently reopen a known weakness.

The track must include a child-friendly threat map and a request-to-decision security
flow. Examples stay defensive, synthetic, local, and free of real credentials or
personal data.

**Continue:** [Previous module: Evaluation and Improvement](../05-evaluation-improvement/README.md) | [Book overview](../../README.md) | [Next module: Production Architecture and Operations](../07-production-architecture-operations/README.md)