import json, os, sys

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'yds')
os.makedirs(DATA_DIR, exist_ok=True)

print("Building Part 1: Kelime Bilgisi, Gramer, Cloze Test, Cümle Tamamlama...")
