import { NextRequest, NextResponse } from 'next/server';
import { getCommentsByPostId, getAllComments, createComment } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    const filter = searchParams.get('filter') as 'all' | 'pending' | 'approved' | null;

    if (postId) {
      const approvedOnly = searchParams.get('approvedOnly') !== 'false';
      const comments = getCommentsByPostId(Number(postId), approvedOnly);
      return NextResponse.json(comments);
    }

    const comments = getAllComments(filter || 'all');
    return NextResponse.json(comments);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, authorName, authorEmail, authorAvatar, content } = body;

    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları eksiksiz doldurun.' },
        { status: 400 }
      );
    }

    // Email check (should be valid email, preferably gmail)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir Gmail / e-posta adresi girin.' },
        { status: 400 }
      );
    }

    if (content.trim().length < 3) {
      return NextResponse.json(
        { error: 'Yorum en az 3 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    const comment = createComment({
      postId: Number(postId),
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      authorAvatar: authorAvatar || '',
      content: content.trim(),
      isApproved: 0, // Pending approval
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Yorumunuz başarıyla alındı! Yönetici onayından sonra burada yayınlanacaktır.',
        comment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
