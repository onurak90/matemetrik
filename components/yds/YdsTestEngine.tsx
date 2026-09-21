'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  CheckCircle2, XCircle, HelpCircle, ChevronLeft, ChevronRight,
  RotateCcw, Award, Sparkles, BookOpen, Clock, AlertCircle,
  Eye, EyeOff, Filter, BarChart3, Bookmark, Share2, Check,
  Volume2, Compass, Layers, ShieldCheck, ArrowRight
} from 'lucide-react';
import type { YdsQuestion } from '@/lib/yds';

interface Props {
  topicId: string;
  topicTitle: string;
  questions: YdsQuestion[];
}

export default function YdsTestEngine({ topicId, topicTitle, questions }: Props) {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | 'E'>>({});
  const [showSolutionMap, setShowSolutionMap] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [filterMode, setFilterMode] = useState<'all' | 'unanswered' | 'wrong' | 'bookmarked'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'kolay' | 'orta' | 'ileri'>('all');
  const [isExamMode, setIsExamMode] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // Timer
  useEffect(() => {
    let timer: any;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      // Difficulty filter
      if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) {
        return false;
      }
      // Status filter
      if (filterMode === 'unanswered') {
        return !answers[q.id];
      }
      if (filterMode === 'wrong') {
        return answers[q.id] && answers[q.id] !== q.correctAnswer;
      }
      if (filterMode === 'bookmarked') {
        return !!bookmarks[q.id];
      }
      return true;
    });
  }, [questions, answers, bookmarks, filterMode, difficultyFilter]);

  // Adjust current index if out of bounds
  useEffect(() => {
    if (currentIndex >= filteredQuestions.length && filteredQuestions.length > 0) {
      setCurrentIndex(0);
    }
  }, [filteredQuestions.length, currentIndex]);

  const currentQ: YdsQuestion | undefined = filteredQuestions[currentIndex];

  // Stats
  const stats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (userAns) {
        if (userAns === q.correctAnswer) correct++;
        else wrong++;
      }
    });
    const answeredCount = correct + wrong;
    const net = Math.max(0, correct - wrong * 0.25);
    const successRate = answeredCount > 0 ? Math.round((correct / answeredCount) * 100) : 0;
    return {
      correct,
      wrong,
      unanswered: questions.length - answeredCount,
      total: questions.length,
      answeredCount,
      net: Number(net.toFixed(2)),
      successRate,
    };
  }, [questions, answers]);

  // Answer handler
  const handleSelectOption = (qId: string, optionKey: 'A' | 'B' | 'C' | 'D' | 'E') => {
    // If already answered, allow re-answering or lock?
    // In practice study mode, let user pick and see result immediately
    setAnswers((prev) => ({ ...prev, [qId]: optionKey }));
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
  };

  const toggleSolution = (qId: string) => {
    setShowSolutionMap((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const toggleBookmark = (qId: string) => {
    setBookmarks((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleReset = () => {
    if (confirm('Bu bölümdeki tüm cevaplarınızı ve istatistiklerinizi sıfırlamak istediğinize emin misiniz?')) {
      setAnswers({});
      setShowSolutionMap({});
      setTimeElapsed(0);
      setIsTimerRunning(false);
      setCurrentIndex(0);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (!currentQ) return;

      if (['a', 'A'].includes(e.key)) handleSelectOption(currentQ.id, 'A');
      if (['b', 'B'].includes(e.key)) handleSelectOption(currentQ.id, 'B');
      if (['c', 'C'].includes(e.key)) handleSelectOption(currentQ.id, 'C');
      if (['d', 'D'].includes(e.key)) handleSelectOption(currentQ.id, 'D');
      if (['e', 'E'].includes(e.key)) handleSelectOption(currentQ.id, 'E');

      if (e.key === 'ArrowRight' && currentIndex < filteredQuestions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
      if (e.key === ' ' || e.key === 'Spacebar') {
        toggleSolution(currentQ.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQ, currentIndex, filteredQuestions.length]);

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
        <p className="text-slate-500">Bu konuya ait soru yükleniyor...</p>
      </div>
    );
  }

  const userAnswer = currentQ ? answers[currentQ.id] : undefined;
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === currentQ?.correctAnswer;
  const isWrong = isAnswered && !isCorrect;
  const showSolution = currentQ ? (showSolutionMap[currentQ.id] ?? (isAnswered && !isExamMode)) : false;

  return (
    <div className="space-y-6">
      {/* Top Stats Dashboard Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Progress & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                {topicTitle} Çalışma Testi
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                {stats.answeredCount} / {stats.total} Çözüldü
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Klavyenizdeki <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">A</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">B</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">C</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">D</kbd>, <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border text-[11px] font-mono">E</kbd> veya yön tuşlarıyla hızlıca çözebilirsiniz.
            </p>
          </div>

          {/* Quick Stats Chips */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{stats.correct} Doğru</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200/80 font-bold">
              <XCircle className="w-4 h-4 text-rose-600" />
              <span>{stats.wrong} Yanlış</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-800 border border-indigo-200/80 font-bold">
              <Award className="w-4 h-4 text-indigo-600" />
              <span>{stats.net} Net</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-semibold">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>{formatTime(timeElapsed)}</span>
            </div>

            <button
              onClick={handleReset}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Cevapları Sıfırla"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
          <div
            className="bg-emerald-500 transition-all duration-300"
            style={{ width: `${stats.total > 0 ? (stats.correct / stats.total) * 100 : 0}%` }}
            title={`Doğru: ${stats.correct}`}
          ></div>
          <div
            className="bg-rose-500 transition-all duration-300"
            style={{ width: `${stats.total > 0 ? (stats.wrong / stats.total) * 100 : 0}%` }}
            title={`Yanlış: ${stats.wrong}`}
          ></div>
        </div>
      </div>

      {/* Filter and Mode Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white/70 p-3 rounded-2xl border border-slate-200 text-xs">
        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-slate-400 font-medium flex items-center gap-1 pl-1">
            <Filter className="w-3.5 h-3.5" /> Filtre:
          </span>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tümü ({questions.length})
          </button>
          <button
            onClick={() => setFilterMode('unanswered')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterMode === 'unanswered'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Çözülmeyenler ({stats.unanswered})
          </button>
          <button
            onClick={() => setFilterMode('wrong')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterMode === 'wrong'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Yanlışlarım ({stats.wrong})
          </button>
          <button
            onClick={() => setFilterMode('bookmarked')}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              filterMode === 'bookmarked'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Yıldızlılar ({Object.values(bookmarks).filter(Boolean).length})
          </button>
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="text-slate-400 font-medium">Zorluk:</span>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">Tüm Seviyeler</option>
            <option value="kolay">Kolay</option>
            <option value="orta">Orta (ÖSYM Standart)</option>
            <option value="ileri">İleri Seviye (Yüksek YDS Hedefi)</option>
          </select>
        </div>
      </div>

      {/* Main Question Card */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Seçilen Filtrede Soru Bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Seçtiğiniz filtreye uygun soru bulunamadı. Lütfen filtreyi &apos;Tümü&apos; olarak değiştirin.
          </p>
          <button
            onClick={() => {
              setFilterMode('all');
              setDifficultyFilter('all');
            }}
            className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : currentQ ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Question Header: Number, Tags, Bookmark */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-indigo-600/20">
                {currentIndex + 1}
              </span>
              <span className="text-xs font-bold text-slate-500">
                / {filteredQuestions.length} Soru
              </span>
              {currentQ.subTopic && (
                <span className="hidden sm:inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {currentQ.subTopic}
                </span>
              )}
              <span
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  currentQ.difficulty === 'kolay'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : currentQ.difficulty === 'ileri'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {currentQ.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(currentQ.id)}
                className={`p-2 rounded-xl border transition-all ${
                  bookmarks[currentQ.id]
                    ? 'bg-amber-50 border-amber-300 text-amber-600'
                    : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
                title={bookmarks[currentQ.id] ? 'Yıldızı Kaldır' : 'Soruya Yıldız Ekle'}
              >
                <Bookmark className={`w-4 h-4 ${bookmarks[currentQ.id] ? 'fill-amber-500 text-amber-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Optional Reading / Cloze Passage Container */}
          {currentQ.passage && (
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100/80 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
                <BookOpen className="w-4 h-4" />
                <span>İlgili Paragraf / Okuma Metni</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif tracking-wide select-text">
                {currentQ.passage}
              </p>
            </div>
          )}

          {/* Question Text / Prompt */}
          <div className="space-y-3">
            <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed tracking-tight select-text">
              {currentQ.questionText}
            </p>
          </div>

          {/* Options List (A, B, C, D, E) */}
          <div className="space-y-2.5 pt-2">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((optKey) => {
              const optionText = currentQ.options[optKey];
              if (!optionText) return null;

              const isSelected = userAnswer === optKey;
              const isOptionCorrect = currentQ.correctAnswer === optKey;

              let btnStyle = 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
              let badgeStyle = 'bg-slate-100 text-slate-600 border-slate-200';
              let iconNode = null;

              if (isAnswered) {
                if (isOptionCorrect) {
                  // Correct option: turns GREEN
                  btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-sm ring-2 ring-emerald-400/20';
                  badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                  iconNode = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-auto" />;
                } else if (isSelected) {
                  // User selected WRONG option: turns RED
                  btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold shadow-sm ring-2 ring-rose-400/20';
                  badgeStyle = 'bg-rose-600 text-white border-rose-600';
                  iconNode = <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-auto" />;
                } else {
                  // Other unselected options fade slightly
                  btnStyle = 'bg-slate-50/60 border-slate-200/60 text-slate-400 opacity-60';
                  badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                }
              }

              return (
                <button
                  key={optKey}
                  onClick={() => handleSelectOption(currentQ.id, optKey)}
                  className={`w-full flex items-center text-left p-3 sm:p-4 rounded-2xl border transition-all duration-150 group ${btnStyle}`}
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm mr-3 shrink-0 border transition-colors ${badgeStyle}`}
                  >
                    {optKey}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1">
                    {optionText}
                  </span>
                  {iconNode}
                </button>
              );
            })}
          </div>

          {/* Action Row: Show Solution Button, Prev/Next */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            {/* Show Solution Button */}
            <button
              onClick={() => toggleSolution(currentQ.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                showSolution
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'
              }`}
            >
              {showSolution ? (
                <>
                  <EyeOff className="w-4 h-4" /> Çözümü Gizle
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" /> Çözümü Göster &amp; Açıkla
                </>
              )}
            </button>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Önceki Soru
              </button>

              <button
                onClick={() => setCurrentIndex((prev) => Math.min(filteredQuestions.length - 1, prev + 1))}
                disabled={currentIndex === filteredQuestions.length - 1}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-indigo-600/20"
              >
                Sonraki Soru <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expandable Solution & Pedagogical Explanation Box */}
          {showSolution && currentQ.explanation && (
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-6 sm:p-8 text-white space-y-6 shadow-xl border border-indigo-500/20 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                      Doğru Cevap: Seçenek {currentQ.correctAnswer}
                    </div>
                    <div className="text-sm font-bold text-white">
                      {currentQ.options[currentQ.correctAnswer]}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-300 font-semibold">
                  ÖSYM Çözüm Analizi
                </span>
              </div>

              {/* Turkish Translation */}
              {currentQ.explanation.turkishTranslation && (
                <div className="space-y-1.5 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs font-extrabold text-indigo-300 flex items-center gap-1.5">
                    <span>🇹🇷</span> Cümlenin Türkçe Çevirisi:
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    &ldquo;{currentQ.explanation.turkishTranslation}&rdquo;
                  </p>
                </div>
              )}

              {/* Detailed Reason */}
              <div className="space-y-1.5">
                <div className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Neden Bu Seçenek Doğru? (Detaylı Açıklama)
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentQ.explanation.detailedReason}
                </p>
              </div>

              {/* Distractor Analysis */}
              {currentQ.explanation.distractorAnalysis && (
                <div className="space-y-1.5 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="text-xs font-extrabold text-rose-300 flex items-center gap-1.5">
                    <XCircle className="w-3.5 h-3.5" /> Çeldiriciler Neden Yanlış?
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentQ.explanation.distractorAnalysis}
                  </p>
                </div>
              )}

              {/* Vocabulary Notes */}
              {currentQ.explanation.vocabularyNotes && currentQ.explanation.vocabularyNotes.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Önemli Kelimeler &amp; Kalıplar:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.explanation.vocabularyNotes.map((vocab, vIdx) => (
                      <div
                        key={vIdx}
                        className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/10 text-xs flex items-center gap-1.5"
                      >
                        <span className="font-bold text-white">{vocab.word}:</span>
                        <span className="text-cyan-200">{vocab.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tactical Tip */}
              {currentQ.explanation.tacticalTip && (
                <div className="p-4 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-xs flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-indigo-300 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-indigo-200 block mb-0.5">
                      ⚡ Sınav Çözüm Püf Noktası (Taktik):
                    </span>
                    <span className="text-slate-300 leading-relaxed">
                      {currentQ.explanation.tacticalTip}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : null}

      {/* Question Number Matrix Navigator (1 to N) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Soru Gezgini ({filteredQuestions.length} Soru)</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Doğru
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Yanlış
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200"></span> Boş
            </span>
          </div>
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-16 gap-1.5 max-h-48 overflow-y-auto p-1">
          {filteredQuestions.map((q, idx) => {
            const userAns = answers[q.id];
            const isQAnswered = userAns !== undefined;
            const isQCorrect = isQAnswered && userAns === q.correctAnswer;
            const isQWrong = isQAnswered && !isQCorrect;
            const isCurrent = idx === currentIndex;
            const isMarked = bookmarks[q.id];

            let cellStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
            if (isQCorrect) {
              cellStyle = 'bg-emerald-500 text-white font-bold';
            } else if (isQWrong) {
              cellStyle = 'bg-rose-500 text-white font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all relative ${cellStyle} ${
                  isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105 z-10' : ''
                }`}
                title={`Soru ${idx + 1}`}
              >
                {idx + 1}
                {isMarked && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
