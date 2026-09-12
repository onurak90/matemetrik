import { NextResponse } from 'next/server';
import { getSeoAuditReport } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const report = getSeoAuditReport();
    return NextResponse.json(report);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
