#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
sanitize_pdf_filenames.py
Normalizes all PDF filenames in public/uploads/etkinlikler/ to clean, URL-safe, Linux-safe names
and updates all matching download links in data/matemetrik.db.
"""

import os
import re
import sqlite3

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
UPLOADS_DIR = os.path.join(BASE_DIR, 'public', 'uploads', 'etkinlikler')
DB_PATH = os.path.join(BASE_DIR, 'data', 'matemetrik.db')

def normalize_name(old_name: str) -> str:
    name = old_name
    name = re.sub(r'\.docx\.pdf$', '.pdf', name, flags=re.IGNORECASE)
    name = re.sub(r'\.pdf\.pdf$', '.pdf', name, flags=re.IGNORECASE)
    
    stem, ext = os.path.splitext(name)
    if not ext.lower() == '.pdf':
        stem = name
        ext = '.pdf'
    
    stem = stem.replace('.-', '-')
    stem = stem.replace('-.', '-')
    stem = stem.replace('_-', '-')
    stem = stem.replace('-_', '-')
    stem = stem.replace('_', '-')
    stem = stem.replace('.', '-')
    stem = re.sub(r'[^a-zA-Z0-9\-]', '-', stem)
    stem = re.sub(r'-+', '-', stem).strip('-').lower()
    
    return f"{stem}{ext.lower()}"

def main():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    renamed_count = 0
    db_updated_count = 0

    all_files = []
    for root, dirs, files in os.walk(UPLOADS_DIR):
        for fname in files:
            if fname.lower().endswith('.pdf'):
                all_files.append((root, fname))

    for root, fname in all_files:
        old_path = os.path.join(root, fname)
        if not os.path.exists(old_path):
            continue

        clean_name = normalize_name(fname)
        if clean_name != fname:
            new_path = os.path.join(root, clean_name)
            
            if os.path.exists(new_path) and old_path != new_path:
                try:
                    os.remove(old_path)
                except:
                    pass
            else:
                try:
                    os.rename(old_path, new_path)
                except Exception as e:
                    print(f"Error renaming {fname} -> {clean_name}: {e}")
                    continue
            
            renamed_count += 1
            
            # Update DB references
            cursor.execute("""
                UPDATE posts
                SET content = replace(content, ?, ?)
                WHERE content LIKE ?
            """, (fname, clean_name, f"%{fname}%"))
            
            if cursor.rowcount > 0:
                db_updated_count += cursor.rowcount

    conn.commit()
    conn.close()
    print(f"Sanitization complete!")
    print(f"Renamed files: {renamed_count}")
    print(f"Posts updated: {db_updated_count}")

if __name__ == '__main__':
    main()
