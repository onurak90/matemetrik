import React from 'react';

interface GreekBookCoverProps {
  gradeName: string;
  subject: string;
  bookType?: string;
  themeColor?: string;
  className?: string;
}

export default function GreekBookCover({
  gradeName,
  subject,
  bookType = 'Βιβλίο Μαθητή',
  themeColor = '#1d4ed8',
  className = 'w-full h-auto aspect-[3/4]',
}: GreekBookCoverProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between p-4 text-white font-sans select-none ${className}`}
      style={{
        background: `linear-gradient(145deg, ${themeColor} 0%, #0f172a 100%)`,
      }}
    >
      {/* Background Graphic Watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
        <span className="text-[120px] font-black tracking-tighter">&pi;</span>
      </div>

      {/* Top Header: Official Ministry Style */}
      <div className="relative z-10 border-b border-white/20 pb-2 space-y-0.5">
        <div className="text-[9px] font-bold tracking-widest text-blue-200 uppercase">
          ΥΠΟΥΡΓΕΙΟ ΠΑΙΔΕΙΑΣ &bull; ΙΕΠ
        </div>
        <div className="text-[8px] font-medium text-white/80">
          ΙΤΥΕ «ΔΙΟΦΑΝΤΟΣ» &bull; ebooks.edu.gr
        </div>
      </div>

      {/* Middle: Subject & Grade Title */}
      <div className="relative z-10 my-auto py-4 space-y-2 text-center">
        <div className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] font-black tracking-wide text-white border border-white/30">
          {gradeName.toUpperCase()}
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-md">
          {subject}
        </h3>

        <div className="text-xs font-bold text-blue-200 tracking-wide uppercase">
          {bookType}
        </div>
      </div>

      {/* Bottom Footer: Official Digital Badge */}
      <div className="relative z-10 border-t border-white/20 pt-2 flex items-center justify-between text-[8px] text-white/90">
        <span className="font-bold">ΕΓΚΕΚΡΙΜΕΝΗ ΕΚΔΟΣΗ</span>
        <span className="bg-white/20 px-1.5 py-0.5 rounded font-mono font-bold">2026-2027</span>
      </div>
    </div>
  );
}
