"use client";

export function ResultsSection() {
  return (
    <section
      id="resultats"
      data-scene-section
      className="relative px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl space-y-3" data-reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            Résultats
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl tracking-in-expand">
            Des trajectoires qui se voient.
          </h2>
          <p className="text-sm text-slate-300">
            Transformations physiques, confiance retrouvée, performances qui
            montent&nbsp;: les chiffres et les retours parlent d&apos;eux‑mêmes.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article
            className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-xl shadow-black/60"
            data-reveal
          >
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Transformations
          </p>
          <p className="mt-3 text-3xl font-semibold text-nova-yellow">
            +{">"} 30
          </p>
          <p className="mt-1 text-sm text-slate-200">
            transformations suivies avec photos avant / après et mesures
            objectives.
          </p>
        </article>

        <article
          className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-xl shadow-black/60"
          data-reveal
        >
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Avis clients
          </p>
          <p className="mt-3 text-3xl font-semibold text-nova-yellow">4,9/5</p>
          <p className="mt-1 text-sm text-slate-200">
            moyenne de satisfaction sur l&apos;accompagnement, la pédagogie et le
            suivi.
          </p>
        </article>

        <article
          className="rounded-3xl border border-slate-700/70 bg-slate-950/70 p-5 shadow-xl shadow-black/60"
          data-reveal
        >
          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Statistiques de progression
          </p>
          <p className="mt-3 text-3xl font-semibold text-nova-yellow">+35%</p>
          <p className="mt-1 text-sm text-slate-200">
            progression moyenne sur les indicateurs clés (force, volume
            d&apos;entraînement, constance).
          </p>
        </article>
        </div>
      </div>
    </section>
  );
}

