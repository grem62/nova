"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Review = { id: string; name: string; text: string; stars: number };

export default function AdminAvisPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/check", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setLoggedIn(d.ok === true))
      .catch(() => setLoggedIn(false));
  }, []);

  useEffect(() => {
    if (!loggedIn) return;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
  }, [loggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
      credentials: "include",
    });
    setLoading(false);
    if (res.ok) {
      setLoggedIn(true);
      setPassword("");
    } else {
      const d = await res.json();
      setError(d.error || "Erreur de connexion");
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else if (res.status === 401) {
      setLoggedIn(false);
    }
  };

  if (loggedIn === null) {
    return (
      <div className="min-h-screen bg-[#020818] flex items-center justify-center">
        <p className="text-nova-text-2">Chargement…</p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-[#020818] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl p-6"
          style={{ border: "1px solid rgba(238,255,0,0.2)", background: "rgba(6,18,36,0.8)" }}
        >
          <h1 className="text-xl font-bold text-nova-text mb-4">Admin — Avis</h1>
          <label className="block mb-3">
            <span className="text-[11px] uppercase tracking-wider text-nova-text-3">Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: "rgba(238,255,0,0.2)", background: "rgba(0,0,0,0.3)", color: "#e8f0ff" }}
              required
            />
          </label>
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full py-2.5 text-sm font-bold uppercase tracking-wider text-black"
            style={{ background: "#EEFF00" }}
          >
            {loading ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020818] p-6 sm:p-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-nova-text">Avis clients</h1>
          <Link
            href="/"
            className="text-sm font-medium"
            style={{ color: "#EEFF00" }}
          >
            ← Retour au site
          </Link>
        </div>

        {reviews.length === 0 ? (
          <p className="text-nova-text-2">Aucun avis pour le moment.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r) => (
              <li
                key={r.id}
                className="rounded-xl p-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"
                style={{ border: "1px solid rgba(238,255,0,0.15)", background: "rgba(6,18,36,0.6)" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-nova-text">{r.name}</span>
                    <span className="text-[11px]" style={{ color: "#EEFF00" }}>
                      {Array.from({ length: r.stars }).map((_, i) => "★")}
                    </span>
                  </div>
                  <p className="text-sm text-nova-text-2 line-clamp-2">&ldquo;{r.text}&rdquo;</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(r.id)}
                  className="shrink-0 rounded-lg px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition hover:opacity-90"
                  style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.4)" }}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
