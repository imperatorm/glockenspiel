"use client";

import Script from "next/script";

// The Instagram (Elfsight) feed is embedded unconditionally — it is public
// content and is intentionally not gated behind the marketing-cookie consent.
export function InstagramEmbed() {
  return (
    <>
      <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
      <div className="elfsight-app-6437bae5-64a3-4fb0-bda2-56e88b6733dc" data-elfsight-app-lazy="" />
    </>
  );
}
