import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle2, AlertCircle, Mail, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kullanım Şartları ve Yasal Sözleşme | Matemetrik',
  description:
    'Matemetrik.com kullanım koşulları, fikri mülkiyet hakları, MEB içerikleri sorumluluk reddi, öğretmen araçları kullanım ilkeleri ve yasal bildirimler.',
  alternates: {
    canonical: 'https://www.matemetrik.com/kullanim-sartlari',
  },
  openGraph: {
    title: 'Kullanım Şartları | Matemetrik',
    description: 'Matemetrik.com web sitesi kullanım koşulları ve yasal şartlar.',
    url: 'https://www.matemetrik.com/kullanim-sartlari',
  },
};

export default function KullanimSartlariPage() {
  const lastUpdated = '20 Eylül 2026';

  return (
    <div className="py-14 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Kullanım Şartları</span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <FileText className="w-3.5 h-3.5" /> Yasal Sözleşme
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Kullanım Şartları ve Hizmet Koşulları
          </h1>
          <p className="text-xs text-slate-500">
            Yürürlük Tarihi: <span className="font-semibold text-slate-700">{lastUpdated}</span> &bull; Matemetrik.com Platformunu Kullanan Tüm Ziyaretçiler İçin Geçerlidir.
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Kabul Edilme ve Genel Hükümler</h2>
            <p>
              Bu internet sitesine (<strong>www.matemetrik.com</strong>, &quot;Platform&quot;) erişerek, içerikleri inceleyerek, eğitim araçlarımızı kullanarak veya materyal indirerek aşağıda belirtilen kullanım şartlarını, gizlilik ilkelerini ve telif hakları bildirimlerini peşinen ve gayrikabili rücu kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız lütfen siteyi kullanmayınız.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Platformun Amacı ve Sunulan Hizmetler</h2>
            <p>
              Matemetrik; 1. sınıftan 12. sınıfa kadar tüm kademelerde eğitim gören öğrencilere, velilere ve kıymetli öğretmenlere yönelik olarak hazırlanmış bağımsız bir dijital eğitim portalıdır. Sunulan başlıca hizmetler şunlardır:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li><strong>Konu Anlatımları:</strong> 1-12. sınıf matematik, türkçe, fen bilimleri ve diğer branşlar için 2026-2027 MEB Maarif Modeli uyumlu konu özetleri.</li>
              <li><strong>20 Soruluk Tarama Testleri &amp; Çözümleri:</strong> Her konuya özel yeni nesil sorular ve adım adım işlem basamakları.</li>
              <li><strong>MEB Ders Kitabı Çözümleri:</strong> Öğrencilerin ev ödevlerini kontrol etmeleri amacıyla hazırlanmış sayfa sayfa alıştırma ve ünite değerlendirme çözümleri.</li>
              <li><strong>Öğretmen Araçları:</strong> Yıllık Plan Hazırlama Robotu (Excel &amp; PDF), Karne Görüşü Üreticisi, Kulüp Toplantı Tutanakları ve MEB antetli Sınav Hazırlama Robotu.</li>
            </ul>
          </section>

          <section className="space-y-3 p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
            <h2 className="text-lg font-bold text-amber-950 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              3. MEB Bağımsızlık Bildirimi &amp; Sorumluluk Reddi
            </h2>
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Önemli Yasal Bildirim:</strong> Matemetrik.com bağımsız bir eğitim platformudur; Millî Eğitim Bakanlığı (MEB), Talim ve Terbiye Kurulu Başkanlığı veya ÖSYM ile doğrudan resmi/kurumsal bir bağı bulunmamaktadır. Sitede yer alan ders kitabı çözümleri ve konu anlatımları rehberlik ve ev ödevi kontrolü amaçlıdır. Öğrencilerin ders başarısı için öncelikle kendi akıl yürütmelerini yapmaları ve öğretmenlerinin rehberliğini esas almaları tavsiye edilir.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Fikri Mülkiyet ve Telif Hakları</h2>
            <p>
              Sitede yer alan tüm özgün yazılar, algoritmalar, tasarım kodları, sınav şablonları, yıllık plan veri setleri ve logolar Matemetrik.com&apos;a aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile korunmaktadır.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
              <li>İçerikler bireysel öğrenme, ödev kontrolü ve sınıf içi eğitim amacıyla ücretsiz olarak kullanılabilir veya yazdırılabilir.</li>
              <li>İçeriklerin ticari amaçlarla satılması, başka web sitelerine kaynak gösterilmeksizin topluca kopyalanması veya kazanç amacıyla dağıtılması kesinlikle yasaktır.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. 5651 Sayılı Kanun Uyar-Kaldır Prensibi</h2>
            <p>
              Platformumuz 5651 sayılı &quot;İnternet Ortamında Yapılan Yayınların Düzenlenmesi ve Bu Yayınlar Yoluyla İşlenen Suçlarla Mücadele Edilmesi Hakkında Kanun&quot; kapsamında yer sağlayıcı olarak faaliyet göstermektedir. Sitemizde telif hakkı ihlali olduğunu düşündüğünüz herhangi bir materyal bulunması durumunda, hak sahibi veya yasal temsilcisi olarak <strong>matemetrikcom@gmail.com</strong> adresine başvurmanız halinde ilgili içerik en geç 24 saat içinde incelenerek yayından kaldırılır.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Öğretmen Araçları Kullanımı ve Veri Gizliliği</h2>
            <p>
              Öğretmenlerimizin kullanımına sunulan <em>Sınav Hazırlama Robotu</em> ve <em>Karne Görüşü Üreticisi</em> araçlarında girilen okul adı, zümre bilgileri veya öğrenci değerlendirmeleri tamamen kullanıcının yerel tarayıcısında (Client-Side) işlenmektedir. Matemetrik bu verileri sunucularında kaydetmez ve üçüncü kişilerle paylaşmaz.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              7. İletişim ve Hukuki İrtibat
            </h2>
            <p className="text-xs text-slate-600">
              Kullanım şartları, telif bildirimleri veya platformla ilgili yasal hususlar hakkında doğrudan resmi iletişim kanalımızdan bize ulaşabilirsiniz:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <p><strong>Platform:</strong> Matemetrik.com</p>
              <p><strong>Resmi E-Posta:</strong> <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a></p>
              <p><strong>İletişim Formu:</strong> <Link href="/iletisim" className="text-indigo-600 font-bold hover:underline">matemetrik.com/iletisim</Link></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
