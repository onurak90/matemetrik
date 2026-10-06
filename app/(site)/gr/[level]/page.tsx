import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, BookOpen, ExternalLink, Sparkles, ArrowRight } from 'lucide-react';
import GreekBookCover from '@/components/gr/GreekBookCover';
import { GREEK_LEVELS, GREEK_BOOKS, getGreekLevel } from '@/lib/greekEducationData';

interface Props {
  params: {
    level: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const level = getGreekLevel(params.level);
  if (!level) return { title: 'Δεν βρέθηκε | Matemetrik.gr' };

  return {
    title: `${level.title} — Σχολικά Βιβλία, Λύσεις & Απαντήσεις`,
    description: `${level.desc} Όλες οι τάξεις, τα μαθήματα και τα βοηθήματα του ${level.name}υ με αναλυτικές λύσεις ασκήσεων.`,
    alternates: {
      canonical: `https://www.matemetrik.com/gr/${level.slug}`,
    },
    openGraph: {
      locale: 'el_GR',
      title: `${level.title} | Matemetrik.gr`,
      description: level.desc,
      url: `https://www.matemetrik.com/gr/${level.slug}`,
    },
  };
}

export function generateStaticParams() {
  return GREEK_LEVELS.map((lvl) => ({
    level: lvl.slug,
  }));
}

export default function GreekLevelPage({ params }: Props) {
  const level = getGreekLevel(params.level);
  if (!level) notFound();

  const booksInLevel = GREEK_BOOKS.filter((b) => b.level === level.slug);

  return (
    <div className="space-y-10 pb-20 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/gr" className="hover:text-blue-600 transition-colors">
              Αρχική (Ελλάδα)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold">{level.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white space-y-4 border border-slate-800 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Επίσημο Πρόγραμμα Σπουδών ΥΠΑΙΘΑ &bull; ΙΕΠ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {level.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            {level.desc}
          </p>
        </div>
      </section>

      {/* Grade Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {level.grades.map((grade) => {
          const gradeBooks = booksInLevel.filter((b) => b.gradeSlug === grade.slug);

          return (
            <div key={grade.slug} id={grade.slug} className="space-y-6 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    {grade.name}
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Ηλικία μαθητών: {grade.age}
                  </span>
                </div>

                <a
                  href={`http://ebooks.edu.gr/ebooks/v2/allcourses.jsp`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <span>Ψηφιακό Σχολείο (ebooks.edu.gr)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {gradeBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {gradeBooks.map((book) => (
                    <div
                      key={book.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
                    >
                      <Link href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`}>
                        <GreekBookCover
                          gradeName={book.gradeName}
                          subject={book.subject}
                          bookType={book.bookType}
                          themeColor={book.coverColor}
                        />
                      </Link>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-bold text-blue-600">{book.gradeName}</span>
                          <span>{book.pages.length} Σελίδες Λυμένες</span>
                        </div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                          {book.subject}
                        </h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {book.metaDescription}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <Link
                          href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`}
                          className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center transition-colors shadow-sm"
                        >
                          Αναλυτικές Λύσεις
                        </Link>
                        <a
                          href={book.officialPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Επίσημο PDF ebooks.edu.gr"
                          className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 text-center text-slate-500 text-xs">
                  Τα μαθήματα της τάξης {grade.name} είναι διαθέσιμα στην επίσημη πλατφόρμα{' '}
                  <a
                    href="http://ebooks.edu.gr/ebooks/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-bold underline"
                  >
                    ebooks.edu.gr
                  </a>
                  . Οι λύσεις ανανεώνονται συνεχώς.
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
