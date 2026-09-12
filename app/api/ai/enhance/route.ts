import { NextRequest, NextResponse } from 'next/server';
import { callGeminiApi } from '@/lib/gemini';
import { generateOpenAICompletion } from '@/lib/openai';
import { getSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, title, content } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Yazı başlığı gereklidir' }, { status: 400 });
    }

    const cleanContent = (content || '').replace(/<[^>]*>/g, ' ').slice(0, 1500);
    const settings = getSettings();
    const activeGeminiKey = settings.gemini_api_key;
    const activeOpenaiKey = settings.openai_api_key;
    const preferredProvider = settings.ai_provider || 'gemini';

    let prompt = '';
    if (type === 'meta') {
      prompt = `Sen bir SEO uzmanısın. Aşağıdaki matematik ve eğitim blog yazısı için Google aramalarında tıklama oranını (CTR) maksimize edecek, 130 ile 155 karakter arasında, akıcı ve dikkat çekici bir Türkçe meta açıklaması yaz.
Yazı Başlığı: "${title}"
İçerik Özeti: "${cleanContent}"

Sadece ve sadece JSON formatında yanıt ver:
{"metaDescription": "Üretilen meta açıklama..."}`;
    } else if (type === 'faq') {
      prompt = `Sen bir matematik öğretmenisin. Aşağıdaki konu hakkında öğrencilerin veya velilerin en çok merak ettiği tam 3 adet sıkça sorulan soru ve anlaşılır, pedagojik yanıtlarını hazırla.
Yazı Başlığı: "${title}"
İçerik Özeti: "${cleanContent}"

Sadece ve sadece aşağıdaki JSON formatında yanıt ver:
{
  "html": "<div class=\\"mt-8 p-6 bg-slate-50 border border-slate-200 rounded-2xl\\"><h3 class=\\"text-xl font-bold text-slate-900 mb-4\\">❓ Sıkça Sorulan Sorular</h3><div class=\\"space-y-4\\"><details class=\\"group bg-white p-4 rounded-xl border border-slate-200\\"><summary class=\\"font-semibold text-slate-900 cursor-pointer\\">Soru 1</summary><p class=\\"mt-2 text-slate-600 text-sm\\">Cevap 1</p></details>...</div></div>"
}`;
    } else if (type === 'tips') {
      prompt = `Sen bir matematik öğretmenisin. Aşağıdaki konu için sınavda hayat kurtaracak, öğrencinin hata yapmasını engelleyecek 3 adet kritik öğretmen ipucu ve püf noktası hazırla.
Yazı Başlığı: "${title}"
İçerik Özeti: "${cleanContent}"

Sadece ve sadece aşağıdaki JSON formatında yanıt ver:
{
  "html": "<div class=\\"p-5 my-6 bg-indigo-50/80 border-l-4 border-indigo-600 rounded-r-2xl text-slate-800\\"><h4 class=\\"font-bold text-indigo-950 flex items-center gap-2 mb-2\\">💡 Öğretmenin Altın Püf Noktaları</h4><ul class=\\"list-disc list-inside space-y-1.5 text-sm\\"><li>Madde 1</li><li>Madde 2</li><li>Madde 3</li></ul></div>"
}`;
    } else {
      return NextResponse.json({ error: 'Geçersiz işlem tipi' }, { status: 400 });
    }

    let result: any;
    if (preferredProvider === 'openai' && activeOpenaiKey) {
      const raw = await generateOpenAICompletion({
        apiKey: activeOpenaiKey,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      });
      result = JSON.parse(raw);
    } else {
      try {
        result = await callGeminiApi(prompt, true, activeGeminiKey);
      } catch (geminiError: any) {
        if (activeOpenaiKey) {
          const raw = await generateOpenAICompletion({
            apiKey: activeOpenaiKey,
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.7,
          });
          result = JSON.parse(raw);
        } else {
          throw geminiError;
        }
      }
    }

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    console.error('AI enhance error:', error);
    return NextResponse.json({ error: error.message || 'AI destek içeriği üretilemedi' }, { status: 500 });
  }
}
