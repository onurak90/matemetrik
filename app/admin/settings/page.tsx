'use client';

import React, { useState, useEffect } from 'react';
import { Save, CheckCircle, Settings, Globe, Shield } from 'lucide-react';

interface SiteSettings {
  site_name: string;
  site_description: string;
  site_author: string;
  gsc_verification?: string;
  bing_verification?: string;
  contact_phone?: string;
  cta_top_text?: string;
  [key: string]: string | undefined;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'Matemetrik',
    site_description: 'Matematik, MEB ders kitabı cevapları, eğitim rehberliği ve öğretmen araçları platformu',
    site_author: 'Onur AK',
    gsc_verification: '',
    bing_verification: '',
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
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Site Ayarları
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Genel site yapılandırması ve meta bilgileri
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2 font-medium">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Ayarlar başarıyla kaydedildi.
          </div>
        )}

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
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
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Site Açıklaması (Meta Description)
          </label>
          <textarea
            rows={3}
            value={settings.site_description}
            onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
            className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            Varsayılan Yazar
          </label>
          <input
            type="text"
            value={settings.site_author}
            onChange={(e) => setSettings({ ...settings, site_author: e.target.value })}
            className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Google & Bing Verification */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Globe className="w-4 h-4 text-indigo-600" />
            Arama Motoru Doğrulama Kodları
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Google Search Console Doğrulama Kodu (HTML Tag)
            </label>
            <input
              type="text"
              placeholder="google-site-verification=abc123xyz..."
              value={settings.gsc_verification || ''}
              onChange={(e) => setSettings({ ...settings, gsc_verification: e.target.value })}
              className="w-full p-3 text-xs font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
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
        </div>

        {/* Contact & CTA Settings */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-600" />
            İletişim &amp; Üst Banner CTA
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Sticky WhatsApp / İletişim Numarası
            </label>
            <input
              type="text"
              placeholder="+90 555 000 00 00"
              value={settings.contact_phone || ''}
              onChange={(e) => setSettings({ ...settings, contact_phone: e.target.value })}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Üst Bildirim Banner Metni (CTA)
            </label>
            <input
              type="text"
              value={settings.cta_top_text || ''}
              onChange={(e) => setSettings({ ...settings, cta_top_text: e.target.value })}
              className="w-full p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 shadow-sm"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </form>
    </div>
  );
}
