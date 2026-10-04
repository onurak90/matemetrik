import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb, getPostById } from '@/lib/db';
import { saveDynamicPostToBlob, deleteDynamicPostFromBlob } from '@/lib/blobSync';

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

    if (action === 'publish' || action === 'draft') {
      const isPub = action === 'publish' ? 1 : 0;
      const stmt = db.prepare(`UPDATE posts SET is_published = ?, updated_at = ? WHERE id IN (${placeholders})`);
      const res = stmt.run(isPub, new Date().toISOString(), ...ids);

      // Persist status change to Blob for each affected post
      for (const id of ids) {
        const p = getPostById(id);
        if (p) {
          await saveDynamicPostToBlob(p);
        }
      }

      try {
        revalidatePath('/');
        revalidatePath('/post');
        revalidatePath('/admin/posts');
      } catch {}

      return NextResponse.json({ success: true, action, count: res.changes });
    }

    if (action === 'delete') {
      for (const id of ids) {
        const p = getPostById(id);
        await deleteDynamicPostFromBlob(id, p?.slug);
      }
      const stmt = db.prepare(`DELETE FROM posts WHERE id IN (${placeholders})`);
      const res = stmt.run(...ids);

      try {
        revalidatePath('/');
        revalidatePath('/post');
        revalidatePath('/admin/posts');
      } catch {}

      return NextResponse.json({ success: true, action, count: res.changes });
    }

    return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
  } catch (error: any) {
    console.error('Bulk action error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
