import { NextResponse } from 'next/server';
import { getGreekNews, syncGreekNews } from '@/lib/greekNews';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const forceSync = searchParams.get('sync') === '1';
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    if (forceSync) {
      const syncResult = await syncGreekNews();
      const news = await getGreekNews(limit);
      return NextResponse.json({ success: true, syncResult, news });
    }

    const news = await getGreekNews(limit);
    return NextResponse.json({ success: true, news });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Error loading Greek news' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await syncGreekNews();
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Error syncing Greek news' },
      { status: 500 }
    );
  }
}
