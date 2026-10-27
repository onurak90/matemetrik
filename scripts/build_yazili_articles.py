import json
import sqlite3
from datetime import datetime

# Load crawled detailed links
with open('/tmp/all_grades_detailed_links.json', 'r', encoding='utf-8') as f:
    detailed_links = json.load(f)

# Connect to database
conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

def get_drive_button(drive_url, subj_name):
    if not drive_url:
        return ""
    return f'''
<div style="margin: 12px 0 16px 0;">
  <a href="{drive_url}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: #2563eb; color: #ffffff; padding: 10px 18px; border-radius: 12px; font-weight: 700; font-size: 13px; text-decoration: none; box-shadow: 0 4px 12px rgba(37,99,235,0.25); transition: background 0.2s;">
    <span>📥 {subj_name} Yazılı Soruları &amp; Cevapları PDF İndir</span>
  </a>
</div>
'''

def get_yazilideposu_link(page_url, subj_name):
    if not page_url:
        return ""
    return f'''
<p style="font-size: 12px; color: #64748b; margin-top: 4px;">
  Kaynak ve alternatif senaryo arşivi: <a href="{page_url}" target="_blank" rel="noopener noreferrer" style="color: #4f46e5; text-decoration: underline; font-weight: 600;">Yazılı Deposu {subj_name} Sayfası</a>
</p>
'''

print("Script template ready. Building generator...")
