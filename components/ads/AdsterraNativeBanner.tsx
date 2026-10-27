'use client';

import React from 'react';
import GoogleAdSense from './GoogleAdSense';

interface AdsterraNativeBannerProps {
  className?: string;
}

export default function AdsterraNativeBanner({ className = '' }: AdsterraNativeBannerProps) {
  // Replaced with Google AdSense compliant display unit
  return <GoogleAdSense className={className} />;
}
