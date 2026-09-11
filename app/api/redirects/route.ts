import { NextRequest, NextResponse } from 'next/server';
import { getAllRedirects, createRedirect } from '@/lib/db';

export async function GET() {
  try {
    const redirects = getAllRedirects();
    return NextResponse.json(redirects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.source_path || !body.target_path) {
      return NextResponse.json({ error: 'Kaynak ve hedef URL zorunludur' }, { status: 400 });
    }
    const newRed = createRedirect(body.source_path, body.target_path, body.status_code || 301);
    return NextResponse.json(newRed, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
