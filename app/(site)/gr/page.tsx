import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  BookOpen, Sparkles, ChevronRight, GraduationCap,
  FileText, Newspaper, ExternalLink, HelpCircle, CheckCircle2,
  ArrowRight, Compass, Award, Clock, Calculator, ShieldCheck
} from 'lucide-react';
import GreekHeroSlider from '@/components/gr/GreekHeroSlider';
import GreekBookCover from '@/components/gr/GreekBookCover';
import { GREEK_LEVELS, GREEK_BOOKS } from '@/lib/greekEducationData';
import { getGreekNews } from '@/lib/greekNews';

export const metadata: Metadata = {
  title: 'Σχολικά Βιβλία & Λυσάρια ebooks.edu.gr | Απαντήσεις & Βοηθήματα Δημοτικού, Γυμνασίου, Λυκείου',
  description:
    'Αναλυτικές λύσεις και απαντήσεις σχολικών βιβλίων Δημοτικού, Γυμνασίου και Λυκείου σύμφωνα με το επίσημο πρόγραμμα του ΥΠΑΙΘΑ. Βήμα-βήμα ασκήσεις, προβλήματα και δωρεάν βιβλία PDF από το ebooks.edu.gr.',
  keywords: [
    'λυσαρια',
    'σχολικα βιβλια απαντησεις',
    'βοηθηματα',
    'μαθηματικα στ δημοτικου λυσεις',
    'γλωσσα στ δημοτικου λυσεις',
    'αλγεβρα α λυκειου λυσεις',
    'φυσικη β γυμνασιου λυσεις',
    'ebooks edu gr',
    'ψηφιακο σχολειο',
    'λυσεις σχολικων βιβλιων ανα σελιδα',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr',
  },
  openGraph: {
    locale: 'el_GR',
    type: 'website',
    url: 'https://www.matemetrik.com/gr',
    title: 'Σχολικά Βιβλία & Λυσάρια ebooks.edu.gr | Matemetrik.gr',
    description:
      'Βρείτε όλες τις λύσεις των ασκήσεων για το Δημοτικό, το Γυμνάσιο και το Λύκειο.',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik.gr Σχολικά Βιβλία & Λυσάρια',
      },
    ],
  },
};

const greekFaqs = [
  {
    q: 'Είναι οι λύσεις των σχολικών βιβλίων συμβατές με το επίσημο πρόγραμμα του Υπουργείου Παιδείας (ΥΠΑΙΘΑ);',
    a: 'Ναι. Όλες οι αναλύσεις και οι λύσεις ασκήσεων βασίζονται αποκλειστικά στα εγκεκριμένα διδακτικά βιβλία του ΙΤΥΕ «Διόφαντος» και του Ινστιτούτου Εκπαιδευτικής Πολιτικής (ΙΕΠ) που διατίθενται στην επίσημη ψηφιακή βιβλιοθήκη ebooks.edu.gr.',
  },
  {
    q: 'Πώς μπορώ να χρησιμοποιήσω σωστά τα βοηθήματα και τα λυσάρια στη μελέτη μου;',
    a: 'Τα λυσάρια είναι εκπαιδευτικά εργαλεία αυτοαξιολόγησης. Συνιστούμε στους μαθητές να προσπαθούν πρώτα να επιλύσουν μόνοι τους τις ασκήσεις και τα προβλήματα, και στη συνέχεια να συμβουλεύονται τις αναλυτικές λύσεις για να ελέγξουν τον συλλογισμό τους και να κατανοήσουν τυχόν παραλείψεις.',
  },
  {
    q: 'Πού μπορώ να βρω τα επίσημα βιβλία σε μορφή PDF για δωρεάν κατέβασμα;',
    a: 'Στην ενότητα «Βιβλία PDF» παρέχουμε άμεσους συνδέσμους προς την επίσημη πλατφόρμα ebooks.edu.gr του Ψηφιακού Σχολείου, απ\' όπου μπορείτε να κατεβάσετε νόμιμα και δωρεάν όλα τα τεύχη των βιβλίων του μαθητή και των τετραδίων εργασιών.',
  },
  {
    q: 'Υπάρχουν λύσεις για όλες τις βαθμίδες (Δημοτικό, Γυμνάσιο, Λύκειο);',
    a: 'Ναι. Η πλατφόρμα μας καλύπτει όλες τις τάξεις από την Α\' Δημοτικού έως τη Γ\' Λυκείου και την προετοιμασία των Πανελλαδικών Εξετάσεων, με εξειδίκευση στα Μαθηματικά, τη Γλώσσα, τη Φυσική, τη Χημεία και τα Αρχαία Ελληνικά.',
  },
];

