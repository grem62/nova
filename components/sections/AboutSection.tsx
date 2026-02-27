"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsapClient";

const Y   = "#EEFF00";
const Y06 = "rgba(238,255,0,0.06)";
const Y08 = "rgba(238,255,0,0.08)";
const Y14 = "rgba(238,255,0,0.14)";
const Y22 = "rgba(238,255,0,0.22)";
const CARD = "#061224";

type Review = { name: string; text: string; stars: number };

const TRUNCATE = 60;

function ReviewCard({ r, Y, Y08, Y22, CARD }: { r: Review; Y: string; Y08: string; Y22: string; CARD: string }) {
  const [expanded, setExpanded] = useState(false);
  const needsTruncate = r.text.length > TRUNCATE;
  const displayed = expanded || !needsTruncate ? r.text : r.text.slice(0, TRUNCATE) + "…";
  return (
    <div
      className="nova-marquee-card shrink-0 rounded-2xl px-5 py-4"
      style={{
        width: "280px",
        background: `radial-gradient(circle at 50% 0%, ${Y08} 0%, transparent 60%), ${CARD}`,
        border: `1px solid ${Y22}`,
      }}
    >
      <div className="mb-2 flex gap-0.5">
        {Array.from({ length: r.stars }).map((_, s) => (
          <span key={s} style={{ color: Y, fontSize: "11px" }}>★</span>
        ))}
      </div>
      <p className="text-[12px] leading-relaxed text-nova-text-2">&ldquo;{displayed}&rdquo;</p>
      {needsTruncate && (
        <button
          type="button"
          onClick={() => setExpanded((v: boolean) => !v)}
          className="mt-1 text-[10px] font-semibold transition hover:opacity-80"
          style={{ color: Y }}
        >
          {expanded ? "Réduire ↑" : "Voir plus ↓"}
        </button>
      )}
      <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: Y }}>— {r.name}</p>
    </div>
  );
}

