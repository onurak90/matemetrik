const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const Database = require('better-sqlite3');

async function main() {
  const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
  const dbPath = path.join(__dirname, '..', 'data', 'matemetrik.db');

  if (!fs.existsSync(uploadsDir)) {
    console.error('Uploads directory not found:', uploadsDir);
    return;
  }

  const db = new Database(dbPath);
  const files = fs.readdirSync(uploadsDir);

  console.log(`Starting conversion of images in ${uploadsDir}...`);
  let convertedCount = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const base = path.basename(file, ext);
      const inputPath = path.join(uploadsDir, file);
      const outputPath = path.join(uploadsDir, `${base}.webp`);

      try {
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .toFile(outputPath);

        fs.unlinkSync(inputPath);
        convertedCount++;
        console.log(`Converted: ${file} -> ${base}.webp`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }

  console.log(`Successfully converted ${convertedCount} images to WebP!`);

  // Download and convert external images if any
  const externalPosts = db.prepare("SELECT id, featured_image FROM posts WHERE featured_image LIKE 'http%'").all();
  for (const post of externalPosts) {
    try {
      console.log(`Downloading external image for post ${post.id}: ${post.featured_image}`);
      const res = await fetch(post.featured_image, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        const filename = `external_${post.id}.webp`;
        const outputPath = path.join(uploadsDir, filename);
        await sharp(buffer).webp({ quality: 85, effort: 6 }).toFile(outputPath);
        db.prepare("UPDATE posts SET featured_image = ? WHERE id = ?").run(`/uploads/${filename}`, post.id);
        console.log(`Saved and updated external image for post ${post.id} -> /uploads/${filename}`);
      }
    } catch (e) {
      console.warn(`Could not download external image for post ${post.id}:`, e.message);
    }
  }

  // Update posts table
  console.log('Updating database references to .webp...');
  const posts = db.prepare("SELECT id, featured_image, content FROM posts").all();
  const updateStmt = db.prepare("UPDATE posts SET featured_image = ?, content = ? WHERE id = ?");

  let updatedFeatured = 0;
  let updatedContent = 0;

  const updateTx = db.transaction(() => {
    for (const p of posts) {
      let changed = false;
      let newFeatured = p.featured_image;
      let newContent = p.content;

      if (newFeatured && typeof newFeatured === 'string') {
        const updatedF = newFeatured.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        if (updatedF !== newFeatured) {
          newFeatured = updatedF;
          changed = true;
          updatedFeatured++;
        }
      }

      if (newContent && typeof newContent === 'string') {
        const updatedC = newContent.replace(/\/uploads\/([a-zA-Z0-9_\-\.]+)\.(jpg|jpeg|png)/gi, '/uploads/$1.webp');
        if (updatedC !== newContent) {
          newContent = updatedC;
          changed = true;
          updatedContent++;
        }
      }

      if (changed) {
        updateStmt.run(newFeatured, newContent, p.id);
      }
    }
  });

  updateTx();

  db.pragma('wal_checkpoint(TRUNCATE)');
  db.close();

  console.log(`Finished! Updated ${updatedFeatured} featured images and ${updatedContent} post contents.`);
}

main().catch(console.error);
