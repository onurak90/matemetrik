import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSetting } from '@/lib/db';

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json({
      ads_enabled: settings.ads_enabled || '0',
      ad_header_code: settings.ad_header_code || '',
      ad_in_article_code: settings.ad_in_article_code || '',
      ad_sidebar_code: settings.ad_sidebar_code || '',
      ad_footer_code: settings.ad_footer_code || '',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const allowedKeys = [
      'ads_enabled',
      'ad_header_code',
      'ad_in_article_code',
      'ad_sidebar_code',
      'ad_footer_code',
    ];

    for (const key of allowedKeys) {
      if (body[key] !== undefined) {
        updateSetting(key, String(body[key]));
      }
    }

    return NextResponse.json({ success: true, message: 'Reklam ayarları kaydedildi.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
