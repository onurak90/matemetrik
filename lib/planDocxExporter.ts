import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  BorderStyle,
  HeadingLevel,
} from 'docx';
import { DailyPlanFullDocument, DailyDefterEntry, NormalizedWeek } from './planRobotData';

export async function exportDailyPlanToDocx(plan: DailyPlanFullDocument): Promise<void> {
  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    left: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
    right: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' },
  };

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 1000, right: 1000 },
          },
        },
        children: [
          // Header
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'T.C.',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'MİLLÎ EĞİTİM BAKANLIĞI',
                bold: true,
                size: 24,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `${plan.schoolName.toUpperCase()}`,
                bold: true,
                size: 22,
                font: 'Calibri',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `${plan.academicYear} EĞİTİM-ÖĞRETİM YILI GÜNLÜK DERS İŞLENİŞ PLANI`,
                bold: true,
                size: 22,
                color: '1E3A8A',
                font: 'Calibri',
              }),
            ],
          }),

          // Bölüm I: Genel Bilgiler Tablosu
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: tableBorder,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Ders: ', bold: true }),
                          new TextRun({ text: plan.subject }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Sınıf / Şube: ', bold: true }),
                          new TextRun({ text: `${plan.grade}. Sınıf (${plan.classBranch})` }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Süre: ', bold: true }),
                          new TextRun({ text: `${plan.hours} Ders Saati` }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: tableBorder,
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Hafta / Tarih: ', bold: true }),
                          new TextRun({ text: `${plan.weekNum}. Hafta (${plan.dates})` }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Öğretmen: ', bold: true }),
                          new TextRun({ text: plan.teacherName }),
                        ],
                      }),
                      new Paragraph({
                        children: [
                          new TextRun({ text: 'Belirli Gün & Hafta: ', bold: true }),
                          new TextRun({ text: plan.specialDays || '-' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ spacing: { before: 200 } }),

          // Bölüm II: Konu & Kazanımlar
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'BÖLÜM I: ÖĞRENME ALANI VE KAZANIMLAR',
                bold: true,
                color: '1E3A8A',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Ünite / Tema: ', bold: true }),
              new TextRun({ text: plan.unit }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Konu: ', bold: true }),
              new TextRun({ text: plan.topic }),
            ],
          }),
          ...(plan.contentFramework
            ? [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'İçerik Çerçevesi: ', bold: true }),
                    new TextRun({ text: plan.contentFramework }),
                  ],
                }),
              ]
            : []),
          ...(plan.keyConcepts && plan.keyConcepts.length > 0
            ? [
                new Paragraph({
                  children: [
                    new TextRun({ text: 'Anahtar Kavramlar: ', bold: true }),
                    new TextRun({ text: plan.keyConcepts.join(', ') }),
                  ],
                }),
              ]
            : []),
          new Paragraph({
            spacing: { before: 100 },
            children: [new TextRun({ text: 'Öğrenme Çıktıları / Kazanımlar:', bold: true })],
          }),
          ...plan.outcomes.map(
            (o) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: o })],
              })
          ),

          new Paragraph({
            spacing: { before: 100 },
            children: [new TextRun({ text: 'Süreç Bileşenleri & Beceriler:', bold: true })],
          }),
          ...plan.components.map(
            (c) =>
              new Paragraph({
                bullet: { level: 0 },
                children: [new TextRun({ text: c })],
              })
          ),

          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ text: 'Erdem-Değer-Eylem / Değerler: ', bold: true }),
              new TextRun({ text: plan.values }),
            ],
          }),

          // Bölüm III: Yöntem, Teknik & Araçlar
          new Paragraph({
            spacing: { before: 200 },
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'BÖLÜM II: ÖĞRETME-ÖĞRENME YÖNTEM, TEKNİK VE ARAÇLARI',
                bold: true,
                color: '1E3A8A',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Kullanılan Yöntem ve Teknikler: ', bold: true }),
              new TextRun({ text: plan.methods.join(', ') }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Kullanılan Eğitim Teknolojileri, Araç ve Gereçler: ', bold: true }),
              new TextRun({ text: plan.toolsMaterials.join(', ') }),
            ],
          }),

          // Bölüm IV: İşleniş
          new Paragraph({
            spacing: { before: 200 },
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'BÖLÜM III: DERSİN İŞLENİŞİ VE ETKİNLİK SÜRECİ',
                bold: true,
                color: '1E3A8A',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '1. Derse Giriş, Güdüleme ve Dikkat Çekme: ', bold: true }),
              new TextRun({ text: plan.steps.giris }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ text: '2. Keşfetme ve Öğrenme Yaşantıları: ', bold: true }),
              new TextRun({ text: plan.steps.kesfetme }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ text: '3. Derinleştirme ve Pekiştirme Etkinlikleri: ', bold: true }),
              new TextRun({ text: plan.steps.derinlestirme }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ text: '4. Özetleme ve Ders Sonu Değerlendirmesi: ', bold: true }),
              new TextRun({ text: plan.steps.ozet }),
            ],
          }),

          // Bölüm V: Ölçme & Ödev
          new Paragraph({
            spacing: { before: 200 },
            heading: HeadingLevel.HEADING_2,
            children: [
              new TextRun({
                text: 'BÖLÜM IV: ÖLÇME, DEĞERLENDİRME VE ÖDEV',
                bold: true,
                color: '1E3A8A',
                size: 20,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Ölçme ve Değerlendirme Yaklaşımı: ', bold: true }),
              new TextRun({ text: plan.assessment }),
            ],
          }),
          new Paragraph({
            spacing: { before: 100 },
            children: [
              new TextRun({ text: 'Pekiştirme Görevi / Ödev: ', bold: true }),
              new TextRun({ text: plan.homework }),
            ],
          }),

          // İmza Bloğu
          new Paragraph({ spacing: { before: 400 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: `${plan.teacherName}\n`, bold: true }),
                          new TextRun({ text: `${plan.subject} Öğretmeni` }),
                        ],
                      }),
                    ],
                  }),
                  new TableCell({
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                          new TextRun({ text: 'UYGUNDUR\n', bold: true }),
                          new TextRun({ text: 'Okul Müdürü' }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${plan.grade}_Sinif_${plan.subject.replace(/\s+/g, '_')}_Hafta_${plan.weekNum}_Gunluk_Plan.docx`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function exportWeeklyDefterToDocx(params: {
  schoolName: string;
  teacherName: string;
  academicYear: string;
  grade: number;
  classBranch: string;
  subject: string;
  week: NormalizedWeek;
  entries: DailyDefterEntry[];
}): Promise<void> {
  const { schoolName, teacherName, academicYear, grade, classBranch, subject, week, entries } = params;

  const tableBorder = {
    top: { style: BorderStyle.SINGLE, size: 1, color: '333333' },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: '333333' },
    left: { style: BorderStyle.SINGLE, size: 1, color: '333333' },
    right: { style: BorderStyle.SINGLE, size: 1, color: '333333' },
  };

  const rows = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          borders: tableBorder,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'GÜN / DERS', bold: true })] })],
        }),
        new TableCell({
          width: { size: 65, type: WidthType.PERCENTAGE },
          borders: tableBorder,
          children: [new Paragraph({ children: [new TextRun({ text: 'SINIF DEFTERİNE YAZILACAK KAZANIM VE KONU', bold: true })] })],
        }),
        new TableCell({
          width: { size: 15, type: WidthType.PERCENTAGE },
          borders: tableBorder,
          children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'İMZA', bold: true })] })],
        }),
      ],
    }),
    ...entries.map(
      (e) =>
        new TableRow({
          children: [
            new TableCell({
              width: { size: 20, type: WidthType.PERCENTAGE },
              borders: tableBorder,
              children: [
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: e.dayName, bold: true })] }),
                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: e.periodLabel, size: 18, color: '666666' })] }),
              ],
            }),
            new TableCell({
              width: { size: 65, type: WidthType.PERCENTAGE },
              borders: tableBorder,
              children: [new Paragraph({ children: [new TextRun({ text: e.entryText })] })],
            }),
            new TableCell({
              width: { size: 15, type: WidthType.PERCENTAGE },
              borders: tableBorder,
              children: [new Paragraph({ text: '' })],
            }),
          ],
        })
    ),
  ];

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: { top: 720, bottom: 720, left: 1000, right: 1000 },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: schoolName.toUpperCase(), bold: true, size: 22 })],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: `${academicYear} ${grade}. SINIF (${classBranch}) HAFTALIK DERS İŞLEME VE SINIF DEFTERİ DOLDURMA ÇİZELGESİ`,
                bold: true,
                size: 20,
                color: '1E3A8A',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `Hafta: `, bold: true }),
              new TextRun({ text: `${week.weekNum}. Hafta (${week.dates})   |   ` }),
              new TextRun({ text: `Ders: `, bold: true }),
              new TextRun({ text: `${subject}   |   ` }),
              new TextRun({ text: `Öğretmen: `, bold: true }),
              new TextRun({ text: teacherName }),
            ],
          }),
          new Paragraph({ spacing: { before: 150 } }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${grade}_Sinif_${subject.replace(/\s+/g, '_')}_Hafta_${week.weekNum}_Defter_Doldurma.docx`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
