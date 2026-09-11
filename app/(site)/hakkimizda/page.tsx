import React from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, CheckCircle, Award, Target, Users } from 'lucide-react';

export const metadata = {
  title: 'Hakkımızda | Matemetrik - Matematik ve Eğitim Portalı',
  description: 'Matemetrik olarak Türkiye çapında öğrencilere ve öğretmenlere matematik ders kitabı çözümleri ve dijital eğitim araçları sunuyoruz.',
};

export default function HakkimizdaPage() {
  return (
    <div className="py-16 pb-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5" /> Hakkımızda
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Matematiği Sevdiren ve Kolaylaştıran Platform
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Eğitimde fırsat eşitliği ve kaliteli içeriğe erişim misyonuyla yola çıktık.
          </p>
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-slate-900">Biz Kimiz?</h2>
          <p>
            <strong>Matemetrik.com</strong>, Türkiye genelinde 1. sınıftan 12. sınıfa kadar tüm kademelerdeki öğrencilerin matematik başarısını artırmak ve öğretmenlerin ders ile ölçme-değerlendirme süreçlerini kolaylaştırmak amacıyla kurulmuş bağımsız bir eğitim platformudur.
          </p>
          <p>
            Platformumuzda; Millî Eğitim Bakanlığı (MEB) tarafından onaylı güncel ders kitaplarının sayfa sayfa çözümleri, yeni nesil soru kalıpları, karne görüşü üreticisi ve sınav hazırlama robotu gibi inovatif dijital araçlar sunulmaktadır.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Misyonumuz</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Her öğrencinin kaliteli, anlaşılır ve güvenilir matematik içeriğine hiçbir ücret ödemeden en hızlı şekilde ulaşabilmesini sağlamak.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Öğretmen Odaklılık</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Değerli öğretmenlerimizin e-Okul karne dönemlerindeki ve sınav kağıdı hazırlama süreçlerindeki yükünü akıllı algoritmalarımızla en aza indirmek.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
