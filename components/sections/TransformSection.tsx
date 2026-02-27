"use client";

const transformations = [
  {
    id: "t1",
    label: "Recomposition fine",
    quote:
      "“J’ai perdu deux tailles tout en me sentant plus forte sur chaque mouvement. Le plan avait toujours du sens, semaine après semaine.”"
  },
  {
    id: "t2",
    label: "Force & confiance",
    quote:
      "“On a repris ma technique depuis zéro. Aujourd’hui je bouge plus lourd, avec moins de douleur et beaucoup plus de contrôle.”"
  },
  {
    id: "t3",
    label: "Boost de performance",
    quote:
      "“Les séances piquent, mais dans le bon sens. Je suis plus rapide sur le terrain et mon cardio suit enfin mes objectifs.”"
  }
];

export function TransformSection() {
  return (
    <section
      id="transformations"
      data-scene-section
      className="relative px-6 py-20 lg:px-16"
    >
      <div className="mb-10 max-w-xl space-y-3">
        <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
          Méthode Nova
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-slate-50">
          Trois étapes simples, aucun raccourci.
        </h2>
        <p className="text-sm text-slate-300">
          De la première analyse au suivi long terme, chaque étape de l&apos;
          accompagnement a un rôle clair.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article
          data-reveal
          className="space-y-3 rounded-3xl border border-slate-700/70 bg-slate-950/60 p-5 shadow-xl shadow-black/60"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            1. Analyse initiale
          </p>
          <p className="text-sm text-slate-300">
            Bilan physique, historique sportif, habitudes de vie et objectifs
            précis. On fait le point sur ton point de départ réel.
          </p>
        </article>
        <article
          data-reveal
          className="space-y-3 rounded-3xl border border-slate-700/70 bg-slate-950/60 p-5 shadow-xl shadow-black/60"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            2. Programmation personnalisée
          </p>
          <p className="text-sm text-slate-300">
            Plan d&apos;entraînement évolutif, calé sur ton planning et ton
            matériel, avec des paliers clairs et des indicateurs de progression.
          </p>
        </article>
        <article
          data-reveal
          className="space-y-3 rounded-3xl border border-slate-700/70 bg-slate-950/60 p-5 shadow-xl shadow-black/60"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            3. Suivi &amp; optimisation
          </p>
          <p className="text-sm text-slate-300">
            Ajustements réguliers, retours techniques, adaptation de la charge
            de travail et du volume pour garder une progression visible.
          </p>
        </article>
      </div>
    </section>
  );
}

