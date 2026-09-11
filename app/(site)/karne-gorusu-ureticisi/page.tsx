'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles, Copy, Check, RefreshCw, BookOpen,
  GraduationCap, Award, ChevronRight
} from 'lucide-react';

export default function KarneGorusuPage() {
  const [studentName, setStudentName] = useState('');
  const [gradeLevel, setGradeLevel] = useState<'ilkokul' | 'ortaokul' | 'lise'>('ortaokul');
  const [gender, setGender] = useState<'kiz' | 'erkek'>('kiz');
  const [selectedTraits, setSelectedTraits] = useState<string[]>([
    'ders_katilim', 'odev_sorumluluk', 'matematik_ustun'
  ]);
  const [generatedResults, setGeneratedResults] = useState<string[]>([
    'Dönem boyunca sergilediğin üstün gayret, ders içi aktif katılımın ve sorumluluk bilincin takdire şayan. Matematik dersindeki analitik düşünme becerin ve çözüm odaklı yaklaşımın başarını taçlandırdı. Tatilde bol bol dinlenip kitap okumanı diler, tebrik ederim.',
    'Saygılı tutumun, düzenli ders çalışma disiplinin ve matematiksel problemlere getirdiğin özgün bakış açıları ile örnek bir öğrencisin. İkinci dönemde de aynı kararlılıkla hedeflerine yürüyeceğine inanıyorum. İyi tatiller!',
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const traits = [
    { id: 'ders_katilim', label: 'Ders İçi Katılımı Yüksek' },
    { id: 'odev_sorumluluk', label: 'Ödev ve Görev Bilinci Tam' },
    { id: 'matematik_ustun', label: 'Matematik & Mantık Becerisi Üstün' },
    { id: 'kitap_sevgisi', label: 'Kitap Okuma Alışkanlığı Çok İyi' },
    { id: 'sosyal_lider', label: 'Arkadaş Canlısı & Lider Ruhlu' },
    { id: 'gayret_artmali', label: 'Potansiyeli Var, Gayreti Artmalı' },
    { id: 'sakin_sessiz', label: 'Sakin, Uyumlu ve Saygılı' },
    { id: 'hedef_odakli', label: 'Sınav ve Hedef Odaklı Çalışan' },
  ];

  const toggleTrait = (id: string) => {
    setSelectedTraits((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    const namePrefix = studentName.trim() ? `${studentName.trim()}, ` : '';
    
    const openingOptions = [
      `${namePrefix}dönem boyunca gösterdiğin üstün gayret ve örnek davranışların için seni gönülden kutlarım.`,
      `${namePrefix}derslerdeki istikrarlı duruşun, öğrenme arzun ve çalışma disiplinin hepimizi gururlandırdı.`,
      `${namePrefix}başarılı ve verimli bir dönemi geride bırakırken sergilediğin azim takdire şayan.`,
    ];

    const bodyParts: string[] = [];
    if (selectedTraits.includes('ders_katilim')) {
      bodyParts.push('Derslerdeki aktif katılımın ve cesurca sorduğun sorularla sınıf atmosferine daima değer kattın.');
    }
    if (selectedTraits.includes('odev_sorumluluk')) {
      bodyParts.push('Verilen tüm ödev ve görevleri eksiksiz, zamanında teslim etmen sorumluluk bilincinin ne denli yüksek olduğunu kanıtladı.');
    }
    if (selectedTraits.includes('matematik_ustun')) {
      bodyParts.push('Özellikle matematiksel problem çözme ve analitik düşünme yeteneğinle harika sonuçlara imza attın.');
    }
    if (selectedTraits.includes('kitap_sevgisi')) {
      bodyParts.push('Okuma alışkanlığın sayesinde kelime dağarcığını ve kavrama becerini sürekli zenginleştirdin.');
    }
    if (selectedTraits.includes('sosyal_lider')) {
      bodyParts.push('Arkadaşlarınla kurduğun sevgi dolu iletişim ve grup çalışmalarındaki liderliğin çok kıymetliydi.');
    }
    if (selectedTraits.includes('gayret_artmali')) {
      bodyParts.push('Sahip olduğun yüksek potansiyeli daha düzenli ve planlı bir çalışmayla birleştirdiğinde çok daha büyük başarılara ulaşacağına inanıyorum.');
    }
    if (selectedTraits.includes('sakin_sessiz')) {
      bodyParts.push('Nezaketin, efendiliğin ve sakin çalışma tarzınla öğretmenlerinin ve arkadaşlarının takdirini kazandın.');
    }
    if (selectedTraits.includes('hedef_odakli')) {
      bodyParts.push('Geleceğine yönelik koyduğun hedefler doğrultusunda yılmadan, disiplinle ilerlemen seni başarıya taşıdı.');
    }

    const closingOptions = [
      'Tatilde zihnini dinlendirirken sevdiğin kitaplarla buluşmayı ihmal etme. İkinci dönemde başarılarının katlanarak devamını dilerim.',
      'Güzel bir tatili fazlasıyla hak ettin. Yeni dönemde de aynı ışıltıyla yola devam etmen dileğiyle, tebrik ederim!',
      'Bu güzel başarı grafiğini ikinci dönemde de sürdüreceğine inancım tam. Sağlıklı, huzurlu ve bol kitaplı harika bir tatil dilerim.',
    ];

    const newResults: string[] = [];
    for (let i = 0; i < 3; i++) {
      const open = openingOptions[i % openingOptions.length];
      const close = closingOptions[i % closingOptions.length];
      const middle = bodyParts.length > 0 ? bodyParts.slice(0, 3).join(' ') : 'Öğrenme azmin ve hedeflerin doğrultusunda gösterdiğin gayret takdire değer.';
      newResults.push(`${open} ${middle} ${close}`);
    }

    setGeneratedResults(newResults);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="py-12 pb-24 space-y-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Karne Görüşü Üreticisi</span>
        </nav>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl shadow-indigo-950/20 space-y-4 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Sparkles className="w-4 h-4 text-indigo-400" /> e-Okul Uyumlu & Akıllı Pedagojik Asistan
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Akıllı Karne Görüşü Robotu
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Dönem sonlarında saatlerce karne görüşü düşünme stresine son verin. Öğrencinizin niteliklerini seçin, saniyeler içinde benzersiz ve pedagojik karne görüşü paragrafları üretin.
          </p>
        </div>

        {/* Generator Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Options */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Öğrenci Adı (Opsiyonel)
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Örn: Yusuf, Elif..."
                className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Eğitim Kademesi
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['ilkokul', 'ortaokul', 'lise'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setGradeLevel(lvl)}
                    className={`py-2 text-xs font-bold rounded-xl capitalize transition-all ${
                      gradeLevel === lvl
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Öğrenci Özellikleri (Seçiniz)
              </label>
              <div className="space-y-2">
                {traits.map((t) => {
                  const active = selectedTraits.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleTrait(t.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-medium transition-all border flex items-center justify-between ${
                        active
                          ? 'bg-indigo-50 border-indigo-300 text-indigo-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{t.label}</span>
                      {active && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Görüşleri Üret
            </button>
          </div>

          {/* Results Column */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Üretilen Karne Görüşü Seçenekleri
            </h2>

            <div className="space-y-4">
              {generatedResults.map((result, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors space-y-4 group"
                >
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-bold text-slate-700">Seçenek #{idx + 1}</span>
                    <span className="text-[11px] font-mono">{result.length} karakter (e-Okul uyumlu)</span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed font-sans">
                    {result}
                  </p>

                  <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleCopy(result, idx)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        copiedIndex === idx
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                      }`}
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5" /> Kopyalandı!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" /> Metni Kopyala
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
