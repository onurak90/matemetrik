import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar, Users, Sparkles, FileText, Calculator, GraduationCap,
  ArrowRight, CheckCircle2, Award, Zap, Download, ShieldCheck,
  Search, BookOpen, Clock, HeartHandshake, Layers
} from 'lucide-react';

export const metadata: Metadata = {
  title: '2026-2027 MEB Öğretmen Araçları | Yıllık Plan, Sınav Hazırlama, Karne Görüşü - Matemetrik',
  description:
    'Öğretmenler için geliştirilmiş 2026-2027 Maarif Modeli uyumlu ücretsiz dijital eğitim araçları: Yıllık Plan Hazırlama, Kulüp Toplantı Tutanakları, Yapay Zeka Karne Görüşü, Sınav Hazırlama Robotu ve LGS/YKS Puan Hesaplama.',
  keywords: [
    'öğretmen araçları',
    'meb öğretmen araçları',
    'yıllık plan hazırlama 2026',
    'maarif modeli yıllık plan',
    'kulüp toplantı tutanakları',
    'sosyal kulüp evrakları meb',
    'karne görüşü üreticisi',
    'sınav hazırlama robotu',
    'yazılı kağıdı hazırlama robotu',
    'öğretmen ders planı',
    'rehberlik araçları',
    'lgs puan hesaplama öğretmen',
    'yks puan hesaplama öğretmen',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/ogretmen-araclari',
  },
  openGraph: {
    title: 'MEB Uyumlu Öğretmen Araçları Merkezi | Matemetrik',
    description:
      'Yıllık planlardan sınav hazırlama robotuna, 38 kulüp tutanağından yapay zeka karne görüşlerine kadar tüm öğretmen araçları tek çatı altında.',
    url: 'https://www.matemetrik.com/ogretmen-araclari',
    type: 'website',
    images: [
      {
        url: 'https://www.matemetrik.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Matemetrik Öğretmen Araçları',
      },
    ],
  },
};

interface TeacherToolItem {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  category: 'planlama' | 'evrak' | 'degerlendirme' | 'sinav';
  description: string;
  href: string;
  icon: any;
  color: string;
  gradient: string;
  features: string[];
  ctaText: string;
}

