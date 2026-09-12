import { NextRequest, NextResponse } from 'next/server';
import { generateSeoArticle } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const topic = (body.topic || '').trim();

    if (!topic) {
      return NextResponse.json(
        { error: 'Lütfen üretilecek bir konu veya başlık belirtin.' },
        { status: 400 }
      );
    }

    const result = await generateSeoArticle({
      topic,
      titleOverride: body.titleOverride?.trim() || undefined,
      competitorUrl: body.competitorUrl?.trim() || undefined,
      tone: body.tone || 'Öğretici ve Pedagojik',
      length: body.length || 'medium',
      categorySlug: body.categorySlug || undefined,
      customInstructions: body.customInstructions?.trim() || undefined,
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    console.error('Generate API error:', error);
    return NextResponse.json(
      { error: error.message || 'Makale üretilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}
