"use client";

import { useState } from "react";

const Y   = "#EEFF00";
const Y08 = "rgba(238,255,0,0.08)";
const Y22 = "rgba(238,255,0,0.22)";
const CARD = "#061224";

export type Review = {
  name: string;
  text: string;
  stars: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (r: Review) => void;
};

export function ReviewModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    onSave({ name: name.trim(), text: text.trim(), stars });
    setName("");
    setText("");
    setStars(5);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(2,8,24,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl p-6 shadow-2xl"
        style={{ background: CARD, border: `1px solid ${Y22}` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.16em]" style={{ color: Y }}>Témoignage</p>
            <h3 className="mt-0.5 text-[18px] font-bold text-nova-text">Laisser un avis</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-nova-text-3 transition hover:text-nova-text"
            style={{ border: `1px solid ${Y22}`, background: Y08 }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Stars */}
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-nova-text-3">Note</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStars(s)}
                  className="text-2xl transition-transform hover:scale-110"
                  style={{ color: s <= stars ? Y : "rgba(238,255,0,0.20)" }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <label className="block space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Prénom &amp; initiale <span style={{ color: "#EEFF00" }}>*</span></span>
              <span className="text-[10px]" style={{ color: name.length > 25 ? "#EEFF00" : "rgba(107,135,176,0.6)" }}>
                {name.length}/30
              </span>
            </div>
            <input
              type="text"
              placeholder="Ex : Thomas R."
              value={name}
              maxLength={30}
              onChange={(e) => setName(e.target.value)}
              required
              className="nova-input"
            />
          </label>

          {/* Text */}
          <label className="block space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Ton témoignage <span style={{ color: "#EEFF00" }}>*</span></span>
              <span
                className="text-[10px]"
                style={{ color: text.length >= 140 ? "#ff6b6b" : text.length > 110 ? "#EEFF00" : "rgba(107,135,176,0.6)" }}
              >
                {text.length}/140
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Ce que tu as vécu, ce que ça t'a apporté…"
              value={text}
              maxLength={140}
              onChange={(e) => setText(e.target.value)}
              required
              className="nova-input resize-none"
            />
            {text.length >= 140 && (
              <p className="text-[10px]" style={{ color: "#ff6b6b" }}>Limite atteinte — 140 caractères max.</p>
            )}
          </label>

          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-full py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-black transition active:scale-[0.99]"
            style={{ background: Y, boxShadow: `0 0 30px rgba(238,255,0,0.30)` }}
          >
            <span className="relative z-10">Publier mon avis →</span>
            <span className="absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 transition-transform duration-700 group-hover:translate-x-[220%]" />
          </button>
        </form>
      </div>
    </div>
  );
}