const teacherTools: TeacherToolItem[] = [
  {
    id: 'yillik-plan',
    title: 'Yıllık Plan Hazırlama Robotu',
    badge: '2026-2027 Maarif Modeli',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    category: 'planlama',
    description:
      'Türkiye Yüzyılı Maarif Modeli ile birebir uyumlu, 1-12. sınıf tüm branşlarda haftalık kazanım, değerler eğitimi ve yöntemleri içeren Excel ve PDF formatında tek tıkla indirilebilir yıllık çalışma planları.',
    href: '/yillik-plan-hazirlama',
    icon: Calendar,
    color: 'text-emerald-600',
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent hover:border-emerald-400',
    features: [
      'Resmi MEB iş günü takvimine göre otomatik tatil eşleştirmesi',
      'Maarif Modeli erdem-değer-eylem çerçevesi',
      'Excel (.xlsx) ve A4 yatay PDF çıktısı',
      'Zümre ve okul idaresi onay formatı',
    ],
    ctaText: 'Yıllık Plan Oluştur',
  },
  {
    id: 'kulup-tutanak',
    title: 'Sosyal Kulüp Toplantı Tutanakları',
    badge: '38 Kulüp Mevcut',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    category: 'evrak',
    description:
      'MEB Sosyal Etkinlikler Yönetmeliği gereğince ilkokul, ortaokul ve liselerde kurulan 38 farklı öğrenci kulübü için tüzük, yıllık çalışma planı ve 1./2. dönem toplantı tutanakları.',
    href: '/kulup-toplanti-tutanaklari',
    icon: Users,
    color: 'text-indigo-600',
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent hover:border-indigo-400',
    features: [
      '38 resmi kulüp tüzüğü ve yıllık çalışma planı',
      'Gündem maddeleri hazır 1. ve 2. dönem kurul tutanakları',
      'Belirli gün ve haftalar etkinlik dağılım tablosu',
      'Word ve PDF formatında hazır evrak arşivi',
    ],
    ctaText: 'Kulüp Evraklarını İndir',
  },
  {
    id: 'karne-gorusu',
    title: 'Yapay Zeka Karne Görüşü Üreticisi',
    badge: 'Pedagojik & Özelleştirilebilir',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    category: 'degerlendirme',
    description:
      'Öğrencilerinizin akademik başarısı, sınıf içi katılımı, kitap okuma alışkanlığı ve sosyal gelişimine göre pedagojik ilkelerle yazılmış yüzlerce özgün karne görüşü metni.',
    href: '/karne-gorusu-ureticisi',
    icon: Sparkles,
    color: 'text-purple-600',
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent hover:border-purple-400',
    features: [
      'Üstün başarılı, gayretli, çekingen ve geliştirilmeli kategorileri',
      'İlkokul, ortaokul ve lise düzeyine uygun üslup',
      'E-okul karakter sınırına tam uyumlu metinler',
      'Tek tıkla kopyalama ve sınıf listesine toplu uyarlama',
    ],
    ctaText: 'Karne Görüşü Üret',
  },
  {
    id: 'sinav-hazirlama',
    title: 'MEB Sınav Hazırlama Robotu',
    badge: 'Ortak Yazılı & Test Formatı',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    category: 'sinav',
    description:
      'MEB Ölçme, Değerlendirme ve Sınav Hizmetleri standartlarında açık uçlu senaryo soruları veya çoktan seçmeli test kağıtları oluşturun. Başlık, puan tablosu ve optik alan hazır A4 çıktısı alın.',
    href: '/sinav-hazirlama-robotu',
    icon: FileText,
    color: 'text-amber-600',
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent hover:border-amber-400',
    features: [
      'MEB ortak sınav senaryolarına tam uyumlu şablon',
      'Okul adı, ders, sınıf ve puan baremi başlık formatı',
      'A ve B kitapçığı oluşturabilme desteği',
      'Yazıcıya hazır tertemiz PDF çıktısı (taşma yapmaz)',
    ],
    ctaText: 'Yazılı Kağıdı Oluştur',
  },
  {
    id: 'puan-hesaplama',
    title: 'LGS & YKS Puan ve Tercih Robotu',
    badge: '2026-2027 MEB & ÖSYM',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    category: 'degerlendirme',
    description:
      'Rehberlik servisleri ve branş öğretmenleri için öğrenci net analiz aracı. LGS ve YKS (TYT, AYT, YDT) netlerini girin; OBP katkısı ve tahmini başarı sırasıyla anında karne çıkarın.',
    href: '/puan-hesaplama-robotu',
    icon: Calculator,
    color: 'text-rose-600',
    gradient: 'from-rose-500/10 via-red-500/5 to-transparent hover:border-rose-400',
    features: [
      'LGS 3 yanlış 1 doğru, YKS 4 yanlış 1 doğru kuralı',
      'Diploma notu, normal OBP ve kırık OBP hesaplaması',
      'ÖSYM güncel standart sapmalı net katsayıları',
      'Web sitesine eklenebilir iframe kod desteği',
    ],
    ctaText: 'Puan Hesaplama Robotu',
  },
];

const faqs = [
  {
    question: 'Matemetrik Öğretmen Araçları tamamen ücretsiz mi?',
    answer:
      'Evet. Matemetrik bünyesindeki Yıllık Plan Hazırlama, Sınav Robotu, Karne Görüşleri ve Kulüp Tutanakları tüm öğretmenlerimize, zümre başkanlarına ve idarecilere %100 ücretsiz olarak sunulmaktadır. Herhangi bir üyelik veya abonelik şartı bulunmaz.',
  },
  {
    question: 'Yıllık planlar 2026-2027 Türkiye Yüzyılı Maarif Modeli ile uyumlu mu?',
    answer:
      'Kesinlikle. Hazırlanan planlar Talim ve Terbiye Kurulu Başkanlığı tarafından yayımlanan güncel haftalık ders çizelgelerine, ortak sınav haftalarına ve Maarif Modeli beceri-değer-okuryazarlık temelli öğrenme çıktılarına tam uyumludur.',
  },
  {
    question: 'Hazırlanan sınav ve planları nasıl bilgisayarıma indirebilirim?',
    answer:
      'Her aracın içerisinde bulunan "Excel İndir" (.xlsx) veya "PDF İndir" butonuna tıklayarak doğrudan yazıcıya hazır A4 formatında çıktınızı alabilir, okul idaresine imza için sunabilirsiniz.',
  },
  {
    question: 'E-Okul için karne görüşlerini nasıl kullanabilirim?',
    answer:
      'Karne görüşü aracında öğrencinizin düzeyini seçtikten sonra beğendiğiniz metnin yanındaki "Kopyala" butonuna tıklayarak E-Okul Hızlı Karne Girişi ekranındaki ilgili alana doğrudan yapıştırabilirsiniz.',
  },
];

