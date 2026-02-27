"use client";

import Image from "next/image";
import { useState } from "react";

const Y   = "#EEFF00";
const Y08 = "rgba(238,255,0,0.08)";
const Y22 = "rgba(238,255,0,0.22)";
const CARD = "#061224";

const perks = [
  { icon: "/icons/a-temps.png",                  text: "60 min d'échange et de bilan structuré." },
  { icon: "/icons/haltere.png",                  text: "Mini séance pour voir comment tu bouges." },
  { icon: "/icons/commande-traitee (1).png",     text: "Projection claire sur les prochaines semaines." },
];

const objectifOptions = [
  { value: "",        label: "Choisir…" },
  { value: "n1",     label: "Niveau 1 — Débutant" },
  { value: "n2",     label: "Niveau 2 — Intermédiaire" },
  { value: "n3",     label: "Niveau 3 — Athlète" },
  { value: "objA",   label: "Objectif A — Recomposition" },
  { value: "objB",   label: "Objectif B — Préparation Spécifique" },
];

export function OfferSection() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom:            fd.get("nom"),
          email:          fd.get("email"),
          objectif:       fd.get("objectif"),
          disponibilites: fd.get("disponibilites"),
          message:        fd.get("message"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok ? "success" : "error");
      if (!res.ok && data?.error) setErrorMsg(data.error);
    } catch {
      setStatus("error");
      setErrorMsg("Connexion impossible.");
    }
  };

  return (
    <section
      id="offre"
      data-scene-section
      className="relative px-5 py-20 sm:px-10 lg:px-24"
    >
      {/* Background image — full width */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/assets/weights-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.18 }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #020818 0%, transparent 20%, transparent 80%, #020818 100%)" }} />
      </div>

      {/* Ambient */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-96 w-96 rounded-full blur-[130px]"
        style={{ background: "rgba(238,255,0,0.05)" }}
      />

      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-8 grid-cols-1 lg:grid-cols-[1fr_1.2fr] lg:items-start">

          {/* ── LEFT ── */}
          <div className="space-y-6" data-reveal>
            <p className="eyebrow">Offre principale</p>

            {/* Prix */}
            <div className="flex items-end gap-3">
              <span
                className="nova-gradient-text font-black leading-none"
                style={{ fontSize: "clamp(4rem,10vw,6rem)", letterSpacing: "-0.05em" }}
              >
                0
              </span>
              <div className="mb-2 flex flex-col gap-1.5">
                <span className="text-[1.3rem] font-semibold text-nova-text-2">€</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em]"
                  style={{ background: Y08, color: Y, border: `1px solid ${Y22}` }}
                >
                  Offert
                </span>
              </div>
            </div>

            <h2 className="section-headline tracking-in-expand leading-tight">
              Séance découverte<br />offerte.
            </h2>
            <p className="section-body text-[15px]">
              60 minutes pour faire le point sur ta situation, clarifier tes
              objectifs et voir comment la méthode Nova peut s&apos;intégrer
              dans ton quotidien.
            </p>

            {/* Perks */}
            <ul className="space-y-3">
              {perks.map((p) => (
                <li key={p.text} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: Y08, border: `1px solid ${Y22}` }}
                  >
                    <span className="relative h-4 w-4">
                      <Image src={p.icon} alt="" fill sizes="16px" className="object-contain"
                        style={{ filter: "brightness(0) saturate(100%) invert(97%) sepia(100%) saturate(700%) hue-rotate(22deg) brightness(108%)" }}
                      />
                    </span>
                  </span>
                  <span className="text-[14px] leading-relaxed text-nova-text-2 pt-0.5">{p.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — Formulaire ── */}
          <div
            className="nova-card nova-card-line p-6 sm:p-8"
            data-reveal
            style={{ background: `radial-gradient(circle at 50% 0%, ${Y08} 0%, transparent 55%), ${CARD}` }}
          >
            <div className="mb-6 flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full nova-dot-pulse" style={{ background: Y }} />
              <p className="eyebrow text-nova-text-2">Réservation de la séance</p>
            </div>

            <form className="space-y-3" onSubmit={handleSubmit}>

              {/* Nom + Email */}
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Nom</span>
                  <input name="nom" type="text" placeholder="Ton nom complet" className="nova-input" required />
                </label>
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Email</span>
                  <input name="email" type="email" placeholder="ton@email.com" className="nova-input" required />
                </label>
              </div>

              {/* Objectif — menu déroulant */}
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Objectif & Niveau</span>
                <div className="relative">
                  <select
                    name="objectif"
                    className="nova-input w-full appearance-none pr-8"
                    defaultValue=""
                    required
                    style={{ background: "rgba(6,18,36,0.80)", color: "inherit" }}
                  >
                    {objectifOptions.map((o) => (
                      <option key={o.value} value={o.value} disabled={o.value === ""}
                        style={{ background: "#061224", color: "#e8f0ff" }}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  {/* Chevron */}
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px]" style={{ color: Y }}>▼</span>
                </div>
              </label>

              {/* Disponibilités */}
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Disponibilités / semaine</span>
                <div className="relative">
                  <select
                    name="disponibilites"
                    className="nova-input w-full appearance-none pr-8"
                    defaultValue=""
                    style={{ background: "rgba(6,18,36,0.80)", color: "inherit" }}
                  >
                    <option value="" disabled style={{ background: "#061224", color: "#e8f0ff" }}>Choisir…</option>
                    <option value="1j"  style={{ background: "#061224", color: "#e8f0ff" }}>1 jour / semaine</option>
                    <option value="2j"  style={{ background: "#061224", color: "#e8f0ff" }}>2 jours / semaine</option>
                    <option value="3j"  style={{ background: "#061224", color: "#e8f0ff" }}>3 jours / semaine</option>
                    <option value="4j"  style={{ background: "#061224", color: "#e8f0ff" }}>4 jours / semaine</option>
                    <option value="4j+" style={{ background: "#061224", color: "#e8f0ff" }}>Plus de 4 jours / semaine</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px]" style={{ color: Y }}>▼</span>
                </div>
              </label>

              {/* Message */}
              <label className="block space-y-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Message</span>
                <textarea name="message" rows={2} placeholder="Contexte, blessures, objectifs précis…" className="nova-input resize-none" />
              </label>

              {/* Feedback */}
              {status === "success" && (
                <div className="rounded-xl px-4 py-3 text-[12px] font-medium" style={{ background: "rgba(238,255,0,0.08)", border: "1px solid rgba(238,255,0,0.22)", color: Y }}>
                  ✓ Demande envoyée ! Je te réponds sous 24–48h.
                </div>
              )}
              {status === "error" && (
                <div className="rounded-xl px-4 py-3 text-[12px] font-medium" style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.22)", color: "#ff6b6b" }}>
                  {errorMsg || "Une erreur est survenue."} Réessaie ou écris à novacoaching.contact@gmail.com
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="group relative mt-2 w-full overflow-hidden rounded-full py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-black transition active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: Y, boxShadow: `0 0 40px rgba(238,255,0,0.35)` }}
              >
                <span className="relative z-10">
                  {status === "loading" ? "Envoi en cours…" : status === "success" ? "Envoyé ✓" : "Envoyer ma demande →"}
                </span>
                <span className="absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 transition-transform duration-700 group-hover:translate-x-[220%]" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
