"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { labels } from "@/lib/site";

declare global {
  interface Window {
    __veilDone?: boolean;
  }
}

const REVEAL_EASE = "power4.inOut";

function dispatchVeilDone() {
  window.__veilDone = true;
  window.dispatchEvent(new CustomEvent("veil:reveal"));
}

export function Veil() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLSpanElement | null>(null);
  const firstLoad = useRef(true);
  const covering = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = prefersReducedMotion();

    const finish = () => {
      root.dataset.state = "hidden";
      document.body.classList.remove("veil-lock");
      covering.current = false;
    };

    const reveal = (withCounter: boolean) => {
      gsap.killTweensOf(root);
      if (reduceMotion) {
        gsap.set(root, { clipPath: "inset(0 0 100% 0)" });
        dispatchVeilDone();
        finish();
        return;
      }

      const tl = gsap.timeline({ onComplete: finish });
      if (withCounter && countRef.current) {
        const counter = { value: 0 };
        tl.to(counter, {
          value: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
            }
          },
        });
        tl.to(".veil-center", { yPercent: -28, autoAlpha: 0, duration: 0.5, ease: "power3.in" }, "-=0.1");
      }
      tl.add(dispatchVeilDone);
      tl.to(root, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: REVEAL_EASE }, "<");
    };

    if (firstLoad.current) {
      firstLoad.current = false;
      root.classList.add("veil--armed");
      document.body.classList.add("veil-lock");
      gsap.set(root, { clipPath: "inset(0 0 0% 0)" });
      reveal(true);
      return;
    }

    // Route changed underneath an active cover: lift the veil over the new page.
    requestAnimationFrame(() => {
      if (covering.current) window.scrollTo(0, 0);
      reveal(false);
    });
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = prefersReducedMotion();

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href") || "";
      if (!href.startsWith("/")) return;
      const url = new URL(href, window.location.href);
      // Same-page hash navigation stays with Lenis.
      if (url.pathname === window.location.pathname) return;
      if (covering.current || reduceMotion) {
        return; // let Next handle it natively
      }

      event.preventDefault();
      covering.current = true;
      window.__veilDone = false;
      document.body.classList.add("veil-lock");
      root.dataset.state = "visible";
      gsap.set(".veil-center", { autoAlpha: 0 });
      gsap.fromTo(
        root,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.7,
          ease: REVEAL_EASE,
          onComplete: () => router.push(href),
        },
      );
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return (
    <div ref={rootRef} className="veil" data-state="visible" aria-hidden="true">
      <div className="veil-center">
        <p className="veil-eyebrow">{labels.tagline}</p>
        <span className="veil-logo" role="img" aria-label="Das Glockenspiel" />
      </div>
      <span ref={countRef} className="veil-count">
        000
      </span>
    </div>
  );
}
