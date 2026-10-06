import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Newspaper, ChevronRight, Clock, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { getGreekNews } from '@/lib/greekNews';

export const metadata: Metadata = {
  title: 'Ειδήσεις Παιδείας & Σχολείων | Εκπαιδευτικό Ρεπορτάζ Ελλάδας',
  description:
    'Όλα τα τελευταία νέα για τα σχολεία, τους εκπαιδευτικούς, τις προσλήψεις αναπληρωτών και τις ανακοινώσεις του Υπουργείου Παιδείας στην Ελλάδα. Συνεχής ενημέρωση.',
  keywords: [
    'ειδησεις παιδειας',
    'σχολεια ειδησεις',
    'υπουργειο παιδειας ανακοινωσεις',
    'προσληψεις εκπαιδευτικων',
    'πανελλαδικες νεα',
    'esos gr',
    'alfavita gr',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr/eidiseis',
  },
  openGraph: {
    locale: 'el_GR',
    title: 'Ειδήσεις Παιδείας & Σχολείων | Matemetrik.gr',
    description: 'Συνεχής ενημέρωση για την εκπαίδευση, τα σχολεία και τους εκπαιδευτικούς στην Ελλάδα.',
    url: 'https://www.matemetrik.com/gr/eidiseis',
  },
};

export default async function GreekNewsFeedPage() {
  const newsList = await getGreekNews(20);

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
              Ειδήσεις Παιδείας
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white space-y-4 border border-slate-800 shadow-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Αυτόματη Ανανέωση ανά 2 Ώρες &bull; Έγκυρες Πηγές</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Εκπαιδευτικό Ρεπορτάζ &amp; Ειδήσεις Σχολείων
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
            Έγκυρη και άμεση ενημέρωση για την Πρωτοβάθμια και Δευτεροβάθμια Εκπαίδευση, εγκυκλίους του ΥΠΑΙΘΑ, προσλήψεις αναπληρωτών, Πανελλαδικές Εξετάσεις και τη λειτουργία των σχολικών μονάδων.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((item, idx) => (
            <article
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all"
            >
              <div className="relative aspect-[16/10] bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {item.source_site}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                    <span>{item.pub_date}</span>
                    <span className="text-blue-600 font-bold">{item.category}</span>
                  </div>

                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    href={`/gr/eidiseis/${item.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>Ανάγνωση άρθρου</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Πηγή άρθρου"
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                  >
                    <span>{item.source_site}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
