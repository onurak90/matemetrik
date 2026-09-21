import os, sys, json, re, random
import fitz

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'yds')
os.makedirs(DATA_DIR, exist_ok=True)

# Helper to read topics
with open(os.path.join(DATA_DIR, 'topics.json'), 'r', encoding='utf-8') as f:
    topics = json.load(f)

print(f"Loaded {len(topics)} topics.")
