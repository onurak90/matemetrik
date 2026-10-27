import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap, Download, Sparkles, ChevronRight, CheckCircle2,
  BookOpen, Calculator, Award, HelpCircle, ArrowRight, ExternalLink,
  Target, Layers, Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Πανελλαδικές Εξετάσεις: Θέματα, Απαντήσεις & Θέματα ΟΕΦΕ (PDF)',
  description:
    'Πλήρες αρχείο θεμάτων και αναλυτικών λύσεων Πανελλαδικών Εξετάσεων και επαναληπτικών διαγωνισμάτων ΟΕΦΕ. Μαθηματικά, Έκθεση, Φυσική, Χημεία, Αρχαία και Βιολογία ανά Επιστημονικό Πεδίο.',
  keywords: [
    'πανελλαδικες εξετασεις',
    'θεματα πανελληνιων',
    'θεματα πανελληνιων 2024 λυσεις',
    'θεματα πανελληνιων 2025',
    'θεματα οεφε',
    'θεματα οεφε με απαντησεις',
    'μαθηματικα προσανατολισμου θεματα',
    'εκθεση πανελληνιες',
    'φυσικη προσανατολισμου λυσεις',
    'βαθμολογιες πανελληνιων',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr/panelladikes',
  },
  openGraph: {
    locale: 'el_GR',
    type: 'article',
    url: 'https://www.matemetrik.com/gr/panelladikes',
    title: 'Πανελλαδικές Εξετάσεις: Θέματα & Απαντήσεις | Matemetrik.gr',
    description:
      'Θέματα και αναλυτικές απαντήσεις Πανελλαδικών και ΟΕΦΕ για όλα τα Επιστημονικά Πεδία.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'πανελλαδικες εξετασεις θεματα και απαντησεις μαθηματικα εκθεση φυσικη οεφε pdf',
      },
    ],
  },
};

const panelladikesFaqs = [
  {
    q: 'Πότε και πώς ανακοινώνονται τα θέματα των Πανελλαδικών Εξετάσεων;',
    a: 'Τα θέματα μεταδίδονται στα εξεταστικά κέντρα όλης της χώρας μέσω του συστήματος VBI περίπου στις 08:30 π.μ. και αναρτώνται στην επίσημη ιστοσελίδα του Υπουργείου Παιδείας (minedu.gov.gr) λίγο μετά τις 09:00 π.μ., όταν όλοι οι υποψήφιοι έχουν παραλάβει τα θέματα στις αίθουσες.',
  },
  {
    q: 'Πώς γίνεται η βαθμολόγηση των γραπτών δοκιμίων;',
    a: 'Κάθε γραπτό βαθμολογείται ανεξάρτητα από δύο βαθμολογητές σε κλίμακα 0-100 (ο τελικός βαθμός είναι το άθροισμα διαιρούμενο δια του 10). Εάν η διαφορά μεταξύ των δύο βαθμολογητών είναι μεγαλύτερη από 12 μονάδες (στην κλίμακα 0-100), το γραπτό οδηγείται υποχρεωτικά σε τρίτο αναβαθμολογητή.',
  },
  {
    q: 'Τι είναι τα Επαναληπτικά Θέματα της ΟΕΦΕ;',
    a: 'Η Ομοσπονδία Εκπαιδευτικών Φροντιστών Ελλάδος (ΟΕΦΕ) διοργανώνει κάθε άνοιξη πανελλαδικές προσομοιώσεις εξετάσεων. Τα θέματα της ΟΕΦΕ διακρίνονται για την υψηλή ποιότητα, τη συνδυαστικότητα και την πιστή προσέγγιση της φιλοσοφίας της Κεντρικής Επιτροπής Εξετάσεων (ΚΕΕ).',
  },
  {
    q: 'Πώς μπορώ να υπολογίσω ακριβώς τα μόριά μου;',
    a: 'Μπορείτε να χρησιμοποιήσετε τον δωρεάν διαδραστικό Υπολογιστή Μορίων της πλατφόρμας μας, ο οποίος ενσωματώνει τους επίσημους συντελεστές βαρύτητας του Υπουργείου Παιδείας για κάθε πανεπιστημιακό τμήμα.',
  },
];