export default async function GreekHomePage() {
  const latestNews = await getGreekNews(4);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Matemetrik.gr',
    url: 'https://www.matemetrik.com/gr',
    inLanguage: 'el-GR',
    description: 'Εκπαιδευτική πλατφόρμα σχολικών βοηθημάτων, λύσεων και ειδήσεων παιδείας στην Ελλάδα.',
    publisher: {
      '@type': 'Organization',
      name: 'Matemetrik Education Network',
      url: 'https://www.matemetrik.com',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: greekFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="space-y-12 sm:space-y-16 pb-20">
        {/* Hero Section & Slider */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <GreekHeroSlider />
        </section>

        {/* Specialized Exam Prep & Educational Tools Hubs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Εργαλεία &amp; Προετοιμασία</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Εξετάσεις, Τράπεζα Θεμάτων &amp; Μόρια
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Επίσημα εκπαιδευτικά εργαλεία για το Λύκειο, τις Πανελλαδικές και τα σχολικά διαγωνίσματα τετραμήνου.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Τράπεζα Θεμάτων */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    ΙΕΠ 2026
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    Τράπεζα Θεμάτων
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Θέματα 2 και 4 με πλήρεις βήμα-βήμα λύσεις για την Α&apos;, Β&apos; και Γ&apos; Λυκείου.
                  </p>
                </div>
              </div>
              <Link
                href="/gr/trapeza-thematon"
                className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700"
              >
                <span>Αναζήτηση Θεμάτων</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 2. Πανελλαδικές Εξετάσεις */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-300 dark:hover:border-purple-700 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                    4 Πεδία
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 transition-colors">
                    Πανελλαδικές &amp; ΟΕΦΕ
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Παλαιότερα θέματα, επαναληπτικά διαγωνίσματα ΟΕΦΕ και ενδεικτικές απαντήσεις ανά μάθημα.
                  </p>
                </div>
              </div>
              <Link
                href="/gr/panelladikes"
                className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-700"
              >
                <span>Δείτε τα Θέματα</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3. Υπολογιστής Μορίων */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Calculator className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                    Live Tool
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                    Υπολογιστής Μορίων
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Υπολογίστε άμεσα τα μόριά σας με συντελεστές βαρύτητας και εκτίμηση πιθανών σχολών ΑΕΙ.
                  </p>
                </div>
              </div>
              <Link
                href="/gr/ypologistis-morion"
                className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700"
              >
                <span>Υπολογισμός Τώρα</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 4. Διαγωνίσματα Τετραμήνου */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-300 dark:hover:border-amber-700 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    Α&apos; &amp; Β&apos; Τετρ.
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                    Σχολικά Διαγωνίσματα
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    Θέματα εξετάσεων 1ου &amp; 2ου τετραμήνου με αναλυτικές λύσεις και εκτυπώσιμα αρχεία PDF.
                  </p>
                </div>
              </div>
              <Link
                href="/gr/diagonismata"
                className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 inline-flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-700"
              >
                <span>Λήψη Διαγωνισμάτων</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Main Educational Stages Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-800">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Σχολικές Βαθμίδες</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Επιλέξτε Βαθμίδα και Τάξη
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Περιηγηθείτε σε όλα τα σχολικά βιβλία, τετράδια εργασιών και λυσάρια ανά εκπαιδευτική βαθμίδα.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GREEK_LEVELS.map((level) => (
              <div
                key={level.slug}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black text-lg group-hover:scale-105 transition-transform">
                      {level.slug === 'dimotiko' ? 'Δ' : level.slug === 'gymnasio' ? 'Γ' : 'Λ'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {level.grades.length} Τάξεις
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {level.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {level.desc}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {level.grades.map((g) => (
                      <Link
                        key={g.slug}
                        href={`/gr/${level.slug}#${g.slug}`}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-700 dark:text-slate-200 hover:text-blue-600 text-xs font-bold text-center border border-slate-200/60 dark:border-slate-700/60 transition-colors"
                      >
                        {g.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/gr/${level.slug}`}
                  className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group/link"
                >
                  <span>Όλα τα μαθήματα {level.name}υ</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Textbooks & Page Solutions Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Αναλυτικά Λυσάρια</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Δημοφιλή Σχολικά Βιβλία &amp; Απαντήσεις
              </h2>
            </div>
            <Link
              href="/gr/dimotiko"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Προβολή όλων των βιβλίων</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GREEK_BOOKS.slice(0, 4).map((book) => (
              <div
                key={book.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <Link href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`} className="block">
                  <GreekBookCover
                    gradeName={book.gradeName}
                    subject={book.subject}
                    bookType={book.bookType}
                    themeColor={book.coverColor}
                  />
                </Link>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold text-blue-600 dark:text-blue-400">{book.gradeName}</span>
                    <span>{book.pages.length} Σελίδες Λυμένες</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-1">
                    {book.subject}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {book.metaDescription}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`}
                    className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center transition-colors"
                  >
                    Λύσεις Ασκήσεων
                  </Link>
                  <a
                    href={book.officialPdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Επίσημο PDF ebooks.edu.gr"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Greek School & Teacher News (2-hour auto crawled) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-bold mb-2">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Εκπαιδευτικό Ρεπορτάζ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Τελευταίες Ειδήσεις Παιδείας &amp; Σχολείων
              </h2>
            </div>
            <Link
              href="/gr/eidiseis"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Όλες οι ειδήσεις</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestNews.map((news, idx) => (
              <article
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/10] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={news.image_url}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {news.source_site}
                  </span>
                </div>

                <div className="p-4 sm:p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {news.pub_date}
                    </span>
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                      {news.description}
                    </p>
                  </div>

                  <Link
                    href={`/gr/eidiseis/${news.slug}`}
                    className="inline-flex items-center gap-1 pt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Διαβάστε περισσότερα</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pedagogical FAQ Section in Greek */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Συχνές Ερωτήσεις (FAQ)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Συχνές Ερωτήσεις για τα Σχολικά Βοηθήματα &amp; Λυσάρια
              </h2>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {greekFaqs.map((faq, idx) => (
                <div key={idx} className="py-4 space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-7 leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
