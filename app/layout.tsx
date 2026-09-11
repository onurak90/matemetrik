import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.matemetrik.com'),
  title: {
    default: 'Matemetrik | Matematik, MEB Ders Kitabı Cevapları ve Öğretmen Araçları',
    template: '%s | Matemetrik',
  },
  description: '1. sınıftan 12. sınıfa kadar tüm kademeler için MEB matematik ders kitabı çözümleri, konu anlatımları, karne görüşü robotu ve sınav hazırlık platformu.',
  keywords: ['matematik', 'meb ders kitabı cevapları', '10. sınıf matematik', '9. sınıf matematik', 'karne görüşü üreticisi', 'sınav hazırlama robotu', 'yks matematik', 'lgs matematik'],
  authors: [{ name: 'Onur AK', url: 'https://www.matemetrik.com' }],
  creator: 'Matemetrik',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.matemetrik.com',
    siteName: 'Matemetrik',
    title: 'Matemetrik | Matematik ve Eğitim Portalı',
    description: 'MEB ders kitabı çözümleri, konu anlatımları, öğretmen karne görüşü robotu ve sınav hazırlık platformu.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matemetrik | Matematik ve Eğitim Portalı',
    description: 'MEB ders kitabı çözümleri ve matematik eğitim platformu.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased bg-slate-50 text-slate-900 min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