const FIELDS_DATA = [
  {
    code: '1ο Πεδίο',
    name: 'Ανθρωπιστικές, Νομικές & Κοινωνικές Επιστήμες',
    color: 'from-amber-600 to-rose-600',
    subjects: ['Αρχαία Ελληνικά', 'Ιστορία', 'Λατινικά', 'Νεοελληνική Γλώσσα & Λογοτεχνία'],
    topFaculties: 'Νομική, Ψυχολογία, Φιλολογία, Διεθνών Σπουδών',
    desc: 'Απαιτεί βαθιά συντακτική και γραμματική ακρίβεια στα Αρχαία και Λατινικά, καθώς και συνδυαστική κριτική σκέψη στα ιστορικά παραθέματα.',
  },
  {
    code: '2ο Πεδίο',
    name: 'Θετικές & Τεχνολογικές Επιστήμες',
    color: 'from-blue-600 to-indigo-600',
    subjects: ['Μαθηματικά Προσανατολισμού', 'Φυσική Προσανατολισμού', 'Χημεία Προσανατολισμού', 'Νεοελληνική Γλώσσα'],
    topFaculties: 'Ηλεκτρολόγων Μηχανικών ΕΜΠ, Μηχανολόγων, Μαθηματικό, Φυσικό',
    desc: 'Το πεδίο με τη μεγαλύτερη βαρύτητα στη μαθηματική ανάλυση, τις αποδείξεις θεωρημάτων και τα σύνθετα προβλήματα Μηχανικής και Ηλεκτρομαγνητισμού.',
  },
  {
    code: '3ο Πεδίο',
    name: 'Επιστήμες Υγείας & Ζωής',
    color: 'from-emerald-600 to-teal-600',
    subjects: ['Βιολογία Προσανατολισμού', 'Χημεία Προσανατολισμού', 'Φυσική Προσανατολισμού', 'Νεοελληνική Γλώσσα'],
    topFaculties: 'Ιατρική, Οδοντιατρική, Φαρμακευτική, Βιολογία',
    desc: 'Ιδιαίτερα ανταγωνιστικό πεδίο με εξαιρετικά υψηλές βάσεις εισαγωγής. Κλειδί επιτυχίας είναι η λεπτομερής απόδοση βιολογικών μηχανισμών και η οργανική σύνθεση.',
  },
  {
    code: '4ο Πεδίο',
    name: 'Επιστήμες Οικονομίας & Πληροφορικής',
    color: 'from-purple-600 to-pink-600',
    subjects: ['Μαθηματικά Προσανατολισμού', 'Οικονομία (ΑΟΘ)', 'Πληροφορική (ΑΕΠΠ)', 'Νεοελληνική Γλώσσα'],
    topFaculties: 'Διοικητικής Επιστήμης & Τεχνολογίας ΟΠΑ, Πληροφορική, Χρηματοοικονομικά',
    desc: 'Συνδυάζει τη μαθηματική σκέψη με τον αλγοριθμικό προγραμματισμό και την οικονομική ανάλυση της αγοράς και του κρατικού προϋπολογισμού.',
  },
];

