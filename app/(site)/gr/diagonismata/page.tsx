import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText, Download, Sparkles, ChevronRight, CheckCircle2,
  BookOpen, Layers, Award, HelpCircle, ArrowRight, ExternalLink,
  Clock, ShieldCheck
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Διαγωνίσματα Α\' & Β\' Τετραμήνου: Θέματα & Λύσεις (Δημοτικό, Γυμνάσιο, Λύκειο) PDF',
  description:
    'Δωρεάν εκτυπώσιμα διαγωνίσματα Α\' και Β\' τετραμήνου με αναλυτικές ενδεικτικές απαντήσεις και κριτήρια βαθμολόγησης για το Δημοτικό, το Γυμνάσιο και το Λύκειο σε μορφή PDF.',
  keywords: [
    'διαγωνισματα α τετραμηνου',
    'διαγωνισματα β τετραμηνου',
    'διαγωνισματα μαθηματικων',
    'διαγωνισματα γυμνασιου',
    'διαγωνισματα λυκειου',
    'διαγωνισμα αλγεβρα α λυκειου pdf',
    'διαγωνισματα στ δημοτικου',
    'θεματα εξετασεων με λυσεις',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr/diagonismata',
  },
  openGraph: {
    locale: 'el_GR',
    type: 'article',
    url: 'https://www.matemetrik.com/gr/diagonismata',
    title: 'Διαγωνίσματα Α\' & Β\' Τετραμήνου με Λύσεις | Matemetrik.gr',
    description:
      'Επαναληπτικά διαγωνίσματα και θέματα εξετάσεων με πλήρεις λύσεις για όλες τις τάξεις.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'διαγωνισματα α και β τετραμηνου θεματα και λυσεις δημοτικο γυμνασιο λυκειο pdf',
      },
    ],
  },
};

const diagonismataFaqs = [
  {
    q: 'Πότε διενεργούνται τα διαγωνίσματα του Α\' Τετραμήνου στα σχολεία;',
    a: 'Σύμφωνα με το προεδρικό διάταγμα για τη λειτουργία των σχολικών μονάδων, τα ωριαία γραπτά διαγωνίσματα του Α\' Τετραμήνου διεξάγονται συνήθως μεταξύ τέλους Οκτωβρίου και μέσων Δεκεμβρίου, έπειτα από έγκαιρη ειδοποίηση των μαθητών από τον διδάσκοντα καθηγητή.',
  },
  {
    q: 'Πόσα διαγωνίσματα επιτρέπεται να γράφουν οι μαθητές ανά ημέρα;',
    a: 'Στο Γυμνάσιο και το Λύκειο δεν επιτρέπεται η διεξαγωγή περισσότερων από ένα (1) ωριαίο γραπτό διαγώνισμα την ίδια ημέρα, ούτε περισσότερων από τρία (3) διαγωνίσματα μέσα στην ίδια εβδομάδα.',
  },
  {
    q: 'Πώς διαμορφώνεται η δομή ενός επίσημου διαγωνίσματος;',
    a: 'Ένα πλήρες διαγώνισμα τετραμήνου περιλαμβάνει συνήθως 4 ισοδύναμα θέματα των 5 μονάδων (σύνολο 20 μονάδες): Θέμα 1ο (Θεωρία / Σωστό-Λάθος), Θέμα 2ο (Βασικές ασκήσεις μεθοδολογίας), Θέμα 3ο (Σύνθετη άσκηση εφαρμογής), Θέμα 4ο (Πρόβλημα αυξημένης δυσκολίας με διαβαθμισμένα υποερωτήματα).',
  },
];

interface DiagonismaCard {
  level: string;
  grade: string;
  subject: string;
  term: string;
  duration: string;
  units: string;
  pdfUrl: string;
  sampleQuestion: string;
  sampleAnswer: string;
}

