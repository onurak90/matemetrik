import { NextResponse } from 'next/server';
import { vacuumDatabase, getSystemMetrics } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const result = vacuumDatabase();
    const currentStats = getSystemMetrics();
    return NextResponse.json({
      success: true,
      ...result,
      currentStats,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
