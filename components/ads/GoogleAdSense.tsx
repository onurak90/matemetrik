'use client';

import React, { useEffect } from 'react';

interface GoogleAdSenseProps {
  client?: string;
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export default function GoogleAdSense({
  client = 'ca-pub-0247925049589800',
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: GoogleAdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      // ignore
    }
  }, []);

  return (
    <div className={`my-6 text-center overflow-hidden not-prose ${className}`}>
      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
        Sponsorlu Bağlantı
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot || ''}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
