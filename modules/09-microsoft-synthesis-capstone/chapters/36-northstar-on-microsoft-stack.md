# Chapter 36: Northstar on the Microsoft Stack

> Status: drafting  
> Owner: Chapter 36 author  
> Last verified: 2026-09-06

## The problem

Northstar already has an accepted design. It must produce useful research reports with
source-level citations, preserve delegated authority and source permissions, stop within hard
budgets, resume without repeating effects, and remain observable, recoverable, and replaceable.
Those requirements were accepted before a cloud product was chosen.

The final architecture review now asks a narrower question:

> Can current Microsoft candidates implement the accepted design without weakening its
> interfaces, invariants, evidence gates, or exit paths?

This order matters. Starting with a product catalog makes it easy to confuse an available
feature with a satisfied requirement. Northstar starts with evidence: frozen requirements,
measured workloads, accepted tests, and named owners. A candidate is admitted only after it
passes those tests. A missing or stale product claim remains unresolved. It never becomes
permission to relax the design.

This chapter uses only the dated primary sources in its Sources section for Microsoft claims.
Every statement about a product, API, SDK, release status, region, quota, limit, price, service
boundary, data behavior, or supported feature is a `VOLATILE PRODUCT CLAIM`. It must be
verified against its cited primary source no more than 30 days before release. This chapter
does not infer a current region, quota, limit, price, or availability state; any narrowly stated
status requires its own cited primary-source wording and the same release-time revalidation.

## Learning objectives

By the end of this chapter, you will be able to:

1. Freeze vendor-neutral requirements before considering a Microsoft candidate.
2. Keep product SDKs and schemas behind replaceable Python adapters.
3. Validate a dated service-mapping record and reject stale or unsupported claims.
4. Compare build, buy, hybrid, and no-change options with measured evidence.
5. Specify infrastructure as code without inventing unsupported resources.
6. Test identity separation, timeouts, rollback, redaction, and adapter substitution offline.
7. Conduct a production-readiness review that accepts, conditionally accepts, or rejects the
   capstone.
8. Choose and govern a low-code or code-first specialist-delegation path without confusing
   agents with tools.

### Accepted requirements first

The following register is inherited from the accepted Northstar architecture. Candidate
targets are release gates, not new measurements claimed by this chapter.

| ID | Frozen vendor-neutral requirement | Acceptance evidence | Owner |
|---|---|---|---|
| NS-QUAL-01 | Accepted reports meet the frozen outcome and citation thresholds. | Versioned benchmark, deterministic baseline comparison, and review record | Evaluation owner |
| NS-AUTH-01 | Retrieval never exceeds the requesting user's effective source permissions. | Positive and negative permission tests | Security owner |
| NS-AUTH-02 | User delegation and workload identity remain distinct. | Identity propagation, expiry, revocation, and confused-deputy tests | Identity owner |
| NS-TOOL-01 | Tools deny by default and accept only validated, authorized requests. | Schema, allowlist, destination, and denial tests | Runtime owner |
| NS-ACT-01 | A consequential effect requires fresh approval bound to its exact payload. | Approval digest, expiry, revocation, and replay tests | Product owner |
| NS-IDEM-01 | Every effect has an idempotency key and durable outcome record. | Duplicate-delivery and reconciliation tests | Workflow owner |
| NS-BUDGET-01 | Every run obeys hard step, tool, token, time, retry, byte, and cost ceilings. | Boundary and exhaustion tests | Runtime owner |
| NS-TENANT-01 | Tenant identity is checked at every state, data, cache, queue, tool, trace, and admin boundary. | Cross-tenant negative suite | Data owner |
| NS-PRIV-01 | Telemetry is minimized and redacted by default. | Synthetic sensitive-data and trace-access tests | Observability owner |
| NS-REL-01 | Durable runs recover without duplicate effects and meet accepted recovery objectives. | Worker-loss, restore, regional, and rollback drills | Site reliability engineering (SRE) owner |
| NS-PORT-01 | Critical provider components can be replaced without changing domain contracts. | Adapter substitution exercise | Architecture owner |
| NS-OPS-01 | Release, rollback, incident, kill, migration, and retirement paths have owners and tested evidence. | Readiness packet and drill records | Release owner |
| NS-BASE-01 | The deterministic search-and-template baseline remains available unless an addition proves its gain. | Quality, latency, safety, and cost comparison | Product owner |

Before mapping begins, the team also freezes the deployment context: one organization, one
tenant, one primary region, approved sources only, advisory reports only, and human review
before publication. High-impact decisions, arbitrary browsing, purchases, general desktop
control, and external publication are outside the accepted scope.

## First pass

### The school backpack

Imagine that you have packed a school backpack from a checklist. The checklist says you need
a notebook, a pencil, lunch, and a raincoat. Only after the checklist is fixed do you choose
which shop might supply each item.

A shiny shop window cannot change "raincoat" into "sunglasses." If the shop cannot prove that
an item is waterproof, the raincoat requirement stays open. You can choose another shop,
make the item, or delay the trip.

Northstar works the same way:

- the checklist is the accepted vendor-neutral requirement register;
- each shop offer is a dated service-mapping proposal;
- a receipt and inspection are the source citation and acceptance test;
- the backpack pockets are stable domain interfaces;
- changing shops is an adapter substitution.

### Where the analogy stops

A production system is not a backpack. Cloud dependencies can change behavior, identity,
data location, limits, status, and cost. Several components interact across trust boundaries,
and a passing feature test does not prove the whole system is safe. The real controls are
typed interfaces, policy, evaluation, security tests, workload evidence, recovery drills,
fresh source verification, and accountable review. They are enforced by code and process,
not by confidence in a brand.

## Picture the idea

### Requirements before products

```mermaid
flowchart LR
    R[Frozen requirements] --> O[Build, buy, hybrid, or no change]
    O --> T[Name existing acceptance tests]
    T --> C[Dated candidate claim]
    C --> F{Fresh and supported?}
    F -->|no| U[Unresolved with owner and fallback]
    F -->|yes| A[Adapter proof]
    A --> P{All mapped gates pass?}
    P -->|no| U
    P -->|yes| D[Readiness decision]
    U --> R
```

**Takeaway:** a candidate earns its place by passing existing requirements and tests; stale or
failed evidence returns to an owned unresolved decision.

**Equivalent text description:** freeze requirements first. Compare build, buy, hybrid, and
no-change options. Name the existing tests before recording a candidate claim. Reject a claim
that is stale or unsupported. Put a supported candidate behind an adapter and run every mapped
gate. Failed gates create an unresolved item with an owner and fallback. Passed gates proceed
to the readiness decision.

### Stable core and volatile edge: beginner view

```mermaid
flowchart LR
    S[Stable core] --> A[Adapters]
    A --> P[Approved providers]
    A --> U[Unresolved choices]
```

**Takeaway:** keep Northstar's meaning stable, and reach changing or unresolved providers only
through adapters.

**Equivalent text description:** first, the stable core defines Northstar's durable meaning.
Second, adapters translate that meaning. Third, an adapter reaches either an approved provider
or an explicitly unresolved choice. The full contract map appears in the engineering deep dive.

### Production-readiness evidence flow

```mermaid
flowchart LR
    B["Build it right: infrastructure as code (IaC), policy, and contract tests"] --> J[Readiness panel]
    S[Keep it safe: evaluation, threat, and identity checks] --> J
    R[Run it well: recovery, operations, and freshness evidence] --> J
    J --> A{Decision}
    A -->|all required checks pass| Y[Accepted]
    A -->|bounded conditions| C[Conditionally accepted]
    A -->|any blocker fails| N[Rejected]
```

**Takeaway:** no single product feature or test makes the system production ready.

