"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import LocomotiveScroll from "locomotive-scroll";
import { prefersReducedMotion } from "@/lib/motion";

const HERO_SCOPE = ".hero-section, .event-hero-detail, .legal-hero, .v2-hero";

type LenisLike = {
  on: (event: "scroll", callback: () => void) => void;
};

function splitIntoWords(el: HTMLElement) {
  if (el.dataset.splitReady) return;
  el.dataset.splitReady = "true";
  const text = (el.textContent || "").replace(/\s+/g, " ").trim();
  el.setAttribute("aria-label", text);

  const walk = (parent: Element) => {
    Array.from(parent.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        (node.textContent || "").split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(" "));
            return;
          }
          const outer = document.createElement("span");
          outer.className = "split-word";
          outer.setAttribute("aria-hidden", "true");
          const inner = document.createElement("span");
          inner.className = "split-word-inner";
          inner.textContent = part;
          outer.appendChild(inner);
          fragment.appendChild(outer);
        });
        parent.replaceChild(fragment, node);
      } else if (node instanceof Element && node.nodeName !== "BR") {
        walk(node);
      }
    });
  };

  walk(el);
}

// Osmo Supply — Image Preview Cursor Follower (adapted: React lifecycle + cleanup)
function initPreviewFollower(cleanups: Array<() => void>) {
  const wrappers = document.querySelectorAll<HTMLElement>("[data-follower-wrap]");

  wrappers.forEach((wrap) => {
    const collection = wrap.querySelector<HTMLElement>("[data-follower-collection]");
    const items = wrap.querySelectorAll<HTMLElement>("[data-follower-item]");
    const follower = wrap.querySelector<HTMLElement>("[data-follower-cursor]");
    const followerInner = wrap.querySelector<HTMLElement>("[data-follower-cursor-inner]");
    if (!collection || !follower || !followerInner) return;

    let prevIndex: number | null = null;
    let firstEntry = true;

    const offset = 100; // The animation distance in %
    const duration = 0.5; // The animation duration of all visual transforms
    const ease = "power2.inOut";

    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    cleanups.push(() => window.removeEventListener("mousemove", onMove));

    items.forEach((item, index) => {
      const onEnter = () => {
        const forward = prevIndex === null || index > prevIndex;
        prevIndex = index;

        follower.querySelectorAll<HTMLElement>("[data-follower-visual]").forEach((el) => {
          gsap.killTweensOf(el);
          gsap.to(el, {
            yPercent: forward ? -offset : offset,
            duration,
            ease,
            overwrite: "auto",
            onComplete: () => el.remove(),
          });
        });

        const visual = item.querySelector("[data-follower-visual]");
        if (!visual) return;
        const clone = visual.cloneNode(true) as HTMLElement;
        followerInner.appendChild(clone);

        if (!firstEntry) {
          gsap.fromTo(
            clone,
            { yPercent: forward ? offset : -offset },
            { yPercent: 0, duration, ease, overwrite: "auto" },
          );
        } else {
          firstEntry = false;
        }
      };

      const onLeave = () => {
        const el = follower.querySelector<HTMLElement>("[data-follower-visual]");
        if (!el) return;
        gsap.killTweensOf(el);
        gsap.to(el, {
          yPercent: -offset,
          duration,
          ease,
          overwrite: "auto",
          onComplete: () => el.remove(),
        });
      };

      item.addEventListener("mouseenter", onEnter);
      item.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        item.removeEventListener("mouseenter", onEnter);
        item.removeEventListener("mouseleave", onLeave);
      });
    });

    const onCollectionLeave = () => {
      follower.querySelectorAll<HTMLElement>("[data-follower-visual]").forEach((el) => {
        gsap.killTweensOf(el);
        gsap.delayedCall(duration, () => el.remove());
      });
      firstEntry = true;
      prevIndex = null;
    };
    collection.addEventListener("mouseleave", onCollectionLeave);
    cleanups.push(() => collection.removeEventListener("mouseleave", onCollectionLeave));
    cleanups.push(() => {
      followerInner.querySelectorAll("[data-follower-visual]").forEach((el) => el.remove());
    });
  });
}

