import { NextRequest, NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const publishedOnly = searchParams.get('all') === 'true' ? false : true;

    const data = getPosts({ page, limit, category, search, publishedOnly });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Başlık ve içerik zorunludur' }, { status: 400 });
    }

    const cleanSlug = body.slug ? slugify(body.slug) : slugify(body.title);
    const newPost = createPost({
      title: body.title,
      slug: cleanSlug,
      old_slug: body.old_slug || undefined,
      excerpt: body.excerpt || '',
      content: body.content,
      featured_image: body.featured_image || '',
      category: body.category || 'Genel',
      category_slug: body.category_slug || slugify(body.category || 'Genel'),
      tags: body.tags || [],
      author: body.author || 'Matemetrik',
      is_published: body.is_published !== undefined ? body.is_published : 1,
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
