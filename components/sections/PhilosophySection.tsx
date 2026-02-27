"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

const steps = [
  {
    num: "01",
    title: "Diagnostic",
    text: "On part de ton niveau réel : contraintes, récupération, historique et objectifs précis.",
  },
  {
    num: "02",
    title: "Stratégie",
    text: "Un plan simple, calibré sur ton rythme de vie, avec des priorités et des paliers clairs.",
  },
  {
    num: "03",
    title: "Exécution",
    text: "Séances structurées, charge progressive et standards techniques non négociables.",
  },
  {
    num: "04",
    title: "Pilotage",
    text: "Suivi hebdomadaire, ajustements des volumes et maintien de la qualité d'exécution.",
  },
  {
    num: "05",
    title: "Résultat durable",
    text: "Performance mesurable et progression stable, sans dépendre de solutions court terme.",
  },
];

export function PhilosophySection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const fillRef     = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    const line    = lineRef.current;
    const fill    = fillRef.current;
    if (!section || !line || !fill) return;

    const ctx = gsap.context(() => {
      /* ── Ligne jaune qui s'étire au scroll ── */
      gsap.fromTo(fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 70%",
            end:   "bottom 30%",
            scrub: 1.2,
          }
        }
      );

      /* ── Chaque étape entre depuis la droite ── */
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: 40, scale: 0.97 },
          {
            opacity: 1, x: 0, scale: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.08,
          }
        );

        /* ── Nœud s'allume quand l'étape est visible ── */
        const node = el.querySelector<HTMLElement>(".timeline-node");
        if (node) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 75%",
            onEnter: () => {
              node.style.background = "#EEFF00";
              node.style.borderColor = "#EEFF00";
              node.style.color = "#020818";
              node.style.boxShadow = "0 0 20px rgba(238,255,0,0.50)";
            },
            onLeaveBack: () => {
              node.style.background = "";
              node.style.borderColor = "";
              node.style.color = "";
              node.style.boxShadow = "";
            },
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophie"
      ref={sectionRef}
      data-scene-section
      className="relative px-5 py-20 sm:px-10 lg:px-24"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full blur-[120px]"
        style={{ background: "rgba(238,255,0,0.05)" }}
      />

      <div className="mx-auto w-full max-w-5xl">
        {/* ── Header ── */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end" data-reveal>
          <div className="space-y-4">
            <p className="eyebrow">La philosophie</p>
            <h2 className="section-headline nova-gradient-text tracking-in-expand">
              Construire le résultat<br />dont on rêve.
            </h2>
          </div>
          <p className="section-body max-w-md self-end pb-1 text-[15px]">
            Rien n&apos;est laissé au hasard : chaque cycle suit une logique
            claire, des décisions basées sur les données et le terrain.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative flex gap-8 lg:gap-14">

          {/* Ligne verticale + fill animé */}
          <div
            ref={lineRef}
            className="relative hidden w-[2px] shrink-0 lg:block"
            style={{ background: "rgba(238,255,0,0.08)" }}
          >
            <div
              ref={fillRef}
              className="absolute inset-x-0 top-0 h-full origin-top rounded-full"
              style={{ background: "linear-gradient(to bottom, #EEFF00 0%, rgba(238,255,0,0.25) 100%)", scaleY: 0 } as React.CSSProperties}
            />
          </div>

          {/* Steps */}
          <div className="flex-1 space-y-2.5">
            {steps.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { if (el) stepsRef.current[i] = el; }}
                className="timeline-step group flex items-start gap-4 rounded-xl p-4 transition"
                style={{
                  background: "rgba(6,18,36,0.60)",
                  border: "1px solid rgba(238,255,0,0.10)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Node */}
                <div className="timeline-node shrink-0" style={{ transitionDuration: "0.4s" }}>
                  {step.num}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[14px] font-bold tracking-tight text-nova-text">
                      {step.title}
                    </h3>
                    <span
                      className="h-px flex-1"
                      style={{ background: "rgba(238,255,0,0.10)" }}
                    />
                  </div>
                  <p className="text-[12px] leading-relaxed text-nova-text-2">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
