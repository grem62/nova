"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function LegalPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer onFaqClick={() => {}} onReviewClick={() => {}} />
    </>
  );
}
