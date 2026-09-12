import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { ids, action } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'En az bir yazı seçilmelidir' },
        { status: 400 }
      );
    }

    const db = getDb();
    const placeholders = ids.map(() => '?').join(',');

    if (action === 'publish') {
      const stmt = db.prepare(`UPDATE posts SET is_published = 1, updated_at = ? WHERE id IN (${placeholders})`);
      const res = stmt.run(new Date().toISOString(), ...ids);
      return NextResponse.json({ success: true, action, count: res.changes });
    }

    if (action === 'draft') {
      const stmt = db.prepare(`UPDATE posts SET is_published = 0, updated_at = ? WHERE id IN (${placeholders})`);
      const res = stmt.run(new Date().toISOString(), ...ids);
      return NextResponse.json({ success: true, action, count: res.changes });
    }

    if (action === 'delete') {
      const stmt = db.prepare(`DELETE FROM posts WHERE id IN (${placeholders})`);
      const res = stmt.run(...ids);
      return NextResponse.json({ success: true, action, count: res.changes });
    }

    return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
  } catch (error: any) {
    console.error('Bulk action error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
