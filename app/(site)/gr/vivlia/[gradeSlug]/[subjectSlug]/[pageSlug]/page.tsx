import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronLeft, ChevronRight, BookOpen, ExternalLink, Sparkles,
  CheckCircle2, HelpCircle, ArrowLeft, ArrowRight, Printer, Share2
} from 'lucide-react';
import GreekBookCover from '@/components/gr/GreekBookCover';
import GreekPrintButton from '@/components/gr/GreekPrintButton';
import { GREEK_BOOKS, getGreekPageSolution } from '@/lib/greekEducationData';

interface Props {
  params: {
    gradeSlug: string;
    subjectSlug: string;
    pageSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = getGreekPageSolution(params.gradeSlug, params.subjectSlug, params.pageSlug);
  if (!result) return { title: 'Δεν βρέθηκε | Matemetrik.gr' };
  const { book, page } = result;

  return {
    title: `${book.subject} ${book.gradeName} Σελίδα ${page.pageNumber} — Λύσεις & Απαντήσεις (ebooks.edu.gr)`,
    description: `Αναλυτικές λύσεις για τη Σελίδα ${page.pageNumber} (${page.lesson}) του μαθήματος ${book.subject} ${book.gradeName}. Βήμα προς βήμα απαντήσεις σε όλες τις ασκήσεις.`,
    keywords: [
      `${book.subject.toLowerCase()} ${book.gradeName.toLowerCase()} σελιδα ${page.pageNumber} λυσεις`,
      `σελιδα ${page.pageNumber} ${book.subject.toLowerCase()} ${book.gradeSlug} απαντησεις`,
      `λυσαρι σελιδα ${page.pageNumber} ${book.subject.toLowerCase()}`,
      ...book.keywords,
    ],
    alternates: {
      canonical: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${page.slug}`,
    },
    openGraph: {
      locale: 'el_GR',
      title: `${book.subject} ${book.gradeName} Σελίδα ${page.pageNumber} Λύσεις | Matemetrik.gr`,
      description: `Αναλυτικές απαντήσεις στη Σελίδα ${page.pageNumber}: ${page.lesson}`,
      url: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${page.slug}`,
    },
  };
}

export function generateStaticParams() {
  const params: { gradeSlug: string; subjectSlug: string; pageSlug: string }[] = [];
  for (const book of GREEK_BOOKS) {
    for (const page of book.pages) {
      params.push({
        gradeSlug: book.gradeSlug,
        subjectSlug: book.subjectSlug,
        pageSlug: page.slug,
      });
    }
  }
  return params;
}

export default function GreekPageSolutionDetail({ params }: Props) {
  const result = getGreekPageSolution(params.gradeSlug, params.subjectSlug, params.pageSlug);
  if (!result) notFound();
  const { book, page } = result;

  // Next / Prev page resolution
  const currentIndex = book.pages.findIndex((p) => p.slug === page.slug);
  const prevPage = currentIndex > 0 ? book.pages[currentIndex - 1] : null;
  const nextPage = currentIndex < book.pages.length - 1 ? book.pages[currentIndex + 1] : null;

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Αρχική',
        item: 'https://www.matemetrik.com/gr',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: book.levelName,
        item: `https://www.matemetrik.com/gr/${book.level}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${book.gradeName} ${book.subject}`,
        item: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: `Σελίδα ${page.pageNumber}`,
        item: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${page.slug}`,
      },
    ],
  };

  const qnaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: page.exercises.map((ex) => ({
      '@type': 'Question',
      name: `${book.subject} ${book.gradeName} Σελίδα ${page.pageNumber} - ${ex.number}`,
      text: ex.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${ex.steps.join(' ')} Τελική απάντηση: ${ex.answer}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qnaJsonLd) }}
      />

      <div className="space-y-8 pb-20 font-sans">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
            <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/gr" className="hover:text-blue-600 transition-colors">
                Αρχική
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={`/gr/${book.level}`} className="hover:text-blue-600 transition-colors">
                {book.levelName}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link
                href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`}
                className="hover:text-blue-600 transition-colors font-medium"
              >
                {book.subject}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-bold">
                Σελίδα {page.pageNumber}
              </span>
            </nav>
          </div>
        </div>

        {/* Page Header Card */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{book.gradeName} &bull; {book.subject}</span>
              </div>

              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Επίσημο Βιβλίο ΥΠΑΙΘΑ / ebooks.edu.gr
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {book.subject} {book.gradeName} — Σελίδα {page.pageNumber} Λύσεις
            </h1>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <p><strong>Ενότητα:</strong> {page.unit}</p>
              <p><strong>Μάθημα:</strong> {page.lesson}</p>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <GreekPrintButton />
              </div>

              <a
                href={book.officialPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Επίσημο Βιβλίο (ebooks.edu.gr)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Exercises & Verified Solutions */}
          <div className="space-y-6">
            {page.exercises.map((ex, exIdx) => (
              <div
                key={exIdx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                      {exIdx + 1}
                    </span>
                    <span>{ex.number}</span>
                  </h2>

                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full">
                    Επαληθευμένη Λύση
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {ex.question}
                </div>

                {/* Step by step */}
                <div className="space-y-2 pl-4 border-l-2 border-blue-600">
                  <div className="text-xs font-extrabold text-blue-600 uppercase tracking-wider">
                    Βήμα-Βήμα Επεξήγηση:
                  </div>
                  {ex.steps.map((step, sIdx) => (
                    <p key={sIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step}
                    </p>
                  ))}
                </div>

                {/* Final Highlighted Answer */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-black text-emerald-800 dark:text-emerald-300">Τελική Απάντηση: </span>
                    <span className="font-medium">{ex.answer}</span>
                  </div>
                </div>

                {ex.tip && (
                  <div className="text-xs text-blue-800 dark:text-blue-300 bg-blue-50/70 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-100 dark:border-blue-900/60 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span><strong>Σημείωση / Κανόνας:</strong> {ex.tip}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Previous / Next Page Navigation Bar */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
            {prevPage ? (
              <Link
                href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${prevPage.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 text-slate-700 dark:text-slate-200 hover:text-blue-600 text-xs font-bold transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Προηγούμενη: Σελίδα {prevPage.pageNumber}</span>
              </Link>
            ) : (
              <div />
            )}

            <Link
              href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Όλες οι Σελίδες
            </Link>

            {nextPage ? (
              <Link
                href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${nextPage.slug}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <span>Επόμενη: Σελίδα {nextPage.pageNumber}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </article>
      </div>
    </>
  );
}
