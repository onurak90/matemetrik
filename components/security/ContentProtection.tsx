'use client';

import React, { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ShieldAlert } from 'lucide-react';

export default function ContentProtection() {
  const pathname = usePathname();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(msg);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  useEffect(() => {
    // Do not enable protection on admin or management login pages
    if (pathname.startsWith('/admin') || pathname.startsWith('/yonetim')) {
      return;
    }

    const isEditable = (el: EventTarget | null): boolean => {
      if (!el || !(el instanceof HTMLElement)) return false;
      const tagName = el.tagName.toUpperCase();
      return (
        tagName === 'INPUT' ||
        tagName === 'TEXTAREA' ||
        el.isContentEditable ||
        el.getAttribute('contenteditable') === 'true'
      );
    };

    // 1. Prevent Right Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast('Sağ tıklama ve içerik kopyalama bu sitede koruma altındadır.');
      return false;
    };

    // 2. Prevent Copy and Cut outside inputs
    const handleCopy = (e: ClipboardEvent) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
        showToast('Metin ve içerik kopyalama koruma altındadır.');
        return false;
      }
    };

    const handleCut = (e: ClipboardEvent) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevent Dragging (images, text)
    const handleDragStart = (e: DragEvent) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    // 4. Prevent Selection outside inputs
    const handleSelectStart = (e: Event) => {
      if (!isEditable(e.target)) {
        e.preventDefault();
        return false;
      }
    };

    // 5. Intercept Inspection & DevTools Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toUpperCase();
      const code = e.code;

      // F12 -> DevTools
      if (key === 'F12' || code === 'F12') {
        e.preventDefault();
        e.stopPropagation();
        showToast('Geliştirici konsolu ve kaynak kod inceleme devre dışıdır.');
        return false;
      }

      // Ctrl/Cmd + Shift + I (DevTools)
      // Ctrl/Cmd + Shift + J (Console)
      // Ctrl/Cmd + Shift + C (Inspect Element)
      // Ctrl/Cmd + Shift + K (Firefox Console)
      if (isCmdOrCtrl && e.shiftKey && ['I', 'J', 'C', 'K'].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        showToast('Öğe denetleme ve kaynak kod inceleme koruma altındadır.');
        return false;
      }

      // Ctrl/Cmd + U (View Page Source)
      if (isCmdOrCtrl && key === 'U') {
        e.preventDefault();
        e.stopPropagation();
        showToast('Sayfa kaynak kodunu görüntüleme devre dışıdır.');
        return false;
      }

      // Ctrl/Cmd + S (Save Page)
      if (isCmdOrCtrl && key === 'S') {
        e.preventDefault();
        e.stopPropagation();
        showToast('Sayfayı kaydetme devre dışıdır.');
        return false;
      }

      // Ctrl/Cmd + C (Copy) outside input
      if (isCmdOrCtrl && key === 'C' && !isEditable(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        showToast('Metin kopyalama devre dışıdır.');
        return false;
      }

      // Ctrl/Cmd + A (Select All) outside input
      if (isCmdOrCtrl && key === 'A' && !isEditable(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 6. Anti-Inspection & DevTools Warning Banner in Console
    const printConsoleWarning = () => {
      try {
        console.clear();
        console.log(
          '%c⛔ DUR!',
          'color: #ef4444; font-size: 38px; font-weight: 900; text-shadow: 2px 2px 0px black;'
        );
        console.log(
          '%cBu sitenin kaynak kodları, telifli içerikleri ve algoritmaları 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında yasal koruma altındadır.\nYetkisiz kaynak kod inceleme, kopyalama ve tersine mühendislik işlemleri yasaktır.',
          'color: #6366f1; font-size: 14px; font-weight: 600; line-height: 1.5;'
        );
      } catch {}
    };

    // Run once on mount
    printConsoleWarning();

    // DevTools resize listener detection
    const handleResize = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        printConsoleWarning();
      }
    };

    // Attach listeners
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('cut', handleCut, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('cut', handleCut, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-slate-900/90 dark:bg-slate-800/95 text-white backdrop-blur-md border border-slate-700/80 shadow-2xl text-xs sm:text-sm font-medium">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
