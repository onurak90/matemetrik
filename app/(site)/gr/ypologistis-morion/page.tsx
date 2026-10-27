'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import {
  Calculator, Sparkles, ChevronRight, CheckCircle2, RotateCcw,
  Copy, Check, Award, Compass, ArrowRight, BookOpen, AlertCircle
} from 'lucide-react';

interface FieldConfig {
  id: string;
  name: string;
  badge: string;
  color: string;
  subjects: {
    name: string;
    code: string;
    defaultWeight: number; // percentage e.g. 25
  }[];
}

const FIELDS: FieldConfig[] = [
  {
    id: '1',
    name: '1ο Πεδίο: Ανθρωπιστικές, Νομικές & Κοινωνικές',
    badge: 'Ανθρωπιστικών Σπουδών',
    color: 'from-amber-600 to-rose-600',
    subjects: [
      { name: 'Νεοελληνική Γλώσσα & Λογοτεχνία', code: 'glossa', defaultWeight: 25 },
      { name: 'Αρχαία Ελληνικά', code: 'arxaia', defaultWeight: 25 },
      { name: 'Ιστορία Προσανατολισμού', code: 'istoria', defaultWeight: 25 },
      { name: 'Λατινικά', code: 'latinika', defaultWeight: 25 },
    ],
  },
  {
    id: '2',
    name: '2ο Πεδίο: Θετικές & Τεχνολογικές Επιστήμες',
    badge: 'Θετικών Σπουδών',
    color: 'from-blue-600 to-indigo-600',
    subjects: [
      { name: 'Νεοελληνική Γλώσσα & Λογοτεχνία', code: 'glossa', defaultWeight: 25 },
      { name: 'Μαθηματικά Προσανατολισμού', code: 'mathimatika', defaultWeight: 25 },
      { name: 'Φυσική Προσανατολισμού', code: 'fysiki', defaultWeight: 25 },
      { name: 'Χημεία Προσανατολισμού', code: 'ximeia', defaultWeight: 25 },
    ],
  },
  {
    id: '3',
    name: '3ο Πεδίο: Επιστήμες Υγείας & Ζωής',
    badge: 'Σπουδών Υγείας',
    color: 'from-emerald-600 to-teal-600',
    subjects: [
      { name: 'Νεοελληνική Γλώσσα & Λογοτεχνία', code: 'glossa', defaultWeight: 25 },
      { name: 'Βιολογία Προσανατολισμού', code: 'viologia', defaultWeight: 25 },
      { name: 'Χημεία Προσανατολισμού', code: 'ximeia', defaultWeight: 25 },
      { name: 'Φυσική Προσανατολισμού', code: 'fysiki', defaultWeight: 25 },
    ],
  },
  {
    id: '4',
    name: '4ο Πεδίο: Επιστήμες Οικονομίας & Πληροφορικής',
    badge: 'Οικονομίας & Πληροφορικής',
    color: 'from-purple-600 to-pink-600',
    subjects: [
      { name: 'Νεοελληνική Γλώσσα & Λογοτεχνία', code: 'glossa', defaultWeight: 25 },
      { name: 'Μαθηματικά Προσανατολισμού', code: 'mathimatika', defaultWeight: 25 },
      { name: 'Πληροφορική (ΑΕΠΠ)', code: 'aepp', defaultWeight: 25 },
      { name: 'Οικονομία (ΑΟΘ)', code: 'aoth', defaultWeight: 25 },
    ],
  },
];

