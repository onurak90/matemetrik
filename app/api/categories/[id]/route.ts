import { NextRequest, NextResponse } from 'next/server';
import { deleteCategory } from '@/lib/db';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const deleted = deleteCategory(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Kategori bulunamadı' }, { status: 404 });
    }
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
