from __future__ import annotations

import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MODULES = ROOT / "modules"
RESEARCH_BRIEFS = ROOT / "coordination" / "agents" / "research"
EXPECTED_CHAPTERS = set(range(1, 37))
EXPECTED_RESEARCH_NODES = {f"R{number}" for number in range(1, 10)}
MODULE_PATTERN = re.compile(r"^(\d{2})-")
CHAPTER_LINK_PATTERN = re.compile(
    r"^\s*(?P<number>\d+)\.\s+(?:\*\*)?\[(?:\*\*)?"
    r"(?P<title>[^\]]+?)(?:\*\*)?\]\((?P<link>[^)]+)\)(?:\*\*)?"
    r"(?:\s*[:-]\s*.*)?\s*$"
)
CHAPTER_FILE_PATTERN = re.compile(r"^(\d{2})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$")
CHAPTER_TITLE_PATTERN = re.compile(r"^# Chapter 0*(\d+):\s+\S", re.MULTILINE)
RESEARCH_BRIEF_PATTERN = re.compile(r"^(R\d+)-[a-z0-9]+(?:-[a-z0-9]+)*\.md$")
EXPECTED_H2_SECTIONS = (
    "The problem",
    "Learning objectives",
    "First pass",
    "Picture the idea",
    "Vocabulary",
    "How it works",
    "Engineering deep dive",
    "Build it in Python",
    "Microsoft implementation",
    "How leading teams approach it",
    "Failure lab",
    "Security and safety testing",
    "Evaluation",
    "Production checklist",
    "Review questions",
    "Try it safely",
    "Common misunderstanding",
    "Recap and next step",
    "Design exercise",
    "Hands-on lab",
    "Sources",
)
# Kept as an alias for callers that used the old public constant.
REQUIRED_TEACHING_SECTIONS = tuple(f"## {section}" for section in EXPECTED_H2_SECTIONS)
MINIMUM_CHAPTER_DIAGRAMS = 2
MERMAID_PATTERN = re.compile(r"^```mermaid[ \t]*\n(.*?)^```[ \t]*$", re.MULTILINE | re.DOTALL)
MERMAID_ROLE_PATTERN = re.compile(
    r"^(?:flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|"
    r"erDiagram|journey|gantt|pie|quadrantChart|mindmap|timeline)\b"
)
TAKEAWAY_PATTERN = re.compile(r"^\*\*Takeaway:\*\*\s*(\S.*)$", re.MULTILINE)
WALKTHROUGH_PATTERN = re.compile(
    r"^(?:\*\*)?(?:Step by step|Step-by-step prose alternative|"
    r"Equivalent text description|Ordered prose walkthrough|Text description)"
    r":(?:\*\*)?",
    re.MULTILINE | re.IGNORECASE,
)


def _label(path: Path, root: Path) -> Path:
    try:
        return path.relative_to(root)
    except ValueError:
        return path


def _chapter_block(text: str) -> str | None:
    match = re.search(
        r"^## Chapters[ \t]*$\n(.*?)(?=^## |\Z)", text, re.MULTILINE | re.DOTALL
    )
    return match.group(1) if match else None


