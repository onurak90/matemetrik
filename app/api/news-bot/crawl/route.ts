import { NextRequest, NextResponse } from 'next/server';
import { runNewsCrawlCycle } from '@/lib/newsBot';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds on Vercel

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const count = Math.min(10, Math.max(1, parseInt(body.count || '1', 10)));
    const forcePublish = body.forcePublish !== undefined ? Boolean(body.forcePublish) : undefined;
    const selectedItems = Array.isArray(body.selectedItems) ? body.selectedItems : undefined;

    const results = await runNewsCrawlCycle({
      maxArticles: count,
      forcePublish,
      selectedItems,
    });

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    console.error('[API NewsBot Crawl Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Haber tarama sırasında hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = Math.min(3, Math.max(1, parseInt(searchParams.get('count') || '1', 10)));
    const forcePublish = searchParams.get('publish') === 'true' ? true : undefined;

    const results = await runNewsCrawlCycle({
      maxArticles: count,
      forcePublish,
    });

    return NextResponse.json({
      success: true,
      data: results,
    });
  } catch (error: any) {
    console.error('[API NewsBot Crawl Error]:', error);
    return NextResponse.json(
      { error: error.message || 'Haber tarama sırasında hata oluştu' },
      { status: 500 }
    );
  }
}
