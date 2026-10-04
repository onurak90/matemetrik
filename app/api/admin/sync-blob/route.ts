import { NextRequest, NextResponse } from 'next/server';
import { getDb, getCrawledNews, getPostById } from '@/lib/db';
import {
  fetchAllDynamicPostsFromBlob,
  syncBlobPostsIntoDb,
  saveDynamicPostToBlob,
  saveCrawledNewsToBlob,
} from '@/lib/blobSync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

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

export async function POST(request: NextRequest) {
  try {
    const crawledItems = getCrawledNews(100);
    let syncedPosts = 0;
    let syncedNews = 0;

    for (const item of crawledItems) {
      if (item.post_id) {
        const post = getPostById(item.post_id);
        if (post) {
          await saveDynamicPostToBlob(post);
          syncedPosts++;
        }
      }

      await saveCrawledNewsToBlob({
        id: item.id,
        source_url: item.source_url,
        source_title: item.source_title,
        source_site: item.source_site,
        source_image: item.source_image,
        post_id: item.post_id,
        post_slug: item.post_slug,
        status: item.status,
        created_at: item.created_at,
        current_title: item.current_title,
        post_published: item.post_published,
        post_views: item.post_views,
      });
      syncedNews++;
    }

    return NextResponse.json({
      success: true,
      syncedPosts,
      syncedNews,
      totalCrawled: crawledItems.length,
    });
  } catch (error: any) {
    console.error('[SyncBlob POST Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
