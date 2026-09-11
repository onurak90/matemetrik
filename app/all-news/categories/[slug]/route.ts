import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  // clean slug if needed
  let cleanSlug = slug.replace('-1', '').replace('-2', '');
  return NextResponse.redirect(new URL(`/kategori/${cleanSlug}`, request.url), 301);
}