def validate_modules(
    modules_root: Path | None = None, repository_root: Path | None = None
) -> list[str]:
    modules_root = modules_root or MODULES
    repository_root = repository_root or ROOT
    errors: list[str] = []
    module_indexes = sorted(modules_root.glob("*/README.md"))

    if len(module_indexes) != 9:
        errors.append(f"Expected 9 module indexes, found {len(module_indexes)}")

    chapter_files = sorted(modules_root.glob("*/chapters/*.md"))
    resolved_files = [path.resolve() for path in chapter_files]
    if len(chapter_files) != 36:
        errors.append(f"Expected exactly 36 chapter files, found {len(chapter_files)}")
    if len(set(resolved_files)) != len(resolved_files):
        errors.append("Chapter files must resolve to 36 unique files")

    chapter_owners: dict[int, Path] = {}
    linked_paths: dict[Path, Path] = {}
    for module_index in module_indexes:
        label = _label(module_index, repository_root)
        module_match = MODULE_PATTERN.match(module_index.parent.name)
        module_number = int(module_match.group(1)) if module_match else None
        if module_number is None:
            errors.append(f"{label}: module directory must start with a two-digit number")

        text = module_index.read_text(encoding="utf-8")
        block = _chapter_block(text)
        if block is None:
            errors.append(f"{label}: missing '## Chapters' section")
            continue

        chapter_lines = [
            line for line in block.splitlines() if re.match(r"^\s*\d+\.", line)
        ]
        for line in chapter_lines:
            match = CHAPTER_LINK_PATTERN.fullmatch(line)
            if match is None:
                errors.append(f"{label}: malformed or missing chapter link: {line.strip()}")
                continue

            chapter = int(match.group("number"))
            link = match.group("link")
            if chapter in chapter_owners:
                errors.append(
                    f"Chapter {chapter} appears in both "
                    f"{_label(chapter_owners[chapter], repository_root)} and {label}"
                )
            else:
                chapter_owners[chapter] = module_index

            if "#" in link or "?" in link:
                errors.append(f"{label}: chapter {chapter} link must name a Markdown file: {link}")
                continue
            linked_path = (module_index.parent / Path(link)).resolve()
            expected_parent = (module_index.parent / "chapters").resolve()
            if linked_path.parent != expected_parent:
                errors.append(
                    f"{label}: chapter {chapter} is not owned by this module's chapters directory"
                )
            previous_owner = linked_paths.get(linked_path)
            if previous_owner is not None:
                errors.append(
                    f"Duplicate chapter link to {_label(linked_path, repository_root)} in "
                    f"{_label(previous_owner, repository_root)} and {label}"
                )
            else:
                linked_paths[linked_path] = module_index

            if not linked_path.is_file():
                errors.append(f"{label}: broken chapter {chapter} link: {link}")
                continue
            filename_match = CHAPTER_FILE_PATTERN.fullmatch(linked_path.name)
            filename_chapter = int(filename_match.group(1)) if filename_match else None
            if filename_match is None:
                errors.append(
                    f"{label}: invalid chapter filename for chapter {chapter}: {linked_path.name}"
                )
            elif filename_chapter != chapter:
                errors.append(
                    f"{label}: declared chapter {chapter} links to filename chapter "
                    f"{filename_chapter}: {linked_path.name}"
                )

            chapter_text = linked_path.read_text(encoding="utf-8")
            title_match = CHAPTER_TITLE_PATTERN.search(chapter_text)
            title_chapter = int(title_match.group(1)) if title_match else None
            if title_match is None:
                errors.append(
                    f"{_label(linked_path, repository_root)}: missing '# Chapter N: Title'"
                )
            elif title_chapter != chapter:
                errors.append(
                    f"{_label(linked_path, repository_root)}: title declares chapter "
                    f"{title_chapter}, but its module owner declares chapter {chapter}"
                )

    actual_chapters = set(chapter_owners)
    missing = sorted(EXPECTED_CHAPTERS - actual_chapters)
    unexpected = sorted(actual_chapters - EXPECTED_CHAPTERS)
    if missing:
        errors.append(f"Missing chapter assignments: {missing}")
    if unexpected:
        errors.append(f"Unexpected chapter assignments: {unexpected}")

    unlinked = sorted(set(resolved_files) - set(linked_paths))
    if unlinked:
        errors.append(
            "Chapter files missing from module indexes: "
            + ", ".join(str(_label(path, repository_root)) for path in unlinked)
        )
    return errors


def validate_required_files(repository_root: Path | None = None) -> list[str]:
    repository_root = repository_root or ROOT
    required = [
        repository_root / "README.md",
        repository_root / "CONTRIBUTING.md",
        repository_root / "coordination/contracts/editorial-contract.md",
        repository_root / "coordination/contracts/chapter-template.md",
        repository_root / "coordination/dependency-graph.yml",
        repository_root / "research/source-ledger.csv",
    ]
    return [
        f"Missing required file: {path.relative_to(repository_root)}"
        for path in required
        if not path.is_file()
    ]


