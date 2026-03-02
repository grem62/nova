"use client";

import Link from "next/link";
import { useState } from "react";

const Y   = "#EEFF00";
const Y08 = "rgba(238,255,0,0.08)";
const Y22 = "rgba(238,255,0,0.22)";
const CARD = "#061224";

export type Review = {
  id?: string;
  name: string;
  text: string;
  stars: number;
  createdAt?: string;
  photoUrl?: string | null;
  photoBase64?: string;
  photoMime?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (r: Review) => void | Promise<void>;
};

export function ReviewModal({ open, onClose, onSave }: Props) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [stars, setStars] = useState(5);
  const [photo, setPhoto] = useState<{ base64: string; mime: string } | null>(null);
  const [consent, setConsent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 2 * 1024 * 1024) {
      setError(file && file.size > 2 * 1024 * 1024 ? "Photo max 2 Mo" : "");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhoto({ base64: result, mime: file.type });
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim() || !consent) return;
    setError("");
    setSaving(true);
    try {
      await onSave({
        name: name.trim(),
        text: text.trim(),
        stars,
        ...(photo && { photoBase64: photo.base64, photoMime: photo.mime }),
      });
      setName("");
      setText("");
      setStars(5);
      setPhoto(null);
      setConsent(false);
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur lors de l'envoi.";
      setError(msg + " Réessaie ou écris à novacoaching.contact@gmail.com");
    } finally {
      setSaving(false);
    }
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

          {/* Photo (optionnelle) */}
          <label className="block space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-nova-text">Ta photo (optionnel)</span>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className="hidden"
                id="review-photo"
              />
              <label
                htmlFor="review-photo"
                className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed transition hover:border-opacity-80"
                style={{ borderColor: Y22, background: Y08 }}
              >
                {photo ? (
                  <img src={photo.base64} alt="Aperçu" className="h-full w-full rounded-lg object-cover" />
                ) : (
                  <span className="text-[18px] text-nova-text-3">📷</span>
                )}
              </label>
              <div className="min-w-0">
                <p className="text-[11px] text-nova-text-3">
                  {photo ? "Photo ajoutée" : "JPG, PNG ou WebP — max 2 Mo"}
                </p>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto(null)}
                    className="mt-0.5 text-[10px] font-semibold"
                    style={{ color: Y }}
                  >
                    Retirer
                  </button>
                )}
              </div>
            </div>
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

          {/* Consentement RGPD */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 rounded border-2"
              style={{ borderColor: Y22, accentColor: Y }}
            />
            <span className="text-[11px] leading-relaxed text-nova-text-2">
              J&apos;accepte la publication de mon avis et le traitement de mes données selon la{" "}
              <Link href="/politique-confidentialite" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: Y }}>
                politique de confidentialité
              </Link>
              . *
            </span>
          </label>

          {error && <p className="text-sm" style={{ color: "#f87171" }}>{error}</p>}
          <button
            type="submit"
            disabled={saving || !consent}
            className="group relative w-full overflow-hidden rounded-full py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-black transition active:scale-[0.99] disabled:opacity-70"
            style={{ background: Y, boxShadow: `0 0 30px rgba(238,255,0,0.30)` }}
          >
            <span className="relative z-10">{saving ? "Envoi…" : "Publier mon avis →"}</span>
            <span className="absolute inset-0 -skew-x-12 translate-x-[-120%] bg-white/25 transition-transform duration-700 group-hover:translate-x-[220%]" />
          </button>
        </form>
      </div>
    </div>
  );
}
