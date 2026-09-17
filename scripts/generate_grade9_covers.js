const { createCoverImage } = require('./cover_helper');
const fs = require('fs');
const path = require('path');

async function run() {
  const metaFile = path.join(__dirname, '..', 'data', 'grade9_pages_extracted.json');
  const pages = JSON.parse(fs.readFileSync(metaFile, 'utf8'));

  console.log(`Generating cover for master post...`);
  await createCoverImage(
    '2026-2027 MEB Matematik Ders Kitabı Cevapları',
    '9. SINIF MATEMATİK',
    '2026-2027-meb-matematik-ders-kitabi-cevaplari'
  );

  console.log(`Generating covers for ${pages.length} individual pages...`);
  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const shortTopic = p.type || 'Soru Çözümleri';
    const title = `9. Sınıf Matematik Sayfa ${p.page} Cevapları (${shortTopic})`;
    await createCoverImage(
      title,
      '9. SINIF • ' + p.tema.split(':')[0],
      p.slug
    );
    if ((i + 1) % 10 === 0 || i === pages.length - 1) {
      console.log(`Cover progress: ${i + 1} / ${pages.length}`);
    }
  }

  console.log('All 69 cover images successfully generated in public/uploads/!');
}

run().catch(err => {
  console.error('Error generating covers:', err);
  process.exit(1);
});
