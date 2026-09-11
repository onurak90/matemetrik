import { NextRequest, NextResponse } from 'next/server';
import { deleteRedirect } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const deleted = deleteRedirect(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Yönlendirme bulunamadı' }, { status: 404 });
    }
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
