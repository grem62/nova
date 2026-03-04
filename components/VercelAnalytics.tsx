"use client";

import Script from "next/script";

export function VercelAnalytics() {
  return (
    <Script
      defer
      src="/_vercel/insights/script.js"
      strategy="afterInteractive"
    />
  );
}
