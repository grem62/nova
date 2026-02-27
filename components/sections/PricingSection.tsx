"use client";

const plans = [
  {
    id: "starter",
    label: "Essentiel",
    price: "160 € / mois",
    description:
      "Un bloc d’entraînement à la fois pour installer une vraie régularité.",
    features: [
      "1–2 séances personnalisées / semaine",
      "Bilan mensuel",
      "Accès à l’application d’entraînement"
    ],
    highlighted: false
  },
  {
    id: "focus",
    label: "Focus",
    price: "240 € / mois",
    description:
      "L’offre recommandée pour une transformation physique visible et des perfs en hausse.",
    features: [
      "3–4 séances personnalisées / semaine",
      "Analyse technique en vidéo toutes les 2 semaines",
      "Structure nutritionnelle & repères macro",
      "Support messages sur horaires définis"
    ],
    highlighted: true
  },
  {
    id: "elite",
    label: "Elite",
    price: "Sur devis",
    description:
      "Accompagnement haut de gamme pour sportifs et profils à agenda chargé.",
    features: [
      "Calendrier d’entraînement entièrement sur‑mesure",
      "Appels stratégie hebdomadaires",
      "Séances en présentiel ou hybrid",
      "Temps de réponse prioritaire"
    ],
    highlighted: false
  }
];

export function PricingSection() {
  return (
    <section
      id="pricing"
      data-scene-section
      className="relative px-6 py-20 lg:px-16"
    >
      <div className="mb-10 max-w-xl space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Offre principale
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
          Séance découverte offerte pour faire le point.
        </h2>
        <p className="text-sm text-slate-300">
          60 minutes pour analyser ta situation, clarifier tes objectifs et
          voir si le coaching Nova est fait pour toi.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            data-reveal
            className={`flex h-full flex-col rounded-3xl border p-5 shadow-xl shadow-black/60 ${
              plan.highlighted
                ? "border-nova-yellow bg-slate-950/80"
                : "border-slate-700/70 bg-slate-950/60"
            }`}
          >
            {plan.highlighted && (
              <p className="mb-3 inline-flex items-center rounded-full bg-nova-yellow px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950">
                Recommandé
              </p>
            )}
            <h3 className="text-lg font-semibold text-slate-50">{plan.label}</h3>
            <p className="mt-1 text-sm text-slate-300">{plan.description}</p>
            <p className="mt-4 text-xl font-semibold text-slate-50">
              {plan.price}
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-200">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-nova-yellow" />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-slate-600/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 hover:border-nova-yellow hover:text-nova-yellow">
              Parler de cette offre
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

