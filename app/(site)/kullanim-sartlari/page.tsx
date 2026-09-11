import React from 'react';

export const metadata = {
  title: 'Kullanım Şartları | Matemetrik',
  description: 'Matemetrik.com sitesi kullanım şartları ve yasal bilgilendirme.',
};

export default function KullanimSartlariPage() {
  return (
    <div className="py-16 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Kullanım Şartları
        </h1>
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          <p>
            Bu internet sitesine (www.matemetrik.com) erişerek ve kullanarak aşağıdaki şart ve koşulları kabul etmiş sayılırsınız.
          </p>
          <h2 className="text-lg font-bold text-slate-900">1. Telif Hakları ve İçerik Kullanımı</h2>
          <p>
            Sitede yer alan ders anlatımları, özgün makaleler, dijital araçlar ve yazılımlar Matemetrik.com'a aittir. İçerikler yalnızca bireysel eğitim ve öğrenme amacıyla kullanılabilir; ticari amaçlarla kopyalanamaz veya izinsiz çoğaltılamaz.
          </p>
          <h2 className="text-lg font-bold text-slate-900">2. Eğitim Amaçlı Bilgilendirme</h2>
          <p>
            Sitedeki MEB ders kitabı cevapları ve sınav hazırlık materyalleri rehberlik ve kontrol amaçlı hazırlanmıştır. Öğrencilerin öncelikle kendi çözümlerini yapmaları teşvik edilir.
          </p>
        </div>
      </div>
    </div>
  );
}
