import React from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle2, ShieldCheck, RefreshCw, FileText, ChevronRight, Award, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Yayın İlkeleri & Pedagojik Standartlar | Matemetrik',
  description: 'Matemetrik.com içerik üretim ilkeleri, pedagojik doğrulama süreçleri, kaynakça standartları ve düzeltme politikası.',
  alternates: {
    canonical: 'https://www.matemetrik.com/yayin-ilkeleri',
  },
};

export default function YayinİlkeleriPage() {
  return (
    <div className="py-12 pb-24 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Yayın İlkeleri</span>
        </nav>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <BookOpen className="w-3.5 h-3.5" /> Pedagojik Kalite Güvencesi
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Yayın İlkeleri ve Standartlarımız
          </h1>
          <p className="text-indigo-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Matemetrik; öğrencilere, velilere ve eğitimcilere en doğru, güvenilir ve pedagojik olarak incelenmiş matematik çözümlerini sunmayı taahhüt eder.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              1. Özgünlük ve Kavramsal Çözüm İlkesi
            </h2>
            <p>
              Matemetrik platformunda yayınlanan hiçbir ders kitabı çözümü sadece kuru bir cevap anahtarından (A, B, C veya sadece nihai sayı) ibaret değildir. Temel yayın politikamız; öğrencinin formülleri ezberlemek yerine, <strong>sorunun hangi matematiksel mantık ve modelleme ile çözüldüğünü</strong> adım adım kavramasını sağlamaktır.
            </p>
            <p>
              Tüm çözümler, Türkiye Yüzyılı Maarif Modeli ve MEB Talim ve Terbiye Kurulu Başkanlığı (TTKB) tarafından yayımlanan güncel ders kazanımları temel alınarak özgün anlatımlarla oluşturulur.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              2. Doğruluk ve Pedagojik Çift Kontrol (Peer-Review)
            </h2>
            <p>
              Sitemize yüklenen her matematik çözümü ve konu anlatımı aşağıdaki çift aşamalı denetim sürecinden geçer:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
              <li>
                <strong>Matematiksel Doğrulama:</strong> İşlem önceliği, formül uygulaması, sadeleştirme ve mantıksal çıkarım adımları matematik zümremiz tarafından incelenir.
              </li>
              <li>
                <strong>Pedagojik Uygunluk:</strong> İçeriğin sınıf düzeyine uygunluğu (örneğin 5. sınıf öğrencisine lise yöntemleriyle çözüm verilmemesi), sade ve anlaşılır bir Türkçe ile yazılması denetlenir.
              </li>
              <li>
                <strong>Grafik ve Geometrik Çizimler:</strong> Geometri sorularında açı, benzerlik ve alan ilişkileri görsel açıklamalar ve ispat yöntemleriyle desteklenir.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-indigo-600" />
              3. Hata Düzeltme ve Güncelleme Şeffaflığı
            </h2>
            <p>
              Eğitimde sıfır hata prensibini benimsemekle birlikte, müfredat değişiklikleri, baskı farklılıkları veya gözden kaçan işlem hataları durumunda hızlı bir düzeltme mekanizması işletilir:
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs sm:text-sm">
              <p>
                <strong>Ziyaretçi Bildirimleri:</strong> Sayfaların altındaki yorum bölümü veya <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a> e-posta adresi üzerinden gelen tüm geri bildirimler 24 saat içinde incelenir.
              </p>
              <p>
                <strong>Anlık Düzeltme:</strong> Tespit edilen hatalar ivedilikle düzeltilir ve içeriğin güncelleme tarihi (updated_at) sisteme işlenerek ziyaretçiler bilgilendirilir.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              4. Telif Haklarına Saygı ve Kaynakça Gösterimi
            </h2>
            <p>
              Matemetrik; 5846 sayılı Fikir ve Sanat Eserleri Kanunu&apos;na (FSEK) harfiyen uyar. Sitemizde bahsi geçen ders kitapları Millî Eğitim Bakanlığı ve ilgili yayın kuruluşlarına aittir. Matemetrik, bu kitapları satmaz, dağıtmaz; yalnızca öğrencilerin eğitim hakkını destekleyen bağımsız bir alıştırma ve pekiştirme rehberi sunar.
            </p>
            <p>
              Ayrıntılı bilgi için lütfen <Link href="/telif-haklari-ve-yasal-uyari" className="text-indigo-600 font-bold hover:underline">Telif Hakları ve Yasal Uyarı</Link> sayfamızı inceleyiniz.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              5. Fırsat Eşitliği ve Ücretsiz Erişim
            </h2>
            <p>
              Matemetrik&apos;in kuruluş misyonu; kaliteli matematik eğitimini ve öğretmen dijital araçlarını Türkiye&apos;nin dört bir yanındaki her öğrenciye ve öğretmene <strong>kesintisiz ve %100 ücretsiz</strong> olarak ulaştırmaktır. Sitemizde hiçbir içerik ücretli abonelik veya ödeme duvarı (paywall) arkasına gizlenmez.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
