'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText, Plus, Trash2, Printer, Download,
  CheckCircle, ChevronRight, Settings2
} from 'lucide-react';

interface Question {
  id: number;
  text: string;
  points: number;
}

export default function SinavHazirlamaPage() {
  const [schoolName, setSchoolName] = useState('.................... ANADOLU LİSESİ');
  const [examTitle, setExamTitle] = useState('2025-2026 EĞİTİM ÖĞRETİM YILI 10. SINIF MATEMATİK DERSİ 1. DÖNEM 2. YAZILI SINAVI');
  const [columns, setColumns] = useState<'single' | 'double'>('double');
  const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: 'P(x) = 2x³ - 5x² + 4x - 1 polinomunun (x - 2) ile bölümünden kalanı bulunuz.', points: 10 },
    { id: 2, text: 'i² = -1 olmak üzere, z = 3 - 4i karmaşık sayısının eşleniğini ve modülünü bulunuz.', points: 10 },
    { id: 3, text: 'f(x) = 2x + 5 olduğuna göre f⁻¹(x) ters fonksiyonunu bulunuz.', points: 10 },
    { id: 4, text: 'x² - 5x + 6 = 0 denkleminin çözüm kümesini bulunuz.', points: 10 },
    { id: 5, text: 'Bir torbada 4 kırmızı, 5 beyaz bilye vardır. Rastgele çekilen 2 bilyenin farklı renkte olma olasılığını bulunuz.', points: 10 },
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionPoints, setNewQuestionPoints] = useState(10);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        text: newQuestionText.trim(),
        points: newQuestionPoints,
      },
    ]);
    setNewQuestionText('');
  };

  const handleDeleteQuestion = (id: number) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handlePrint = () => {
    window.print();
  };

  const totalPoints = questions.reduce((acc, q) => acc + q.points, 0);

  return (
    <div className="py-10 pb-24 space-y-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 print:hidden">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Sınav Hazırlama Robotu</span>
        </nav>

        {/* Screen Controls Header (Hidden in Print) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm print:hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <FileText className="w-7 h-7 text-indigo-600" />
                MEB Uyumlu Yazılı ve Sınav Hazırlama Robotu
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Okul ve sınav bilgilerini düzenleyin, soruları ekleyin ve resmi A4 sınav kağıdı çıktısı alın.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/20 transition-all"
            >
              <Printer className="w-4 h-4" />
              Sınav Kağıdını Yazdır / PDF İndir
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Okul Adı</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Sınav Başlığı</label>
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                className="w-full p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Add Question Form */}
          <form onSubmit={handleAddQuestion} className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <input
              type="text"
              placeholder="Yeni soru metnini yazın..."
              value={newQuestionText}
              onChange={(e) => setNewQuestionText(e.target.value)}
              className="flex-1 p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Puan"
                value={newQuestionPoints}
                onChange={(e) => setNewQuestionPoints(Number(e.target.value))}
                className="w-20 p-2.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-colors whitespace-nowrap"
              >
                + Soru Ekle
              </button>
            </div>
          </form>
        </div>

        {/* PRINTABLE A4 PREVIEW CONTAINER */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-300 shadow-md font-sans text-black print:p-0 print:border-none print:shadow-none print:rounded-none">
          {/* Header MEB style */}
          <div className="border-b-2 border-black pb-4 mb-6">
            <div className="text-center font-bold text-sm tracking-wider uppercase">
              T.C. MİLLÎ EĞİTİM BAKANLIĞI
            </div>
            <div className="text-center font-bold text-base mt-0.5 uppercase">
              {schoolName}
            </div>
            <div className="text-center font-semibold text-xs mt-1">
              {examTitle}
            </div>

            {/* Student Info Table */}
            <div className="grid grid-cols-4 border border-black mt-4 text-xs">
              <div className="p-1.5 border-r border-black font-semibold">Adı Soyadı:</div>
              <div className="p-1.5 border-r border-black font-semibold">Sınıfı / Şubesi:</div>
              <div className="p-1.5 border-r border-black font-semibold">Numarası:</div>
              <div className="p-1.5 font-semibold text-right">Aldığı Puan: / {totalPoints}</div>
            </div>
          </div>

          {/* Question List */}
          <div className={`grid gap-6 ${columns === 'double' ? 'grid-cols-1 md:grid-cols-2 print:grid-cols-2' : 'grid-cols-1'}`}>
            {questions.map((q, idx) => (
              <div key={q.id} className="min-h-[140px] flex flex-col justify-between p-3 border border-dashed border-slate-300 print:border-none">
                <div>
                  <div className="flex items-start justify-between gap-2 font-semibold text-xs">
                    <span><strong>Soru {idx + 1})</strong> {q.text}</span>
                    <span className="shrink-0 text-slate-500 font-mono">({q.points}p)</span>
                  </div>
                </div>

                {/* Answer space */}
                <div className="pt-12 text-[10px] text-slate-400 font-mono text-right print:text-transparent">
                  Çözüm Alanı
                </div>

                <div className="print:hidden text-right pt-1">
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-[10px] text-rose-500 hover:underline"
                  >
                    Soruyu Sil
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-4 border-t border-black flex items-center justify-between text-[11px] font-semibold">
            <span>Süre: 40 Dakikadır.</span>
            <span>Başarılar Dileriz.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
