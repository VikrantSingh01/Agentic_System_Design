# Transcript: A Question’s Safe Journey Through an Agent System

This transcript makes the animation unnecessary for understanding the story. Each numbered caption exactly matches the corresponding on-screen caption.

## 1. The Front Door

**Caption:** A person asks a question at the front door.

The **Experience adapter** accepts the request at a clear system boundary. The request is data; it cannot set policy or grant itself authority.

## 2. Badge Check

**Caption:** The front desk checks who is asking and what they are allowed to request.

**API and admission control** create a request ticket, assign its request ID, and rate-limit at a distinct boundary. Admission authenticates the user, resolves tenant context, and checks delegated authority. The Runtime later uses a separate workload identity; neither identity can substitute for or widen the other. Being polite is not authorization. A valid-looking but unauthorized synthetic user badge is `forbidden`; no tool is called.

## 3. The Coordinator’s Desk

**Caption:** A coordinator takes the question to a desk with a notepad and a kitchen timer.

The **Runtime** manages explicit state, budgets, deadlines, and the observe → decide → act loop. A separate durable workflow substrate supplies checkpoints, waits, retries, and cancellation. Its working context is bounded and reconstructed. Delegated user identity and workload identity remain distinct. Enforced limits can safely stop the run.

## 4. The Reference Shelf

**Caption:** The coordinator opens only approved binders. A sticky note inside one is something to read, never a new instruction.

The **Retrieval service** performs permission-aware search, reauthorizes the delegated user when fetching from a source, and returns versioned passages with provenance. A cross-tenant fetch is denied at the source. Retrieved content stays untrusted. An authorized synthetic passage saying “ignore prior rules” remains quoted data and is never executed.

## 5. The Next-Step Guesser

**Caption:** A machine predicts one useful next step from patterns it has seen. It is guessing, not knowing.

The **Model gateway** receives bounded context and returns one untrusted, typed proposal. It does not execute tools, own policy, or gain authority. A disallowed proposal is rejected by ordinary code and policy.

## 6. The Rulebook Checker

**Caption:** A checker compares the proposed step with the rules. A disallowed guess stops here.

This per-action **Policy decision point** is distinct from admission authorization. It and the deterministic Runtime validate schema, delegated and workload authority, purpose, destination, budget, and task state. Anything not explicitly allowed is denied. Model text cannot override a `policy_denied` decision.

## 7. The Toolbox

**Caption:** The coordinator may use only tools approved for this job.

The **Connector and tool gateway** exposes typed, allowlisted, least-privilege tools. Read-only calls may proceed after action authorization. Consequential effects remain blocked until exact approval is valid. An out-of-list or malformed call returns `invalid_request` or `forbidden`; effects also require idempotency and a durable outcome.

## 8. Calling a Specialist

**Caption:** For a bounded part, the coordinator sends a clear written request to a specialist desk with its own toolbox and rules.

The **Runtime coordinator** hands a structured subtask to a separate **specialist runtime**. It has its own bounded policy and allowlisted tools, returns a structured result, spends the parent budget, and cannot expand authority. An out-of-scope handoff or specialist tool request is rejected at that runtime boundary.

## 9. Going Outside

**Caption:** Answers from outside are labeled ‘double-check this’ until verified.

This scene shows a read-only external response. **External systems** return untrusted data, and the gateway enforces destination and egress policy. Missing or mismatched provenance keeps a result labeled untrusted and withholds it from citation. A consequential write remains blocked pending exact approval.

## 10. The Supervisor’s Stamp

**Caption:** A consequential action needs a supervisor to approve the exact page before it goes out.

Before an effectful tool runs, the **Approval service** binds an authorized reviewer’s decision to the exact payload digest, destination, policy version, and expiry. The reviewer identity is distinct from the Runtime workload identity. Approval is a state transition, not a chat phrase. A changed payload or stale approval is denied.

## 11. The Records Area

**Caption:** Observable steps go into a logbook. Secrets and private scratch notes do not.

Authoritative **state and artifact stores** preserve checkpoints and versioned outputs. Separately, the **Observability pipeline** receives minimized, redacted events for operations and later trajectory evaluation, not secrets or private chain-of-thought. A synthetic secret is redacted before evidence is emitted. Losing telemetry cannot silently rewrite authoritative run state.

## 12. Answer or Stop

**Caption:** The coordinator returns an answer or explains a safe stop when time runs out or the rules say no, instead of guessing forever.

The Runtime validates output, citations, provenance, and redaction before returning a versioned result or an explicit terminal status: `completed`, `completed_with_warnings`, `needs_clarification`, `awaiting_approval`, `budget_exhausted`, `cancelled`, `policy_denied`, `failed_recoverable`, or `failed_terminal`. Release evaluation remains a separate control-plane process. Forced exhaustion ends as `budget_exhausted`, without a silent retry loop or unapproved final report.

## Trace versus production topology

The twelve scenes reveal a request trace one boundary at a time; they are not a deployment topology, and not every request uses every conditional branch. In production, a separate **control plane** owns governance and policy configuration, evaluation and release gates, and deployment. It supplies integrity-protected versioned policy, configuration, and releases to the **data plane** shown in the story. The data plane emits minimized, redacted events for operations and later trajectory evaluation. Prompts, model output, retrieved passages, and tool responses never become control-plane instructions.

## Where the help-center picture stops matching

- The model is not a person. It predicts likely tokens, has no understanding, and can be confidently wrong.
- The Runtime reconstructs bounded context; it does not remember naturally. Cross-run memory is evaluated, opt-in, and off by default.
- Approval is narrower than a human signature: exact payload, destination, policy version, and expiry are bound.
- Specialists are bounded software workers, not people exercising independent judgment.
- Authority never increases at runtime. Anything not explicitly allowed is denied.
