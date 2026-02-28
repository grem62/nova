"use client";

const steps = [
  {
    num: "01",
    title: "Diagnostic",
    text: "On part de ton niveau réel : contraintes, récupération, historique et objectifs précis.",
  },
  {
    num: "02",
    title: "Stratégie",
    text: "Un plan simple, calibré sur ton rythme de vie, avec des priorités et des paliers clairs.",
  },
  {
    num: "03",
    title: "Exécution",
    text: "Séances structurées, charge progressive et standards techniques non négociables.",
  },
  {
    num: "04",
    title: "Pilotage",
    text: "Suivi hebdomadaire, ajustements des volumes et maintien de la qualité d'exécution.",
  },
  {
    num: "05",
    title: "Résultat durable",
    text: "Performance mesurable et progression stable, sans dépendre de solutions court terme.",
  },
];

export function PhilosophySection() {
  return (
    <section
      id="philosophie"
      data-scene-section
      className="relative px-5 py-20 sm:px-10 lg:px-24"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full blur-[120px]"
        style={{ background: "rgba(238,255,0,0.05)" }}
      />

      <div className="mx-auto w-full max-w-5xl">
        {/* ── Header ── */}
        <div className="mb-10 grid gap-6 lg:grid-cols-2 lg:items-end" data-reveal>
          <div className="space-y-4">
            <p className="eyebrow">La philosophie</p>
            <h2 className="section-headline nova-gradient-text tracking-in-expand">
              Construire le résultat<br />dont on rêve.
            </h2>
          </div>
          <p className="section-body max-w-md self-end pb-1 text-[15px]">
            Rien n&apos;est laissé au hasard : chaque cycle suit une logique
            claire, des décisions basées sur les données et le terrain.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative flex gap-8 lg:gap-14">

          {/* Ligne verticale + fill animé (CSS) */}
          <div
            className="relative hidden w-[2px] shrink-0 lg:block"
            style={{ background: "rgba(238,255,0,0.08)" }}
          >
            <div
              className="timeline-fill absolute inset-x-0 top-0 h-full origin-top rounded-full"
              style={{ background: "linear-gradient(to bottom, #EEFF00 0%, rgba(238,255,0,0.25) 100%)" }}
            />
          </div>

          {/* Steps */}
          <div className="flex-1 space-y-2.5">
            {steps.map((step) => (
              <div
                key={step.num}
                data-reveal
                className="timeline-step group flex items-start gap-4 rounded-xl p-4 transition"
                style={{
                  background: "rgba(6,18,36,0.60)",
                  border: "1px solid rgba(238,255,0,0.10)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Node */}
                <div className="timeline-node shrink-0" style={{ transitionDuration: "0.4s" }}>
                  {step.num}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-[14px] font-bold tracking-tight text-nova-text">
                      {step.title}
                    </h3>
                    <span
                      className="h-px flex-1"
                      style={{ background: "rgba(238,255,0,0.10)" }}
                    />
                  </div>
                  <p className="text-[12px] leading-relaxed text-nova-text-2">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