export function AboutSection({ reviews = [] }: { reviews?: Review[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const photoRef   = useRef<HTMLDivElement | null>(null);
  const cardsRef   = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {

      /* ── Photo glisse depuis la gauche au scroll ── */
      if (photoRef.current) {
        gsap.fromTo(photoRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0,
            ease: "power3.out",
            duration: 1,
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      /* ── Cards entrent depuis la droite en cascade au scroll ── */
      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, x: 80 },
          {
            opacity: 1, x: 0,
            ease: "power3.out",
            duration: 0.85,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.12,
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  const addCard = (el: HTMLElement | null, i: number) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      data-scene-section
      className="relative overflow-hidden py-20"
    >
      {/* Ambient */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 20% 60%, rgba(238,255,0,0.04) 0%, transparent 70%)" }} />

      <div className="mx-auto w-full max-w-5xl px-5 sm:px-10 lg:px-24">

        {/* Header */}
        <div className="mb-12">
          <p className="eyebrow mb-2">Le coach</p>
          <h2 className="section-headline tracking-in-expand">
            <span className="nova-gradient-text">Coach sportif,</span>
            <br />
            <span className="text-nova-text-2">diététique &amp; mental.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1fr_1.6fr]">

          {/* ══ GAUCHE — Photo ══ */}
          <div ref={photoRef} className="relative">

            {/* NOA décoratif */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-center overflow-visible select-none pointer-events-none">
              <span className="font-black leading-none text-nowrap"
                style={{ fontSize: "clamp(4.5rem,13vw,7rem)", color: Y06, letterSpacing: "-0.06em" }}>
                NOA
              </span>
            </div>

            {/* Photo */}
            <div className="relative z-10" style={{ height: "300px", marginBottom: "60px" }}>
              <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-28 w-52 rounded-full blur-[55px] z-0"
                style={{ background: "rgba(238,255,0,0.18)" }} />
              <Image
                src="/noaf.png" alt="Noa – Coach Nova"
                fill sizes="340px"
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>

          {/* ══ DROITE — Cards ══ */}
          <div className="flex flex-col gap-4">

            {/* Card 1 — Citation */}
            <blockquote
              ref={(el) => addCard(el as HTMLElement, 0)}
              className="nova-card relative overflow-hidden px-6 py-6"
              style={{ background: `linear-gradient(135deg, ${CARD} 0%, #050f20 100%)`, border: `1px solid ${Y22}` }}
            >
              <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full"
                style={{ background: `linear-gradient(to bottom, ${Y}, ${Y14})` }} />
              <span className="pointer-events-none absolute right-4 top-2 select-none font-black leading-none"
                style={{ fontSize: "6rem", color: Y06, lineHeight: 1 }}>&ldquo;</span>
              <p className="relative text-[15px] font-medium leading-[1.7] text-nova-text">
                Je ne vends pas de miracles. Je t&rsquo;apprends à construire
                un corps et une discipline qui tiennent sur le long terme.
              </p>
              <footer className="mt-3 flex items-center gap-2">
                <div className="h-px flex-1" style={{ background: Y22 }} />
                <span className="text-[11px] font-semibold tracking-wide" style={{ color: Y }}>Noa · Coach Nova</span>
              </footer>
            </blockquote>

            {/* Card 2 — Formation + Spécialités */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                ref={(el) => addCard(el as HTMLElement, 1)}
                className="nova-card nova-card-line p-5 flex flex-col"
                style={{ background: `radial-gradient(circle at 100% 0%, ${Y08} 0%, transparent 55%), ${CARD}` }}
              >
                <div className="nova-icon-ring mb-3 h-11 w-11">
                  <span className="relative h-6 w-6">
                    <Image src="/icons/diploma.png" alt="Formation" fill sizes="24px"
                      className="object-contain"
                      style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                    />
                  </span>
                </div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-nova-text-3">Formation</p>
                <p className="mt-1 text-[15px] font-extrabold leading-tight text-nova-text">Master EOPS<br />
                  <span className="text-[11px] font-medium text-nova-text-2">STAPS</span>
                </p>
                <div className="mt-auto pt-3 flex items-center gap-2">
                  <span className="rounded-full px-2.5 py-0.5 text-[9px] font-bold"
                    style={{ background: Y14, color: Y }}>Bac +5</span>
                  <span className="text-[9px] text-nova-text-3">Univ. STAPS Calais</span>
                </div>
              </div>

              <div
                ref={(el) => addCard(el as HTMLElement, 2)}
                className="nova-card nova-card-line p-5"
                style={{ background: `radial-gradient(circle at 100% 0%, ${Y08} 0%, transparent 55%), ${CARD}` }}
              >
                <p className="mb-3 text-[9px] uppercase tracking-[0.16em] text-nova-text-3">Spécialités</p>
                <div className="flex flex-col gap-2">
                  {[
                    { icon: "🥗", label: "Diététique nutritionnel"      },
                    { icon: "📈", label: "Optimisation des résultats"  },
                    { icon: "🧠", label: "Accompagnement mental"        },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2.5 rounded-xl px-3 py-2"
                      style={{ background: Y08, boxShadow: `0 0 0 1px ${Y22} inset` }}>
                      <span className="text-sm leading-none">{s.icon}</span>
                      <span className="text-[11px] font-semibold" style={{ color: Y }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3 — Expérience */}
            <div
              ref={(el) => addCard(el as HTMLElement, 3)}
              className="nova-card nova-card-line flex items-center justify-between px-6 py-4"
              style={{ background: `linear-gradient(90deg, ${Y08} 0%, transparent 60%), ${CARD}` }}
            >
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-nova-text-3 mb-0.5">Expérience terrain</p>
                <p className="text-[14px] font-bold text-nova-text">5+ ans · Terrain &amp; compétition</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="h-1.5 w-28 overflow-hidden rounded-full" style={{ background: Y08 }}>
                  <div className="h-full rounded-full" style={{ width: "85%", background: `linear-gradient(to right, ${Y}, #b0cc00)` }} />
                </div>
                <span className="text-[9px]" style={{ color: Y }}>85% terrain</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Marquee avis — visible uniquement si avis ajoutés ── */}
      {reviews.length > 0 && <div className="relative mt-16 overflow-hidden">
        {/* Fade left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style={{ background: "linear-gradient(to right, #020818, transparent)" }} />
        {/* Fade right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style={{ background: "linear-gradient(to left, #020818, transparent)" }} />

        <div className="nova-marquee-track flex gap-4">
          {(() => {
            const repeat = Math.ceil(8 / reviews.length);
            const filled = Array.from({ length: repeat * 2 }, (_, i) => reviews[i % reviews.length]);
            return filled.map((r, i) => (
              <ReviewCard key={i} r={r} Y={Y} Y08={Y08} Y22={Y22} CARD={CARD} />
            ));
          })()}
        </div>
      </div>}

    </section>
  );
}
