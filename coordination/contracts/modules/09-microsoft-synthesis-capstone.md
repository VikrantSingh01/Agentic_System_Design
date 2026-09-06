# Module 09 Contract: Microsoft Synthesis and Capstone

> Status: planned
> Owner: J2 Module 09 contract author
> Last verified: 2026-09-06
> Scope: Chapter 36 only

## Module purpose

Module 09 completes the Northstar Research Assistant by testing whether its accepted,
vendor-neutral production design can be implemented with current Microsoft services without
weakening its interfaces, invariants, evaluation gates, or replacement paths. The chapter is
a synthesis and production-readiness gate, not a first introduction to architecture and not a
catalog of products.

The design is proven before products are mapped. A Microsoft product choice cannot replace a
requirement, threat model, evaluation result, workload measurement, or build, buy, or hybrid
decision. Every product statement is volatile and must be verified against an approved primary
source no more than 30 days before release.

## Chapter 36: Northstar on the Microsoft Stack

### Reader question

How should we map the proven design to Microsoft services without surrendering our
requirements or interfaces?

### Prerequisites

Direct prerequisites are Chapters 27, 28, 29, 30, 31, 32, 33, 34, and 35. Their prerequisite
closure supplies the bounded runtime, permission-aware retrieval, evaluation harness,
security controls, durable execution, observability, delivery, state design, economics,
tenant and regional controls, and lifecycle evidence used here. Chapter 36 must not reteach
or silently revise those contracts.

### Reader entry

The reader enters with:

- an accepted vendor-neutral Northstar component model and typed domain interfaces;
- frozen quality, security, privacy, safety, reliability, latency, recovery, accessibility,
  operations, and cost requirements;
- representative evaluation and workload evidence, including the deterministic baseline;
- a threat model, data classification, identity model, authority model, and governance record;
- tested infrastructure, release, rollback, backup, restore, regional, and retirement plans;
- no requirement for prior Microsoft cloud product knowledge.

### Reader exit

The reader leaves able to:

- preserve stable domain contracts while placing Microsoft-specific code behind adapters;
- trace each candidate service to a frozen requirement and reject unsupported mappings;
- defend build, buy, and hybrid alternatives using measured evidence and explicit tradeoffs;
- identify product facts that need claim-level evidence and a 30-day freshness check;
- review Python adapters, infrastructure as code, delivery controls, and operating evidence as
  one deployable system;
- conduct a production-readiness review that can accept, conditionally accept, or reject the
  capstone without making a compliance claim.

### Measurable outcome

Produce and defend a build, buy, or hybrid architecture whose Microsoft mappings satisfy the
frozen quality, security, reliability, operations, recovery, accessibility, and cost
requirements. The submission passes only when every product claim is marked `VOLATILE`, cites
an approved ledger ID, records a verification date within 30 days of the planned release date,
and either passes its mapped acceptance test or remains an explicitly owned unresolved item.

### Vocabulary

| Term | Plain-language meaning |
|---|---|
| Vendor-neutral contract | A responsibility, interface, or rule that does not depend on one provider's product. |
| Service mapping | A dated proposal that assigns a vendor-neutral responsibility to a product or custom component. |
| Adapter | Microsoft-specific code that translates between a stable domain interface and a product API. |
| Build | Implement and operate the responsibility mainly in application-owned Python and infrastructure. |
| Buy | Adopt a managed capability while retaining acceptance tests, policy, and an exit path. |
| Hybrid | Combine managed capabilities with application-owned control and domain boundaries. |
| Volatile product claim | A statement about a current product name, API, SDK, feature, limit, region, price, release state, security behavior, or service boundary that can change. |
| Freshness check | Evidence that a volatile claim was verified against an approved primary source no more than 30 days before release. |
| Production-readiness review | A cross-functional decision based on operating evidence, residual risk, ownership, and rollback readiness. |
| Exit path | The tested way to replace or remove a product without changing the durable domain contract. |

### Required artifacts

1. A frozen-requirements register with stable requirement IDs, owners, thresholds, and prior
   acceptance evidence.
2. A vendor-neutral reference architecture and deployment-context decision record inherited
   from Chapter 28.
