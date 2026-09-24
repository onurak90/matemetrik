'use client';

import React, { useState, useMemo } from 'react';
import {
  Trophy, Award, AlertCircle, CheckCircle2, RefreshCw,
  Plus, Trash2, Printer, Share2, HelpCircle, ChevronRight,
  Sparkles, School, BookOpen, Star, FileText
} from 'lucide-react';

interface Course {
  id: string;
  name: string;
  hours: number;
  grade: number | '';
  isCustom?: boolean;
}

const DEFAULT_COURSES: Record<number, { name: string; hours: number }[]> = {
  4: [
    { name: 'Türkçe', hours: 8 },
    { name: 'Matematik', hours: 5 },
    { name: 'Fen Bilimleri', hours: 3 },
    { name: 'Sosyal Bilgiler', hours: 3 },
    { name: 'Yabancı Dil (İngilizce)', hours: 2 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'İnsan Hakları, Yurttaşlık ve Demokrasi', hours: 2 },
    { name: 'Trafik Güvenliği', hours: 1 },
    { name: 'Görsel Sanatlar', hours: 1 },
    { name: 'Müzik', hours: 1 },
    { name: 'Beden Eğitimi ve Oyun', hours: 5 },
  ],
  5: [
    { name: 'Türkçe', hours: 6 },
    { name: 'Matematik', hours: 5 },
    { name: 'Fen Bilimleri', hours: 4 },
    { name: 'Sosyal Bilgiler', hours: 3 },
    { name: 'Yabancı Dil (İngilizce)', hours: 3 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Bilişim Teknolojileri ve Yazılım', hours: 2 },
    { name: 'Görsel Sanatlar', hours: 1 },
    { name: 'Müzik', hours: 1 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Seçmeli Ders 1', hours: 2 },
    { name: 'Seçmeli Ders 2', hours: 2 },
    { name: 'Seçmeli Ders 3', hours: 2 },
  ],
  6: [
    { name: 'Türkçe', hours: 6 },
    { name: 'Matematik', hours: 5 },
    { name: 'Fen Bilimleri', hours: 4 },
    { name: 'Sosyal Bilgiler', hours: 3 },
    { name: 'Yabancı Dil (İngilizce)', hours: 3 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Bilişim Teknolojileri ve Yazılım', hours: 2 },
    { name: 'Görsel Sanatlar', hours: 1 },
    { name: 'Müzik', hours: 1 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Seçmeli Ders 1', hours: 2 },
    { name: 'Seçmeli Ders 2', hours: 2 },
    { name: 'Seçmeli Ders 3', hours: 2 },
  ],
  7: [
    { name: 'Türkçe', hours: 5 },
    { name: 'Matematik', hours: 5 },
    { name: 'Fen Bilimleri', hours: 4 },
    { name: 'Sosyal Bilgiler', hours: 3 },
    { name: 'Yabancı Dil (İngilizce)', hours: 4 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Teknoloji ve Tasarım', hours: 2 },
    { name: 'Görsel Sanatlar', hours: 1 },
    { name: 'Müzik', hours: 1 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Seçmeli Ders 1', hours: 2 },
    { name: 'Seçmeli Ders 2', hours: 2 },
    { name: 'Seçmeli Ders 3', hours: 2 },
  ],
  8: [
    { name: 'Türkçe', hours: 5 },
    { name: 'Matematik', hours: 5 },
    { name: 'Fen Bilimleri', hours: 4 },
    { name: 'T.C. İnkılap Tarihi ve Atatürkçülük', hours: 2 },
    { name: 'Yabancı Dil (İngilizce)', hours: 4 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Teknoloji ve Tasarım', hours: 2 },
    { name: 'Görsel Sanatlar', hours: 1 },
    { name: 'Müzik', hours: 1 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Rehberlik ve Kariyer Planlama', hours: 1 },
    { name: 'Seçmeli Ders 1', hours: 2 },
    { name: 'Seçmeli Ders 2', hours: 2 },
  ],
  9: [
    { name: 'Türk Dili ve Edebiyatı', hours: 5 },
    { name: 'Matematik', hours: 6 },
    { name: 'Fizik', hours: 2 },
    { name: 'Kimya', hours: 2 },
    { name: 'Biyoloji', hours: 2 },
    { name: 'Tarih', hours: 2 },
    { name: 'Coğrafya', hours: 2 },
    { name: 'Birinci Yabancı Dil (İngilizce)', hours: 4 },
    { name: 'İkinci Yabancı Dil (Almanca/Fransızca)', hours: 2 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Görsel Sanatlar / Müzik', hours: 2 },
    { name: 'Sağlık Bilgisi ve Trafik Kültürü', hours: 1 },
    { name: 'Seçmeli Ders 1', hours: 2 },
    { name: 'Seçmeli Ders 2', hours: 2 },
  ],
  10: [
    { name: 'Türk Dili ve Edebiyatı', hours: 5 },
    { name: 'Matematik', hours: 6 },
    { name: 'Fizik', hours: 2 },
    { name: 'Kimya', hours: 2 },
    { name: 'Biyoloji', hours: 2 },
    { name: 'Tarih', hours: 2 },
    { name: 'Coğrafya', hours: 2 },
    { name: 'Felsefe', hours: 2 },
    { name: 'Birinci Yabancı Dil (İngilizce)', hours: 4 },
    { name: 'İkinci Yabancı Dil (Almanca/Fransızca)', hours: 2 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Görsel Sanatlar / Müzik', hours: 2 },
    { name: 'Seçmeli Dersler', hours: 4 },
  ],
  11: [
    { name: 'Türk Dili ve Edebiyatı', hours: 5 },
    { name: 'Tarih', hours: 2 },
    { name: 'Felsefe', hours: 2 },
    { name: 'Birinci Yabancı Dil (İngilizce)', hours: 4 },
    { name: 'İkinci Yabancı Dil (Almanca)', hours: 2 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Görsel Sanatlar / Müzik', hours: 2 },
    { name: 'İleri Matematik (Alan)', hours: 6 },
    { name: 'İleri Fizik (Alan)', hours: 4 },
    { name: 'İleri Kimya (Alan)', hours: 4 },
    { name: 'İleri Biyoloji (Alan)', hours: 4 },
    { name: 'Seçmeli Ders', hours: 1 },
  ],
  12: [
    { name: 'Türk Dili ve Edebiyatı', hours: 5 },
    { name: 'T.C. İnkılap Tarihi ve Atatürkçülük', hours: 2 },
    { name: 'Birinci Yabancı Dil (İngilizce)', hours: 4 },
    { name: 'İkinci Yabancı Dil (Almanca)', hours: 2 },
    { name: 'Din Kültürü ve Ahlak Bilgisi', hours: 2 },
    { name: 'Beden Eğitimi ve Spor', hours: 2 },
    { name: 'Görsel Sanatlar / Müzik', hours: 2 },
    { name: 'İleri Matematik (Alan)', hours: 6 },
    { name: 'İleri Fizik (Alan)', hours: 4 },
    { name: 'İleri Kimya (Alan)', hours: 4 },
    { name: 'İleri Biyoloji (Alan)', hours: 4 },
    { name: 'Seçmeli Ders', hours: 3 },
  ],
};

function createInitialCourses(grade: number): Course[] {
  const template = DEFAULT_COURSES[grade] || DEFAULT_COURSES[8];
  return template.map((c, idx) => ({
    id: `c_${grade}_${idx}_${Date.now()}`,
    name: c.name,
    hours: c.hours,
    grade: '',
  }));
}

export default function TakdirTesekkurTool() {
  const [selectedGrade, setSelectedGrade] = useState<number>(8);
  const [courses, setCourses] = useState<Course[]>(() => createInitialCourses(8));
  const [hasDisciplinePenalty, setHasDisciplinePenalty] = useState(false);
  const [unexcusedAbsence, setUnexcusedAbsence] = useState<number>(0);
  const [customCourseName, setCustomCourseName] = useState('');
  const [customCourseHours, setCustomCourseHours] = useState<number>(2);

  const handleGradeChange = (grade: number) => {
    setSelectedGrade(grade);
    setCourses(createInitialCourses(grade));
  };

  const handleScoreChange = (id: string, val: string) => {
    const num = val === '' ? '' : Math.min(100, Math.max(0, parseFloat(val) || 0));
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, grade: num } : c))
    );
  };

  const handleHoursChange = (id: string, val: number) => {
    const hours = Math.max(1, Math.min(15, val || 1));
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hours } : c))
    );
  };

  const handleRemoveCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddCustomCourse = () => {
    if (!customCourseName.trim()) return;
    const newCourse: Course = {
      id: `custom_${Date.now()}`,
      name: customCourseName.trim(),
      hours: customCourseHours || 2,
      grade: '',
      isCustom: true,
    };
    setCourses((prev) => [...prev, newCourse]);
    setCustomCourseName('');
  };

  const handleReset = () => {
    setCourses(createInitialCourses(selectedGrade));
    setHasDisciplinePenalty(false);
    setUnexcusedAbsence(0);
  };

  // Calculations
  const calculationResult = useMemo(() => {
    let totalWeightedScore = 0;
    let totalHours = 0;
    let filledCount = 0;
    let hasFailingGrade = false; // Ders notu 50'nin altında olan var mı?
    let turkishFailed = false; // Ortaokulda Türkçe 70 altı mı?
    const failingCourses: string[] = [];

    courses.forEach((c) => {
      if (typeof c.grade === 'number') {
        filledCount++;
        totalWeightedScore += c.grade * c.hours;
        totalHours += c.hours;

        // MEB Zayıf Kuralı: Ortaokulda Türkçe < 70, diğerleri < 50; Lisede herhangi biri < 50
        const isMiddleSchool = selectedGrade >= 5 && selectedGrade <= 8;
        if (isMiddleSchool && c.name.toLowerCase().includes('türkçe') && c.grade < 70) {
          turkishFailed = true;
          failingCourses.push(`${c.name} (${c.grade}) - Ortaokulda Türkçe en az 70 olmalıdır.`);
        } else if (c.grade < 50) {
          hasFailingGrade = true;
          failingCourses.push(`${c.name} (${c.grade})`);
        }
      }
    });

    const average = totalHours > 0 ? totalWeightedScore / totalHours : 0;
    const isHighSchool = selectedGrade >= 9;
    const absenceExceeded = isHighSchool && unexcusedAbsence > 5;

    let status: 'takdir' | 'tesekkur' | 'none' = 'none';
    let disqualificationReason = '';

    if (hasDisciplinePenalty) {
      disqualificationReason = 'Kınama veya disiplin cezası alan öğrenciler başarı belgesi alamaz.';
    } else if (absenceExceeded) {
      disqualificationReason = 'MEB Ortaöğretim Yönetmeliği gereği özürsüz devamsızlığı 5 günü aşan öğrenciler takdir ve teşekkür alamaz.';
    } else if (turkishFailed) {
      disqualificationReason = 'MEB kurallarına göre ortaokulda Türkçe dersi 70 puanın altında olan öğrencilere takdir/teşekkür verilmez.';
    } else if (hasFailingGrade) {
      disqualificationReason = 'MEB kuralları gereği herhangi bir dersinde 50 puanın altında (zayıfı) olan öğrenciler ortalamaları yüksek olsa dahi belge alamaz.';
    } else {
      if (average >= 85.0) {
        status = 'takdir';
      } else if (average >= 70.0) {
        status = 'tesekkur';
      }
    }

    return {
      average: Number(average.toFixed(2)),
      totalHours,
      filledCount,
      totalCourses: courses.length,
      status,
      disqualificationReason,
      failingCourses,
      isComplete: filledCount === courses.length && courses.length > 0,
    };
  }, [courses, selectedGrade, hasDisciplinePenalty, unexcusedAbsence]);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const text = `Matemetrik ile ${selectedGrade}. Sınıf Karne Notumu Hesapladım! Ortalamam: ${calculationResult.average} - ${
      calculationResult.status === 'takdir'
        ? '🏆 Takdir Belgesi'
        : calculationResult.status === 'tesekkur'
        ? '🎖️ Teşekkür Belgesi'
        : '📚 Karne Notum'
    }. Sen de hemen hesapla: https://www.matemetrik.com/takdir-tesekkur-hesaplama`;

    if (navigator.share) {
      navigator.share({
        title: 'Takdir Teşekkür Hesaplama Sonucu',
        text: text,
        url: 'https://www.matemetrik.com/takdir-tesekkur-hesaplama',
      }).catch(() => {});
    } else {
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="space-y-8">
      {/* Sınıf Seçici Haplar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <School className="w-4 h-4 text-indigo-600" />
            Lütfen Sınıfınızı Seçin:
          </label>
          <span className="text-xs text-slate-500 font-medium">
            Seçtiğiniz sınıfa göre MEB haftalık ders saatleri otomatik yüklenir.
          </span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => handleGradeChange(g)}
              className={`py-3 px-2 rounded-2xl text-xs sm:text-sm font-black transition-all border-2 text-center cursor-pointer ${
                selectedGrade === g
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-600 shadow-lg scale-105'
                  : 'bg-slate-50 hover:bg-white text-slate-700 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>{g}. Sınıf</div>
              <div className="text-[10px] font-bold opacity-80 mt-0.5">
                {g <= 4 ? 'İlkokul' : g <= 8 ? 'Ortaokul' : 'Lise'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Ana Hesaplama Bölümü: Sol Tablo + Sağ Canlı Sonuç Kartı */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sol Kolon: Dersler & Not Girişi */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-2">
            <div>
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>{selectedGrade}. Sınıf Dersleri ve Dönem Notları</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                E-okul 1. ve 2. yazılı, sözlü/proje notlarınızın ders ortalamasını (100 üzerinden) girin.
              </p>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 border border-slate-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Sıfırla
            </button>
          </div>

          {/* Dersler Tablosu */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold">
                  <th className="pb-3 px-2">Ders Adı</th>
                  <th className="pb-3 px-2 w-24 sm:w-28 text-center">Haftalık Saat</th>
                  <th className="pb-3 px-2 w-28 sm:w-36 text-center">Ders Notu (0-100)</th>
                  <th className="pb-3 px-2 w-24 text-right hidden sm:table-cell">Ağırlıklı Puan</th>
                  <th className="pb-3 px-2 w-10 text-center">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {courses.map((course) => {
                  const numGrade = typeof course.grade === 'number' ? course.grade : 0;
                  const weighted = (numGrade * course.hours).toFixed(1);
                  const isLow = typeof course.grade === 'number' && course.grade < 50;
                  const isTurkishLow =
                    selectedGrade <= 8 &&
                    course.name.toLowerCase().includes('türkçe') &&
                    typeof course.grade === 'number' &&
                    course.grade < 70;

                  return (
                    <tr
                      key={course.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isLow || isTurkishLow ? 'bg-rose-50/40' : ''
                      }`}
                    >
                      <td className="py-2.5 px-2 font-medium text-slate-900">
                        <div className="flex items-center gap-1.5">
                          <span>{course.name}</span>
                          {course.isCustom && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                              Eklenen
                            </span>
                          )}
                          {(isLow || isTurkishLow) && (
                            <span
                              className="text-[10px] px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold"
                              title={isTurkishLow ? 'Ortaokulda Türkçe en az 70 olmalıdır' : 'Geçme notu 50’dir'}
                            >
                              ⚠️ Zayıf
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="1"
                          max="15"
                          value={course.hours}
                          onChange={(e) => handleHoursChange(course.id, parseInt(e.target.value) || 1)}
                          className="w-16 py-1.5 px-2 text-center rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-bold text-slate-800"
                        />
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          placeholder="Not (0-100)"
                          value={course.grade}
                          onChange={(e) => handleScoreChange(course.id, e.target.value)}
                          className={`w-24 sm:w-28 py-1.5 px-2 text-center rounded-xl border font-bold text-slate-900 transition-colors ${
                            isLow || isTurkishLow
                              ? 'border-rose-400 bg-rose-50/60 focus:border-rose-500'
                              : 'border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                          }`}
                        />
                      </td>
                      <td className="py-2.5 px-2 text-right font-mono font-bold text-slate-600 hidden sm:table-cell">
                        {typeof course.grade === 'number' ? weighted : '-'}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleRemoveCourse(course.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                          title="Bu dersi listeden çıkar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Yeni Seçmeli / Özel Ders Ekle Formu */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="Yeni Seçmeli Ders Adı (Örn: Robotik Kodlama)"
              value={customCourseName}
              onChange={(e) => setCustomCourseName(e.target.value)}
              className="flex-1 py-2 px-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="number"
                min="1"
                max="10"
                value={customCourseHours}
                onChange={(e) => setCustomCourseHours(parseInt(e.target.value) || 2)}
                className="w-20 py-2 px-2 text-center rounded-xl border border-slate-200 text-xs sm:text-sm font-bold"
                title="Haftalık Ders Saati"
              />
              <button
                type="button"
                onClick={handleAddCustomCourse}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Ders Ekle
              </button>
            </div>
          </div>

          {/* MEB Şartları & Disiplin Kontrolleri */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              MEB Yönetmelik Şartları &amp; Devamsızlık Durumu:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 flex items-start gap-2.5 cursor-pointer hover:bg-slate-100 transition-colors">
                <input
                  type="checkbox"
                  checked={hasDisciplinePenalty}
                  onChange={(e) => setHasDisciplinePenalty(e.target.checked)}
                  className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <div>
                  <span className="font-bold text-slate-900 block">Kınama veya Disiplin Cezası</span>
                  <span className="text-slate-500 text-[11px]">
                    Dönem içinde kınama/disiplin cezası alan öğrenciler belge alamaz.
                  </span>
                </div>
              </label>

              {selectedGrade >= 9 && (
                <div className="p-3 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Özürsüz Devamsızlık (Gün):</span>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={unexcusedAbsence}
                      onChange={(e) => setUnexcusedAbsence(Math.max(0, parseFloat(e.target.value) || 0))}
                      className="w-16 py-1 px-2 text-center rounded-lg border border-slate-300 font-bold text-slate-900"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 block">
                    Lisede özürsüz 5 günü aşan devamsızlıkta takdir/teşekkür verilmez.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Kolon: Canlı Sonuç Kartı (Sticky) */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
          <div className="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase text-indigo-300 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                Karne Notu Analizi
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 font-mono">
                {selectedGrade}. Sınıf
              </span>
            </div>

            {/* Ağırlıklı Ortalama Büyük Gösterge */}
            <div className="text-center py-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md space-y-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Dönem Sonu Ağırlıklı Not Ortalaması
              </div>
              <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-emerald-300 tracking-tight font-mono">
                {calculationResult.average}
              </div>
              <div className="text-xs text-slate-400">
                Toplam {calculationResult.totalHours} Haftalık Ders Saati Üzerinden
              </div>
            </div>

            {/* Belge Durumu Kartı */}
            <div className="space-y-3">
              {calculationResult.disqualificationReason ? (
                <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-rose-100 text-sm">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Belge Alınamıyor</span>
                  </div>
                  <p className="text-xs leading-relaxed text-rose-200">
                    {calculationResult.disqualificationReason}
                  </p>
                </div>
              ) : calculationResult.status === 'takdir' ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border border-yellow-400/50 text-yellow-100 text-center space-y-2 shadow-lg">
                  <Trophy className="w-10 h-10 text-yellow-300 mx-auto animate-bounce" />
                  <div className="text-lg font-black text-white">
                    🏆 TEBRİKLER, TAKDİR BELGESİ!
                  </div>
                  <p className="text-xs text-yellow-200 leading-relaxed font-medium">
                    85.00 ve üzeri ortalama başarısı göstererek MEB Takdir Belgesi almaya hak kazandınız.
                  </p>
                </div>
              ) : calculationResult.status === 'tesekkur' ? (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 border border-cyan-400/50 text-cyan-100 text-center space-y-2 shadow-lg">
                  <Award className="w-10 h-10 text-cyan-300 mx-auto" />
                  <div className="text-lg font-black text-white">
                    🎖️ TEŞEKKÜR BELGESİ ALIYORSUNUZ!
                  </div>
                  <p className="text-xs text-cyan-200 leading-relaxed font-medium">
                    70.00 - 84.99 arası başarı göstererek Teşekkür Belgesi kazandınız.
                  </p>
                  <div className="text-[11px] pt-1 text-yellow-300 font-bold">
                    ⭐ Takdir belgesi için {(85.0 - calculationResult.average).toFixed(2)} puan kaldı!
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-center space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
                  <div className="text-base font-bold text-white">
                    Henüz Belge Barajına Ulaşılmadı
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Teşekkür belgesi için en az 70.00, Takdir belgesi için en az 85.00 ortalama gerekmektedir.
                  </p>
                  {calculationResult.average > 0 && calculationResult.average < 70 && (
                    <div className="text-xs font-bold text-amber-300 pt-1">
                      Teşekkür için gereken fark: {(70.0 - calculationResult.average).toFixed(2)} puan
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* İlerleme Çubuğu */}
            <div className="space-y-1.5 pt-2 border-t border-white/10">
              <div className="flex justify-between text-[11px] font-bold text-slate-400">
                <span>0.00</span>
                <span className="text-cyan-400">70.0 (Teşekkür)</span>
                <span className="text-yellow-400">85.0 (Takdir)</span>
                <span>100</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-white/10">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    calculationResult.average >= 85
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                      : calculationResult.average >= 70
                      ? 'bg-gradient-to-r from-blue-400 to-cyan-400'
                      : 'bg-indigo-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, calculationResult.average))}%` }}
                />
              </div>
            </div>

            {/* Butonlar: Yazdır & Paylaş */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-white/15"
              >
                <Printer className="w-3.5 h-3.5" /> Yazdır / PDF
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <Share2 className="w-3.5 h-3.5" /> Paylaş
              </button>
            </div>
          </div>

          {/* Hızlı Bilgilendirme Kutusu */}
          <div className="p-5 rounded-3xl bg-indigo-50/80 border border-indigo-100 text-indigo-950 space-y-2 text-xs leading-relaxed">
            <div className="font-black flex items-center gap-1.5 text-indigo-900">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              MEB Yönetmelik Hatırlatması
            </div>
            <p className="text-slate-600">
              Ortalamanız 85 veya 70 üzeri olsa dahi, <strong>herhangi bir dersinizin notu 50’nin altındaysa</strong> (ortaokulda Türkçe için 70 altıysa) veya lisede özürsüz devamsızlığınız 5 günü geçmişse takdir ya da teşekkür belgesi düzenlenemez.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
