import { NextRequest, NextResponse } from 'next/server';
import { generateSeoArticle } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const topics: string[] = Array.isArray(body.topics)
      ? body.topics.map((t: string) => t.trim()).filter(Boolean)
      : [];

    if (topics.length === 0) {
      return NextResponse.json(
        { error: 'Lütfen en az bir konu girin.' },
        { status: 400 }
      );
    }

    const results = [];
    const errors = [];

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      try {
        const res = await generateSeoArticle({
          topic,
          competitorUrl: body.competitorUrl?.trim() || undefined,
          tone: body.tone || 'Öğretici ve Pedagojik',
          length: body.length || 'medium',
          categorySlug: body.categorySlug || undefined,
          customInstructions: body.customInstructions?.trim() || undefined,
        });
        results.push(res);
      } catch (err: any) {
        errors.push({ topic, error: err.message });
      }
    }

    return NextResponse.json({
      success: true,
      total: topics.length,
      generatedCount: results.length,
      results,
      errors,
    });
  } catch (error: any) {
    console.error('Batch API error:', error);
    return NextResponse.json(
      { error: error.message || 'Toplu üretim hatası' },
      { status: 500 }
    );
  }
}
