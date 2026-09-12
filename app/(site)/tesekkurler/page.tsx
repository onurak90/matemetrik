import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, Sparkles, BookOpen, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Teşekkürler | Matemetrik',
  description: 'Talebiniz veya mesajınız başarıyla tarafımıza ulaştı.',
  robots: { index: false, follow: true },
};

export default function TesekkurlerPage() {
  return (
    <div className="py-20 pb-32">
      <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-lg shadow-emerald-500/10">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Teşekkür Ederiz!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg mx-auto">
            İletişim talebiniz veya mesajınız başarıyla alındı. En kısa sürede inceleyip geri dönüş sağlayacağız.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200/80 shadow-sm space-y-4 text-left max-w-lg mx-auto">
          <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
            Bu Sırada Neler Yapabilirsiniz?
          </div>
          <div className="space-y-2.5 text-xs">
            <Link
              href="/karne-gorusu-ureticisi"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 transition-colors font-semibold"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Karne Görüşü Robotu ile e-Okul hazırlığı yapın
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="/kategori/meb-ders-kitabi-cevaplari"
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-800 hover:text-indigo-600 transition-colors font-semibold"
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Güncel MEB Ders Kitabı Çözümlerine Göz Atın
              </span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </Link>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-indigo-600/20"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
