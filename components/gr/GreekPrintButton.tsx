'use client';

import React from 'react';
import { Printer } from 'lucide-react';

export default function GreekPrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors print:hidden"
    >
      <Printer className="w-3.5 h-3.5" />
      Εκτύπωση
    </button>
  );
}
