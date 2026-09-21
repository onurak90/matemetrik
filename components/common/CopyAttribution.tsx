'use client';

import { useEffect } from 'react';

/**
 * CopyAttribution:
 * When users copy text from articles, book answers, or YDS questions,
 * this hook appends a canonical source attribution backlink.
 * When pasted into forums (DonanımHaber, Memurlar.net, blogs), it creates natural backlinks.
 */
export default function CopyAttribution() {
  useEffect(() => {
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const selectedText = selection.toString().trim();
      // Only attach attribution for substantial copy operations (> 70 characters)
      if (selectedText.length < 70) return;

      const pageUrl = window.location.href;
      const pageTitle = document.title.split('|')[0].trim() || 'Matemetrik';
      const attribution = `\n\nKaynak: ${pageUrl} - ${pageTitle} (Matemetrik Eğitim Platformu)`;

      const textWithAttribution = selectedText + attribution;

      if (e.clipboardData) {
        e.clipboardData.setData('text/plain', textWithAttribution);
        e.preventDefault();
      }
    };

    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  return null;
}
