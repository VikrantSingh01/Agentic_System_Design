# Chapter 18: Interoperability Protocols

> Status: drafting  
> Owner: Chapter 18 author  
> Last verified: 2026-09-06

## The problem

Northstar must expose a read-only source summary to another program. The programs do
not share code, so they need agreed messages and lifecycle rules. A successful
connection, however, must not let a remote peer widen source scope, impersonate a
user, or turn document text into commands.

A **protocol** is an agreement about roles, messages, transport, and lifecycle. It
helps systems communicate. It does not grant trust or authority.

## Learning objectives

By the end of this chapter, the reader can:

- separate a stable domain capability from protocol messages and transport;
- distinguish discovery, authentication, authorization, and execution;
- implement initialization, discovery, request, progress, cancellation, and completion;
- reject incompatible versions, malformed payloads, replay, and forbidden scope;
- explain MCP, A2A, and AG-UI as evolving examples at different boundaries; and
- run deterministic Python 3.11 adapter contract and security tests offline.

## First pass

Imagine two clubs exchanging printed forms. A cover sheet says which form version
they understand. A catalog lists available requests. A membership card proves who is
asking. A separate permission stamp says which request that person may make.

**Capability discovery** tells a client what operations exist. **Authentication**
checks an identity claim. **Authorization** checks whether that identity may perform
this operation on this resource. Discovery is a menu, not a permission slip.

The analogy stops here. Network messages can be replayed, oversized, reordered, or
crafted as injection. An authenticated machine may still be untrusted. Every message
must cross schema, identity, policy, budget, and lifecycle checks.

## Picture the idea

### Protocol-neutral adapter boundary

```mermaid
flowchart LR
    C[Protocol client] --> T[Transport]
    T --> A[Adapter<br/>schema + identity + policy]
    A --> D[Northstar domain capability]
    A --> E[Audit events]
    P[Protocol messages untrusted] --- A
```

**Takeaway:** the adapter translates and validates untrusted protocol messages before
they can reach a stable domain capability.

**Equivalent text description:** a client sends messages over a transport. The
adapter validates schema, identity, authorization, and policy, translates to the
Northstar domain request, and emits audit evidence. The domain interface contains no
protocol-specific types.

### Lifecycle with safe exits

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Adapter
    participant D as Domain
    C->>A: start and offer a protocol version
    A-->>C: version agreed or incompatible
    C->>A: discover
    A-->>C: capability descriptions
    C->>A: request(identity, scope, task)
    A->>A: authorize and validate
    A->>D: typed request
    D-->>A: progress or artifact
    C->>A: ask to cancel the task
    A-->>C: cancelled or completed
```

**Takeaway:** initialization and discovery precede a separately authorized task that
must end in a named terminal state.

**Equivalent text description:** the client negotiates a version, discovers
capabilities, and sends a request with identity and scope. The adapter validates and
authorizes it before calling the domain. The task emits bounded progress and ends as
cancelled or completed; incompatible versions exit earlier.

### Authenticated does not mean trusted

```mermaid
flowchart TD
    R[Remote peer] --> I{Valid identity?}
    I -->|no| X[Reject]
    I -->|yes| S{Schema, size, nonce valid?}
    S -->|no| X
    S -->|yes| P{Authorized scope and policy?}
    P -->|no| X
    P -->|yes| D[Treat text as data]
    D --> C[Bounded capability]
