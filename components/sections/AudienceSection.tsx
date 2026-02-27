"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/* Couleurs exclusivement issues du logo Nova : jaune #EEFF00 + bleu marine */
const YELLOW   = "#EEFF00";
const YELLOW_8 = "rgba(238,255,0,0.08)";

const audiences = [
  {
    label: "Débutants",
    description: "Poser des bases solides, sans brûler les étapes ni se blesser.",
    icon: "/icons/audience-debutant.png",
    tag: "Niveau 01",
    tagColor: YELLOW,
    iconBg: YELLOW_8,
  },
  {
    label: "Intermédiaires",
    description: "Sortir du plateau, structurer l'entraînement et enfin progresser.",
    icon: "/icons/audience-intermediaire.png",
    tag: "Niveau 02",
    tagColor: YELLOW,
    iconBg: YELLOW_8,
  },
  {
    label: "Athlètes",
    description: "Préparation spécifique, gestion des charges et des échéances.",
    icon: "/icons/audience-athletes.png",
    tag: "Niveau 03",
    tagColor: YELLOW,
    iconBg: YELLOW_8,
  },
  {
    label: "Recomposition",
    description: "Perdre du gras, construire du muscle et stabiliser dans le temps.",
    icon: "/icons/audience-recomposition.png",
    tag: "Objectif A",
    tagColor: YELLOW,
    iconBg: YELLOW_8,
  },
  {
    label: "Préparation spécifique",
    description: "Objectif compétitif, examen, saison sportive ou défi précis.",
    icon: "/icons/audience-preparation.png",
    tag: "Objectif B",
    tagColor: YELLOW,
    iconBg: YELLOW_8,
  },
];

export function AudienceSection() {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const spinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const odrag = dragRef.current;
    const ospin = spinRef.current;
    if (!odrag || !ospin) return;

    const items = Array.from(ospin.querySelectorAll<HTMLElement>("[data-carousel-item]"));
    if (items.length === 0) return;

    let radius = 0;
    const rotateSpeed = -20;
    const cardWidth   = 190;
    const cardHeight  = 240;

    ospin.style.width  = `${cardWidth}px`;
    ospin.style.height = `${cardHeight}px`;

    const ground = odrag.querySelector<HTMLElement>("[data-carousel-ground]");

    function init(delayTime?: number) {
      for (let i = 0; i < items.length; i++) {
        items[i].style.transform       = `rotateY(${(i * 360) / items.length}deg) translateZ(${radius}px)`;
        items[i].style.transition      = "transform 1s";
        items[i].style.transitionDelay = (delayTime ?? (items.length - i) / 4) + "s";
      }
    }

    const updateRadius = (delayTime?: number) => {
      const w = window.innerWidth;
      radius  = w < 640 ? 155 : w < 1024 ? 190 : 225;
      if (ground) {
        ground.style.width  = `${radius * 3}px`;
        ground.style.height = `${radius * 3}px`;
      }
      init(delayTime);
    };

    const playSpin = (yes: boolean) => {
      const name = rotateSpeed > 0 ? "nova-spin" : "nova-spin-revert";
      if (yes) {
        ospin.style.animation          = `${name} ${Math.abs(rotateSpeed)}s infinite linear`;
        ospin.style.animationPlayState = "running";
      } else {
        ospin.style.animationPlayState = "paused";
      }
    };

    // Init avec radius=0 : toutes les cartes empilées au centre
    ospin.style.width  = `${cardWidth}px`;
    ospin.style.height = `${cardHeight}px`;
    for (let i = 0; i < items.length; i++) {
      items[i].style.transform  = `rotateY(${(i * 360) / items.length}deg) translateZ(0px)`;
      items[i].style.transition = "transform 1.2s cubic-bezier(0.22,1,0.36,1)";
    }

    let hasOpened = false;

    const sectionEl = document.getElementById("pour-qui");
    let observer: IntersectionObserver | undefined;

    if (sectionEl && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          const ratio = e.intersectionRatio;

          // Déclenchement de l'animation d'ouverture au milieu de la section
          if (!hasOpened && ratio >= 0.45) {
            hasOpened = true;
            updateRadius(0);  // animation d'écartement immédiate
            setTimeout(() => playSpin(true), 1000); // spin après l'ouverture
          }

          // Pause/reprise du spin selon visibilité
          if (hasOpened) playSpin(e.isIntersecting && ratio > 0.2);
        },
        { threshold: [0.1, 0.2, 0.3, 0.45, 0.5] }
      );
      observer.observe(sectionEl);
    } else {
      updateRadius();
      playSpin(true);
    }

    const onResize = () => updateRadius(0.5);
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="pour-qui"
      data-scene-section
      className="relative px-5 py-20 sm:px-10 lg:px-24"
    >
      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-[140px]"
        style={{ background: "rgba(238,255,0,0.04)" }}
      />

      <div className="mx-auto w-full max-w-5xl">
        {/* Section header */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end" data-reveal>
          <div className="space-y-3">
            <p className="eyebrow">Pour qui ?</p>
            <h2 className="section-headline nova-gradient-text tracking-in-expand" style={{ fontSize: "clamp(1.3rem, 3.2vw, 2.4rem)" }}>
              Pour ceux qui commencent,<br />comme pour ceux<br />qui performent.
            </h2>
          </div>
          <p className="section-body max-w-md self-end pb-1 text-[15px]">
            Nova s&apos;adresse aux profils qui veulent un cadre clair, un suivi
            sérieux et des résultats mesurables — quel que soit le point de départ.
          </p>
        </div>

        {/* 3D Carousel */}
        <div className="nova-carousel-wrapper" style={{ height: "clamp(240px, 35vw, 320px)" }} data-reveal>
          <div ref={dragRef} className="nova-carousel-drag">
            <div ref={spinRef} className="nova-carousel-spin">
              {audiences.map((item) => (
                <div key={item.label} data-carousel-item className="nova-carousel-item">
                  {/* Icon ring */}
                  <div
                    className="nova-icon-ring mb-3 shrink-0"
                    style={{
                      background: item.iconBg,
                      boxShadow: `0 0 0 1px ${item.tagColor}30 inset`,
                    }}
                  >
                    <Image
                      src={item.icon}
                      alt={item.label}
                      width={24}
                      height={24}
                      className="object-contain"
                      style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                    />
                  </div>

                  {/* Tag */}
                  <span
                    className="mb-1.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: item.tagColor, background: item.iconBg }}
                  >
                    {item.tag}
                  </span>

                  <p className="text-[13px] font-semibold tracking-tight text-nova-text">
                    {item.label}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-nova-text-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
            <div data-carousel-ground className="nova-carousel-ground" />
          </div>
        </div>

      </div>
    </section>
  );
}
