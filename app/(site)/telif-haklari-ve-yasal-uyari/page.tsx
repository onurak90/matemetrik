import React from 'react';
import Link from 'next/link';
import { AlertCircle, Scale, ShieldAlert, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Telif Hakları & Yasal Uyarı (DMCA / FSEK) | Matemetrik',
  description: 'Matemetrik.com telif hakları bildirimi, 5846 sayılı FSEK eğitimde adil kullanım ilkeleri, MEB ders kitapları sorumluluk reddi ve uyar-kaldır iletişim kanalları.',
  alternates: {
    canonical: 'https://www.matemetrik.com/telif-haklari-ve-yasal-uyari',
  },
};

export default function TelifHaklariPage() {
  return (
    <div className="py-12 pb-24 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600 transition-colors">Ana Sayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Telif Hakları &amp; Yasal Uyarı</span>
        </nav>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-400/30">
            <Scale className="w-3.5 h-3.5" /> Hukuki Bilgilendirme &amp; Şeffaflık
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Telif Hakları ve Yasal Sorumluluk Reddi
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
            5846 sayılı Fikir ve Sanat Eserleri Kanunu (FSEK), 5651 sayılı İnternet Ortamında Yapılan Yayınlar Kanunu ve uluslararası telif standartları uyarınca yasal haklar ve ilkelerimiz.
          </p>
        </div>

        {/* Content Body */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-600" />
              1. Millî Eğitim Bakanlığı (MEB) ve Yayınevi Mülkiyet Hakları
            </h2>
            <p>
              <strong>Matemetrik.com</strong>, Türkiye Cumhuriyeti Millî Eğitim Bakanlığı (MEB), Talim ve Terbiye Kurulu Başkanlığı (TTKB) veya ders kitaplarını basan ticari yayınevleri ile doğrudan kurumsal veya organik bir bağı olmayan <strong>tamamen bağımsız</strong> bir eğitim ve teknoloji portalıdır.
            </p>
            <p>
              Sitemizde atıfta bulunulan ders kitaplarının adları, kapak görselleri, ünite başlıkları ve telif hakları ilgili kurum ve yayınevlerine aittir. Bu unsurların sitemizde yer alması yalnızca inceleme, rehberlik ve kaynak gösterme (atıf) amacını taşır.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              2. 5846 Sayılı FSEK Kapsamında Eğitimde Adil Kullanım (İktibas Hakkı)
            </h2>
            <p className="text-xs sm:text-sm">
              5846 sayılı Fikir ve Sanat Eserleri Kanunu&apos;nun 33. ve 34. maddeleri uyarınca; <em>&quot;İlmi, edebi ve güzel sanat eserlerinden eğitim ve öğretim gayesiyle yapılan alıntılar, kaynak gösterilmek şartıyla serbesttir.&quot;</em>
            </p>
            <p className="text-xs sm:text-sm">
              Matemetrik.com üzerinde sunulan içerikler, öğrencilerin ders kitaplarındaki alıştırmaları kendi kendilerine çözerken karşılaştıkları güçlükleri aşmalarına rehberlik eden <strong>özgün pedagojik anlatımlar, çözüm adımları, grafik modellemeler ve kavram açıklamalarıdır</strong>. Platformumuz hiçbir ders kitabının korsan veya tam PDF kopyasını barındırmamakta, çoğaltmamakta ve satmamaktadır.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" />
              3. Eğitsel Sorumluluk Reddi (Öğrenci ve Velilere Uyarı)
            </h2>
            <p>
              Sitemizde yer alan çözümler, öğrencilerin ev ödevlerini doğrudan kopyalamaları için değil; yaptıkları çalışmaları teyit etmeleri, mantıksal hatalarını görmeleri ve matematiksel düşünme becerilerini geliştirmeleri amacıyla hazırlanmıştır.
            </p>
            <p>
              Öğretmenlerimizin ve velilerimizin öğrencileri ezbercilikten uzak tutarak kavramsal anlama sürecine yönlendirmelerini kuvvetle tavsiye ederiz.
            </p>
          </section>

          {/* Section 4: Notice and Take Down */}
          <section className="space-y-4 p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-600" />
              4. &quot;Uyar - Kaldır&quot; (Notice and Take Down) Süreci ve Telif Bildirimi
            </h2>
            <p className="text-xs sm:text-sm">
              5651 sayılı kanunun ilgili maddeleri uyarınca platformumuz &quot;Yer Sağlayıcı&quot; ve &quot;Bağımsız İçerik Üreticisi&quot; olarak faaliyet göstermektedir. Telif hakkı sahibi olduğunuz herhangi bir eserin veya içeriğin sitemizde sehven hak ihlali oluşturduğunu düşünüyorsanız, hukuki süreç başlatmadan önce lütfen bizimle iletişime geçiniz:
            </p>
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
              <p><strong>Telif Bildirim E-Postası:</strong> <a href="mailto:matemetrikcom@gmail.com" className="text-indigo-600 font-bold hover:underline">matemetrikcom@gmail.com</a></p>
              <p><strong>Konu Başlığı:</strong> Telif Bildirimi / [İlgili İçerik Başlığı veya URL]</p>
              <p><strong>Geri Dönüş Süresi:</strong> En geç <strong>24 saat</strong> içinde bildiriminiz incelenerek gerekli düzeltme veya yayından kaldırma işlemi gerçekleştirilir.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900">
              5. Diğer Sayfalarımız ve Yasal Belgeler
            </h2>
            <div className="flex flex-wrap gap-3 text-xs">
              <Link href="/kunye" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                Künye &amp; Yayın Kurulu &rarr;
              </Link>
              <Link href="/yayin-ilkeleri" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                Yayın İlkeleri &rarr;
              </Link>
              <Link href="/gizlilik-politikasi" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                Gizlilik Politikası (KVKK) &rarr;
              </Link>
              <Link href="/cerez-politikasi" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                Çerez Politikası &rarr;
              </Link>
              <Link href="/iletisim" className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                İletişim &rarr;
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
