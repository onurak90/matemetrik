const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

function clean(v) {
  if (v === undefined || v === null) return '';
  return String(v).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
}

function slugify(text) {
  const trMap = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
    'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o'
  };
  return text
    .split('')
    .map(c => trMap[c] || c)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// 1. PROCESS CERCEVE PLAN FILES
const cpDir = path.join(__dirname, '../cerceveplan');
const cpFiles = fs.readdirSync(cpDir);
const plans = [];

for (const f of cpFiles) {
  if (!f.endsWith('.xls') && !f.endsWith('.xlsx')) continue;
  const filePath = path.join(cpDir, f);
  const normFile = f.normalize('NFC');
  let wb;
  try {
    wb = xlsx.readFile(filePath);
  } catch (e) {
    console.error('Failed to read file:', f, e.message);
    continue;
  }

  for (const sname of wb.SheetNames) {
    if (sname.toLowerCase().includes('sayfa1') && wb.SheetNames.length > 1) continue;
    const sheet = wb.Sheets[sname];
    const rawRows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
    if (rawRows.length < 5) continue;

    // determine grade
    let grade = 0;
    const combined = (normFile + ' ' + sname).toLowerCase();
    for (let g = 1; g <= 8; g++) {
      if (
        sname.includes(g + '.') ||
        sname.includes(g + ' ') ||
        sname.includes(g + '_') ||
        sname.includes(g + '-') ||
        combined.includes(g + '.sınıf') ||
        combined.includes(g + '. sınıf') ||
        combined.includes(g + '.sinif')
      ) {
        grade = g;
        break;
      }
    }
    if (!grade) {
      for (let g = 1; g <= 8; g++) {
        if (sname.includes(String(g))) { grade = g; break; }
      }
    }

    // determine subject
    let subject = 'Ders';
    let defaultHours = '4';
    if (normFile.includes('MATEMATİK')) {
      subject = 'Matematik';
      defaultHours = grade <= 4 ? '5' : '5';
    } else if (normFile.includes('TÜRKÇE') || normFile.includes('TURKÇE')) {
      subject = 'Türkçe';
      defaultHours = grade <= 4 ? '8' : '6';
    } else if (normFile.includes('FEN BİLİMLERİ')) {
      subject = 'Fen Bilimleri';
      defaultHours = grade <= 4 ? '3' : '4';
    } else if (normFile.includes('SOSYAL BİLGİLER')) {
      subject = 'Sosyal Bilgiler';
      defaultHours = '3';
    } else if (normFile.includes('INKILAP') || normFile.includes('İNKILAP')) {
      subject = 'T.C. İnkılap Tarihi ve Atatürkçülük';
      defaultHours = '2';
    } else if (normFile.includes('ALMANCA')) {
      subject = 'Almanca';
      defaultHours = '2';
    } else if (normFile.includes('ÇOKLU') && normFile.includes('İNGİLİZCE')) {
      subject = 'Çoklu Yabancı Dil İngilizce';
      defaultHours = '4';
    } else if (normFile.includes('İNGİLİZCE')) {
      subject = 'İngilizce';
      defaultHours = grade <= 4 ? '2' : '3';
    } else if (normFile.includes('BEDEN')) {
      subject = grade <= 4 ? 'Beden Eğitimi ve Oyun' : 'Beden Eğitimi ve Spor';
      defaultHours = '2';
    } else if (normFile.includes('BİLİŞİM')) {
      subject = 'Bilişim Teknolojileri ve Yazılım';
      defaultHours = '2';
    } else if (normFile.includes('MÜZİK')) {
      subject = 'Müzik';
      defaultHours = '1';
    } else if (normFile.includes('GÖRSEL')) {
      subject = 'Görsel Sanatlar';
      defaultHours = '1';
    } else if (normFile.includes('TEKNOLOJİ')) {
      subject = 'Teknoloji ve Tasarım';
      defaultHours = '2';
    } else if (normFile.includes('HAYAT')) {
      subject = 'Hayat Bilgisi';
      defaultHours = '4';
    } else if (normFile.includes('İNSAN HAKLARI')) {
      subject = 'İnsan Hakları, Yurttaşlık ve Demokrasi';
      defaultHours = '2';
    }

    // find header row
    let headerIdx = -1;
    for (let i = 0; i < Math.min(8, rawRows.length); i++) {
      const rowStr = (rawRows[i] || []).filter(Boolean).join(' ').toUpperCase();
      if (
        (rowStr.includes('AY') || rowStr.includes('MONTH') || rowStr.includes('ZEIT')) &&
        (rowStr.includes('HAFTA') || rowStr.includes('WEEK') || rowStr.includes('SAAT') || rowStr.includes('STUNDE'))
      ) {
        headerIdx = i;
        break;
      }
    }
    if (headerIdx === -1) headerIdx = 2;

    const weeks = [];
    let currentMonth = '';
    let legalBasis =
      'Bu yıllık plan; 19.09.2022 tarih ve 58168473 sayılı "Millî Eğitim Bakanlığı Eğitim Öğretim Çalışmalarının Planlı Yürütülmesine İlişkin Yönerge", 2104 sayılı Tebliğler Dergisi "İlköğretim ve Ortaöğretim Kurumlarında Atatürk İnkılap ve İlkelerinin Öğretim Esasları Yönergesi", Talim ve Terbiye Kurulu’nun Türkiye Yüzyılı Maarif Modeli Öğretim Programları Kararları ve MEB 2026-2027 Eğitim ve Öğretim Yılı Çalışma Takvimi esas alınarak hazırlanmıştır.';

    for (let i = headerIdx + 1; i < rawRows.length; i++) {
      const r = rawRows[i];
      if (!r || r.length === 0) continue;
      const rowText = r.filter(Boolean).join(' ');

      if (rowText.includes('Bu yıllık plan;') || rowText.includes('Tebliğler Dergisi')) {
        legalBasis = rowText;
        continue;
      }
      if (rowText.includes('Ders Öğretmeni') || rowText.includes('Okul Müdürü') || rowText.includes('Zümre Öğretmenleri')) {
        continue;
      }

      const col0 = clean(r[0]);
      const col1 = clean(r[1]);
      const col2 = clean(r[2]);
      const col3 = clean(r[3]);
      const col4 = clean(r[4]);
      const col5 = clean(r[5]);
      const col6 = clean(r[6]);
      const col7 = clean(r[7]);
      const col8 = clean(r[8]);
      const col9 = clean(r[9]);
      const col10 = clean(r[10]);
      const col11 = clean(r[11]);
      const col12 = clean(r[12]);

      if (
        col0 &&
        !col0.toLowerCase().includes('hafta') &&
        !col0.toLowerCase().includes('week') &&
        !col0.toLowerCase().includes('woche')
      ) {
        currentMonth = col0;
      }

      const weekVal =
        col1 ||
        (col0.toLowerCase().includes('hafta') ||
        col0.toLowerCase().includes('week') ||
        col0.toLowerCase().includes('woche')
          ? col0
          : '');
      if (!weekVal && !col2 && !col3 && !col4 && !col5) continue;

      const special = col11 || col12 || col10 || '';
      const values = col9 || col10 || '';

      weeks.push({
        month: currentMonth || col0,
        week: weekVal,
        hours: col2 || defaultHours,
        unit: col3,
        topic: col4,
        outcomes: col5,
        components: col6,
        assessment: col7,
        values: values,
        specialDays: special
      });
    }

    const id = `${slugify(subject)}-${grade}-${slugify(sname)}`;
    const title = `${grade}. Sınıf ${subject} Taslak Çerçeve Yıllık Planı (2026-2027)`;

    plans.push({
      id,
      file: f,
      sheet: sname,
      subject,
      grade,
      title,
      defaultHours,
      legalBasis,
      weeksCount: weeks.length,
      weeks
    });
  }
}

console.log('Processed', plans.length, 'annual plans.');

// Group plans: we want one primary plan per (subject + grade), or list alternatives if any
// Let's sort plans by grade, then subject
plans.sort((a, b) => a.grade - b.grade || a.subject.localeCompare(b.subject, 'tr'));

const outDir = path.join(__dirname, '../data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(
  path.join(outDir, 'cerceve-plans.json'),
  JSON.stringify(plans, null, 2),
  'utf-8'
);
console.log('Saved data/cerceve-plans.json successfully!');
