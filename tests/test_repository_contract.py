from __future__ import annotations

import importlib.util
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


if __name__ == "__main__":
    unittest.main()