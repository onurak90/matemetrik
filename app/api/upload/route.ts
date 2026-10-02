import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya yüklenmedi' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const parts = ['public', 'uploads'];
    const uploadsDir = path.join(process.cwd(), ...parts);
    let canWrite = true;
    if (!fs.existsSync(uploadsDir)) {
      try {
        fs.mkdirSync(uploadsDir, { recursive: true });
      } catch {
        canWrite = false;
      }
    }

    // sanitize filename and force .webp
    const origName = file.name || 'image.jpg';
    const ext = path.extname(origName) || '.jpg';
    const base = path.basename(origName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${base}_${Date.now()}.webp`;
    const filePath = path.join(uploadsDir, filename);

    // Convert to webp with high efficiency (resizing to max 1200px width)
    const webpBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer();

    if (canWrite) {
      try {
        fs.writeFileSync(filePath, webpBuffer);
        const url = `/uploads/${filename}`;
        return NextResponse.json({ url, filename });
      } catch {}
    }

    // Serverless fallback: return data URI
    const dataUri = `data:image/webp;base64,${webpBuffer.toString('base64')}`;
    return NextResponse.json({ url: dataUri, filename });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET media gallery list
export async function GET() {
  try {
    const parts = ['public', 'uploads'];
    const uploadsDir = path.join(process.cwd(), ...parts);
    if (!fs.existsSync(uploadsDir)) {
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(uploadsDir).filter((f) => !f.startsWith('.'));
    const media = files.map((filename) => {
      const stats = fs.statSync(path.join(uploadsDir, filename));
      return {
        filename,
        url: `/uploads/${filename}`,
        size: stats.size,
        created_at: stats.mtime.toISOString(),
      };
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json(media);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
