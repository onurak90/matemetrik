import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import ContentProtection from '@/components/security/ContentProtection';
import CookieConsent from '@/components/common/CookieConsent';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <ContentProtection />
      <div className="print:hidden">
        <Navbar />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <div className="print:hidden">
        <Footer />
        <CookieConsent />
      </div>
    </div>
  );
}

