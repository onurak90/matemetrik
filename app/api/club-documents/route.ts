import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

let cachedClubs: any[] | null = null;

function loadClubs(): any[] {
  if (!cachedClubs) {
    const filePath = path.join(process.cwd(), 'data', 'club-documents.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      cachedClubs = JSON.parse(content);
    } else {
      cachedClubs = [];
    }
  }
  return cachedClubs || [];
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const clubId = searchParams.get('id');

    const clubs = loadClubs();

    if (clubId) {
      const club = clubs.find((c) => c.id === clubId);
      if (!club) {
        return NextResponse.json({ error: 'Kulüp bulunamadı' }, { status: 404 });
      }
      return NextResponse.json(club);
    }

    // Return catalog list
    const catalog = clubs.map((c) => ({
      id: c.id,
      name: c.name,
      filename: c.filename,
      hasTuzuk: (c.tuzukParas || []).length > 0,
      hasToplanti: (c.toplantiParas || []).length > 0,
      hasPlan: (c.planParas || []).length > 0,
      hasFaaliyet: (c.faaliyetTable || []).length > 0,
    }));

    return NextResponse.json({
      total: catalog.length,
      clubs: catalog,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
