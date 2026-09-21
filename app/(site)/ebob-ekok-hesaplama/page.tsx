import React from 'react';
import type { Metadata } from 'next';
import { CALCULATORS_REGISTRY } from '@/lib/calculatorsData';
import CalculatorWrapper from '@/components/calculators/CalculatorWrapper';
import EbobEkokCalculator from '@/components/calculators/EbobEkokCalculator';

const meta = CALCULATORS_REGISTRY['ebob-ekok-hesaplama'];

export const metadata: Metadata = {
  title: meta.seoTitle,
  description: meta.seoDescription,
  keywords: meta.keywords,
  alternates: {
    canonical: `https://www.matemetrik.com/${meta.slug}`,
  },
  openGraph: {
    title: meta.seoTitle,
    description: meta.seoDescription,
    url: `https://www.matemetrik.com/${meta.slug}`,
    type: 'website',
  },
};

export default function EbobEkokHesaplamaPage() {
  const jsonLdApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: meta.seoTitle,
    description: meta.seoDescription,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'All',
    url: `https://www.matemetrik.com/${meta.slug}`,
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <CalculatorWrapper meta={meta}>
        <EbobEkokCalculator />
      </CalculatorWrapper>
    </>
  );
}