const SAMPLE_EXAMS: DiagonismaCard[] = [
  {
    level: 'Λύκειο',
    grade: 'Α\' Λυκείου',
    subject: 'Άλγεβρα',
    term: 'Α\' Τετραμήνου (Νοέμβριος)',
    duration: '45 Λεπτά (1 Διδακτική Ώρα)',
    units: 'Απόλυτες Τιμές, Ρίζες Πραγματικών Αριθμών, Εξισώσεις 1ου & 2ου Βαθμού',
    pdfUrl: 'https://drive.google.com/file/d/1InvRSy-TLwTrLXZ7W4u3UuL06XVl2Aoj/view?usp=sharing',
    sampleQuestion: 'Να λύσετε την εξίσωση |2x - 5| = 7 και να βρείτε για ποιες τιμές του x ορίζεται η παράσταση A = √(2x - 5).',
    sampleAnswer: '1. Εξίσωση: |2x - 5| = 7 <=> 2x - 5 = 7 ή 2x - 5 = -7 <=> 2x = 12 => x = 6 ή 2x = -2 => x = -1.\n2. Πεδίο Ορισμού: Πρέπει 2x - 5 ≥ 0 <=> 2x ≥ 5 <=> x ≥ 5/2 (ή x ≥ 2,5).',
  },
  {
    level: 'Γυμνάσιο',
    grade: 'Β\' Γυμνασίου',
    subject: 'Μαθηματικά',
    term: 'Α\' Τετραμήνου (Δεκέμβριος)',
    duration: '45 Λεπτά',
    units: 'Εξισώσεις 1ου Βαθμού, Πυθαγόρειο Θεώρημα, Τετραγωνική Ρίζα',
    pdfUrl: 'https://drive.google.com/file/d/1GgnUT_s7x57hKs4jpO63cRumNsw9risv/view?usp=sharing',
    sampleQuestion: 'Σε ορθογώνιο τρίγωνο ΑΒΓ (∠Α = 90°) οι κάθετες πλευρές έχουν μήκη ΑΒ = 6 cm και ΑΓ = 8 cm. Να υπολογίσετε το μήκος της υποτείνουσας ΒΓ και το εμβαδόν του τριγώνου.',
    sampleAnswer: '1. Πυθαγόρειο Θεώρημα: ΒΓ² = ΑΒ² + ΑΓ² = 6² + 8² = 36 + 64 = 100 => ΒΓ = √100 = 10 cm.\n2. Εμβαδόν: Ε = (ΑΒ · ΑΓ) / 2 = (6 · 8) / 2 = 48 / 2 = 24 cm².',
  },
  {
    level: 'Δημοτικό',
    grade: 'ΣΤ\' Δημοτικού',
    subject: 'Μαθηματικά',
    term: 'Α\' Τετραμήνου (Δεκέμβριος)',
    duration: '45 Λεπτά',
    units: 'Φυσικοί και Δεκαδικοί Αριθμοί, Κλάσματα (Πρόσθεση, Αφαίρεση, Πολλαπλασιασμός)',
    pdfUrl: 'https://drive.google.com/file/d/1KNAQ2-WlKQwemvKQJLDIsPOtc0dXCRyA/view?usp=sharing',
    sampleQuestion: 'Ένας μανάβης είχε 120 κιλά μήλα. Το πρωί πούλησε τα 2/5 της συνολικής ποσότητας και το απόγευμα το 1/3 της αρχικής ποσότητας. Πόσα κιλά μήλα του έμειναν;',
    sampleAnswer: '1. Πρωί: 120 · (2/5) = 240 / 5 = 48 κιλά.\n2. Απόγευμα: 120 · (1/3) = 40 κιλά.\n3. Σύνολο πωλήσεων: 48 + 40 = 88 κιλά.\n4. Υπόλοιπο: 120 - 88 = 32 κιλά μήλα έμειναν.',
  },
  {
    level: 'Γυμνάσιο',
    grade: 'Α\' Γυμνασίου',
    subject: 'Φυσική',
    term: 'Α\' Τετραμήνου',
    duration: '45 Λεπτά',
    units: 'Μετρήσεις Μήκους, Χρόνου, Μάζας, Πυκνότητα (d = m / V)',
    pdfUrl: 'https://drive.google.com/file/d/18i7UfresrvDfihAr8LF7ncJ43uLsfW0C/view?usp=sharing',
    sampleQuestion: 'Ένα μεταλλικό σώμα έχει μάζα m = 540 γραμμάρια και όγκο V = 200 cm³. Να υπολογίσετε την πυκνότητά του σε g/cm³ και σε kg/m³.',
    sampleAnswer: '1. Πυκνότητα: d = m / V = 540 g / 200 cm³ = 2,7 g/cm³.\n2. Μετατροπή σε SI: 1 g/cm³ = 1.000 kg/m³, άρα d = 2,7 · 1.000 = 2.700 kg/m³ (πρόκειται για αλουμίνιο).',
  },
];

