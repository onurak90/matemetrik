import { NextRequest, NextResponse } from 'next/server';
import { getSettings, updateSetting } from '@/lib/db';

export async function GET() {
  try {
    const settings = getSettings();
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    for (const [key, val] of Object.entries(body)) {
      if (typeof val === 'string') {
        updateSetting(key, val);
      }
    }
    return NextResponse.json(getSettings());
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
