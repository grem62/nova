"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";
import { sceneState } from "@/lib/sceneState";

type RevealVariant =
  | "slide-left"
  | "slide-right"
  | "rotate-left"
  | "rotate-right"
  | "zoom-pop"
  | "cascade-up";

type SceneVariant = "scene-left" | "scene-right" | "scene-zoom";

const sectionRevealVariantMap: Record<string, RevealVariant[]> = {
  "nova-intro-video": ["zoom-pop", "slide-right", "cascade-up"],
  philosophie: ["slide-left", "rotate-right", "cascade-up"],
  "pour-qui": ["slide-right", "slide-left", "zoom-pop"],
  methode: ["rotate-left", "slide-right", "cascade-up"],
  about: ["zoom-pop", "rotate-right", "slide-left"],
  offre: ["slide-left", "zoom-pop", "rotate-left"],
  resultats: ["slide-right", "zoom-pop", "rotate-right"],
  transformations: ["cascade-up", "slide-left", "slide-right"],
  programs: ["cascade-up", "rotate-left", "zoom-pop"],
  pricing: ["zoom-pop", "rotate-right", "slide-left"],
  contact: ["rotate-right", "slide-left", "cascade-up"],
  faq: ["slide-right", "cascade-up", "rotate-left"]
};

const sectionSceneVariantMap: Record<string, SceneVariant> = {
  "nova-intro-video": "scene-zoom",
  philosophie: "scene-left",
  "pour-qui": "scene-right",
  methode: "scene-left",
  about: "scene-zoom",
  offre: "scene-right",
  resultats: "scene-left",
  transformations: "scene-right",
  programs: "scene-zoom",
  pricing: "scene-left",
  contact: "scene-right",
  faq: "scene-zoom"
};

const sectionStaggerStepMap: Record<string, number> = {
  "nova-intro-video": 70,
  philosophie: 95,
  "pour-qui": 85,
  methode: 90,
  about: 110,
  offre: 80,
  resultats: 100,
  transformations: 90,
  programs: 115,
  pricing: 85,
  contact: 95,
  faq: 80
};

function getRevealVariant(sectionId: string, itemIndex: number): RevealVariant {
  const sectionVariants = sectionRevealVariantMap[sectionId] ?? [
    "slide-left",
    "slide-right",
    "zoom-pop"
  ];

  return sectionVariants[itemIndex % sectionVariants.length];
}

export function useScrollScene(
  containerRef: React.RefObject<HTMLElement | null>
) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-scene-section]");

      sections.forEach((section, index) => {
        section.classList.add("nova-scene-enter");
        section.dataset.sceneVariant =
          sectionSceneVariantMap[section.id] ?? "scene-zoom";
        section.style.setProperty(
          "--scene-delay",
          `${Math.min(index * 60, 220)}ms`
        );

        ScrollTrigger.create({
          trigger: section,
          start: "top 84%",
          onEnter: () => section.classList.add("is-visible"),
          onLeaveBack: () => section.classList.remove("is-visible")
        });
      });

      const revealItems = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const sectionItemCount = new Map<string, number>();

      revealItems.forEach((el, globalIndex) => {
        const section = el.closest<HTMLElement>("[data-scene-section]");
        const sectionId = section?.id || "default";
        const localIndex = sectionItemCount.get(sectionId) ?? 0;
        sectionItemCount.set(sectionId, localIndex + 1);
        const variant = getRevealVariant(sectionId, localIndex);
        const staggerStep = sectionStaggerStepMap[sectionId] ?? 85;

        el.classList.add("nova-reveal-block");
        el.dataset.revealVariant = variant;
        el.style.setProperty("--reveal-delay", `${(localIndex % 4) * staggerStep}ms`);
        el.style.setProperty("--reveal-index", `${globalIndex % 6}`);

        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          onEnter: () => el.classList.add("is-visible"),
          onLeaveBack: () => el.classList.remove("is-visible")
        });
      });

      gsap.to(sceneState, {
        heroScale: 1.18,
        cameraOffsetZ: -1.2,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=1600",
          scrub: true
        }
      });

      const parallaxSlow = gsap.utils.toArray<HTMLElement>(
        "[data-parallax-layer='slow']"
      );
      const parallaxFast = gsap.utils.toArray<HTMLElement>(
        "[data-parallax-layer='fast']"
      );

      parallaxSlow.forEach((el) => {
        gsap.to(el, {
          y: 60,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        });
      });

      parallaxFast.forEach((el) => {
        gsap.to(el, {
          y: -80,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        });
      });

      const heroVideo = document.getElementById("nova-hero-video");
      if (heroVideo) {
        gsap.to(heroVideo, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, container);

    return () => ctx.revert();
  }, [containerRef]);
}
