'use client';

import React, { useState, useMemo } from 'react';
import {
  Calculator, GraduationCap, Award, BookOpen, Sparkles, CheckCircle2,
  RotateCcw, Printer, Share2, HelpCircle, ChevronDown, ArrowRight,
  ShieldCheck, Percent, Trophy, TrendingUp, Layers, Check, Copy, Code, X, ExternalLink
} from 'lucide-react';

type TabType = 'lgs' | 'yks';

export default function ScoreCalculatorTool({
  initialTab = 'lgs',
}: {
  initialTab?: TabType;
} = {}) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [copied, setCopied] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  // ==================== LGS STATE ====================
  const [lgsScores, setLgsScores] = useState({
    turkce: { d: '', y: '' },
    matematik: { d: '', y: '' },
    fen: { d: '', y: '' },
    inkilap: { d: '', y: '' },
    din: { d: '', y: '' },
    ingilizce: { d: '', y: '' },
  });

  // ==================== YKS STATE ====================
  const [diplomaNotu, setDiplomaNotu] = useState('85');
  const [kirikObp, setKirikObp] = useState(false);

  const [tytScores, setTytScores] = useState({
    turkce: { d: '', y: '' },
    matematik: { d: '', y: '' },
    sosyal: { d: '', y: '' },
    fen: { d: '', y: '' },
  });

  const [aytScores, setAytScores] = useState({
    matematik: { d: '', y: '' },
    fizik: { d: '', y: '' },
    kimya: { d: '', y: '' },
    biyoloji: { d: '', y: '' },
    edebiyat: { d: '', y: '' },
    tarih1: { d: '', y: '' },
    cografya1: { d: '', y: '' },
    tarih2: { d: '', y: '' },
    cografya2: { d: '', y: '' },
    felsefe: { d: '', y: '' },
    din: { d: '', y: '' },
    dil: { d: '', y: '' },
  });

  // ==================== LGS CALCULATIONS ====================
  const calcLgsNet = (dStr: string, yStr: string, maxQ: number) => {
    const d = Math.max(0, Math.min(maxQ, Number(dStr) || 0));
    const y = Math.max(0, Math.min(maxQ - d, Number(yStr) || 0));
    const net = Math.max(0, d - y / 3);
    return { d, y, net };
  };

  const lgsResults = useMemo(() => {
    const turkce = calcLgsNet(lgsScores.turkce.d, lgsScores.turkce.y, 20);
    const mat = calcLgsNet(lgsScores.matematik.d, lgsScores.matematik.y, 20);
    const fen = calcLgsNet(lgsScores.fen.d, lgsScores.fen.y, 20);
    const ink = calcLgsNet(lgsScores.inkilap.d, lgsScores.inkilap.y, 10);
    const din = calcLgsNet(lgsScores.din.d, lgsScores.din.y, 10);
    const ing = calcLgsNet(lgsScores.ingilizce.d, lgsScores.ingilizce.y, 10);

    const totalDogru = turkce.d + mat.d + fen.d + ink.d + din.d + ing.d;
    const totalYanlis = turkce.y + mat.y + fen.y + ink.y + din.y + ing.y;
    const totalNet = turkce.net + mat.net + fen.net + ink.net + din.net + ing.net;

    // MEB Standart Sapmalı Katsayıları (2026-2027 Projeksiyonu)
    // Katsayılar: Türkçe: 4.35, Mat: 4.95, Fen: 4.15, İnkılap: 1.65, Din: 1.60, Yabancı Dil: 1.55
    // Taban Puan: 194.75 -> 90 tam nette 500.000 puan
    const rawScore =
      194.75 +
      turkce.net * 4.35 +
      mat.net * 4.95 +
      fen.net * 4.15 +
      ink.net * 1.65 +
      din.net * 1.60 +
      ing.net * 1.55;

    // Normalizasyon (En az 100, en çok 500)
    let score = totalNet === 0 ? 100 : Math.min(500, Math.max(100, rawScore));
    if (totalNet >= 89.9) score = 500;

    // Tahmini Yüzdelik Dilim
    let slice = '%25+';
    let target = 'Yerel Yerleştirme / Anadolu Liseleri';
    if (score >= 485) {
      slice = '%0.01 - %0.3';
      target = 'Galatasaray, Kabataş Erkek, İstanbul Erkek, Ankara Fen';
    } else if (score >= 465) {
      slice = '%0.3 - %1.2';
      target = 'Köklü Fen Liseleri, Cağaloğlu, Hüseyin Avni Sözen';
    } else if (score >= 440) {
      slice = '%1.2 - %3.5';
      target = 'İl Merkez Fen Liseleri, Nitelikli Anadolu Liseleri';
    } else if (score >= 400) {
      slice = '%3.5 - %8.0';
      target = 'Anadolu Liseleri, Proje İmam Hatip & Fen Programı';
    } else if (score >= 350) {
      slice = '%8.0 - %15.0';
      target = 'Proje Mesleki ve Teknik Liseleri, Anadolu Liseleri';
    } else if (score >= 300) {
      slice = '%15.0 - %25.0';
      target = 'Sınavla Alan Meslek ve Anadolu Liseleri';
    }

    return {
      turkce, mat, fen, ink, din, ing,
      totalDogru, totalYanlis, totalNet,
      score: score.toFixed(3),
      slice,
      target
    };
  }, [lgsScores]);

  // ==================== YKS CALCULATIONS ====================
  const calcYksNet = (dStr: string, yStr: string, maxQ: number) => {
    const d = Math.max(0, Math.min(maxQ, Number(dStr) || 0));
    const y = Math.max(0, Math.min(maxQ - d, Number(yStr) || 0));
    const net = Math.max(0, d - y / 4);
    return { d, y, net };
  };

  const yksResults = useMemo(() => {
    // 1. OBP Hesabı
    const diploma = Math.max(50, Math.min(100, Number(diplomaNotu) || 50));
    const obp = diploma * 5; // 250 - 500
    const obpKatki = kirikObp ? obp * 0.06 : obp * 0.12; // 30 - 60 (veya kırık 15 - 30)

    // 2. TYT Netleri
    const tytTr = calcYksNet(tytScores.turkce.d, tytScores.turkce.y, 40);
    const tytMat = calcYksNet(tytScores.matematik.d, tytScores.matematik.y, 40);
    const tytSos = calcYksNet(tytScores.sosyal.d, tytScores.sosyal.y, 20);
    const tytFen = calcYksNet(tytScores.fen.d, tytScores.fen.y, 20);

    const tytTotalNet = tytTr.net + tytMat.net + tytSos.net + tytFen.net;

    // TYT Taban: 100. Netler katsayısı: Türkçe ~3.3, Mat ~3.3, Sosyal ~3.4, Fen ~3.4
    const tytRaw = 100 + (tytTr.net * 3.3) + (tytMat.net * 3.3) + (tytSos.net * 3.4) + (tytFen.net * 3.4);
    let tytScore = tytTotalNet === 0 ? 100 : Math.min(500, Math.max(100, tytRaw));
    if (tytTotalNet >= 119.5) tytScore = 500;
    const tytYerlestirme = tytScore + obpKatki;

    // 3. AYT Netleri
    const aytMat = calcYksNet(aytScores.matematik.d, aytScores.matematik.y, 40);
    const aytFiz = calcYksNet(aytScores.fizik.d, aytScores.fizik.y, 14);
    const aytKim = calcYksNet(aytScores.kimya.d, aytScores.kimya.y, 13);
    const aytBiy = calcYksNet(aytScores.biyoloji.d, aytScores.biyoloji.y, 13);
    const aytFenTotalNet = aytFiz.net + aytKim.net + aytBiy.net;

    const aytEdeb = calcYksNet(aytScores.edebiyat.d, aytScores.edebiyat.y, 24);
    const aytTar1 = calcYksNet(aytScores.tarih1.d, aytScores.tarih1.y, 10);
    const aytCog1 = calcYksNet(aytScores.cografya1.d, aytScores.cografya1.y, 6);
    const aytSos1TotalNet = aytEdeb.net + aytTar1.net + aytCog1.net;

    const aytTar2 = calcYksNet(aytScores.tarih2.d, aytScores.tarih2.y, 11);
    const aytCog2 = calcYksNet(aytScores.cografya2.d, aytScores.cografya2.y, 11);
    const aytFel = calcYksNet(aytScores.felsefe.d, aytScores.felsefe.y, 12);
    const aytDin = calcYksNet(aytScores.din.d, aytScores.din.y, 6);
    const aytSos2TotalNet = aytTar2.net + aytCog2.net + aytFel.net + aytDin.net;

    const ydtDil = calcYksNet(aytScores.dil.d, aytScores.dil.y, 80);

    // SAYISAL HESABI: %40 TYT + %30 AYT Mat + %30 AYT Fen
    const hasSay = aytMat.net > 0 || aytFenTotalNet > 0;
    const sayRaw = 100 + (tytTotalNet * 1.32) + (aytMat.net * 3.0) + (aytFiz.net * 2.85) + (aytKim.net * 3.07) + (aytBiy.net * 3.07);
    const sayScore = hasSay && tytTotalNet > 0 ? Math.min(500, Math.max(100, sayRaw)) : 0;
    const sayYerlestirme = sayScore > 0 ? sayScore + obpKatki : 0;

    // EŞİT AĞIRLIK HESABI: %40 TYT + %30 AYT Mat + %30 AYT Sos1 (Edebiyat-Sosyal-1)
    const hasEa = aytMat.net > 0 || aytSos1TotalNet > 0;
    const eaRaw = 100 + (tytTotalNet * 1.32) + (aytMat.net * 3.0) + (aytEdeb.net * 3.0) + (aytTar1.net * 2.8) + (aytCog1.net * 3.3);
    const eaScore = hasEa && tytTotalNet > 0 ? Math.min(500, Math.max(100, eaRaw)) : 0;
    const eaYerlestirme = eaScore > 0 ? eaScore + obpKatki : 0;

    // SÖZEL HESABI: %40 TYT + %30 AYT Sos1 + %30 AYT Sos2
    const hasSoz = aytSos1TotalNet > 0 || aytSos2TotalNet > 0;
    const sozRaw = 100 + (tytTotalNet * 1.32) + (aytSos1TotalNet * 3.0) + (aytSos2TotalNet * 2.9);
    const sozScore = hasSoz && tytTotalNet > 0 ? Math.min(500, Math.max(100, sozRaw)) : 0;
    const sozYerlestirme = sozScore > 0 ? sozScore + obpKatki : 0;

    // DİL HESABI: %40 TYT + %60 YDT
    const hasDil = ydtDil.net > 0;
    const dilRaw = 100 + (tytTotalNet * 1.32) + (ydtDil.net * 3.0);
    const dilScore = hasDil && tytTotalNet > 0 ? Math.min(500, Math.max(100, dilRaw)) : 0;
    const dilYerlestirme = dilScore > 0 ? dilScore + obpKatki : 0;

    return {
      diploma, obp, obpKatki,
      tytTr, tytMat, tytSos, tytFen, tytTotalNet,
      tytScore: tytScore.toFixed(3),
      tytYerlestirme: tytYerlestirme.toFixed(3),
      aytMat, aytFiz, aytKim, aytBiy, aytFenTotalNet,
      aytEdeb, aytTar1, aytCog1, aytSos1TotalNet,
      aytTar2, aytCog2, aytFel, aytDin, aytSos2TotalNet,
      ydtDil,
      sayScore: sayScore > 0 ? sayScore.toFixed(3) : null,
      sayYerlestirme: sayYerlestirme > 0 ? sayYerlestirme.toFixed(3) : null,
      eaScore: eaScore > 0 ? eaScore.toFixed(3) : null,
      eaYerlestirme: eaYerlestirme > 0 ? eaYerlestirme.toFixed(3) : null,
      sozScore: sozScore > 0 ? sozScore.toFixed(3) : null,
      sozYerlestirme: sozYerlestirme > 0 ? sozYerlestirme.toFixed(3) : null,
      dilScore: dilScore > 0 ? dilScore.toFixed(3) : null,
      dilYerlestirme: dilYerlestirme > 0 ? dilYerlestirme.toFixed(3) : null,
    };
  }, [diplomaNotu, kirikObp, tytScores, aytScores]);

  // Reset LGS
  const resetLgs = () => {
    setLgsScores({
      turkce: { d: '', y: '' },
      matematik: { d: '', y: '' },
      fen: { d: '', y: '' },
      inkilap: { d: '', y: '' },
      din: { d: '', y: '' },
      ingilizce: { d: '', y: '' },
    });
  };

  // Preset LGS
  const presetLgs = (type: 'fen' | 'anadolu' | 'ortalama') => {
    if (type === 'fen') {
      setLgsScores({
        turkce: { d: '19', y: '1' },
        matematik: { d: '18', y: '2' },
        fen: { d: '19', y: '1' },
        inkilap: { d: '10', y: '0' },
        din: { d: '10', y: '0' },
        ingilizce: { d: '10', y: '0' },
      });
    } else if (type === 'anadolu') {
      setLgsScores({
        turkce: { d: '17', y: '3' },
        matematik: { d: '14', y: '4' },
        fen: { d: '16', y: '3' },
        inkilap: { d: '9', y: '1' },
        din: { d: '9', y: '1' },
        ingilizce: { d: '8', y: '2' },
      });
    } else {
      setLgsScores({
        turkce: { d: '14', y: '5' },
        matematik: { d: '9', y: '7' },
        fen: { d: '12', y: '6' },
        inkilap: { d: '8', y: '2' },
        din: { d: '8', y: '2' },
        ingilizce: { d: '6', y: '3' },
      });
    }
  };

  // Reset YKS
  const resetYks = () => {
    setDiplomaNotu('85');
    setKirikObp(false);
    setTytScores({
      turkce: { d: '', y: '' },
      matematik: { d: '', y: '' },
      sosyal: { d: '', y: '' },
      fen: { d: '', y: '' },
    });
    setAytScores({
      matematik: { d: '', y: '' },
      fizik: { d: '', y: '' },
      kimya: { d: '', y: '' },
      biyoloji: { d: '', y: '' },
      edebiyat: { d: '', y: '' },
      tarih1: { d: '', y: '' },
      cografya1: { d: '', y: '' },
      tarih2: { d: '', y: '' },
      cografya2: { d: '', y: '' },
      felsefe: { d: '', y: '' },
      din: { d: '', y: '' },
      dil: { d: '', y: '' },
    });
  };

  // Preset YKS
  const presetYks = (preset: 'say' | 'ea' | 'soz') => {
    setDiplomaNotu('92');
    setKirikObp(false);
    setTytScores({
      turkce: { d: '35', y: '4' },
      matematik: { d: '33', y: '3' },
      sosyal: { d: '16', y: '3' },
      fen: { d: '15', y: '4' },
    });

    if (preset === 'say') {
      setAytScores((prev) => ({
        ...prev,
        matematik: { d: '34', y: '4' },
        fizik: { d: '11', y: '2' },
        kimya: { d: '11', y: '1' },
        biyoloji: { d: '10', y: '2' },
      }));
    } else if (preset === 'ea') {
      setAytScores((prev) => ({
        ...prev,
        matematik: { d: '32', y: '4' },
        edebiyat: { d: '21', y: '2' },
        tarih1: { d: '8', y: '2' },
        cografya1: { d: '5', y: '1' },
      }));
    } else {
      setAytScores((prev) => ({
        ...prev,
        edebiyat: { d: '22', y: '2' },
        tarih1: { d: '9', y: '1' },
        cografya1: { d: '5', y: '1' },
        tarih2: { d: '9', y: '2' },
        cografya2: { d: '9', y: '2' },
        felsefe: { d: '10', y: '2' },
        din: { d: '5', y: '1' },
      }));
    }
  };

  const copyResults = () => {
    let text = '';
    if (activeTab === 'lgs') {
      text = `📊 Matemetrik LGS Puan Hesaplama Sonucum:
🎯 LGS Puanı: ${lgsResults.score}
📈 Toplam Net: ${lgsResults.totalNet.toFixed(2)} / 90
🏆 Tahmini Dilim: ${lgsResults.slice}
🏫 Hedef Lise Türü: ${lgsResults.target}
Hesaplama Adresi: https://www.matemetrik.com/puan-hesaplama-robotu`;
    } else {
      text = `📊 Matemetrik YKS Puan Hesaplama Sonucum:
🎯 TYT Puanı: ${yksResults.tytScore} (Yerleştirme: ${yksResults.tytYerlestirme})
${yksResults.sayScore ? `🔬 Sayısal Puanı: ${yksResults.sayScore} (Yerleştirme: ${yksResults.sayYerlestirme})\n` : ''}${yksResults.eaScore ? `⚖️ Eşit Ağırlık Puanı: ${yksResults.eaScore} (Yerleştirme: ${yksResults.eaYerlestirme})\n` : ''}${yksResults.sozScore ? `📖 Sözel Puanı: ${yksResults.sozScore} (Yerleştirme: ${yksResults.sozYerlestirme})\n` : ''}🎓 OBP Katkısı: +${yksResults.obpKatki.toFixed(2)} puan
Hesaplama Adresi: https://www.matemetrik.com/puan-hesaplama-robotu`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-8">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Puan &amp; Sıralama Hesaplama Robotu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              2026-2027 MEB LGS &amp; ÖSYM YKS Güncel Katsayıları ve Standart Sapma Modeli
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('lgs')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lgs'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            LGS (8. Sınıf)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('yks')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'yks'
                ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            YKS (TYT - AYT - YDT)
          </button>
        </div>
      </div>

      {/* ==================== LGS TAB CONTENT ==================== */}
      {activeTab === 'lgs' && (
        <div className="pt-6 space-y-8">
          {/* Presets and Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hızlı Senaryo:</span>
              <button
                type="button"
                onClick={() => presetLgs('fen')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
              >
                🏆 Hedef: Fen Lisesi (%1)
              </button>
              <button
                type="button"
                onClick={() => presetLgs('anadolu')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors"
              >
                🏫 Hedef: Nitelikli Anadolu Lisesi
              </button>
              <button
                type="button"
                onClick={() => presetLgs('ortalama')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors"
              >
                📊 Dengeli Dağılım
              </button>
            </div>
            <button
              type="button"
              onClick={resetLgs}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Değerleri Temizle
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Table */}
            <div className="lg:col-span-7 space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-extrabold uppercase">
                    <tr>
                      <th className="py-3 px-4">Ders Adı</th>
                      <th className="py-3 px-2 text-center w-16">Soru</th>
                      <th className="py-3 px-2 text-center w-20">Doğru</th>
                      <th className="py-3 px-2 text-center w-20">Yanlış</th>
                      <th className="py-3 px-4 text-center w-24">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                    {/* Türkçe */}
                    <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                        Türkçe <span className="text-[10px] text-slate-400 font-normal">(Katsayı: 4)</span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 text-xs">20</td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0"
                          value={lgsScores.turkce.d}
                          onChange={(e) => setLgsScores({ ...lgsScores, turkce: { ...lgsScores.turkce, d: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0"
                          value={lgsScores.turkce.y}
                          onChange={(e) => setLgsScores({ ...lgsScores, turkce: { ...lgsScores.turkce, y: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-black text-indigo-600 dark:text-indigo-400">
                        {lgsResults.turkce.net.toFixed(2)}
                      </td>
                    </tr>

                    {/* Matematik */}
                    <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        Matematik <span className="text-[10px] text-slate-400 font-normal">(Katsayı: 4)</span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 text-xs">20</td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0"
                          value={lgsScores.matematik.d}
                          onChange={(e) => setLgsScores({ ...lgsScores, matematik: { ...lgsScores.matematik, d: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0"
                          value={lgsScores.matematik.y}
                          onChange={(e) => setLgsScores({ ...lgsScores, matematik: { ...lgsScores.matematik, y: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-black text-blue-600 dark:text-blue-400">
                        {lgsResults.mat.net.toFixed(2)}
                      </td>
                    </tr>

                    {/* Fen Bilimleri */}
                    <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        Fen Bilimleri <span className="text-[10px] text-slate-400 font-normal">(Katsayı: 4)</span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 text-xs">20</td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0"
                          value={lgsScores.fen.d}
                          onChange={(e) => setLgsScores({ ...lgsScores, fen: { ...lgsScores.fen, d: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="20"
                          placeholder="0"
                          value={lgsScores.fen.y}
                          onChange={(e) => setLgsScores({ ...lgsScores, fen: { ...lgsScores.fen, y: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-black text-emerald-600 dark:text-emerald-400">
                        {lgsResults.fen.net.toFixed(2)}
                      </td>
                    </tr>

                    {/* T.C. İnkılap Tarihi */}
                    <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                        T.C. İnkılap Tarihi <span className="text-[10px] text-slate-400 font-normal">(Katsayı: 1)</span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 text-xs">10</td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={lgsScores.inkilap.d}
                          onChange={(e) => setLgsScores({ ...lgsScores, inkilap: { ...lgsScores.inkilap, d: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={lgsScores.inkilap.y}
                          onChange={(e) => setLgsScores({ ...lgsScores, inkilap: { ...lgsScores.inkilap, y: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-black text-amber-600 dark:text-amber-400">
                        {lgsResults.ink.net.toFixed(2)}
                      </td>
                    </tr>

                    {/* Din Kültürü */}
                    <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                        Din Kültürü ve A.B. <span className="text-[10px] text-slate-400 font-normal">(Katsayı: 1)</span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 text-xs">10</td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={lgsScores.din.d}
                          onChange={(e) => setLgsScores({ ...lgsScores, din: { ...lgsScores.din, d: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={lgsScores.din.y}
                          onChange={(e) => setLgsScores({ ...lgsScores, din: { ...lgsScores.din, y: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-black text-teal-600 dark:text-teal-400">
                        {lgsResults.din.net.toFixed(2)}
                      </td>
                    </tr>

                    {/* Yabancı Dil */}
                    <tr className="hover:bg-indigo-50/30 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                        Yabancı Dil (İngilizce) <span className="text-[10px] text-slate-400 font-normal">(Katsayı: 1)</span>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 text-xs">10</td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={lgsScores.ingilizce.d}
                          onChange={(e) => setLgsScores({ ...lgsScores, ingilizce: { ...lgsScores.ingilizce, d: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-2 text-center">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          placeholder="0"
                          value={lgsScores.ingilizce.y}
                          onChange={(e) => setLgsScores({ ...lgsScores, ingilizce: { ...lgsScores.ingilizce, y: e.target.value } })}
                          className="w-16 px-2 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-center font-bold focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
                        />
                      </td>
                      <td className="py-3 px-4 text-center font-black text-purple-600 dark:text-purple-400">
                        {lgsResults.ing.net.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className="bg-slate-50 dark:bg-slate-800 font-black text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-700">
                    <tr>
                      <td className="py-3 px-4">Genel Toplam</td>
                      <td className="py-3 px-2 text-center">90</td>
                      <td className="py-3 px-2 text-center text-emerald-600">{lgsResults.totalDogru} D</td>
                      <td className="py-3 px-2 text-center text-rose-600">{lgsResults.totalYanlis} Y</td>
                      <td className="py-3 px-4 text-center text-indigo-600 text-base">
                        {lgsResults.totalNet.toFixed(2)} Net
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Results Showcase Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-2xl border border-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-2">
                  <span>Hesaplanan Sonuç</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30">
                    2026-2027 MEB
                  </span>
                </div>

                {/* Score Number */}
                <div className="my-4 text-center py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Tahmini LGS Puanı
                  </div>
                  <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-indigo-200 my-1 font-mono tracking-tight">
                    {lgsResults.score}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    500 Tam Puan Üzerinden
                  </div>
                </div>

                {/* Indicators Grid */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Yüzdelik Dilim</span>
                    <span className="text-lg font-black text-amber-400 block mt-0.5">{lgsResults.slice}</span>
                    <span className="text-[10px] text-slate-400">Türkiye geneli</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Toplam Net</span>
                    <span className="text-lg font-black text-emerald-400 block mt-0.5">
                      {lgsResults.totalNet.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400">90 soru üzerinden</span>
                  </div>
                </div>

                {/* Target High School Insight */}
                <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 text-xs space-y-1">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Muhtemel Tercih Aralığı:
                  </div>
                  <p className="text-slate-300 leading-relaxed font-medium">
                    {lgsResults.target}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyResults}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-indigo-950 font-bold text-xs hover:bg-indigo-50 transition-colors shadow-md"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-indigo-600" />}
                    {copied ? 'Kopyalandı!' : 'Sonucu Paylaş'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmbedModal(true)}
                    className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/15 flex items-center gap-1.5"
                    title="Bu Hesaplama Robotunu Kendi Web Sitene Ekle"
                  >
                    <Code className="w-4 h-4" />
                    <span className="hidden sm:inline">Sitene Ekle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                    title="Yazdır / PDF Olarak Kaydet"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== YKS TAB CONTENT ==================== */}
      {activeTab === 'yks' && (
        <div className="pt-6 space-y-8">
          {/* Controls & OBP Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 items-center">
            {/* OBP Inputs */}
            <div className="md:col-span-7 flex flex-wrap items-center gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Diploma Notu (50-100):
                </label>
                <input
                  type="number"
                  min="50"
                  max="100"
                  value={diplomaNotu}
                  onChange={(e) => setDiplomaNotu(e.target.value)}
                  className="w-24 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="kirik-obp"
                  checked={kirikObp}
                  onChange={(e) => setKirikObp(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                />
                <label htmlFor="kirik-obp" className="text-xs font-medium text-slate-600 dark:text-slate-400 cursor-pointer">
                  Geçen yıl bir bölüme yerleştim <span className="text-rose-500 font-bold">(Kırık OBP)</span>
                </label>
              </div>

              <div className="pt-5 text-xs text-slate-500">
                OBP Katkısı: <strong className="text-indigo-600 font-bold">+{yksResults.obpKatki.toFixed(2)} Puan</strong>
              </div>
            </div>

            {/* Presets */}
            <div className="md:col-span-5 flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => presetYks('say')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                🔬 Sayısal
              </button>
              <button
                type="button"
                onClick={() => presetYks('ea')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors"
              >
                ⚖️ Eşit Ağırlık
              </button>
              <button
                type="button"
                onClick={() => presetYks('soz')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
              >
                📖 Sözel
              </button>
              <button
                type="button"
                onClick={resetYks}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                title="Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs (TYT + AYT) */}
            <div className="lg:col-span-7 space-y-6">
              {/* TYT Form Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    1. Oturum: TYT (Temel Yeterlilik Testi)
                  </span>
                  <span className="text-xs text-indigo-600 font-bold">{yksResults.tytTotalNet.toFixed(2)} Net / 120</span>
                </div>
                <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white dark:bg-slate-900">
                  {/* Türkçe 40 */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Türkçe (40)</span>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        placeholder="D"
                        min="0"
                        max="40"
                        value={tytScores.turkce.d}
                        onChange={(e) => setTytScores({ ...tytScores, turkce: { ...tytScores.turkce, d: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold"
                      />
                      <input
                        type="number"
                        placeholder="Y"
                        min="0"
                        max="40"
                        value={tytScores.turkce.y}
                        onChange={(e) => setTytScores({ ...tytScores, turkce: { ...tytScores.turkce, y: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block text-center">{yksResults.tytTr.net.toFixed(2)} Net</span>
                  </div>

                  {/* Matematik 40 */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Temel Mat (40)</span>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        placeholder="D"
                        min="0"
                        max="40"
                        value={tytScores.matematik.d}
                        onChange={(e) => setTytScores({ ...tytScores, matematik: { ...tytScores.matematik, d: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold"
                      />
                      <input
                        type="number"
                        placeholder="Y"
                        min="0"
                        max="40"
                        value={tytScores.matematik.y}
                        onChange={(e) => setTytScores({ ...tytScores, matematik: { ...tytScores.matematik, y: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block text-center">{yksResults.tytMat.net.toFixed(2)} Net</span>
                  </div>

                  {/* Sosyal 20 */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Sosyal Bil. (20)</span>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        placeholder="D"
                        min="0"
                        max="20"
                        value={tytScores.sosyal.d}
                        onChange={(e) => setTytScores({ ...tytScores, sosyal: { ...tytScores.sosyal, d: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold"
                      />
                      <input
                        type="number"
                        placeholder="Y"
                        min="0"
                        max="20"
                        value={tytScores.sosyal.y}
                        onChange={(e) => setTytScores({ ...tytScores, sosyal: { ...tytScores.sosyal, y: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block text-center">{yksResults.tytSos.net.toFixed(2)} Net</span>
                  </div>

                  {/* Fen 20 */}
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">Fen Bil. (20)</span>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        placeholder="D"
                        min="0"
                        max="20"
                        value={tytScores.fen.d}
                        onChange={(e) => setTytScores({ ...tytScores, fen: { ...tytScores.fen, d: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold"
                      />
                      <input
                        type="number"
                        placeholder="Y"
                        min="0"
                        max="20"
                        value={tytScores.fen.y}
                        onChange={(e) => setTytScores({ ...tytScores, fen: { ...tytScores.fen, y: e.target.value } })}
                        className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 block text-center">{yksResults.tytFen.net.toFixed(2)} Net</span>
                  </div>
                </div>
              </div>

              {/* AYT Form Card */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 font-extrabold text-sm text-slate-900 dark:text-white flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    2. Oturum: AYT (Alan Yeterlilik Testi)
                  </span>
                  <span className="text-xs text-slate-500">Alanınıza göre doldurunuz</span>
                </div>
                <div className="p-4 space-y-4 bg-white dark:bg-slate-900">
                  {/* Matematik & Fen Grubu */}
                  <div>
                    <span className="text-xs font-black text-blue-700 uppercase tracking-wider block mb-2">
                      Sayısal / Eşit Ağırlık Grubu (Matematik &amp; Fen)
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">AYT Mat (40)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.matematik.d} onChange={(e) => setAytScores({ ...aytScores, matematik: { ...aytScores.matematik, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.matematik.y} onChange={(e) => setAytScores({ ...aytScores, matematik: { ...aytScores.matematik, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Fizik (14)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.fizik.d} onChange={(e) => setAytScores({ ...aytScores, fizik: { ...aytScores.fizik, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.fizik.y} onChange={(e) => setAytScores({ ...aytScores, fizik: { ...aytScores.fizik, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Kimya (13)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.kimya.d} onChange={(e) => setAytScores({ ...aytScores, kimya: { ...aytScores.kimya, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.kimya.y} onChange={(e) => setAytScores({ ...aytScores, kimya: { ...aytScores.kimya, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Biyoloji (13)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.biyoloji.d} onChange={(e) => setAytScores({ ...aytScores, biyoloji: { ...aytScores.biyoloji, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.biyoloji.y} onChange={(e) => setAytScores({ ...aytScores, biyoloji: { ...aytScores.biyoloji, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Edebiyat - Sosyal-1 Grubu */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-black text-purple-700 uppercase tracking-wider block mb-2">
                      Eşit Ağırlık / Sözel Grubu (Edebiyat - Sosyal-1)
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Edebiyat (24)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.edebiyat.d} onChange={(e) => setAytScores({ ...aytScores, edebiyat: { ...aytScores.edebiyat, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.edebiyat.y} onChange={(e) => setAytScores({ ...aytScores, edebiyat: { ...aytScores.edebiyat, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Tarih-1 (10)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.tarih1.d} onChange={(e) => setAytScores({ ...aytScores, tarih1: { ...aytScores.tarih1, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.tarih1.y} onChange={(e) => setAytScores({ ...aytScores, tarih1: { ...aytScores.tarih1, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Coğrafya-1 (6)</span>
                        <div className="flex gap-1">
                          <input type="number" placeholder="D" value={aytScores.cografya1.d} onChange={(e) => setAytScores({ ...aytScores, cografya1: { ...aytScores.cografya1, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                          <input type="number" placeholder="Y" value={aytScores.cografya1.y} onChange={(e) => setAytScores({ ...aytScores, cografya1: { ...aytScores.cografya1, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* YDT Dil Testi */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-teal-700 block">YDT Yabancı Dil Testi (80 Soru)</span>
                      <span className="text-[10px] text-slate-400">İngilizce, Almanca, Fransızca, Arapça vb.</span>
                    </div>
                    <div className="flex gap-1.5 w-36">
                      <input type="number" placeholder="D" value={aytScores.dil.d} onChange={(e) => setAytScores({ ...aytScores, dil: { ...aytScores.dil, d: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold" />
                      <input type="number" placeholder="Y" value={aytScores.dil.y} onChange={(e) => setAytScores({ ...aytScores, dil: { ...aytScores.dil, y: e.target.value } })} className="w-full px-2 py-1 text-xs border rounded-lg text-center font-bold text-rose-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Results Dashboard */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white shadow-2xl border border-purple-500/20">
                <div className="text-xs text-purple-300 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>YKS Puan Karnesi</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-200 border border-purple-400/30">ÖSYM Uyumlu</span>
                </div>

                {/* Score Cards List */}
                <div className="space-y-2.5 my-4">
                  {/* TYT Card */}
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-300 block">TYT Puanı</span>
                      <span className="text-[10px] text-slate-400">Ham / Yerleştirme</span>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-black text-amber-300 block">{yksResults.tytScore}</span>
                      <span className="text-xs font-bold text-emerald-400">{yksResults.tytYerlestirme} Yerl.</span>
                    </div>
                  </div>

                  {/* SAY Card */}
                  {yksResults.sayScore && (
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-blue-300 block">SAYISAL (SAY)</span>
                        <span className="text-[10px] text-slate-400">Tıp, Mühendislik, Diş Hek.</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-white block">{yksResults.sayScore}</span>
                        <span className="text-xs font-bold text-emerald-400">{yksResults.sayYerlestirme} Yerl.</span>
                      </div>
                    </div>
                  )}

                  {/* EA Card */}
                  {yksResults.eaScore && (
                    <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-purple-300 block">EŞİT AĞIRLIK (EA)</span>
                        <span className="text-[10px] text-slate-400">Hukuk, Psikoloji, İşletme</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-white block">{yksResults.eaScore}</span>
                        <span className="text-xs font-bold text-emerald-400">{yksResults.eaYerlestirme} Yerl.</span>
                      </div>
                    </div>
                  )}

                  {/* SÖZ Card */}
                  {yksResults.sozScore && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-amber-300 block">SÖZEL (SÖZ)</span>
                        <span className="text-[10px] text-slate-400">İletişim, Tarih, Türkçe Öğr.</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-white block">{yksResults.sozScore}</span>
                        <span className="text-xs font-bold text-emerald-400">{yksResults.sozYerlestirme} Yerl.</span>
                      </div>
                    </div>
                  )}

                  {/* DİL Card */}
                  {yksResults.dilScore && (
                    <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-teal-300 block">YABANCI DİL (DİL)</span>
                        <span className="text-[10px] text-slate-400">Tercümanlık, Dil Öğretmenliği</span>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-white block">{yksResults.dilScore}</span>
                        <span className="text-xs font-bold text-emerald-400">{yksResults.dilYerlestirme} Yerl.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyResults}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white text-purple-950 font-bold text-xs hover:bg-purple-50 transition-colors shadow-md"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-purple-600" />}
                    {copied ? 'Kopyalandı!' : 'Puanımı Paylaş'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEmbedModal(true)}
                    className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/15 flex items-center gap-1.5"
                    title="Bu Hesaplama Robotunu Kendi Web Sitene Ekle"
                  >
                    <Code className="w-4 h-4" />
                    <span className="hidden sm:inline">Sitene Ekle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
                    title="Yazdır / PDF Olarak Kaydet"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SITENE EKLE (EMBED) MODAL ==================== */}
      {showEmbedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg">
                    Hesaplama Robotunu Sitene Ekle
                  </h3>
                  <p className="text-xs text-slate-500">WordPress, Blogger veya Özel Web Sitenize Ücretsiz Ekleyin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowEmbedModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Aşağıdaki HTML kodunu kopyalayıp web sitenizde istediğiniz sayfaya yapıştırarak LGS &amp; YKS Puan Hesaplama Robotu&apos;nu ziyaretçilerinize ücretsiz olarak sunabilirsiniz.
            </p>

            <div className="relative bg-slate-900 rounded-2xl p-4 text-slate-200 text-xs font-mono break-all select-all border border-slate-800">
              <code>
                {`<iframe src="https://www.matemetrik.com/puan-hesaplama-robotu" width="100%" height="850" frameborder="0" style="border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;" title="LGS & YKS Puan Hesaplama Robotu"></iframe>\n<p style="font-size:12px;color:#64748b;text-align:right;margin-top:6px;">Puan Hesaplama Aracı: <a href="https://www.matemetrik.com/puan-hesaplama-robotu" target="_blank" rel="noopener" style="color:#4f46e5;font-weight:600;text-decoration:none;">Matemetrik Eğitim Platformu</a></p>`}
              </code>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const code = `<iframe src="https://www.matemetrik.com/puan-hesaplama-robotu" width="100%" height="850" frameborder="0" style="border-radius:16px;border:1px solid #e2e8f0;overflow:hidden;" title="LGS & YKS Puan Hesaplama Robotu"></iframe>\n<p style="font-size:12px;color:#64748b;text-align:right;margin-top:6px;">Puan Hesaplama Aracı: <a href="https://www.matemetrik.com/puan-hesaplama-robotu" target="_blank" rel="noopener" style="color:#4f46e5;font-weight:600;text-decoration:none;">Matemetrik Eğitim Platformu</a></p>`;
                  navigator.clipboard.writeText(code);
                  setEmbedCopied(true);
                  setTimeout(() => setEmbedCopied(false), 2500);
                }}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md shadow-indigo-200 dark:shadow-none"
              >
                {embedCopied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {embedCopied ? 'Kod Panoya Kopyalandı!' : 'Embed Kodunu Kopyala'}
              </button>
              <button
                type="button"
                onClick={() => setShowEmbedModal(false)}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
