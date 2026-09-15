'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users, FileText, Printer, Sparkles, CheckCircle2, Search,
  School, User, Award, Shield, ChevronRight, RefreshCw,
  Layers, Download, HelpCircle, Check, Eye
} from 'lucide-react';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle
} from 'docx';

interface FaaliyetRow {
  aylar: string;
  faaliyetler: string;
}

interface MonthlyPlanRow {
  ay: string;
  faaliyet: string;
}

interface ClubItem {
  id: string;
  name: string;
  filename: string;
  tuzukParas?: string[];
  toplantiParas?: string[];
  planParas?: string[];
  monthlyPlanTable?: MonthlyPlanRow[];
  ogrenciParas?: string[];
  veliParas?: string[];
  raporParas?: string[];
  faaliyetTable?: FaaliyetRow[];
}

interface ClubSummary {
  id: string;
  name: string;
  filename: string;
  hasTuzuk: boolean;
  hasToplanti: boolean;
  hasPlan: boolean;
  hasFaaliyet: boolean;
}

export default function ClubDocumentsMakerTool() {
  const [clubsCatalog, setClubsCatalog] = useState<ClubSummary[]>([]);
  const [selectedClubId, setSelectedClubId] = useState<string>('kizilay');
  const [currentClub, setCurrentClub] = useState<ClubItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeDocTab, setActiveDocTab] = useState<
    'all' | 'tuzuk' | 'toplanti1' | 'plan' | 'toplanti2' | 'ogrenciler' | 'rapor' | 'veli'
  >('all');

  // Form Fields
  const [schoolName, setSchoolName] = useState('Atatürk Ortaokulu');
  const [cityDistrict, setCityDistrict] = useState('İstanbul / Kadıköy');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [advisorTeacher1, setAdvisorTeacher1] = useState('Cavenaghi');
  const [advisorTeacher2, setAdvisorTeacher2] = useState('Zeynep Yıldız');
  const [principalName, setPrincipalName] = useState('Mehmet Yılmaz');

  // Meeting Details
  const [meetingDate1, setMeetingDate1] = useState('25.09.2026');
  const [meetingDate2, setMeetingDate2] = useState('19.02.2027');
  const [meetingTime, setMeetingTime] = useState('13:30');
  const [meetingPlace, setMeetingPlace] = useState('Öğretmenler Odası / Konferans Salonu');

  // Student Board
  const [studentPresident, setStudentPresident] = useState('Ahmet Efe Çelik (8/A)');
  const [studentVicePresident, setStudentVicePresident] = useState('Elif Naz Demir (8/B)');
  const [studentSecretary, setStudentSecretary] = useState('Burak Yılmaz (7/A)');
  const [studentTreasurer, setStudentTreasurer] = useState('Ayşe Kaya (7/C)');

  // Club Search Filter
  const [clubSearch, setClubSearch] = useState('');

  // Fetch clubs catalog on mount
  useEffect(() => {
    async function fetchClubs() {
      try {
        setLoading(true);
        const res = await fetch('/api/club-documents');
        const data = await res.json();
        if (data.clubs) {
          setClubsCatalog(data.clubs);
        }
      } catch (err) {
        console.error('Kulüp listesi alınamadı:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchClubs();
  }, []);

  // Fetch full club details when selected
  useEffect(() => {
    async function fetchClubDetail() {
      if (!selectedClubId) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/club-documents?id=${encodeURIComponent(selectedClubId)}`);
        const data = await res.json();
        if (data && data.name) {
          setCurrentClub(data);
        }
      } catch (err) {
        console.error('Kulüp verisi alınamadı:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchClubDetail();
  }, [selectedClubId]);

  // Filtered clubs for search
  const filteredClubs = useMemo(() => {
    if (!clubSearch.trim()) return clubsCatalog;
    const query = clubSearch.toLowerCase();
    return clubsCatalog.filter((c) => c.name.toLowerCase().includes(query));
  }, [clubsCatalog, clubSearch]);

  const handlePrint = () => {
    window.print();
  };

  // Helper to replace placeholders like "2022/2023", "Gazi İlkokulu", "..............."
  const [wordLoading, setWordLoading] = useState(false);

  const cleanDocText = (text: string) => {
    if (!text) return '';
    return text
      .replace(/20\d\d[\/-]20\d\d/g, academicYear)
      .replace(/2022[\/-]2023/g, academicYear)
      .replace(/2020[\/-]2023/g, academicYear)
      .replace(/2019[\/-]2020/g, academicYear)
      .replace(/Gazi İlkokulu-Ortaokulu/g, schoolName)
      .replace(/Vatan İlkokulu-Ortaokulu/g, schoolName)
      .replace(/Çukurköy İlkokulu-Ortaokulu/g, schoolName)
      .replace(/\{okulAdi\}/gi, schoolName)
      .replace(/\{academicYear\}/gi, academicYear)
      .replace(/\{cityDistrict\}/gi, cityDistrict)
      .replace(/\{advisorTeacher1\}/gi, advisorTeacher1)
      .replace(/\{advisorTeacher2\}/gi, advisorTeacher2)
      .replace(/\{principalName\}/gi, principalName)
      .replace(/\{meetingDate1\}/gi, meetingDate1)
      .replace(/\{meetingTime\}/gi, meetingTime)
      .replace(/\{meetingPlace\}/gi, meetingPlace)
      .replace(/\{studentPresident\}/gi, studentPresident)
      .replace(/\{studentVicePresident\}/gi, studentVicePresident)
      .replace(/\{studentSecretary\}/gi, studentSecretary)
      .replace(/\{studentTreasurer\}/gi, studentTreasurer)
      .replace(/\.{4,}/g, '...')
      .replace(/…{2,}/g, '...')
      .replace(/_{4,}/g, '___');
  };

  const handleExportWord = async () => {
    if (!currentClub) return;
    try {
      setWordLoading(true);

      const children: any[] = [];

      // Official Dossier Cover Title
      children.push(
        new Paragraph({
          text: `T.C. ${cityDistrict.toUpperCase()}`,
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: `T.C. ${cityDistrict.toUpperCase()}`, bold: true, size: 22 })],
        }),
        new Paragraph({
          text: schoolName.toUpperCase(),
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: schoolName.toUpperCase(), bold: true, size: 24 })],
        }),
        new Paragraph({
          text: 'MİLLÎ EĞİTİM BAKANLIĞI SOSYAL ETKİNLİKLER YÖNETMELİĞİ',
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
          children: [new TextRun({ text: 'MİLLÎ EĞİTİM BAKANLIĞI SOSYAL ETKİNLİKLER YÖNETMELİĞİ', bold: true, size: 20 })],
        }),
        new Paragraph({
          text: `${academicYear} EĞİTİM VE ÖĞRETİM YILI ${currentClub.name.toUpperCase()} DOSYASI`,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: `${academicYear} EĞİTİM VE ÖĞRETİM YILI ${currentClub.name.toUpperCase()} DOSYASI`,
              bold: true,
              size: 26,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
          children: [
            new TextRun({
              text: `Danışman Öğretmenler: ${advisorTeacher1}${advisorTeacher2 ? `, ${advisorTeacher2}` : ''} | Okul Müdürü: ${principalName} | Tarih: ${meetingDate1}`,
              italics: true,
              size: 18,
            }),
          ],
        })
      );

      // Section 1: TÜZÜK
      children.push(
        new Paragraph({
          text: '1. SOSYAL KULÜP İÇ TÜZÜĞÜ',
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 200, after: 150 },
        })
      );
      (currentClub.tuzukParas || []).forEach((p) => {
        const isHeader = p.startsWith('BÖLÜM') || p.startsWith('T.C.');
        const isMadde = p.startsWith('Madde');
        children.push(
          new Paragraph({
            spacing: { after: isHeader ? 120 : 80 },
            children: [
              new TextRun({
                text: cleanDocText(p),
                bold: isHeader || isMadde,
                size: isHeader ? 22 : 20,
              }),
            ],
          })
        );
      });

      // Section 1 Signatures
      children.push(
        new Paragraph({
          spacing: { before: 250, after: 100 },
          children: [
            new TextRun({
              text: `Danışman Öğretmen: ${advisorTeacher1} (İmza)                           UYGUNDUR - ${principalName} (Okul Müdürü)`,
              bold: true,
              size: 20,
            }),
          ],
        })
      );

      // Section 2: 1. DÖNEM TOPLANTI TUTANAĞI & KARARLARI
      children.push(
        new Paragraph({
          text: '2. 1. DÖNEM GENEL KURUL TOPLANTI TUTANAĞI VE ALINAN KARARLAR',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { before: 200, after: 150 },
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Toplantı Tarihi ve Saati:', bold: true })] })],
                }),
                new TableCell({
                  children: [new Paragraph(`${meetingDate1} - ${meetingTime}`)],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Toplantı Yeri:', bold: true })] })],
                }),
                new TableCell({
                  children: [new Paragraph(meetingPlace)],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph({ children: [new TextRun({ text: 'Danışman Öğretmenler:', bold: true })] })],
                }),
                new TableCell({
                  children: [new Paragraph(`${advisorTeacher1}${advisorTeacher2 ? `, ${advisorTeacher2}` : ''}`)],
                }),
              ],
            }),
          ],
        }),
        new Paragraph({ text: '', spacing: { after: 150 } })
      );

      (currentClub.toplantiParas || []).forEach((p) => {
        const isHead = p.includes('GÜNDEM MADDELERİ') || p.includes('GÖRÜŞÜLEN KONULAR') || p.startsWith('1. DÖNEM');
        children.push(
          new Paragraph({
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: cleanDocText(p),
                bold: isHead,
                size: 20,
              }),
            ],
          })
        );
      });

      // Section 2 Signatures
      children.push(
        new Paragraph({
          spacing: { before: 250, after: 100 },
          children: [
            new TextRun({
              text: `Kulüp Başkanı: ${studentPresident} (İmza)       Danışman: ${advisorTeacher1} (İmza)       UYGUNDUR - ${principalName} (Müdür)`,
              bold: true,
              size: 19,
            }),
          ],
        })
      );

      // Section 3: YILLIK ÇALIŞMA PLANI (TABLE FORMAT)
      children.push(
        new Paragraph({
          text: `3. ${academicYear} EĞİTİM VE ÖĞRETİM YILI ${currentClub.name.toUpperCase()} YILLIK ÇALIŞMA PLANI`,
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { before: 200, after: 150 },
        })
      );

      const planRows =
        currentClub.monthlyPlanTable && currentClub.monthlyPlanTable.length > 0
          ? currentClub.monthlyPlanTable
          : [
              { ay: 'EYLÜL', faaliyet: 'Kulüp genel kurulu, yönetim seçimi, Sosyal Etkinlik Modülü kayıtları ve yıllık plan onayı.' },
              { ay: 'EKİM', faaliyet: 'Kulüp panosunun düzenlenmesi, 29 Ekim Cumhuriyet Bayramı çalışmaları.' },
              { ay: 'KASIM', faaliyet: '10 Kasım Atatürk’ü Anma ve 24 Kasım Öğretmenler Günü etkinlikleri, kulüp farkındalık çalışması.' },
              { ay: 'ARALIK', faaliyet: 'Toplum hizmeti projesinin başlatılması, okul içi seminer veya atölye çalışması.' },
              { ay: 'OCAK', faaliyet: '1. Dönem faaliyetlerinin değerlendirilmesi, karar defterinin işlenmesi ve ara rapor hazırlanması.' },
              { ay: 'ŞUBAT', faaliyet: '2. Dönem başı toplantısı, bahar dönemi etkinlik takviminin güncellenmesi.' },
              { ay: 'MART', faaliyet: '18 Mart Çanakkale Zaferi anması, kulüp branşına özel bahar projesinin uygulanması.' },
              { ay: 'NİSAN', faaliyet: '23 Nisan kutlamaları, okul içi yarışma, sergi veya söyleşi düzenlenmesi.' },
              { ay: 'MAYIS', faaliyet: 'Kulüp projelerinin tamamlanması, okul sergisi ve kapanış etkinliklerinin icrası.' },
              { ay: 'HAZİRAN', faaliyet: 'Yıl sonu faaliyet raporunun hazırlanması, Sosyal Etkinlik Modülü veri girişleri ve dosya teslimi.' },
            ];

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 22, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ children: [new TextRun({ text: 'AYLAR', bold: true, size: 20 })] })],
                }),
                new TableCell({
                  width: { size: 78, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ children: [new TextRun({ text: 'PLANLANAN FAALİYETLER VE ÇALIŞMALAR', bold: true, size: 20 })] })],
                }),
              ],
            }),
            ...planRows.map(
              (item) =>
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 22, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: item.ay, bold: true, size: 19 })] })],
                    }),
                    new TableCell({
                      width: { size: 78, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: cleanDocText(item.faaliyet), size: 19 })] })],
                    }),
                  ],
                })
            ),
          ],
        }),
        new Paragraph({
          spacing: { before: 250, after: 100 },
          children: [
            new TextRun({
              text: `Danışman Öğretmen: ${advisorTeacher1} (İmza)                           UYGUNDUR - ${principalName} (Okul Müdürü)`,
              bold: true,
              size: 20,
            }),
          ],
        })
      );

      // Section 4: GÖREVLİ ÖĞRENCİ LİSTESİ
      children.push(
        new Paragraph({
          text: '4. SEÇİLEN KURULLAR VE GÖREVLİ ÖĞRENCİ LİSTESİ',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { before: 200, after: 150 },
        })
      );
      const studentRows = [
        ['Kulüp Başkanı', studentPresident],
        ['Kulüp Başkan Yardımcısı', studentVicePresident],
        ['Kulüp Sekreteri (Yazman)', studentSecretary],
        ['Kulüp Saymanı', studentTreasurer],
        ['Pano Düzenleme Komisyonu', 'Asil ve Yedek Kulüp Öğrencileri'],
        ['Yazı İnceleme ve Seçme Komisyonu', 'Asil ve Yedek Kulüp Öğrencileri'],
      ];
      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 35, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ children: [new TextRun({ text: 'GÖREV / ORGAN', bold: true, size: 20 })] })],
                }),
                new TableCell({
                  width: { size: 65, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({ children: [new TextRun({ text: 'ÖĞRENCİ ADI SOYADI - SINIFI', bold: true, size: 20 })] }),
                  ],
                }),
              ],
            }),
            ...studentRows.map(
              ([role, name]) =>
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 35, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: role, bold: true, size: 19 })] })],
                    }),
                    new TableCell({
                      width: { size: 65, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: name, size: 19 })] })],
                    }),
                  ],
                })
            ),
          ],
        }),
        new Paragraph({
          spacing: { before: 250, after: 100 },
          children: [
            new TextRun({
              text: `Danışman Öğretmen: ${advisorTeacher1} (İmza)                           UYGUNDUR - ${principalName} (Okul Müdürü)`,
              bold: true,
              size: 20,
            }),
          ],
        })
      );

      // Section 5: FAALİYET RAPORU
      children.push(
        new Paragraph({
          text: '5. YIL SONU FAALİYET RAPORU',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { before: 200, after: 150 },
        })
      );
      const faalRows =
        currentClub.faaliyetTable && currentClub.faaliyetTable.length > 0
          ? currentClub.faaliyetTable
          : [
              { aylar: 'EYLÜL - EKİM', faaliyetler: 'Kulübün kurulması, genel kurul toplantısı, görev dağılımı ve yıllık planın idareye sunulması.' },
              { aylar: 'KASIM - ARALIK', faaliyetler: 'Belirli günler ve haftalar panosu, toplum hizmeti çalışmalarının başlatılması.' },
              { aylar: 'OCAK - ŞUBAT', faaliyetler: '1. Dönem faaliyetlerinin değerlendirilmesi, 2. dönem etkinlik planlaması.' },
              { aylar: 'MART - NİSAN', faaliyetler: 'Kulüp projelerinin uygulanması, okul içi yarışma ve seminerlerin yapılması.' },
              { aylar: 'MAYIS - HAZİRAN', faaliyetler: 'Yıl sonu faaliyet raporunun hazırlanması, Sosyal Etkinlik Modülü veri girişleri ve dosyanın idareye teslimi.' },
            ];

      children.push(
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  children: [new Paragraph({ children: [new TextRun({ text: 'AYLAR', bold: true, size: 20 })] })],
                }),
                new TableCell({
                  width: { size: 75, type: WidthType.PERCENTAGE },
                  children: [
                    new Paragraph({ children: [new TextRun({ text: 'GERÇEKLEŞTİRİLEN FAALİYETLER', bold: true, size: 20 })] }),
                  ],
                }),
              ],
            }),
            ...faalRows.map(
              (fr) =>
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: fr.aylar, bold: true, size: 19 })] })],
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      children: [new Paragraph({ children: [new TextRun({ text: cleanDocText(fr.faaliyetler), size: 19 })] })],
                    }),
                  ],
                })
            ),
          ],
        }),
        new Paragraph({
          spacing: { before: 250, after: 100 },
          children: [
            new TextRun({
              text: `Danışman Öğretmen: ${advisorTeacher1} (İmza)                           UYGUNDUR - ${principalName} (Okul Müdürü)`,
              bold: true,
              size: 20,
            }),
          ],
        })
      );

      // Section 6: VELİ İZİN BELGESİ & ONAY
      children.push(
        new Paragraph({
          text: '6. EK-5 SOSYAL ETKİNLİK VELİ İZİN BELGESİ',
          heading: HeadingLevel.HEADING_1,
          pageBreakBefore: true,
          spacing: { before: 200, after: 150 },
        }),
        new Paragraph({
          text: `Velisi bulunduğum ............ sınıfı .......... nolu ........................................ isimli öğrencinin ${academicYear} eğitim öğretim yılında ${schoolName} ${currentClub.name} kapsamında yürütülecek sosyal etkinlik, yarışma, gezi ve toplum hizmeti faaliyetlerine katılmasına izin veriyorum.`,
          spacing: { after: 200 },
        }),
        new Paragraph({
          text: 'Adres: ................................................................   Telefon: ..............................................................',
          spacing: { after: 150 },
        }),
        new Paragraph({
          text: 'Veli Adı Soyadı: .....................................................   İmza: .........................   Tarih: … / … / 20..',
          spacing: { after: 300 },
        }),
        new Paragraph({
          text: `Danışman Öğretmen: ${advisorTeacher1} (İmza)                    UYGUNDUR - ${principalName} (Okul Müdürü İmza/Mühür)`,
          spacing: { before: 300 },
        })
      );

      const doc = new Document({
        sections: [
          {
            properties: {
              page: {
                margin: {
                  top: 1134, // 20mm
                  right: 1134,
                  bottom: 1134,
                  left: 1134,
                },
              },
            },
            children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cleanFileName = `${currentClub.name.replace(/\s+/g, '_')}_Evraklari_2026_2027.docx`;
      a.download = cleanFileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Word oluşturma hatası:', err);
    } finally {
      setWordLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Configuration & Selection Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 no-print space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> MEB Sosyal Etkinlikler Yönetmeliği Uyumlu
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Sosyal Kulüp Evrakları ve Toplantı Tutanakları
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Kulübünüzü seçin, bilgilerinizi girin; 2026-2027 yılı tüm resmi kulüp dosyasını tek tıkla Word (.docx) veya PDF olarak alın.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportWord}
              disabled={!currentClub || loading || wordLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-blue-600/20 transition-all disabled:opacity-50"
            >
              {wordLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
              Word (.docx) İndir
            </button>
            <button
              type="button"
              onClick={handlePrint}
              disabled={!currentClub || loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              Tüm Evrakları PDF İndir / Yazdır
            </button>
          </div>
        </div>

        {/* Step 1: Club Selection Grid */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              1. Kulüp Seçiniz ({clubsCatalog.length} Kulüp Mevcut)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={clubSearch}
                onChange={(e) => setClubSearch(e.target.value)}
                placeholder="Kulüp adı ara..."
                className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto p-1 rounded-2xl border border-slate-100 bg-slate-50/50">
            {filteredClubs.map((club) => (
              <button
                key={club.id}
                type="button"
                onClick={() => setSelectedClubId(club.id)}
                className={`p-3 rounded-xl text-left transition-all flex items-start gap-2.5 ${
                  selectedClubId === club.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold scale-[1.02]'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/70 font-medium'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-black ${
                    selectedClubId === club.id ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600'
                  }`}
                >
                  &diams;
                </div>
                <div className="text-xs leading-snug line-clamp-2">{club.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Form Fields */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            2. Okul, Öğretmen ve Öğrenci Bilgileri (Evraklara Otomatik Yerleştirilir)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">İl / İlçe</label>
              <input
                type="text"
                value={cityDistrict}
                onChange={(e) => setCityDistrict(e.target.value)}
                placeholder="Örn: İstanbul / Kadıköy"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Okul Adı</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Örn: Atatürk Ortaokulu"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Eğitim Öğretim Yılı</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder="2026-2027"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Danışman Öğretmen 1</label>
              <input
                type="text"
                value={advisorTeacher1}
                onChange={(e) => setAdvisorTeacher1(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Danışman Öğretmen 2 (İsteğe Bağlı)</label>
              <input
                type="text"
                value={advisorTeacher2}
                onChange={(e) => setAdvisorTeacher2(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Okul Müdürü</label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                placeholder="Ad Soyad"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">1. Dönem Toplantı Tarihi &amp; Saati</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={meetingDate1}
                  onChange={(e) => setMeetingDate1(e.target.value)}
                  placeholder="25.09.2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
                <input
                  type="text"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  placeholder="13:30"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kulüp Başkanı (Öğrenci)</label>
              <input
                type="text"
                value={studentPresident}
                onChange={(e) => setStudentPresident(e.target.value)}
                placeholder="Ad Soyad (Sınıf)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kulüp Başkan Yrd. (Öğrenci)</label>
              <input
                type="text"
                value={studentVicePresident}
                onChange={(e) => setStudentVicePresident(e.target.value)}
                placeholder="Ad Soyad (Sınıf)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kulüp Sekreteri / Yazman</label>
              <input
                type="text"
                value={studentSecretary}
                onChange={(e) => setStudentSecretary(e.target.value)}
                placeholder="Ad Soyad (Sınıf)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Kulüp Saymanı</label>
              <input
                type="text"
                value={studentTreasurer}
                onChange={(e) => setStudentTreasurer(e.target.value)}
                placeholder="Ad Soyad (Sınıf)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Toplantı Yeri</label>
              <input
                type="text"
                value={meetingPlace}
                onChange={(e) => setMeetingPlace(e.target.value)}
                placeholder="Örn: Öğretmenler Odası"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Document Tab Selector & Live Preview */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 no-print space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              {currentClub?.name || 'Kulüp Evrakları'} Dosyası
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Görüntülemek istediğiniz evrak sekmesini seçin veya &quot;Tüm Evrakları PDF İndir&quot; butonuna tıklayın.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            PDF / Resmi Baskı
          </button>
        </div>

        {/* Document Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {[
            { id: 'all', label: 'Tüm Evraklar (Dosya)', icon: Layers },
            { id: 'tuzuk', label: '1. Kulüp İç Tüzüğü', icon: Shield },
            { id: 'toplanti1', label: '2. 1. Dönem Tutanağı', icon: Users },
            { id: 'plan', label: '3. Yıllık Çalışma Planı', icon: FileText },
            { id: 'ogrenciler', label: '4. Görevli Öğrenci Listesi', icon: User },
            { id: 'rapor', label: '5. Faaliyet Raporu', icon: CheckCircle2 },
            { id: 'veli', label: '6. Ek-5 Veli İzin Belgesi', icon: School },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDocTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDocTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Interactive Screen Preview */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="text-sm font-medium">Kulüp evrakları hazırlanıyor...</span>
          </div>
        ) : !currentClub ? (
          <div className="py-16 text-center text-slate-400">Lütfen bir kulüp seçiniz.</div>
        ) : (
          <div className="bg-slate-50/70 border border-slate-200 rounded-2xl p-6 space-y-6 max-h-[700px] overflow-y-auto">
            {/* Tüzük Tab */}
            {(activeDocTab === 'all' || activeDocTab === 'tuzuk') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="text-center border-b pb-3 space-y-1">
                  <div className="text-xs font-bold uppercase text-slate-500">T.C. {cityDistrict}</div>
                  <div className="text-sm font-black uppercase text-slate-900">{schoolName}</div>
                  <div className="text-xs font-bold uppercase text-slate-500">MİLLÎ EĞİTİM BAKANLIĞI SOSYAL ETKİNLİKLER YÖNETMELİĞİ</div>
                  <div className="text-sm font-extrabold text-indigo-700">
                    {academicYear} {currentClub.name.toUpperCase()} İÇ TÜZÜĞÜ
                  </div>
                </div>
                <div className="space-y-2.5 text-xs text-slate-700 leading-relaxed">
                  {(currentClub.tuzukParas || []).map((para, i) => {
                    const isHeader = para.startsWith('BÖLÜM') || para.startsWith('T.C.');
                    const isMadde = para.startsWith('Madde');
                    return (
                      <p
                        key={i}
                        className={
                          isHeader
                            ? 'font-bold text-slate-900 pt-2 text-[13px] border-b border-slate-100 pb-1 text-indigo-950'
                            : isMadde
                            ? 'text-slate-800 font-medium'
                            : 'text-slate-600'
                        }
                      >
                        {cleanDocText(para)}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Toplantı Tutanağı Tab */}
            {(activeDocTab === 'all' || activeDocTab === 'toplanti1') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="text-center border-b pb-3 space-y-1">
                  <div className="text-xs font-bold uppercase text-slate-500">T.C. {cityDistrict}</div>
                  <div className="text-sm font-black uppercase text-slate-900">{schoolName}</div>
                  <div className="text-sm font-extrabold text-indigo-700">
                    {academicYear} {currentClub.name.toUpperCase()} 1. DÖNEM GENEL KURUL TOPLANTI TUTANAĞI &amp; ALINAN KARARLAR
                  </div>
                </div>
                <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 font-medium">
                  <div><strong>Toplantı Tarihi ve Saati:</strong> {meetingDate1} - {meetingTime}</div>
                  <div><strong>Toplantı Yeri:</strong> {meetingPlace}</div>
                  <div><strong>Danışman Öğretmenler:</strong> {advisorTeacher1}{advisorTeacher2 ? `, ${advisorTeacher2}` : ''}</div>
                </div>
                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {(currentClub.toplantiParas || []).map((para, i) => {
                    const isHead = para.includes('GÜNDEM MADDELERİ') || para.includes('GÖRÜŞÜLEN KONULAR') || para.startsWith('1. DÖNEM');
                    const isKarar = para.startsWith('Karar');
                    return (
                      <p
                        key={i}
                        className={
                          isHead
                            ? 'font-bold text-slate-900 pt-2 border-b border-slate-100 pb-1 text-sm'
                            : isKarar
                            ? 'bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium text-slate-800'
                            : 'text-slate-600'
                        }
                      >
                        {cleanDocText(para)}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Yıllık Çalışma Planı Tab */}
            {(activeDocTab === 'all' || activeDocTab === 'plan') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="text-center border-b pb-3 space-y-1">
                  <div className="text-xs font-bold uppercase text-slate-500">T.C. {cityDistrict}</div>
                  <div className="text-sm font-black uppercase text-slate-900">{schoolName}</div>
                  <div className="text-xs font-bold uppercase text-slate-500">MİLLÎ EĞİTİM BAKANLIĞI SOSYAL ETKİNLİKLER YÖNETMELİĞİ (EK-7/b)</div>
                  <div className="text-sm font-extrabold text-indigo-700">
                    {academicYear} {currentClub.name.toUpperCase()} YILLIK ÇALIŞMA PLANI
                  </div>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 font-bold text-slate-800">
                      <tr>
                        <th className="py-2.5 px-4 w-36">Aylar</th>
                        <th className="py-2.5 px-4">Planlanan Faaliyetler ve Çalışmalar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(currentClub.monthlyPlanTable && currentClub.monthlyPlanTable.length > 0
                        ? currentClub.monthlyPlanTable
                        : [
                            { ay: 'EYLÜL', faaliyet: 'Kulüp genel kurulu, yönetim seçimi, Sosyal Etkinlik Modülü kayıtları ve yıllık plan onayı.' },
                            { ay: 'EKİM', faaliyet: 'Kulüp panosunun düzenlenmesi, 29 Ekim Cumhuriyet Bayramı çalışmaları.' },
                            { ay: 'KASIM', faaliyet: '10 Kasım Atatürk’ü Anma ve 24 Kasım Öğretmenler Günü etkinlikleri, kulüp farkındalık çalışması.' },
                            { ay: 'ARALIK', faaliyet: 'Toplum hizmeti projesinin başlatılması, okul içi seminer veya atölye çalışması.' },
                            { ay: 'OCAK', faaliyet: '1. Dönem faaliyetlerinin değerlendirilmesi, karar defterinin işlenmesi ve ara rapor hazırlanması.' },
                            { ay: 'ŞUBAT', faaliyet: '2. Dönem başı toplantısı, bahar dönemi etkinlik takviminin güncellenmesi.' },
                            { ay: 'MART', faaliyet: '18 Mart Çanakkale Zaferi anması, kulüp branşına özel bahar projesinin uygulanması.' },
                            { ay: 'NİSAN', faaliyet: '23 Nisan kutlamaları, okul içi yarışma, sergi veya söyleşi düzenlenmesi.' },
                            { ay: 'MAYIS', faaliyet: 'Kulüp projelerinin tamamlanması, okul sergisi ve kapanış etkinliklerinin icrası.' },
                            { ay: 'HAZİRAN', faaliyet: 'Yıl sonu faaliyet raporunun hazırlanması, Sosyal Etkinlik Modülü veri girişleri ve dosya teslimi.' },
                          ]
                      ).map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-bold text-indigo-700 align-top">{row.ay}</td>
                          <td className="py-2.5 px-4 text-slate-700 align-top leading-relaxed">{cleanDocText(row.faaliyet)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Görevli Öğrenciler Tab */}
            {(activeDocTab === 'all' || activeDocTab === 'ogrenciler') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="text-center border-b pb-3 space-y-1">
                  <div className="text-xs font-bold uppercase text-slate-500">T.C. {cityDistrict}</div>
                  <div className="text-sm font-black uppercase text-slate-900">{schoolName}</div>
                  <div className="text-sm font-extrabold text-indigo-700">
                    {academicYear} {currentClub.name.toUpperCase()} SEÇİLEN KURULLAR VE GÖREVLİ ÖĞRENCİ LİSTESİ
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Yönetim Kurulu</span>
                    <ul className="space-y-1 text-slate-600">
                      <li><strong>Başkan:</strong> {studentPresident}</li>
                      <li><strong>Başkan Yrd:</strong> {studentVicePresident}</li>
                      <li><strong>Sekreter (Yazman):</strong> {studentSecretary}</li>
                      <li><strong>Sayman:</strong> {studentTreasurer}</li>
                    </ul>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 block mb-1">Denetim ve Komisyonlar</span>
                    <ul className="space-y-1 text-slate-600">
                      <li><strong>Pano Düzenleme:</strong> Asil Üyeler</li>
                      <li><strong>Yazı İnceleme:</strong> Asil Üyeler</li>
                      <li><strong>Yarışma / Etkinlik:</strong> Asil Üyeler</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Yıl Sonu Faaliyet Raporu Tab */}
            {(activeDocTab === 'all' || activeDocTab === 'rapor') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="text-center border-b pb-3 space-y-1">
                  <div className="text-xs font-bold uppercase text-slate-500">T.C. {cityDistrict}</div>
                  <div className="text-sm font-black uppercase text-slate-900">{schoolName}</div>
                  <div className="text-sm font-extrabold text-indigo-700">
                    {academicYear} {currentClub.name.toUpperCase()} YIL SONU FAALİYET RAPORU
                  </div>
                </div>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 font-bold text-slate-800">
                      <tr>
                        <th className="py-2.5 px-4 w-36">Aylar</th>
                        <th className="py-2.5 px-4">Gerçekleştirilen Faaliyetler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(currentClub.faaliyetTable && currentClub.faaliyetTable.length > 0
                        ? currentClub.faaliyetTable
                        : [
                            { aylar: 'EYLÜL - EKİM', faaliyetler: 'Kulübün kurulması, genel kurul toplantısı, görev dağılımı ve yıllık planın idareye sunulması.' },
                            { aylar: 'KASIM - ARALIK', faaliyetler: 'Belirli günler ve haftalar panosu, toplum hizmeti çalışmalarının başlatılması.' },
                            { aylar: 'OCAK - ŞUBAT', faaliyetler: '1. Dönem faaliyetlerinin değerlendirilmesi, 2. dönem etkinlik planlaması.' },
                            { aylar: 'MART - NİSAN', faaliyetler: 'Kulüp projelerinin uygulanması, okul içi yarışma ve seminerlerin yapılması.' },
                            { aylar: 'MAYIS - HAZİRAN', faaliyetler: 'Yıl sonu faaliyet raporunun hazırlanması, Sosyal Etkinlik Modülü veri girişleri ve dosyanın idareye teslimi.' },
                          ]
                      ).map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 font-bold text-slate-800 align-top">{row.aylar}</td>
                          <td className="py-2.5 px-4 text-slate-600 align-top leading-relaxed">{cleanDocText(row.faaliyetler)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Veli İzin Belgesi Tab */}
            {(activeDocTab === 'all' || activeDocTab === 'veli') && (
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <div className="text-center border-b pb-3 space-y-1">
                  <div className="text-xs font-bold uppercase text-slate-500">EK-5</div>
                  <div className="text-sm font-black uppercase text-slate-900">
                    SOSYAL ETKİNLİK VELİ İZİN BELGESİ
                  </div>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                  <p>
                    Velisi bulunduğum ............ sınıfı .......... nolu ........................................ isimli öğrencinin … / … / 20.. tarihinde {schoolName} {currentClub.name} kapsamında planlanan sosyal etkinlik / toplum hizmeti / yarışma / gezi çalışmalarına katılmasında herhangi bir sakınca görmediğimi bildiririm.
                  </p>
                  <div className="pt-4 flex justify-between items-end">
                    <div>
                      <div><strong>Adres:</strong> ............................................................</div>
                      <div><strong>Telefon:</strong> ..........................................................</div>
                    </div>
                    <div className="text-right">
                      <div>… / … / 20..</div>
                      <div className="font-bold mt-1">Veli Adı Soyadı &amp; İmza</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* PRINT-ONLY OFFICIAL MEB CLUB DOSSIER (A4 Multi-Page Layout)    */}
      {/* ============================================================== */}
      <div className="hidden print:block font-sans text-black bg-white p-2 leading-normal">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: A4 portrait;
              margin: 15mm 12mm 15mm 12mm;
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              color: #000;
              background: #fff;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .no-print {
              display: none !important;
            }
            .page-break {
              page-break-after: always;
            }
            .doc-table {
              width: 100%;
              border-collapse: collapse;
              font-size: 9pt;
            }
            .doc-table th, .doc-table td {
              border: 1px solid #000;
              padding: 5px 8px;
              vertical-align: top;
            }
            .doc-table thead {
              background-color: #f1f5f9;
            }
          }
        `}} />

        {currentClub && (
          <>
            {/* 1. KULÜP İÇ TÜZÜĞÜ */}
            <div className="page-break">
              <div className="text-center mb-4 border-b-2 border-black pb-2">
                <div className="text-xs font-bold uppercase">T.C. {cityDistrict.toUpperCase()}</div>
                <div className="text-sm font-extrabold uppercase">{schoolName.toUpperCase()}</div>
                <div className="text-xs font-bold uppercase text-slate-700">SOSYAL KULÜPLER YÖNETMELİĞİ</div>
                <div className="text-xs font-black uppercase mt-1">
                  {academicYear} EĞİTİM VE ÖĞRETİM YILI {currentClub.name.toUpperCase()} İÇ TÜZÜĞÜ
                </div>
              </div>

              <div className="space-y-2.5 text-[9pt] text-justify leading-relaxed">
                {(currentClub.tuzukParas || []).map((p, idx) => (
                  <p key={idx}>{cleanDocText(p)}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 mt-8 text-center text-xs">
                <div>
                  <div className="font-bold">{advisorTeacher1}</div>
                  {advisorTeacher2 && <div className="font-bold">{advisorTeacher2}</div>}
                  <div className="text-[9pt]">Danışman Öğretmen(ler)</div>
                </div>
                <div>
                  <div className="font-bold">UYGUNDUR</div>
                  <div className="text-[9pt]">{meetingDate1}</div>
                  <div className="font-bold mt-1">{principalName}</div>
                  <div className="text-[9pt]">Okul Müdürü</div>
                </div>
              </div>
            </div>

            {/* 2. 1. DÖNEM TOPLANTI TUTANAĞI & KARARLARI */}
            <div className="page-break">
              <div className="text-center mb-4 border-b-2 border-black pb-2">
                <div className="text-xs font-bold uppercase">T.C. {cityDistrict.toUpperCase()}</div>
                <div className="text-sm font-extrabold uppercase">{schoolName.toUpperCase()}</div>
                <div className="text-xs font-black uppercase mt-1">
                  {academicYear} {currentClub.name.toUpperCase()} 1. DÖNEM TOPLANTI TUTANAĞI VE KARARLARI
                </div>
              </div>

              <div className="border border-black p-2 mb-3 text-[8.5pt] grid grid-cols-3 gap-2 bg-slate-50 font-medium">
                <div><span className="font-bold">Toplantı Tarihi:</span> {meetingDate1}</div>
                <div><span className="font-bold">Toplantı Saati:</span> {meetingTime}</div>
                <div><span className="font-bold">Toplantı Yeri:</span> {meetingPlace}</div>
              </div>

              <div className="space-y-2 text-[9pt] text-justify leading-relaxed">
                {(currentClub.toplantiParas || []).map((p, idx) => (
                  <p key={idx}>{cleanDocText(p)}</p>
                ))}
              </div>

              <div className="grid grid-cols-2 mt-8 text-center text-xs">
                <div>
                  <div className="font-bold">{advisorTeacher1}</div>
                  {advisorTeacher2 && <div className="font-bold">{advisorTeacher2}</div>}
                  <div className="text-[9pt]">Danışman Öğretmen(ler)</div>
                </div>
                <div>
                  <div className="font-bold">UYGUNDUR</div>
                  <div className="text-[9pt]">{meetingDate1}</div>
                  <div className="font-bold mt-1">{principalName}</div>
                  <div className="text-[9pt]">Okul Müdürü</div>
                </div>
              </div>
            </div>

            {/* 3. YILLIK ÇALIŞMA PLANI */}
            <div className="page-break">
              <div className="text-center mb-4 border-b-2 border-black pb-2">
                <div className="text-xs font-bold uppercase">T.C. {cityDistrict.toUpperCase()}</div>
                <div className="text-sm font-extrabold uppercase">{schoolName.toUpperCase()}</div>
                <div className="text-xs font-bold uppercase text-slate-700">MİLLÎ EĞİTİM BAKANLIĞI SOSYAL ETKİNLİKLER YÖNETMELİĞİ (EK-7/b)</div>
                <div className="text-xs font-black uppercase mt-1">
                  {academicYear} {currentClub.name.toUpperCase()} YILLIK ÇALIŞMA PLANI
                </div>
              </div>

              <table className="doc-table mb-4">
                <thead>
                  <tr className="font-bold text-center">
                    <th style={{ width: '22%' }}>AYLAR</th>
                    <th style={{ width: '78%' }}>PLANLANAN FAALİYETLER VE ÇALIŞMALAR</th>
                  </tr>
                </thead>
                <tbody>
                  {(currentClub.monthlyPlanTable && currentClub.monthlyPlanTable.length > 0
                    ? currentClub.monthlyPlanTable
                    : [
                        { ay: 'EYLÜL', faaliyet: 'Kulüp genel kurulu, yönetim seçimi, Sosyal Etkinlik Modülü kayıtları ve yıllık plan onayı.' },
                        { ay: 'EKİM', faaliyet: 'Kulüp panosunun düzenlenmesi, 29 Ekim Cumhuriyet Bayramı çalışmaları.' },
                        { ay: 'KASIM', faaliyet: '10 Kasım Atatürk’ü Anma ve 24 Kasım Öğretmenler Günü etkinlikleri, kulüp farkındalık çalışması.' },
                        { ay: 'ARALIK', faaliyet: 'Toplum hizmeti projesinin başlatılması, okul içi seminer veya atölye çalışması.' },
                        { ay: 'OCAK', faaliyet: '1. Dönem faaliyetlerinin değerlendirilmesi, karar defterinin işlenmesi ve ara rapor hazırlanması.' },
                        { ay: 'ŞUBAT', faaliyet: '2. Dönem başı toplantısı, bahar dönemi etkinlik takviminin güncellenmesi.' },
                        { ay: 'MART', faaliyet: '18 Mart Çanakkale Zaferi anması, kulüp branşına özel bahar projesinin uygulanması.' },
                        { ay: 'NİSAN', faaliyet: '23 Nisan kutlamaları, okul içi yarışma, sergi veya söyleşi düzenlenmesi.' },
                        { ay: 'MAYIS', faaliyet: 'Kulüp projelerinin tamamlanması, okul sergisi ve kapanış etkinliklerinin icrası.' },
                        { ay: 'HAZİRAN', faaliyet: 'Yıl sonu faaliyet raporunun hazırlanması, Sosyal Etkinlik Modülü veri girişleri ve dosya teslimi.' },
                      ]
                  ).map((item, idx) => (
                    <tr key={idx}>
                      <td className="font-bold text-center align-top">{item.ay}</td>
                      <td className="text-justify leading-relaxed align-top">{cleanDocText(item.faaliyet)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="grid grid-cols-2 mt-8 text-center text-xs">
                <div>
                  <div className="font-bold">{advisorTeacher1}</div>
                  {advisorTeacher2 && <div className="font-bold">{advisorTeacher2}</div>}
                  <div className="text-[9pt]">Danışman Öğretmen(ler)</div>
                </div>
                <div>
                  <div className="font-bold">UYGUNDUR</div>
                  <div className="text-[9pt]">{meetingDate1}</div>
                  <div className="font-bold mt-1">{principalName}</div>
                  <div className="text-[9pt]">Okul Müdürü</div>
                </div>
              </div>
            </div>

            {/* 4. GÖREVLİ ÖĞRENCİ LİSTESİ & SEÇİLEN KURULLAR */}
            <div className="page-break">
              <div className="text-center mb-4 border-b-2 border-black pb-2">
                <div className="text-xs font-bold uppercase">T.C. {cityDistrict.toUpperCase()}</div>
                <div className="text-sm font-extrabold uppercase">{schoolName.toUpperCase()}</div>
                <div className="text-xs font-black uppercase mt-1">
                  {academicYear} {currentClub.name.toUpperCase()} GÖREVLİ ÖĞRENCİ VE KURUL LİSTESİ
                </div>
              </div>

              <table className="doc-table mb-4">
                <thead>
                  <tr className="font-bold text-center">
                    <th style={{ width: '40%' }}>GÖREVİ / ORGAN</th>
                    <th style={{ width: '60%' }}>ÖĞRENCİNİN ADI SOYADI - SINIFI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold">Kulüp Başkanı</td>
                    <td>{studentPresident}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Kulüp Başkan Yardımcısı</td>
                    <td>{studentVicePresident}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Yazman / Sekreter</td>
                    <td>{studentSecretary}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Sayman</td>
                    <td>{studentTreasurer}</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Pano Düzenleme Kurulu</td>
                    <td>Asil ve Yedek Kulüp Öğrencileri</td>
                  </tr>
                  <tr>
                    <td className="font-bold">Yazı İnceleme Kurulu</td>
                    <td>Asil ve Yedek Kulüp Öğrencileri</td>
                  </tr>
                </tbody>
              </table>

              <div className="grid grid-cols-2 mt-8 text-center text-xs">
                <div>
                  <div className="font-bold">{advisorTeacher1}</div>
                  <div className="text-[9pt]">Danışman Öğretmen</div>
                </div>
                <div>
                  <div className="font-bold">UYGUNDUR</div>
                  <div className="font-bold mt-1">{principalName}</div>
                  <div className="text-[9pt]">Okul Müdürü</div>
                </div>
              </div>
            </div>

            {/* 5. YIL SONU FAALİYET RAPORU & VELİ İZİN BELGESİ */}
            <div className="page-break">
              <div className="text-center mb-4 border-b-2 border-black pb-2">
                <div className="text-xs font-bold uppercase">T.C. {cityDistrict.toUpperCase()}</div>
                <div className="text-sm font-extrabold uppercase">{schoolName.toUpperCase()}</div>
                <div className="text-xs font-black uppercase mt-1">
                  {academicYear} {currentClub.name.toUpperCase()} YIL SONU FAALİYET RAPORU
                </div>
              </div>

              <table className="doc-table mb-6">
                <thead>
                  <tr className="font-bold text-center">
                    <th style={{ width: '25%' }}>AYLAR</th>
                    <th style={{ width: '75%' }}>GERÇEKLEŞTİRİLEN FAALİYETLER</th>
                  </tr>
                </thead>
                <tbody>
                  {(currentClub.faaliyetTable && currentClub.faaliyetTable.length > 0
                    ? currentClub.faaliyetTable
                    : [
                        { aylar: 'EYLÜL - EKİM', faaliyetler: 'Kulübün kurulması, genel kurul toplantısı, görev dağılımı ve yıllık planın idareye sunulması.' },
                        { aylar: 'KASIM - ARALIK', faaliyetler: 'Belirli günler ve haftalar panosu, toplum hizmeti çalışmalarının başlatılması.' },
                        { aylar: 'OCAK - ŞUBAT', faaliyetler: '1. Dönem faaliyetlerinin değerlendirilmesi, 2. dönem etkinlik planlaması.' },
                        { aylar: 'MART - NİSAN', faaliyetler: 'Kulüp projelerinin uygulanması, okul içi yarışma ve seminerlerin yapılması.' },
                        { aylar: 'MAYIS - HAZİRAN', faaliyetler: 'Yıl sonu faaliyet raporunun hazırlanması, Sosyal Etkinlik Modülü veri girişleri ve dosyanın idareye teslimi.' },
                      ]
                  ).map((row, i) => (
                    <tr key={i}>
                      <td className="font-bold text-center">{row.aylar}</td>
                      <td>{cleanDocText(row.faaliyetler)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* EK-5 Veli İzin Belgesi */}
              <div className="border border-black p-3 rounded text-[8.5pt] space-y-2 mt-4">
                <div className="text-center font-bold">EK-5 SOSYAL ETKİNLİK VELİ İZİN BELGESİ</div>
                <p className="text-justify leading-relaxed">
                  Velisi bulunduğum ............ sınıfı .......... nolu ........................................ isimli öğrencinin {academicYear} eğitim öğretim yılında {schoolName} {currentClub.name} kapsamında yürütülecek sosyal etkinlik, yarışma, gezi ve toplum hizmeti faaliyetlerine katılmasına izin veriyorum.
                </p>
                <div className="flex justify-between pt-2">
                  <div>Adres: ................................................................<br />Telefon: ..............................................................</div>
                  <div className="text-right font-bold">… / … / 20..<br />Veli Adı Soyadı / İmza</div>
                </div>
              </div>

              <div className="grid grid-cols-2 mt-6 text-center text-xs">
                <div>
                  <div className="font-bold">{advisorTeacher1}</div>
                  <div className="text-[9pt]">Danışman Öğretmen</div>
                </div>
                <div>
                  <div className="font-bold">UYGUNDUR</div>
                  <div className="font-bold mt-1">{principalName}</div>
                  <div className="text-[9pt]">Okul Müdürü</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
