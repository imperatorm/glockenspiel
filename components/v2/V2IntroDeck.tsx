"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";

type DeckImage = { src: string; alt?: string };

const INTERVAL = 3200; // ms a card stays active before the deck advances
const TWEEN = 1.0; // s for a card to settle into its new slot

// Fan geometry keyed by signed distance from the active card. Distance wraps both
// ways so the deck loops seamlessly. Mirrors the Osmo "flick cards" layering, but
// driven by an auto-advancing index instead of drag.
function config(rawDiff: number, total: number) {
  let diff = rawDiff;
  if (diff > total / 2) diff -= total;
  else if (diff < -total / 2) diff += total;

  switch (diff) {
    case 0:
      return { x: 0, y: 0, rot: 0, s: 1, o: 1, z: 5 };
    case 1:
      return { x: 26, y: 2, rot: 8, s: 0.9, o: 1, z: 4 };
    case -1:
      return { x: -26, y: 2, rot: -8, s: 0.9, o: 1, z: 4 };
    case 2:
      return { x: 46, y: 6, rot: 13, s: 0.8, o: 0.85, z: 3 };
    case -2:
      return { x: -46, y: 6, rot: -13, s: 0.8, o: 0.85, z: 3 };
    default: {
      const dir = diff > 0 ? 1 : -1;
      return { x: 56 * dir, y: 8, rot: 18 * dir, s: 0.66, o: 0, z: 2 };
    }
  }
}

export function V2IntroDeck({ images }: { images: DeckImage[] }) {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const cards = gsap.utils.toArray<HTMLElement>(".v2-intro-deck__card", deck);
    const total = cards.length;
    if (!total) return;

    let active = 0;

    const render = (index: number, animate: boolean) => {
      cards.forEach((card, i) => {
        const c = config(i - index, total);
        card.style.zIndex = String(c.z);
        const vars = { xPercent: c.x, yPercent: c.y, rotation: c.rot, scale: c.s, opacity: c.o };
        if (animate) gsap.to(card, { duration: TWEEN, ease: "power3.out", overwrite: "auto", ...vars });
        else gsap.set(card, vars);
      });
    };

    // Fan out immediately (no flash of the raw stack), then auto-advance.
    render(0, false);

    if (prefersReducedMotion() || total < 2) return; // static fan, no playback

    let timer: number | undefined;
    const advance = () => {
      active = (active + 1) % total;
      render(active, true);
    };
    const start = () => {
      if (timer == null) timer = window.setInterval(advance, INTERVAL);
    };
    const stop = () => {
      if (timer != null) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    // Only run while on screen and the tab is visible — no wasted work scrolled past.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.2 },
    );
    io.observe(deck);

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        const rect = deck.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) start();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={deckRef} className="v2-intro-deck">
      {images.map((img, i) => (
        <div className="v2-intro-deck__card" key={`${img.src}-${i}`}>
          <img
            src={img.src}
            alt={img.alt ?? ""}
            width={480}
            height={640}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}