3. A build, buy, or hybrid decision matrix for every vendor-neutral component, including the
   deterministic baseline and a no-change option.
4. A service-mapping matrix that records requirement IDs, adapter boundaries, product claim
   text, approved source IDs, verification dates, release dates, regions, limitations,
   acceptance tests, and exit paths.
5. Python 3.11 adapter contracts and offline deterministic tests. All runnable examples are
   Python. No runnable example may require another programming language.
6. Infrastructure-as-code plans and modules for each environment, with reviewable plans,
   policy checks, secret references, identity assignments, network boundaries, regional
   parameters, tags, budgets, and rollback or destroy procedures.
7. A traceability matrix from frozen requirements through service mappings, infrastructure,
   tests, telemetry, runbooks, and named owners.
8. A product-verification record showing that every released product statement passed the
   30-day freshness rule.
9. A production-readiness review packet, decision, conditions, residual risks, and follow-up
   owners.

### Concepts to teach

- Requirements-first mapping: freeze what the system must do before choosing how Microsoft
  products might implement it.
- Responsibility boundaries: distinguish the model endpoint, agent runtime, framework,
  workflow, tools, identity, data, policy, evaluation, telemetry, and application experience.
- Stable core and volatile edge: keep Microsoft SDKs, protocols, resource identifiers, and
  configuration behind replaceable adapters.
- Identity continuity: preserve delegated user authority and keep it distinct from workload
  identity at every retrieval and action boundary.
- Evidence-based adoption: managed features reduce owned implementation only when their
  verified behavior passes the same tests as a custom component.
- Workload-fit decisions: derive compute, messaging, state, scaling, and regional choices from
  measured traffic, latency, recovery, isolation, and operator-capability requirements.
- Portability with purpose: require replacement paths for material risks, not artificial
  lowest-common-denominator design.
- Product freshness: treat names, availability, SDKs, APIs, regions, quotas, prices, data
  handling, identity behavior, network features, and service boundaries as release-time facts.
- Shared accountability: products can provide mechanisms, but the application team retains
  responsibility for policy, evaluation, threat treatment, data governance, and acceptable
  autonomy.

### Northstar increment

Map the accepted vendor-neutral Northstar interfaces to current Microsoft service candidates,
supported Python SDKs, infrastructure as code, and delivery controls, then complete a
production-readiness review. Preserve every earlier invariant, especially deny-by-default
tools, permission-filtered retrieval, exact-payload approval, idempotency, tenant propagation,
bounded execution, redacted telemetry, recovery, and replaceable provider boundaries.

The increment is accepted only if mappings are derived from frozen requirements. Product-led
redesign requires a new architecture decision and reruns all affected evaluation, security,
reliability, recovery, and cost gates.

### Diagram intents

1. **Requirements before products.** Show a left-to-right decision flow from frozen Northstar
   requirements, through build/buy/hybrid criteria and acceptance tests, to replaceable
   Microsoft adapters. A failed or stale claim loops back to unresolved status, not to silent
   requirement relaxation. The equivalent text must enumerate each decision and rejection
   path.
2. **Stable core and volatile edge.** Show the vendor-neutral runtime, policy, model, tool,
   retrieval, workflow, state, evaluation, observability, governance, and deployment
   interfaces inside a stable boundary. Place dated Microsoft candidates outside that boundary
   behind adapters, with identity, data, trust, tenant, region, and telemetry flows labeled.
   The equivalent text must describe every boundary and flow.
3. **Production-readiness evidence flow.** Show infrastructure plans, Python contract tests,
   evaluation gates, threat tests, load and recovery drills, dashboards, runbooks, and product
   freshness records converging on accept, conditional accept, or reject. The equivalent text
   must state who reviews each evidence class and what blocks release.

### Microsoft mapping rules

1. Start with the vendor-neutral responsibility and its frozen requirement IDs.
2. Compare build, buy, hybrid, and no-change options using quality, security, privacy,
   reliability, latency, recovery, accessibility, operations, cost, coupling, and exit effort.
