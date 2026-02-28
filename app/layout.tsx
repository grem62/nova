import "./globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Suspense } from "react";
import { StarsBackground } from "@/components/layout/StarsBackground";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Nova Coaching – Coaching sportif premium",
  description:
    "Landing page cinématique 3D pour Nova Coaching : coaching sportif personnalisé, programmes sur‑mesure et accompagnement haute performance."
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body
        data-motion-style="bold"
        className="bg-scene-bg text-nova-text font-display antialiased"
      >
        <Suspense fallback={null}>
          <StarsBackground />
        </Suspense>
        {props.children}
        <Analytics />
      </body>
    </html>
  );
}
