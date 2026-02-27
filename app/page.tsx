"use client";

import { useRef, useState, useEffect } from "react";
import { useScrollScene } from "@/hooks/useScrollScene";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { IntroVideoSection } from "@/components/sections/IntroVideoSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { AudienceSection } from "@/components/sections/AudienceSection";
import { MethodSection } from "@/components/sections/MethodSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { OfferSection } from "@/components/sections/OfferSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqOverlay } from "@/components/sections/FaqOverlay";
import { ReviewModal, type Review } from "@/components/layout/ReviewModal";

const STORAGE_KEY = "nova_reviews";

export default function Page() {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useScrollScene(containerRef);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setReviews(JSON.parse(stored));
    } catch {}
  }, []);

  const handleSaveReview = (r: Review) => {
    const updated = [...reviews, r];
    setReviews(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch {}
  };

  return (
    <>
      <Header />
      <main
        ref={containerRef}
        className="scene-gradient relative min-h-screen overflow-x-hidden pt-0"
      >
        <IntroVideoSection />
        <AboutSection reviews={reviews} />
        
        <PhilosophySection/>
        <AudienceSection/>
        <MethodSection/>
        <OfferSection/>
        <ContactSection />

        {/* ── Bandeau avis juste sous Contact ── */}
        <div className="px-5 pb-8 pt-2 sm:px-10 lg:px-24" style={{ background: "#020818" }}>
          <div
            className="mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-2xl px-6 py-5 sm:flex-row sm:justify-between"
            style={{ border: "1px solid rgba(238,255,0,0.14)", background: "rgba(238,255,0,0.04)" }}
          >
            <div>
              <p className="text-[14px] font-semibold text-nova-text">Tu as travaillé avec Noa ?</p>
              <p className="mt-0.5 text-[12px] text-nova-text-3">Partage ton expérience, ça aide d&apos;autres personnes à se lancer.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsReviewOpen(true)}
              className="shrink-0 rounded-full px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#EEFF00", boxShadow: "0 0 24px rgba(238,255,0,0.25)" }}
            >
              Laisser un avis →
            </button>
          </div>
        </div>

      </main>
      <Footer onFaqClick={() => setIsFaqOpen(true)} onReviewClick={() => setIsReviewOpen(true)} />
      <FaqOverlay open={isFaqOpen} onClose={() => setIsFaqOpen(false)} />
      <ReviewModal open={isReviewOpen} onClose={() => setIsReviewOpen(false)} onSave={handleSaveReview} />
    </>
  );
}