export default function DiagonismataHubPage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Διαγωνίσματα Α\' & Β\' Τετραμήνου με Λύσεις | Matemetrik.gr',
    url: 'https://www.matemetrik.com/gr/diagonismata',
    inLanguage: 'el-GR',
    description: 'Εκτυπώσιμα διαγωνίσματα τετραμήνου με αναλυτικές λύσεις για όλες τις τάξεις.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: diagonismataFaqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <div className="space-y-12 pb-24 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/gr" className="hover:text-blue-600 transition-colors">
              Αρχική (Ελλάδα)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold">
              Διαγωνίσματα Τετραμήνου
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-blue-900/50">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ΣΧΟΛΙΚΑ ΔΙΑΓΩΝΙΣΜΑΤΑ &bull; Α\' &amp; Β\' ΤΕΤΡΑΜΗΝΟ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Διαγωνίσματα Α\' &amp; Β\' Τετραμήνου (PDF)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Εκτυπώσιμα θέματα ωριαίων γραπτών διαγωνισμάτων για το <strong>Δημοτικό, το Γυμνάσιο και το Λύκειο</strong>. Συνοδεύονται από πλήρεις, αναλυτικές ενδεικτικές απαντήσεις, κριτήρια βαθμολόγησης (rubrics) και χρήσιμες παρατηρήσεις για την αποφυγή λαθών.
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-blue-200 pt-2">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Δομή 4 Θεμάτων (Κλίμακα 20)
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Αναλυτικές Απαντήσεις
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Δωρεάν Κατέβασμα PDF
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Papers Cards List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Ενδεικτικά Διαγωνίσματα ανά Βαθμίδα
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Επιλέξτε το μάθημα που σας ενδιαφέρει για να δείτε τα θέματα και να κατεβάσετε το αντίστοιχο αρχείο PDF.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SAMPLE_EXAMS.map((exam, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      {exam.grade}
                    </span>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {exam.subject}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {exam.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    Διαγώνισμα {exam.term}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    <strong>Εξεταστέα Ύλη:</strong> {exam.units}
                  </p>
                </div>

                {/* Sample Problem Box */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-3 text-xs">
                  <div>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                      Ενδεικτικό Θέμα:
                    </span>
                    <p className="text-slate-800 dark:text-slate-200 font-medium whitespace-pre-line leading-relaxed">
                      {exam.sampleQuestion}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block mb-1">
                      Συνοπτική Λύση:
                    </span>
                    <pre className="text-slate-700 dark:text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                      {exam.sampleAnswer}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Πλήρης Λύση</span>
                </span>

                <a
                  href={exam.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all hover:scale-105"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Κατέβασμα PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Συχνές Ερωτήσεις για τα Σχολικά Διαγωνίσματα
            </h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {diagonismataFaqs.map((faq, i) => (
              <div key={i} className="py-4 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