export default function PanelladikesHubPage() {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Πανελλαδικές Εξετάσεις | Θέματα & Απαντήσεις Matemetrik.gr',
    url: 'https://www.matemetrik.com/gr/panelladikes',
    inLanguage: 'el-GR',
    description: 'Αρχείο θεμάτων και λύσεων Πανελλαδικών Εξετάσεων και ΟΕΦΕ για όλα τα μαθήματα Γ\' Λυκείου.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: panelladikesFaqs.map((f) => ({
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

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/gr" className="hover:text-blue-600 transition-colors">
              Αρχική (Ελλάδα)
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/gr/lykeio" className="hover:text-blue-600 transition-colors">
              Γ\' Λυκείου
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 dark:text-white font-bold">
              Πανελλαδικές Εξετάσεις &amp; ΟΕΦΕ
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-indigo-900/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ΠΑΝΕΛΛΑΔΙΚΕΣ ΕΞΕΤΑΣΕΙΣ &bull; ΟΕΦΕ &bull; ΥΠΑΙΘΑ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Πανελλαδικές Εξετάσεις: Θέματα, Απαντήσεις &amp; Θέματα ΟΕΦΕ (PDF)
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Το πληρέστερο ψηφιακό αρχείο θεμάτων Πανελλαδικών Εξετάσεων (ΓΕΛ &amp; ΕΠΑΛ) και επαναληπτικών θεμάτων της ΟΕΦΕ. Αναλυτικές λύσεις από έμπειρους εκπαιδευτικούς φροντιστές, μεθοδολογία επίλυσης και οδηγός διαχείρισης χρόνου για τα 4 Επιστημονικά Πεδία.
            </p>

            <div className="flex flex-wrap gap-2 text-xs text-indigo-200 pt-2">
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Όλα τα Εξεταζόμενα Μαθήματα
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Θέματα ΟΕΦΕ Προσομοίωσης
              </span>
              <span className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 font-semibold">
                ✓ Δωρεάν Λήψη PDF
              </span>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <Link
              href="/gr/ypologistis-morion"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-emerald-950/40 transition-all hover:scale-105"
            >
              <Calculator className="w-5 h-5" />
              <span>Υπολογιστής Μορίων 2026</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* The 4 Scientific Fields */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Τα 4 Επιστημονικά Πεδία (Ομάδες Προσανατολισμού)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Επιλέξτε το πεδίο σας για να δείτε τα εξεταζόμενα μαθήματα, τα θέματα προηγούμενων ετών και τις ενδεικτικές απαντήσεις.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FIELDS_DATA.map((field) => (
            <div
              key={field.code}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-black text-white bg-gradient-to-r ${field.color} shadow-sm`}>
                    {field.code}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    Γ\' Λυκείου ΓΕΛ
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {field.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {field.desc}
                </p>

                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Εξεταζόμενα Μαθήματα:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {field.subjects.map((s) => (
                      <span
                        key={s}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
                  🎯 {field.topFaculties}
                </span>
                <a
                  href="https://drive.google.com/drive/folders/1suutgnUjgYxElIEHfRMrp7IW9BvTc7s0?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Θέματα &amp; Λύσεις</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Panhellenic Solved Problem: Μαθηματικά Προσανατολισμού Θέμα Γ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Υπόδειγμα Πανελλαδικών • 25 Μονάδες
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
                Μαθηματικά Προσανατολισμού — Θέμα Γ (Μελέτη Συνάρτησης &amp; Bolzano)
              </h3>
            </div>
            <a
              href="https://drive.google.com/file/d/1OSggsG_PXawI8iz4_iXIv8cCXbjd6JWA/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Κατέβασμα Πλήρους Θέματος PDF</span>
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/80 space-y-4 text-xs sm:text-sm">
            <div>
              <span className="font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider block mb-1">
                Εκφώνηση:
              </span>
              <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                Δίνεται η συνάρτηση f(x) = e^x + 2x - 3, x ∈ ℝ.\n
                Γ1. Να αποδείξετε ότι η f είναι γνησίως αύξουσα στο ℝ και να βρείτε το σύνολο τιμών της.\n
                Γ2. Να αποδείξετε ότι η εξίσωση f(x) = 0 έχει μοναδική ρίζα στο διάστημα (0, 1).\n
                Γ3. Να λύσετε την ανίσωση f(e^x - 1) &gt; f(x).
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                Υποδειγματική Επίλυση Βήμα προς Βήμα:
              </span>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-bold">Γ1. Μονοτονία &amp; Σύνολο Τιμών (8 Μονάδες):</strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Η f είναι παραγωγίσιμη στο ℝ ως άθροισμα παραγωγίσιμων συναρτήσεων με παράγωγο: f&apos;(x) = (e^x + 2x - 3)&apos; = e^x + 2. Επειδή e^x &gt; 0 για κάθε x ∈ ℝ, ισχύει f&apos;(x) = e^x + 2 &gt; 2 &gt; 0 για κάθε x ∈ ℝ. Συνεπώς η f είναι γνησίως αύξουσα στο ℝ.
                  Για το σύνολο τιμών υπολογίζουμε τα όρια: lim(x→-∞) f(x) = lim(x→-∞) (e^x + 2x - 3) = 0 + (-∞) - 3 = -∞. lim(x→+∞) f(x) = lim(x→+∞) (e^x + 2x - 3) = +∞ + (+∞) - 3 = +∞. Επειδή η f είναι συνεχής και γνησίως αύξουσα, το σύνολο τιμών είναι το f(ℝ) = (-∞, +∞) = ℝ.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-bold">Γ2. Ύπαρξη &amp; Μοναδικότητα Ρίζας - Θεώρημα Bolzano (8 Μονάδες):</strong>
                <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                  <p>Εξετάζουμε τη συνάρτηση f στο κλειστό διάστημα [0, 1]:</p>
                  <ul className="list-disc list-inside space-y-0.5 pl-2 text-xs sm:text-sm">
                    <li>Η f είναι συνεχής στο [0, 1] ως πράξεις συνεχών.</li>
                    <li>f(0) = e^0 + 2(0) - 3 = 1 - 3 = -2 &lt; 0.</li>
                    <li>f(1) = e^1 + 2(1) - 3 = e - 1 &gt; 0 (αφού e ≈ 2,718 &gt; 1).</li>
                  </ul>
                  <p className="pt-1">
                    Άρα f(0) &middot; f(1) = (-2)(e - 1) &lt; 0. Σύμφωνα με το Θεώρημα Bolzano, υπάρχει τουλάχιστον ένα x₀ &isin; (0, 1) τέτοιο ώστε f(x₀) = 0. Επειδή η f είναι γνησίως αύξουσα, η ρίζα x₀ είναι αυστηρά μοναδική.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                <strong className="text-slate-900 dark:text-white block font-bold">Γ3. Επίλυση Ανίσωσης (9 Μονάδες):</strong>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Επειδή η f είναι γνησίως αύξουσα στο ℝ, ισχύει η ισοδυναμία: f(α) &gt; f(β) &lt;=&gt; α &gt; β. Επομένως: f(e^x - 1) &gt; f(x) &lt;=&gt; e^x - 1 &gt; x &lt;=&gt; e^x - x - 1 &gt; 0.
                  Από τη γνωστή ανισότητα e^x ≥ x + 1 (με ισότητα μόνο για x = 0), η διαφορά e^x - x - 1 είναι πάντοτε θετική για κάθε x ≠ 0. Συνεπώς, η ανίσωση αληθεύει για κάθε x ∈ ℝ*.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Συχνές Ερωτήσεις για τις Πανελλαδικές
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Χρήσιμες διευκρινίσεις για τη διεξαγωγή των εξετάσεων και τον υπολογισμό των μορίων.
            </p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {panelladikesFaqs.map((faq, i) => (
              <div key={i} className="py-4 space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0" />
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
