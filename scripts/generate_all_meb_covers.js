const { createCoverImage } = require('./cover_helper');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

async function run() {
  const db = new Database(path.join(__dirname, '..', 'data', 'matemetrik.db'));
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');

  const rows = db.prepare(`
    SELECT slug, title, category 
    FROM posts 
    WHERE (slug LIKE '%meb%' OR title LIKE '%MEB%' OR slug LIKE '%-sinif-%')
  `).all();

  console.log(`Found ${rows.length} relevant posts. Checking missing covers...`);
  let count = 0;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const coverPath = path.join(uploadsDir, `cover-${r.slug}.webp`);
    if (!fs.existsSync(coverPath)) {
      try {
        await createCoverImage(r.title, r.category || 'MEB ÇÖZÜMLERİ', r.slug);
        count++;
        if (count % 25 === 0) {
          console.log(`Generated ${count} covers... (current: ${r.slug})`);
        }
      } catch (e) {
        console.error(`Failed to generate cover for ${r.slug}:`, e.message);
      }
    }
  }
  console.log(`Finished generating ${count} new cover images!`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
