import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = {
  title: "Conditions générales de vente – Nova Coaching",
  description: "Conditions générales de vente des prestations de coaching Nova Coaching.",
};

export default function CGVPage() {
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

        <h1 className="mb-8 text-2xl font-bold text-nova-text">Conditions générales de vente</h1>

        <div className="space-y-8 text-[14px] leading-relaxed text-nova-text-2">
          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">1. Objet</h2>
            <p>
              Les présentes CGV s&apos;appliquent aux prestations de coaching sportif proposées par Nova Coaching (séances individuelles, programmes, accompagnement).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">2. Prestataire</h2>
            <p>
              Nova Coaching
              <br />
              [Adresse]
              <br />
              Email : novacoaching.contact@gmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">3. Offres et tarifs</h2>
            <p>
              Les offres (Essentiel, Focus, Elite) et tarifs sont communiqués lors de la séance découverte ou sur demande.
              Les prix sont indiqués TTC. La séance découverte est offerte et sans engagement.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">4. Réservation et engagement</h2>
            <p>
              La réservation se fait via le formulaire du site ou par email. Un engagement peut être conclu après la séance découverte.
              Les modalités (durée, fréquence, paiement) sont définies dans le contrat ou la proposition personnalisée.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">5. Paiement</h2>
            <p>
              Les modalités de paiement (virement, prélèvement, etc.) sont convenues lors de la souscription.
              Les factures sont envoyées par email.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">6. Annulation et report</h2>
            <p>
              Toute séance doit être annulée ou reportée au moins 24 h à l&apos;avance. Au-delà, la séance peut être considérée comme due.
              En cas d&apos;arrêt du coaching en cours d&apos;engagement, les conditions sont précisées dans le contrat.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">7. Droit de rétractation</h2>
            <p>
              Conformément à l&apos;article L.221-18 du Code de la consommation, vous disposez d&apos;un délai de 14 jours pour vous rétracter après la conclusion du contrat à distance, sans avoir à justifier de motifs.
              Ce droit ne s&apos;applique pas si vous avez expressément demandé l&apos;exécution avant la fin du délai.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">8. Responsabilité</h2>
            <p>
              Le coaching sportif est une activité à risque. Le client déclare être en capacité physique de pratiquer et s&apos;engage à informer le coach de tout problème de santé.
              Nova Coaching décline toute responsabilité en cas de blessure liée à une non-divulgation d&apos;informations médicales pertinentes.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">9. Données personnelles</h2>
            <p>
              Voir notre{" "}
              <Link href="/politique-confidentialite" className="underline" style={{ color: "#EEFF00" }}>
                Politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">10. Contact et litiges</h2>
            <p>
              Pour toute réclamation : novacoaching.contact@gmail.com
              <br />
              En cas de litige, une médiation peut être sollicitée. Pour les consommateurs : médiateur de la consommation compétent.
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
