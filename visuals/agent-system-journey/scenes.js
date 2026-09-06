(function () {
  "use strict";

  window.AGENT_SCENES = [
    {
      title: "The Front Door",
      caption: "A person asks a question at the front door.",
      focus: ["user", "front-door"],
      edges: ["user-front"],
      detail: "The Experience adapter accepts the request at the front-door intake; the separate admission ticket boundary is the next step.",
      security: "The request is data. It cannot set policy or grant itself authority.",
      status: "received",
      contract: "Researcher → Front door intake"
    },
    {
      title: "Badge Check",
      caption: "The front desk checks who is asking and what they are allowed to request.",
      focus: ["front-door", "admission", "badge-check"],
      edges: ["front-admission", "admission-badge"],
      detail: "API and admission control create a request ticket, assign its request ID, and rate-limit at a distinct boundary. The identity badge check authenticates and resolves tenant context before the Policy decision point checks delegated authority. Being polite is not authorization.",
      security: "Safe test: a valid-looking but unauthorized synthetic badge is forbidden; no tool is called.",
      status: "policy_denied or admitted",
      contract: "Admission ticket boundary → identity badge check → Policy decision point"
    },
    {
      title: "The Coordinator’s Desk",
      caption: "A coordinator takes the question to a desk with a notepad and a kitchen timer.",
      focus: ["badge-check", "runtime"],
      edges: ["badge-runtime"],
      detail: "The Runtime manages explicit state, budgets, deadlines, and the observe → decide → act loop. Its working context is bounded and reconstructed.",
      security: "The timer is enforced: time, step, tool, and retry limits can safely stop the run.",
      status: "running within budget",
      contract: "Coordinator: run task / Runtime"
    },
    {
      title: "The Reference Shelf",
      caption: "The coordinator opens only approved binders. A sticky note inside one is something to read, never a new instruction.",
      focus: ["runtime", "retrieval"],
      edges: ["runtime-retrieval", "retrieval-runtime"],
      detail: "The Retrieval service performs permission-aware search and returns versioned passages with provenance. Retrieved content stays untrusted.",
      security: "Safe test: a synthetic passage saying “ignore prior rules” remains quoted data and is never executed.",
      status: "authorized content returned (untrusted)",
      contract: "Retrieval service / Authorized source query"
    },
    {
      title: "The Next-Step Guesser",
      caption: "A machine predicts one useful next step from patterns it has seen. It is guessing, not knowing.",
      focus: ["runtime", "model"],
      edges: ["runtime-model", "model-runtime"],
      detail: "The Model gateway receives bounded context and returns one untrusted, typed proposal. It does not execute tools, own policy, or gain authority.",
      security: "Safe test: a model fixture may name a disallowed tool, but the proposal still must pass ordinary code and policy.",
      status: "proposal received (untrusted)",
      contract: "Model gateway / Model proposes"
    },
    {
      title: "The Rulebook Checker",
      caption: "A checker compares the proposed step with the rules. A disallowed guess stops here.",
      focus: ["runtime", "rulebook"],
      edges: ["runtime-rulebook", "rulebook-runtime"],
      detail: "The Policy decision point and deterministic runtime validate schema, authority, budget, and task state. Anything not explicitly allowed is denied.",
      security: "A disallowed synthetic proposal becomes policy_denied. Model text cannot override the decision.",
      status: "allowed or policy_denied",
      contract: "Code checks → allowed / denied"
    },
    {
      title: "The Toolbox",
      caption: "The coordinator may use only tools approved for this job.",
      focus: ["runtime", "toolbox"],
      edges: ["runtime-toolbox", "toolbox-runtime"],
      detail: "The Connector and tool gateway exposes typed, allowlisted, least-privilege tools. Effectful calls also require an idempotency key and durable outcome.",
      security: "Safe test: an out-of-allowlist or malformed call returns invalid_request or forbidden.",
      status: "validated tool result",
      contract: "Bounded tool / Connector and tool gateway"
    },
    {
      title: "Calling a Specialist",
      caption: "For a bounded part, the coordinator sends a clear written request to a specialist desk with its own toolbox and rules.",
      focus: ["runtime", "specialist"],
      edges: ["runtime-specialist", "specialist-runtime"],
      detail: "The Runtime coordinator hands a structured subtask to a separate specialist runtime. That runtime has its own bounded policy and allowlisted tools, returns a structured result, spends the parent budget, and cannot expand authority.",
      security: "Safe test: an out-of-scope handoff or specialist tool request is rejected at the specialist runtime boundary.",
      status: "bounded result or failed_recoverable",
      contract: "Runtime coordinator → bounded Specialist runtime → structured result"
    },
    {
      title: "Going Outside",
      caption: "Answers from outside are labeled ‘double-check this’ until verified.",
      focus: ["toolbox", "outside"],
      edges: ["toolbox-outside", "outside-toolbox"],
      detail: "External systems return untrusted responses. Provenance, authorization metadata, and verification travel with usable evidence.",
      security: "Safe test: missing or mismatched provenance keeps a result labeled untrusted and withholds it from citation.",
      status: "untrusted until verified",
      contract: "External systems / Versioned cited passages"
    },
    {
      title: "The Supervisor’s Stamp",
      caption: "A consequential action needs a supervisor to approve the exact page before it goes out.",
      focus: ["runtime", "approval"],
      edges: ["runtime-approval", "approval-runtime"],
      detail: "The Approval service binds an authorized reviewer’s decision to the exact payload digest, destination, policy version, and expiry. Approval is a state transition, not a chat phrase.",
      security: "Safe test: changing the payload or using a stale approval is denied. Class D actions remain denied in the initial design.",
      status: "awaiting_approval or allowed",
      contract: "Approval service / exact-action review"
    },
    {
      title: "The Records Area",
      caption: "Observable steps go into a logbook. Secrets and private scratch notes do not.",
      focus: ["runtime", "records"],
      edges: ["runtime-records"],
      detail: "The Observability pipeline and state/artifact stores capture minimized, redacted events, durable state, and versioned artifacts, not private chain-of-thought.",
      security: "Safe test: a synthetic secret in trace input is redacted before an append-only evidence record is emitted.",
      status: "redacted evidence recorded",
      contract: "Records: state and artifacts / Observability pipeline"
    },
    {
      title: "Answer or Stop",
      caption: "The coordinator returns an answer or explains a safe stop when time runs out or the rules say no, instead of guessing forever.",
      focus: ["runtime", "records", "front-door", "user"],
      edges: ["runtime-records", "runtime-front", "front-user"],
      detail: "The Runtime returns a versioned result or an explicit terminal status. Safe outcomes include completed, completed_with_warnings, needs_clarification, awaiting_approval, budget_exhausted, cancelled, policy_denied, failed_recoverable, and failed_terminal.",
      security: "Safe test: forced exhaustion ends as budget_exhausted with no silent retry loop and no unapproved final report.",
      status: "completed or explicit safe stop",
      contract: "Recorded result → accessible report delivery"
    }
  ];
}());
