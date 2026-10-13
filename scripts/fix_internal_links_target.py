import sqlite3
import re

conn = sqlite3.connect('data/matemetrik.db')
cursor = conn.cursor()

# 1. Clean settings table of any intrusive popup / social bar scripts
cursor.execute("UPDATE settings SET value = '' WHERE key = 'ad_footer_code' AND value LIKE '%bauval.org%'")
cursor.execute("UPDATE settings SET value = '' WHERE key = 'ad_header_code' AND value LIKE '%abscloud%'")
conn.commit()
print("Cleaned intrusive scripts from settings.")

# 2. Fix internal links and download buttons in posts table
cursor.execute("SELECT id, content FROM posts WHERE content LIKE '%target=%'")
rows = cursor.fetchall()
print(f"Scanning {len(rows)} posts with target attributes...")

def fix_link(match):
    attrs = match.group(1)
    href_m = re.search(r'href=[\"\']([^\"\']+)[\"\']', attrs)
    if not href_m:
        return match.group(0)
    
    href = href_m.group(1)
    is_internal = 'matemetrik.com' in href or href.startswith('/')
    is_download = 'download=' in attrs or '/uploads/' in href
    
    # If internal link or download button, remove target="_blank"
    if is_internal or is_download:
        new_attrs = re.sub(r'\s*target=[\"\']_blank[\"\']', '', attrs)
        new_attrs = re.sub(r'\s*target=[\"\'][^\"\']*[\"\']', '', new_attrs)
        return f'<a {new_attrs}>'
    
    return match.group(0)

updated_count = 0
for post_id, content in rows:
    new_content = re.sub(r'<a\s+([^>]+)>', fix_link, content)
    if new_content != content:
        cursor.execute("UPDATE posts SET content = ? WHERE id = ?", (new_content, post_id))
        updated_count += 1

conn.commit()
print(f"Successfully cleaned internal links and download buttons in {updated_count} posts!")

# Verification: Count remaining internal links with target="_blank"
cursor.execute("SELECT content FROM posts WHERE content LIKE '%target=%'")
rows = cursor.fetchall()
remaining_internal = 0
for r in rows:
    for m in re.finditer(r'<a\s+([^>]+)>', r[0]):
        attrs = m.group(1)
        if 'target=' in attrs:
            href_m = re.search(r'href=[\"\']([^\"\']+)[\"\']', attrs)
            if href_m:
                h = href_m.group(1)
                if 'matemetrik.com' in h or h.startswith('/'):
                    remaining_internal += 1

print(f"Remaining internal links with target=_blank: {remaining_internal}")
conn.close()
