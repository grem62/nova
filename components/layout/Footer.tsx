"use client";

type FooterProps = {
  onFaqClick: () => void;
  onReviewClick: () => void;
};

export function Footer({ onFaqClick, onReviewClick }: FooterProps) {
  return (
    <footer
      id="page-end"
      className="px-4 py-8 sm:px-6 lg:px-8"
      style={{ borderTop: "1px solid rgba(238,255,0,0.10)", background: "#020818" }}
    >
      <div className="mx-auto max-w-5xl">
        {/* Top row */}
        <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-[15px] font-semibold tracking-tight text-nova-text">Nova Coaching</p>
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={onFaqClick}
              className="text-[12px] font-medium text-nova-text-2 transition hover:text-nova-text"
            >
              FAQ
            </button>
            <a href="/#offre" className="text-[12px] font-medium text-nova-text-2 transition hover:text-nova-text">
              Séance offerte
            </a>
            <a href="mailto:novacoaching.contact@gmail.com" className="text-[12px] font-medium text-nova-text-2 transition hover:text-nova-text">
              Contact
            </a>
            <a href="/mentions-legales" className="text-[12px] font-medium text-nova-text-3 transition hover:text-nova-text-2">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="text-[12px] font-medium text-nova-text-3 transition hover:text-nova-text-2">
              Confidentialité
            </a>
            <a href="/cgu" className="text-[12px] font-medium text-nova-text-3 transition hover:text-nova-text-2">
              CGU
            </a>
            <a href="/cgv" className="text-[12px] font-medium text-nova-text-3 transition hover:text-nova-text-2">
              CGV
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="section-divider mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-2 text-[11px] text-nova-text-3 sm:flex-row sm:items-center">
          <p>© 2026 Nova Coaching. Tous droits réservés.</p>
          <p>
            Développé par{" "}
            <span className="font-medium text-nova-text-2">GremsDev</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
