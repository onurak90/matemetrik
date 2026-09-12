'use client';

import React, { useEffect, useState } from 'react';
import { List, ChevronDown, Hash } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Scan article headers
    const article = document.querySelector('article .prose');
    if (!article) return;

    const elements = Array.from(article.querySelectorAll('h2, h3'));
    if (elements.length < 2) {
      // Don't render TOC if less than 2 headings
      return;
    }

    const items: TocItem[] = elements.map((el, index) => {
      let id = el.getAttribute('id');
      if (!id) {
        // Generate safe slug id
        const cleanText = el.textContent || `bolum-${index + 1}`;
        id = cleanText
          .toLowerCase()
          .replace(/[^a-z0-9ğüşıöç]+/g, '-')
          .replace(/^-+|-+$/g, '') || `bolum-${index + 1}`;
        el.setAttribute('id', id);
      }
      return {
        id,
        text: el.textContent || '',
        level: el.tagName.toLowerCase() === 'h2' ? 2 : 3,
      };
    });

    setHeadings(items);

    // Scroll spy for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -60% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length < 2) return null;

  const scrollToHeading = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      aria-label="İçindekiler Tablosu"
      className="mb-8 p-5 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200/90 shadow-sm"
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2.5 font-bold text-slate-900 text-sm">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <List className="w-4 h-4" />
          </div>
          <span>İçindekiler ({headings.length} Başlık)</span>
        </div>
        <button
          type="button"
          className="text-xs text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-800"
        >
          <span>{isOpen ? 'Gizle' : 'Göster'}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {isOpen && (
        <ul className="mt-4 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
          {headings.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`${
                  item.level === 3 ? 'pl-4 sm:pl-5 text-slate-600' : 'text-slate-800 font-medium'
                }`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => scrollToHeading(e, item.id)}
                  className={`inline-flex items-center gap-1.5 hover:text-indigo-600 transition-colors py-0.5 ${
                    isActive ? 'text-indigo-600 font-bold' : ''
                  }`}
                >
                  <Hash className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
