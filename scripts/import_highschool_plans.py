import json
import re
import zipfile
import xml.etree.ElementTree as ET

def clean_dates(dates_str):
    s = dates_str.strip()
    m = re.match(r'^(\d{1,2})\s+(\d{1,2})$', s)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    return s

def extract_special_days(text):
    if not text:
        return ""
    t = text.lower()
    days = []
    if "15 temmuz" in t:
        days.append("15 Temmuz Demokrasi ve Millî Birlik Günü")
    if "ilköğretim haftası" in t:
        days.append("İlköğretim Haftası")
    if "29 ekim" in t or "cumhuriyet bayramı" in t:
        days.append("29 Ekim Cumhuriyet Bayramı")
    if "10 kasım" in t or "atatürk haftası" in t:
        days.append("10 Kasım Atatürk'ü Anma Günü")
    if "24 kasım" in t or "öğretmenler günü" in t:
        days.append("24 Kasım Öğretmenler Günü")
    if "tutum, yatırım" in t or "yerli malı" in t:
        days.append("Tutum, Yatırım ve Türk Malları Haftası")
    if "i. ara tatil" in t or "1. ara tatil" in t or ("ara tatil" in t and ("kasım" in t or "1." in t)):
        days.append("I. Dönem Ara Tatili")
    elif "ii. ara tatil" in t or "2. ara tatil" in t or ("ara tatil" in t and ("nisan" in t or "mart" in t or "2." in t)):
        days.append("II. Dönem Ara Tatili")
    elif "ara tatil" in t:
        days.append("Ara Tatil")
    if "yarıyıl" in t or "sömestr" in t:
        days.append("Yarıyıl Tatili")
    if "12 mart" in t or "istiklal marşı" in t:
        days.append("12 Mart İstiklal Marşı'nın Kabulü")
    if "18 mart" in t or "çanakkale" in t:
        days.append("18 Mart Çanakkale Zaferi ve Şehitleri Anma Günü")
    if "kütüphane haftası" in t:
        days.append("Kütüphane Haftası")
    if "23 nisan" in t:
        days.append("23 Nisan Ulusal Egemenlik ve Çocuk Bayramı")
    if "1 mayıs" in t:
        days.append("1 Mayıs Emek ve Dayanışma Günü")
    if "engelliler haftası" in t:
        days.append("Engelliler Haftası")
    if "19 mayıs" in t:
        days.append("19 Mayıs Atatürk'ü Anma, Gençlik ve Spor Bayramı")
    if "çevre haftası" in t:
        days.append("Dünya Çevre Günü / Çevre Koruma Haftası")

    # Dedup preserving order
    seen = set()
    res = []
    for d in days:
        if d not in seen:
            seen.add(d)
            res.append(d)
    return " | ".join(res)

