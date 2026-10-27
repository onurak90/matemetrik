import json

with open('/tmp/all_grades_detailed_links.json', 'r', encoding='utf-8') as f:
    detailed = json.load(f)

for g in range(5, 13):
    g_str = str(g)
    subjs = detailed.get(g_str, [])
    print(f"Grade {g}: {len(subjs)} subjects")
    for s in subjs:
        print(f"  - {s['name']}: {len(s['drive_links'])} drive links, url: {s['page_url']}")