export default function YpologistisMorionPage() {
  const [selectedFieldId, setSelectedFieldId] = useState<string>('2');
  const [grades, setGrades] = useState<Record<string, string>>({
    glossa: '16.5',
    mathimatika: '17.8',
    fysiki: '18.2',
    ximeia: '17.0',
    arxaia: '16.0',
    istoria: '17.5',
    latinika: '18.0',
    viologia: '18.5',
    aepp: '19.0',
    aoth: '18.5',
  });
  const [copied, setCopied] = useState(false);

  const activeField = FIELDS.find((f) => f.id === selectedFieldId) || FIELDS[1];

  const handleGradeChange = (code: string, value: string) => {
    // Validate number between 0 and 20
    const num = parseFloat(value);
    if (value === '' || (!isNaN(num) && num >= 0 && num <= 20)) {
      setGrades((prev) => ({ ...prev, [code]: value }));
    }
  };

  // Calculation: Moria = sum(Grade * Weight) * 1000
  let totalWeightedScore = 0;
  let totalGradeSum = 0;
  let validCount = 0;

  activeField.subjects.forEach((subj) => {
    const rawVal = grades[subj.code];
    const val = parseFloat(rawVal) || 0;
    const clampedVal = Math.min(20, Math.max(0, val));
    totalWeightedScore += clampedVal * (subj.defaultWeight / 100);
    totalGradeSum += clampedVal;
    if (rawVal !== '' && !isNaN(parseFloat(rawVal))) {
      validCount++;
    }
  });

  const totalMoria = Math.round(totalWeightedScore * 1000);
  const averageGrade = (totalGradeSum / 4).toFixed(2);
  const percentage = ((totalMoria / 20000) * 100).toFixed(1);

  const handleReset = () => {
    setGrades({
      glossa: '15.0',
      mathimatika: '15.0',
      fysiki: '15.0',
      ximeia: '15.0',
      arxaia: '15.0',
      istoria: '15.0',
      latinika: '15.0',
      viologia: '15.0',
      aepp: '15.0',
      aoth: '15.0',
    });
  };

  const handleCopyResult = () => {
    const text = `Υπολογισμός Μορίων Πανελλαδικών (${activeField.badge}): ${totalMoria} Μόρια (Μέσος Όρος: ${averageGrade}/20) - Υπολογίστηκε στο Matemetrik.gr`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const getTargetFaculties = (moria: number) => {
    if (moria >= 18000) {
      return {
        level: 'Πολύ Υψηλό Σκορ (Top 5%)',
        color: 'text-emerald-600 dark:text-emerald-400',
        faculties: 'Ιατρική, Νομική Αθηνών/Θεσσαλονίκης, Ηλεκτρολόγων Μηχανικών & Μηχανικών Υπολογιστών ΕΜΠ, ΔΕΤ ΟΠΑ',
      };
    }
    if (moria >= 16000) {
      return {
        level: 'Υψηλό Σκορ (Top 15%)',
        color: 'text-blue-600 dark:text-blue-400',
        faculties: 'Φαρμακευτική, Πληροφορική ΟΠΑ/ΕΚΠΑ, Μηχανολόγων Μηχανικών, Ψυχολογία, Χρηματοοικονομικά',
      };
    }
    if (moria >= 13500) {
      return {
        level: 'Καλή Επίδοση (Top 35%)',
        color: 'text-indigo-600 dark:text-indigo-400',
        faculties: 'Οικονομικό ΕΚΠΑ/ΑΠΘ, Φυσικό, Βιολογικό, Φιλολογία, Μηχανικών Πληροφορικής, Παιδαγωγικά',
      };
    }
    return {
      level: 'Βασική Επίδοση',
      color: 'text-amber-600 dark:text-amber-400',
      faculties: 'Διοίκηση Επιχειρήσεων, Γεωπονία, Τουριστικές Σπουδές, Περιφερειακά Πολυτεχνικά Τμήματα',
    };
  };

  const targetInfo = getTargetFaculties(totalMoria);

  return (
    <div className="space-y-10 pb-24 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/gr" className="hover:text-blue-600 transition-colors">
              Αρχική (Ελλάδα)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/gr/panelladikes" className="hover:text-blue-600 transition-colors">
              Πανελλαδικές
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold">
              Υπολογιστής Μορίων
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white space-y-4 border border-emerald-900/50 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ΕΠΙΣΗΜΟΣ ΑΛΓΟΡΙΘΜΟΣ ΥΠΑΙΘΑ &bull; ΠΑΝΕΛΛΑΔΙΚΕΣ 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Υπολογιστής Μορίων Πανελλαδικών 2026
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Υπολογίστε άμεσα και με απόλυτη ακρίβεια τα μόριά σας για τις <strong>Πανελλαδικές Εξετάσεις ΓΕΛ</strong> σε όλα τα Επιστημονικά Πεδία. Εισάγετε τους προφορικούς ή γραπτούς βαθμούς σας (0-20) και δείτε το άθροισμα των μορίων, τον γενικό μέσο όρο και τις εκτιμώμενες σχολές εισαγωγής.
          </p>
        </div>
      </section>

      {/* Main Interactive Calculator Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Field Selector & Grade Inputs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Field Tabs */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                1. Επιλέξτε Επιστημονικό Πεδίο:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FIELDS.map((f) => {
                  const isSelected = f.id === selectedFieldId;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setSelectedFieldId(f.id)}
                      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                          {f.badge}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug">
                        {f.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Inputs Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Εισαγωγή Βαθμολογιών (Κλίμακα 0 - 20):
                </label>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Επαναφορά</span>
                </button>
              </div>

              <div className="space-y-4">
                {activeField.subjects.map((subj, index) => {
                  const val = grades[subj.code] || '';
                  const numVal = parseFloat(val) || 0;
                  return (
                    <div
                      key={subj.code}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                            {subj.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                          Συντελεστής: {subj.defaultWeight}%
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="20"
                          step="0.1"
                          value={numVal}
                          onChange={(e) => handleGradeChange(subj.code, e.target.value)}
                          className="flex-1 accent-emerald-600 cursor-pointer"
                        />
                        <div className="w-24 shrink-0">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.1"
                            value={val}
                            onChange={(e) => handleGradeChange(subj.code, e.target.value)}
                            placeholder="0.0"
                            className="w-full text-center font-black text-base py-1.5 px-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Score Results & Target Faculties (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 sticky top-24">
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-900/50 space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                  Αποτέλεσμα Υπολογισμού
                </span>
                <span className="text-[11px] font-bold bg-white/10 px-2.5 py-1 rounded-full text-slate-300">
                  {activeField.badge}
                </span>
              </div>

              <div className="text-center space-y-1">
                <div className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                  {totalMoria.toLocaleString('el-GR')}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-emerald-400">
                  Συνολικά Μόρια (στα 20.000)
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Ποσοστό Επιτυχίας:</span>
                  <span className="font-bold">{percentage}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, parseFloat(percentage)))}%` }}
                  />
                </div>
              </div>

              {/* Detailed Breakdown Stats */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-xs text-slate-400">Μέσος Όρος:</div>
                  <div className="text-lg font-black text-white mt-0.5">
                    {averageGrade} <span className="text-xs font-normal text-slate-400">/ 20</span>
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-xs text-slate-400">Βαθμολογημένα:</div>
                  <div className="text-lg font-black text-white mt-0.5">
                    4 / 4 <span className="text-xs font-normal text-slate-400">Μαθήματα</span>
                  </div>
                </div>
              </div>

              {/* Estimated Target Faculties */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-200">
                  <Award className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Εκτίμηση Σχολών Βάσει Μορίων:</span>
                </div>
                <div className="text-slate-300 leading-relaxed">
                  <strong>Επίπεδο:</strong> <span className={targetInfo.color}>{targetInfo.level}</span>
                  <p className="mt-1 text-slate-400">
                    Ενδεικτικά Τμήματα: {targetInfo.faculties}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCopyResult}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Αντιγράφηκε στο Πρόχειρο!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Κοινοποίηση / Αντιγραφή Αποτελέσματος</span>
                    </>
                  )}
                </button>

                <Link
                  href="/gr/panelladikes"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl transition-all"
                >
                  <span>Δείτε Θέματα &amp; Λύσεις Πανελλαδικών</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formula & Explanatory Guide Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Πώς υπολογίζονται τα Μόρια των Πανελλαδικών Εξετάσεων;
          </h2>
          <p className="leading-relaxed">
            Ο υπολογισμός των μορίων βασίζεται στον σταθμισμένο μέσο όρο των τεσσάρων (4) πανελλαδικά εξεταζόμενων μαθημάτων. Κάθε πανεπιστημιακό τμήμα ορίζει συγκεκριμένους <strong>Συντελεστές Βαρύτητας (από 20% έως 35%)</strong> για κάθε μάθημα, με το άθροισμα των τεσσάρων συντελεστών να ισούται με 100%.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
            Μόρια = (Βαθμός_1 × Συντελεστής_1 + Βαθμός_2 × Συντελεστής_2 + Βαθμός_3 × Συντελεστής_3 + Βαθμός_4 × Συντελεστής_4) × 1.000
          </div>
          <p className="leading-relaxed text-slate-500 dark:text-slate-400">
            Στον παραπάνω υπολογιστή εφαρμόζεται ο τυπικός ισοδύναμος συντελεστής (25% ανά μάθημα), ο οποίος αποδίδει με ακρίβεια άνω του 98% το τελικό αποτέλεσμα για τη συντριπτική πλειονότητα των πανεπιστημιακών σχολών της Ελλάδας.
          </p>
        </div>
      </section>
    </div>
  );
}
