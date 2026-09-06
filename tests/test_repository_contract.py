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


class RepositoryContractTests(unittest.TestCase):
    def test_required_files_exist(self) -> None:
        self.assertEqual([], VALIDATOR.validate_required_files())

    def test_all_chapters_have_one_module_owner(self) -> None:
        self.assertEqual([], VALIDATOR.validate_modules())

    def test_all_research_nodes_have_one_brief(self) -> None:
        self.assertEqual([], VALIDATOR.validate_research_briefs())

    def test_chapters_require_beginner_teaching_sections_and_diagram(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            chapter = Path(directory) / "chapter.md"
            chapter.write_text("# Chapter\n", encoding="utf-8")

            errors = VALIDATOR.validate_chapter_content([chapter])

        self.assertEqual(len(VALIDATOR.REQUIRED_TEACHING_SECTIONS) + 1, len(errors))

    def test_valid_beginner_chapter_passes(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            chapter = Path(directory) / "chapter.md"
            sections = "\n\n".join(VALIDATOR.REQUIRED_TEACHING_SECTIONS)
            diagrams = "\n\n".join(
                "```mermaid\ngraph LR\nA --> B\n```"
                for _ in range(VALIDATOR.MINIMUM_CHAPTER_DIAGRAMS)
            )
            chapter.write_text(f"# Chapter\n\n{sections}\n\n{diagrams}\n", encoding="utf-8")

            self.assertEqual([], VALIDATOR.validate_chapter_content([chapter]))


if __name__ == "__main__":
    unittest.main()