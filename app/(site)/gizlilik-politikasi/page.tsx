import React from 'react';

export const metadata = {
  title: 'Gizlilik Politikası | Matemetrik',
  description: 'Matemetrik.com kişisel verilerin korunması ve gizlilik politikası.',
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="py-16 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Gizlilik Politikası (KVKK)
        </h1>
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm">
          <p>
            Matemetrik.com olarak ziyaretçilerimizin gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz.
          </p>
          <h2 className="text-lg font-bold text-slate-900">1. Çerezler (Cookies)</h2>
          <p>
            Sitemizin performansını artırmak, kullanıcı deneyimini iyileştirmek ve anonim analitik veriler toplamak amacıyla standart web çerezleri kullanılmaktadır.
          </p>
          <h2 className="text-lg font-bold text-slate-900">2. Veri Güvenliği</h2>
          <p>
            Öğretmen araçlarımızda (Karne Görüşü Üreticisi, Sınav Hazırlama Robotu) girdiğiniz öğrenci isimleri veya soru metinleri sunucularımızda kalıcı olarak depolanmaz; tamamen tarayıcınız üzerinden anlık işlenir.
          </p>
        </div>
      </div>
    </div>
  );
}