**Equivalent text description:** first, gather "build it right" evidence from infrastructure as
code (IaC) plans, policy checks, and Python contract tests. Second, gather "keep it safe"
evidence from evaluation, threat, privacy, and identity checks. Third, gather "run it well"
evidence from load and recovery drills, dashboards, runbooks, and freshness records. The panel
then accepts when all required checks pass, conditionally accepts only bounded non-safety
conditions, or rejects when a required check fails.

## Vocabulary

| Term | Plain-language meaning |
|---|---|
| Vendor-neutral contract | A responsibility, interface, or rule that does not depend on one provider. |
| Frozen requirement | An accepted need whose ID, threshold, owner, and evidence cannot be silently changed during product selection. |
| Service mapping | A dated proposal assigning a vendor-neutral responsibility to a product or custom component. |
| Adapter | Provider-specific code that translates between a stable domain interface and an external interface. |
| Build | Implement and operate most of a responsibility in application-owned code and infrastructure. |
| Buy | Adopt a managed capability while retaining tests, policy, accountability, and an exit path. |
| Hybrid | Combine managed capability with application-owned control and stable boundaries. |
| No change | Keep the accepted implementation when a candidate has not shown sufficient benefit. |
| Volatile product claim | A statement about a product, API, SDK, feature, limit, region, price, status, behavior, or boundary that can change. |
| Freshness check | Proof that a volatile claim was verified against an approved primary source within 30 days before release. |
| Stable core | Domain contracts, invariants, and durable state owned by Northstar. |
| Volatile edge | Provider integrations that may change and must remain replaceable. |
| Traceability | The links from a requirement to a mapping, test, telemetry signal, runbook, and owner. |
| Production-readiness review | A cross-functional release decision based on operating evidence and residual risk. |
| Exit path | A tested way to replace or remove a dependency without changing the durable domain contract. |
| Infrastructure as code | Reviewed, versioned declarations and plans for creating and changing environments. |
| Residual risk | Risk that remains after controls, with an authorized owner and treatment decision. |

## How it works

### Step 1: freeze the input to product selection

The mapping packet begins with requirement IDs, thresholds, workload measurements, test IDs,
data classes, trust boundaries, recovery objectives, budget limits, and owners. Product names
do not appear in this packet. A proposed change to a requirement returns to architecture and
reruns affected quality, security, reliability, recovery, and cost gates.

### Step 2: partition durable responsibilities

Northstar keeps separate contracts for experience, admission, tasks, runtime, policy, models,
retrieval, tools, workflow, state, approval, evaluation, observability, governance, and
deployment. One service may be considered for several responsibilities, but the contracts do
not merge merely because a provider groups features together.

Domain objects contain Northstar types such as `RunRequest`, `PrincipalContext`,
`AuthorizedDocument`, `ActionIntent`, and `EvidenceEvent`. They do not contain provider SDK
objects, resource identifiers, response schemas, or persistence formats.

### Step 3: compare four options

For each responsibility, score build, buy, hybrid, and no change against the same criteria:

| Criterion | Question |
|---|---|
| Quality | Does it meet the accepted outcome and citation gates on representative tasks? |
| Authority | Does it preserve user delegation, workload separation, and deny-by-default tools? |
| Data | Can classification, tenant isolation, retention, deletion, and region policy be proved? |
| Reliability | Does it meet timeout, recovery, idempotency, restore, and rollback requirements? |
| Operations | Can the team observe, diagnose, operate, and retire it? |
| Performance | Does measured latency and throughput fit the workload? |
| Cost | Does measured cost per accepted report fit the envelope? |
| Coupling | How much provider meaning enters domain code or durable state? |
| Exit effort | Can a critical path be substituted within the accepted recovery and migration plan? |

The deterministic baseline is always one row. Complexity must demonstrate a measurable gain.

### Step 4: record claims, freshness, and gaps

The following dated records are the approved responsibility-to-service mapping candidates in this
chapter. The later delegation matrix uses additional, separately bounded ledger sources.
`planned_release_on` is an illustrative review date, not a release commitment. Reverify every
record if that date, the cited material, or the architecture changes.

| Claim ID | Vendor-neutral responsibility | Dated candidate statement | Evidence | verified_on | planned_release_on | Status |
|---|---|---|---|---|---|---|
| MS-001 | Model, agent, evaluation, and operations project surface | `VOLATILE PRODUCT CLAIM`: Microsoft Foundry is a candidate surface for current platform concepts involving projects, models, agents, evaluation, and operations. Exact boundaries and fitness remain subject to tests. | SRC-040 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-002 | Optional Python framework adapter | `VOLATILE PRODUCT CLAIM`: Microsoft Agent Framework is a candidate whose current framework scope, Python APIs, migration guidance, and release status must be evaluated against the custom runtime and baseline. | SRC-042 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-003 | Configured credential adapter | `VOLATILE PRODUCT CLAIM`: Azure Identity client library for Python is a candidate for currently documented credential-chain and managed-identity integration, subject to explicit configuration and identity tests. | SRC-044 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-004 | Architecture and regional review input | `VOLATILE MICROSOFT GUIDANCE CLAIM`: Azure Architecture Center is a candidate source of current cloud design patterns and workload guidance. It is review input, not implementation proof. | SRC-045 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-005 | Cross-cutting quality review input | `VOLATILE MICROSOFT GUIDANCE CLAIM`: Azure Well-Architected Framework is a candidate source of current reliability, security, cost, operations, and performance review guidance. It is review input, not implementation proof. | SRC-046 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-006 | Managed agent runtime | `VOLATILE PRODUCT CLAIM`: Foundry Agent Service is a candidate hosted agent runtime. Supported capabilities and each selected subfeature remain subject to current documentation and workload tests. | SRC-041 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-007 | Retrieval | `VOLATILE PRODUCT CLAIM`: Azure AI Search is a candidate for vector and hybrid retrieval. Authorization filtering, tenant isolation, relevance, freshness, scale, region, and recovery require separate proof. | SRC-043 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-008 | Telemetry export | `VOLATILE PRODUCT CLAIM`: Azure Monitor OpenTelemetry with Application Insights export is a candidate telemetry edge. Redaction, correlation, retention, access, sampling, and completeness require tests. | SRC-047 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-009 | Container compute | `VOLATILE PRODUCT CLAIM`: Azure Container Apps is a candidate managed container host with event-driven scaling. Runtime, network, identity, region, recovery, quota, and cost fitness require proof. | SRC-048 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |
| MS-010 | Durable messaging | `VOLATILE PRODUCT CLAIM`: Azure Service Bus is a candidate for durable queues and topics. Ordering, duplicate delivery, lock expiry, retry, dead-letter, authorization, tenant partitioning, and recovery remain application acceptance concerns. | SRC-049 | 2026-09-05 | 2026-09-30 | Verify within 30 days before release |

For MS-001 through MS-010, product names, API and SDK behavior, feature boundaries, release
status, regions, quotas, limits, prices, data handling, identity behavior, network behavior,
and availability are volatile and require primary-source verification within 30 days before
release. The table makes no claim that a candidate is available in Northstar's required
region, fits its quota or price envelope, or passes an acceptance test.

Cosmos DB, Key Vault, API management, a delivery product, and an infrastructure-as-code product
have no approved claim-level source in this chapter's current scope. Those mappings are
`VOLATILE UNVERIFIED PRODUCT CLAIM: UNRESOLVED`; a product mention in a broader source or an
authentication-audience example is not service-fit evidence. Any other Microsoft mapping may not be
selected, described as supported, or used as production evidence in this chapter. The open
record must preserve the vendor-neutral interface, requirement IDs, owner, evidence needed,
deadline, fallback, and release consequence.

### Step 5: prove the adapter

An adapter is accepted only when:

1. domain tests pass unchanged against a deterministic double and the candidate adapter;
2. provider types do not cross into domain interfaces or durable state;
3. identity, tenant, region policy, deadlines, cancellation, budgets, and redaction remain
   explicit;
4. malformed responses, denial, expiry, timeout, throttling, and dependency failure become
   stable domain errors;
