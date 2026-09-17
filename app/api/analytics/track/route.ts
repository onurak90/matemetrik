import { NextRequest, NextResponse } from 'next/server';
import { recordPageHit } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === 'string' ? body.path : '/';
    const title = typeof body.title === 'string' ? body.title : '';
    const referrer = typeof body.referrer === 'string' ? body.referrer : '';

    const userAgent = request.headers.get('user-agent') || '';
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const realIp = request.headers.get('x-real-ip') || '';
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : realIp;

    recordPageHit({
      path,
      title,
      referrer,
      userAgent,
      ip,
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 200 });
  }
}
