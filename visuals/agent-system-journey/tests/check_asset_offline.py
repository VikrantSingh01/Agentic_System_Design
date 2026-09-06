"""Dependency-free structural and offline validator for the journey asset."""

from __future__ import annotations

import json
import re
import shutil
import subprocess
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[1]
REQUIRED = ("index.html", "styles.css", "script.js", "scenes.js", "README.md", "transcript.md")
REFERENCE_ATTRIBUTES = {
    "src", "href", "poster", "action", "formaction", "data", "cite", "background", "xlink:href",
}
JS_STRING = r'"(?:\\.|[^"\\])*"'


def require(condition: bool, message: str) -> None:
    if not condition:
        raise AssertionError(message)


class AssetHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.ids: list[str] = []
        self.node_accessibility: dict[str, set[str]] = {}
        self.node_stack: list[str] = []
        self.edge_ids: list[str] = []
        self.tags: list[str] = []
        self.inline_styles: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {name.lower(): value or "" for name, value in attrs}
        self.tags.append(tag.lower())
        element_id = values.get("id")
        if element_id:
            self.ids.append(element_id)
            if element_id.startswith("edge-"):
                self.edge_ids.append(element_id.removeprefix("edge-"))
        for name in REFERENCE_ATTRIBUTES:
            if values.get(name):
                self.references.append((name, values[name]))
        if values.get("style"):
            self.inline_styles.append(values["style"])
        if tag.lower() == "meta" and (values.get("http-equiv") or "").lower() == "refresh":
            match = re.search(r"\burl\s*=\s*(.+)$", values.get("content", ""), re.IGNORECASE)
            if match:
                self.references.append(("meta refresh", match.group(1).strip("'\" ")))
        if values.get("srcset"):
            for candidate in values["srcset"].split(","):
                reference = candidate.strip().split(maxsplit=1)[0]
                if reference:
                    self.references.append(("srcset", reference))
        if tag.lower() == "g" and element_id and element_id.startswith("node-"):
            self.node_stack.append(element_id.removeprefix("node-"))
            self.node_accessibility[self.node_stack[-1]] = set()
        elif self.node_stack and tag.lower() in {"title", "desc"}:
            self.node_accessibility[self.node_stack[-1]].add(tag.lower())

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() == "g" and self.node_stack:
            self.node_stack.pop()


def check_local_reference(reference: str, source: str) -> None:
    reference = reference.strip()
    require(reference, f"empty reference in {source}")
    require(not reference.startswith("//"), f"protocol-relative reference in {source}: {reference}")
    parsed = urlsplit(reference)
    require(not parsed.scheme and not parsed.netloc, f"external scheme/reference in {source}: {reference}")
    if not parsed.path:
        return
    local_path = unquote(parsed.path.replace("/", "\\"))
    require(not Path(local_path).is_absolute(), f"absolute reference in {source}: {reference}")
    target = (ROOT / local_path).resolve()
    require(target.is_relative_to(ROOT), f"reference leaves asset directory in {source}: {reference}")
    require(target.exists(), f"missing local reference from {source}: {reference}")


def parse_scenes(source: str) -> list[dict[str, object]]:
    object_pattern = re.compile(
        rf"\{{\s*title:\s*(?P<title>{JS_STRING}),\s*"
        rf"caption:\s*(?P<caption>{JS_STRING}),\s*"
        rf"focus:\s*\[(?P<focus>.*?)\],\s*"
        rf"edges:\s*\[(?P<edges>.*?)\],\s*"
        rf"detail:\s*{JS_STRING},\s*security:\s*{JS_STRING},\s*"
        rf"status:\s*{JS_STRING},\s*contract:\s*{JS_STRING}\s*\}}",
        re.DOTALL,
    )

    def strings(value: str) -> list[str]:
        return [json.loads(item) for item in re.findall(JS_STRING, value)]

    return [
        {
            "title": json.loads(match.group("title")),
            "caption": json.loads(match.group("caption")),
            "focus": strings(match.group("focus")),
            "edges": strings(match.group("edges")),
        }
        for match in object_pattern.finditer(source)
    ]


def parse_transcript(source: str) -> list[tuple[int, str, str]]:
    entries = re.findall(
        r"^## ([0-9]+)\. (.+?)\r?\n\r?\n\*\*Caption:\*\* (.+?)\r?$",
        source,
        re.MULTILINE,
    )
    return [(int(number), title, caption) for number, title, caption in entries]


def check_javascript_syntax(sources: dict[str, str]) -> bool:
    node = shutil.which("node")
    if not node:
        return False
    for name in ("script.js", "scenes.js"):
        result = subprocess.run(
            [node, "--check", str(ROOT / name)],
            capture_output=True,
            text=True,
            check=False,
        )
        require(result.returncode == 0, f"{name} syntax error:\n{result.stderr.strip()}")
    return True


