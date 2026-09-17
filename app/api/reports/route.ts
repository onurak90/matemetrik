import { NextRequest, NextResponse } from 'next/server';
import { getAdvancedAnalytics } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30days';
    const data = getAdvancedAnalytics(range);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Reports API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
