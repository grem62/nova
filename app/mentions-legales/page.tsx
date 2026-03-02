import Link from "next/link";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata = {
  title: "Mentions légales – Nova Coaching",
  description: "Mentions légales du site Nova Coaching.",
};

export default function MentionsLegalesPage() {
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

        <h1 className="mb-8 text-2xl font-bold text-nova-text">Mentions légales</h1>

        <div className="space-y-8 text-[14px] leading-relaxed text-nova-text-2">
          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">1. Éditeur du site</h2>
            <p>
              <strong>Nova Coaching</strong>
              <br />
              [Forme juridique : auto-entrepreneur / SARL / etc.]
              <br />
              [Adresse complète]
              <br />
              Email : novacoaching.contact@gmail.com
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">2. Directeur de la publication</h2>
            <p>Noa</p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">3. Hébergement</h2>
            <p>
              Vercel Inc.
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789, USA
              <br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#EEFF00" }}>
                vercel.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">4. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, logos, vidéos) est protégé par le droit d&apos;auteur.
              Toute reproduction ou utilisation non autorisée est interdite.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">5. Liens hypertextes</h2>
            <p>
              Les liens vers des sites externes n&apos;engagent pas la responsabilité de Nova Coaching.
              La création de liens vers ce site est soumise à autorisation préalable.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-[16px] font-semibold text-nova-text">6. Contact</h2>
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
