"use client";

const faqs = [
  {
    question: "Les débutants sont-ils acceptés ?",
    answer:
      "Oui. La méthode Nova est justement pensée pour t’accompagner dès tes premiers pas, sans te noyer sous les consignes."
  },
  {
    question: "Combien de séances par semaine ?",
    answer:
      "On adapte en fonction de ton emploi du temps&nbsp;: de 2 à 5 séances, avec une priorité donnée à la régularité."
  },
  {
    question: "En combien de temps puis-je voir des résultats ?",
    answer:
      "Les premiers changements arrivent souvent en 4 à 6 semaines. Les vraies transformations se construisent plutôt sur plusieurs mois."
  },
  {
    question: "La nutrition est-elle incluse ?",
    answer:
      "Tu auras des repères clairs et une structure simple à suivre, sans plan rigide impossible à tenir."
  },
  {
    question: "Quels sont les tarifs ?",
    answer:
      "Ils dépendent du niveau d’accompagnement choisi. La séance découverte offerte sert justement à identifier ce qui te correspond."
  }
];

export function FaqSection() {
  return (
    <section
      id="faq"
      data-scene-section
      className="relative px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl space-y-3" data-reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
            FAQ
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl tracking-in-expand">
            Les questions qu&apos;on te pose souvent.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((item) => (
            <div
              key={item.question}
              className="rounded-2xl border border-slate-700/70 bg-slate-950/70 p-4 text-sm text-slate-200 shadow-md shadow-black/50"
              data-reveal
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {item.question}
              </p>
              <p className="mt-2 text-sm text-slate-200">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

