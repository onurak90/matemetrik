import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, COOKIE_NAME } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Kullanıcı adı ve parola zorunludur' },
        { status: 400 }
      );
    }

    const isValid = verifyCredentials(username.trim(), password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Geçersiz kullanıcı adı veya parola' },
        { status: 401 }
      );
    }

    const token = createSessionToken(username.trim());
    const response = NextResponse.json({ success: true, redirect: '/admin' });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