5. retries occur only for declared retryable errors and never duplicate an effect;
6. an exit test substitutes another adapter without changing callers.

### Step 6: decide from evidence

The review panel records `accepted`, `conditionally_accepted`, or `rejected`. A condition has
an owner, deadline, required evidence, and automatic consequence. Safety invariants, delegated
authority, tenant isolation, freshness, rollback, recovery, and ownership cannot be waived as
conditions.

## Engineering deep dive

### Engineering appendix: full stable-core contract map

The beginner view showed one path. This full engineering map expands the contracts and
provider-facing adapters used to implement it.

```mermaid
flowchart TB
    subgraph S[Stable Northstar core]
        UI[Experience contract]
        RT[Runtime and policy contracts]
        MG[Model gateway]
        RG[Retrieval gateway]
        TG[Tool and identity gateways]
        WS[Workflow and state contracts]
        EO[Evaluation and observability contracts]
        GD[Governance and deployment contracts]
    end
    subgraph V[Volatile provider edge]
        MA[Model and agent surface adapter]
        FA[Optional framework adapter]
        IA[Credential adapter]
        SR[Azure AI Search candidate]
        SB[Service Bus candidate]
        AM[Azure Monitor candidate]
        CA[Container Apps candidate]
        X[Unresolved state, secrets, API, delivery, and IaC adapters]
    end
    UI --> RT
    RT --> MG
    RT --> RG
    RT --> TG
    RT --> WS
    RT --> EO
    GD --> RT
    MG --> MA
    RT --> FA
    TG --> IA
    RG --> SR
    WS --> SB
    EO --> AM
    RT --> CA
    WS --> X
    GD --> X
```

**Takeaway:** Northstar owns durable meaning; dated provider adapters translate at the edge.

**Equivalent text description:** first, experience and governance feed the stable runtime and
policy contracts. Second, the runtime uses stable model, retrieval, tool, identity, workflow,
state, evaluation, and observability gateways. Third, model and agent, optional framework, and
credential, retrieval, messaging, telemetry, and container-compute candidates sit behind
adapters. State database, secrets, API management, delivery, and infrastructure-as-code products
remain unresolved where approved evidence is absent. Tenant, principal, region
policy, data classification, request IDs, and redacted evidence cross boundaries as explicit
fields.

### Stable core, volatile edge

The stable core defines intent and evidence. The volatile edge performs translation. For
example, the domain asks a `CredentialProvider` for a token appropriate to an already approved
audience. An adapter may call a provider library, but the domain sees only a short-lived token
result or a stable error. The adapter cannot decide user authority, invent scopes, or replace
the policy decision point.

Persist stable values such as `run_id`, `tenant_id`, `principal_id`, `policy_version`,
`adapter_kind`, `request_digest`, `result_digest`, and domain status. Do not persist an SDK
object or assume a provider response can be replayed forever.

### Identity continuity

Northstar carries both user and workload identity because they answer different questions:

- user delegation says on whose behalf an operation may occur;
- workload identity says which application component is calling a dependency.

The most restrictive authority wins. A valid workload token cannot replace missing user
delegation. A model cannot choose credentials. A retry revalidates expiry and authority.
Adapters receive a policy-approved request, not access to a general credential store.

`VOLATILE PRODUCT CLAIM MS-003, SRC-044`: the current behavior and integration surface of the
Azure Identity client library for Python must be verified within 30 days before release. The
selection remains conditional until explicit credential configuration, least privilege,
expiry, revocation, audience, and denial tests pass.

### Framework restraint

A framework is useful only if it reduces owned implementation while preserving Northstar's
state machine, budgets, stop rules, tool policy, approvals, telemetry, and deterministic
baseline. Framework convenience is not evidence of production readiness.

`VOLATILE PRODUCT CLAIM MS-002, SRC-042`: the current Python API, migration guidance, telemetry
behavior, compatibility, and release status of Microsoft Agent Framework require verification
within 30 days before release. A custom Python runtime and no-change baseline remain in the
decision matrix.

### Platform-surface restraint

`VOLATILE PRODUCT CLAIM MS-001, SRC-040`: Microsoft Foundry is considered only as a candidate
surface for the responsibilities stated in MS-001. Current boundaries, Python integration,
data handling, region, status, quota, limit, price, and operational fitness require
verification within 30 days before release. No broad platform label proves that Northstar's
model, agent, evaluation, or operations contracts are satisfied.

### Infrastructure as code expectations

Infrastructure as code is required even when mappings are unresolved. The design first emits
a provider-neutral plan containing responsibilities and controls. A later provider module may
translate only mappings with approved, fresh evidence.

Each environment plan must declare or account for:

- region policy and recovery pairing as parameters, without asserting provider availability;
- workload identities, user-delegation boundaries, least-privilege assignments, and expiry;
- network and egress boundaries;
- encryption intent and secret references, never embedded credentials;
- diagnostic categories, redaction, retention, and access policy;
- tenant keys, quotas, budgets, tags, and ownership metadata;
- durable state, approval records, idempotency records, backup expiry, and recovery evidence;
- pinned provider and module versions where a supported provider is later approved;
- machine-readable plans, policy checks, static checks, security checks, supported cost
  estimation, and drift detection;
- staged promotion, limited exposure, rollback, restore, reconstruction, and cleanup.

This chapter does not name or emit a provider resource type, deployment language, module, or
delivery product. The approved sources establish candidate service responsibilities, not exact
resource declarations or delivery/IaC support. The expected
artifact is a logical plan such as:

```json
{
  "environment": "staging",
  "region_policy": "tenant-home-region",
  "components": [
    {
      "responsibility": "runtime",
      "mapping_status": "unresolved",
      "identity_mode": "workload-separated-from-user-delegation",
      "network_policy": "deny-by-default-egress",
      "rollback_required": true
    }
  ],
  "checks": ["policy", "security", "drift", "rollback", "restore"]
}
```

### Build, buy, hybrid, or no change

Northstar's provisional decision is **hybrid**, conditional on fresh evidence and passing
tests:

| Responsibility | Provisional choice | Reason | Exit condition |
|---|---|---|---|
| Domain runtime, policy, approvals, budgets, and durable contracts | Build | These encode Northstar-specific authority and invariants. | Keep protocols and state schemas documented so implementation can be replaced. |
| Model, agent, evaluation, and operations project surface | Hybrid candidate | A managed surface may reduce operations only if MS-001 passes the same gates as custom components. | Route through stable gateways; retain deterministic doubles and an alternate adapter. |
| Agent framework | No change unless proven | The custom bounded runtime already expresses accepted semantics. | Admit MS-002 only after measured benefit and substitution tests. |
| Credential acquisition | Buy behind adapter candidate | A library adapter may reduce credential plumbing while application policy retains authority decisions. | Keep `CredentialProvider` stable and retain a deterministic test adapter. |
| Architecture and quality review | Hybrid review process | External guidance can improve questions, but workload owners decide from evidence. | Archive dated findings; requirements and tests remain provider-neutral. |
| Retrieval | Hybrid candidate | Azure AI Search has approved vector/hybrid retrieval evidence in MS-007; workload fitness is unproved. | Keep `RetrievalGateway`; retain deterministic corpus and alternate adapter tests. |
| Durable messaging | Hybrid candidate | Azure Service Bus has approved queue/topic evidence in MS-010; it does not own Northstar's idempotency or workflow semantics. | Keep message and outcome schemas stable; test duplicate delivery and reconciliation. |
| Telemetry export | Buy behind adapter candidate | Azure Monitor OpenTelemetry has approved export guidance in MS-008; Northstar owns evidence semantics and redaction. | Keep provider-neutral spans/evidence and alternate exporter tests. |
| Container compute | Hybrid candidate | Azure Container Apps has approved managed hosting and event-driven scaling evidence in MS-009. | Keep OCI/container and runtime contracts portable; rehearse alternate hosting. |
| Cosmos DB/state, Key Vault/secrets, API management, delivery, and IaC | Unresolved source gaps | No approved claim-level source in the current ledger proves these mappings. | Preserve interfaces and fallbacks; add primary sources and acceptance evidence before naming or selecting a product. |

