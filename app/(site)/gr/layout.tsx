import React from 'react';
import type { Metadata } from 'next';
import GreekNavbar from '@/components/gr/GreekNavbar';
import GreekFooter from '@/components/gr/GreekFooter';

export const metadata: Metadata = {
  title: {
    default: 'Matemetrik.gr | Σχολικά Βιβλία, Λυσάρια & Απαντήσεις ebooks.edu.gr',
    template: '%s | Matemetrik.gr',
  },
  description:
    'Αναλυτικές λύσεις και απαντήσεις σχολικών βιβλίων Δημοτικού, Γυμνασίου και Λυκείου. Βοηθήματα, ασκήσεις ανά σελίδα και επίσημα βιβλία PDF από το ebooks.edu.gr.',
  keywords: [
    'λυσαρια',
    'σχολικα βιβλια λυσεις',
    'απαντησεις σχολικων βιβλιων',
    'μαθηματικα στ δημοτικου λυσεις',
    'αλγεβρα α λυκειου λυσεις',
    'ebooks edu gr',
    'βοηθηματα δημοτικου',
    'βοηθηματα γυμνασιου',
    'βοηθηματα λυκειου',
    'ψηφιακο σχολειο',
  ],
  alternates: {
    canonical: 'https://www.matemetrik.com/gr',
  },
  openGraph: {
    locale: 'el_GR',
    type: 'website',
    url: 'https://www.matemetrik.com/gr',
    title: 'Matemetrik.gr | Σχολικά Βιβλία, Λυσάρια & Απαντήσεις',
    description:
      'Βρείτε όλες τις λύσεις των σχολικών βιβλίων Δημοτικού, Γυμνασίου και Λυκείου βήμα προς βήμα.',
    siteName: 'Matemetrik.gr',
  },
};

export default function GreekRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <GreekNavbar />
      <main className="flex-1">
        {children}
      </main>
      <GreekFooter />
    </div>
  );
}
