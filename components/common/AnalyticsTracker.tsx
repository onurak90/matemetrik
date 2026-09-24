'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  // GA4 (Google Analytics) is actively tracking all visitors via app/layout.tsx directly to Google servers.
  // Internal serverless beacon is disabled to eliminate 1 Edge/Function invocation per page view.
  return null;
}
