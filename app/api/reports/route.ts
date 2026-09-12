import { NextResponse } from 'next/server';
import { getReports } from '@/lib/db';

export async function GET() {
  try {
    const data = getReports();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