The final choice can change. A buy option that misses a threshold is rejected. A build option
with unacceptable operator load is rejected. A hybrid option that leaks provider schemas into
durable state is rejected. No change wins when added complexity shows no measured benefit.

### Exit path

Every critical candidate needs a tested exit packet:

1. stable interface and error taxonomy;
2. exportable domain data with schema version, provenance, tenant, and retention metadata;
3. configuration separated from provider resource identifiers;
4. deterministic double and alternate adapter contract tests;
5. dual-read or shadow comparison where appropriate and safe;
6. migration reconciliation for state, approvals, idempotency, and evidence;
7. rollback point, recovery objective, owner, and decision deadline;
8. deletion and backup-expiry evidence for the retired dependency;
9. updated runbooks, dashboards, budgets, and incident routes.

The minimum capstone proof substitutes the credential or model-gateway double without changing
the domain caller. For a stateful production dependency, a paper exit plan is insufficient;
the team must rehearse export, validation, cutover, rollback, and retirement.

## Build it in Python

The following Python 3.11 program validates provider-neutral mapping and infrastructure-plan
fixtures. It imports no cloud SDK, uses no network, and records no private chain-of-thought.
Dates and offers are synthetic except for the five approved claim records shown earlier.

```python
from __future__ import annotations

from dataclasses import dataclass
from datetime import date
from typing import Literal, Protocol


Decision = Literal["build", "buy", "hybrid", "no_change", "unresolved"]


@dataclass(frozen=True)
class Requirement:
    requirement_id: str
    acceptance_test: str
    owner: str
    blocking: bool = True


@dataclass(frozen=True)
class ServiceMapping:
    responsibility: str
    requirement_ids: tuple[str, ...]
    decision: Decision
    claim_id: str | None
    source_id: str | None
    verified_on: date | None
    planned_release_on: date
    adapter: str
    exit_test: str
    unresolved_owner: str | None = None


@dataclass(frozen=True)
class PlanComponent:
    responsibility: str
    mapping_status: Literal["approved", "conditional", "unresolved"]
    identity_mode: str
    network_policy: str
    rollback_required: bool


class CredentialProvider(Protocol):
    def token_for(self, audience: str, user_delegation: str | None) -> str:
        """Return an opaque test token or raise a stable domain error."""


class DeterministicCredentialProvider:
    def token_for(self, audience: str, user_delegation: str | None) -> str:
        if audience != "northstar-test-dependency":
            raise PermissionError("audience denied")
        if user_delegation is None:
            raise PermissionError("user delegation required")
        return "opaque-synthetic-token"


APPROVED_SOURCES = {
    "SRC-040", "SRC-041", "SRC-042", "SRC-043", "SRC-044", "SRC-045",
    "SRC-046", "SRC-047", "SRC-048", "SRC-049",
}
APPROVED_CLAIMS = {
    "MS-001", "MS-002", "MS-003", "MS-004", "MS-005",
    "MS-006", "MS-007", "MS-008", "MS-009", "MS-010",
}


def validate_mapping(
    mapping: ServiceMapping,
    requirements: dict[str, Requirement],
) -> tuple[str, ...]:
    errors: list[str] = []

    if not mapping.requirement_ids:
        errors.append("mapping has no frozen requirements")
    for requirement_id in mapping.requirement_ids:
        if requirement_id not in requirements:
            errors.append(f"unknown requirement: {requirement_id}")

    if not mapping.adapter:
        errors.append("mapping has no adapter boundary")
    if not mapping.exit_test:
        errors.append("mapping has no exit test")

    if mapping.decision == "unresolved":
        if not mapping.unresolved_owner:
            errors.append("unresolved mapping has no owner")
        return tuple(errors)

    if mapping.claim_id not in APPROVED_CLAIMS:
        errors.append("claim is not approved")
    if mapping.source_id not in APPROVED_SOURCES:
        errors.append("source is not approved")
    if mapping.verified_on is None:
        errors.append("claim has no verification date")
    else:
        age = (mapping.planned_release_on - mapping.verified_on).days
        if age < 0 or age > 30:
            errors.append(f"claim freshness is {age} days")

    return tuple(errors)


def validate_plan(component: PlanComponent) -> tuple[str, ...]:
    errors: list[str] = []
    if component.identity_mode != "workload-separated-from-user-delegation":
        errors.append("identity separation weakened")
    if component.network_policy != "deny-by-default-egress":
        errors.append("network policy is not deny by default")
    if not component.rollback_required:
        errors.append("rollback is not required")
    return tuple(errors)


requirements = {
    "NS-AUTH-02": Requirement("NS-AUTH-02", "test_identity_separation", "identity"),
    "NS-PORT-01": Requirement("NS-PORT-01", "test_adapter_substitution", "architecture"),
}

fresh = ServiceMapping(
    responsibility="configured credential adapter",
    requirement_ids=("NS-AUTH-02", "NS-PORT-01"),
    decision="hybrid",
    claim_id="MS-003",
    source_id="SRC-044",
    verified_on=date(2026, 9, 5),
    planned_release_on=date(2026, 9, 30),
    adapter="CredentialProvider",
    exit_test="test_adapter_substitution",
)
assert validate_mapping(fresh, requirements) == ()

stale = ServiceMapping(
    responsibility="fictional managed runtime",
    requirement_ids=("NS-PORT-01",),
    decision="buy",
    claim_id="MS-001",
    source_id="SRC-040",
    verified_on=date(2026, 8, 30),
    planned_release_on=date(2026, 9, 30),
    adapter="RuntimeProvider",
    exit_test="test_runtime_substitution",
)
assert validate_mapping(stale, requirements) == ("claim freshness is 31 days",)

unresolved = ServiceMapping(
    responsibility="fictional queue",
    requirement_ids=("NS-PORT-01",),
    decision="unresolved",
    claim_id=None,
    source_id=None,
    verified_on=None,
    planned_release_on=date(2026, 9, 30),
    adapter="CommandQueue",
    exit_test="test_queue_substitution",
    unresolved_owner="workflow",
)
assert validate_mapping(unresolved, requirements) == ()

plan = PlanComponent(
    responsibility="runtime",
    mapping_status="conditional",
    identity_mode="workload-separated-from-user-delegation",
    network_policy="deny-by-default-egress",
    rollback_required=True,
)
assert validate_plan(plan) == ()

credentials: CredentialProvider = DeterministicCredentialProvider()
assert credentials.token_for(
    "northstar-test-dependency", "synthetic-user-delegation"
) == "opaque-synthetic-token"
try:
    credentials.token_for("northstar-test-dependency", None)
except PermissionError as error:
    assert str(error) == "user delegation required"
else:
    raise AssertionError("missing user delegation was accepted")

print("PASS: fresh mapping accepted; stale claim and identity loss denied")
```

Expected output:

```text
PASS: fresh mapping accepted; stale claim and identity loss denied
```

The code validates evidence structure, not the truth of a product claim. Release verification
still requires a human source review and the mapped acceptance tests.

## Microsoft implementation

The implementation sequence is deliberately conditional:

1. Evaluate `VOLATILE PRODUCT CLAIM MS-001, SRC-040` within 30 days before release for the
   model, agent, evaluation, and operations project surface. Record exact current boundaries,
   APIs, SDKs, status, regions, quotas, limits, prices, data behavior, and test results.
2. Compare the custom runtime and baseline with `VOLATILE PRODUCT CLAIM MS-002, SRC-042` within
   30 days before release. Admit the framework adapter only if measured value exceeds added
   coupling and all runtime invariants remain enforceable.
