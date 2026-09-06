from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULES = ROOT / "modules"
RESEARCH_BRIEFS = ROOT / "coordination" / "agents" / "research"
EXPECTED_CHAPTERS = set(range(1, 37))
EXPECTED_RESEARCH_NODES = {f"R{number}" for number in range(1, 10)}
CHAPTER_PATTERN = re.compile(r"^\s*(\d+)\. \*\*", re.MULTILINE)
RESEARCH_BRIEF_PATTERN = re.compile(r"^(R\d+)-.+\.md$")


def validate_modules() -> list[str]:
    errors: list[str] = []
    module_indexes = sorted(path for path in MODULES.glob("*/README.md"))

    if len(module_indexes) != 9:
        errors.append(f"Expected 9 module indexes, found {len(module_indexes)}")

    chapter_owners: dict[int, Path] = {}
    for module_index in module_indexes:
        text = module_index.read_text(encoding="utf-8")
        for match in CHAPTER_PATTERN.finditer(text):
            chapter = int(match.group(1))
            if chapter in chapter_owners:
                errors.append(
                    f"Chapter {chapter} appears in both {chapter_owners[chapter]} and {module_index}"
                )
            chapter_owners[chapter] = module_index

    actual_chapters = set(chapter_owners)
    missing = sorted(EXPECTED_CHAPTERS - actual_chapters)
    unexpected = sorted(actual_chapters - EXPECTED_CHAPTERS)
    if missing:
        errors.append(f"Missing chapter assignments: {missing}")
    if unexpected:
        errors.append(f"Unexpected chapter assignments: {unexpected}")

    return errors


def validate_required_files() -> list[str]:
    required = [
        ROOT / "README.md",
        ROOT / "CONTRIBUTING.md",
        ROOT / "coordination/contracts/editorial-contract.md",
        ROOT / "coordination/contracts/chapter-template.md",
        ROOT / "coordination/dependency-graph.yml",
        ROOT / "research/source-ledger.csv",
    ]
    return [f"Missing required file: {path.relative_to(ROOT)}" for path in required if not path.is_file()]


def validate_research_briefs() -> list[str]:
    actual_nodes: set[str] = set()
    errors: list[str] = []
    for path in RESEARCH_BRIEFS.glob("R[0-9]-*.md"):
        match = RESEARCH_BRIEF_PATTERN.match(path.name)
        if match is None:
            errors.append(f"Invalid research brief name: {path.name}")
            continue
        node = match.group(1)
        if node in actual_nodes:
            errors.append(f"Duplicate research brief for {node}")
        actual_nodes.add(node)

    missing = sorted(EXPECTED_RESEARCH_NODES - actual_nodes)
    unexpected = sorted(actual_nodes - EXPECTED_RESEARCH_NODES)
    if missing:
        errors.append(f"Missing research briefs: {missing}")
    if unexpected:
        errors.append(f"Unexpected research briefs: {unexpected}")
    return errors


def main() -> int:
    errors = validate_required_files() + validate_modules() + validate_research_briefs()
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Repository contract valid: 9 modules, 36 chapters, and 9 research briefs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())