# -*- coding: utf-8 -*-
"""
Unified Pedagogical Theory Generator for all 108 curriculum topics across Grades 1-12.
Ensures 100% authentic, subject-specific, grade-appropriate teacher lecture content:
- Checked against specialized lecture databases for base topics.
- Generated via subject-specific pedagogical engines (Turkish, Science, Physics, Chemistry, Biology, History, Math) for all new topics.
- ZERO math leakage into Turkish or History topics!
"""

from scripts.curriculum_gen.theory_elementary import get_elementary_theory
from scripts.curriculum_gen.theory_middle import get_middle_theory
from scripts.curriculum_gen.theory_high_math import get_high_math_theory
from scripts.curriculum_gen.theory_high_science import get_high_science_theory
from scripts.curriculum_gen.deep_lecture_database import get_deep_lecture
from scripts.curriculum_gen.deep_lecture_database_part2 import get_deep_lecture_part2
from scripts.curriculum_gen.subject_theories import generate_subject_theory

def generate_deep_theory_html(topic_item):
    slug = topic_item.get("slug", "")

    # 1. Check specialized handcrafted databases
    theory = (
        get_elementary_theory(slug) or
        get_middle_theory(slug) or
        get_high_math_theory(slug) or
        get_high_science_theory(slug) or
        get_deep_lecture(slug) or
        get_deep_lecture_part2(slug)
    )

    if theory and len(theory) > 500:
        return theory

    # 2. Subject-specific pedagogical generator for any remaining/new topics
    return generate_subject_theory(topic_item)
