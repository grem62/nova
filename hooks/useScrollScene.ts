"use client";

import { useLayoutEffect } from "react";

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

export function useScrollScene(containerRef: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Setup section classes
    const sections = container.querySelectorAll<HTMLElement>("[data-scene-section]");
    sections.forEach((section, index) => {
      section.classList.add("nova-scene-enter");
      section.dataset.sceneVariant = sectionSceneVariantMap[section.id] ?? "scene-zoom";
      section.style.setProperty("--scene-delay", `${Math.min(index * 60, 220)}ms`);
    });

    // Setup reveal items
    const revealItems = container.querySelectorAll<HTMLElement>("[data-reveal]");
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
    });

    // Intersection Observer (léger, natif)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { rootMargin: "-16% 0px -16% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    revealItems.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);
}
