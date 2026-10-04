import { NextRequest, NextResponse } from 'next/server';
import { getCrawledNews, deleteCrawledNewsItem, getPostById, deletePost } from '@/lib/db';
import { deleteDynamicPostFromBlob } from '@/lib/blobSync';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)));
    const history = getCrawledNews(limit);
    return NextResponse.json({
      success: true,
      history,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '0', 10);
    const deletePostFlag = searchParams.get('deletePost') === 'true';

    if (!id) {
      return NextResponse.json({ error: 'Geçersiz ID' }, { status: 400 });
    }

    const history = getCrawledNews(200);
    const target = history.find((h) => h.id === id);

    if (deletePostFlag && target && target.post_id) {
      const existing = getPostById(target.post_id);
      deletePost(target.post_id);
      await deleteDynamicPostFromBlob(target.post_id, existing?.slug);
      try {
        if (existing?.slug) revalidatePath(`/post/${existing.slug}`);
        revalidatePath('/');
        revalidatePath('/post');
        revalidatePath('/admin/posts');
      } catch {}
    }

    deleteCrawledNewsItem(id, false);

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
