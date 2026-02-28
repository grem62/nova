"use client";

import Image from "next/image";

// IDs YouTube (par défaut ou via NEXT_PUBLIC_YOUTUBE_VIDEO_IDS)
const DEFAULT_IDS = ["WkxwB9hGExE", "RADDFCCN_LY", "FeiIkkfe7LU", "8vPWF4JJXIY"];
const YOUTUBE_IDS = (
  process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_IDS ?? DEFAULT_IDS.join(",")
)
  .split(",")
  .map((id) => id.trim())
  .filter(Boolean);

// youtube-nocookie.com évite certains blocages d'embed sur les domaines tiers (Vercel)
const EMBED_URL =
  YOUTUBE_IDS.length > 0
    ? `https://www.youtube-nocookie.com/embed/${YOUTUBE_IDS[0]}?playlist=${YOUTUBE_IDS.join(",")}&autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`
    : null;

export function IntroVideoSection() {
  return (
    <section
      id="nova-intro-video"
      data-scene-section
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {EMBED_URL ? (
        <div className="absolute inset-0 min-h-full min-w-full overflow-hidden">
          <iframe
            src={EMBED_URL}
            title="Nova Coaching - Vidéo d'intro"
            className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full min-w-full w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-110"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            data-parallax-layer="slow"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#020818]" />
      )}

      {/* ── Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020818]/95 via-[#020818]/65 to-[#020818]/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020818] via-transparent to-[#020818]/40" />
      {/* Ambient jaune bas-gauche */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full blur-[100px]"
        style={{ background: "rgba(238,255,0,0.08)" }}
      />

      {/* ── Contenu ── */}
      <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-20">
        <div className="max-w-3xl" data-reveal>
          {/* Headline */}
          <h1
            className="nova-gradient-text tracking-in-expand font-bold"
            style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", letterSpacing: "-0.03em", lineHeight: "1.08" }}
          >
            Un environnement<br />
            <span className="relative inline-block overflow-visible" style={{ color: "#EEFF00", WebkitTextFillColor: "#EEFF00" }}>
              {/* Étoile à gauche du N, barre au-dessus de NOVA */}
              <span
                className="pointer-events-none absolute"
                style={{ left: "-1.95em", top: "-2.05em", width: "5em", height: "5.5em" }}
                aria-hidden
              >
                <Image
                  src="/novaintro.png"
                  alt=""
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 1024px) 220px, 288px"
                  className="object-contain select-none"
                  style={{ opacity: 0.95 }}
                  priority
                />
              </span>
              <span className="relative z-10">
                <span style={{ color: "#ffffff", WebkitTextFillColor: "#ffffff", fontSize: "0.9em" }}>NOVA</span>
                <span style={{ color: "#EEFF00", WebkitTextFillColor: "#EEFF00" }}>teur pour</span>
              </span>
            </span><br />
            révéler votre potentiel.
          </h1>

          {/* Sub */}
          <p className="mt-4 sm:mt-6 text-[0.95rem] sm:text-[1.05rem] leading-relaxed text-nova-text-2 max-w-md">
            Méthode personnalisée. Suivi sérieux.<br />Résultats mesurables.
          </p>

          {/* CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="#offre"
              className="group relative inline-flex h-12 sm:h-14 items-center overflow-hidden rounded-full px-7 sm:px-10 text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-black transition"
              style={{ background: "#EEFF00", boxShadow: "0 0 40px rgba(238,255,0,0.40)" }}
            >
              <span className="relative z-10">Séance offerte →</span>
              <span className="absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 transition-transform duration-700 group-hover:translate-x-[220%]" />
            </a>
            <a
              href="#philosophie"
              className="inline-flex h-12 sm:h-12 items-center rounded-full px-6 sm:px-8 text-[11px] sm:text-[12px] font-medium tracking-wide text-nova-text transition"
              style={{ border: "1px solid rgba(238,255,0,0.20)", background: "rgba(238,255,0,0.04)" }}
            >
              Découvrir la méthode
            </a>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="text-[9px] uppercase tracking-[0.22em]" style={{ color: "rgba(238,255,0,0.40)" }}>
          Scroll
        </span>
        <div
          className="scroll-indicator flex h-9 w-5 items-start justify-center rounded-full pt-1.5"
          style={{ border: "1px solid rgba(238,255,0,0.20)" }}
        >
          <div className="h-1.5 w-0.5 rounded-full" style={{ background: "#EEFF00" }} />
        </div>
      </div>

      {/* ── Fade vers la section suivante ── */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        style={{ background: "linear-gradient(to top, #020818, transparent)" }}
      />
    </section>
  );
}