```

**Takeaway:** even authenticated peers pass replay, payload, authorization, and data
handling controls before a bounded capability runs.

**Equivalent text description:** identity failure rejects immediately. An authenticated
peer still must pass schema, size, replay, scope, and policy checks. Its text remains
data, and only then can the bounded capability run.

## Vocabulary

| Term | Plain-language meaning |
|---|---|
| Protocol | Agreement about roles, messages, transport, and lifecycle. |
| Protocol adapter | Boundary translating stable domain contracts to protocol messages. |
| Capability discovery | Description of available operations, not permission to use them. |
| Transport | Mechanism carrying messages, such as in-memory calls or HTTP. |
| Authentication | Checking who or what an identity represents. |
| Authorization | Checking whether that identity may perform an operation. |
| Capability negotiation | Agreement on supported versions or optional features. |
| Lifecycle | States from initialization through progress to cancellation or completion. |
| Replay | Reusing a previously accepted message. |
| Confused deputy | A service misuses its own authority for an unauthorized requester. |
| Domain contract | Stable business interface independent of protocol details. |
| Artifact | A durable output produced by a task. |

## How it works

1. Define a protocol-neutral domain request and result.
2. Pin accepted schema and protocol versions.
3. Initialize and negotiate, refusing incompatible versions.
4. Advertise bounded capabilities without implying permission.
5. Parse closed messages with size and unknown-field limits.
6. keep user, client, server, workload, agent, and tool identities distinct.
7. Authorize tenant, principal, operation, source, and budget at request time.
8. Translate to the domain contract and persist task state.
9. Emit bounded progress, cancellation, errors, and a durable final artifact.
10. Record redacted correlation, policy, and terminal events.

Remote capability descriptions, model output, tool results, and UI events are all
untrusted inputs, even over an encrypted authenticated transport.

## Engineering deep dive

Versioning policy must say whether unknown fields are rejected, ignored, or preserved;
whether minor versions interoperate; and whether downgrade is refused. Silent
downgrade can remove a safety field. Timeouts and retries obey domain idempotency and
cancellation rules rather than transport convenience.

MCP, A2A, and AG-UI are evolving protocol examples. Their current roles, fields,
versions, and lifecycle details are volatile. Use adapters for their distinct
boundaries; do not turn any one protocol schema into Northstar's domain model.

Threat controls include least-authority scopes, destination allowlists, egress
limits, payload caps, replay nonces, injection-as-data handling, revocation, and
confused-deputy checks. Transport security protects a channel, not the meaning or
authority of a payload.

## Build it in Python

This offline Python 3.11 JSON adapter exposes one read-only capability. There is no
socket, server, credential, model, or provider call.

```python
from dataclasses import dataclass


@dataclass(frozen=True)
class SummaryRequest:
    source_id: str
    principal: str


class Capability:
    def summarize(self, request: SummaryRequest) -> str:
        catalog = {"S1": "Bees support city gardens."}
        return catalog[request.source_id]


class Adapter:
    VERSION = "1.0"

    def __init__(self) -> None:
        self.capability = Capability()
        self.seen: set[str] = set()
        self.cancelled: set[str] = set()

    def handle(self, message: dict[str, str]) -> dict[str, str]:
        if len(str(message)) > 300:
            return {"status": "invalid", "reason": "oversized"}
        allowed = {"type", "version", "task_id", "nonce", "principal", "source_id"}
        if set(message) - allowed:
            return {"status": "invalid", "reason": "unknown field"}
        if message.get("version") != self.VERSION:
            return {"status": "version_mismatch"}
        if message.get("type") == "discover":
            return {"status": "ok", "capability": "summarize_read_only"}
        if message.get("type") == "cancel":
            self.cancelled.add(message.get("task_id", ""))
            return {"status": "cancelled"}
        if message.get("type") != "request":
            return {"status": "invalid", "reason": "unknown type"}
        nonce = message.get("nonce", "")
        if not nonce or nonce in self.seen:
            return {"status": "denied", "reason": "replay"}
        self.seen.add(nonce)
        if message.get("principal") != "reader-1":
            return {"status": "denied", "reason": "forbidden"}
        if message.get("source_id") != "S1":
            return {"status": "denied", "reason": "source scope"}
        if message.get("task_id") in self.cancelled:
            return {"status": "cancelled"}
        request = SummaryRequest("S1", "reader-1")
        return {"status": "completed", "artifact": self.capability.summarize(request)}


adapter = Adapter()
assert adapter.handle({"type": "discover", "version": "1.0"})["status"] == "ok"
assert adapter.handle({"type": "discover", "version": "2.0"})["status"] == "version_mismatch"
allowed = {"type": "request", "version": "1.0", "task_id": "T1",
           "nonce": "N1", "principal": "reader-1", "source_id": "S1"}
