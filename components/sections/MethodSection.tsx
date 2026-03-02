"use client";

import Image from "next/image";

const Y   = "#EEFF00";
const Y14 = "rgba(238,255,0,0.14)";
const Y22 = "rgba(238,255,0,0.22)";
const CARD = "#061224";

const steps = [
  {
    num: "01",
    title: "Analyse initiale",
    subtitle: "Bilan & objectifs",
    description: "On part de ton niveau réel : historique, contraintes, blessures, temps disponible et environnement.",
    icon: "/icons/icon-analyse.png",
    outcomes: ["Diagnostic complet", "Objectifs définis", "Contraintes ciblées"],
  },
  {
    num: "02",
    title: "Programmation",
    subtitle: "Plan sur-mesure",
    description: "Structure d'entraînement claire, adaptée à ton emploi du temps, avec des paliers de progression précis.",
    icon: "/icons/icon-manette.png",
    outcomes: ["Planning semainier", "Charges calibrées", "Paliers définis"],
  },
  {
    num: "03",
    title: "Suivi continu",
    subtitle: "Ajustements & résultats",
    description: "Analyse hebdomadaire des retours, adaptation des charges et focus sur la durabilité des résultats.",
    icon: "/icons/icon-recherche.png",
    outcomes: ["Bilan hebdomadaire", "Charges ajustées", "Résultats mesurés"],
  },
];

export function MethodSection() {

  return (
    <section
      id="methode"
      data-scene-section
      className="relative px-5 py-20 sm:px-10 lg:px-24"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full blur-[140px]"
        style={{ background: "rgba(238,255,0,0.05)" }}
      />

      <div className="mx-auto w-full max-w-5xl">

        {/* ── Header — titre seul, épuré ── */}
        <div className="mb-12" data-reveal>
          <p className="eyebrow mb-3">La méthode Nova</p>
          <h2 className="section-headline nova-gradient-text tracking-in-expand">
            Un cadre clair,<br />une exécution à la pointe.
          </h2>
        </div>

        {/* ── Spotlight cards ── */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-3" data-reveal>
          {steps.map((step) => (
            <div
              key={step.num}
              className="nova-method-card"
              style={{
                background: `radial-gradient(circle at 50% 0%, rgba(238,255,0,0.10) 0%, transparent 60%), ${CARD}`,
                minHeight: "22rem",
              } as React.CSSProperties}
            >
              {/* Grand numéro décoratif en fond */}
              <span
                className="pointer-events-none absolute left-3 top-2 select-none font-black leading-none"
                style={{
                  fontSize: "5.5rem",
                  color: "rgba(238,255,0,0.05)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                }}
                aria-hidden
              >
                {step.num}
              </span>

              {/* Subtitle pill — top right */}
              <div
                className="absolute right-4 top-4 z-10 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em]"
                style={{ background: Y14, color: Y, border: `1px solid ${Y22}` }}
              >
                {step.subtitle}
              </div>

              {/* Light layer */}
              <div className="light-layer">
                <div className="slit" />
                <div className="lumen">
                  <div className="min" />
                  <div className="mid" />
                  <div className="hi" />
                </div>
                <div className="darken">
                  <div className="sl" />
                  <div className="ll" />
                  <div className="slt" />
                  <div className="srt" />
                </div>
              </div>

              {/* Icon */}
              <div className="spotlight-icon spotlight-icon-bounce" aria-hidden>
                <Image
                  src={step.icon}
                  alt=""
                  width={40}
                  height={40}
                  className="spotlight-icon-img"
                  style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                />
              </div>

              {/* Content */}
              <div className="content" style={{ opacity: 1, transform: "none" }}>
                <div className="bottom">
                  {/* Titre + description */}
                  <h4 style={{ fontSize: "1rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: "0.76rem", lineHeight: 1.65 }}>
                    {step.description}
                  </p>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
