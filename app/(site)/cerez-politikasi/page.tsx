import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, ShieldAlert, CheckCircle2, Settings, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Matemetrik - Matematik ve Eğitim Portalı',
  description:
    'Matemetrik.com çerez kullanım politikası. Sitemizde kullanılan zorunlu, analitik ve Google AdSense reklam çerezleri hakkında detaylı bilgi ve çerez yönetimi rehberi.',
  alternates: {
    canonical: 'https://www.matemetrik.com/cerez-politikasi',
  },
  openGraph: {
    title: 'Çerez Politikası | Matemetrik',
    description: 'Sitemizde kullanılan çerezler ve tarayıcı ayarlarından çerezleri yönetme rehberi.',
    url: 'https://www.matemetrik.com/cerez-politikasi',
  },
};

export default function CerezPolitikasiPage() {
  return (
    <div className="py-14 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Cookie className="w-3.5 h-3.5" /> Çerez Aydınlatma Metni
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Çerez (Cookie) Politikası
          </h1>
          <p className="text-xs text-slate-500">
            6698 sayılı KVKK ve Elektronik Ticaretin Düzenlenmesi mevzuatına uygun olarak hazırlanmıştır.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Çerez Nedir?</h2>
            <p>
              Çerezler (cookies), bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler web sitelerinin daha verimli çalışmasını, tercihlerin hatırlanmasını ve site sahiplerine anonim analitik veriler sağlanmasını mümkün kılar.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">2. Sitemizde Kullanılan Çerez Türleri</h2>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  A. Kesinlikle Gerekli (Zorunlu) Çerezler
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Web sitemizin güvenli çalışması, sayfa geçişleri ve onay tercihlerinizin hatırlanması için zorunludur. Bu çerezlerin devre dışı bırakılması durumunda sitenin bazı fonksiyonları çalışmayabilir.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  B. Performans ve Analitik Çerezleri
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google Analytics gibi analitik araçlar vasıtasıyla hangi ders çözümlerinin daha çok ziyaret edildiğini, ortalama okunma sürelerini ve ziyaretçi trafiğini anonim (kimliğiniz gizli tutularak) olarak ölçümler.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
                  <Cookie className="w-5 h-5 text-indigo-600" />
                  C. Hedefleme ve Reklam Çerezleri (Google AdSense)
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Google AdSense ve iş ortakları tarafından yerleştirilen reklam çerezleridir. Bu çerezler ilgi alanlarınıza uygun eğitsel içerikler ve reklamlar sunmak, aynı reklamın tekrar tekrar gösterilmesini önlemek ve reklam kampanyalarının etkinliğini ölçmek için kullanılır.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900">3. Çerezleri Nasıl Kontrol Edebilir veya Silebilirsiniz?</h2>
            <p>
              Kullanıcılar diledikleri zaman tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirler. Farklı tarayıcılarda çerez yönetimi için aşağıdaki yönergeleri izleyebilirsiniz:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
              <li>
                <strong>Google Chrome:</strong> Ayarlar &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Diğer Site Verileri.
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Seçenekler &gt; Gizlilik ve Güvenlik &gt; Çerezler ve Site Verileri.
              </li>
              <li>
                <strong>Apple Safari:</strong> Tercihler &gt; Gizlilik &gt; Tüm Çerezleri Engelle / Web Sitesi Verilerini Yönet.
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Ayarlar &gt; Çerezler ve Site İzinleri &gt; Çerezleri Yönet ve Sil.
              </li>
            </ul>
            <p className="text-xs text-slate-600">
              Google reklam kişiselleştirmesini devre dışı bırakmak için doğrudan{' '}
              <a
                href="https://adssettings.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-600 hover:underline inline-flex items-center gap-0.5"
              >
                Google Ads Settings <ExternalLink className="w-3 h-3" />
              </a>{' '}
              bağlantısını kullanabilirsiniz.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">4. İletişim</h2>
            <p className="text-xs text-slate-600">
              Çerez politikamız ile ilgili merak ettiğiniz her türlü detay için{' '}
              <a href="mailto:matemetrik@gmail.com" className="font-bold text-indigo-600 hover:underline">
                matemetrik@gmail.com
              </a>{' '}
              adresi üzerinden veya <Link href="/iletisim" className="text-indigo-600 font-bold hover:underline">İletişim sayfamızdan</Link> bize yazabilirsiniz.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
