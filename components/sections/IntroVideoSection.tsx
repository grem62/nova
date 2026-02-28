"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Vidéos compressées 720p (scripts/compress-videos.sh) — WebM + MP4 fallback
const VIDEOS = [
  { webm: "/intro1.webm", mp4: "/intro1_720.mp4" },
  { webm: "/intro2.webm", mp4: "/intro2_720.mp4" },
  { webm: "/intro3.webm", mp4: "/intro3_720.mp4" },
  { webm: "/intro4.webm", mp4: "/intro4_720.mp4" },
];

export function IntroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  };

  useEffect(() => {
    const v = videoRef.current;
    const section = sectionRef.current;
    if (!v || !section) return;

    const onEnded = () => setIdx((i) => (i + 1) % VIDEOS.length);
    const onPlaying = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    v.addEventListener("ended", onEnded);
    v.addEventListener("playing", onPlaying);
    v.addEventListener("pause", onPause);

    const onCanPlay = () => play();
    v.addEventListener("canplay", onCanPlay, { once: true });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) play();
      },
      { threshold: 0.1 }
    );
    observer.observe(section);

    play();

    // Quand la page devient visible (ex: onglet en arrière-plan)
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") play();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Déblocage au premier geste utilisateur
    const doc = document;
    const unlock = () => {
      play();
      doc.removeEventListener("click", unlock, true);
      doc.removeEventListener("touchstart", unlock, true);
      doc.removeEventListener("touchend", unlock, true);
      doc.removeEventListener("keydown", unlock, true);
    };
    doc.addEventListener("click", unlock, { capture: true });
    doc.addEventListener("touchstart", unlock, { capture: true });
    doc.addEventListener("touchend", unlock, { capture: true });
    doc.addEventListener("keydown", unlock, { capture: true });

    return () => {
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("canplay", onCanPlay);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      doc.removeEventListener("click", unlock, true);
      doc.removeEventListener("touchstart", unlock, true);
      doc.removeEventListener("touchend", unlock, true);
      doc.removeEventListener("keydown", unlock, true);
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    v.muted = true;
    v.play().catch(() => {});
  }, [idx]);

  return (
    <section
      ref={sectionRef}
      id="nova-intro-video"
      data-scene-section
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Fond de remplacement quand la vidéo est en pause — masque le bouton play du navigateur */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(135deg, #020818 0%, #091830 50%, #020818 100%)",
          opacity: isPlaying ? 0 : 1,
        }}
        aria-hidden
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover scale-110 nova-video-no-controls transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={VIDEOS[idx].webm} type="video/webm" />
        <source src={VIDEOS[idx].mp4} type="video/mp4" />
      </video>

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
