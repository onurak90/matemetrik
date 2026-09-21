import React from 'react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import CookieConsent from '@/components/common/CookieConsent';
import AnalyticsTracker from '@/components/common/AnalyticsTracker';
import CopyAttribution from '@/components/common/CopyAttribution';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnalyticsTracker />
      <CopyAttribution />
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