3. Implement `CredentialProvider` first with a deterministic double. Consider
   `VOLATILE PRODUCT CLAIM MS-003, SRC-044` only after verifying current Python behavior within
   30 days before release and passing identity separation and denial tests.
4. Review the architecture against `VOLATILE MICROSOFT GUIDANCE CLAIM MS-004, SRC-045` and the
   cross-cutting quality questions in `VOLATILE MICROSOFT GUIDANCE CLAIM MS-005, SRC-046`, each
   verified within 30 days before release. Record accepted and rejected recommendations with
   workload evidence.
5. Evaluate MS-006 through MS-010 for managed agent runtime, retrieval, telemetry export,
   container compute, and durable messaging. These are candidate responsibility mappings, not
   acceptance or exact resource declarations.
6. Keep Cosmos DB, Key Vault, API management, delivery tooling, and infrastructure-as-code
   products as logged source gaps. Do not infer service fitness from a token-audience example or
   broad portfolio page, and do not invent an SDK import, region, quota, price, status, or boundary.

This is a mapping process, not a claim that the candidates have passed.

### Central Copilot to specialists

Here, "central Copilot" means Northstar's user-facing orchestrator, not a claim that every
Microsoft product named Copilot can natively delegate to every other agent. Think of it as the
school receptionist: it gives a specialist one bounded assignment and only the necessary part
of the permission slip.

```mermaid
flowchart LR
    U[User] --> C[Central Copilot]
    C -->|delegate a task| S[Specialist agent]
    C -->|call a capability| T[Tool or data source]
    S -->|result and evidence| C
    C -->|consequential action| H[Human approval]
```

**Takeaway:** delegate open-ended work to an agent; call a bounded capability as a tool; require
fresh authorization and human approval before a consequential effect.

**Equivalent text description:** the user asks the central Copilot for an outcome. The Copilot
either delegates a bounded task to a reasoning specialist or calls a bounded tool or data
source. A specialist returns a result and evidence. A consequential action cannot proceed until
a human approves its exact payload.

#### Path A: low-code connected agents

Consider a primary Copilot Studio agent routing a turn to a Copilot Studio specialist when
business authors own both agents. The cited overview documents separate instructions, knowledge,
tools, orchestration context, Copilot-Studio-only scope, and forwarding of the user message and
relevant conversation history (`VOLATILE PRODUCT CLAIM`, SRC-075, updated 2026-08-27). It does
**not** state GA status or document a switch to disable history forwarding. Therefore release
status and operator control over forwarded history remain unresolved. Use synthetic minimized
context in a PoC, inspect what crosses the boundary, and block production if data-minimization
requirements cannot be proved. Foundry, Fabric, and external-agent bridges remain unresolved;
a table of contents is navigation evidence, not availability evidence (SRC-076, accessed
2026-09-06).

#### Path B: code-first Foundry and Agent Framework

Use Microsoft Foundry Agent Service as a candidate managed runtime and Microsoft Agent Framework
as the application orchestration boundary when developers need explicit contracts, policy,
state, and per-hop authorization. At the 2026-09-06 freeze, the Agent Service overview documented
the managed runtime and identified some preview subfeatures but did not establish an overall GA
claim. Agent Framework documented .NET and Python examples and labeled Go public preview, but its
overview did not state .NET/Python GA status (`VOLATILE PRODUCT CLAIM`, SRC-073, updated
2026-08-27; SRC-078, updated 2026-08-25). Foundry documented per-agent Entra identities and a
token-exchange path for tool access (`VOLATILE PRODUCT CLAIM`, SRC-074, updated 2026-08-25). Put both products behind
Northstar adapters and revalidate those boundaries and statuses before release.

Use framework-native delegation for tightly coupled subagents. Use A2A for an independent agent
that receives a task, reasons under its own instructions and state, and returns a result. Use MCP
for a bounded tool or data operation. Power Platform connectors and Foundry tools remain
tool/data capabilities, not peer agents merely because an agent invokes them. A2A is a
Linux Foundation-governed specification, while MCP is an evolving tool/data protocol; neither
name proves a particular Microsoft integration is supported or GA (`VOLATILE PRODUCT CLAIM`,
SRC-080 and SRC-079, accessed 2026-09-06).

#### Authority, governance, and operations

- **Delegated authority:** when a middle tier calls downstream on a user's behalf, use Entra OBO
  delegated scopes rather than application roles. Preserve both user delegation and workload or
  agent identity, validate token audience at every hop, and never let a specialist's broader
  identity enlarge the user's rights (SRC-091, updated 2026-06-15).
- **Agent identity and least privilege:** assign each agent a distinct Entra identity; inventory
  every shared credential exception; authorize the smallest scopes, tools, sources, tenants, and
  destinations. Test Conditional Access against token subject and audience rather than assuming
  one policy covers delegated, application-only, and agent-account cases (`VOLATILE PRODUCT
  CLAIM`, SRC-074, updated 2026-08-25; SRC-085, updated 2026-07-01). Entra attributes risky OBO
  activity to the user, useful for attribution but not a preventive control (`VOLATILE PRODUCT
  CLAIM`, SRC-084, dated 2026-06-17).
- **Governance:** the Agent 365 overview stated general availability for the Commercial segment
  as of 2026-05-01 and described a registry/control-plane candidate tying agent inventory to
  Entra, Purview, and Defender (`VOLATILE PRODUCT CLAIM`, SRC-081 and SRC-082, updated
  2026-08-19/20). Purview documents auditing and other capability coverage, while
  licensing and configured-policy coverage vary; it can
  capture prompts, responses, referenced files, and sensitivity labels (`VOLATILE PRODUCT
  CLAIM`, SRC-086, updated 2026-06-25). Licensing gates for Agent 365 and Entra remain
  deployment-specific and must be rechecked (SRC-084; SRC-085).
- **Tracing:** propagate one correlation ID across the orchestrator, every specialist, tool,
  approval, and outcome. Record observable task and state transitions, sanitized inputs and
  results, authorization decisions, timing, token/tool usage, and errors, not private
  chain-of-thought. Foundry advertises observability and Purview supplies audit evidence, but the
  exact GA/preview split for prompt, hosted-agent, workflow, and external-A2A tracing was not
  verified (`VOLATILE PRODUCT CLAIM`, SRC-073, updated 2026-08-27; SRC-086, updated
  2026-06-25).
- **Human approval:** bind approval to the exact action payload, actor, tenant, expiry, and
  idempotency key. Enforce it again in the authorization layer so bypassing a workflow UI cannot
  bypass the control.
- **Latency and cost:** compare every delegation design with the single-agent and deterministic
  baselines. Measure p50/p95/p99 end-to-end and per-hop latency, queue time, tokens, tool calls,
  retries, and cost per accepted report. No verified source established cross-agent latency or
  cost attribution, or stable pricing semantics; keep budgets and admission decisions in
  Northstar.
- **Unknown semantics:** no primary Microsoft source in the 2026-09-06 review established native
  replay windows, idempotency keys, or complete retry/timeout semantics for A2A tasks or Copilot
  Studio connected-agent calls. Exact shared versus individual/OAuth-passthrough A2A defaults
  and current RBAC role names also remained unverified. Specify deadlines, cancellation, retry
  classes, backoff, idempotency, reconciliation, and deny-by-default authorization in
  application-owned contracts; do not infer them from a product label.

Begin with one agent. Promote delegation only when a specialist beats the single-agent baseline
on frozen quality, safety, latency, reliability, and cost gates. A multi-agent topology that
merely distributes prompts is additional risk, not an architectural achievement.

#### Phased PoC to production

1. **Scope:** choose one low-risk, read-only delegation; freeze its task/result schema,
   prohibited actions, deadline, retry classes, budgets, and fallback.
