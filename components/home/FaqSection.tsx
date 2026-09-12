'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: '1. Matemetrik’teki MEB ders kitabı çözümleri güncel müfredatla uyumlu mu?',
    answer: 'Evet, sitemizdeki tüm ders kitabı sayfa çözümleri, Milli Eğitim Bakanlığı (MEB) tarafından yayınlanan 2024-2025 ve 2025-2026 güncel müfredatına birebir uyumludur. 1. sınıftan 12. sınıfa kadar tüm matematik kitaplarının alıştırmaları, sıra sizde soruları ve ünite değerlendirme testleri adım adım çözümlenmektedir.',
  },
  {
    question: '2. Akıllı Karne Görüşü Robotu e-Okul sistemine uygun mudur?',
    answer: 'Kesinlikle. Karne Görüşü Robotumuz, MEB e-Okul karakter sınırlarına %100 uyumlu olarak tasarlanmıştır. Öğrencinin sınıf seviyesini, ders katılımını, sorumluluk ve sosyal becerilerini seçtiğinizde akıllı bağlaç motorumuz imla kurallarına uygun, pedagojik ve zengin paragraflar üretir.',
  },
  {
    question: '3. Sınav Hazırlama Robotu ile MEB formatında nasıl yazılı kağıdı çıkarılır?',
    answer: 'Öğretmenlerimiz soru metinlerini girerek veya bilgisayardan/telefondan soru fotoğraflarını yükleyerek tek tıkla resmi MEB çift sütunlu veya tek sütunlu yazılı kağıdı oluşturabilir. Üst kısımda resmi MEB anteti, okul adı, öğrenci puanlama tablosu ve çözüm alanları otomatik yerleştirilip yazdırılabilir veya PDF olarak kaydedilebilir.',
  },
  {
    question: '4. Matemetrik platformundaki ders notları ve araçlar ücretli midir?',
    answer: 'Hayır, Matemetrik.com üzerindeki tüm blog yazıları, MEB ders kitabı cevapları, karne görüşü üreticisi ve sınav robotu öğrencilerimiz ve öğretmenlerimiz için tamamen ücretsizdir. Misyonumuz herkes için kaliteli ve erişilebilir matematik eğitimidir.',
  },
  {
    question: '5. YKS ve LGS hazırlık için hangi kaynak ve rehberlik içerikleri bulunmaktadır?',
    answer: 'Platformumuzda güncel TYT-AYT matematik konu dağılımları, soru analizleri, derece yapan öğrencilerin çalışma planları, sınav anında odaklanma teknikleri ve ders çalışma takvimleri düzenli olarak uzman eğitimcilerimiz tarafından hazırlanıp paylaşılmaktadır.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  // Schema.org FAQPage structured data
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
          <HelpCircle className="w-3.5 h-3.5" /> Sıkça Sorulan Sorular (SSS)
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Merak Edilenler ve Yanıtlar
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Matemetrik platformu, MEB çözümleri ve öğretmen araçlarımız hakkında en çok sorulan sorular.
        </p>
      </div>

      <div className="max-w-3xl mx-auto divide-y divide-slate-200">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-4 sm:py-5">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left flex items-center justify-between gap-4 group"
              >
                <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-indigo-600' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pt-3 pr-4 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
