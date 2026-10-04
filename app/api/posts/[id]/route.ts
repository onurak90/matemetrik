import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb, getPostById, updatePost, deletePost } from '@/lib/db';
import { syncBlobPostsIntoDb, saveDynamicPostToBlob, deleteDynamicPostFromBlob } from '@/lib/blobSync';
import { slugify } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    let post = getPostById(id);

    // If not found in local container's SQLite, attempt sync from Blob
    if (!post) {
      await syncBlobPostsIntoDb(getDb(), true);
      post = getPostById(id);
    }

    if (!post) {
      return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const updateData: any = { ...body };
    if (body.slug) {
      updateData.slug = slugify(body.slug);
    }
    if (body.category && !body.category_slug) {
      updateData.category_slug = slugify(body.category);
    }

    let updated = updatePost(id, updateData);

    // If post wasn't in this container's SQLite yet, sync from Blob and retry update
    if (!updated) {
      await syncBlobPostsIntoDb(getDb(), true);
      updated = updatePost(id, updateData);
    }

    if (!updated) {
      return NextResponse.json({ error: 'Yazı bulunamadı' }, { status: 404 });
    }

    // Persist changes to Vercel Blob so all containers see it permanently!
    await saveDynamicPostToBlob(updated);

    // Purge edge caches immediately so the live URL works with 0 latency
    try {
      revalidatePath(`/post/${updated.slug}`);
      revalidatePath('/');
      revalidatePath('/post');
      revalidatePath('/admin/posts');
    } catch {}

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const existing = getPostById(id);
    const deleted = deletePost(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Yazı bulunamadı veya silinemedi' }, { status: 404 });
    }

    // Delete from Vercel Blob persistent store
    await deleteDynamicPostFromBlob(id, existing?.slug);

    try {
      if (existing?.slug) {
        revalidatePath(`/post/${existing.slug}`);
      }
      revalidatePath('/');
      revalidatePath('/post');
      revalidatePath('/admin/posts');
    } catch {}

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
