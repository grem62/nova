"use client";

const programs = [
  {
    id: "weight-loss",
    label: "Programme Perte de Poids",
    description:
      "Entraînements à haut rendement, stratégie nutritionnelle tenable et suivi rapproché pour perdre du gras sans exploser ton énergie.",
    duration: "12 semaines",
    price: "À partir de 180 € / mois"
  },
  {
    id: "muscle-building",
    label: "Programme Prise de Muscle",
    description:
      "Surcharge progressive, suivi des performances et protocoles de récupération pour gagner du volume sec et dessiner ta silhouette.",
    duration: "16 semaines",
    price: "À partir de 220 € / mois"
  },
  {
    id: "athletic-performance",
    label: "Programme Performance Athlétique",
    description:
      "Force explosive, vitesse et condition physique taillées pour les sportifs qui ont besoin de puissance à la demande.",
    duration: "10–16 semaines",
    price: "Plans sur‑mesure"
  }
];

export function ProgramsSection() {
  return (
    <section
      id="programs"
      data-scene-section
      className="relative px-6 py-20 lg:px-16"
    >
      <div className="mb-10 max-w-xl space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Pour qui ?
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
          À qui s&apos;adresse le coaching Nova&nbsp;?
        </h2>
        <p className="text-sm text-slate-300">
          Que tu démarres, que tu souhaites passer un cap ou que tu prépares une
          échéance précise, la méthode s&apos;adapte à ton profil.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {programs.map((program) => (
          <article
            key={program.id}
            data-reveal
            className="group flex flex-col justify-between rounded-3xl border border-slate-700/70 bg-slate-950/60 p-5 shadow-xl shadow-black/60 transition-transform duration-300 hover:-translate-y-2 hover:border-nova-yellow/80"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-slate-50">
                {program.label}
              </h3>
              <p className="text-sm text-slate-300">{program.description}</p>
            </div>
            <div className="mt-6 space-y-2 text-sm text-slate-200">
              <p className="flex items-center justify-between text-slate-300">
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  Durée
                </span>
                <span>{program.duration}</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  À partir de
                </span>
                <span>{program.price}</span>
              </p>
              <button className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-nova-yellow px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950 transition group-hover:bg-nova-yellow/90">
                Commencer
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

