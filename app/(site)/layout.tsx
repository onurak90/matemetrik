import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import StickyContactCta from '@/components/ui/StickyContactCta';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <div className="print:hidden">
        <Footer />
        <StickyContactCta />
      </div>
    </div>
  );
}
