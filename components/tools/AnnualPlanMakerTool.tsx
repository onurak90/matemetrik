'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar, FileSpreadsheet, Printer, Download, Sparkles,
  School, User, CheckCircle2, Search, BookOpen, Layers,
  ChevronRight, RefreshCw, Edit3, AlertCircle, Clock
} from 'lucide-react';
import * as XLSX from 'xlsx';

interface WeekItem {
  month: string;
  week: string;
  hours: string;
  unit: string;
  topic: string;
  outcomes: string;
  components?: string;
  assessment?: string;
  specialDays?: string;
  values?: string;
}

interface PlanData {
  id: string;
  file: string;
  sheet: string;
  subject: string;
  grade: number;
  title: string;
  defaultHours: string;
  legalBasis: string;
  weeksCount: number;
  weeks: WeekItem[];
}

interface PlanSummary {
  id: string;
  grade: number;
  subject: string;
  sheet: string;
  title: string;
  weeksCount: number;
  defaultHours: string;
}

export default function AnnualPlanMakerTool() {
  const [catalog, setCatalog] = useState<PlanSummary[]>([]);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState<number>(5);
  const [selectedSubject, setSelectedSubject] = useState<string>('Matematik');
  const [currentPlan, setCurrentPlan] = useState<PlanData | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  // Form Fields
  const [schoolName, setSchoolName] = useState('Atatürk Ortaokulu');
  const [cityDistrict, setCityDistrict] = useState('İstanbul / Kadıköy');
  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [teacherName, setTeacherName] = useState('Cavenaghi');
  const [principalName, setPrincipalName] = useState('Mehmet Yılmaz');
  const [classBranch, setClassBranch] = useState('5/A, 5/B');
  const [weeklyHours, setWeeklyHours] = useState('5');
  const [approvalDate, setApprovalDate] = useState('14.09.2026');

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Load query params & catalog on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const gradeParam = params.get('grade') || params.get('sinif');
      const subjectParam = params.get('subject') || params.get('ders');
      if (gradeParam) {
        const parsedGrade = parseInt(gradeParam, 10);
        if (!isNaN(parsedGrade) && parsedGrade >= 1 && parsedGrade <= 12) {
          setSelectedGrade(parsedGrade);
        }
      }
      if (subjectParam) {
        setSelectedSubject(subjectParam);
      }
    }

    async function fetchCatalog() {
      try {
        setLoadingCatalog(true);
        const res = await fetch('/api/cerceve-plan');
        const data = await res.json();
        if (data.plans) {
          setCatalog(data.plans);
        }
      } catch (err) {
        console.error('Katalog yüklenemedi:', err);
      } finally {
        setLoadingCatalog(false);
      }
    }
    fetchCatalog();
  }, []);

  // Filter available subjects for selected grade
  const availableSubjects = useMemo(() => {
    const subs = catalog
      .filter((p) => p.grade === selectedGrade)
      .map((p) => p.subject);
    return Array.from(new Set(subs)).sort((a, b) => a.localeCompare(b, 'tr'));
  }, [catalog, selectedGrade]);

  // When grade changes, ensure valid subject
  useEffect(() => {
    if (availableSubjects.length > 0) {
      const matched = availableSubjects.find(
        (s) => s.toLowerCase() === selectedSubject.toLowerCase()
      );
      if (matched) {
        if (matched !== selectedSubject) {
          setSelectedSubject(matched);
        }
      } else {
        setSelectedSubject(availableSubjects[0]);
      }
    }
  }, [selectedGrade, availableSubjects, selectedSubject]);

  // Fetch plan when grade or subject changes
  useEffect(() => {
    async function fetchPlan() {
      if (!selectedGrade || !selectedSubject) return;
      const target = catalog.find(
        (p) => p.grade === selectedGrade && p.subject.toLowerCase() === selectedSubject.toLowerCase()
      );
      if (!target) return;

      try {
        setLoadingPlan(true);
        const res = await fetch(`/api/cerceve-plan?id=${encodeURIComponent(target.id)}`);
        const data = await res.json();
        if (data && data.weeks) {
          setCurrentPlan(data);
          if (data.defaultHours) {
            setWeeklyHours(data.defaultHours);
          }
          setClassBranch(`${selectedGrade}/A`);
        }
      } catch (err) {
        console.error('Plan yüklenemedi:', err);
      } finally {
        setLoadingPlan(false);
      }
    }
    if (catalog.length > 0) {
      fetchPlan();
    }
  }, [selectedGrade, selectedSubject, catalog]);

  // Handle cell edit
  const handleCellChange = (index: number, field: keyof WeekItem, value: string) => {
    if (!currentPlan) return;
    const updatedWeeks = [...currentPlan.weeks];
    updatedWeeks[index] = {
      ...updatedWeeks[index],
      [field]: value,
    };
    setCurrentPlan({
      ...currentPlan,
      weeks: updatedWeeks,
    });
  };

  // Filtered weeks for search
  const displayedWeeks = useMemo(() => {
    if (!currentPlan?.weeks) return [];
    if (!searchTerm.trim()) return currentPlan.weeks;
    const query = searchTerm.toLowerCase();
    return currentPlan.weeks.filter(
      (w) =>
        w.month.toLowerCase().includes(query) ||
        w.week.toLowerCase().includes(query) ||
        w.unit.toLowerCase().includes(query) ||
        w.topic.toLowerCase().includes(query) ||
        w.outcomes.toLowerCase().includes(query) ||
        (w.specialDays && w.specialDays.toLowerCase().includes(query))
    );
  }, [currentPlan, searchTerm]);

  // Export to Excel (.xlsx)
  const handleExportExcel = () => {
    if (!currentPlan) return;

    // Build worksheet rows
    const wsData: any[][] = [];

    // Title & Header Rows
    wsData.push([`T.C. ${cityDistrict.toUpperCase()}`]);
    wsData.push([schoolName.toUpperCase()]);
    wsData.push([
      `${academicYear} EĞİTİM ÖĞRETİM YILI ${selectedGrade}. SINIF ${selectedSubject.toUpperCase()} DERSİ YILLIK ÇALIŞMA PLANI`,
    ]);
    wsData.push([]);
    wsData.push([
      `Dersi Okutan Öğretmen: ${teacherName}`,
      '',
      `Okul Müdürü: ${principalName}`,
      '',
      `Sınıf/Şube: ${classBranch}`,
      '',
      `Haftalık Ders Saati: ${weeklyHours}`,
      '',
      `Onay Tarihi: ${approvalDate}`,
    ]);
    wsData.push([]);

    // Table Headers
    wsData.push([
      'AY',
      'HAFTA VE TARİH',
      'DERS SAATİ',
      'ÜNİTE / TEMA',
      'KONU (İÇERİK ÇERÇEVESİ)',
      'ÖĞRENME ÇIKTILARI (KAZANIMLAR)',
      'SÜREÇ BİLEŞENLERİ / ETKİNLİKLER',
      'ÖLÇME VE DEĞERLENDİRME',
      'BELİRLİ GÜN VE HAFTALAR',
    ]);

    // Weeks
    currentPlan.weeks.forEach((w) => {
      wsData.push([
        w.month,
        w.week,
        w.hours || weeklyHours,
        w.unit,
        w.topic,
        w.outcomes,
        w.components || '',
        w.assessment || '',
        w.specialDays || '',
      ]);
    });

    // Legal Basis & Signatures
    wsData.push([]);
    wsData.push([currentPlan.legalBasis || '']);
    wsData.push([]);
    wsData.push([
      `Ders Öğretmeni: ${teacherName} (İmza)`,
      '',
      '',
      '',
      '',
      `UYGUNDUR - ${approvalDate}`,
    ]);
    wsData.push(['', '', '', '', '', `${principalName} - Okul Müdürü (İmza/Mühür)`]);

    // Create workbook
    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws['!cols'] = [
      { wch: 12 }, // Ay
      { wch: 20 }, // Hafta
      { wch: 10 }, // Saat
      { wch: 25 }, // Ünite
      { wch: 30 }, // Konu
      { wch: 45 }, // Kazanımlar
      { wch: 40 }, // Süreç
      { wch: 30 }, // Ölçme
      { wch: 25 }, // Belirli Günler
    ];

    const wb = XLSX.utils.book_new();
    const sheetName = `${selectedGrade}.Sinif_${selectedSubject}`.slice(0, 31);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Download
    const fileName = `${selectedGrade}_Sinif_${selectedSubject}_Yillik_Plani_${academicYear.replace('/', '_')}.xlsx`;
    XLSX.writeFile(wb, fileName);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  // Print / PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Configuration Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Türkiye Yüzyılı Maarif Modeli
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Yıllık Plan Bilgi ve Ders Seçimi
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Kademeyi ve dersi seçin, okul ve öğretmen bilgilerinizi tamamlayarak hazır MEB yıllık planınızı oluşturun.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportExcel}
              disabled={!currentPlan || loadingPlan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Excel (.xlsx) İndir
            </button>
            <button
              type="button"
              onClick={handlePrint}
              disabled={!currentPlan || loadingPlan}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-sm font-bold shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              PDF / Resmi Baskı
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Excel dosyanız başarıyla oluşturuldu ve bilgisayarınıza indirildi!</span>
          </div>
        )}

        {/* Step 1: Grade & Course Selectors */}
        <div className="mt-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                1. Sınıf Seviyesi Seçin
              </label>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                İlkokul (1-4) • Ortaokul (5-8) • Lise (9-12)
              </span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => {
                const isHighSchool = g >= 9;
                const isMiddleSchool = g >= 5 && g <= 8;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGrade(g)}
                    className={`py-2.5 px-2 rounded-xl text-center transition-all ${
                      selectedGrade === g
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-105 ring-2 ring-indigo-500 ring-offset-2'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-black text-sm">{g}. Sınıf</div>
                    <div className={`text-[10px] mt-0.5 font-medium ${selectedGrade === g ? 'text-indigo-100' : 'text-slate-400'}`}>
                      {isHighSchool ? 'Lise' : isMiddleSchool ? 'Ortaokul' : 'İlkokul'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              2. Dersi Seçin ({availableSubjects.length} Ders Mevcut)
            </label>
            {loadingCatalog ? (
              <div className="py-4 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" /> Dersler listeleniyor...
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {availableSubjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSelectedSubject(sub)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      selectedSubject === sub
                        ? 'bg-indigo-50 border-2 border-indigo-600 text-indigo-700 shadow-sm font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Teacher & School Metadata */}
          <div className="pt-4 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              3. Okul ve Öğretmen Bilgileri (Çıktıya Otomatik Eklenir)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                <label className="block text-xs font-medium text-slate-600 mb-1">Dersi Okutan Öğretmen</label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
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
                <label className="block text-xs font-medium text-slate-600 mb-1">Sınıf / Şube</label>
                <input
                  type="text"
                  value={classBranch}
                  onChange={(e) => setClassBranch(e.target.value)}
                  placeholder="Örn: 5/A, 5/B"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Haftalık Ders Saati</label>
                <input
                  type="text"
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(e.target.value)}
                  placeholder="Örn: 5"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Onay Tarihi</label>
                <input
                  type="text"
                  value={approvalDate}
                  onChange={(e) => setApprovalDate(e.target.value)}
                  placeholder="14.09.2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Plan Viewer & Live Editor */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 no-print space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              {currentPlan?.title || `${selectedGrade}. Sınıf ${selectedSubject} Yıllık Planı`}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Toplam {currentPlan?.weeksCount || 0} hafta planlandı. Tablo hücrelerine tıklayarak içeriği dilediğiniz gibi düzenleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Konu, kazanım veya hafta ara..."
                className="pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56 sm:w-64"
              />
            </div>
          </div>
        </div>

        {loadingPlan ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-indigo-600" />
            <span className="text-sm font-medium">Yıllık çerçeve planı yükleniyor...</span>
          </div>
        ) : !currentPlan ? (
          <div className="py-16 text-center text-slate-400">
            Lütfen yukarıdan bir sınıf ve ders seçiniz.
          </div>
        ) : (
          <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-inner max-h-[650px] overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 backdrop-blur sticky top-0 z-10 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 w-20">Ay</th>
                  <th className="py-3 px-3 w-28">Hafta</th>
                  <th className="py-3 px-2 w-16 text-center">Saat</th>
                  <th className="py-3 px-3 w-40">Ünite / Tema</th>
                  <th className="py-3 px-3 w-48">Konu</th>
                  <th className="py-3 px-3 min-w-[240px]">Öğrenme Çıktıları / Kazanımlar</th>
                  <th className="py-3 px-3 w-48">Ölçme &amp; Değerlendirme</th>
                  <th className="py-3 px-3 w-40">Belirli Gün ve Haftalar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {displayedWeeks.map((week, idx) => (
                  <tr key={idx} className="hover:bg-indigo-50/40 transition-colors group">
                    <td className="py-2.5 px-3 font-bold text-slate-900 align-top">
                      {week.month}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 align-top whitespace-pre-line font-medium">
                      {week.week}
                    </td>
                    <td className="py-2.5 px-2 text-center align-top font-bold text-indigo-600">
                      {week.hours || weeklyHours}
                    </td>
                    <td className="py-2.5 px-3 align-top font-semibold text-slate-800">
                      <textarea
                        rows={2}
                        value={week.unit}
                        onChange={(e) => handleCellChange(idx, 'unit', e.target.value)}
                        className="w-full bg-transparent resize-none rounded p-1 hover:bg-white focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3 align-top text-slate-600">
                      <textarea
                        rows={2}
                        value={week.topic}
                        onChange={(e) => handleCellChange(idx, 'topic', e.target.value)}
                        className="w-full bg-transparent resize-none rounded p-1 hover:bg-white focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3 align-top text-slate-700">
                      <textarea
                        rows={3}
                        value={week.outcomes}
                        onChange={(e) => handleCellChange(idx, 'outcomes', e.target.value)}
                        className="w-full bg-transparent resize-none rounded p-1 hover:bg-white focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </td>
                    <td className="py-2.5 px-3 align-top text-slate-500">
                      <textarea
                        rows={2}
                        value={week.assessment || ''}
                        onChange={(e) => handleCellChange(idx, 'assessment', e.target.value)}
                        className="w-full bg-transparent resize-none rounded p-1 hover:bg-white focus:bg-white focus:ring-1 focus:ring-indigo-500 outline-none text-[11px]"
                      />
                    </td>
                    <td className="py-2.5 px-3 align-top">
                      {week.specialDays ? (
                        <span className="inline-block px-2 py-0.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-[10px] font-bold">
                          {week.specialDays}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Legal basis footer note */}
        {currentPlan && (
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-slate-800">Yasal Dayanak:</span> {currentPlan.legalBasis}
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* PRINT-ONLY OFFICIAL MEB DOCUMENT LAYOUT (A4 Landscape)         */}
      {/* ============================================================== */}
      {/* ============================================================== */}
      {/* PRINT-ONLY OFFICIAL MEB DOCUMENT LAYOUT (A4 Landscape)         */}
      {/* ============================================================== */}
      <div className="hidden print:block font-sans text-black bg-white p-0 m-0 leading-tight print-area">
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            @page {
              size: A4 landscape;
              margin: 6mm 6mm 6mm 6mm;
            }
            *, *::before, *::after {
              box-sizing: border-box !important;
            }
            html, body {
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
              color: #000 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              font-family: Arial, Helvetica, sans-serif !important;
            }
            .no-print, header, footer, nav, aside {
              display: none !important;
            }
            .print-area {
              display: block !important;
              width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .print-table {
              width: 100% !important;
              border-collapse: collapse !important;
              font-size: 6.8pt !important;
              line-height: 1.12 !important;
              margin-top: 2px !important;
            }
            .print-table th, .print-table td {
              border: 0.5pt solid #222 !important;
              padding: 2px 3px !important;
              vertical-align: top !important;
              word-break: break-word !important;
            }
            .print-table thead {
              display: table-header-group !important;
              background-color: #f1f5f9 !important;
            }
            .print-table tr {
              page-break-inside: auto !important;
              break-inside: auto !important;
            }
            .print-sig-block {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              margin-top: 4px !important;
            }
          }
        `}} />

        {/* Compact Official Header */}
        <div className="text-center mb-1 pb-1 border-b border-black">
          <div className="text-[7.5pt] font-bold uppercase tracking-wider">
            T.C. {cityDistrict.toUpperCase()} &bull; {schoolName.toUpperCase()}
          </div>
          <div className="text-[8.5pt] font-black uppercase mt-0.5 text-black">
            {academicYear} EĞİTİM VE ÖĞRETİM YILI {selectedGrade}. SINIF {selectedSubject.toUpperCase()} DERSİ TASLAK ÇERÇEVE YILLIK PLANI
          </div>
        </div>

        {/* Compact Meta Info Bar */}
        <div className="flex justify-between items-center text-[7pt] border border-black px-2 py-0.5 mb-1 bg-slate-50 font-medium">
          <div><span className="font-bold">Öğretmen:</span> {teacherName}</div>
          <div><span className="font-bold">Sınıf/Şube:</span> {classBranch}</div>
          <div><span className="font-bold">Haftalık Saat:</span> {weeklyHours} Saat</div>
          <div><span className="font-bold">Okul Müdürü:</span> {principalName}</div>
          <div><span className="font-bold">Tarih:</span> {approvalDate}</div>
        </div>

        {/* Main Plan Table */}
        {currentPlan && (
          <table className="print-table">
            <thead>
              <tr className="font-bold text-center bg-slate-100">
                <th style={{ width: '5%' }}>AY</th>
                <th style={{ width: '9%' }}>HAFTA / TARİH</th>
                <th style={{ width: '3%' }}>SAAT</th>
                <th style={{ width: '13%' }}>ÜNİTE / TEMA</th>
                <th style={{ width: '16%' }}>KONU (İÇERİK)</th>
                <th style={{ width: '34%' }}>ÖĞRENME ÇIKTILARI (KAZANIMLAR)</th>
                <th style={{ width: '10%' }}>ÖLÇME-DEĞERL.</th>
                <th style={{ width: '10%' }}>BELİRLİ GÜNLER</th>
              </tr>
            </thead>
            <tbody>
              {currentPlan.weeks.map((w, i) => (
                <tr key={i}>
                  <td className="font-bold text-center">{w.month}</td>
                  <td className="whitespace-pre-line text-center">{w.week}</td>
                  <td className="text-center font-bold">{w.hours || weeklyHours}</td>
                  <td className="font-semibold">{w.unit}</td>
                  <td>{w.topic}</td>
                  <td className="text-justify">{w.outcomes}</td>
                  <td className="text-[6.5pt]">{w.assessment || '-'}</td>
                  <td className="text-[6.5pt] text-center font-medium">{w.specialDays || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Legal basis & Signatures Block */}
        <div className="print-sig-block">
          <div className="mt-1 text-[6.5pt] text-slate-800 leading-tight border-t border-slate-400 pt-0.5">
            <span className="font-bold">Dayanak:</span> {currentPlan?.legalBasis}
          </div>

          <div className="grid grid-cols-2 mt-3 text-center text-[7.5pt]">
            <div>
              <div className="font-bold">{teacherName}</div>
              <div className="text-[7pt] text-slate-700">Ders Öğretmeni</div>
              <div className="mt-4 text-slate-400">İmza</div>
            </div>
            <div>
              <div className="font-bold">UYGUNDUR</div>
              <div className="text-[6.5pt] text-slate-700">{approvalDate}</div>
              <div className="font-bold mt-0.5">{principalName}</div>
              <div className="text-[7pt] text-slate-700">Okul Müdürü</div>
              <div className="mt-2 text-slate-400">İmza / Mühür</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
