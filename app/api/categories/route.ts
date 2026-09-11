import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/db';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const categories = getCategories();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name) {
      return NextResponse.json({ error: 'Kategori adı zorunludur' }, { status: 400 });
    }
    const slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const newCat = createCategory({
      name: body.name,
      slug,
      description: body.description || '',
      icon: body.icon || 'Folder',
      color: body.color || 'indigo',
    });
    return NextResponse.json(newCat, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