2. **Baseline:** measure the deterministic and single-agent implementations first.
3. **Low-code PoC:** build one primary and one Copilot Studio specialist with synthetic,
   minimized context; measure exactly what history crosses the boundary. Do not claim an
   undocumented history-disable control.
4. **Code-first comparison:** implement the same contract through Foundry Agent Service and
   Agent Framework; empirically compare identity modes and do not assume A2A support.
5. **Harden identity:** use distinct agent identities, OBO where user authority must cross a
   hop, least privilege, audience checks, and Conditional Access where verified and licensed.
6. **Add owned controls:** implement correlation, deadlines, safe retry, idempotency,
   delegated-content inspection, authorization-layer approval, and reconciliation.
7. **Govern and attack:** register agents, configure available Purview audit/DLP, and pass the
   delegation security matrix below with synthetic data and hostile-specialist doubles.
8. **Stage:** release to a small group, monitor quality, security, latency, cost, and Entra and
   Purview signals, then rehearse kill, rollback, recovery, and adapter substitution.
9. **Promote or stop:** enter production only when all frozen gates pass; rerun the suite after
   every relevant platform, protocol, authentication, or preview-to-GA change.

#### Engineering appendix: dated delegation map

This map was frozen 2026-09-05 and verified 2026-09-06. **Every row is volatile: revalidate it
against the cited primary source within 30 days of release.**

| Candidate | Status at freeze | Northstar treatment |
|---|---|---|
| Foundry Agent Service | Managed runtime documented; overall and selected-subfeature status unresolved (SRC-073, updated 2026-08-27) | Candidate managed runtime; verify each selected subfeature |
| Foundry agent identity | Identity and token-exchange behavior documented; release status unresolved by the cited page (SRC-074, updated 2026-08-25) | One identity per agent; test exchange, expiry, revocation, audience, and denial |
| Copilot Studio Connected agents | Mechanics and Copilot-Studio-only scope documented; GA status and a history-disable control not stated (SRC-075, updated 2026-08-27) | PoC with synthetic minimized context; block production until status and data minimization are proved |
| Copilot Studio A2A/Foundry/Fabric bridges | Exact availability and status unresolved; TOC placement is not evidence (SRC-076, accessed 2026-09-06) | Block release until the chosen bridge is reverified and tested |
| Microsoft Agent Framework | .NET/Python examples documented; Go public preview; .NET/Python status unstated (SRC-078, updated 2026-08-25) | Code-first adapter candidate |
| Agent 365 | Commercial-segment GA stated by the product overview (SRC-082, updated 2026-08-20) | Registry and governance candidate; verify segment, licenses, prerequisites, and capability coverage |
| Entra Agent ID for Copilot Studio | Release-note behavior requires precise revalidation (SRC-083, updated 2026-08-20) | Verify status and tenant behavior; do not reuse identities |
| Purview for Agent 365 | Capability coverage documented; licensing and configured-policy coverage vary (SRC-086, updated 2026-06-25) | Verify each required audit, DLP, label, retention, and discovery path |
| Foundry Workflows | Current GA, preview, and retirement status was not established; omission from the current overview does not prove retirement (SRC-073, updated 2026-08-27) | Treat status as unknown and block selection pending fresh primary evidence |
| Classic Foundry Connected Agents | Current removal or rename status was not established by the reviewed Foundry and Copilot Studio sources (SRC-073; SRC-075, updated 2026-08-27) | Treat status as unknown; do not confuse it with Copilot Studio Connected agents |
| Semantic Kernel | Still documented; not explicitly deprecated (SRC-077, updated 2024-06-24) | Migration/legacy context only; do not call it retired or superseded without fresh evidence |

#### Engineering appendix: delegation security matrix

| Boundary to attack | Required synthetic test | Release evidence |
|---|---|---|
| OBO subject and audience | Present a Resource X token to Resource Y and ask a specialist with broader rights to act | Both calls denied; no downstream effect |
| Direct versus delegated access | Call the specialist both ways for allowed and forbidden users | Identical effective authorization |
| Delegated prompt injection | Return hostile instructions and canary data from a specialist | Content stays untrusted; no policy or tool-eligibility change |
| Data minimization and exfiltration | Forward unnecessary history and target a blocked connector | History omitted; connector denied; canary absent from traces |
| Tenant isolation | Attempt cross-tenant reads, writes, cache hits, queue consumption, and tool calls | Application and data authorization deny every call; no cross-tenant cache, state, trace, or data disclosure |
| Network/environment isolation | Attempt cross-environment and disallowed-network calls | Private endpoint, public-network, and IP controls reject the network path; do not count this as tenant-isolation proof |
| Tool least privilege | Enumerate each agent's tools and revoke a shared-credential exception | Only allowlisted capabilities work; revocation is immediate |
| Replay and duplicate delivery | Race duplicate delegated tasks and consequential actions | One durable effect per idempotency key; duplicates reconciled |
| Approval bypass | Invoke the underlying action without the approved payload digest | Authorization layer denies it |
| Audit and tracing | Correlate one run across at least three agent/tool hops | Complete, ordered, redacted evidence with retention and access checks |
| Hostile specialist regression | Use a test double for injection, replay, exfiltration, timeout, and malformed results | Stable errors, bounded work, no unauthorized effect |

Prompt Shields and PyRIT are dated candidates for the injection and hostile-specialist tests, not
substitutes for them (`VOLATILE PRODUCT CLAIM`, SRC-089, updated 2026-06-05; SRC-090, accessed
2026-09-06). Foundry private networking and Power Platform data policies are dated candidates
for network/environment isolation and connector controls (`VOLATILE PRODUCT CLAIM`, SRC-087,
updated 2026-08-26; SRC-088, updated 2026-08-14). They do not prove application/data tenant
isolation. Revalidate the selected controls and rerun the matrix before
release.

## How leading teams approach it

The approved sources support five disciplined review inputs:

- `VOLATILE PRODUCT CLAIM, SRC-040`: verify the current project, model, agent, evaluation, and
  operations concepts before testing the candidate surface.
- `VOLATILE PRODUCT CLAIM, SRC-042`: verify the current framework scope, Python APIs, migration
  path, and release status before comparing it with a custom runtime.
- `VOLATILE PRODUCT CLAIM, SRC-044`: verify current Python credential-chain and managed-identity
  integration before implementing a credential adapter.
- `VOLATILE MICROSOFT GUIDANCE CLAIM, SRC-045`: use current architecture patterns and workload
  guidance as questions to test against Northstar evidence.
- `VOLATILE MICROSOFT GUIDANCE CLAIM, SRC-046`: use current reliability, security, cost,
  operations, and performance guidance to find gaps and assign owners.

The synthesis is an engineering interpretation: managed capability can reduce owned work, but
Northstar retains accountability for policy, evaluation, threat treatment, data governance,
acceptable autonomy, and release decisions. Every statement above requires verification within
30 days before release.

## Failure lab

Use synthetic mapping records to inject these failures:

| Injection | Expected diagnosis | Measurable correction |
|---|---|---|
| Claim verified 31 days before release | Freshness gate rejects mapping | Reverify against its approved source and rerun affected tests |
| Provider schema added to `RunRequest` | Stable core depends on volatile edge | Move translation into adapter; rerun domain and substitution tests |
| Workload identity replaces required user delegation | Authority boundary is weakened | Deny call, restore both identity contexts, rerun expiry and confused-deputy tests |
| Duplicate consequential delivery | Missing or failed idempotency control | Record intent and outcome; reconcile duplicate; rerun delivery test |
| Recovery plan omits a regional dependency | Recovery architecture is incomplete | Keep release blocked until dependency and fallback evidence exists |
| Trace contains a protected source extract | Redaction and minimization failed | Remove body capture, rotate access if needed, rerun synthetic leak test |
| Lower-cost option misses quality threshold | Cost optimization violated a frozen gate | Reject it or improve it without lowering the threshold |
| Infrastructure change cannot roll back | Release control is incomplete | Add reconstruction and rollback proof before promotion |