def main() -> int:
    for name in REQUIRED:
        require((ROOT / name).is_file(), f"missing required file: {name}")
    sources = {name: (ROOT / name).read_text(encoding="utf-8") for name in REQUIRED}

    parser = AssetHTMLParser()
    parser.feed(sources["index.html"])
    parser.close()
    require(not parser.node_stack, "unclosed SVG node group")
    require(len(parser.ids) == len(set(parser.ids)), "duplicate HTML/SVG id")
    for attribute, reference in parser.references:
        check_local_reference(reference, f"HTML {attribute}")
    for forbidden_tag in {"iframe", "object", "embed"}:
        require(forbidden_tag not in parser.tags, f"forbidden embedded element: {forbidden_tag}")

    css_sources = [sources["styles.css"], *parser.inline_styles]
    for css_source in css_sources:
        css_references = re.findall(r"url\(\s*(['\"]?)(.*?)\1\s*\)", css_source, re.IGNORECASE)
        for _, reference in css_references:
            check_local_reference(reference, "CSS url()")
    require(not re.search(r"@import\b", sources["styles.css"], re.IGNORECASE), "CSS @import is forbidden")

    javascript = "\n".join((sources["script.js"], sources["scenes.js"]))
    network_primitives = {
        "fetch": r"\bfetch\s*\(",
        "XMLHttpRequest": r"\bXMLHttpRequest\b",
        "WebSocket": r"\bWebSocket\s*\(",
        "EventSource": r"\bEventSource\s*\(",
        "sendBeacon": r"\bsendBeacon\s*\(",
        "dynamic import": r"\bimport\s*\(",
    }
    for label, pattern in network_primitives.items():
        require(not re.search(pattern, javascript), f"JavaScript network primitive is forbidden: {label}")
    require(
        not re.search(r"(?:[a-z][a-z0-9+.-]*:)?//", javascript, re.IGNORECASE),
        "external or protocol-relative JavaScript URL",
    )

    scenes = parse_scenes(sources["scenes.js"])
    transcript = parse_transcript(sources["transcript.md"])
    require(len(scenes) == 12, f"expected 12 structured scenes, found {len(scenes)}")
    require(len(transcript) == 12, f"expected 12 structured transcript entries, found {len(transcript)}")
    require([entry[0] for entry in transcript] == list(range(1, 13)), "transcript scene numbers are not 1–12")
    require(
        [(scene["title"], scene["caption"]) for scene in scenes]
        == [(title, caption) for _, title, caption in transcript],
        "all transcript titles and captions must match scenes.js exactly",
    )

    node_ids = set(parser.node_accessibility)
    edge_ids = set(parser.edge_ids)
    require(
        all(names == {"title", "desc"} for names in parser.node_accessibility.values()),
        "each SVG node must contain title and desc",
    )
    for number, scene in enumerate(scenes, 1):
        missing_nodes = set(scene["focus"]) - node_ids
        missing_edges = set(scene["edges"]) - edge_ids
        require(not missing_nodes, f"scene {number} references unknown nodes: {sorted(missing_nodes)}")
        require(not missing_edges, f"scene {number} references unknown edges: {sorted(missing_edges)}")

    require(
        {"admission", "badge-check", "workload-id", "state", "observability"} <= node_ids,
        "admission, identity, state, and observability nodes must remain distinct",
    )
    require(
        {
            "front-admission", "admission-badge", "workload-runtime",
            "retrieval-outside", "outside-retrieval",
            "runtime-specialist", "specialist-runtime",
            "runtime-state", "state-runtime", "runtime-observability",
        } <= edge_ids,
        "required identity, source, state, evidence, or specialist edges are missing",
    )
    require("toolbox-specialist" not in edge_ids and "specialist-toolbox" not in edge_ids,
            "specialist delegation must not be modeled as a tool edge")

    html_and_css = (sources["index.html"] + "\n" + sources["styles.css"]).lower()
    for control_id in (
        "previous", "play", "next", "replay", "stop", "scene-select", "speed",
        "captions-toggle", "motion-toggle", "contrast-toggle",
    ):
        require(control_id in parser.ids, f"missing control: {control_id}")
    for marker in (
        'aria-live="polite"', 'aria-current', 'aria-labelledby="svg-title svg-desc"',
        "prefers-reduced-motion", "forced-colors", ":focus-visible",
    ):
        require(marker in html_and_css + "\n" + javascript.lower(), f"missing accessibility marker: {marker}")

    lower = "\n".join(sources.values()).lower()
    for term in (
        "model gateway", "proposal only", "policy_denied", "budget_exhausted",
        "private chain-of-thought", "anything not explicitly allowed is denied",
        "admission ticket boundary", "own bounded policy", "workload identity",
        "durable workflow", "control plane", "data plane", "release gates",
        "reauthorize", "authoritative state",
    ):
        require(term in lower, f"missing architecture/security term: {term}")
    require(
        re.search(r'replay\.addEventListener\("click",\s*resetAndPlay\)', sources["script.js"]) is not None
        and re.search(r'event\.key\.toLowerCase\(\) === "r"[\s\S]+?resetAndPlay\(\)', sources["script.js"]) is not None,
        "Replay button and R key must call the same resetAndPlay function",
    )

    node_checked = check_javascript_syntax(sources)
    print("PASS: parsed HTML/CSS references are local and external schemes are absent")
    print("PASS: JavaScript network primitives are absent")
    print("PASS: all 12 structured transcript titles/captions match scene records")
    print("PASS: scene node/edge references and frozen topology are valid")
    print("PASS: controls, shared replay behavior, accessibility, and architecture labels are present")
    print("PASS: node --check validated script.js and scenes.js" if node_checked
          else "SKIP: node is unavailable; JavaScript syntax check not run")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except AssertionError as error:
        print(f"FAIL: {error}", file=sys.stderr)
        raise SystemExit(1)
