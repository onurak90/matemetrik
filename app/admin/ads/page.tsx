'use client';

import React, { useState, useEffect } from 'react';
import {
  Save, CheckCircle, Code, ShieldCheck,
  AlertCircle, Layout, ToggleLeft, ToggleRight, Sparkles, Link2
} from 'lucide-react';

export default function AdminAdsPage() {
  const [adsEnabled, setAdsEnabled] = useState(false);
  const [adHeaderCode, setAdHeaderCode] = useState('');
  const [adInArticleCode, setAdInArticleCode] = useState('');
  const [adSidebarCode, setAdSidebarCode] = useState('');
  const [adFooterCode, setAdFooterCode] = useState('');
  const [adSmartLink, setAdSmartLink] = useState('');
  const [adsTxt, setAdsTxt] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/ads')
      .then((res) => res.json())
      .then((data) => {
        setAdsEnabled(data.ads_enabled === '1');
        setAdHeaderCode(data.ad_header_code || '');
        setAdInArticleCode(data.ad_in_article_code || '');
        setAdSidebarCode(data.ad_sidebar_code || '');
        setAdFooterCode(data.ad_footer_code || '');
        setAdSmartLink(data.ad_smart_link || '');
        setAdsTxt(data.ads_txt || '');
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch('/api/ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ads_enabled: adsEnabled ? '1' : '0',
          ad_header_code: adHeaderCode,
          ad_in_article_code: adInArticleCode,
          ad_sidebar_code: adSidebarCode,
          ad_footer_code: adFooterCode,
          ad_smart_link: adSmartLink,
          ads_txt: adsTxt,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Reklam ayarları kaydedilemedi');
      }
    } catch (err) {
      alert('Hata oluştu');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Reklam Alanları &amp; Kod Ekleme Yöneticisi
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Google AdSense, Analytics ve özel reklam kodlarınızı sitenin farklı bölgelerine yerleştirin.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Reklam ve kod ayarları başarıyla kaydedildi!
          </div>
        )}

        {/* Enable / Disable Switch */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Reklam Gösterimini Etkinleştir
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Tüm sitedeki AdSense ve özel reklam birimlerini açıp kapatmanızı sağlar.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAdsEnabled(!adsEnabled)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              adsEnabled ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
            }`}
          >
            {adsEnabled ? 'Yayında (Aktif)' : 'Kapalı (Pasif)'}
          </button>
        </div>

        {/* Header Scripts (AdSense Verification, Analytics) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-600" />
              Üst Başlık (Header / &lt;head&gt;) Kodları
            </label>
            <span className="text-[11px] text-slate-400">Google AdSense Auto-Ads, GA4 Tag vb.</span>
          </div>
          <textarea
            rows={4}
            value={adHeaderCode}
            onChange={(e) => setAdHeaderCode(e.target.value)}
            placeholder="<script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-...' crossorigin='anonymous'></script>"
            className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* In-Article Ad Unit */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-indigo-600" />
              Yazı İçi (In-Article) Reklam Kodu
            </label>
            <span className="text-[11px] text-slate-400">Blog içeriğinin 2. paragrafından sonra gösterilir</span>
          </div>
          <textarea
            rows={4}
            value={adInArticleCode}
            onChange={(e) => setAdInArticleCode(e.target.value)}
            placeholder="<!-- Google AdSense In-Article Ad Unit -->&#10;<ins class='adsbygoogle' ...></ins>"
            className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Sidebar / After Article Ad Unit */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-indigo-600" />
              Yazı Sonu / Benzer Yazılar Öncesi Reklam Kodu
            </label>
            <span className="text-[11px] text-slate-400">Yazı bittiğinde sosyal paylaşımın altında yer alır</span>
          </div>
          <textarea
            rows={4}
            value={adSidebarCode}
            onChange={(e) => setAdSidebarCode(e.target.value)}
            placeholder="<!-- Reklam Kodu -->&#10;<ins class='adsbygoogle' ...></ins>"
            className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Footer Code */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-600" />
              Alt Kısım (Footer / Body Sonu) Kodları
            </label>
            <span className="text-[11px] text-slate-400">Özel takip veya çerez pencereleri için</span>
          </div>
          <textarea
            rows={3}
            value={adFooterCode}
            onChange={(e) => setAdFooterCode(e.target.value)}
            placeholder="<script>/* Footer Scripts */</script>"
            className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Smartlink / Direct Link (Adsterra) */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Adsterra Smartlink / Direct Link URL (Yüksek Kazanç Bağlantısı)
            </label>
            <span className="text-[11px] text-slate-400">PDF indirme butonlarında ve yazı içi CTA kutularında açılır</span>
          </div>
          <p className="text-xs text-slate-500">
            Adsterra panelinizden aldığınız doğrudan bağlantı URL'si. Ziyaretçiler PDF indirme butonlarına veya çalışma notu bağlantılarına tıkladığında bu link yeni sekmede açılır.
          </p>
          <input
            type="url"
            value={adSmartLink}
            onChange={(e) => setAdSmartLink(e.target.value)}
            placeholder="https://..."
            className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* ads.txt Editor */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              ads.txt Dosyası Yönetimi (Google AdSense Zorunlu)
            </label>
            <a
              href="/ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-indigo-600 font-bold hover:underline"
            >
              Dosyayı Görüntüle (/ads.txt) &rarr;
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Google AdSense hesabınız onaylandığında size verilen yayıncı kimliği satırını buraya yapıştırın. Örnek: <code className="bg-slate-100 px-1 py-0.5 rounded text-[11px] font-mono text-slate-800">google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0</code>
          </p>
          <textarea
            rows={4}
            value={adsTxt}
            onChange={(e) => setAdsTxt(e.target.value)}
            placeholder="google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0"
            className="w-full p-3 font-mono text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Kaydediliyor...' : 'Reklam Ayarlarını Kaydet'}
        </button>
      </form>
    </div>
  );
}