def validate_research_briefs(research_root: Path | None = None) -> list[str]:
    research_root = research_root or RESEARCH_BRIEFS
    actual_nodes: set[str] = set()
    errors: list[str] = []
    candidates = sorted(
        path
        for path in research_root.glob("*.md")
        if path.name != "README.md" and path.name.casefold().startswith("r")
    )
    for path in candidates:
        match = RESEARCH_BRIEF_PATTERN.fullmatch(path.name)
        if match is None:
            errors.append(f"Invalid research brief name: {path.name}")
            continue
        node = match.group(1)
        if node in actual_nodes:
            errors.append(f"Duplicate research brief for {node}: {path.name}")
        actual_nodes.add(node)

    missing = sorted(EXPECTED_RESEARCH_NODES - actual_nodes)
    unexpected = sorted(actual_nodes - EXPECTED_RESEARCH_NODES)
    if missing:
        errors.append(f"Missing research briefs: {missing}")
    if unexpected:
        errors.append(f"Unexpected research briefs: {unexpected}")
    return errors


def _validate_visuals(text: str, label: Path) -> list[str]:
    errors: list[str] = []
    diagrams = list(MERMAID_PATTERN.finditer(text))
    if len(diagrams) < MINIMUM_CHAPTER_DIAGRAMS:
        errors.append(
            f"{label}: expected at least {MINIMUM_CHAPTER_DIAGRAMS} Mermaid diagrams, "
            f"found {len(diagrams)}"
        )

    normalized_diagrams: set[str] = set()
    takeaways: set[str] = set()
    for index, diagram in enumerate(diagrams, start=1):
        body = diagram.group(1).strip()
        normalized = re.sub(r"\s+", " ", body)
        if normalized in normalized_diagrams:
            errors.append(f"{label}: diagram {index} duplicates an earlier Mermaid diagram")
        normalized_diagrams.add(normalized)

        first_line = next((line.strip() for line in body.splitlines() if line.strip()), "")
        if not MERMAID_ROLE_PATTERN.match(first_line):
            errors.append(
                f"{label}: diagram {index} has no clear Mermaid diagram role declaration"
            )

        next_start = diagrams[index].start() if index < len(diagrams) else len(text)
        next_h2 = re.search(r"^## ", text[diagram.end() : next_start], re.MULTILINE)
        if next_h2 is not None:
            next_start = diagram.end() + next_h2.start()
        explanation = text[diagram.end() : next_start]
        takeaway = TAKEAWAY_PATTERN.search(explanation)
        walkthrough = WALKTHROUGH_PATTERN.search(explanation)
        if takeaway is None:
            errors.append(f"{label}: diagram {index} is missing a non-empty '**Takeaway:**'")
        else:
            normalized_takeaway = re.sub(r"\s+", " ", takeaway.group(1)).casefold()
            if normalized_takeaway in takeaways:
                errors.append(f"{label}: diagram {index} duplicates an earlier takeaway")
            takeaways.add(normalized_takeaway)
        if walkthrough is None or not explanation[walkthrough.end() :].strip():
            errors.append(
                f"{label}: diagram {index} is missing a non-empty text-walkthrough "
                "marker and description"
            )
        if (
            takeaway is not None
            and walkthrough is not None
            and walkthrough.start() < takeaway.start()
        ):
            errors.append(
                f"{label}: diagram {index} walkthrough must follow its takeaway"
            )
    return errors


def validate_chapter_content(
    chapter_paths: list[Path] | None = None,
    modules_root: Path | None = None,
    repository_root: Path | None = None,
) -> list[str]:
    modules_root = modules_root or MODULES
    repository_root = repository_root or ROOT
    paths = chapter_paths
    if paths is None:
        paths = sorted(modules_root.glob("*/chapters/*.md"))

    errors: list[str] = []
    for path in paths:
        text = path.read_text(encoding="utf-8")
        label = _label(path, repository_root)
        actual_sections = tuple(re.findall(r"^## (.+?)[ \t]*$", text, re.MULTILINE))
        if actual_sections != EXPECTED_H2_SECTIONS:
            errors.append(
                f"{label}: H2 chapter contract mismatch; expected "
                f"{list(EXPECTED_H2_SECTIONS)}, found {list(actual_sections)}"
            )
        errors.extend(_validate_visuals(text, label))
    return errors


def main() -> int:
    errors = (
        validate_required_files()
        + validate_modules()
        + validate_research_briefs()
        + validate_chapter_content()
    )
    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("Repository contract valid: 9 modules, 36 chapters, and 9 research briefs.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
