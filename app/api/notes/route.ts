import { NextRequest, NextResponse } from 'next/server';
import { getAdminNotes, createAdminNote } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const notes = getAdminNotes();
    return NextResponse.json(notes);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, priority, due_date } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Başlık zorunludur' }, { status: 400 });
    }

    const note = createAdminNote({
      title: title.trim(),
      content: content?.trim() || '',
      priority: priority || 'normal',
      due_date: due_date || '',
    });

    return NextResponse.json(note, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
