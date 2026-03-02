import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = {
  title: "Conditions générales d'utilisation – Nova Coaching",
  description: "Conditions générales d'utilisation du site Nova Coaching.",
};

export default function CGUPage() {
  return (
    <LegalPageLayout>
      <div className="min-h-screen bg-[#020818] text-nova-text pt-20">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-[12px] font-medium transition hover:opacity-80"
          style={{ color: "#EEFF00" }}
        >
          ← Retour à l&apos;accueil
        </Link>

        <h1 className="mb-8 text-2xl font-bold text-nova-text">Conditions générales d&apos;utilisation</h1>

        <div className="space-y-8 text-[14px] leading-relaxed text-nova-text-2">
          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">1. Objet</h2>
            <p>
              Les présentes CGU régissent l&apos;utilisation du site nova-coaching.fr (ou domaine associé) édité par Nova Coaching.
              En accédant au site, vous acceptez ces conditions.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">2. Services proposés</h2>
            <p>
              Le site présente les services de coaching sportif de Nova Coaching : informations, formulaire de réservation de séance découverte, avis clients, contact.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">3. Utilisation du site</h2>
            <p>
              Vous vous engagez à utiliser le site de manière conforme aux lois en vigueur et à ne pas :
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Publier de contenu illicite, diffamatoire ou contraire à l&apos;ordre public</li>
              <li>Usurper l&apos;identité d&apos;autrui</li>
              <li>Perturber le fonctionnement du site ou tenter d&apos;y accéder de manière non autorisée</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">4. Données personnelles</h2>
            <p>
              Le traitement des données personnelles est décrit dans notre{" "}
              <Link href="/politique-confidentialite" className="underline" style={{ color: "#EEFF00" }}>
                Politique de confidentialité
              </Link>
              . En soumettant un formulaire, vous acceptez cette politique.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">5. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu du site (textes, images, logos, vidéos) est protégé. Toute reproduction ou exploitation non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">6. Limitation de responsabilité</h2>
            <p>
              Nova Coaching s&apos;efforce de maintenir le site accessible et à jour. Toutefois, nous ne pouvons garantir une disponibilité continue ni l&apos;absence d&apos;erreurs.
              Les informations présentées ont une valeur indicative.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">7. Modifications</h2>
            <p>
              Nova Coaching se réserve le droit de modifier les présentes CGU. Les modifications prennent effet dès leur publication sur le site.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">8. Contact</h2>
            <p>
              Pour toute question :{" "}
              <a href="mailto:novacoaching.contact@gmail.com" className="underline" style={{ color: "#EEFF00" }}>
                novacoaching.contact@gmail.com
              </a>
            </p>
          </section>
        </div>

        <p className="mt-12 text-[11px] text-nova-text-3">
          Dernière mise à jour : février 2026
        </p>
      </div>
      </div>
    </LegalPageLayout>
  );
}
