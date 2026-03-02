"use client";

import Image from "next/image";
import { useState } from "react";

const Y    = "#EEFF00";
const Y08  = "rgba(238,255,0,0.08)";
const Y14  = "rgba(238,255,0,0.14)";
const Y22  = "rgba(238,255,0,0.22)";
const CARD = "#061224";

const gymFeatures = ["Cardio & Musculation", "Vestiaires", "Parking gratuit", "WiFi"];

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const copyEmail = () => {
    navigator.clipboard.writeText("novacoaching.contact@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="contact"
      data-scene-section
      className="relative px-5 pt-20 pb-8 sm:px-10 lg:px-24"
      style={{ scrollMarginTop: "0rem" }}
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/assets/contact-bg2.png"
          alt=""
          fill
          sizes="100vw"
          quality={75}
          loading="lazy"
          className="object-cover"
          style={{ opacity: 0.75, objectPosition: "center 10%", imageRendering: "crisp-edges" }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020818 0%, transparent 15%, transparent 85%, #020818 100%)" }} />
      </div>

      {/* Ambient */}
      <div
        className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 h-72 w-full max-w-xl rounded-full blur-[140px]"
        style={{ background: "rgba(238,255,0,0.04)" }}
      />

      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-10" data-reveal>
          <p className="eyebrow mb-3">Lieu &amp; contact</p>
          <h2 className="section-headline nova-gradient-text tracking-in-expand">
            Où s&apos;entraîner et<br />comment me joindre.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1.3fr_1fr]" data-reveal>

          {/* ── Location ── */}
          <div className="nova-card group overflow-hidden" style={{ background: CARD }}>
            {/* Photo */}
            <div className="relative h-56 w-full overflow-hidden sm:h-64">
              <Image
                src="/assets/gym-photo.png"
                alt="Basic-Fit Berck-sur-Mer"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${CARD} 0%, ${CARD}44 40%, transparent 70%)` }} />
              {/* Badge */}
              <div
                className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md"
                style={{ border: `1px solid ${Y22}`, background: "rgba(2,8,24,0.80)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full nova-dot-pulse" style={{ background: Y }} />
                <span className="text-[10px] font-semibold tracking-wide" style={{ color: Y }}>Ouvert 24h/24</span>
              </div>
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-[1.5px]" style={{ background: `linear-gradient(to right, rgba(238,255,0,0.70) 0%, transparent 55%)` }} />
            </div>

            {/* Info */}
            <div className="px-5 pb-5 pt-3">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ border: `1px solid ${Y22}`, background: Y08 }}>
                <span className="relative h-4 w-4 shrink-0">
                  <Image src="/icons/icon-location.png" alt="" fill sizes="16px" className="object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                  />
                </span>
                <span className="text-[11px] font-semibold" style={{ color: Y }}>Berck-sur-Mer, 62610</span>
              </div>
              <h3 className="text-[18px] font-bold tracking-tight text-nova-text">Basic-Fit</h3>
              <p className="mt-0.5 text-[13px] text-nova-text-2">110 Rue de l&apos;Impératrice</p>

              {/* Tags salle */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {gymFeatures.map((f) => (
                  <span key={f} className="rounded-lg px-2 py-0.5 text-[10px] font-medium" style={{ border: `1px solid ${Y22}`, background: Y08, color: Y }}>{f}</span>
                ))}
              </div>

              {/* CTA itinéraire */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Basic-Fit%2C%20110%20Rue%20de%20l%27Imp%C3%A9ratrice%2C%2062610%20Berck-sur-Mer"
                target="_blank" rel="noreferrer"
                className="group/btn mt-4 flex items-center justify-between rounded-2xl px-4 py-3 transition"
                style={{ border: `1px solid ${Y22}`, background: Y08 }}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl" style={{ background: Y14 }}>
                    <span className="relative h-4 w-4">
                      <Image src="/icons/lieu.png" alt="" fill sizes="16px" className="object-contain"
                        style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                      />
                    </span>
                  </span>
                  <span className="text-[13px] font-semibold" style={{ color: Y }}>Obtenir l&apos;itinéraire</span>
                </div>
                <span className="transition group-hover/btn:translate-x-0.5" style={{ color: Y }}>→</span>
              </a>
            </div>
          </div>

          {/* ── Right: email + socials ── */}
          <div className="flex flex-col gap-3">

            {/* Email */}
            <div
              className="nova-card nova-card-line p-4"
              style={{ background: `radial-gradient(circle at 80% 0%, ${Y08} 0%, transparent 55%), ${CARD}` }}
            >
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none text-[4rem] font-black leading-none" style={{ color: "rgba(238,255,0,0.05)" }}>@</span>
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="eyebrow mb-1.5">Email direct</p>
                  <a href="mailto:novacoaching.contact@gmail.com" className="block truncate text-[13px] font-bold text-nova-text transition hover:text-nova-yellow">
                  novacoaching.contact@gmail.com
                  </a>
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-nova-text-3">
                    <span className="h-1 w-1 rounded-full" style={{ background: Y }} />
                    Réponse sous 24–48h
                  </span>
                </div>
                <button type="button" onClick={copyEmail}
                  className="shrink-0 rounded-xl px-3 py-2 text-[10px] font-semibold tracking-wide transition"
                  style={{ border: `1px solid ${Y22}`, background: Y08, color: copied ? Y : "#6b87b0" }}>
                  {copied ? "✓ Copié" : "Copier"}
                </button>
              </div>
              <a href="mailto:novacoaching.contact@gmail.com"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-[12px] font-semibold transition"
                style={{ border: `1px solid ${Y22}`, background: Y08, color: Y }}>
                <span className="relative h-4 w-4 shrink-0">
                  <Image src="/icons/email.png" alt="" fill sizes="16px" className="object-contain"
                    style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                  />
                </span>
                Envoyer un message
              </a>
            </div>

            {/* Hors salle */}
            <div
              className="nova-card nova-card-line p-4"
              style={{ background: `radial-gradient(circle at 80% 0%, ${Y08} 0%, transparent 55%), ${CARD}` }}
            >
              <p className="eyebrow mb-3">Hors salle</p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Suivi à domicile", icon: "/icons/icon-home.png" },
                  { label: "Séances en extérieur", icon: "/icons/icon-outdoor.png" },
                ].map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                    style={{ border: `1px solid ${Y22}`, background: Y08 }}>
                    <span className="relative h-5 w-5 shrink-0">
                      <Image src={icon} alt="" fill sizes="20px" className="object-contain"
                        style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                      />
                    </span>
                    <span className="text-[12px] font-semibold text-nova-text">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram + TikTok côte à côte */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              {[
                { platform: "Instagram", handle: "@nova.coaching", href: "https://www.instagram.com/nova_coaching__?igsh=dzBpNXllbHdwaGw4&utm_source=qr", icon: "/icons/insta.png", cta: "Suivre →", iconBg: "transparent" },
                { platform: "Facebook",    handle: "@nova.coaching", href: "https://www.facebook.com/photo/?fbid=122093566586092046&set=a.122093565908092046", icon: "/icons/facebook.png", cta: "Voir →", iconBg: "#000" },
              ].map((s) => (
                <div key={s.platform} className="nova-card nova-card-line p-4" style={{ background: `radial-gradient(circle at 70% 0%, ${Y08} 0%, transparent 60%), ${CARD}` }}>
                  <div className="nova-icon-ring mb-2.5 w-14 h-14">
                    <span className="relative h-9 w-9 overflow-hidden rounded-md" style={{ background: s.iconBg }}>
                      <Image src={s.icon} alt={s.platform} fill sizes="36px" className="object-contain" />
                    </span>
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.14em] text-nova-text-3">{s.platform}</p>
                  <p className="mt-0.5 text-[12px] font-bold text-nova-text">{s.handle}</p>
                  <a href={s.href} target="_blank" rel="noreferrer"
                    className="mt-2.5 flex items-center justify-center rounded-xl py-1.5 text-[11px] font-semibold transition"
                    style={{ border: `1px solid ${Y22}`, background: Y08, color: Y }}>
                    {s.cta}
                  </a>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
