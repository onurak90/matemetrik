import { NextRequest, NextResponse } from 'next/server';
import { getCommentsByPostId, getAllComments, createComment } from '@/lib/db';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

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
    const { postId, parentId, authorName, authorEmail, authorAvatar, content } = body;

    const sessionToken = request.cookies.get(COOKIE_NAME)?.value;
    const isUserAdmin = verifySessionToken(sessionToken);

    // If admin is commenting/replying
    if (isUserAdmin) {
      if (!postId || !content) {
        return NextResponse.json({ error: 'Yorum içeriği gereklidir.' }, { status: 400 });
      }

      const comment = createComment({
        postId: Number(postId),
        parentId: parentId ? Number(parentId) : null,
        authorName: authorName?.trim() || 'Matemetrik Eğitim & Matematik Zümresi',
        authorEmail: authorEmail?.trim() || 'editor@matemetrik.com',
        authorAvatar: authorAvatar || '',
        content: content.trim(),
        isApproved: 1,
        isAdmin: 1,
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Yönetici cevabınız başarıyla yayınlandı!',
          comment,
        },
        { status: 201 }
      );
    }

    // Regular student/visitor comment
    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: 'Lütfen tüm alanları eksiksiz doldurun.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(authorEmail)) {
      return NextResponse.json(
        { error: 'Lütfen geçerli bir Gmail / e-posta adresi girin.' },
        { status: 400 }
      );
    }

    if (content.trim().length < 2) {
      return NextResponse.json(
        { error: 'Yorum en az 2 karakter olmalıdır.' },
        { status: 400 }
      );
    }

    const comment = createComment({
      postId: Number(postId),
      parentId: parentId ? Number(parentId) : null,
      authorName: authorName.trim(),
      authorEmail: authorEmail.trim(),
      authorAvatar: authorAvatar || '',
      content: content.trim(),
      isApproved: 1, // Auto-approve so discussions and replies show immediately
      isAdmin: 0,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Yorumunuz / cevabınız başarıyla yayınlandı!',
        comment,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

