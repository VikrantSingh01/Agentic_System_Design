from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
VALIDATOR_PATH = ROOT / "scripts" / "validate_repository.py"
SPEC = importlib.util.spec_from_file_location("validate_repository", VALIDATOR_PATH)
assert SPEC is not None and SPEC.loader is not None
VALIDATOR = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(VALIDATOR)


def valid_chapter(number: int, title: str = "Test Chapter") -> str:
    sections: list[str] = []
    for section in VALIDATOR.EXPECTED_H2_SECTIONS:
        body = "Content"
        if section == "Picture the idea":
            body = """
```mermaid
flowchart LR
    A[First role] --> B[Result]
```

**Takeaway:** The first diagram explains the concept.

**Step by step:** Read the concept from A to B.

```mermaid
sequenceDiagram
    A->>B: Second role
```

**Takeaway:** The second diagram explains the process.

**Step by step:** First A sends the message, and then B receives it.
""".strip()
        sections.append(f"## {section}\n\n{body}")
    return (
        f"# Chapter {number:02d}: {title}\n\n"
        f"> Owner: Chapter {number:02d} author\n\n"
        + "\n\n".join(sections)
        + "\n"
    )


class RepositoryContractTests(unittest.TestCase):
    def test_required_files_exist(self) -> None:
        self.assertEqual([], VALIDATOR.validate_required_files())

    def test_all_chapters_have_one_module_owner(self) -> None:
        self.assertEqual([], VALIDATOR.validate_modules())

    def test_all_research_nodes_have_one_brief(self) -> None:
        self.assertEqual([], VALIDATOR.validate_research_briefs())

    def test_valid_complete_chapter_passes(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            chapter = Path(directory) / "01-test.md"
            chapter.write_text(valid_chapter(1), encoding="utf-8")
            self.assertEqual([], VALIDATOR.validate_chapter_content([chapter]))

    def test_h2_contract_rejects_missing_reordered_duplicate_and_extra_sections(self) -> None:
        mutations = {
            "missing": list(VALIDATOR.EXPECTED_H2_SECTIONS[:-1]),
            "reordered": [
                VALIDATOR.EXPECTED_H2_SECTIONS[1],
                VALIDATOR.EXPECTED_H2_SECTIONS[0],
                *VALIDATOR.EXPECTED_H2_SECTIONS[2:],
            ],
            "duplicate": [
                VALIDATOR.EXPECTED_H2_SECTIONS[0],
                *VALIDATOR.EXPECTED_H2_SECTIONS,
            ],
            "extra": [*VALIDATOR.EXPECTED_H2_SECTIONS, "Appendix"],
        }
        with tempfile.TemporaryDirectory() as directory:
            for name, headings in mutations.items():
                chapter = Path(directory) / f"{name}.md"
                text = valid_chapter(1)
                start = text.index("## ")
                visual = text[text.index("## Picture the idea") :]
                picture_end = visual.index("\n## Vocabulary")
                picture_body = visual[:picture_end]
                bodies = {
                    heading: picture_body.split("\n", 1)[1]
                    if heading == "Picture the idea"
                    else "\n\nContent\n"
                    for heading in set(headings)
                }
                chapter.write_text(
                    text[:start]
                    + "\n".join(f"## {heading}{bodies[heading]}" for heading in headings),
                    encoding="utf-8",
                )
                errors = VALIDATOR.validate_chapter_content([chapter])
                self.assertTrue(
                    any("H2 chapter contract mismatch" in error for error in errors), name
                )

    def test_visual_contract_rejects_duplicate_and_unexplained_diagrams(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            chapter = Path(directory) / "chapter.md"
            text = valid_chapter(1)
            second = """```mermaid
sequenceDiagram
    A->>B: Second role
```"""
            first = """```mermaid
flowchart LR
    A[First role] --> B[Result]
```"""
            text = text.replace(second, first).replace(
                "**Step by step:** First A sends the message, and then B receives it.",
                "",
            )
            text = text.replace(
                "**Takeaway:** The second diagram explains the process.",
                "**Takeaway:** The first diagram explains the concept.",
            )
            chapter.write_text(text, encoding="utf-8")
            errors = VALIDATOR.validate_chapter_content([chapter])
            self.assertTrue(any("duplicates an earlier Mermaid" in error for error in errors))
            self.assertTrue(any("duplicates an earlier takeaway" in error for error in errors))
            self.assertTrue(any("text-walkthrough" in error for error in errors))

    def test_visual_contract_accepts_supported_text_walkthrough_markers(self) -> None:
        marker_variants = (
            "**Step-by-step prose alternative:**",
            "**Equivalent text description:**",
            "**Ordered prose walkthrough:**",
            "**Text description:**",
            "Step by step:",
        )
        with tempfile.TemporaryDirectory() as directory:
            for index, marker in enumerate(marker_variants):
                chapter = Path(directory) / f"chapter-{index}.md"
                chapter.write_text(
                    valid_chapter(1).replace(
                        "**Step by step:** Read the concept from A to B.",
                        f"{marker}\n\n1. Read the concept from A to B.",
                    ),
                    encoding="utf-8",
                )
                self.assertEqual(
                    [], VALIDATOR.validate_chapter_content([chapter]), marker
                )

    def test_visual_contract_rejects_missing_role_declaration(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            chapter = Path(directory) / "chapter.md"
            chapter.write_text(
                valid_chapter(1).replace("flowchart LR", "A --> B", 1),
                encoding="utf-8",
            )
            errors = VALIDATOR.validate_chapter_content([chapter])
            self.assertTrue(any("role declaration" in error for error in errors))

    def _write_module_tree(self, root: Path) -> None:
        modules = root / "modules"
        for module in range(1, 10):
            module_dir = modules / f"{module:02d}-module"
            chapters_dir = module_dir / "chapters"
            chapters_dir.mkdir(parents=True)
            start = (module - 1) * 4 + 1
            lines = ["# Module", "", "## Chapters", ""]
            for number in range(start, start + 4):
                filename = f"{number:02d}-chapter.md"
                (chapters_dir / filename).write_text(
                    valid_chapter(number), encoding="utf-8"
                )
                lines.append(
                    f"{number}. [**Test Chapter**](chapters/{filename})"
                )
            (module_dir / "README.md").write_text("\n".join(lines), encoding="utf-8")

    def test_temp_module_tree_passes(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self._write_module_tree(root)
            self.assertEqual(
                [],
                VALIDATOR.validate_modules(root / "modules", repository_root=root),
            )

    def test_module_validation_rejects_broken_duplicate_and_unlinked_chapters(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self._write_module_tree(root)
            readme = root / "modules" / "01-module" / "README.md"
            text = readme.read_text(encoding="utf-8")
            text = text.replace(
                "2. [**Test Chapter**](chapters/02-chapter.md)",
                "2. [**Test Chapter**](chapters/01-chapter.md)",
            ).replace(
                "3. [**Test Chapter**](chapters/03-chapter.md)",
                "3. [**Test Chapter**](chapters/missing.md)",
            )
            readme.write_text(text, encoding="utf-8")
            errors = VALIDATOR.validate_modules(root / "modules", repository_root=root)
            self.assertTrue(any("Duplicate chapter link" in error for error in errors))
            self.assertTrue(any("broken chapter 3 link" in error for error in errors))
            self.assertTrue(any("missing from module indexes" in error for error in errors))

    def test_module_validation_rejects_number_mismatches_and_malformed_link(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self._write_module_tree(root)
            readme = root / "modules" / "01-module" / "README.md"
            text = readme.read_text(encoding="utf-8")
            text = text.replace(
                "1. [**Test Chapter**](chapters/01-chapter.md)",
                "1. **Test Chapter**",
            ).replace(
                "2. [**Test Chapter**](chapters/02-chapter.md)",
                "20. [**Test Chapter**](chapters/02-chapter.md)",
            )
            readme.write_text(text, encoding="utf-8")
            chapter = root / "modules" / "01-module" / "chapters" / "04-chapter.md"
            chapter.write_text(valid_chapter(14), encoding="utf-8")
            errors = VALIDATOR.validate_modules(root / "modules", repository_root=root)
            self.assertTrue(any("malformed or missing chapter link" in error for error in errors))
            self.assertTrue(any("filename chapter 2" in error for error in errors))
            self.assertTrue(any("title declares chapter 14" in error for error in errors))

    def test_module_validation_rejects_em_dash_separator(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            self._write_module_tree(root)
            readme = root / "modules" / "01-module" / "README.md"
            text = readme.read_text(encoding="utf-8").replace(
                "1. [**Test Chapter**](chapters/01-chapter.md)",
                "1. [**Test Chapter**](chapters/01-chapter.md) \N{EM DASH} description",
            )
            readme.write_text(text, encoding="utf-8")
            errors = VALIDATOR.validate_modules(root / "modules", repository_root=root)
            self.assertTrue(any("malformed or missing chapter link" in error for error in errors))

    def test_research_validation_strictly_enumerates_r_markdown_candidates(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for number in range(1, 10):
                (root / f"R{number}-brief.md").write_text("", encoding="utf-8")
            (root / "README.md").write_text("", encoding="utf-8")
            self.assertEqual([], VALIDATOR.validate_research_briefs(root))

            (root / "R10-extra.md").write_text("", encoding="utf-8")
            (root / "R-bad.md").write_text("", encoding="utf-8")
            (root / "r2-lowercase.md").write_text("", encoding="utf-8")
            (root / "R1-duplicate.md").write_text("", encoding="utf-8")
            errors = VALIDATOR.validate_research_briefs(root)
            self.assertTrue(any("Unexpected research briefs: ['R10']" in error for error in errors))
            self.assertTrue(any("Invalid research brief name: R-bad.md" in error for error in errors))
            self.assertTrue(any("Invalid research brief name: r2-lowercase.md" in error for error in errors))
            self.assertTrue(any("Duplicate research brief for R1" in error for error in errors))


if __name__ == "__main__":
    unittest.main()
