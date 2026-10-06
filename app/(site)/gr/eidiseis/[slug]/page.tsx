import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Clock, ArrowLeft, ExternalLink, Share2, BookOpen } from 'lucide-react';
import { getGreekNewsBySlug, getGreekNews } from '@/lib/greekNews';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getGreekNewsBySlug(params.slug);
  if (!item) return { title: 'Δεν βρέθηκε | Matemetrik.gr' };

  return {
    title: `${item.title} | Ειδήσεις Παιδείας`,
    description: item.description,
    alternates: {
      canonical: `https://www.matemetrik.com/gr/eidiseis/${item.slug}`,
    },
    openGraph: {
      locale: 'el_GR',
      title: item.title,
      description: item.description,
      images: [item.image_url],
      url: `https://www.matemetrik.com/gr/eidiseis/${item.slug}`,
    },
  };
}

export default async function GreekNewsDetailPage({ params }: Props) {
  const item = getGreekNewsBySlug(params.slug);
  if (!item) notFound();

  const otherNews = (await getGreekNews(4)).filter((n) => n.slug !== item.slug);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: item.title,
    description: item.description,
    image: [item.image_url],
    datePublished: item.pub_date,
    author: {
      '@type': 'Organization',
      name: item.source_site || 'Εκπαιδευτικό Ρεπορτάζ',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Matemetrik.gr',
      url: 'https://www.matemetrik.com/gr',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
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
              <Link href="/gr/eidiseis" className="hover:text-blue-600 transition-colors">
                Ειδήσεις Παιδείας
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-900 dark:text-white font-bold line-clamp-1">
                {item.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Article Container */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full font-bold">
                  {item.category}
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {item.pub_date}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {item.title}
              </h1>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 dark:bg-slate-800">
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content / Excerpt */}
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
              <p className="font-semibold text-slate-900 dark:text-white text-base sm:text-lg">
                {item.description}
              </p>
              <p>
                {item.content}
              </p>
            </div>

            {/* Source Reference & Outbound Link */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="text-slate-500">
                Πηγή δημοσίευσης: <strong>{item.source_site}</strong>
              </div>
              <a
                href={item.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
              >
                <span>Αρχικό Άρθρο στο {item.source_site}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Related News */}
          {otherNews.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Σχετικές Ειδήσεις
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherNews.slice(0, 2).map((other, idx) => (
                  <Link
                    key={idx}
                    href={`/gr/eidiseis/${other.slug}`}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={other.image_url}
                        alt={other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-400 block">{other.pub_date}</span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                        {other.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <Link
              href="/gr/eidiseis"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Επιστροφή σε όλες τις ειδήσεις</span>
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
