'use client';

import React, { useState, useRef } from 'react';
import {
  Camera, Printer, Trash2, Columns, LayoutGrid, Sparkles,
  AlertTriangle, Check, RotateCcw,
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
  const [globalLineCount, setGlobalLineCount] = useState<number>(5);
  const [showPageNumber, setShowPageNumber] = useState<boolean>(false);
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

    // Usable vertical pixel heights for A4 with 8mm top/bottom margins (usable height = 281mm = ~1062px):
    // Page 1 has official exam header (~85px) + footer (~35px) + safety buffer, usable ~890px.
    // Subsequent pages have minimal sub-header (~25px) + footer (~35px) + safety buffer, usable ~930px.
    const page1MaxHeight = 890;
    const subsequentMaxHeight = 930;

    const getQuestionHeight = (q: QuestionItem): number => {
      const baseHeight = 115; // question badge (~20px), image (capped at max-h 115px, avg 80-95px), card padding/gap
      const linesHeight = (q.lineCount || 0) * 18; // 18px per blank spacing unit
      return baseHeight + linesHeight;
    };

    let currentPage: QuestionItem[] = [];
    let currentHeight = 0;
    let isFirstPage = true;

    if (isDouble) {
      // In 2-column mode, questions are grouped in pairs (row-by-row).
      // Each row height is max(q1.height, q2.height) + gap
      let i = 0;
      while (i < questions.length) {
        const q1 = questions[i];
        const q2 = i + 1 < questions.length ? questions[i + 1] : null;

        const q1H = getQuestionHeight(q1);
        const q2H = q2 ? getQuestionHeight(q2) : q1H;
        const rowH = Math.max(q1H, q2H) + 10; // 10px row gap

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
        const qH = getQuestionHeight(q) + 10;
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
    <div className="space-y-6">
      {/* Dynamic Print Stylesheet to guarantee EXACT 1:1 page printing without blank pages */}
      <style>{`
        @keyframes subtlePulse {
          0%, 100% { border-color: #f59e0b; background-color: #fef3c7; }
          50% { border-color: #e11d48; background-color: #ffe4e6; }
        }
        .alan-hata {
          animation: subtlePulse 0.5s ease-in-out 3;
          border-color: #e11d48 !important;
          color: #be123c !important;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm 10mm 8mm 10mm !important;
          }
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            height: auto !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .ekran-gizle {
            display: none !important;
          }
          .a4-print-container {
            display: block !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
          }
          .a4-print-sayfa {
            box-sizing: border-box !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            overflow: visible !important;
            position: relative !important;
            display: block !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
          .a4-print-sayfa:not(:last-child) {
            page-break-after: always !important;
            break-after: page !important;
          }
          .a4-print-sayfa:last-child {
            page-break-after: avoid !important;
            break-after: avoid !important;
          }
          .sinav-kapanis-alani {
            margin-top: 14px !important;
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

          {/* Quick Line Spacing */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              ⚡ Toplu Boşluk (Tüm Sorular)
            </label>
            <select
              value={globalLineCount}
              onChange={(e) => handleGlobalLineChange(Number(e.target.value))}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="0">⚪ Boşluk Yok (Yalnızca Soru)</option>
              <option value="3">📐 Küçük Boşluk (3 Satır)</option>
              <option value="5">📐 Standart Boşluk (5 Satır - MEB)</option>
              <option value="7">📐 Geniş Boşluk (7 Satır)</option>
              <option value="10">📐 Maksimum Boşluk (10 Satır)</option>
            </select>
          </div>

          {/* Page Number Option */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Sayfa Numarası
            </label>
            <select
              value={showPageNumber ? 'top' : 'none'}
              onChange={(e) => setShowPageNumber(e.target.value === 'top')}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="none">🚫 Sayfa Numarası Yok (Önerilen)</option>
              <option value="top">📄 Üst Antette Göster (Taşmaz)</option>
            </select>
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
            <strong>Öğretmen İpucu:</strong> Okul Adı ve Öğretmen İsmi gibi sarı çerçeveli alanlara tıklayıp doğrudan düzenleyebilirsiniz. Her sorunun altındaki boşluğu diğer soruları etkilemeden dilediğiniz gibi ayrı ayrı da değiştirebilirsiniz.
          </span>
        </div>
      </div>

      {/* A4 PREVIEW WORKSPACE WRAPPER */}
      <div className="w-full overflow-x-auto pb-8 flex flex-col items-center print:p-0 print:m-0 print:overflow-visible print:block">
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
            <div className="pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-2xl shadow-lg shadow-indigo-600/20 transition-all"
              >
                <Camera className="w-4 h-4" />
                Soru Fotoğrafı Seç
              </button>
            </div>
          </div>
        ) : (
          /* Rendered A4 Pages */
          <div className="a4-print-container flex flex-col items-center gap-8 w-full max-w-[210mm] mx-auto print:gap-0 print:m-0 print:p-0 print:block">
            {paginatedPages.map((pageQuestions, pageIndex) => {
              const isFirstPage = pageIndex === 0;
              const isLastPage = pageIndex === paginatedPages.length - 1;
              const pageNumber = pageIndex + 1;

              return (
                <div
                  key={pageIndex}
                  className="a4-print-sayfa bg-white text-slate-900 rounded-2xl shadow-xl border border-slate-200 flex flex-col relative w-full min-h-[297mm] p-[10mm_12mm] print:min-h-0 print:h-auto print:p-0 print:border-none print:shadow-none print:rounded-none print:block"
                  style={{
                    boxSizing: 'border-box',
                  }}
                >
                  {/* Official Exam Header (Printed on First Page) */}
                  {isFirstPage && (
                    <div className="shrink-0 border-2 border-slate-900 p-2.5 mb-3 flex items-center justify-between gap-3 text-slate-900 min-h-[64px]">
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
                        {showPageNumber && (
                          <div className="text-[10px] font-bold text-slate-600 print:text-black mt-1">
                            Sayfa: 1 / {paginatedPages.length}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Subtle Sub-header for Page 2 and beyond */}
                  {!isFirstPage && (
                    <div className="shrink-0 mb-3 pb-1 border-b border-slate-300 print:border-slate-700 flex items-center justify-between text-[11px] text-slate-600 print:text-black font-semibold min-h-[20px]">
                      <span className="truncate max-w-[140mm]">
                        {schoolName && !isDefaultOrEmpty(schoolName, DEFAULT_REMINDERS.schoolName)
                          ? `${schoolName} `
                          : ''}
                        {courseName && !isDefaultOrEmpty(courseName, DEFAULT_REMINDERS.courseName)
                          ? `- ${courseName}`
                          : ''}
                      </span>
                      {showPageNumber && (
                        <span className="font-bold shrink-0">
                          Sayfa {pageNumber} / {paginatedPages.length}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Question Grid */}
                  <div
                    className={`grid gap-3 flex-1 content-start items-start min-h-0 print:gap-2 ${
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
                          className="border border-slate-200 rounded-lg p-2.5 bg-white flex flex-col justify-start relative group print:border-none print:p-1"
                        >
                          <div>
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
                                style={{ maxHeight: '115px' }}
                                className="max-w-full object-contain"
                              />
                            </div>
                          </div>

                          {/* Clean Blank Answer Spacing Area (No lines, clean whitespace for student writing) */}
                          {q.lineCount > 0 && (
                            <div
                              className="w-full select-none pointer-events-none"
                              style={{ height: `${q.lineCount * 18}px` }}
                            />
                          )}

                          {/* Per-Question Line Setting (Hidden in Print) */}
                          <div className="ekran-gizle mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                            <span className="font-semibold text-slate-600">Bu Soru İçin Boşluk:</span>
                            <select
                              value={q.lineCount}
                              onChange={(e) => handleQuestionLineChange(q.id, Number(e.target.value))}
                              className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-[10px] text-slate-700 font-medium cursor-pointer"
                            >
                              <option value="0">Boşluk Yok</option>
                              <option value="2">2 Satır Boşluk</option>
                              <option value="3">3 Satır Boşluk</option>
                              <option value="4">4 Satır Boşluk</option>
                              <option value="5">5 Satır Boşluk</option>
                              <option value="6">6 Satır Boşluk</option>
                              <option value="8">8 Satır Boşluk</option>
                              <option value="10">10 Satır Boşluk</option>
                              <option value="12">12 Satır Boşluk</option>
                            </select>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Exam Ending / Signature Area (In-flow on the last page only - NEVER causes page overflow) */}
                  {isLastPage && (
                    <div className="sinav-kapanis-alani shrink-0 mt-auto pt-2 border-t border-slate-300 print:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-900 print:text-black print:mt-3.5 print:pt-1.5">
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
