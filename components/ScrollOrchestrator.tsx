"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollOrchestrator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-word",
        { yPercent: 115, rotate: 4 },
        { yPercent: 0, rotate: 0, duration: 1.15, ease: "power4.out", stagger: 0.08 },
      );

      gsap.fromTo(
        ".reveal",
        { y: 72, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".page-shell",
            start: "top 75%",
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".image-lift").forEach((image) => {
        gsap.fromTo(
          image,
          { y: 80, scale: 1.08, autoAlpha: 0.55 },
          {
            y: -40,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".panel-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          },
        );
      });

      const track = document.querySelector<HTMLElement>(".poster-track");
      if (track) {
        gsap.to(track, {
          xPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: ".poster-river",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
