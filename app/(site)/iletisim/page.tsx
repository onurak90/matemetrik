import React from 'react';
import type { Metadata } from 'next';
import { Mail, Send, ShieldCheck, Sparkles } from 'lucide-react';
import ContactEmailBox from '@/components/common/ContactEmailBox';

export const metadata: Metadata = {
  title: 'İletişim | Matemetrik - Matematik ve Eğitim Portalı',
  description:
    'Matemetrik ekibiyle iletişime geçin. Matematik ders kitabı çözümleri, soru ve önerileriniz veya telif hakları için matemetrikcom@gmail.com adresinden bize ulaşabilirsiniz.',
  alternates: {
    canonical: 'https://www.matemetrik.com/iletisim',
  },
  openGraph: {
    title: 'İletişim | Matemetrik - Matematik ve Eğitim Portalı',
    description: 'Öneri, soru ve görüşleriniz için doğrudan e-posta ile bize ulaşın.',
    url: 'https://www.matemetrik.com/iletisim',
    type: 'website',
  },
};

export default function IletisimPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'İletişim - Matemetrik',
    url: 'https://www.matemetrik.com/iletisim',
    description: 'Matemetrik eğitim portalı resmi iletişim sayfası.',
    mainEntity: {
      '@type': 'EducationalOrganization',
      name: 'Matemetrik',
      email: 'matemetrikcom@gmail.com',
      url: 'https://www.matemetrik.com',
    },
  };

  return (
    <div className="py-16 pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Mail className="w-3.5 h-3.5" /> Bize Ulaşın
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            İletişim
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Görüş, öneri, soru veya telif konularındaki tüm talepleriniz için doğrudan resmi e-posta adresimiz üzerinden bize ulaşabilirsiniz.
          </p>
        </div>

        {/* Email Card Component */}
        <ContactEmailBox />

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Hata &amp; Çözüm Bildirimi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ders kitabı çözümlerinde veya makalelerde fark ettiğiniz yazım ya da işlem hatalarını sayfa numarasıyla birlikte iletebilirsiniz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Send className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Öğretmen Araçları Önerileri</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Karne Görüşü Üreticisi ve Sınav Hazırlama Robotu için aklınıza gelen yeni fikir ve şablon önerilerini bizimle paylaşabilirsiniz.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Telif &amp; Yasal Talepler</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              5651 sayılı kanun gereği &apos;Uyar-Kaldır&apos; prensibini benimsiyoruz. Telif hakkı içeren herhangi bir materyal 24 saat içinde yayından kaldırılır.
            </p>
          </div>
        </div>

        {/* Response Guarantee Notice */}
        <div className="p-6 rounded-3xl bg-slate-100/80 border border-slate-200 text-center space-y-2">
          <p className="text-xs font-semibold text-slate-700">
            🕒 E-postalarınız editör ekibimiz tarafından titizlikle incelenir ve en geç <strong>24-48 saat</strong> içerisinde yanıtlanır.
          </p>
          <p className="text-[11px] text-slate-500">
            Resmi E-Posta: <span className="font-mono text-indigo-600 font-bold">matemetrikcom@gmail.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