export function ScrollOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, CustomEase);
    if (!CustomEase.get("osmo")) {
      CustomEase.create("osmo", "0.625, 0.05, 0, 1");
    }
    const EASE = "osmo";

    const reduceMotion = prefersReducedMotion();
    const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // The hours pill yields to the footer: it stops just above the footer rule.
    const hoursPill = document.querySelector<HTMLElement>(".v2-hours");
    const pillFooter = document.querySelector<HTMLElement>(".v2-footer");
    const pillBottomOffset = hoursPill ? parseFloat(getComputedStyle(hoursPill).bottom) || 16 : 0;

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      document.body.classList.toggle("is-scrolled", y > 90);
      if (y > 480 && y > lastY + 6) {
        document.body.classList.add("nav-hidden");
      } else if (y < lastY - 6 || y <= 480) {
        document.body.classList.remove("nav-hidden");
      }
      lastY = y;

      if (hoursPill && pillFooter) {
        const footerTop = pillFooter.getBoundingClientRect().top;
        const overlap = window.innerHeight - pillBottomOffset - footerTop + 10;
        hoursPill.style.transform = overlap > 0 ? `translateY(${-overlap}px)` : "";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (reduceMotion) {
      return () => window.removeEventListener("scroll", onScroll);
    }

    // Locomotive Scroll v5 (Lenis core) — also drives [data-scroll-speed] parallax
    const scroller = new LocomotiveScroll({
      lenisOptions: {
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      },
    });
    const lenis = (scroller as unknown as { lenisInstance?: LenisLike }).lenisInstance;
    lenis?.on("scroll", ScrollTrigger.update);

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector(anchor.getAttribute("href") || "");
      if (!target) return;
      event.preventDefault();
      scroller.scrollTo(target as HTMLElement, { offset: -16 });
    };
    document.addEventListener("click", onAnchorClick);

    const onModalOpen = () => scroller.stop();
    const onModalClose = () => scroller.start();
    window.addEventListener("modal:open", onModalOpen);
    window.addEventListener("modal:close", onModalClose);

    let alive = true;
    let removeVeilListener: (() => void) | undefined;
    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // ----- Intro priming: hidden states set immediately, played when veil lifts + fonts ready -----
      const v2Hero = document.querySelector<HTMLElement>(".v2-hero");
      const v2Labels = v2Hero ? gsap.utils.toArray<HTMLElement>(".v2-hero-labels span", v2Hero) : [];
      const v2Bars = v2Hero ? gsap.utils.toArray<HTMLElement>(".v2-hero-labels i", v2Hero) : [];
      const v2Photos = v2Hero ? gsap.utils.toArray<HTMLElement>(".v2-hero-strip img", v2Hero) : [];
      const v2HeroLogo = v2Hero ? v2Hero.querySelector<HTMLElement>(".v2-hero-logo") : null;
      const heroChars = gsap.utils.toArray<HTMLElement>(".hero-char");
      const heroWords = gsap.utils.toArray<HTMLElement>(".hero-word");
      const heroReveals = gsap.utils.toArray<HTMLElement>(
        [".hero-section .reveal", ".event-hero-detail .reveal", ".legal-hero .reveal", ".v2-hero .reveal"].join(", "),
      );
      const heroSplitTweens: gsap.core.Tween[] = [];

      if (heroChars.length) gsap.set(heroChars, { yPercent: 118, rotate: 6 });
      if (heroWords.length) gsap.set(heroWords, { yPercent: 115, rotate: 4 });
      if (heroReveals.length) gsap.set(heroReveals, { y: 42, autoAlpha: 0 });
      if (v2Labels.length) gsap.set(v2Labels, { autoAlpha: 0, y: 16, filter: "blur(10px)" });
      if (v2Bars.length) gsap.set(v2Bars, { scaleX: 0, transformOrigin: "left center" });
      if (v2Photos.length) gsap.set(v2Photos, { autoAlpha: 0, scale: 1.22 });
      if (v2HeroLogo) gsap.set(v2HeroLogo, { clipPath: "inset(0 0 100% 0)", yPercent: 8 });

      const playIntro = () => {
        if (!alive) return;
        const tl = gsap.timeline();
        if (v2Hero) {
          // Staged editorial entrance: labels blur in, rules draw, wordmark rises, photos settle.
          if (v2Labels.length) {
            tl.to(v2Labels, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: EASE, stagger: 0.14 }, 0.05);
          }
          if (v2Bars.length) {
            tl.to(v2Bars, { scaleX: 1, duration: 1.2, ease: EASE, stagger: 0.1 }, 0.2);
          }
          if (v2HeroLogo) {
            tl.to(v2HeroLogo, { clipPath: "inset(0 0 0% 0)", yPercent: 0, duration: 1.3, ease: EASE }, 0.8);
          }
          if (heroChars.length) {
            tl.to(heroChars, { yPercent: 0, rotate: 0, duration: 1.25, ease: EASE, stagger: 0.028 }, 0.8);
          }
          if (v2Photos.length) {
            tl.to(v2Photos, { autoAlpha: 1, scale: 1, duration: 1.6, ease: EASE, stagger: 0.14 }, 1.25);
          }
          if (heroReveals.length) {
            tl.to(heroReveals, { y: 0, autoAlpha: 1, duration: 0.95, ease: EASE, stagger: 0.07 }, 0.3);
          }
        } else {
          if (heroChars.length) {
            tl.to(heroChars, { yPercent: 0, rotate: 0, duration: 1.3, ease: EASE, stagger: 0.022 }, 0.05);
          }
          if (heroWords.length) {
            tl.to(heroWords, { yPercent: 0, rotate: 0, duration: 1.15, ease: EASE, stagger: 0.07 }, 0.05);
          }
          if (heroReveals.length) {
            tl.to(heroReveals, { y: 0, autoAlpha: 1, duration: 0.95, ease: EASE, stagger: 0.07 }, 0.4);
          }
        }
        if (heroSplitTweens.length) {
          tl.call(() => heroSplitTweens.forEach((tween) => tween.play()), [], 0.2);
        }
      };

      const veilReady = new Promise<void>((resolve) => {
        if (window.__veilDone) {
          resolve();
          return;
        }
        const handler = () => resolve();
        window.addEventListener("veil:reveal", handler, { once: true });
        removeVeilListener = () => window.removeEventListener("veil:reveal", handler);
      });
      const fontsReady: Promise<unknown> = document.fonts?.ready ?? Promise.resolve();
      Promise.all([veilReady, fontsReady]).then(playIntro);

      // ----- Hero scroll-out parallax (dark home) -----
      const heroSection = document.querySelector<HTMLElement>(".hero-section");
      if (heroSection) {
        gsap.to(".hero-content", {
          yPercent: -14,
          autoAlpha: 0.1,
          ease: "none",
          scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom 30%", scrub: true },
        });
        gsap.fromTo(
          ".hero-bg",
          { scale: 1.04, yPercent: 0 },
          {
            scale: 1.16,
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: heroSection, start: "top top", end: "bottom top", scrub: true },
          },
        );
      }

      // ----- Per-element copy reveals -----
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        if (el.closest(HERO_SCOPE)) return;
        gsap.fromTo(
          el,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: EASE,
            scrollTrigger: { trigger: el, start: "top 88%" },
          },
        );
      });

      // ----- Masked word reveals for headings -----
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        splitIntoWords(el);
        const inners = el.querySelectorAll<HTMLElement>(".split-word-inner");
        if (!inners.length) return;
        if (el.closest(HERO_SCOPE)) {
          // Hero headings join the intro instead of firing under the veil.
          heroSplitTweens.push(
            gsap.fromTo(
              inners,
              { yPercent: 112, rotate: 2.5 },
              { yPercent: 0, rotate: 0, duration: 1.05, ease: EASE, stagger: 0.05, paused: true },
            ),
          );
          return;
        }
        gsap.fromTo(
          inners,
          { yPercent: 112, rotate: 2.5 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.05,
            ease: EASE,
            stagger: 0.05,
            scrollTrigger: { trigger: el, start: "top 86%" },
          },
        );
      });

      // ----- Media: clip-mask entrances + parallax drift -----
      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((wrap) => {
        const inner = wrap.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: wrap, start: "top 86%" },
        });
        tl.fromTo(
          wrap,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: EASE },
        );
        if (inner) {
          tl.fromTo(inner, { scale: 1.28 }, { scale: 1, duration: 1.45, ease: EASE }, 0.05);
        }
      });

      gsap.utils.toArray<HTMLElement>(".image-lift").forEach((image) => {
        if (image.classList.contains("hero-bg")) return; // dedicated hero parallax above
        gsap.fromTo(
          image,
          { y: 46 },
          {
            y: -46,
            ease: "none",
            scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // ----- Cards -----
      gsap.utils.toArray<HTMLElement>(".panel-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 64, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            delay: (index % 3) * 0.06,
            ease: EASE,
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
      });

      // ----- Statement scrub -----
      const statement = document.querySelector<HTMLElement>(".statement-section h2");
      if (statement) {
        gsap.fromTo(
          statement,
          { scale: 0.84, autoAlpha: 0.25 },
          {
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { trigger: ".statement-section", start: "top 88%", end: "center 42%", scrub: true },
          },
        );
      }

      // ----- Velocity-reactive marquee -----
      gsap.utils.toArray<HTMLElement>(".marquee-track").forEach((track) => {
        const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
        ScrollTrigger.create({
          trigger: track,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = gsap.utils.clamp(-3000, 3000, self.getVelocity());
            gsap.to(loop, { timeScale: 1 + velocity / 900, duration: 0.25, overwrite: true });
            gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.3 });
          },
        });
      });

      // ----- Poster river: scrub travel + velocity skew -----
      const posterTrack = document.querySelector<HTMLElement>(".poster-track");
      if (posterTrack) {
        gsap.to(posterTrack, {
          xPercent: -26,
          ease: "none",
          scrollTrigger: { trigger: ".poster-river", start: "top bottom", end: "bottom top", scrub: true },
        });
        const skewTo = gsap.quickTo(posterTrack, "skewX", { duration: 0.5, ease: "power3.out" });
        ScrollTrigger.create({
          trigger: ".poster-river",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => skewTo(gsap.utils.clamp(-6, 6, self.getVelocity() / 320)),
        });
      }

      // ----- Footer wordmark scrub (dark theme) -----
      const wordmark = document.querySelector<HTMLElement>(".footer-wordmark");
      if (wordmark) {
        gsap.fromTo(
          wordmark,
          { yPercent: 46, autoAlpha: 0.15 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: { trigger: ".site-footer", start: "top 98%", end: "top 55%", scrub: true },
          },
        );
      }

      // ----- v2: looping intro slideshow -----
      const slides = gsap.utils.toArray<HTMLElement>(".v2-intro-slides .v2-slide");
      if (slides.length) {
        const slideshow = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.6 });
        slideshow.fromTo(
          slides,
          { scale: 0.74, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1, ease: EASE, stagger: 1.6 },
        );
        slideshow.to({}, { duration: 1.2 });
        slideshow.set(slides, { autoAlpha: 0 });
        ScrollTrigger.create({
          trigger: ".v2-intro",
          start: "top 85%",
          end: "bottom top",
          onEnter: () => slideshow.play(),
          onEnterBack: () => slideshow.play(),
          onLeave: () => slideshow.pause(),
          onLeaveBack: () => slideshow.pause(),
        });
      }

      // ----- v2: polaroids rotate + drift on scroll -----
      gsap.utils.toArray<HTMLElement>(".v2-polaroid").forEach((card, index) => {
        const startRotate = parseFloat(card.dataset.rotateStart || "0");
        const endRotate = parseFloat(card.dataset.rotateEnd || "0");
        // Rotation-only scrub keeps vertical positions stable (CSS-driven stack).
        gsap.fromTo(
          card,
          { rotate: startRotate },
          {
            rotate: endRotate,
            ease: "none",
            scrollTrigger: {
              trigger: card.closest(".v2-about") ?? card,
              start: "top bottom",
              end: "bottom center",
              scrub: true,
            },
          },
        );
      });

      // ----- v2: rule draw-ins -----
      gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
        gsap.fromTo(
          rule,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: EASE,
            transformOrigin: "left center",
            scrollTrigger: { trigger: rule, start: "top 94%" },
          },
        );
      });

      // ----- Scroll progress -----
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    });

    // ----- v2: floating highlight tile follows the hovered table row -----
    const setsTable = document.querySelector<HTMLElement>(".v2-sets-table");
    if (setsTable && pointerFine) {
      const tile = setsTable.querySelector<HTMLElement>(".v2-set-tile");
      const rows = Array.from(setsTable.querySelectorAll<HTMLElement>(".v2-set-row"));
      if (tile && rows.length) {
        setsTable.classList.add("has-tile");
        const home = setsTable.querySelector<HTMLElement>(".v2-set-row--hot") ?? rows[0];
        const glide = (row: HTMLElement, immediate = false) => {
          rows.forEach((other) => other.classList.toggle("is-tiled", other === row));
          gsap.to(tile, {
            y: row.offsetTop,
            height: row.offsetHeight,
            duration: immediate ? 0 : 0.5,
            ease: "osmo",
            overwrite: true,
          });
        };
        glide(home, true);
        rows.forEach((row) => {
          const enter = () => glide(row);
          row.addEventListener("mouseenter", enter);
          cleanups.push(() => row.removeEventListener("mouseenter", enter));
        });
        const leave = () => glide(home);
        setsTable.addEventListener("mouseleave", leave);
        const onResize = () => glide(home, true);
        window.addEventListener("resize", onResize);
        cleanups.push(() => setsTable.removeEventListener("mouseleave", leave));
        cleanups.push(() => window.removeEventListener("resize", onResize));
      }
    }

    // ----- Osmo image preview cursor follower (events table) -----
    if (pointerFine) {
      initPreviewFollower(cleanups);
    }

    // Magnetic buttons (pointer devices only)
    if (pointerFine) {
      document.querySelectorAll<HTMLElement>(".button, .nav-cta").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const onMove = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((event.clientX - rect.left - rect.width / 2) * 0.22);
          yTo((event.clientY - rect.top - rect.height / 2) * 0.32);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    return () => {
      alive = false;
      ctx.revert();
      removeVeilListener?.();
      cleanups.forEach((fn) => fn());
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("modal:open", onModalOpen);
      window.removeEventListener("modal:close", onModalClose);
      window.removeEventListener("scroll", onScroll);
      document.body.classList.remove("nav-hidden");
      scroller.destroy();
    };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
