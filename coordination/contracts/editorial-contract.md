# Editorial Contract

Status: Frozen for Stage 1  
Freeze date: 2026-09-05

## Reader contract

The reader needs no machine-learning background. Basic familiarity with variables, functions, command-line tools, and HTTP is helpful but not required for the conceptual path.

Every chapter must provide:

1. An opening problem that motivates the topic.
2. Measurable learning objectives.
3. A first-pass explanation using concrete language and examples.
4. An engineering deep dive covering mechanisms and tradeoffs.
5. At least one architecture or sequence diagram when behavior spans components.
6. Vendor-neutral pseudocode or Python before framework-specific code.
7. A Microsoft mapping using supported Python SDKs where applicable.
8. A failure analysis explaining how the design breaks.
9. Evaluation criteria and production considerations.
10. Review questions, a design exercise, and a hands-on lab or simulation.
11. Primary sources with volatile claims clearly identified.

## Technical contract

- Python 3.11 is the minimum runtime.
- Labs must run offline with deterministic model and tool doubles.
- Live-provider tests are optional, explicitly enabled, and budget capped.
- Domain interfaces remain independent of agent frameworks and cloud providers.
- Consequential side effects require explicit authorization and idempotency controls.
- Multi-agent designs must be compared with a simpler workflow or single-agent baseline.
- Private chain-of-thought is never a required interface, log, or evaluation artifact.

## Terminology

- **Agent:** software that uses a model to choose actions in pursuit of a goal within explicit controls.
- **Workflow:** a predetermined control flow that may contain model calls.
- **Tool:** a typed capability through which an agent reads or changes an environment.
- **Runtime:** the control loop that manages state, model calls, tools, budgets, and termination.
- **Evaluation:** a repeatable measurement of outcomes, trajectories, safety, latency, or cost.
- **Production ready:** evaluated, secure, observable, recoverable, operable, and economically bounded.

Changes to this contract require an accepted request under `coordination/requests/` and invalidate affected downstream briefs.