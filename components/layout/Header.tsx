"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { href: "#about",       short: "Coach",       full: "Coach" },
  { href: "#philosophie", short: "Philosophie",  full: "Philosophie" },
  { href: "#pour-qui",    short: "Pour qui ?",   full: "Pour qui ?" },
  { href: "#methode",     short: "Méthode",      full: "La méthode Nova" },
  { href: "#offre",       short: "Offre",        full: "Offre principale" },
  { href: "#contact",     short: "Contact",      full: "Lieu & Contact" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section via IntersectionObserver */
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(`#${e.target.id}`); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 sm:px-6"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className="pointer-events-auto relative mt-3 flex w-full max-w-5xl items-center justify-between overflow-visible rounded-2xl px-5 py-2.5 transition-all duration-300 backdrop-blur-xl"
        style={{
          border: scrolled ? "1px solid rgba(238,255,0,0.22)" : "1px solid rgba(238,255,0,0.08)",
          background: scrolled ? "rgba(4,8,40,0.96)" : "rgba(4,8,40,0.70)",
          boxShadow: scrolled ? "0 8px 48px rgba(0,0,0,0.65)" : "none",
        }}
      >
        {/* ── Logo ── */}
        <a href="#" className="relative shrink-0" style={{ width: "clamp(120px, 16vw, 220px)", height: "1px" }}>
          <div
            className="absolute"
            style={{
              width: "clamp(120px, 16vw, 220px)",
              height: "clamp(44px, 7vw, 90px)",
              top: "calc(clamp(44px, 7vw, 90px) / -2)",
              left: 0,
            }}
          >
            <Image
              src="/novalogo.png"
              alt="Nova Coaching"
              fill
              sizes="(max-width: 640px) 120px, (max-width: 1024px) 170px, 220px"
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center lg:flex" style={{ gap: "2px" }}>
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded-lg px-3 py-1.5 text-[11.5px] font-medium tracking-wide transition-colors duration-200"
                style={{ color: isActive ? "#EEFF00" : "rgba(168,192,224,0.80)" }}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(238,255,0,0.07)" }}
                  />
                )}
                <span className="relative">{link.short}</span>
              </a>
            );
          })}
        </nav>

        {/* ── CTA + Hamburger ── */}
        <div className="flex items-center gap-2">
          <a
            href="#offre"
            className="hidden rounded-full px-4 py-1.5 text-[11px] font-bold tracking-[0.14em] text-black transition hover:opacity-90 lg:inline-flex"
            style={{ background: "#EEFF00", boxShadow: "0 0 20px rgba(238,255,0,0.30)" }}
          >
            Séance offerte
          </a>

          {/* Hamburger */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl transition hover:text-nova-yellow lg:hidden"
            style={{
              border: "1px solid rgba(238,255,0,0.14)",
              background: "rgba(238,255,0,0.05)",
              color: isMobileMenuOpen ? "#EEFF00" : "rgba(168,192,224,0.80)",
            }}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
          >
            {isMobileMenuOpen ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden>
                <rect y="0"   width="16" height="1.5" rx="0.75" fill="currentColor" />
                <rect y="4.75" width="11" height="1.5" rx="0.75" fill="currentColor" />
                <rect y="9.5" width="16" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {isMobileMenuOpen && (
          <div
            className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-2xl shadow-2xl backdrop-blur-xl lg:hidden"
            style={{ border: "1px solid rgba(238,255,0,0.18)", background: "rgba(3,6,30,0.98)" }}
          >
            <nav className="flex flex-col p-2">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[13px] font-medium transition"
                  style={{ color: active === link.href ? "#EEFF00" : "rgba(168,192,224,0.80)" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>{link.full}</span>
                  {active === link.href && (
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#EEFF00" }} />
                  )}
                </a>
              ))}
              <div className="mx-2 my-1.5 h-px" style={{ background: "rgba(238,255,0,0.08)" }} />
              <a
                href="#offre"
                className="mx-2 mb-1.5 rounded-full py-2.5 text-center text-[11px] font-bold tracking-[0.14em] text-black transition hover:opacity-90"
                style={{ background: "#EEFF00" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Séance offerte →
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
