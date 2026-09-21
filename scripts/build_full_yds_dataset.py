import json, os, sys

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data', 'yds')
os.makedirs(DATA_DIR, exist_ok=True)

print("Starting YDS Question Bank Dataset Generator...")
