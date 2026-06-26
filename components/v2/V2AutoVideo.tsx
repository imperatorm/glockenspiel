"use client";

import { useEffect, useRef, useState } from "react";

type V2AutoVideoProps = {
  /** Video URL. Empty/undefined → the poster image is shown on its own. */
  src?: string;
  /** Poster image (already CDN-sized). Rendered as the LCP-friendly fallback. */
  poster: string;
  alt: string;
  className?: string;
  /** Mark the poster as the LCP image: eager + fetchpriority=high instead of lazy. */
  priority?: boolean;
};

// Autoplay-muted-loop videos download in full even on phones — here that's ~17 MB of
// .webm that tanks the mobile payload and LCP. So the video only loads on desktop
// pointers; phones (and data-saver) keep the lightweight poster image. The component
// renders a single <img> or <video> so existing .v2-dark-media / .v2-sets-side CSS
// keeps matching, and SSR always emits the poster <img> so the LCP element is in the
// initial HTML, discoverable, and not lazy-loaded.
export function V2AutoVideo({ src, poster, alt, className, priority }: V2AutoVideoProps) {
  const ref = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!src) return;
    const bigScreen = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;
    if (!bigScreen) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    setShowVideo(true);
  }, [src]);

  if (showVideo && src) {
    return (
      <video
        ref={ref as React.RefObject<HTMLVideoElement>}
        className={className}
        src={src}
        poster={poster}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }

  return (
    <img
      ref={ref as React.RefObject<HTMLImageElement>}
      className={className}
      src={poster}
      alt={alt}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
    />
  );
}
