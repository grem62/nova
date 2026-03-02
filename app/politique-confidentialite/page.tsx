import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = {
  title: "Politique de confidentialité – Nova Coaching",
  description: "Politique de confidentialité et protection des données personnelles – Nova Coaching.",
};

export default function PolitiqueConfidentialitePage() {
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

        <h1 className="mb-8 text-2xl font-bold text-nova-text">Politique de confidentialité</h1>

        <div className="space-y-8 text-[14px] leading-relaxed text-nova-text-2">
          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">1. Responsable du traitement</h2>
            <p>
              Nova Coaching traite vos données personnelles en tant que responsable du traitement.
              <br />
              Contact : novacoaching.contact@gmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">2. Données collectées</h2>
            <p>
              Nous collectons les données suivantes lorsque vous utilisez nos formulaires ou services :
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li><strong>Formulaire de contact / réservation</strong> : nom, adresse email, objectif, disponibilités, message</li>
              <li><strong>Formulaire d&apos;avis</strong> : prénom, témoignage, note, photo (optionnelle)</li>
              <li><strong>Cookies techniques</strong> : session d&apos;administration (accès réservé)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">3. Finalités et base légale</h2>
            <p>
              Vos données sont traitées pour :
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Répondre à vos demandes de contact et de réservation</li>
              <li>Publier vos avis (avec votre consentement explicite)</li>
              <li>Gérer la relation client et les prestations de coaching</li>
            </ul>
            <p className="mt-3">
              Le traitement repose sur votre <strong>consentement</strong> (formulaires) et sur l&apos;<strong>exécution de contrats</strong> (prestations de coaching).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">4. Durée de conservation</h2>
            <p>
              Les données de contact sont conservées 3 ans après le dernier échange.
              Les avis sont conservés tant qu&apos;ils sont affichés sur le site (suppression possible sur demande).
              Les cookies de session expirent à la fermeture du navigateur.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">5. Sous-traitants</h2>
            <p>
              Nous utilisons les services suivants, qui peuvent traiter vos données :
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li><strong>Vercel</strong> (hébergement) – USA</li>
              <li><strong>Resend</strong> (envoi d&apos;emails) – USA</li>
              <li><strong>Supabase</strong> (base de données avis) – UE</li>
              <li><strong>Vercel Blob</strong> (stockage photos avis) – USA</li>
            </ul>
            <p className="mt-3">
              Des garanties appropriées (clauses contractuelles types, etc.) sont mises en place pour les transferts hors UE.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">6. Vos droits (RGPD)</h2>
            <p>
              Vous disposez des droits suivants :
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li><strong>Droit d&apos;accès</strong> : obtenir une copie de vos données</li>
              <li><strong>Droit de rectification</strong> : corriger des données inexactes</li>
              <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition</strong> : vous opposer à certains traitements</li>
            </ul>
            <p className="mt-3">
              Pour exercer ces droits :{" "}
              <a href="mailto:novacoaching.contact@gmail.com" className="underline" style={{ color: "#EEFF00" }}>
                novacoaching.contact@gmail.com
              </a>
            </p>
            <p className="mt-2">
              Vous pouvez également introduire une réclamation auprès de la CNIL :{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#EEFF00" }}>
                cnil.fr
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">7. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, perte ou altération.
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
