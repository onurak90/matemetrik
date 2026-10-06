'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, FileText, Download, Printer, Copy, Check, Sparkles,
  School, User, Layers, Search, ChevronLeft, ChevronRight,
  BookOpen, Clock, HeartHandshake, CheckCircle2, AlertCircle,
  FileSpreadsheet, BookmarkCheck, ArrowRight, Settings, Eye, Sliders
} from 'lucide-react';
import * as XLSX from 'xlsx';
import {
  ACADEMIC_WEEKS_2026_2027,
  AcademicWeekInfo,
  NormalizedWeek,
  groupPlanIntoWeeks,
  buildOfficialDailyLessonPlan,
  generateWeeklyDefterEntries,
  REHBERLIK_PLAN_36_HAFTA,
  IYEP_CATALOG,
  generatePlanArchiveCatalog,
  PlanArchiveItem,
} from '@/lib/planRobotData';
import { exportDailyPlanToDocx, exportWeeklyDefterToDocx } from '@/lib/planDocxExporter';

interface PlanCatalogItem {
  id: string;
  grade: number;
  subject: string;
  title: string;
  weeksCount: number;
  defaultHours: string;
}

export default function DailyAndAnnualPlanRobot() {
  // Navigation / Selection State
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('Türkçe');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(4);
  const [activeTab, setActiveTab] = useState<'gunluk' | 'defter' | 'yillik' | 'iyep_rehberlik' | 'arsiv'>('gunluk');
  const [iyepOrRehberlik, setIyepOrRehberlik] = useState<'iyep' | 'rehberlik'>('rehberlik');

  // Teacher / School Customization
  const [schoolName, setSchoolName] = useState<string>('Cumhuriyet İlkokulu');
  const [teacherName, setTeacherName] = useState<string>('Öğretmen');
  const [classBranch, setClassBranch] = useState<string>('1/A');
  const [academicYear, setAcademicYear] = useState<string>('2026-2027');
  const [principalName, setPrincipalName] = useState<string>('Okul Müdürü');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // Data Loading
  const [catalog, setCatalog] = useState<PlanCatalogItem[]>([]);
  const [loadingPlan, setLoadingPlan] = useState<boolean>(false);
  const [currentPlanRaw, setCurrentPlanRaw] = useState<any>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Archive Filter State
  const [archiveSearch, setArchiveSearch] = useState<string>('');
  const [archiveGrade, setArchiveGrade] = useState<number | 'all'>('all');
  const [archiveType, setArchiveType] = useState<string>('all');

  // Grade Subjects Map
  const gradeSubjectsMap: { [key: number]: string[] } = {
    1: ['Türkçe', 'Matematik', 'Hayat Bilgisi', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Oyun'],
    2: ['Türkçe', 'Matematik', 'Hayat Bilgisi', 'İngilizce', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Oyun'],
    3: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Hayat Bilgisi', 'İngilizce', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Oyun'],
    4: ['Türkçe', 'Matematik', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'İnsan Hakları, Yurttaşlık ve Demokrasi', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Oyun'],
    5: ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Bilişim Teknolojileri ve Yazılım', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Spor'],
    6: ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Bilişim Teknolojileri ve Yazılım', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Spor'],
    7: ['Matematik', 'Türkçe', 'Fen Bilimleri', 'Sosyal Bilgiler', 'İngilizce', 'Teknoloji ve Tasarım', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Spor'],
    8: ['Matematik', 'Türkçe', 'Fen Bilimleri', 'T.C. İnkılap Tarihi ve Atatürkçülük', 'İngilizce', 'Teknoloji ve Tasarım', 'Müzik', 'Görsel Sanatlar', 'Beden Eğitimi ve Spor'],
    9: ['Matematik'],
    10: ['Matematik', 'Matematik Tarihi ve Uygulamaları'],
    11: ['Matematik', 'Matematik Uygulamaları'],
    12: ['Matematik', 'Temel Matematik', 'Matematik Uygulamaları', 'Akademik Destek Matematik'],
  };

  // Available subjects for selected grade
  const availableSubjects = useMemo(() => {
    return gradeSubjectsMap[selectedGrade] || ['Matematik', 'Türkçe'];
  }, [selectedGrade]);

  // Load catalog on mount
  useEffect(() => {
    async function loadCatalog() {
      try {
        const res = await fetch('/api/cerceve-plan');
        if (res.ok) {
          const data = await res.json();
          if (data && data.plans) {
            setCatalog(data.plans);
          }
        }
      } catch (e) {
        console.error('Catalog fetch error:', e);
      }
    }
    loadCatalog();
  }, []);

  // Fetch plan when grade or subject changes
  useEffect(() => {
    let isCancelled = false;
    async function fetchPlan() {
      setLoadingPlan(true);
      try {
        const res = await fetch(
          `/api/cerceve-plan?grade=${selectedGrade}&subject=${encodeURIComponent(selectedSubject)}`
        );
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled) {
            setCurrentPlanRaw(data);
          }
        } else {
          if (!isCancelled) setCurrentPlanRaw(null);
        }
      } catch (e) {
        if (!isCancelled) setCurrentPlanRaw(null);
      } finally {
        if (!isCancelled) setLoadingPlan(false);
      }
    }

    // Auto-adjust subject if not in grade
    if (!availableSubjects.includes(selectedSubject)) {
      setSelectedSubject(availableSubjects[0] || 'Matematik');
    } else {
      fetchPlan();
    }

    // Update default class branch
    setClassBranch(`${selectedGrade}/A`);

    return () => {
      isCancelled = true;
    };
  }, [selectedGrade, selectedSubject, availableSubjects]);

  // Normalized weeks
  const normalizedWeeks: NormalizedWeek[] = useMemo(() => {
    if (!currentPlanRaw || !currentPlanRaw.weeks) {
      return groupPlanIntoWeeks([], '4');
    }
    return groupPlanIntoWeeks(
      currentPlanRaw.weeks,
      currentPlanRaw.defaultHours || '4',
      currentPlanRaw.dailyExtraWeeks || []
    );
  }, [currentPlanRaw]);

  // Current selected week
  const activeWeek: NormalizedWeek = useMemo(() => {
    return (
      normalizedWeeks.find((w) => w.weekNum === selectedWeekNum) ||
      normalizedWeeks[0] || {
        weekNum: selectedWeekNum,
        dates: '14 - 18 Eylül 2026',
        month: 'EYLÜL',
        hours: '4',
        unit: 'Genel Konular',
        topic: selectedSubject,
        outcomes: [`${selectedSubject} temel kazanımları.`],
        components: ['Kazanım pekiştirme etkinlikleri.'],
        assessment: 'Gözlem formu, kontrol listesi',
        values: 'Çalışkanlık, Sorumluluk',
        specialDays: '',
      }
    );
  }, [normalizedWeeks, selectedWeekNum, selectedSubject]);

  // Active full daily plan document
  const dailyLessonPlan = useMemo(() => {
    return buildOfficialDailyLessonPlan({
      schoolName,
      teacherName,
      academicYear,
      grade: selectedGrade,
      classBranch,
      subject: selectedSubject,
      week: activeWeek,
    });
  }, [schoolName, teacherName, academicYear, selectedGrade, classBranch, selectedSubject, activeWeek]);

  // Active defter entries
  const weeklyDefterEntries = useMemo(() => {
    return generateWeeklyDefterEntries(selectedSubject, selectedGrade, activeWeek);
  }, [selectedSubject, selectedGrade, activeWeek]);

  // Archive catalog
  const archiveCatalog = useMemo(() => {
    return generatePlanArchiveCatalog();
  }, []);

  const filteredArchive = useMemo(() => {
    return archiveCatalog.filter((item) => {
      if (archiveGrade !== 'all' && item.grade !== archiveGrade) return false;
      if (archiveType !== 'all' && item.planType !== archiveType) return false;
      if (archiveSearch.trim()) {
        const q = archiveSearch.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subject.toLowerCase().includes(q) ||
          item.planTypeLabel.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [archiveCatalog, archiveGrade, archiveType, archiveSearch]);

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  // Copy entire week defter entries
  const handleCopyAllDefter = () => {
    const text = weeklyDefterEntries
      .map((e) => `[${e.dayName} - ${e.periodLabel}]\n${e.entryText}`)
      .join('\n\n');
    handleCopy(text, 'all-defter');
  };

  // Copy daily plan full text
  const handleCopyDailyPlan = () => {
    const text = `T.C. MİLLÎ EĞİTİM BAKANLIĞI\n${schoolName.toUpperCase()}\n${academicYear} GÜNLÜK DERS İŞLENİŞ PLANI\n\nDers: ${dailyLessonPlan.subject}\nSınıf: ${dailyLessonPlan.grade}. Sınıf (${dailyLessonPlan.classBranch})\nHafta: ${dailyLessonPlan.weekNum}. Hafta (${dailyLessonPlan.dates})\nSüre: ${dailyLessonPlan.hours} Ders Saati\nÖğretmen: ${dailyLessonPlan.teacherName}\n\nÜnite / Tema: ${dailyLessonPlan.unit}\nKonu: ${dailyLessonPlan.topic}\n\nÖğrenme Çıktıları:\n${dailyLessonPlan.outcomes.map((o) => '- ' + o).join('\n')}\n\nSüreç Bileşenleri:\n${dailyLessonPlan.components.map((c) => '- ' + c).join('\n')}\n\nErdem-Değer-Eylem: ${dailyLessonPlan.values}\nYöntemler: ${dailyLessonPlan.methods.join(', ')}\nAraç-Gereçler: ${dailyLessonPlan.toolsMaterials.join(', ')}\n\nİŞLENİŞ:\n1. Giriş: ${dailyLessonPlan.steps.giris}\n2. Keşfetme: ${dailyLessonPlan.steps.kesfetme}\n3. Derinleştirme: ${dailyLessonPlan.steps.derinlestirme}\n4. Özet: ${dailyLessonPlan.steps.ozet}\n\nÖlçme-Değerlendirme: ${dailyLessonPlan.assessment}\nÖdev: ${dailyLessonPlan.homework}`;
    handleCopy(text, 'full-plan');
  };

  // Export annual plan to Excel
  const handleExportAnnualExcel = () => {
    const headers = [
      'AY',
      'HAFTA & TARİH',
      'SAAT',
      'ÜNİTE / TEMA',
      'KONU',
      'ÖĞRENME ÇIKTILARI (KAZANIMLAR)',
      'SÜREÇ BİLEŞENLERİ',
      'ÖLÇME VE DEĞERLENDİRME',
      'ERDEM-DEĞER-EYLEM',
      'BELİRLİ GÜN VE HAFTALAR',
    ];

    const rows = normalizedWeeks.map((w) => [
      w.month,
      `${w.weekNum}. Hafta (${w.dates})`,
      w.hours,
      w.unit,
      w.topic,
      w.outcomes.join('\n'),
      w.components.join('\n'),
      w.assessment,
      w.values,
      w.specialDays,
    ]);

    const ws = XLSX.utils.aoa_to_sheet([
      [`T.C. ${schoolName.toUpperCase()}`],
      [`${academicYear} EĞİTİM ÖĞRETİM YILI ${selectedGrade}. SINIF ${selectedSubject.toUpperCase()} DERSİ MAARİF MODELİ YILLIK ÇERÇEVE PLANI`],
      [`Öğretmen: ${teacherName}   |   Sınıf: ${classBranch}   |   Onay: ${principalName}`],
      [],
      headers,
      ...rows,
    ]);

    // Set column widths
    ws['!cols'] = [
      { wch: 10 },
      { wch: 20 },
      { wch: 8 },
      { wch: 25 },
      { wch: 25 },
      { wch: 45 },
      { wch: 40 },
      { wch: 25 },
      { wch: 20 },
      { wch: 25 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${selectedGrade}_Sinif_${selectedSubject.slice(0, 15)}`);
    XLSX.writeFile(wb, `${selectedGrade}_Sinif_${selectedSubject.replace(/\s+/g, '_')}_Yillik_Plan_2026_2027.xlsx`);
  };

  // Open item in robot from archive
  const handleOpenFromArchive = (item: PlanArchiveItem) => {
    setSelectedGrade(item.grade);
    if (item.subject && item.subject !== 'Tüm Dersler' && availableSubjects.includes(item.subject)) {
      setSelectedSubject(item.subject);
    }
    if (item.weekNum) {
      setSelectedWeekNum(item.weekNum);
    }
    if (item.planType === 'defter') {
      setActiveTab('defter');
    } else if (item.planType === 'yillik') {
      setActiveTab('yillik');
    } else if (item.planType === 'iyep' || item.planType === 'rehberlik') {
      setActiveTab('iyep_rehberlik');
      setIyepOrRehberlik(item.planType);
    } else {
      setActiveTab('gunluk');
    }
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Hero Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden no-print print:hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>2026-2027 Türkiye Yüzyılı Maarif Modeli %100 Uyumlu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              MEB Yıllık &amp; Günlük Plan ve Defter Doldurma Robotu
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              1-8. sınıf tüm kademelerde hafta hafta günlük ders planları oluşturun, her gün sınıf defterine yazılacak resmi kazanım metinlerini tek tıkla kopyalayın, A4 resmi PDF ve Word (.docx) olarak indirin.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span>Okul &amp; Öğretmen Bilgisi</span>
              {showSettings ? '▲' : '▼'}
            </button>
            <button
              onClick={() => setActiveTab('arsiv')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold border border-indigo-200 transition-colors"
            >
              <Search className="w-4 h-4 text-indigo-600" />
              <span>Tüm Planları Tara &amp; İndir</span>
            </button>
          </div>
        </div>

        {/* Collapsible Settings Form */}
        {showSettings && (
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200/60">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Okul Adı</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Örn: Cumhuriyet İlkokulu"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Öğretmen Adı</label>
              <input
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Örn: Ayşe Demir"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Sınıf / Şube</label>
              <input
                type="text"
                value={classBranch}
                onChange={(e) => setClassBranch(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Örn: 1/A"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Eğitim Yılı</label>
              <input
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="2026-2027"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Okul Müdürü</label>
              <input
                type="text"
                value={principalName}
                onChange={(e) => setPrincipalName(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Örn: Mehmet Yılmaz"
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Tool Shell */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="space-y-6 no-print print:hidden">
          {/* Step 1: Grade Level Selection */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              1. Sınıf Düzeyi Seçin:
            </span>
            <span className="text-xs font-bold text-indigo-600">
              {selectedGrade}. Sınıf Seçili
            </span>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-1.5 sm:gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => {
              const isSelected = selectedGrade === g;
              return (
                <button
                  key={g}
                  onClick={() => setSelectedGrade(g)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition-all text-center border ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-102 ring-2 ring-indigo-200'
                      : 'bg-slate-50 hover:bg-indigo-50/50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="text-[13px]">{g}. Sınıf</div>
                  <div className={`text-[9px] font-medium opacity-80 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {g <= 4 ? 'İlkokul' : g <= 8 ? 'Ortaokul' : 'Lise'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Subject Selection */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            2. Ders Seçin ({availableSubjects.length} Ders Mevcut):
          </span>
          <div className="flex flex-wrap gap-2">
            {availableSubjects.map((sub) => {
              const isSelected = selectedSubject === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubject(sub)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Week Selection Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 via-indigo-50/40 to-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              disabled={selectedWeekNum <= 1}
              onClick={() => setSelectedWeekNum((prev) => Math.max(1, prev - 1))}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors shadow-sm"
              title="Önceki Hafta"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="space-y-0.5">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Çalışma Haftası:
              </label>
              <select
                value={selectedWeekNum}
                onChange={(e) => setSelectedWeekNum(parseInt(e.target.value, 10))}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
              >
                {ACADEMIC_WEEKS_2026_2027.map((w) => (
                  <option key={w.weekNum} value={w.weekNum}>
                    {w.weekNum}. Hafta ({w.dates}) {w.specialDays ? `— ${w.specialDays}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              disabled={selectedWeekNum >= 36}
              onClick={() => setSelectedWeekNum((prev) => Math.min(36, prev + 1))}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors shadow-sm"
              title="Sonraki Hafta"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Info Badge */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600 bg-white px-3 py-2 rounded-xl border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span>
              <strong>{activeWeek.dates}</strong> &bull; {activeWeek.hours} Ders Saati
              {activeWeek.specialDays && (
                <span className="ml-1 text-emerald-700 font-bold">({activeWeek.specialDays})</span>
              )}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 flex flex-wrap gap-2 pt-2">
          <button
            onClick={() => setActiveTab('gunluk')}
            className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'gunluk'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>📝 Günlük Ders Planı</span>
          </button>

          <button
            onClick={() => setActiveTab('defter')}
            className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'defter'
                ? 'border-emerald-600 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>✍️ Sınıf Defteri Doldurma</span>
          </button>

          <button
            onClick={() => setActiveTab('yillik')}
            className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'yillik'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>📅 Yıllık Çerçeve Plan (36 Hafta)</span>
          </button>

          <button
            onClick={() => setActiveTab('iyep_rehberlik')}
            className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'iyep_rehberlik'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>🎯 İYEP &amp; Rehberlik Planları</span>
          </button>

          <button
            onClick={() => setActiveTab('arsiv')}
            className={`pb-3 px-4 text-xs font-extrabold transition-all border-b-2 flex items-center gap-1.5 ml-auto ${
              activeTab === 'arsiv'
                ? 'border-amber-600 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>📚 Plan Arşivi &amp; İndirme</span>
          </button>
        </div>
      </div>

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: GÜNLÜK DERS PLANI (A4 RESMİ MEB FORMATI) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'gunluk' && (
          <div className="space-y-6">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 no-print print:hidden">
              <div className="text-xs text-slate-600">
                <strong>{selectedGrade}. Sınıf {selectedSubject}</strong> &bull; {selectedWeekNum}. Hafta Günlük Ders İşleniş Planı
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleCopyDailyPlan()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 shadow-sm transition-colors"
                >
                  {copiedKey === 'full-plan' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Metni Kopyala</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => exportDailyPlanToDocx(dailyLessonPlan)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Word (.docx) İndir</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>A4 Yazdır / PDF</span>
                </button>
              </div>
            </div>

            {/* Document Printable View */}
            <div className="bg-white border border-slate-300 rounded-2xl p-6 sm:p-10 shadow-sm font-sans space-y-6 printable-area">
              {/* Official Header */}
              <div className="text-center space-y-1 pb-4 border-b border-slate-200">
                <div className="text-xs font-bold tracking-widest text-slate-500">T.C.</div>
                <div className="text-xs font-bold tracking-wider text-slate-700">MİLLÎ EĞİTİM BAKANLIĞI</div>
                <div className="text-sm font-black text-slate-900">{schoolName.toUpperCase()}</div>
                <div className="text-xs font-black text-indigo-900 pt-1">
                  {academicYear} EĞİTİM-ÖĞRETİM YILI GÜNLÜK DERS İŞLENİŞ PLANI
                </div>
              </div>

              {/* Bölüm I: Kimlik Bilgileri Tablosu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
                <div className="space-y-1.5">
                  <div><strong>Ders:</strong> {dailyLessonPlan.subject}</div>
                  <div><strong>Sınıf / Şube:</strong> {dailyLessonPlan.grade}. Sınıf ({dailyLessonPlan.classBranch})</div>
                  <div><strong>Süre:</strong> {dailyLessonPlan.hours} Ders Saati</div>
                  <div><strong>Hafta:</strong> {dailyLessonPlan.weekNum}. Hafta ({dailyLessonPlan.dates})</div>
                </div>
                <div className="space-y-1.5">
                  <div><strong>Öğretmen:</strong> {dailyLessonPlan.teacherName}</div>
                  <div><strong>Ünite / Tema:</strong> {dailyLessonPlan.unit}</div>
                  <div><strong>Konu:</strong> {dailyLessonPlan.topic}</div>
                  {dailyLessonPlan.specialDays && (
                    <div><strong>Belirli Gün &amp; Hafta:</strong> <span className="text-emerald-700 font-bold">{dailyLessonPlan.specialDays}</span></div>
                  )}
                </div>
              </div>

              {/* Bölüm II: Öğrenme Çıktıları */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b border-indigo-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  BÖLÜM I: ÖĞRENME ALANI VE KAZANIMLAR (MAARİF MODELİ)
                </div>
                <div className="text-xs space-y-2 pl-3">
                  {dailyLessonPlan.contentFramework && (
                    <div className="p-2.5 rounded-lg bg-indigo-50/60 border border-indigo-100 text-slate-800">
                      <span className="font-bold text-indigo-950">İçerik Çerçevesi: </span>
                      <span className="text-slate-700">{dailyLessonPlan.contentFramework}</span>
                    </div>
                  )}

                  {dailyLessonPlan.keyConcepts && dailyLessonPlan.keyConcepts.length > 0 && (
                    <div>
                      <span className="font-bold text-slate-800">Anahtar Kavramlar:</span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {dailyLessonPlan.keyConcepts.map((kc, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 text-[11px] font-semibold"
                          >
                            {kc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="font-bold text-slate-800">Öğrenme Çıktıları (Kazanımlar):</span>
                    <ul className="list-disc pl-5 pt-1 space-y-1 text-slate-700">
                      {dailyLessonPlan.outcomes.map((o, idx) => (
                        <li key={idx}>{o}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">Süreç Bileşenleri &amp; Beceriler:</span>
                    <ul className="list-disc pl-5 pt-1 space-y-1 text-slate-700">
                      {dailyLessonPlan.components.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800">Erdem-Değer-Eylem / Değerler:</span>
                    <span className="text-slate-700 ml-1.5">{dailyLessonPlan.values}</span>
                  </div>
                </div>
              </div>

              {/* Bölüm III: Yöntem, Teknik & Araçlar */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b border-indigo-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  BÖLÜM II: ÖĞRETME-ÖĞRENME YÖNTEM, TEKNİK VE ARAÇLARI
                </div>
                <div className="text-xs space-y-1.5 pl-3">
                  <div>
                    <strong>Kullanılan Yöntem ve Teknikler:</strong>{' '}
                    <span className="text-slate-700">{dailyLessonPlan.methods.join(', ')}</span>
                  </div>
                  <div>
                    <strong>Kullanılan Eğitim Teknolojileri, Araç ve Gereçler:</strong>{' '}
                    <span className="text-slate-700">{dailyLessonPlan.toolsMaterials.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Bölüm IV: İşleniş */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b border-indigo-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  BÖLÜM III: DERSİN İŞLENİŞİ VE ETKİNLİK SÜRECİ
                </div>
                <div className="text-xs space-y-2.5 pl-3 text-slate-700 leading-relaxed">
                  <div>
                    <strong className="text-slate-900">1. Derse Giriş, Güdüleme ve Dikkat Çekme:</strong>
                    <p className="pt-0.5">{dailyLessonPlan.steps.giris}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">2. Keşfetme ve Öğrenme Yaşantıları:</strong>
                    <p className="pt-0.5">{dailyLessonPlan.steps.kesfetme}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">3. Derinleştirme ve Pekiştirme Etkinlikleri:</strong>
                    <p className="pt-0.5">{dailyLessonPlan.steps.derinlestirme}</p>
                  </div>
                  <div>
                    <strong className="text-slate-900">4. Özetleme ve Ders Sonu Değerlendirmesi:</strong>
                    <p className="pt-0.5">{dailyLessonPlan.steps.ozet}</p>
                  </div>
                </div>
              </div>

              {/* Bölüm V: Ölçme & Ödev */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-indigo-900 uppercase tracking-wider pb-1 border-b border-indigo-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                  BÖLÜM IV: ÖLÇME, DEĞERLENDİRME VE ÖDEV
                </div>
                <div className="text-xs space-y-1.5 pl-3 text-slate-700">
                  <div>
                    <strong>Ölçme ve Değerlendirme Yaklaşımı:</strong> {dailyLessonPlan.assessment}
                  </div>
                  <div>
                    <strong>Pekiştirme Görevi / Ödev:</strong> {dailyLessonPlan.homework}
                  </div>
                </div>
              </div>

              {/* İmzalar */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-2 text-center text-xs">
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">{dailyLessonPlan.teacherName}</div>
                  <div className="text-slate-600">{dailyLessonPlan.subject} Öğretmeni</div>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-slate-900">UYGUNDUR</div>
                  <div className="text-slate-600">{principalName} &bull; Okul Müdürü</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: SINIF DEFTERİ DOLDURMA (GÜNÜN & HAFTANIN KAZANIMI) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'defter' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <BookmarkCheck className="w-4 h-4 text-emerald-700" />
                  <span>Sınıf Defteri Doldurma Asistanı</span>
                </div>
                <div className="text-xs text-emerald-800">
                  {selectedGrade}. Sınıf &bull; {selectedSubject} &bull; <strong>{activeWeek.dates} ({activeWeek.weekNum}. Hafta)</strong>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleCopyAllDefter}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 shadow-sm transition-colors"
                >
                  {copiedKey === 'all-defter' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Tümü Kopyalandı!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Tüm Haftayı Kopyala</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() =>
                    exportWeeklyDefterToDocx({
                      schoolName,
                      teacherName,
                      academicYear,
                      grade: selectedGrade,
                      classBranch,
                      subject: selectedSubject,
                      week: activeWeek,
                      entries: weeklyDefterEntries,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Word (.docx) İndir</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Yazdır</span>
                </button>
              </div>
            </div>

            {/* Daily Entries Grid */}
            <div className="space-y-3">
              {weeklyDefterEntries.map((entry, idx) => {
                const isCopied = copiedKey === `defter-${idx}`;
                return (
                  <div
                    key={entry.dayName}
                    className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-24 shrink-0">
                        <span className="text-xs font-black text-slate-900 block">{entry.dayName}</span>
                        <span className="text-[10px] font-medium text-slate-500 block">{entry.periodLabel}</span>
                      </div>

                      <div className="text-xs text-slate-800 leading-relaxed font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex-1">
                        {entry.entryText}
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopy(entry.entryText, `defter-${idx}`)}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isCopied
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Practical Teacher Tips Box */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>MEB Sınıf Defteri Doldurma Kuralları:</span>
              </div>
              <p className="leading-relaxed text-[11px] text-amber-800">
                Resmi teftişlerde sınıf defterine sadece "Konu anlatıldı" veya "Soru çözüldü" yazılması eksik kabul edilir. Millî Eğitim mevzuatı uyarınca işlenen ders saatine karşılık gelen <strong>kazanım kodu (örn: M.1.1 veya T.D.1.2)</strong> ve o gün yapılan temel etkinliğin kısa özeti yazılmalı, ardından öğretmen tarafından mavi/siyah mürekkepli kalemle imzalanmalıdır.
              </p>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: YILLIK ÇERÇEVE PLAN (36 HAFTA TABLO) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'yillik' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/80 p-4 rounded-2xl border border-blue-200">
              <div className="space-y-0.5">
                <div className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-700" />
                  <span>2026-2027 Maarif Modeli Yıllık Çerçeve Planı (36 Hafta)</span>
                </div>
                <div className="text-xs text-blue-800">
                  {selectedGrade}. Sınıf &bull; {selectedSubject} &bull; {normalizedWeeks.length} Çalışma Haftası
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportAnnualExcel}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Excel (.xlsx) İndir</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Yazdır / PDF</span>
                </button>
              </div>
            </div>

            {/* 36 Weeks Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 w-16 text-center">Hafta</th>
                    <th className="p-3 w-28">Tarih</th>
                    <th className="p-3 w-16 text-center">Saat</th>
                    <th className="p-3 w-44">Ünite / Tema</th>
                    <th className="p-3 w-40">Konu</th>
                    <th className="p-3 min-w-[240px]">Kazanımlar</th>
                    <th className="p-3 w-36">Ölçme &amp; Değerlendirme</th>
                    <th className="p-3 w-32">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {normalizedWeeks.map((w) => {
                    const isCurrent = w.weekNum === selectedWeekNum;
                    return (
                      <tr
                        key={w.weekNum}
                        className={`hover:bg-indigo-50/40 transition-colors ${
                          isCurrent ? 'bg-indigo-50/70 font-semibold' : ''
                        }`}
                      >
                        <td className="p-3 text-center font-bold text-slate-900">{w.weekNum}</td>
                        <td className="p-3 text-slate-600 font-mono text-[11px]">{w.dates}</td>
                        <td className="p-3 text-center text-slate-700">{w.hours}</td>
                        <td className="p-3 font-medium text-slate-900">{w.unit || '-'}</td>
                        <td className="p-3 text-slate-700">{w.topic || '-'}</td>
                        <td className="p-3 text-slate-600 leading-relaxed text-[11px]">
                          {w.outcomes.slice(0, 2).join(' • ')}
                          {w.outcomes.length > 2 && ` (+${w.outcomes.length - 2} kazanım)`}
                        </td>
                        <td className="p-3 text-slate-500 text-[11px]">{w.assessment || 'Gözlem Formu'}</td>
                        <td className="p-3">
                          <button
                            onClick={() => {
                              setSelectedWeekNum(w.weekNum);
                              setActiveTab('gunluk');
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[11px] font-bold transition-colors"
                          >
                            <span>Günlük Planı Aç</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: İYEP & REHBERLİK PLANLARI */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'iyep_rehberlik' && (
          <div className="space-y-6">
            {/* Sub Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setIyepOrRehberlik('rehberlik')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  iyepOrRehberlik === 'rehberlik'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                Sınıf Rehberlik Yıllık Planı (36 Hafta)
              </button>
              <button
                onClick={() => setIyepOrRehberlik('iyep')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors border ${
                  iyepOrRehberlik === 'iyep'
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                İYEP Kurs Planları (3. &amp; 4. Sınıf)
              </button>
            </div>

            {iyepOrRehberlik === 'rehberlik' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <strong>2026-2027 MEB ÖRGM Sınıf Rehberlik Yıllık Çalışma Planı</strong>
                    <div className="text-[11px] text-purple-800">
                      Tüm sınıf düzeylerinde haftalık rehberlik saatlerinde işlenecek etkinlikler ve amaçlar.
                    </div>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Planı Yazdır (A4)</span>
                  </button>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3 w-16 text-center">Hafta</th>
                        <th className="p-3 w-32">Tarih</th>
                        <th className="p-3 w-48">Rehberlik Konusu</th>
                        <th className="p-3">Kazanım ve Hedef</th>
                        <th className="p-3 w-48">Yöntem / Etkinlik</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-normal">
                      {REHBERLIK_PLAN_36_HAFTA.map((r) => (
                        <tr key={r.weekNum} className="hover:bg-purple-50/40 transition-colors">
                          <td className="p-3 text-center font-bold text-slate-900">{r.weekNum}</td>
                          <td className="p-3 text-slate-600 font-mono text-[11px]">{r.dates}</td>
                          <td className="p-3 font-semibold text-purple-950">{r.topic}</td>
                          <td className="p-3 text-slate-700">{r.aim}</td>
                          <td className="p-3 text-slate-600 text-[11px]">{r.methods}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950">
                  <strong>İlkokullarda Yetiştirme Programı (İYEP) Kurs ve Çalışma Planları</strong>
                  <div className="text-[11px] text-indigo-800 pt-0.5">
                    3. ve 4. sınıf düzeyinde temel okuma, yazma ve matematik becerilerini geliştirmeye yönelik modül çerçeve planları.
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {IYEP_CATALOG.map((mod) => (
                    <div
                      key={mod.moduleCode}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-extrabold">
                          {mod.moduleCode} &bull; {mod.subject}
                        </span>
                        <span className="text-xs font-bold text-slate-600">{mod.hours} Ders Saati</span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900">{mod.moduleName}</h4>

                      <div className="text-xs text-slate-700 space-y-1">
                        <strong>Kapsam Kazanımları:</strong>
                        <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-slate-600">
                          {mod.outcomes.map((o, idx) => (
                            <li key={idx}>{o}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <strong>Önerilen Etkinlikler:</strong> {mod.activities}
                      </div>

                      <div className="pt-1 flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopy(`${mod.moduleName}\n${mod.outcomes.join('\n')}\nEtkinlikler: ${mod.activities}`, mod.moduleCode)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          {copiedKey === mod.moduleCode ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-700">Kopyalandı</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-500" />
                              <span>Kopyala</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: MEBDERS TARZI KAPSAMLI ARŞİV & İNDİRME */}
        {/* ------------------------------------------------------------- */}
        {activeTab === 'arsiv' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <strong>2026-2027 MEB Yıllık ve Günlük Plan İndirme Merkezi</strong>
                <div className="text-[11px] text-amber-800">
                  Tüm sınıf düzeyleri, dersler ve haftalar bazında ayrılmış {archiveCatalog.length}+ resmi plan dosyası.
                </div>
              </div>
              <div className="text-xs font-bold text-amber-900 bg-white px-3 py-1.5 rounded-xl border border-amber-200 shadow-xs">
                {filteredArchive.length} Dosya Listeleniyor
              </div>
            </div>

            {/* Filter Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <input
                  type="text"
                  value={archiveSearch}
                  onChange={(e) => setArchiveSearch(e.target.value)}
                  placeholder="Ders, hafta veya plan adı ara..."
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <select
                  value={archiveGrade}
                  onChange={(e) => setArchiveGrade(e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10))}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">Tüm Sınıflar</option>
                  <option value="1">1. Sınıf</option>
                  <option value="2">2. Sınıf</option>
                  <option value="3">3. Sınıf</option>
                  <option value="4">4. Sınıf</option>
                  <option value="5">5. Sınıf</option>
                  <option value="6">6. Sınıf</option>
                  <option value="7">7. Sınıf</option>
                  <option value="8">8. Sınıf</option>
                </select>
              </div>

              <div>
                <select
                  value={archiveType}
                  onChange={(e) => setArchiveType(e.target.value)}
                  className="w-full text-xs font-medium px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">Tüm Plan Türleri</option>
                  <option value="gunluk">Günlük Planlar</option>
                  <option value="defter">Defter Doldurma Çizelgeleri</option>
                  <option value="yillik">Yıllık Planlar</option>
                  <option value="iyep">İYEP Kurs Planları</option>
                  <option value="rehberlik">Rehberlik Planları</option>
                </select>
              </div>
            </div>

            {/* Archive Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3 min-w-[280px]">Dosya / Materyal Adı</th>
                    <th className="p-3 w-28">Sınıf</th>
                    <th className="p-3 w-32">Tür</th>
                    <th className="p-3 w-24">Format / Boyut</th>
                    <th className="p-3 w-28 text-center">İndirme</th>
                    <th className="p-3 w-32 text-right">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-normal">
                  {filteredArchive.slice(0, 50).map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-600">{item.gradeLabel}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            item.planType === 'gunluk'
                              ? 'bg-blue-100 text-blue-800'
                              : item.planType === 'defter'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.planType === 'yillik'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.planTypeLabel}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 text-[11px]">
                        {item.format} &bull; {item.size}
                      </td>
                      <td className="p-3 text-center text-slate-500 font-mono text-[11px]">
                        {item.downloads.toLocaleString('tr-TR')}
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleOpenFromArchive(item)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold shadow-xs transition-colors"
                        >
                          <span>Robotta Aç</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredArchive.length > 50 && (
              <div className="text-center text-xs text-slate-500 pt-2">
                İlk 50 dosya gösteriliyor. Aradığınız belirli hafta veya ders için lütfen yukarıdaki filtreleri kullanın.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