export default function OgretmenAraclariPage() {
  const jsonLdCollection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MEB Uyumlu Öğretmen Araçları ve Dijital Asistan',
    description:
      '2026-2027 eğitim yılı için yıllık planlar, sınav hazırlama, kulüp tutanakları ve karne görüşleri.',
    url: 'https://www.matemetrik.com/ogretmen-araclari',
    publisher: {
      '@type': 'Organization',
      name: 'Matemetrik',
      url: 'https://www.matemetrik.com',
    },
  };

  const jsonLdFaq = {
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="min-h-screen bg-slate-50/50 pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.25),transparent_50%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>2026-2027 MEB & Maarif Modeli Dijital Öğretmen Odası</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                Öğretmen Araçları ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">Dijital Asistan</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Bürokratik evrak yükünü dakikalara indirin. Yıllık planlardan ortak sınav kağıtlarına, 38 sosyal kulüp tutanaklarından yapay zeka karne görüşlerine kadar tüm ihtiyaçlarınız için ücretsiz araçlar.
              </p>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                  <div className="text-[11px] text-slate-300 font-medium">Maarif Modeli Uyumlu</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-2xl sm:text-3xl font-black text-indigo-400">38</div>
                  <div className="text-[11px] text-slate-300 font-medium">Resmi Öğrenci Kulübü</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-2xl sm:text-3xl font-black text-purple-400">PDF & XLS</div>
                  <div className="text-[11px] text-slate-300 font-medium">Doğrudan İndirme</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                  <div className="text-2xl sm:text-3xl font-black text-amber-400">Ücretsiz</div>
                  <div className="text-[11px] text-slate-300 font-medium">Kayıtsız Kullanım</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Showcase Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teacherTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className={`bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group bg-gradient-to-br ${tool.gradient}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-white flex items-center justify-center shadow-sm transition-colors">
                        <Icon className={`w-6 h-6 ${tool.color}`} />
                      </div>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${tool.badgeColor}`}>
                        {tool.badge}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {tool.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                        {tool.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2 pt-2 border-t border-slate-100">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-4">
                    <Link
                      href={tool.href}
                      className="w-full py-3 px-4 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group-hover:gap-3"
                    >
                      <span>{tool.ctaText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sub-Banner: Puan Hesaplama & Sınav Robotları Hızlı Geçiş */}
          <div className="mt-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
                <Award className="w-3.5 h-3.5" /> Sınav & Rehberlik Robotları
              </div>
              <h3 className="text-2xl font-black">LGS ve YKS Puan Hesaplama Sayfaları</h3>
              <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
                Öğrencilerinizin deneme sınavı sonuçlarını 2026 katsayıları, OBP katkısı ve yüzdelik dilimleriyle ayrıntılı olarak hesaplayın.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/yks-puan-hesaplama-robotu"
                className="px-4 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                📊 YKS Puan Robotu
              </Link>
              <Link
                href="/lgs-puan-hesaplama-robotu"
                className="px-4 py-2.5 bg-indigo-950 hover:bg-indigo-900 text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5"
              >
                🎯 LGS Puan Robotu
              </Link>
            </div>
          </div>

          {/* Educational Content & Guidelines */}
          <section className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-2">
                <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                <span>Pedagojik Rehber</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                Türkiye Yüzyılı Maarif Modeli ve Öğretmen Evrakları
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Yeni müfredat ile birlikte öğretmenlerimizin hazırlaması gereken yıllık çerçeve planlar, zümre toplantı tutanakları ve sınav ölçekleri köklü bir değişimden geçti. Matemetrik olarak bu dönüşümde öğretmenlerimizin yanında yer alıyor, mevzuata ve Talim Terbiye Kurulu yönergelerine uygun araçları ücretsiz sunuyoruz.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Haftalık İş Günü Senkronizasyonu</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  MEB resmi çalışma takviminde ilan edilen 1. dönem, 2. dönem, ara tatiller ve resmi bayramlar plana otomatik yansıtılır.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Ortak Sınav Senaryoları</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  İl ve okul genelinde yapılan ortak yazılı sınavlar için yayımlanan konu-soru dağılım tablolarına tam uygunluk.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Kulüp ve Sosyal Etkinlikler</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Öğrencilerin sosyal sorumluluk, bilim, sanat ve spor alanındaki gelişimlerini takip eden 38 kulübün resmi onaylı dosyaları.
                </p>
              </div>
            </div>

            {/* FAQs */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <h3 className="text-xl font-black text-slate-900">Sıkça Sorulan Sorular</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1.5">
                    <h5 className="font-bold text-slate-900 text-sm">{faq.question}</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
