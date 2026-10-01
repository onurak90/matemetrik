'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Settings, Globe, Shield, Activity, Code, HelpCircle } from 'lucide-react';

interface SiteSettings {
  site_name: string;
  site_description: string;
  site_author: string;
  google_analytics_id?: string;
  gsc_verification?: string;
  bing_verification?: string;
  yandex_verification?: string;
  pinterest_verification?: string;
  custom_head_tags?: string;
  contact_phone?: string;
  cta_top_text?: string;
  [key: string]: string | undefined;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Matemetrik',
    site_description: 'Matematik, MEB ders kitabı cevapları, eğitim rehberliği ve öğretmen araçları platformu',
    site_author: 'Matemetrik Eğitim & Matematik Zümresi',
    google_analytics_id: '',
    gsc_verification: '',
    bing_verification: '',
    yandex_verification: '',
    pinterest_verification: '',
    custom_head_tags: '',
    contact_phone: '',
    cta_top_text: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data) setSettings((prev) => ({ ...prev, ...data }));
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Ayarlar kaydedilemedi');
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
          Site Ayarları &amp; Entegrasyonlar
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Google Analytics, Arama Motoru Doğrulamaları ve Genel Yapılandırma
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-7">
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm flex items-center gap-2 font-medium animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            Tüm ayarlar ve entegrasyonlar başarıyla kaydedildi.
          </div>
        )}

        {/* General Site Info */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-600" />
            Genel Site Bilgileri
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Site Adı
              </label>
              <input
                type="text"
                value={settings.site_name}
                onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Varsayılan Yazar (Tüm İçerikler İçin)
              </label>
              <input
                type="text"
                value={settings.site_author}
                onChange={(e) => setSettings({ ...settings, site_author: e.target.value })}
                className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Site Açıklaması (Meta Description)
            </label>
            <textarea
              rows={2}
              value={settings.site_description}
              onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
              className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* GOOGLE ANALYTICS INTEGRATION SECTION */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-500" />
                Google Analytics 4 Entegrasyonu (gtag.js)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Google Analytics hesabınızdan aldığınız Ölçüm Kimliğini (G-XXXXXXXXXX) veya doğrudan Google Tag kodunu girin.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-amber-50 text-amber-800 text-[11px] font-bold rounded-lg border border-amber-200/60 shrink-0">
              Canlı Takip Aktif
            </span>
          </div>

          <div className="bg-amber-50/40 p-4 rounded-2xl border border-amber-200/50 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Google Analytics Ölçüm Kimliği veya Kod Bloğu:
            </label>
            <textarea
              rows={3}
              placeholder="Örn: G-XXXXXXXXXX veya &lt;script async src='https://www.googletagmanager.com/gtag/js?id=G-...'&gt;...&lt;/script&gt;"
              value={settings.google_analytics_id || ''}
              onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
              className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
            />
            <div className="text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Nasıl Alınır?</strong> Google Analytics &gt; Yönetici &gt; Veri Akışları &gt; Web Akışınız yolunu izleyin. "G-" ile başlayan <strong>Ölçüm Kimliğini</strong> kopyalayıp buraya yapıştırın. Siteniz anında Google Analytics sunucularına bağlanır.
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH ENGINE VERIFICATION CODES */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            Arama Motoru Doğrulama Kodları
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Google Search Console Doğrulama Kodu
              </label>
              <input
                type="text"
                placeholder="Örn: abc123xyz... veya tam HTML etiketi"
                value={settings.gsc_verification || ''}
                onChange={(e) => setSettings({ ...settings, gsc_verification: e.target.value })}
                className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bing Webmaster Doğrulama Kodu
              </label>
              <input
                type="text"
                placeholder="msvalidate.01=..."
                value={settings.bing_verification || ''}
                onChange={(e) => setSettings({ ...settings, bing_verification: e.target.value })}
                className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Yandex Webmaster Doğrulama Kodu
              </label>
              <input
                type="text"
                placeholder="yandex-verification: ..."
                value={settings.yandex_verification || ''}
                onChange={(e) => setSettings({ ...settings, yandex_verification: e.target.value })}
                className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Pinterest Doğrulama Kodu
              </label>
              <input
                type="text"
                placeholder="p:domain_verify=..."
                value={settings.pinterest_verification || ''}
                onChange={(e) => setSettings({ ...settings, pinterest_verification: e.target.value })}
                className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <Code className="w-3.5 h-3.5 text-slate-500" />
              Özel &lt;head&gt; Kodları (Ekstra Meta veya Doğrulama Etiketleri)
            </label>
            <textarea
              rows={2}
              placeholder="<!-- Özel meta veya harici scriptler -->"
              value={settings.custom_head_tags || ''}
              onChange={(e) => setSettings({ ...settings, custom_head_tags: e.target.value })}
              className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800"
            />
          </div>
        </div>

        {/* Contact & CTA Settings */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            İletişim Bilgileri
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              WhatsApp / İletişim Numarası
            </label>
            <input
              type="text"
              placeholder="+90 555 000 00 00"
              value={settings.contact_phone || ''}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-md shadow-indigo-600/20"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
