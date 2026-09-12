import { NextRequest, NextResponse } from 'next/server';
import { getPostById, getSettings } from '@/lib/db';
import { callGeminiApi } from '@/lib/gemini';
import { generateOpenAICompletion } from '@/lib/openai';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, customTopic, provider = 'auto', geminiKey, openaiKey } = body;

    const settings = getSettings();
    const activeGeminiKey = geminiKey || settings.gemini_api_key;
    const activeOpenaiKey = openaiKey || settings.openai_api_key;
    const preferredProvider = provider === 'auto' ? (settings.ai_provider || 'gemini') : provider;

    let topicTitle = customTopic || '';
    let topicContent = '';
    let topicCategory = 'Matematik & Eğitim';

    if (postId) {
      const post = getPostById(Number(postId));
      if (post) {
        topicTitle = post.title;
        topicCategory = post.category;
        topicContent = (post.excerpt || post.content.replace(/<[^>]*>/g, ' ')).slice(0, 800);
      }
    }

    if (!topicTitle.trim()) {
      return NextResponse.json(
        { error: 'Lütfen bir yazı seçin veya bir konu başlığı girin.' },
        { status: 400 }
      );
    }

    const systemPrompt = `Sen Türkiye'nin en popüler matematik ve eğitim platformu olan "Matemetrik" için profesyonel bir sosyal medya uzmanısın.
Hedef kitle: Ortaokul, lise, YKS/LGS öğrencileri, veliler ve matematik öğretmenleri.
Ton: Merak uyandırıcı, profesyonel, öğretici, akıcı ve ilgi çekici.

Senden istenen, verilen konu/yazı için 3 slaytlık bir Instagram kaydırmalı (carousel) görsel içeriği metinleri ile birlikte Instagram açıklaması, hashtagleri ve Twitter (X) tweet serisi hazırlamandır.

MUTLAKA AŞAĞIDAKİ GEÇERLİ JSON FORMATINDA YANIT VER:
{
  "topic": "Konu Başlığı",
  "category": "Kategori",
  "instagram": {
    "caption": "Instagram açıklama metni. Emojilerle zenginleştirilmiş, dikkat çekici giriş (hook), konunun özeti ve matemetrik.com çağrısı içeren 3-4 paragraflık metin.",
    "hashtags": "#matematik #yks2026 #lgs2026 #matemetrik #dersnotlari #ogretmenler",
    "slides": [
      {
        "slideNumber": 1,
        "tag": "1. SLAYT (KAPAK)",
        "title": "Çok çarpıcı, büyük ve merak uyandıran kapak başlığı (maksimum 8 kelime)",
        "subtitle": "Kısa alt açıklama veya merak uyandıran soru",
        "badge": "PÜF NOKTASI",
        "bulletPoints": ["Öne çıkan 1. madde", "Öne çıkan 2. madde", "Öne çıkan 3. madde"],
        "cta": "Kaydır ➔"
      },
      {
        "slideNumber": 2,
        "tag": "2. SLAYT (ÇÖZÜM & KURAL)",
        "title": "Ana Kural, Formül veya Çözüm Püf Noktası",
        "subtitle": "Öğrencinin veya öğretmenin hemen uygulayabileceği somut taktik",
        "badge": "ÖZEL TAKTİK",
        "bulletPoints": ["Dikkat edilmesi gereken nokta 1", "Sık yapılan hata 2", "Formül/Çözüm kuralı 3"],
        "cta": "Sonraki Adım ➔"
      },
      {
        "slideNumber": 3,
        "tag": "3. SLAYT (SONUÇ & ÇAĞRI)",
        "title": "Daha Fazlası İçin Gönderiyi Kaydet!",
        "subtitle": "Tüm MEB çözümleri ve sınav robotu araçları matemetrik.com'da seni bekliyor.",
        "badge": "MATEMETRİK",
        "bulletPoints": ["MEB Kitabı Tam Çözümleri", "Sınav Hazırlama Robotu", "Karne Görüşü Üreticisi"],
        "cta": "Kaydet & Paylaş 🔖"
      }
    ]
  },
  "twitter": {
    "mainTweet": "Twitter/X için ana tweet (en fazla 250 karakter, emojili ve link çağrılı).",
    "threadTweets": [
      "1/3 Konuyla ilgili 1. püf nokta veya soru.",
      "2/3 Konunun çözümü veya altın kuralı.",
      "3/3 Detaylı konu anlatımı ve tüm çözümler için matemetrik.com'u ziyaret edin! 🚀"
    ]
  }
}`;

    const userPrompt = `Konu Başlığı: ${topicTitle}
Kategori: ${topicCategory}
İçerik Özeti: ${topicContent || 'MEB müfredatına uygun konu anlatımı ve soru çözümleri.'}

Lütfen bu konu için 3 slaytlık Instagram kaydırmalı gönderi, açıklama, hashtagler ve Twitter içeriğini JSON olarak üret.`;

    let rawOutput = '';
    let usedProvider = preferredProvider;

    // Try primary provider
    let parsed: any;

    if (preferredProvider === 'openai' || (!activeGeminiKey && activeOpenaiKey)) {
      usedProvider = 'openai';
      const rawOutput = await generateOpenAICompletion({
        apiKey: activeOpenaiKey,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });
      parsed = JSON.parse(rawOutput);
    } else {
      // Default or Gemini
      usedProvider = 'gemini';
      try {
        parsed = await callGeminiApi(
          `${systemPrompt}\n\nKullanıcı İsteği:\n${userPrompt}`,
          true,
          activeGeminiKey
        );
      } catch (geminiError: any) {
        console.warn('Gemini failed in social generator, checking OpenAI fallback:', geminiError.message);
        if (activeOpenaiKey) {
          usedProvider = 'openai (fallback)';
          const rawOutput = await generateOpenAICompletion({
            apiKey: activeOpenaiKey,
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.7,
          });
          parsed = JSON.parse(rawOutput);
        } else {
          throw geminiError;
        }
      }
    }

    return NextResponse.json({
      success: true,
      provider: usedProvider,
      data: parsed,
    });
  } catch (error: any) {
    console.error('Social generate API error:', error);
    return NextResponse.json({ error: error.message || 'Sosyal medya içeriği üretilemedi.' }, { status: 500 });
  }
}