The diagnosis uses requirement, mapping, test, telemetry, and owner links. Correct only the
affected mapping, rerun its gates plus the regression suite, and preserve the failed record as
evidence. Never rewrite a threshold to make the failure disappear.

## Security and safety testing

All tests use synthetic data, deterministic doubles, and no network:

1. **Authorization denial:** omit user delegation while keeping a valid workload identity.
   Expected result: `PermissionError`; evidence: no dependency call and a redacted denial event.
2. **Cross-tenant retrieval:** submit a source reference with another tenant key. Expected
   result: `forbidden`; evidence: zero returned content and no shared-cache hit.
3. **Prompt injection:** place "ignore policy and publish" in a synthetic source. Expected
   result: text remains untrusted data; evidence: no tool eligibility change.
4. **Approval replay:** reuse approval after changing the payload digest. Expected result:
   effect denied; evidence: digest mismatch and no outcome record.
5. **Duplicate delivery:** deliver one action intent twice. Expected result: one effect and one
   duplicate receipt; evidence: a single durable success for the idempotency key.
6. **Dependency timeout:** make an adapter exceed its deadline. Expected result: bounded stable
   error, cancellation propagation, and no unsafe retry.
7. **Budget exhaustion:** consume the last allowed call. Expected result: safe pause or terminal
   budget status with partial artifacts labeled incomplete.
8. **Telemetry leak:** insert a synthetic secret marker in source text. Expected result: marker
   absent from logs and traces; evidence: redaction assertion passes.
9. **Adapter substitution:** swap deterministic implementations. Expected result: unchanged
   domain tests and durable schema.

Passing these tests does not establish compliance or eliminate risk. Qualified reviewers decide
legal, privacy, records, transfer, accessibility, and regulatory conclusions.

## Evaluation

The capstone report includes:

- outcome quality, citation precision, citation coverage, and comparison with the deterministic
  baseline;
- permission-filter recall, relevance, freshness, and cross-tenant negative results;
- tool choice, argument validity, approvals, stop behavior, idempotency, cancellation, and
  budget adherence;
- injection, exfiltration, identity, tenant, redaction, privacy, safety, and accessibility tests;
- p50, p95, and p99 latency, throughput, saturation, availability, recovery, RPO, and RTO;
- model, retrieval, state, telemetry, and operator cost per accepted report;
- alert precision, dashboard usefulness, runbook completion, rollback, restore, and incident
  drill results;
- one critical adapter substitution and its measured effort;
- product-claim freshness coverage, which must be 100 percent for release.

An evaluator result is versioned with its dataset, code, configuration, component versions,
timestamp, slices, and owner. Private chain-of-thought is neither collected nor scored.
Observable plans, state transitions, tool requests and results, policy decisions, approvals,
citations, and outcomes provide the inspectable record.

## Production checklist

- [ ] Frozen requirements retain IDs, thresholds, evidence, and owners.
- [ ] Build, buy, hybrid, and no-change options use the same measured criteria.
- [ ] The deterministic baseline remains available where added complexity has not proved value.
- [ ] Domain interfaces and durable state contain no provider SDK types or schemas.
- [ ] Every product, API, SDK, feature, status, region, quota, limit, price, data, identity,
      network, and service-boundary claim is marked volatile, cites an approved source, and was
      verified within 30 days before release.
- [ ] Unsupported or stale mappings have an owner, deadline, evidence need, fallback, and
      automatic release consequence.
- [ ] Python 3.11 offline contract tests pass with deterministic doubles.
- [ ] Any optional live test is explicitly enabled, tenant-safe, separately isolated, and
      budget capped.
- [ ] Infrastructure plans include identity, network, encryption intent, telemetry, retention,
      region policy, budgets, tags, version pins where applicable, checks, drift, rollback,
      recovery, and cleanup.
- [ ] Delegated user authority and workload identity remain distinct through every adapter.
- [ ] Tenant, permission, retention, deletion, backup-expiry, and redaction tests pass.
- [ ] Timeout, retry, circuit, backpressure, duplicate, idempotency, restore, and regional
      failure behavior meets frozen requirements.
- [ ] Evaluation gates meet outcome, citation, retrieval, trajectory, safety, latency,
      reliability, accessibility, operations, and cost thresholds.
- [ ] A critical adapter substitution passes without changing domain contracts.
- [ ] Dashboards, alerts, runbooks, incidents, rollback, kill, migration, and retirement have
      named owners and drill evidence.
- [ ] Residual risks and conditional items have authorized owners and deadlines.
- [ ] Legal and compliance conclusions remain with qualified reviewers.
- [ ] No prompt, interface, log, trace, approval, evaluation, or review artifact requires or
      stores private chain-of-thought.

### Production-readiness decision

The panel includes product, architecture, engineering, evaluation, security, privacy, SRE,
data, cost, accessibility, governance, source, and release owners. It reviews the deployment
context, trust boundaries, mappings, freshness, code, infrastructure plans, evaluations,
threat treatments, identity and data flows, dashboards, runbooks, recovery, rollback, cost,
open decisions, and retirement plan.

- `accepted`: all required checks pass and authorized owners hold residual risks.
- `conditionally_accepted`: only time-bounded, non-safety conditions remain, each with an
  owner, deadline, evidence requirement, and automatic consequence.
- `rejected`: any safety invariant, delegated-authority boundary, tenant isolation, freshness,
  evaluation, recovery, rollback, or ownership criterion fails.

Passing is not a compliance certification.

## Review questions

1. Why must Northstar freeze requirements before opening a product catalog?
2. What belongs in the stable core, and what belongs at the volatile edge?
3. Why can a managed feature pass its own test yet fail the system design?
4. What makes a product claim fresh enough for a planned release?
5. When should no change beat build, buy, or hybrid?
6. How does user delegation differ from workload identity?
7. What evidence proves that an exit path is more than documentation?
8. Which failures force rejection rather than conditional acceptance?

## Try it safely

Use index cards or a local text file. Write three fictional components: `report model`,
`credential adapter`, and `command queue`. Give each two frozen requirement IDs. Then create
four fictional offers:

- one with evidence verified 31 days before release;
- one that merges user and workload identity;
- one expensive offer that passes every frozen test;
- one offer with no recovery evidence.

Classify each component as build, buy, hybrid, no change, or unresolved. Reject the stale and
identity-weakening offers. Do not use real product names, accounts, prices, credentials,
personal data, or network access. Finish by recording `accepted`, `conditionally_accepted`, or
`rejected` and one sentence of evidence for the decision.

## Common misunderstanding

**Misconception:** choosing a cloud product completes the architecture.

**Correction:** a product can implement only the responsibilities its current evidence and
tests support. The architecture is still the full set of domain contracts, authority rules,
data flows, evaluations, infrastructure controls, operating evidence, and exit paths. Managed
capability does not transfer Northstar's accountability to the provider.

## Recap and next step

- Begin with accepted vendor-neutral requirements and the deterministic baseline.
- Keep provider integrations behind adapters and durable data provider-neutral.
- Treat every product fact as volatile and verify it from an approved source within 30 days
  before release.
- Choose build, buy, hybrid, or no change from measured evidence, not product familiarity.
- Reject mappings that weaken authority, tenant isolation, recovery, rollback, or exit paths.

This is the final chapter. The next step is not another feature. It is the production-readiness
review, followed by an accepted release, a bounded conditional plan, or a rejection with owned
corrective work.

## Design exercise

Northstar's team has measured two options for the model-gateway responsibility:

- **Option A, build:** more operator work, stable domain control, tested fallback, and a slower
  delivery date.
- **Option B, hybrid candidate:** less projected operator work and faster experiments, but its
  claim is 20 days old, regional and price verification is incomplete, and the exit drill has
  not run.

Create a decision record that:

