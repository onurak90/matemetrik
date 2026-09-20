import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Cookie, Info, ExternalLink, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gizlilik ve Çerez Politikası (KVKK & AdSense Uyumlu) | Matemetrik',
  description:
    'Matemetrik.com gizlilik politikası, kişisel verilerin korunması (KVKK), Google AdSense çerezleri ve veri güvenliği ilkelerimiz hakkında detaylı bilgilendirme.',
  alternates: {
    canonical: 'https://www.matemetrik.com/gizlilik-politikasi',
  },
  openGraph: {
    title: 'Gizlilik Politikası | Matemetrik',
    description: 'Kişisel verilerinizin korunması ve Google AdSense çerez ilkeleri.',
    url: 'https://www.matemetrik.com/gizlilik-politikasi',
  },
};

export default function GizlilikPolitikasiPage() {
  const lastUpdated = '20 Eylül 2026';

  return (
    <div className="py-14 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <ShieldCheck className="w-3.5 h-3.5" /> Yasal &amp; Güvenlik
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Gizlilik Politikası ve Kişisel Verilerin Korunması
          </h1>
          <p className="text-xs text-slate-500">
            Son Güncelleme: <span className="font-semibold text-slate-700">{lastUpdated}</span> &bull; 6698 Sayılı KVKK ve Google AdSense Yayıncı Politikalarına Uygundur.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-indigo-600" />
              1. Giriş ve Veri Sorumlusu
            </h2>
            <p>
              <strong>Matemetrik.com</strong> (&quot;Platform&quot;, &quot;Biz&quot;), 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) ve ilgili mevzuat uyarınca &quot;Veri Sorumlusu&quot; sıfatıyla ziyaretçilerimizin kişisel verilerinin gizliliğini ve güvenliğini en üst düzeyde korumayı ilke edinmiştir.
            </p>
            <p>
              Bu Gizlilik Politikası, sitemizi ziyaret ettiğinizde toplanan verilerin niteliğini, işlenme amaçlarını, çerez kullanımını ve yasal haklarınızı açıklamaktadır.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-indigo-600" />
              2. Google AdSense ve Reklam Çerezleri (Önemli Bildirim)
            </h2>
            <p>
              Platformumuzda üçüncü taraf reklam sağlayıcısı olarak <strong>Google Inc. (Google AdSense)</strong> kullanılmaktadır. Google AdSense yayıncı politikaları ve AB Kullanıcı Rızası ilkeleri uyarınca aşağıdaki hususları dikkatinize sunarız:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
              <li>
                <strong>Üçüncü Taraf Satıcı Çerezleri:</strong> Google dahil olmak üzere üçüncü taraf satıcılar, kullanıcının sitemize veya internetteki diğer web sitelerine yaptığı önceki ziyaretlere dayalı olarak reklam yayınlamak için çerezleri (cookies) kullanır.
              </li>
              <li>
                <strong>DoubleClick DART Çerezi:</strong> Google&apos;ın reklam çerezlerini kullanması, Google ve iş ortaklarının kullanıcılarımıza sitenize ve/veya internetteki diğer sitelere yaptıkları ziyaretlere dayalı olarak kişiselleştirilmiş reklamlar sunmasını sağlar.
              </li>
              <li>
                <strong>Kişiselleştirilmiş Reklamları Devre Dışı Bırakma:</strong> Ziyaretçilerimiz diledikleri zaman kişiselleştirilmiş reklamcılık için DART çerezi kullanımını{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                >
                  Google Reklam Ayarları (Ads Settings) <ExternalLink className="w-3 h-3" />
                </a>{' '}
                sayfasını ziyaret ederek devre dışı bırakabilirler.
              </li>
              <li>
                Ayrıca üçüncü taraf bir sağlayıcının kişiselleştirilmiş reklamcılık için çerezleri kullanmasını engellemek isteyen kullanıcılar{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-indigo-600 hover:underline inline-flex items-center gap-0.5"
                >
                  www.aboutads.info <ExternalLink className="w-3 h-3" />
                </a>{' '}
                adresini ziyaret edebilirler.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-indigo-600" />
              3. Çerezler (Cookies) ve Çerez Yönetimi
            </h2>
            <p>
              Çerezler, web sitemizi ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza kaydedilen küçük metin dosyalarıdır. Sitemizde şu tür çerezler kullanılmaktadır:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Zorunlu Çerezler</strong>
                <p className="text-slate-600">Sitenin temel işlevlerini (güvenlik, sayfa geçişleri, form oturumları) yerine getirebilmesi için teknik olarak gereklidir.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Analitik Çerezler</strong>
                <p className="text-slate-600">Google Analytics aracılığıyla hangi sayfaların daha çok okunduğunu anonim olarak ölçümlemek amacıyla kullanılır.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Pazarlama &amp; Reklam</strong>
                <p className="text-slate-600">Google AdSense gibi reklam ağlarının size ilgi alanlarınıza uygun eğitici içerik ve tanıtımlar sunmasını sağlar.</p>
              </div>
            </div>
            <p className="pt-2">
              Detaylı bilgi için ayrıca <Link href="/cerez-politikasi" className="text-indigo-600 font-bold hover:underline">Çerez Politikamızı</Link> inceleyebilirsiniz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-600" />
              4. Öğretmen Araçları ve Veri Güvenliği
            </h2>
            <p>
              Matemetrik platformunda yer alan <strong>Karne Görüşü Üreticisi</strong> ve <strong>Sınav Hazırlama Robotu</strong> araçlarında girilen öğrenci adları, notlar veya ders değerlendirmeleri tamamen kullanıcının kendi tarayıcısında (Local Client-Side) anlık olarak işlenir. Bu veriler kesinlikle sunucularımıza kaydedilmez, depolanmaz veya üçüncü şahıslarla paylaşılmaz.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">
              5. 6698 Sayılı KVKK Kapsamındaki Haklarınız
            </h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca veri sahipleri; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacına uygun kullanılıp kullanılmadığını öğrenme ve verilerin silinmesini veya düzeltilmesini talep etme hakkına sahiptir.
            </p>
            <p>
              Haklarınızı kullanmak için resmi e-posta adresimiz üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              6. İletişim ve Veri Sorumlusu Bildirimi
            </h2>
            <p>
              Gizlilik politikamız veya kişisel verilerinizin işlenmesi ile ilgili her türlü soru, itiraz ve başvuru için:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <p><strong>Platform:</strong> Matemetrik.com</p>
              <p><strong>İletişim E-Posta:</strong> <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a></p>
              <p><strong>Resmi İletişim Sayfası:</strong> <Link href="/iletisim" className="text-indigo-600 font-bold hover:underline">matemetrik.com/iletisim</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