3. Introduce a Microsoft candidate only after the existing acceptance tests are named.
4. Keep Microsoft SDK objects and product schemas out of domain interfaces and durable state.
5. Mark each statement about a Microsoft product `VOLATILE PRODUCT CLAIM` and cite an approved
   ledger source that supports that exact statement.
6. Record `verified_on` and `planned_release_on`. Require
   `0 <= planned_release_on - verified_on <= 30 days`. Reverify after any relevant product,
   SDK, region, price, quota, or architecture change.
7. Treat missing, stale, contradictory, or overly broad evidence as unresolved. Do not infer
   product capabilities from a product family name or from another service's documentation.
8. Preserve a custom or alternate-provider path at the adapter boundary and test one exit or
   substitution scenario for each critical mapping.

### Approved dated mapping candidates

Every product statement in this table is volatile. The table author must replace the contract
date with a release-time verification date before chapter release.

| Vendor-neutral responsibility | Candidate mapping | Product claim status | Approved evidence | Required proof before selection |
|---|---|---|---|---|
| Model, agent, evaluation, and operations project surface | Microsoft Foundry | VOLATILE PRODUCT CLAIM | SRC-040 | Verify current name, boundaries, supported capabilities, region, release state, data handling, quotas, price, and Python integration; rerun mapped tests. |
| Optional Python framework adapter | Microsoft Agent Framework | VOLATILE PRODUCT CLAIM | SRC-042 | Verify current project status, supported Python APIs and versions, migration guidance, telemetry behavior, and compatibility; compare with custom Python and the simpler baseline. |
| Configured user or workload credential adapter | Azure Identity client library for Python | VOLATILE PRODUCT CLAIM | SRC-044 | Verify supported credential behavior and managed identity integration; prove explicit credential configuration, least privilege, identity separation, expiry, and denial tests. |

The following are guidance inputs, not implementation selections or proof that a workload is
production ready:

| Review responsibility | Microsoft guidance candidate | Claim status | Approved evidence | Required use |
|---|---|---|---|---|
| Architecture and regional design review | Azure Architecture Center | VOLATILE MICROSOFT GUIDANCE CLAIM | SRC-045 | Verify the applicable current guidance and record accepted or rejected recommendations with workload evidence. |
| Reliability, security, cost, operations, and performance review | Azure Well-Architected Framework | VOLATILE MICROSOFT GUIDANCE CLAIM | SRC-046 | Verify the current review guidance and map findings to owners, tests, risks, and release conditions. |

### Unresolved Microsoft candidates

The module README names Azure OpenAI, agent services, Azure AI Search, Cosmos DB, Microsoft
Entra ID, Key Vault, safety and governance products, OpenTelemetry and Application Insights,
messaging, compute, API management, delivery, and infrastructure-as-code tooling. Each name in
this sentence is a `VOLATILE UNVERIFIED PRODUCT CLAIM`. None may be selected, described as
supported, or used as capstone evidence until the Source Editor adds approved claim-level
ledger evidence and the Release Editor verifies the exact claim within 30 days of release.

An unresolved mapping retains its vendor-neutral interface, acceptance tests, owner, evidence
needed, deadline, and release consequence. The chapter may teach how to evaluate such a gap,
but it must not fill the gap from dossier-only evidence.

### Python-only implementation contract

- Python 3.11 is the minimum runtime for all runnable examples and tests.
- Begin with vendor-neutral Python protocols, dataclasses or validated schemas, and
  deterministic model, tool, identity, queue, state, and telemetry doubles.
- Put each verified Microsoft SDK behind an adapter. Importing that SDK in the domain layer is
  a contract failure.
- Keep live Azure tests optional, explicitly enabled, tenant-safe, budget capped, and separate
  from the offline acceptance suite.
- Pin dependencies, record SDK versions in release evidence, scan them, and test timeout,
  cancellation, retry, identity expiry, authorization denial, quota, and malformed-response
  behavior.
- Do not require private chain-of-thought in code, traces, evaluations, approvals, or review
  evidence.

### Infrastructure-as-code expectations

Infrastructure as code is required for repeatable environments, even when the final product
mapping remains conditional. The capstone must:

- declare resources, identities, role assignments, network boundaries, encryption settings,
  diagnostic settings, retention, regions, quotas, budgets, and tags as reviewed code;
