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

// Autoplay-muted-loop videos download in full (~17 MB of .webm) so we never want
// that in the initial payload. SSR always emits the poster <img> as the LCP element
// (in the initial HTML, discoverable, not lazy-loaded), then we swap in a <video>
// once the poster scrolls near the viewport — phones included. The <video> reuses
// the same poster as its still frame, so it shows the frozen image until the first
// video frame paints, giving "still frame, then playback once loaded" with no flash.
// Honours Save-Data. The component renders a single <img> or <video> so existing
// .v2-dark-media / .v2-sets-side CSS keeps matching.
export function V2AutoVideo({ src, poster, alt, className, priority }: V2AutoVideoProps) {
  const ref = useRef<HTMLImageElement | HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!src) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setShowVideo(true);
      return;
    }
    // Start fetching a little before the section enters view so playback is ready by
    // the time the user reaches it.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShowVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
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
        preload="auto"
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
