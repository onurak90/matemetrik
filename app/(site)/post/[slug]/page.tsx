import React from 'react';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Calendar, Clock, Share2, ArrowLeft,
  BookOpen, CheckCircle, Tag, ChevronRight,
  Sparkles, ExternalLink, AlertCircle, HelpCircle
} from 'lucide-react';
import { getPostBySlug, getRelatedPosts, getPrevNextPosts, incrementViews, getSettings, getBookPageSequence } from '@/lib/db';
import { formatDate, estimateReadingTime } from '@/lib/utils';
import PostCard from '@/components/blog/PostCard';
import CommentSection from '@/components/blog/CommentSection';
import TableOfContents from '@/components/blog/TableOfContents';
import ReadingProgressBar from '@/components/blog/ReadingProgressBar';
import PrevNextNav from '@/components/blog/PrevNextNav';
import InteractiveQuizHandler from '@/components/blog/InteractiveQuizHandler';
import PostCoverImage from '@/components/blog/PostCoverImage';
import BookPageNav from '@/components/blog/BookPageNav';

interface PostPageProps {
  params: { slug: string };
}

export const revalidate = 86400; // 24 hours edge cache for static solution posts

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { post } = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Yazı Bulunamadı | Matemetrik' };
  }

  const canonicalUrl = `https://www.matemetrik.com/post/${post.slug}`;
  const ogImage = post.featured_image
    ? post.featured_image.startsWith('http')
      ? post.featured_image
      : `https://www.matemetrik.com${post.featured_image}`
    : 'https://www.matemetrik.com/og.jpg';

  // Smart CTR Optimization for Google Search Results
  const isBookSolution = post.slug.includes('sayfa') || post.title.toLowerCase().includes('sayfa');
  const isTopicLecture = post.slug.includes('konu-anlatimi') || post.title.toLowerCase().includes('konu anlatımı');

  let title = post.title;
  let description = post.excerpt || `${post.title} hakkında detaylı konu anlatımı ve çözümler.`;

  if (isBookSolution) {
    if (!title.includes('2024') && !title.includes('2025') && !title.includes('2026')) {
      title = `${post.title} (2024-2025 MEB Maarif Modeli Çözümleri)`;
    }
    description = `2024-2025 MEB güncel müfredatına uygun ${post.title}. Sayfadaki tüm alıştırma, sıra sizde ve değerlendirme sorularının adım adım açıklamalı çözümleri.`;
  } else if (isTopicLecture) {
    if (!title.includes('PDF')) {
      title = `${post.title} + PDF Test İndir (2024-2025 MEB)`;
    }
    description = `2024-2025 MEB müfredatına tam uyumlu ${post.title}. Kilit konu özetleri, pekiştirici örnekler, 20 soruluk yeni nesil tarama testi ve ücretsiz PDF test çıktısı.`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: [post.author || 'Cavenaghi'],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { post, isOldSlug } = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // If accessed via old / Turkish / non-standard Wix slug, permanently redirect to canonical clean slug!
  if (isOldSlug && post.slug !== params.slug) {
    permanentRedirect(`/post/${post.slug}`);
  }

  // Increment view counter
  incrementViews(post.id);

  const settings = getSettings();
  const adsEnabled = settings.ads_enabled === '1';

  const relatedPosts = getRelatedPosts(post.category_slug, post.slug, 3);
  const prevNext = getPrevNextPosts(post.id, post.category_slug);
  const readingTime = estimateReadingTime(post.content);
  const wordCount = post.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;

  // Schema.org BlogPosting
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.created_at,
    dateModified: post.updated_at,
    inLanguage: 'tr-TR',
    wordCount: wordCount,
    articleSection: post.category,
    keywords: post.tags && post.tags.length > 0 ? post.tags.join(', ') : undefined,
    author: {
      '@type': 'Person',
      name: post.author || 'Cavenaghi',
      url: 'https://www.matemetrik.com/hakkimizda',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Matemetrik',
      url: 'https://www.matemetrik.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.matemetrik.com/icon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.matemetrik.com/post/${post.slug}`,
    },
    image: post.featured_image || 'https://www.matemetrik.com/og.jpg',
  };

  // Breadcrumbs Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Ana Sayfa',
        item: 'https://www.matemetrik.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.category,
        item: `https://www.matemetrik.com/kategori/${post.category_slug}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://www.matemetrik.com/post/${post.slug}`,
      },
    ],
  };

  // Book Page Sequence (Prev, Next, Book Hub, and quick page switcher)
  const bookSequence = getBookPageSequence(post.slug, post.category_slug);

  // Dynamic FAQ Schema (Google SERP Rich Snippets with Accordions)
  const isBookSolution = post.slug.includes('sayfa') || post.title.toLowerCase().includes('sayfa');
  const isTopicLecture = post.slug.includes('konu-anlatimi') || post.title.toLowerCase().includes('konu anlatımı');

  const faqItems = isBookSolution
    ? [
        {
          q: `${post.title} 2024-2025 MEB güncel müfredatına uygun mudur?`,
          a: `Evet, bu sayfadaki tüm soru, etkinlik ve alıştırma çözümleri Millî Eğitim Bakanlığı (MEB) güncel ders kitabı ve Türkiye Yüzyılı Maarif Modeli kazanımlarına tam uyumludur.`,
        },
        {
          q: `Bu kitaptaki diğer sayfaların çözümlerine nasıl ulaşabilirim?`,
          a: `Sayfadaki 'Önceki Sayfa', 'Sonraki Sayfa' butonları ve 'Ders Kitabı Fihristi' bağlantısı üzerinden kitabın tüm sayfalarına ücretsiz erişebilirsiniz.`,
        },
        {
          q: `Sayfadaki alıştırma ve sıra sizde sorularının adımları açıklandı mı?`,
          a: `Evet, soruların tamamı öğrencilerin işlem basamaklarını ve mantığını kavraması için adım adım detaylı işlem aşamalarıyla çözülmüştür.`,
        },
      ]
    : isTopicLecture
    ? [
        {
          q: `${post.title} okul yazılıları ve merkezi sınavlar için yeterli mi?`,
          a: `Evet, konu anlatımımız MEB müfredatı ve kazanımları temel alınarak hazırlanmış olup hem okul yazılı sınavlarına hem de LGS ve YKS hazırlık süreçlerine eksiksiz destek sağlar.`,
        },
        {
          q: `Konunun 20 soruluk testini ve cevaplarını PDF olarak indirebilir miyim?`,
          a: `Evet, sayfanın altındaki 'PDF Test Olarak İndir / Yazdır' butonuna tıklayarak testi çözümlü olarak A4 formatında çıktısını alabilir veya bilgisayarınıza indirebilirsiniz.`,
        },
        {
          q: `Testteki soruların doğru seçenekleri ve çözümleri var mı?`,
          a: `Evet, 20 sorunun tamamı alanında uzman öğretmenler tarafından hazırlanmış ayrıntılı işlem basamakları ve doğru seçenek analizleriyle sunulmaktadır.`,
        },
      ]
    : [
        {
          q: `${post.title} içeriği kimler için uygundur?`,
          a: `Bu içerik MEB müfredatına paralel olarak öğrenciler, öğretmenler ve veliler için rehber niteliğinde hazırlanmıştır.`,
        },
      ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="py-10 pb-24">
      {/* Scroll Reading Progress Bar */}
      <ReadingProgressBar />
      {/* Interactive Quiz Option Highlights */}
      <InteractiveQuizHandler />

      {/* Schema.org scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link
            href={`/kategori/${post.category_slug}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {post.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-800 font-medium truncate max-w-[260px] sm:max-w-md">
            {post.title}
          </span>
        </nav>

        {/* Post Header */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/kategori/${post.category_slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              {post.category}
            </Link>

            <span className="text-xs text-slate-400">&bull;</span>

            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readingTime} okuma
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Author & Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                C
              </div>
              <div>
                <div className="font-bold text-slate-900">{post.author || 'Cavenaghi'}</div>
                <div className="text-[11px] text-slate-400">
                  {formatDate(post.created_at)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formatDate(post.created_at)}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image with Automatic Fallback */}
        <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 aspect-[16/9] bg-slate-900 relative">
          <PostCoverImage
            src={post.featured_image}
            alt={post.title}
            title={post.title}
            category={post.category}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Book Page Sequence Navigation (Top) */}
        <BookPageNav
          sequence={bookSequence}
          position="top"
          categorySlug={post.category_slug}
          categoryName={post.category}
        />

        {/* Post Rich Content */}
        <article className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm">
          {/* Smart Table of Contents (SERP Jump-Links) */}
          <TableOfContents />

          <div
            className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 prose-p:leading-relaxed prose-p:text-slate-700 prose-img:rounded-2xl prose-img:shadow-md prose-img:mx-auto prose-table:border prose-table:border-slate-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* In-Article Ad Slot */}
          {adsEnabled && settings.ad_in_article_code && (
            <div className="my-8 py-4 border-y border-slate-100 text-center">
              <div
                id="ad-in-article-container"
                dangerouslySetInnerHTML={{ __html: settings.ad_in_article_code }}
              />
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-8 mt-8 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-600" /> İlgili Etiketler:
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/?q=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 rounded-lg transition-colors font-medium border border-slate-200/60"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Book Page Sequence Navigation (Bottom) */}
        <BookPageNav
          sequence={bookSequence}
          position="bottom"
          categorySlug={post.category_slug}
          categoryName={post.category}
        />

        {/* Yazar Bilgisi (E-E-A-T) */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0 shadow-md">
            C
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-bold text-slate-900 text-sm">
                {post.author || 'Cavenaghi'}
              </h4>
              <span className="text-[11px] text-indigo-600 font-semibold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 self-center sm:self-auto">
                Matematik Eğitimcisi &amp; İçerik Editörü
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Milli Eğitim Bakanlığı (MEB) müfredatına uygun matematik ders kitabı çözümleri, pedagojik rehberlik ve yeni nesil soru kalıpları üzerine içerikler üretmektedir.
            </p>
          </div>
        </div>

        {/* MEB Sorumluluk Reddi (Telif & Güvenilirlik) */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <strong>Yasal Uyarı &amp; Sorumluluk Reddi:</strong> Bu sayfada yer alan çözümler ve konu anlatımları öğrencilerin ev ödevlerini kontrol etmeleri ve öğrenme süreçlerini pekiştirmeleri amacıyla hazırlanmıştır. Matemetrik bağımsız bir eğitim platformudur; Millî Eğitim Bakanlığı ile doğrudan resmi bir bağı bulunmamaktadır.
          </div>
        </div>

        {/* Social Share & Back */}
        <div className="p-6 bg-slate-100/70 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-700 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-indigo-600" />
            Bu faydalı içeriği arkadaşlarınızla paylaşın!
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${post.title} - https://www.matemetrik.com/post/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-[#25D366] text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://www.matemetrik.com/post/${post.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-black text-white rounded-xl text-xs font-bold hover:opacity-90 transition-opacity"
            >
              X / Twitter
            </a>
            <Link
              href={`/kategori/${post.category_slug}`}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
            >
              {post.category} Yazıları &rarr;
            </Link>
          </div>
        </div>

        {/* Previous & Next Post Navigation (Internal SEO Silo) */}
        <PrevNextNav prev={prevNext.prev} next={prevNext.next} />

        {/* Yazı Sonu / Benzer Yazılar Öncesi Reklam Slotu */}
        {adsEnabled && settings.ad_sidebar_code && (
          <div className="my-4 py-4 text-center border-y border-slate-200">
            <div
              id="ad-bottom-container"
              dangerouslySetInnerHTML={{ __html: settings.ad_sidebar_code }}
            />
          </div>
        )}

        {/* Sıkça Sorulan Sorular (Google SERP FAQ Accordion) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 font-extrabold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Merak Edilenler &amp; Sıkça Sorulan Sorular</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            {post.title} Hakkında Sık Sorulanlar
          </h3>
          <div className="divide-y divide-slate-100">
            {faqItems.map((faq, idx) => (
              <details key={idx} className="py-3.5 group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-xs sm:text-sm hover:text-indigo-600 transition-colors">
                  <span>{faq.q}</span>
                  <span className="ml-3 shrink-0 text-slate-400 group-open:rotate-180 transition-transform font-bold text-sm">
                    &darr;
                  </span>
                </summary>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed pl-2 border-l-2 border-indigo-200">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Comment Section with Gmail Connect */}
        <CommentSection postId={post.id} postTitle={post.title} />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="pt-10 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              İlginizi Çekebilecek Benzer İçerikler
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <PostCard key={rel.id} post={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
