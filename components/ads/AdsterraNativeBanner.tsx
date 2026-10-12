'use client';

import React, { useEffect, useRef } from 'react';

interface AdsterraNativeBannerProps {
  className?: string;
}

export default function AdsterraNativeBanner({ className = '' }: AdsterraNativeBannerProps) {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = adContainerRef.current;
    if (!container) return;

    // Avoid duplicate script injection
    if (container.querySelector('script[src*="40c994d17800e7ced5141453d33b52a1"]')) {
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://bauval.org/21/40c994d17800e7ced5141453d33b52a1';

    container.appendChild(script);
  }, []);

  return (
    <div className={`my-8 py-4 border-y border-slate-100 dark:border-slate-800 text-center ${className}`}>
      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-2">
        Sponsorlu Bağlantılar
      </div>
      <div
        ref={adContainerRef}
        className="w-full flex flex-col items-center justify-center min-h-[90px] overflow-hidden"
      >
        <div id="container-40c994d17800e7ced5141453d33b52a1" className="w-full" />
      </div>
    </div>
  );
}
