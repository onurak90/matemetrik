import { NextRequest, NextResponse } from 'next/server';
import { getNewsSuggestions } from '@/lib/newsBot';

export const dynamic = 'force-dynamic';
export const maxDuration = 45;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(60, Math.max(5, parseInt(searchParams.get('limit') || '35', 10)));
    const suggestions = await getNewsSuggestions(limit);

    return NextResponse.json({
      success: true,
      count: suggestions.length,
      suggestions,
    });
  } catch (error: any) {
    console.error('[API NewsBot Suggestions Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Öneriler taranırken hata oluştu' },
      { status: 500 }
    );
  }
}
