import { NextRequest, NextResponse } from 'next/server';
import { getTrendsSuggestions } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const keyword = (body.keyword || '').trim();

    if (!keyword) {
      return NextResponse.json(
        { error: 'Lütfen aranacak bir anahtar kelime veya konu girin.' },
        { status: 400 }
      );
    }

    const suggestions = await getTrendsSuggestions(keyword);
    return NextResponse.json({
      success: true,
      keyword,
      topics: suggestions,
    });
  } catch (error: any) {
    console.error('Trends API error:', error);
    return NextResponse.json(
      { error: error.message || 'Trend konular alınamadı' },
      { status: 500 }
    );
  }
}
