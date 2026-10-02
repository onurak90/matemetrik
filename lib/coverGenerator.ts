import path from 'path';
import fs from 'fs';

interface GenerateCoverOptions {
  title: string;
  category?: string;
  slug: string;
}

function escapeXml(unsafe: string): string {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function wrapText(text: string, maxCharsPerLine: number = 32, maxLines: number = 3): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
    if (lines.length >= maxLines) break;
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  // If text exceeded maxLines, add ellipsis to last line
  if (lines.length === maxLines && words.length > lines.join(' ').split(/\s+/).length) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, maxCharsPerLine - 3) + '...';
  }

  return lines;
}

export async function generateCoverImage({
  title,
  category = 'Matematik & Eğitim',
  slug,
}: GenerateCoverOptions): Promise<string> {
  try {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      try {
        fs.mkdirSync(uploadsDir, { recursive: true });
      } catch {
        return '/og.jpg';
      }
    }

    const cleanSlug = slug.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const filename = `cover-${cleanSlug}.webp`;
    const filePath = path.join(uploadsDir, filename);

    // Dynamic import sharp to avoid breaking serverless if native binary is mismatched
    let sharpModule: any;
    try {
      sharpModule = (await import('sharp')).default;
    } catch {
      return '/og.jpg';
    }

  const lines = wrapText(title, 32, 3);
  const tspans = lines
    .map((line, idx) => `<tspan x="100" dy="${idx === 0 ? '0' : '1.28em'}">${escapeXml(line)}</tspan>`)
    .join('');

  const displayCategory = category.toUpperCase();
  const badgeWidth = Math.max(140, displayCategory.length * 10.5 + 40);

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="45%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>

    <radialGradient id="radialIndigo" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.32" />
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
    </radialGradient>

    <radialGradient id="radialCyan" cx="15%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>

    <linearGradient id="bottomAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="40%" stop-color="#818cf8" />
      <stop offset="70%" stop-color="#ec4899" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>

    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="100%" stop-color="#4338ca" />
    </linearGradient>

    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Base Gradient -->
  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#radialIndigo)" />
  <rect width="1200" height="630" fill="url(#radialCyan)" />

  <!-- Subtle Math Grid Background -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="500" y1="0" x2="500" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1100" y1="0" x2="1100" y2="630" />
    <line x1="0" y1="150" x2="1200" y2="150" />
    <line x1="0" y1="315" x2="1200" y2="315" />
    <line x1="0" y1="480" x2="1200" y2="480" />
  </g>

  <!-- Large Math Watermark Symbols -->
  <g font-family="system-ui, -apple-system, sans-serif" font-weight="900" fill="#ffffff" opacity="0.05">
    <text x="860" y="240" font-size="180">π</text>
    <text x="960" y="440" font-size="140">∑</text>
    <text x="740" y="550" font-size="130">√x</text>
    <text x="1060" y="160" font-size="100">∞</text>
    <text x="710" y="320" font-size="90">f(x)</text>
    <text x="920" y="600" font-size="80">Δy</text>
  </g>

  <!-- Category Badge -->
  <g transform="translate(100, 105)" filter="url(#shadow)">
    <rect width="${badgeWidth}" height="38" rx="19" fill="url(#badgeGrad)" stroke="#818cf8" stroke-width="1.5" />
    <text x="20" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" letter-spacing="1">
      ${escapeXml(displayCategory)}
    </text>
  </g>

  <!-- Title Text -->
  <text x="100" y="235" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="900" fill="#ffffff" letter-spacing="-0.8" filter="url(#shadow)">
    ${tspans}
  </text>

  <!-- Footer Branding -->
  <g transform="translate(100, 510)">
    <rect width="44" height="44" rx="12" fill="#4f46e5" filter="url(#shadow)" />
    <text x="14" y="31" font-family="serif" font-size="26" font-weight="bold" fill="#ffffff">π</text>
    <text x="56" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="bold" fill="#ffffff">matemetrik<tspan fill="#818cf8">.com</tspan></text>
    <text x="56" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#94a3b8" letter-spacing="1.2">YENİ NESİL MATEMATİK &amp; EĞİTİM PORTALI</text>
  </g>

  <!-- Verification Pill Right -->
  <g transform="translate(920, 522)">
    <rect width="180" height="32" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1" opacity="0.8" />
    <text x="16" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="bold" fill="#38bdf8">✓ %100 MEB UYUMLU</text>
  </g>

  <!-- Accent Bottom Border Line -->
  <rect x="0" y="622" width="1200" height="8" fill="url(#bottomAccent)" />
</svg>
`;

    await sharpModule(Buffer.from(svg)).webp({ quality: 85, effort: 6 }).toFile(filePath);
    return `/uploads/${filename}`;
  } catch (err) {
    console.warn('Cover generation failed, fallback to /og.jpg:', err);
    return '/og.jpg';
  }
}
