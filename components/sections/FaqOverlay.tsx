"use client";

import { FaqSection } from "@/components/sections/FaqSection";

type FaqOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function FaqOverlay({ open, onClose }: FaqOverlayProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-slate-700/80 bg-slate-950/95 shadow-2xl shadow-black/80"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-slate-700/80 bg-slate-900/80 px-2 py-1 text-xs uppercase tracking-[0.18em] text-slate-300 hover:border-nova-yellow hover:text-nova-yellow"
        >
          Fermer
        </button>
        <FaqSection />
      </div>
    </div>
  );
}

