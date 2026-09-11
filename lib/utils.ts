export function slugify(text: string): string {
  // Wix artifact fix: i-lk -> ilk, i-cin -> icin, i-fadeler -> ifadeler
  let s = text.replace(/(^|-)i-([a-zğüşıöç])/gi, '$1i$2');
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c',
    'ğ': 'g', 'Ğ': 'g',
    'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o',
    'ş': 's', 'Ş': 's',
    'ü': 'u', 'Ü': 'u',
  };

  s = s.replace(/[çğlıöşüÇĞİÖŞÜ]/g, (char) => trMap[char] || char);
  s = s.toLowerCase();
  s = s.replace(/[^a-z0-9\s-]/g, '');
  s = s.replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '');
  return s || 'yazi';
}

export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Yeni';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) {
      return dateString; // return raw if not ISO
    }
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}

export function estimateReadingTime(content: string): string {
  const plainText = content.replace(/<[^>]+>/g, ' ');
  const words = plainText.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} dk okuma`;
}

export function truncateText(text: string, length: number = 160): string {
  if (!text) return '';
  const clean = text.replace(/<[^>]+>/g, '').trim();
  if (clean.length <= length) return clean;
  return clean.slice(0, length).trim() + '...';
}