def import_plans():
    excel_path = '2026-27 plan.xlsx'
    
    with zipfile.ZipFile(excel_path) as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            sst_tree = ET.fromstring(z.read('xl/sharedStrings.xml'))
            for si in sst_tree.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
                t = ''.join([node.text or '' for node in si.iter() if node.tag.endswith('t')])
                shared_strings.append(t)

        rels_tree = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        rel_map = {rel.attrib['Id']: rel.attrib['Target'] for rel in rels_tree}

        wb_tree = ET.fromstring(z.read('xl/workbook.xml'))
        ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

        target_configs = [
            {
                'sheet': '9',
                'id': 'matematik-9-sinif',
                'subject': 'Matematik',
                'grade': 9,
                'title': '9. Sınıf Matematik Taslak Çerçeve Yıllık Planı (2026-2027 - Maarif Modeli)',
                'defaultHours': '6',
                'format': 'maarif',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", 2104 ve 2488 sayılı Tebliğler Dergisi “İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi”, Talim ve Terbiye Kurulu’nun 26.05.2024 tarih ve 13 sayılı Kurul Kararı eki "Türkiye Yüzyılı Maarif Modeli Matematik Dersi (9. Sınıf) Öğretim Programı", MEB 2026-2027 Eğitim Öğretim Yılı Çalışma Takvimi ile Talim ve Terbiye Kurulu Haftalık Ders Çizelgeleri esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': '10',
                'id': 'matematik-10-sinif',
                'subject': 'Matematik',
                'grade': 10,
                'title': '10. Sınıf Matematik Taslak Çerçeve Yıllık Planı (2026-2027 - Maarif Modeli)',
                'defaultHours': '6',
                'format': 'maarif',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", 2104 ve 2488 sayılı Tebliğler Dergisi “İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi”, Talim ve Terbiye Kurulu’nun 26.05.2024 tarih ve 13 sayılı Kurul Kararı eki "Türkiye Yüzyılı Maarif Modeli Matematik Dersi (10. Sınıf) Öğretim Programı", MEB 2026-2027 Eğitim Öğretim Yılı Çalışma Takvimi ile Talim ve Terbiye Kurulu Haftalık Ders Çizelgeleri esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': '11',
                'id': 'matematik-11-sinif',
                'subject': 'Matematik',
                'grade': 11,
                'title': '11. Sınıf Matematik Taslak Çerçeve Yıllık Planı (2026-2027 - Maarif Modeli)',
                'defaultHours': '6',
                'format': 'maarif',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", 2104 ve 2488 sayılı Tebliğler Dergisi “İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi”, Talim ve Terbiye Kurulu’nun 26.05.2024 tarih ve 13 sayılı Kurul Kararı eki "Türkiye Yüzyılı Maarif Modeli Matematik Dersi (11. Sınıf) Öğretim Programı", MEB 2026-2027 Eğitim Öğretim Yılı Çalışma Takvimi ile Talim ve Terbiye Kurulu Haftalık Ders Çizelgeleri esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': '12 normal',
                'id': 'matematik-12-sinif',
                'subject': 'Matematik',
                'grade': 12,
                'title': '12. Sınıf İleri Matematik Taslak Çerçeve Yıllık Planı (2026-2027)',
                'defaultHours': '6',
                'format': 'classic',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", 2104 ve 2488 sayılı Tebliğler Dergisi “İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi”, Talim ve Terbiye Kurulu Ortaöğretim Matematik Dersi (12. Sınıf) Öğretim Programı, MEB 2026-2027 Eğitim Öğretim Yılı Çalışma Takvimi ile Talim ve Terbiye Kurulu Haftalık Ders Çizelgeleri esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': ' 12 temel',
                'id': 'temel-matematik-12-sinif',
                'subject': 'Temel Matematik',
                'grade': 12,
                'title': '12. Sınıf Temel Matematik Taslak Çerçeve Yıllık Planı (2026-2027)',
                'defaultHours': '2',
                'format': 'classic',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", 2104 ve 2488 sayılı Tebliğler Dergisi “İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi”, Talim ve Terbiye Kurulu Ortaöğretim Temel Matematik Dersi Öğretim Programı, MEB 2026-2027 Eğitim Öğretim Yılı Çalışma Takvimi ile Talim ve Terbiye Kurulu Haftalık Ders Çizelgeleri esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': 'mat uyg-1',
                'id': 'matematik-uygulamalari-11-sinif',
                'subject': 'Matematik Uygulamaları',
                'grade': 11,
                'title': '11. Sınıf Matematik Uygulamaları Taslak Çerçeve Yıllık Planı (2026-2027)',
                'defaultHours': '2',
                'format': 'classic',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", Talim ve Terbiye Kurulu Ortaöğretim Matematik Uygulamaları Dersi Öğretim Programı ve MEB 2026-2027 Çalışma Takvimi esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': 'mat uyg-2',
                'id': 'matematik-uygulamalari-12-sinif',
                'subject': 'Matematik Uygulamaları',
                'grade': 12,
                'title': '12. Sınıf Matematik Uygulamaları Taslak Çerçeve Yıllık Planı (2026-2027)',
                'defaultHours': '2',
                'format': 'classic',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", Talim ve Terbiye Kurulu Ortaöğretim Matematik Uygulamaları Dersi Öğretim Programı ve MEB 2026-2027 Çalışma Takvimi esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': 'M. TARİHİ',
                'id': 'matematik-tarihi-ve-uygulamalari-10-sinif',
                'subject': 'Matematik Tarihi ve Uygulamaları',
                'grade': 10,
                'title': '10. Sınıf Matematik Tarihi ve Uygulamaları Taslak Çerçeve Yıllık Planı (2026-2027)',
                'defaultHours': '2',
                'format': 'classic',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", Talim ve Terbiye Kurulu Ortaöğretim Matematik Tarihi ve Uygulamaları Dersi Öğretim Programı ve MEB 2026-2027 Çalışma Takvimi esas alınarak hazırlanmıştır.'
            },
            {
                'sheet': 'A.D 9 SAATLİK ',
                'id': 'akademik-destek-matematik-12-sinif',
                'subject': 'Akademik Destek Matematik',
                'grade': 12,
                'title': '12. Sınıf Akademik Destek Matematik Taslak Çerçeve Yıllık Planı (9 Saatlik - 2026-2027)',
                'defaultHours': '9',
                'format': 'classic',
                'legalBasis': 'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", Talim ve Terbiye Kurulu Akademik Destek Programı Matematik Dersi Çerçevesi ve MEB 2026-2027 Çalışma Takvimi esas alınarak hazırlanmıştır.'
            }
        ]

        sheet_elems = {s.attrib['name']: s for s in wb_tree.findall('ns:sheets/ns:sheet', ns)}

        new_plans = []

        for cfg in target_configs:
            sheet_name = cfg['sheet']
            s_elem = sheet_elems.get(sheet_name)
            if s_elem is None:
                print(f"Sheet not found: {sheet_name}")
                continue
            
            rid = s_elem.attrib.get('{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id')
            target = 'xl/' + rel_map[rid].replace('xl/', '')
            sheet_xml = z.read(target)
            s_tree = ET.fromstring(sheet_xml)
            rows = s_tree.findall('.//ns:row', ns)

            cur_month = ''
            cur_unit = ''
            weeks_list = []
            week_counter = 1

            for r in rows:
                row_dict = {}
                for c in r.findall('ns:c', ns):
                    col_letter = ''.join([ch for ch in c.attrib.get('r') if ch.isalpha()])
                    t_attr = c.attrib.get('t')
                    v = c.find('ns:v', ns)
                    val = ''
                    if v is not None and v.text is not None:
                        if t_attr == 's':
                            val = shared_strings[int(v.text)]
                        else:
                            val = v.text
                    row_dict[col_letter] = val.strip()

                b_val = row_dict.get('B', '').strip()
                if b_val and any(m in b_val.upper() for m in ['EYLÜL', 'EKİM', 'KASIM', 'ARALIK', 'OCAK', 'ŞUBAT', 'MART', 'NİSAN', 'MAYIS', 'HAZİRAN']):
                    cur_month = b_val

                f_val = row_dict.get('F', '').strip()
                if f_val:
                    cur_unit = f_val

                c_val = row_dict.get('C', '').strip()
                if c_val and c_val.isdigit():
                    dates = clean_dates(row_dict.get('D', ''))
                    hours = row_dict.get('E', '').strip() or cfg['defaultHours']
                    
                    week_label = f"{week_counter}. Hafta:\n {dates} {cur_month.title()}".strip()

                    if cfg['format'] == 'maarif':
                        unit = cur_unit
                        outcomes = row_dict.get('G', '').strip()
                        topic = ""
                        # Try to get short topic from unit or outcome
                        first_line = outcomes.split('\n')[0] if outcomes else unit
                        topic = first_line[:50] if len(first_line) > 50 else first_line
                        
                        # Components combine Alan Becerileri, Kavramsal Beceriler, Eğilimler, Sosyal Duyusal
                        comp_parts = []
                        if row_dict.get('H'): comp_parts.append(f"Alan Becerileri: {row_dict['H']}")
                        if row_dict.get('I'): comp_parts.append(f"Kavramsal Beceriler: {row_dict['I']}")
                        if row_dict.get('J'): comp_parts.append(f"Eğilimler: {row_dict['J']}")
                        if row_dict.get('K'): comp_parts.append(f"Sosyal-Duyusal: {row_dict['K']}")
                        components = "\n".join(comp_parts)

                        values = row_dict.get('L', '').strip()
                        
                        # Assessment can include okuryazarlık
                        assessment_parts = []
                        if row_dict.get('M'): assessment_parts.append(f"Okuryazarlık: {row_dict['M']}")
                        assessment = "\n".join(assessment_parts)

                        special_days_raw = f"{row_dict.get('O', '')} {outcomes} {cur_month}"
                        special_days = extract_special_days(special_days_raw)
                    else:
                        # Classic format
                        unit = cur_unit
                        outcomes = row_dict.get('G', '').strip()
                        topic = row_dict.get('H', '').strip() or cur_unit
                        
                        comp_parts = []
                        if row_dict.get('I'): comp_parts.append(f"Yöntem-Teknik: {row_dict['I']}")
                        if row_dict.get('J'): comp_parts.append(f"Araç-Gereç: {row_dict['J']}")
                        components = "\n".join(comp_parts)

                        values = row_dict.get('K', '').strip()
                        assessment = row_dict.get('L', '').strip()
                        special_days = extract_special_days(f"{assessment} {outcomes} {topic} {cur_month}")

                    # Check for Ara Tatil / Yarıyıl Tatili
                    if "ara tatil" in outcomes.lower() or "ara tatil" in topic.lower():
                        if "i. ara tatil" in outcomes.lower() or "1. ara tatil" in outcomes.lower() or "kasım" in cur_month.lower():
                            special_days = "I. Dönem Ara Tatili"
                        elif "ii. ara tatil" in outcomes.lower() or "2. ara tatil" in outcomes.lower() or "nisan" in cur_month.lower() or "mart" in cur_month.lower():
                            special_days = "II. Dönem Ara Tatili"
                        elif not special_days:
                            special_days = "Ara Tatil"

                    week_obj = {
                        "month": cur_month,
                        "week": week_label,
                        "hours": hours,
                        "unit": unit,
                        "topic": topic,
                        "outcomes": outcomes,
                        "components": components,
                        "assessment": assessment,
                        "values": values,
                        "specialDays": special_days
                    }
                    weeks_list.append(week_obj)
                    week_counter += 1

            plan_obj = {
                "id": cfg['id'],
                "file": "2026-27 plan.xlsx",
                "sheet": cfg['sheet'].strip(),
                "subject": cfg['subject'],
                "grade": cfg['grade'],
                "title": cfg['title'],
                "defaultHours": cfg['defaultHours'],
                "legalBasis": cfg['legalBasis'],
                "weeksCount": len(weeks_list),
                "weeks": weeks_list
            }
            new_plans.append(plan_obj)
            print(f"Created plan: {cfg['id']} with {len(weeks_list)} weeks")

    return new_plans

if __name__ == '__main__':
    plans = import_plans()
    print(f"Successfully generated {len(plans)} plans.")
    # Read existing
    with open('data/cerceve-plans.json', 'r', encoding='utf-8') as f:
        existing = json.load(f)

    existing_ids = {p['id'] for p in existing}
    added_count = 0
    updated_count = 0

    # Replace or append
    final_plans = []
    for p in existing:
        matched = next((np for np in plans if np['id'] == p['id']), None)
        if matched:
            final_plans.append(matched)
            updated_count += 1
        else:
            final_plans.append(p)

    for np in plans:
        if np['id'] not in existing_ids:
            final_plans.append(np)
            added_count += 1

    print(f"Existing total: {len(existing)}, Added: {added_count}, Updated: {updated_count}, New total: {len(final_plans)}")
    
    with open('data/cerceve-plans.json', 'w', encoding='utf-8') as f:
        json.dump(final_plans, f, ensure_ascii=False, indent=2)
    print("Updated data/cerceve-plans.json successfully!")
