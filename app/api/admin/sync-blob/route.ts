import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { fetchAllDynamicPostsFromBlob, syncBlobPostsIntoDb } from '@/lib/blobSync';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const db = getDb();
    const count = await syncBlobPostsIntoDb(db, true);
    const dynamicPosts = await fetchAllDynamicPostsFromBlob();

    return NextResponse.json({
      success: true,
      syncedCount: count,
      totalDynamicInBlob: dynamicPosts.length,
      posts: dynamicPosts.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        is_published: p.is_published,
        created_at: p.created_at,
        updated_at: p.updated_at,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
