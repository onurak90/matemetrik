import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSettings } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json({
      success: true,
      settings: {
        news_bot_enabled: settings.news_bot_enabled !== 'false',
        news_bot_publish_mode: settings.news_bot_publish_mode || 'published', // 'published' | 'draft'
        news_bot_scan_limit: parseInt(settings.news_bot_scan_limit || '1', 10),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const updateObj: Record<string, string> = {};

    if (body.news_bot_enabled !== undefined) {
      updateObj.news_bot_enabled = body.news_bot_enabled ? 'true' : 'false';
    }
    if (body.news_bot_publish_mode !== undefined) {
      updateObj.news_bot_publish_mode = body.news_bot_publish_mode === 'draft' ? 'draft' : 'published';
    }
    if (body.news_bot_scan_limit !== undefined) {
      updateObj.news_bot_scan_limit = String(body.news_bot_scan_limit);
    }

    updateSettings(updateObj);

    return NextResponse.json({
      success: true,
      message: 'Ayarlar güncellendi',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