- use secret references or secretless workload identity, never embedded credentials;
- separate environment parameters from reusable modules and prevent production defaults from
  leaking into development fixtures;
- produce a machine-readable plan and policy-check result before deployment;
- pin provider and module versions and capture deployed resource versions where available;
- run static checks, security checks, cost estimation where supported, and drift detection;
- support staged promotion, canary or equivalent limited exposure, rollback, state recovery,
  and documented cleanup;
- preserve tenant keys, region policy, idempotency records, approval state, backup expiry, and
  evidence during deployment and recovery;
- avoid claiming support for Bicep, Terraform, or a delivery product until claim-level evidence
  is approved and freshly verified.

### Safe activity and lab

Using only supplied YAML or JSON fixtures and Python doubles, give a team three vendor-neutral
components and four fictional service offers. The offers include one stale claim, one
capability that weakens identity, one expensive but compliant option, and one incomplete
option.

The reader must:

1. freeze requirement IDs and acceptance thresholds before opening the offers;
2. classify each component as build, buy, hybrid, or unresolved;
3. reject stale evidence and any option that weakens a Northstar invariant;
4. generate a service-mapping record and a provider-neutral infrastructure plan object;
5. run deterministic Python tests for adapter substitution, authorization denial, dependency
   timeout, budget exhaustion, and rollback;
6. conduct a short production-readiness review and record accept, conditional accept, or
   reject with reasons.

The lab requires no account, payment, personal data, network access, cloud deployment, or live
AI provider. Fixtures use fictional products so the exercise cannot create an accidental
current-product claim. Cleanup deletes only generated local artifacts.

### Failure lab and evaluation

The failure lab injects at least these cases:

- a product claim verified 31 days before release;
- a managed feature that changes a stable domain interface;
- workload identity used where delegated user authority is required;
- duplicate delivery of a consequential action;
- a regional dependency absent from the declared recovery region;
- telemetry that captures protected source content;
- a lower-cost mapping that misses a frozen quality or recovery threshold;
- an infrastructure change that cannot be rolled back or reconstructed.

The reader diagnoses each failure from the traceability and evidence records, applies a
measurable correction, and reruns only the affected gates plus the regression suite. A mapping
fails if it has no fresh evidence, weakens an invariant, cannot meet its threshold, hides an
unowned residual risk, or lacks an exit path.

Evaluation reports:

- outcome and citation quality against the accepted benchmark;
- retrieval authorization and tenant-isolation negative tests;
- trajectory, tool, approval, idempotency, cancellation, and budget behavior;
- security, privacy, safety, accessibility, and redaction results;
- p50, p95, and p99 latency, throughput, saturation, availability, recovery, RPO, and RTO;
- cost per accepted report and comparison with the deterministic baseline;
- operator workload, alert quality, runbook success, deployment rollback, and restore results;
- portability evidence from at least one critical adapter substitution or exit exercise;
- product-claim freshness coverage, which must equal 100 percent for release.

### Production-readiness review

The review includes product, architecture, engineering, evaluation, security, privacy, SRE,
data, cost, accessibility, governance, source, and release owners. Qualified legal review is
required for legal conclusions; passing this review is not a compliance certification.

The panel reviews the declared deployment context, accepted requirements, architecture and
trust boundaries, build/buy/hybrid rationale, source freshness, Python and infrastructure
evidence, evaluation results, threat treatments, identity and data flows, operational
dashboards, alerts, runbooks, incident path, recovery drills, release and rollback evidence,
cost envelope, unresolved decisions, and retirement plan.

The decision is one of:

- `accepted`: every blocking criterion passes and residual risks have authorized owners;
- `conditionally_accepted`: only time-bounded, non-safety conditions remain, each with an
  owner, deadline, evidence requirement, and automatic release consequence;
- `rejected`: any safety invariant, authorization boundary, tenant isolation, freshness,
  evaluation, recovery, rollback, or ownership criterion fails.

### Common failures and misunderstanding

