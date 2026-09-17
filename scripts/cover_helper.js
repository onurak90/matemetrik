const sharp = require('sharp');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '..', 'data', 'matemetrik.db');
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

function wrapText(text, maxCharsPerLine = 32, maxLines = 3) {
  const words = text.split(/\s+/);
  const lines = [];
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

  if (lines.length === maxLines && words.length > lines.join(' ').split(/\s+/).length) {
    lines[maxLines - 1] = lines[maxLines - 1].slice(0, maxCharsPerLine - 3) + '...';
  }

  return lines;
}

async function createCoverImage(title, category, slug) {
  const filename = `cover-${slug}.webp`;
  const filePath = path.join(UPLOADS_DIR, filename);

  const lines = wrapText(title, 30, 3);
  const tspans = lines
    .map((line, idx) => `<tspan x="100" dy="${idx === 0 ? '0' : '1.28em'}">${escapeXml(line)}</tspan>`)
    .join('');

  const displayCategory = (category || 'MATEMATİK').toUpperCase();
  const badgeWidth = Math.max(160, displayCategory.length * 11 + 44);

  const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e1b4b" />
    </linearGradient>
    <radialGradient id="radialIndigo" cx="80%" cy="25%" r="60%">
      <stop offset="0%" stop-color="#4f46e5" stop-opacity="0.38" />
      <stop offset="100%" stop-color="#4f46e5" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="radialCyan" cx="15%" cy="85%" r="50%">
      <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="bottomAccent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="35%" stop-color="#06b6d4" />
      <stop offset="70%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#3730a3" />
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)" />
  <rect width="1200" height="630" fill="url(#radialIndigo)" />
  <rect width="1200" height="630" fill="url(#radialCyan)" />

  <g opacity="0.04" stroke="#ffffff" stroke-width="1">
    <line x1="100" y1="0" x2="100" y2="630" />
    <line x1="300" y1="0" x2="300" y2="630" />
    <line x1="500" y1="0" x2="500" y2="630" />
    <line x1="700" y1="0" x2="700" y2="630" />
    <line x1="900" y1="0" x2="900" y2="630" />
    <line x1="1100" y1="0" x2="1100" y2="630" />
    <line x1="0" y1="120" x2="1200" y2="120" />
    <line x1="0" y1="240" x2="1200" y2="240" />
    <line x1="0" y1="360" x2="1200" y2="360" />
    <line x1="0" y1="480" x2="1200" y2="480" />
  </g>

  <g opacity="0.07" fill="#ffffff">
    <text x="1000" y="220" font-family="monospace" font-size="140" font-weight="900">∑</text>
    <text x="880" y="460" font-family="monospace" font-size="120" font-weight="900">∫</text>
    <text x="1060" y="520" font-family="monospace" font-size="90" font-weight="900">π</text>
    <text x="820" y="160" font-family="monospace" font-size="90" font-weight="900">√</text>
  </g>

  <rect x="100" y="90" width="${badgeWidth}" height="42" rx="21" fill="url(#badgeGrad)" />
  <text x="${100 + badgeWidth / 2}" y="117" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="1.5">
    ${escapeXml(displayCategory)}
  </text>

  <text x="100" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="52" font-weight="900" fill="#ffffff" line-height="1.28">
    ${tspans}
  </text>

  <g transform="translate(100, 520)">
    <circle cx="20" cy="20" r="20" fill="#4f46e5" />
    <text x="20" y="27" font-family="system-ui, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">M</text>
    <text x="52" y="20" font-family="system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff">matemetrik.com</text>
    <text x="52" y="38" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">Yazar: Cavenaghi • 2026-2027 MEB &amp; Sınav Rehberi</text>
  </g>

  <rect x="0" y="622" width="1200" height="8" fill="url(#bottomAccent)" />
</svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 85 })
    .toFile(filePath);

  return `/uploads/${filename}`;
}

module.exports = {
  db,
  createCoverImage,
};
