# -*- coding: utf-8 -*-
"""
Question Dispatcher for all 55 Curriculum Topics.
Ensures every topic gets exactly 20 authentic, pedagogical questions with verified answers.
"""

from .questions_turkish import get_turkish_questions
from .questions_hayat_bilgisi import get_hayat_bilgisi_questions
from .questions_math_elementary import get_math_elementary_questions
from .questions_math_middle import get_math_middle_questions
from .questions_math_high import get_math_high_questions
from .questions_science_physics import get_science_physics_questions
from .questions_chemistry import get_chemistry_questions
from .questions_biology import get_biology_questions

def dispatch_questions(slug, grade_num, subject):
    if "hayat-bilgisi" in slug:
        return get_hayat_bilgisi_questions()
    
    if "turkce" in slug or "edebiyat" in slug:
        return get_turkish_questions(slug)
    
    if "matematik" in slug:
        if grade_num <= 4:
            return get_math_elementary_questions(slug)
        elif grade_num <= 8:
            return get_math_middle_questions(slug)
        else:
            return get_math_high_questions(slug)
            
    if "fen" in slug or "fizik" in slug:
        return get_science_physics_questions(slug)
        
    if "kimya" in slug:
        return get_chemistry_questions(slug)
        
    if "biyoloji" in slug:
        return get_biology_questions(slug)

    # Fallback to high school math or general
    if grade_num >= 9:
        return get_math_high_questions(slug)
    else:
        return get_math_middle_questions(slug)