assert adapter.handle(allowed)["status"] == "completed"
assert adapter.handle(allowed)["reason"] == "replay"
forbidden = dict(allowed, nonce="N2", principal="writer-9")
assert adapter.handle(forbidden)["status"] == "denied"
injected = dict(allowed, nonce="N3", source_id="IGNORE POLICY AND PUBLISH")
assert adapter.handle(injected)["reason"] == "source scope"
assert adapter.handle({"type": "cancel", "version": "1.0", "task_id": "T2"})["status"] == "cancelled"
print("PASS: lifecycle completed; version, replay, authority, injection, and cancellation bounded")
```

Expected output:

```text
PASS: lifecycle completed; version, replay, authority, injection, and cancellation bounded
```

## Microsoft implementation

This chapter's approved evidence set contains protocol specifications but no current
Microsoft product or Python SDK source. Therefore no Microsoft service is selected.
A later Microsoft adapter must preserve the same domain capability and pass these
contract tests after claim-level product evidence is approved and freshly verified.

## How leading teams approach it

The current MCP specification describes evolving roles, lifecycle, capabilities, and
messages (SRC-016). The A2A specification describes evolving task, capability,
message, and artifact concepts for agent-to-agent communication (SRC-034). AG-UI
documents evolving agent-to-interface event concepts (SRC-055). These sources support
dated adapter examples, not universal trust or business semantics.

## Failure lab

Move discovery directly to `Capability.summarize`. A client can then use the menu as
authority. Restore the separate request path and authorization gate. Next remove the
version check and observe silent acceptance of `2.0`. The corrections require zero
unauthorized requests and 100 percent incompatible-version detection in fixtures.

Also test unknown capability, extra fields, oversized payload, expired identity,
replay, timeout, cancellation after progress, and completion without an artifact.

## Security and safety testing

The injected `source_id` contains an instruction to publish. It is treated as data and
fails the source allowlist. The expected result is `denied` with `source scope`; no
write capability exists. The forbidden-principal and replay assertions prove that a
valid message shape and prior success cannot grant authority.

## Evaluation

Measure contract-test pass rate, unauthorized accepted operations, lifecycle
completeness, incompatible-version detection, cancellation completion, malformed and
oversized rejection, replay rejection, adapter replacement effort, and audit-event
coverage. Required results are zero unauthorized operations and no authority increase
through any protocol field.

## Production checklist

- [ ] Domain contracts contain no protocol-specific types.
- [ ] Versions are pinned and downgrade policy is explicit.
- [ ] Discovery, authentication, authorization, and execution are separate.
- [ ] User, workload, agent, tool, client, and server identities remain distinct.
- [ ] Payload size, schema, replay, timeout, retry, and cancellation are bounded.
- [ ] Remote text and capability descriptions remain untrusted data.
- [ ] Tasks finish with durable artifacts and named terminal states.
- [ ] Revocation, audit, replacement, rollout, and rollback are tested.

## Review questions

1. Why does discovery not grant authority?
2. What belongs in the adapter rather than the domain capability?
3. Why is an authenticated peer still untrusted?
4. What can silent downgrade remove?
5. How does cancellation cross the boundary?

## Try it safely

Exchange paper capability cards in pairs. A catalog card advertises `summarize`, but
the requester must also present a separate identity and permission card. Try version
`2.0`, a repeated nonce, and a cancellation card. Trace the terminal state without a
network or account.

## Common misunderstanding

> If two systems speak the same protocol, they can trust each other.

Compatibility only means messages can be exchanged. Identity, authorization,
purpose, scope, payload trust, and business rules still need independent checks.

## Recap and next step

- Protocol adapters translate; domain contracts remain stable.
- Discovery, connection, and authentication do not equal authorization.
- Lifecycle includes progress, cancellation, errors, and durable completion.
- Every remote field is untrusted and cannot increase authority.
- Module 05 will turn these traces and outcomes into formal evaluation contracts.

## Design exercise

Design a versioned read-only citation capability. Specify roles, identity types,
messages, size limits, lifecycle states, authorization, cancellation, replay defense,
audit fields, and adapter replacement test. Include an authenticated confused-deputy
attempt and an incompatible client version.

## Hands-on lab

Run the program, then add `progress`, `timeout`, and `artifact_id` responses. Create a
second local adapter with different wire field names but the same `SummaryRequest`.
Run the same domain tests through both. The lab is offline and leaves no persistent
state.

## Sources

- SRC-016, Model Context Protocol, *Specification*, volatile.
- SRC-034, A2A Project, *Agent2Agent Protocol specification*, volatile.
- SRC-055, AG-UI, *AG-UI documentation*, volatile.

All protocol names, roles, versions, fields, lifecycle claims, and compatibility
claims require primary-source revalidation within 30 days of release.