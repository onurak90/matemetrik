import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, ExternalLink, Download, BookOpen, Sparkles,
  ChevronRight, Search, ShieldCheck
} from 'lucide-react';
import GreekBookCover from '@/components/gr/GreekBookCover';
import { GREEK_BOOKS, GREEK_LEVELS } from '@/lib/greekEducationData';

export const metadata: Metadata = {
  title: 'Επίσημα Σχολικά Βιβλία PDF (ebooks.edu.gr) | Κατάλογος Διδακτικών Πακέτων',
  description:
    'Κατάλογος όλων των επίσημων σχολικών βιβλίων Δημοτικού, Γυμνασίου και Λυκείου σε ψηφιακή μορφή PDF από την πλατφόρμα ebooks.edu.gr του Υπουργείου Παιδείας & ΙΤΥΕ «Διόφαντος».',
  keywords: [
    'σχολικα βιβλια pdf',
    'ebooks edu gr βιβλια pdf',
    'κατεβασμα σχολικων βιβλιων',
    'ψηφιακο σχολειο pdf',
    'βιβλιο μαθητη pdf',
    'τετραδιο εργασιων pdf',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr/pdf-vivlia',
  },
  openGraph: {
    locale: 'el_GR',
    title: 'Σχολικά Βιβλία PDF (ebooks.edu.gr) | Matemetrik.gr',
    description: 'Επίσημα σχολικά βιβλία Δημοτικού, Γυμνασίου και Λυκείου σε μορφή PDF.',
    url: 'https://www.matemetrik.com/gr/pdf-vivlia',
  },
};

export default function GreekPdfDirectoryPage() {
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
            <span className="text-slate-900 dark:text-white font-bold">
              Επίσημα Βιβλία PDF (ebooks.edu.gr)
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-950 text-white space-y-4 border border-slate-800 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ΙΤΥΕ «ΔΙΟΦΑΝΤΟΣ» &bull; Ψηφιακό Σχολείο ΥΠΑΙΘΑ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Επίσημα Σχολικά Βιβλία σε Μορφή PDF
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Βρείτε και κατεβάστε δωρεάν όλα τα εγκεκριμένα διδακτικά βιβλία, τετράδια εργασιών και ανθολόγια του Υπουργείου Παιδείας, Θρησκευμάτων και Αθλητισμού απευθείας από την επίσημη πλατφόρμα <strong>ebooks.edu.gr</strong>.
          </p>

          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ 100% Επίσημα Αρχεία ΥΠΑΙΘΑ</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ Βιβλία Μαθητή &amp; Τετράδια Εργασιών</span>
            <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/10">✓ Δωρεάν Λήψη &amp; Online Ανάγνωση</span>
          </div>
        </div>
      </section>

      {/* Book Catalog Table & Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Κατάλογος Διδακτικών Πακέτων ανά Τάξη
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Επιλέξτε για λήψη του επίσημου PDF ή προβολή των αναλυτικών λύσεων.
            </p>
          </div>

          <a
            href="http://ebooks.edu.gr/ebooks/v2/allmaterial.jsp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold hover:bg-blue-100 transition-colors"
          >
            <span>Όλο το Υλικό στο ebooks.edu.gr</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {GREEK_BOOKS.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 group hover:shadow-md transition-all"
            >
              <div className="relative">
                <GreekBookCover
                  gradeName={book.gradeName}
                  subject={book.subject}
                  bookType={book.bookType}
                  themeColor={book.coverColor}
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wide">
                  {book.gradeName} &bull; {book.levelName}
                </span>
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  {book.subject}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {book.metaDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                <a
                  href={book.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Κατέβασμα PDF (ebooks)</span>
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>

                <Link
                  href={`/gr/vivlia/${book.gradeSlug}/${book.subjectSlug}`}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-bold text-center transition-colors"
                >
                  Προβολή Λύσεων Ασκήσεων
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Sources Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-3xl bg-slate-100/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 leading-relaxed">
            <h4 className="font-bold text-slate-900 dark:text-white">
              Πνευματικά Δικαιώματα &amp; Επίσημη Πηγή
            </h4>
            <p>
              Τα ψηφιακά σχολικά βιβλία διατίθενται ελεύθερα για εκπαιδευτική χρήση από το <strong>ΙΤΥΕ «ΔΙΟΦΑΝΤΟΣ»</strong> και το <strong>Υπουργείο Παιδείας, Θρησκευμάτων και Αθλητισμού</strong> μέσω του αποθετηρίου <a href="http://ebooks.edu.gr/ebooks/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold underline">ebooks.edu.gr</a>. Το Matemetrik.gr παρέχει ανεξάρτητο βοηθητικό υλικό επεξήγησης και λύσεων ασκήσεων για τη διευκόλυνση της μαθησιακής διαδικασίας.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