1. cites NS-QUAL-01, NS-BUDGET-01, NS-REL-01, NS-PORT-01, and NS-BASE-01;
2. names the quality, latency, recovery, cost, and substitution tests;
3. distinguishes missing evidence from failed evidence;
4. records what can proceed offline while product facts are unresolved;
5. chooses build, hybrid, no change, or unresolved for the planned release;
6. defines the automatic release consequence if regional, price, or exit evidence remains
   incomplete.

More than one answer is defensible. Lower projected effort alone is not.

## Hands-on lab

Create a temporary practice directory outside the repository and place the Python program from
"Build it in Python" in `chapter36_validation.py`. Use only the included synthetic records.

1. Run `python chapter36_validation.py` with Python 3.11 or later.
2. Confirm the fresh record passes and the 31-day record fails.
3. Change the fresh record to an unapproved source ID and confirm rejection.
4. Remove `unresolved_owner` and confirm the unresolved record fails.
5. Change the plan's identity mode and confirm the plan fails.
6. Add a second deterministic `CredentialProvider` and rerun the same caller assertions.
7. Record a readiness decision with requirement IDs, failures, owners, and release consequence.
8. Delete the temporary directory.

Expected evidence is terminal output, assertion results, and the local decision record. The lab
uses no account, payment, cloud deployment, live AI provider, personal data, secrets, or
network. Cleanup removes only files created in the temporary practice directory.

## Sources

- **SRC-040, Microsoft Foundry documentation.** `VOLATILE PRODUCT CLAIM`: current platform
  concepts, projects, models, agents, evaluation, and operations. Verify every used claim
  within 30 days before release.
- **SRC-041, Foundry Agent Service overview.** `VOLATILE PRODUCT CLAIM`: candidate hosted-agent
  responsibilities. Verify every selected capability and subfeature within 30 days before release.
- **SRC-042, Microsoft Agent Framework repository.** `VOLATILE PRODUCT CLAIM`: current
  framework scope, Python APIs, migration, and release status. Verify every used claim within
  30 days before release.
- **SRC-043, Azure AI Search vector search overview.** `VOLATILE PRODUCT CLAIM`: candidate vector
  and hybrid retrieval responsibilities; it does not prove Northstar authorization or fitness.
- **SRC-044, Azure Identity client library for Python.** `VOLATILE PRODUCT CLAIM`: current
  credential-chain and managed-identity integration. Verify every used claim within 30 days
  before release.
- **SRC-045, Azure Architecture Center.** `VOLATILE MICROSOFT GUIDANCE CLAIM`: current cloud
  design patterns and workload guidance. Verify every used claim within 30 days before release.
- **SRC-046, Azure Well-Architected Framework.** `VOLATILE MICROSOFT GUIDANCE CLAIM`: current
  reliability, security, cost, operations, and performance review guidance. Verify every used
  claim within 30 days before release.
- **SRC-047, Azure Monitor OpenTelemetry.** `VOLATILE PRODUCT CLAIM`: candidate Python telemetry
  and Application Insights export guidance; evidence semantics, redaction, and completeness stay
  application-owned.
- **SRC-048, Azure Container Apps documentation.** `VOLATILE PRODUCT CLAIM`: candidate managed
  container hosting and event-driven scaling guidance; workload fitness remains unproved.
- **SRC-049, Azure Service Bus messaging documentation.** `VOLATILE PRODUCT CLAIM`: candidate
  queues, topics, and durable messaging guidance; Northstar retains idempotency and workflow rules.
- **SRC-073, Microsoft Learn, [Microsoft Foundry Agent Service
  overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview).** Dated
  2026-08-19, updated 2026-08-27, verified 2026-09-06; the page does not establish overall GA.
- **SRC-074, Microsoft Learn, [Agent identity concepts in Microsoft
  Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity).**
  Dated 2026-08-21, updated 2026-08-25, verified 2026-09-06.
- **SRC-075, Microsoft Learn, [Connected agents
  overview](https://learn.microsoft.com/en-us/microsoft-copilot-studio/agents-experience/authoring-add-other-agents).**
  Dated 2026-06-23, updated 2026-08-27, verified 2026-09-06. It documents automatic relevant-history
  forwarding but states neither GA status nor a disable control.
- **SRC-076, Microsoft Learn, [Copilot Studio documentation table of
  contents](https://learn.microsoft.com/en-us/microsoft-copilot-studio/toc.json).** Structural
  snapshot verified 2026-09-06; use only as navigation evidence.
- **SRC-077, Microsoft Learn, [Introduction to Semantic
  Kernel](https://learn.microsoft.com/en-us/semantic-kernel/overview/).** Dated 2023-07-11,
  updated 2024-06-24, verified 2026-09-06; use only as migration/legacy context.
- **SRC-078, Microsoft Learn, [Microsoft Agent Framework
  overview](https://learn.microsoft.com/en-us/agent-framework/overview/).** Dated 2026-07-29,
  updated 2026-08-25, verified 2026-09-06. It labels Go public preview but does not state
  .NET/Python GA status.
- **SRC-079, MCP project, [What is the Model Context
  Protocol?](https://modelcontextprotocol.io/docs/getting-started/intro).** Snapshot dated
  2026-07-28, verified 2026-09-06.
- **SRC-080, A2A project/Linux Foundation, [A2A Protocol
  documentation](https://a2a-protocol.org/latest/).** Living specification verified
  2026-09-06.
- **SRC-081, Microsoft Learn, [Microsoft Agents documentation
  hub](https://learn.microsoft.com/en-us/agents/).** Dated and updated 2026-08-19, verified
  2026-09-06.
- **SRC-082, Microsoft Learn, [Microsoft Agent 365
  overview](https://learn.microsoft.com/en-us/microsoft-agent-365/overview).** Dated
  2026-08-19, updated 2026-08-20, verified 2026-09-06.
- **SRC-083, Microsoft Learn, [What's new in Copilot
  Studio](https://learn.microsoft.com/en-us/microsoft-copilot-studio/whats-new).** Dated
  2026-08-18, updated 2026-08-20, verified 2026-09-06.
- **SRC-084, Microsoft Learn, [ID Protection for
  agents](https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents).** Dated
  2026-06-17, verified 2026-09-06.
- **SRC-085, Microsoft Learn, [Conditional Access for
  agents](https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id).**
  Dated 2026-06-19, updated 2026-07-01, verified 2026-09-06.
- **SRC-086, Microsoft Learn, [Use Purview to manage Agent 365 data security and
  compliance](https://learn.microsoft.com/en-us/purview/ai-agent-365).** Dated 2026-05-01,
  updated 2026-06-25, verified 2026-09-06.
- **SRC-087, Microsoft Learn, [Configure network isolation for Microsoft
  Foundry](https://learn.microsoft.com/en-us/azure/foundry/how-to/configure-private-link).**
  Dated 2026-08-14, updated 2026-08-26, verified 2026-09-06; this is network/environment
  isolation evidence, not application/data tenant-isolation evidence.
- **SRC-088, Microsoft Learn, [Power Platform data
  policies](https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention).**
  Dated 2026-04-07, updated 2026-08-14, verified 2026-09-06.
- **SRC-089, Microsoft Learn, [Prompt
  Shields](https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection).**
  Dated 2025-11-21, updated 2026-06-05, verified 2026-09-06.
- **SRC-090, Microsoft/GitHub,
  [PyRIT](https://github.com/Azure/PyRIT).** Continuously updated; verified 2026-09-06.
- **SRC-091, Microsoft Learn, [OAuth 2.0 On-Behalf-Of
  flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-on-behalf-of-flow).**
  Dated 2025-01-04, updated 2026-06-15, verified 2026-09-06.

The delegation additions were frozen 2026-09-05 and last verified 2026-09-06 from these primary
sources. Revalidate every volatile claim within 30 days of the actual release: source freshness
supports review; it does not prove that a candidate satisfies Northstar's requirements.