- Starting from a preferred product and rewriting requirements to fit it.
- Treating a product family, framework, model endpoint, and hosted runtime as interchangeable.
- Assuming a managed feature transfers accountability to the provider.
- Confusing workload identity with delegated user authority.
- Calling vector retrieval memory or calling telemetry a durable command queue.
- Choosing complex compute because the system contains an agent.
- Using a framework demo as production-readiness evidence.
- Treating a cloud product choice as system design. Product selection implements only the
  responsibilities it can prove; the system design remains the full set of contracts,
  controls, data flows, tests, and operating decisions.

### Approved sources

Only these Chapter 36 ledger entries are approved for claims in this contract:

| Source ID | Permitted use | Freshness treatment |
|---|---|---|
| SRC-040 | Current Microsoft Foundry platform concepts, projects, models, agents, evaluation, and operations | VOLATILE; verify within 30 days of release. |
| SRC-042 | Current Microsoft Agent Framework scope, Python APIs, migration, and release status | VOLATILE; verify within 30 days of release. |
| SRC-044 | Current Azure Identity client library for Python credential chain and managed identity integration | VOLATILE; verify within 30 days of release. |
| SRC-045 | Current Azure Architecture Center patterns and workload guidance | EVOLVING MICROSOFT GUIDANCE; verify within 30 days of release. |
| SRC-046 | Current Azure Well-Architected reliability, security, cost, operations, and performance guidance | EVOLVING MICROSOFT GUIDANCE; verify within 30 days of release. |

The R6 Microsoft dossier is background research, not approval. Its candidate sources and
claims cannot support released product prose unless they are promoted to approved ledger
entries.

### Capstone acceptance

Chapter 36 and the Northstar capstone are accepted only when all conditions below pass:

- [ ] The submission traces every Microsoft mapping to a frozen vendor-neutral responsibility
      and requirement ID.
- [ ] Build, buy, hybrid, and no-change options are compared, and the selected option is
      defended with measured workload and evaluation evidence.
- [ ] The deterministic baseline remains available wherever an agentic or managed addition
      does not demonstrate its declared gain.
- [ ] Stable domain interfaces contain no Microsoft SDK types, resource identifiers, or
      product-specific persistence schema.
- [ ] Every product statement is marked volatile, cites an approved claim-level ledger ID,
      and was verified no more than 30 days before release.
- [ ] Unsupported or stale mappings remain unresolved with an owner, deadline, required
      evidence, fallback, and release consequence.
- [ ] All runnable examples and adapter tests use Python 3.11 or later and pass offline with
      deterministic doubles.
- [ ] Optional live tests are explicitly enabled, budget capped, tenant-safe, and not required
      for the offline learning path.
- [ ] Infrastructure is represented as reviewed code with plans, policy and security checks,
      version pins, drift handling, staged delivery, rollback, recovery, and cleanup evidence.
- [ ] Identity tests preserve user delegation, workload separation, least privilege, expiry,
      revocation, and deny-by-default behavior.
- [ ] Data tests cover tenant and permission isolation, classification, encryption, retention,
      deletion, backup expiry, residency, and redacted telemetry.
- [ ] Reliability evidence covers timeout, retry with jitter, circuit breaking, bulkheading,
      backpressure, duplicate delivery, idempotency, reconciliation, restore, and regional
      failure.
- [ ] Evaluation gates meet frozen outcome, citation, retrieval, trajectory, safety, latency,
      reliability, accessibility, operations, and cost thresholds without spending a safety
      invariant as error budget.
- [ ] A critical adapter substitution or exit exercise passes without changing the domain
      contract.
- [ ] Release, rollback, incident, kill, migration, deprecation, and retirement paths have
      named owners and tested evidence.
- [ ] The production-readiness panel records `accepted`, `conditionally_accepted`, or
      `rejected`, with residual risks, conditions, owners, deadlines, and evidence links.
- [ ] Legal, regulatory, privacy, records, transfer, accessibility, and compliance conclusions
      are left to qualified reviewers and are not inferred from product use.
- [ ] Private chain-of-thought is absent from interfaces, logs, approvals, evaluations, and
      review evidence.

Failure of any safety invariant, delegated-authority boundary, tenant-isolation test,
product-freshness check, rollback requirement, or recovery gate blocks capstone acceptance.