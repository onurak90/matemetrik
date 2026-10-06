import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight, BookOpen, ExternalLink, Sparkles, CheckCircle2,
  HelpCircle, ArrowRight, Layers, FileText
} from 'lucide-react';
import GreekBookCover from '@/components/gr/GreekBookCover';
import { GREEK_BOOKS, getGreekBook } from '@/lib/greekEducationData';

interface Props {
  params: {
    gradeSlug: string;
    subjectSlug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = getGreekBook(params.gradeSlug, params.subjectSlug);
  if (!book) return { title: 'Δεν βρέθηκε | Matemetrik.gr' };

  return {
    title: `${book.subject} ${book.gradeName} — Λύσεις & Απαντήσεις Σχολικού Βιβλίου (ebooks.edu.gr)`,
    description: `${book.metaDescription} Αναλυτικές λύσεις ασκήσεων, θεωρία και προβλήματα ανά σελίδα σύμφωνα με το επίσημο σχολικό βιβλίο.`,
    keywords: book.keywords,
    alternates: {
      canonical: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`,
    },
    openGraph: {
      locale: 'el_GR',
      title: `${book.subject} ${book.gradeName} Λύσεις | Matemetrik.gr`,
      description: book.metaDescription,
      url: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`,
    },
  };
}

export function generateStaticParams() {
  return GREEK_BOOKS.map((b) => ({
    gradeSlug: b.gradeSlug,
    subjectSlug: b.subjectSlug,
  }));
}

export default function GreekBookDetailPage({ params }: Props) {
  const book = getGreekBook(params.gradeSlug, params.subjectSlug);
  if (!book) notFound();

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
    ],
  };

  const learningResourceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: `${book.subject} ${book.gradeName} - Λύσεις & Απαντήσεις`,
    description: book.metaDescription,
    educationalLevel: book.gradeName,
    inLanguage: 'el-GR',
    learningResourceType: 'Teacher Guide / Solution Manual',
    url: `https://www.matemetrik.com/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceJsonLd) }}
      />

      <div className="space-y-10 pb-20 font-sans">
        {/* Breadcrumb Navigation */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/gr" className="hover:text-blue-600 transition-colors">
                Αρχική
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href={`/gr/${book.level}`} className="hover:text-blue-600 transition-colors">
                {book.levelName}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-bold">
                {book.gradeName} &bull; {book.subject}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 sm:w-56 shrink-0 shadow-xl rounded-2xl overflow-hidden">
              <GreekBookCover
                gradeName={book.gradeName}
                subject={book.subject}
                bookType={book.bookType}
                themeColor={book.coverColor}
              />
            </div>

            <div className="space-y-4 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{book.gradeName} &bull; {book.bookType}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {book.subject} {book.gradeName} — Λύσεις &amp; Απαντήσεις
              </h1>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                {book.metaDescription} Αναλυτικός οδηγός μελέτης με πλήρως λυμένες όλες τις ασκήσεις, τα προβλήματα και τις δραστηριότητες του σχολικού βιβλίου.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <a
                  href={book.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Επίσημο Βιβλίο PDF (ebooks.edu.gr)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={book.officialEbooksUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  <span>Ψηφιακό Σχολείο ΥΠΑΙΘΑ</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Page by Page Index Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Ευρετήριο Λύσεων ανά Σελίδα
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Επιλέξτε τη σελίδα του βιβλίου για να δείτε τις αναλυτικές λύσεις και τα βήματα.
              </p>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-xl border border-blue-200 dark:border-blue-800">
              {book.pages.length} Σελίδες
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {book.pages.map((p) => (
              <Link
                key={p.slug}
                href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${p.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-black">
                      Σελίδα {p.pageNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold">
                      {p.exercises.length} Ασκήσεις
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                    {p.lesson}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {p.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                  <span>Προβολή Λύσεων</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Detailed Solutions Preview on the page */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
            <Layers className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Αναλυτικές Λύσεις Πρώτης Ενότητας
            </h2>
          </div>

          <div className="space-y-6">
            {book.pages.map((page) => (
              <div
                key={page.slug}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">
                      {page.unit}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                      {page.title}
                    </h3>
                  </div>

                  <Link
                    href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}/${page.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors shrink-0"
                  >
                    <span>Αποκλειστική Σελίδα</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {page.exercises.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                          {ex.number}
                        </h4>
                      </div>

                      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800">
                        {ex.question}
                      </p>

                      <div className="space-y-1.5 pl-3 border-l-2 border-blue-500">
                        <div className="text-[11px] font-bold text-slate-500 uppercase">Βήματα Επίλυσης:</div>
                        {ex.steps.map((step, sIdx) => (
                          <p key={sIdx} className="text-xs text-slate-700 dark:text-slate-300">
                            {step}
                          </p>
                        ))}
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm font-bold flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-extrabold text-emerald-700 dark:text-emerald-300">Απάντηση: </span>
                          <span>{ex.answer}</span>
                        </div>
                      </div>

                      {ex.tip && (
                        <div className="text-[11px] text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40 p-2.5 rounded-lg border border-blue-100 dark:border-blue-900/60 flex items-start gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span><strong>Συμβουλή Εκπαιδευτικού:</strong> {ex.tip}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
