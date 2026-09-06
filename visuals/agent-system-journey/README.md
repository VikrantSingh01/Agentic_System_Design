# Agent System Journey

A no-build, offline companion visual for the frozen Chapter 28 architecture story. Open `index.html` directly; it works under `file://` in current desktop browsers. No server, package install, network, font, CDN, tracker, storage, or build step is used.

## Contents

- `index.html`: semantic controls and accessible inline SVG
- `styles.css`: responsive layout, visible focus, contrast, forced-colors, and motion preferences
- `scenes.js`: twelve local scene records; no fetched JSON
- `script.js`: playback, scene state, ARIA updates, and keyboard controls
- `transcript.md`: one-to-one caption transcript and equivalent explanation
- `tests/check_asset_offline.py`: standard-library structural/offline validator

## Architecture and traceability

The visual preserves Chapter 28’s frozen path: **Researcher → Front door → admission/ticket boundary → user delegation check → Coordinator Runtime → bounded services / Records**. It presents this as a request trace, not a deployment topology; retrieval, tools, approval, and delegation are conditional branches. Delegated user identity remains distinct from workload identity. The Runtime state machine operates on a separate durable workflow substrate. Retrieval reauthorizes on source fetch. Admission authorization and per-action policy are distinct checks.

Model, retrieval, and tool gateways remain ordinary bounded services. Specialist delegation is a Runtime-coordinator handoff to a separate specialist runtime with its own bounded policy and allowlisted tools, not a tool call, a nested drawing under the toolbox, or an expansion of authority. Authoritative state/artifact stores are separate from the redacted Observability pipeline. A secondary production map separates the data plane from governance, evaluation/release, and deployment in the control plane; evaluation is not depicted as inline authorization.

Scenes 1–12 trace the dossier’s full storyboard. Security notes illustrate deny-by-default, untrusted retrieval/model/external data, bounded delegation and tools, payload-bound approval, redaction, and budget exhaustion. They do not replace a chapter’s defensive offline test.

## Accessibility and controls

The asset starts paused. Controls are native HTML. Space plays/pauses when focus is not on a control; arrows step; Home/End jumps to the first/last scene; R replays; Escape stops and returns to scene 1; digits 1–9 jump to their scene and 0 jumps to scene 10. The selector reaches every scene. Focus is never moved on scene changes.

Captions update in a polite live region. The current scene has visible text and `aria-current`. Every meaningful SVG group has a title, description, and keyboard-focusable accessible name. Text labels accompany all colors, shapes, statuses, trust, decisions, and warnings.

OS reduced-motion disables animation and auto-advance. “Disable motion” offers the same manual safe mode. Light and dark color schemes, high contrast, `prefers-contrast`, forced colors, reflow, and visible focus are supported. At narrow widths, text reflows while the detailed SVG remains legible in its own horizontal viewport; the transcript is the no-two-dimensional-scroll equivalent.

Screen-reader behavior still requires a human NVDA or VoiceOver pass before publication.

## Validation

From the repository root:

```text
python visuals\agent-system-journey\tests\check_asset_offline.py
```

The validator parses HTML, checks CSS URLs and every local reference, rejects external schemes and JavaScript network primitives, compares all 12 structured transcript titles/captions, validates every scene node/edge reference, checks controls and accessibility markers, and runs `node --check` when Node.js is available.

## Analogy limit

The help center is a teaching picture, not a claim that software components are people. The model predicts/proposes only; it never understands, owns policy, or executes. Runtime context is explicit rather than natural memory. Approval is payload-bound and expiring. Specialist workers do not have independent judgment. Authority cannot increase at runtime.

## License

This asset is part of the repository and follows the repository’s license.
