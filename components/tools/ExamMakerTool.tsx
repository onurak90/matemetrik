'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Camera, Printer, Trash2, Columns, LayoutGrid, Sparkles,
  AlertTriangle, Check, ZoomIn, ZoomOut, Maximize2, RotateCcw,
  FileText, HelpCircle, ChevronDown, MoveDown, Info
} from 'lucide-react';

interface QuestionItem {
  id: string;
  image: string;
  lineCount: number;
}

const DEFAULT_REMINDERS = {
  schoolName: 'OKUL ADINI BURAYA YAZINIZ',
  examPeriod: 'Sınav Dönemi Bilgisi',
  courseName: 'Ders Adı',
  dateInfo: 'Tarih Bilgisi',
  teacherName: 'Öğretmenin Adı Soyadı',
};

export default function ExamMakerTool() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [columnCount, setColumnCount] = useState<'1' | '2'>('2');
  const [density, setDensity] = useState<'compact' | 'standard' | 'spacious'>('standard');
  const [globalLineCount, setGlobalLineCount] = useState<number>(5);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [hasErrorBlink, setHasErrorBlink] = useState(false);

  // Editable Header & Footer Values
  const [schoolName, setSchoolName] = useState(DEFAULT_REMINDERS.schoolName);
  const [examPeriod, setExamPeriod] = useState(DEFAULT_REMINDERS.examPeriod);
  const [courseName, setCourseName] = useState(DEFAULT_REMINDERS.courseName);
  const [dateInfo, setDateInfo] = useState(DEFAULT_REMINDERS.dateInfo);
  const [teacherName, setTeacherName] = useState(DEFAULT_REMINDERS.teacherName);
  const [pointsNote, setPointsNote] = useState('Her sorunun doğru cevabı 10 puandır.');
  const [goodLuckNote, setGoodLuckNote] = useState('Sınavda başarılar dilerim. 😊');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Responsive scale on mobile on initial load
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setZoomScale(0.48); // Fit A4 nicely on mobile screens
      } else if (window.innerWidth < 1024) {
        setZoomScale(0.75); // Fit on tablet
      } else {
        setZoomScale(1);
      }
    };
    handleResize();
  }, []);

  // Handle Photo Upload
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setQuestions((prev) => [
            ...prev,
            {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              image: event.target?.result as string,
              lineCount: globalLineCount,
            },
          ]);
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Change individual question line spacing
  const handleQuestionLineChange = (id: string, newLineCount: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, lineCount: newLineCount } : q))
    );
  };

  // Apply global line spacing to all existing questions
  const handleGlobalLineChange = (newVal: number) => {
    setGlobalLineCount(newVal);
    setQuestions((prev) =>
      prev.map((q) => ({ ...q, lineCount: newVal }))
    );
  };

  // Delete question
  const handleDeleteQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  // Reset all
  const handleResetAll = () => {
    if (questions.length > 0 && !confirm('Yüklenen tüm sorular silinsin mi?')) {
      return;
    }
    setQuestions([]);
  };

  // Check if reminder field is still default
  const isDefaultOrEmpty = (val: string, defaultVal: string) => {
    const trimmed = (val || '').trim();
    return !trimmed || trimmed === defaultVal;
  };

  // Smart Safe Save / Print handler
  const handleSafeSave = () => {
    const missingSchool = isDefaultOrEmpty(schoolName, DEFAULT_REMINDERS.schoolName);
    const missingExam = isDefaultOrEmpty(examPeriod, DEFAULT_REMINDERS.examPeriod);
    const missingCourse = isDefaultOrEmpty(courseName, DEFAULT_REMINDERS.courseName);
    const missingTeacher = isDefaultOrEmpty(teacherName, DEFAULT_REMINDERS.teacherName);

    if (missingSchool || missingExam || missingCourse || missingTeacher) {
      setHasErrorBlink(true);
      setTimeout(() => setHasErrorBlink(false), 2000);

      const proceed = confirm(
        '⚠️ DİKKAT: Sınav kağıdında henüz doldurulmamış veya varsayılan bırakılmış alanlar (Okul Adı, Sınav Dönemi veya Öğretmen İsmi) var.\n\nYine de PDF olarak yazdırmak istiyor musunuz?'
      );
      if (!proceed) return;
    }

    window.print();
  };

  // Organize questions into pages (A4 pagination simulation)
  // Double column: questions paired side-by-side share the same vertical row height
  const getPaginatedPages = () => {
    if (questions.length === 0) return [];

    const pages: QuestionItem[][] = [];
    const isDouble = columnCount === '2';

    // Usable vertical pixel heights for A4:
    // Page 1 has header (~150px), subsequent pages have no header.
    const page1MaxHeight = density === 'compact' ? 810 : density === 'spacious' ? 720 : 760;
    const subsequentMaxHeight = density === 'compact' ? 910 : density === 'spacious' ? 820 : 860;

    const getQuestionHeight = (q: QuestionItem): number => {
      const basePadding = 32; // badge, padding & border
      const approxImgHeight = density === 'compact' ? 115 : density === 'spacious' ? 175 : 140;
      const lineHeight = density === 'compact' ? 20 : density === 'spacious' ? 26 : 24;
      const answerSpace = (q.lineCount || 0) * lineHeight;
      return basePadding + approxImgHeight + answerSpace;
    };

    let currentPage: QuestionItem[] = [];
    let currentHeight = 0;
    let isFirstPage = true;

    if (isDouble) {
      // In 2-column mode, questions are grouped in pairs (row-by-row).
      // Each row height is max(q1.height, q2.height)
      let i = 0;
      while (i < questions.length) {
        const q1 = questions[i];
        const q2 = i + 1 < questions.length ? questions[i + 1] : null;

        const q1H = getQuestionHeight(q1);
        const q2H = q2 ? getQuestionHeight(q2) : q1H;
        const rowH = Math.max(q1H, q2H) + 12; // 12px row gap

        const maxLimit = isFirstPage ? page1MaxHeight : subsequentMaxHeight;

        if (currentHeight + rowH > maxLimit && currentPage.length > 0) {
          pages.push(currentPage);
          currentPage = q2 ? [q1, q2] : [q1];
          currentHeight = rowH;
          isFirstPage = false;
        } else {
          currentPage.push(q1);
          if (q2) currentPage.push(q2);
          currentHeight += rowH;
        }
        i += 2;
      }
    } else {
      // 1-column mode: questions are stacked vertically
      for (const q of questions) {
        const qH = getQuestionHeight(q) + 12; // 12px gap
        const maxLimit = isFirstPage ? page1MaxHeight : subsequentMaxHeight;

        if (currentHeight + qH > maxLimit && currentPage.length > 0) {
          pages.push(currentPage);
          currentPage = [q];
          currentHeight = qH;
          isFirstPage = false;
        } else {
          currentPage.push(q);
          currentHeight += qH;
        }
      }
    }

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    return pages;
  };

  const paginatedPages = getPaginatedPages();

  return (
    <div className="space-y-8">
      {/* Print styles and custom animations */}
      <style jsx global>{`
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .alan-hata {
          animation: shakeError 0.4s ease-in-out !important;
          background-color: #fff1f2 !important;
          border-color: #e11d48 !important;
          color: #be123c !important;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 210mm !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .ekran-gizle {
            display: none !important;
          }
          .a4-print-sayfa {
            box-sizing: border-box !important;
            width: 210mm !important;
            height: 295mm !important;
            max-height: 295mm !important;
            min-height: 0 !important;
            padding: 10mm 12mm 10mm 12mm !important;
            margin: 0 auto !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            page-break-after: always !important;
            break-after: page !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            transform: none !important;
            overflow: hidden !important;
            position: relative !important;
          }
          .a4-print-sayfa:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
        }
      `}</style>

      {/* TOP CONTROL PANEL (Hidden in Print) */}
      <div className="ekran-gizle bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xl shadow-slate-900/5 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              Sınav Kontrol &amp; Ayar Paneli
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sorularınızı yükleyin, boşluk ve sayfa düzenini seçip tek tıkla resmi sınav PDF'i oluşturun.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all">
              <Camera className="w-4 h-4" />
              📸 Soru Fotoğrafları Yükle
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={handleSafeSave}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              💾 PDF Olarak Kaydet / Yazdır
            </button>

            {questions.length > 0 && (
              <button
                type="button"
                onClick={handleResetAll}
                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Tüm Soruları Temizle"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Setting Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Column Layout */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Sayfa Düzeni
            </label>
            <select
              value={columnCount}
              onChange={(e) => setColumnCount(e.target.value as '1' | '2')}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2">📄 Çift Sütun (Yan Yana MEB Formatı)</option>
              <option value="1">📃 Tek Sütun (Geniş / Alt Alta)</option>
            </select>
          </div>

          {/* Page Density Layout */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              📐 Sayfa Yoğunluğu
            </label>
            <select
              value={density}
              onChange={(e) => setDensity(e.target.value as 'compact' | 'standard' | 'spacious')}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="compact">📏 Sıkı (Çok Soru Sığdır / Kompakt)</option>
              <option value="standard">📐 Standart (MEB Dengeli Düzen)</option>
              <option value="spacious">📖 Ferah (Geniş Çözüm Alanı)</option>
            </select>
          </div>

          {/* Quick Line Spacing */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              ⚡ Hızlı Cevap Boşluğu
            </label>
            <select
              value={globalLineCount}
              onChange={(e) => handleGlobalLineChange(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="0">⚪ Boşluk Yok (Yalnızca Soru)</option>
              <option value="3">🕒 3 Satırlık Boşluk (~72px)</option>
              <option value="5">🕒 5 Satırlık Boşluk (~120px)</option>
              <option value="7">🕒 7 Satırlık Boşluk (~168px)</option>
              <option value="10">🕒 10 Satırlık Boşluk (~240px)</option>
            </select>
          </div>

          {/* Mobile Zoom Scale */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              🔍 Önizleme Ölçeği
            </label>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold"
                title="Küçült"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="flex-1 text-center font-mono font-bold bg-slate-50 py-2 border border-slate-200 rounded-lg">
                %{Math.round(zoomScale * 100)}
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(1.2, Number((prev + 0.1).toFixed(2))))}
                className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold"
                title="Büyüt"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(1)}
                className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg text-[11px] font-bold"
                title="%100 Gerçek Boyut"
              >
                1:1
              </button>
            </div>
          </div>

          {/* Info Status */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Durum &amp; Sayfa
            </label>
            <div className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-700 flex items-center justify-between">
              <span>{questions.length} Soru Eklendi</span>
              <span className="font-bold text-indigo-600">
                {paginatedPages.length || 1} A4 Sayfa
              </span>
            </div>
          </div>
        </div>

        {/* Tip Banner */}
        <div className="flex items-center gap-2 p-3 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-amber-900 text-xs">
          <Info className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Öğretmen İpucu:</strong> Sarı çerçeveli alanlara (Okul Adı, Öğretmen İsmi vb.) doğrudan tıklayıp klavyenizden düzenleyebilirsiniz. Yazdırma çıktısında çerçeveler tamamen kaybolur.
          </span>
        </div>
      </div>

      {/* A4 PREVIEW WORKSPACE WRAPPER (Responsive with Touch Scrolling) */}
      <div className="w-full overflow-x-auto pb-8 flex flex-col items-center">
        {questions.length === 0 ? (
          /* Empty State Welcome Screen */
          <div className="ekran-gizle w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-14 text-center shadow-sm space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl mx-auto shadow-inner">
              ✨
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Sınav Hazırlama Robotuna Hoş Geldiniz!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Soru fotoğraflarınızı bilgisayardan veya telefonunuzdan yükleyin; çift sütunlu MEB ortak sınav kağıdınız otomatik dizilsin.
            </p>
            <div className="pt-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-indigo-600/20 transition-all"
              >
                <Camera className="w-4 h-4" />
                Soru Fotoğraflarını Seçin
              </button>
            </div>
          </div>
        ) : (
          /* Rendered A4 Pages */
          <div
            className="flex flex-col items-center gap-8 origin-top transition-transform duration-200"
            style={{
              transform: `scale(${zoomScale})`,
              marginBottom: zoomScale < 1 ? `-${(1 - zoomScale) * 1100}px` : undefined,
            }}
          >
            {paginatedPages.map((pageQuestions, pageIndex) => {
              const isFirstPage = pageIndex === 0;
              const isLastPage = pageIndex === paginatedPages.length - 1;
              const pageNumber = pageIndex + 1;

              return (
                <div
                  key={pageIndex}
                  className="a4-print-sayfa bg-white text-slate-900 rounded shadow-xl border border-slate-200 flex flex-col relative overflow-hidden pb-6 print:pb-5"
                  style={{
                    width: '210mm',
                    minHeight: '295mm',
                    padding: '10mm 12mm 10mm 12mm',
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Official Exam Header (Printed on First Page) */}
                  {isFirstPage && (
                    <div className="border-2 border-slate-900 p-2.5 mb-4 flex items-center justify-between gap-3 text-slate-900 min-h-[68px]">
                      {/* Left Header */}
                      <div className="flex-1 text-[11px] leading-relaxed">
                        <div>
                          <strong>Ders: </strong>
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => setCourseName(e.currentTarget.innerText.trim())}
                            className={`px-1.5 py-0.5 rounded cursor-text ${
                              isDefaultOrEmpty(courseName, DEFAULT_REMINDERS.courseName)
                                ? `bg-amber-50 border border-dashed border-amber-500 font-semibold text-amber-900 ${
                                    hasErrorBlink ? 'alan-hata' : ''
                                  }`
                                : 'bg-transparent border-transparent'
                            }`}
                          >
                            {courseName}
                          </span>
                        </div>
                        <div className="mt-1">
                          <strong>Tarih: </strong>
                          <span
                            contentEditable
                            suppressContentEditableWarning
                            onBlur={(e) => setDateInfo(e.currentTarget.innerText.trim())}
                            className={`px-1.5 py-0.5 rounded cursor-text ${
                              isDefaultOrEmpty(dateInfo, DEFAULT_REMINDERS.dateInfo)
                                ? `bg-amber-50 border border-dashed border-amber-500 font-semibold text-amber-900 ${
                                    hasErrorBlink ? 'alan-hata' : ''
                                  }`
                                : 'bg-transparent border-transparent'
                            }`}
                          >
                            {dateInfo}
                          </span>
                        </div>
                      </div>

                      {/* Center School Name */}
                      <div className="flex-[2] text-center">
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setSchoolName(e.currentTarget.innerText.trim())}
                          className={`text-sm font-black uppercase tracking-wide px-2 py-0.5 rounded cursor-text ${
                            isDefaultOrEmpty(schoolName, DEFAULT_REMINDERS.schoolName)
                              ? `bg-amber-50 border border-dashed border-amber-500 text-amber-900 ${
                                  hasErrorBlink ? 'alan-hata' : ''
                                }`
                              : 'bg-transparent border-transparent'
                          }`}
                        >
                          {schoolName}
                        </div>
                        <div
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setExamPeriod(e.currentTarget.innerText.trim())}
                          className={`text-[11px] font-medium text-slate-700 mt-0.5 px-1.5 py-0.5 rounded cursor-text ${
                            isDefaultOrEmpty(examPeriod, DEFAULT_REMINDERS.examPeriod)
                              ? `bg-amber-50 border border-dashed border-amber-500 text-amber-900 ${
                                  hasErrorBlink ? 'alan-hata' : ''
                                }`
                              : 'bg-transparent border-transparent'
                          }`}
                        >
                          {examPeriod}
                        </div>
                      </div>

                      {/* Right Student Info */}
                      <div className="border-l-2 border-slate-900 pl-3 flex-1 text-[11px] leading-tight text-slate-800 space-y-1">
                        <div>Adı:</div>
                        <div>Soyadı:</div>
                        <div>Sınıf / No:</div>
                      </div>
                    </div>
                  )}

                  {/* Question Grid */}
                  <div
                    className={`grid gap-3 flex-1 align-content-start ${
                      columnCount === '2' ? 'grid-cols-2' : 'grid-cols-1'
                    }`}
                  >
                    {pageQuestions.map((q, idx) => {
                      // Calculate question number across all pages
                      const globalIndex = questions.findIndex((item) => item.id === q.id);
                      const questionNumber = globalIndex !== -1 ? globalIndex + 1 : idx + 1;

                      return (
                        <div
                          key={q.id}
                          className="border border-slate-200 rounded-lg p-2.5 bg-white flex flex-col relative group print:border-none print:p-1"
                        >
                          {/* Question Number Badge */}
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-extrabold text-xs text-blue-700 bg-blue-50 px-2 py-0.5 rounded print:bg-transparent print:text-black print:p-0 print:text-sm">
                              Soru {questionNumber}
                            </span>

                            {/* Question delete button on screen */}
                            <button
                              type="button"
                              onClick={() => handleDeleteQuestion(q.id)}
                              className="ekran-gizle opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity"
                              title="Bu Soruyu Sil"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Question Image */}
                          <div className="flex items-center justify-center">
                            <img
                              src={q.image}
                              alt={`Soru ${questionNumber}`}
                              style={{
                                maxHeight:
                                  density === 'compact' ? '175px' : density === 'spacious' ? '250px' : '210px',
                              }}
                              className="max-w-full object-contain"
                            />
                          </div>

                          {/* Answer Spacing Area */}
                          {q.lineCount > 0 && (
                            <div
                              className="w-full"
                              style={{
                                height: `${q.lineCount * (density === 'compact' ? 20 : density === 'spacious' ? 26 : 24)}px`,
                              }}
                            />
                          )}

                          {/* Per-Question Line Setting (Hidden in Print) */}
                          <div className="ekran-gizle mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                            <span>Cevap Alanı:</span>
                            <select
                              value={q.lineCount}
                              onChange={(e) => handleQuestionLineChange(q.id, Number(e.target.value))}
                              className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700"
                            >
                              <option value="0">Boşluk Yok</option>
                              <option value="3">3 Satır</option>
                              <option value="5">5 Satır</option>
                              <option value="7">7 Satır</option>
                              <option value="10">10 Satır</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Exam Footer (Printed on Last Page) */}
                  {isLastPage && (
                    <div className="mt-auto border-t-2 border-slate-900 pt-2 mb-2 print:mb-1 flex items-center justify-between text-xs font-bold text-slate-900">
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setPointsNote(e.currentTarget.innerText.trim())}
                        className="cursor-text"
                      >
                        {pointsNote}
                      </div>

                      <div
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => setGoodLuckNote(e.currentTarget.innerText.trim())}
                        className="italic text-center flex-1 cursor-text"
                      >
                        {goodLuckNote}
                      </div>

                      <div className="text-right">
                        <span
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => setTeacherName(e.currentTarget.innerText.trim())}
                          className={`px-1.5 py-0.5 rounded cursor-text ${
                            isDefaultOrEmpty(teacherName, DEFAULT_REMINDERS.teacherName)
                              ? `bg-amber-50 border border-dashed border-amber-500 text-amber-900 ${
                                  hasErrorBlink ? 'alan-hata' : ''
                                }`
                              : 'bg-transparent border-transparent'
                          }`}
                        >
                          {teacherName}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Page Number */}
                  <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-slate-400 font-bold print:bottom-1.5 print:text-slate-600 pointer-events-none">
                    Sayfa {pageNumber}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
