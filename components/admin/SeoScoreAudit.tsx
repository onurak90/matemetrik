'use client';

import React, { useState } from 'react';
import {
  Sparkles, CheckCircle, AlertTriangle, XCircle,
  ChevronDown, ChevronUp, Search, Info
} from 'lucide-react';

interface SeoScoreAuditProps {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
}

export default function SeoScoreAudit({
  title,
  slug,
  excerpt,
  content,
  featuredImage,
}: SeoScoreAuditProps) {
  const [expanded, setExpanded] = useState(false);

  // 1. Title Audit
  const titleLen = title.trim().length;
  const isTitleGood = titleLen >= 40 && titleLen <= 70;
  const isTitleOk = titleLen >= 25 && titleLen <= 80;

  // 2. Slug Audit
  const cleanSlugRegex = /^[a-z0-9-]+$/;
  const isSlugClean = slug.trim().length > 3 && cleanSlugRegex.test(slug.trim());

  // 3. Excerpt Audit
  const excerptLen = excerpt.trim().length;
  const isExcerptGood = excerptLen >= 110 && excerptLen <= 170;
  const isExcerptOk = excerptLen >= 50 && excerptLen <= 220;

  // 4. Content Word Count
  const plainText = content.replace(/<[^>]+>/g, ' ').trim();
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const isWordCountGood = wordCount >= 300;
  const isWordCountOk = wordCount >= 150;

  // 5. Headings Check
  const hasH2 = /<h2[\s>]/i.test(content);
  const hasH3 = /<h3[\s>]/i.test(content);
  const hasHeadings = hasH2 || hasH3;

  // 6. Image Check
  const hasImage = !!featuredImage || /<img[\s>]/i.test(content);

  // 7. Links Check
  const hasLinks = /<a[\s>]/i.test(content);

  // Calculate Score (Max 100)
  let score = 0;
  if (isTitleGood) score += 20;
  else if (isTitleOk) score += 12;

  if (isSlugClean) score += 15;
  else if (slug.trim().length > 0) score += 8;

  if (isExcerptGood) score += 15;
  else if (isExcerptOk) score += 8;

  if (isWordCountGood) score += 20;
  else if (isWordCountOk) score += 12;
  else if (wordCount > 50) score += 5;

  if (hasHeadings) score += 10;
  if (hasImage) score += 10;
  if (hasLinks) score += 10;

  // Rating color & label
  let scoreColor = 'bg-rose-500 text-rose-700 border-rose-200 bg-rose-50';
  let scoreBadge = 'bg-rose-600 text-white';
  let ratingLabel = 'Zayıf';

  if (score >= 85) {
    scoreColor = 'text-emerald-700 border-emerald-200 bg-emerald-50';
    scoreBadge = 'bg-emerald-600 text-white';
    ratingLabel = 'Mükemmel';
  } else if (score >= 70) {
    scoreColor = 'text-indigo-700 border-indigo-200 bg-indigo-50';
    scoreBadge = 'bg-indigo-600 text-white';
    ratingLabel = 'İyi';
  } else if (score >= 50) {
    scoreColor = 'text-amber-700 border-amber-200 bg-amber-50';
    scoreBadge = 'bg-amber-600 text-white';
    ratingLabel = 'Geliştirilmeli';
  }

  const checklist = [
    {
      label: `Başlık Uzunluğu (${titleLen} karakter)`,
      status: isTitleGood ? 'good' : isTitleOk ? 'ok' : 'bad',
      hint: isTitleGood
        ? 'İdeal uzunlukta (40-70 karakter).'
        : isTitleOk
        ? 'Kabul edilebilir, ancak 40-70 karakter arası Google için en iyisidir.'
        : 'Başlık çok kısa veya çok uzun. İdeal: 40-70 karakter.',
    },
    {
      label: 'Kalıcı Bağlantı (URL Slug)',
      status: isSlugClean ? 'good' : slug.trim().length > 0 ? 'ok' : 'bad',
      hint: isSlugClean
        ? 'Temiz, küçük harfli ve Türkçe karaktersiz.'
        : 'Slug Türkçe karakter veya geçersiz işaretler içeriyor.',
    },
    {
      label: `Meta Açıklaması / Özet (${excerptLen} karakter)`,
      status: isExcerptGood ? 'good' : isExcerptOk ? 'ok' : 'bad',
      hint: isExcerptGood
        ? 'Google arama sonuçları için ideal uzunluk (110-170 karakter).'
        : isExcerptOk
        ? 'Özet mevcut, ancak 120-160 karakter aralığı Google snippet için idealdir.'
        : 'Meta açıklaması boş veya çok kısa. Arama sonuçlarında tıklanma oranını düşürür.',
    },
    {
      label: `İçerik Kelime Sayısı (${wordCount} kelime)`,
      status: isWordCountGood ? 'good' : isWordCountOk ? 'ok' : 'bad',
      hint: isWordCountGood
        ? 'Yeterli ve doyurucu içerik uzunluğu (300+ kelime).'
        : isWordCountOk
        ? '150-300 kelime arası. Google sıralaması için biraz daha detay ekleyebilirsiniz.'
        : 'İçerik 150 kelimeden az. Arama motorları ince içerikleri (thin content) sevmez.',
    },
    {
      label: 'Alt Başlık Kullanımı (H2, H3)',
      status: hasHeadings ? 'good' : 'bad',
      hint: hasHeadings
        ? 'İçerikte H2 veya H3 başlıkları kullanılmış.'
        : 'İçeriğinizi H2 veya H3 başlıkları ile bölümlere ayırmanız SEO açısından önemlidir.',
    },
    {
      label: 'Görsel & Medya Varlığı',
      status: hasImage ? 'good' : 'bad',
      hint: hasImage
        ? 'Öne çıkan görsel veya yazı içi görsel mevcut.'
        : 'Yazıya en az bir görsel veya öne çıkan görsel eklemeniz önerilir.',
    },
    {
      label: 'İçerik İçi Bağlantı (Link)',
      status: hasLinks ? 'good' : 'bad',
      hint: hasLinks
        ? 'İçerikte iç veya dış bağlantı yer alıyor.'
        : 'Sitedeki diğer ilgili derslere veya kaynaklara bağlantı vermek SEO puanını artırır.',
    },
  ];

  return (
    <div className={`rounded-2xl border p-4 sm:p-5 transition-all shadow-sm ${scoreColor}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg shadow-md ${scoreBadge}`}>
            {score}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                SEO ve Arama Motoru Uyumluluk Skoru
              </h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${scoreBadge}`}>
                {ratingLabel}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Google'da 1. sayfa sıralaması ve tıklama oranı optimizasyonu için otomatik analiz
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white text-slate-800 text-xs font-semibold rounded-xl border border-slate-300 shadow-sm transition-colors self-start sm:self-auto"
        >
          {expanded ? 'Kriterleri Gizle' : 'SEO Kriterlerini Gör'}
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/80 rounded-full h-2 mt-4 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            score >= 85 ? 'bg-emerald-500' : score >= 70 ? 'bg-indigo-600' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
          }`}
          style={{ width: `${Math.max(5, score)}%` }}
        />
      </div>

      {/* Expanded Checklist */}
      {expanded && (
        <div className="mt-5 pt-4 border-t border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn">
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-2xs space-y-1 text-xs"
            >
              <div className="flex items-center justify-between font-bold text-slate-800">
                <span>{item.label}</span>
                {item.status === 'good' ? (
                  <span className="text-emerald-600 flex items-center gap-1 text-[11px]">
                    <CheckCircle className="w-3.5 h-3.5" /> Başarılı
                  </span>
                ) : item.status === 'ok' ? (
                  <span className="text-amber-600 flex items-center gap-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" /> Orta
                  </span>
                ) : (
                  <span className="text-rose-600 flex items-center gap-1 text-[11px]">
                    <XCircle className="w-3.5 h-3.5" /> Eksik
                  </span>
                )}
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {item.hint}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
