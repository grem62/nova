import "./globals.css";
import type { ReactNode } from "react";
import type { Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Nova",
  description:
    "Landing page cinématique 3D pour Nova Coaching : coaching sportif personnalisé, programmes sur‑mesure et accompagnement haute performance.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon.png", sizes: "any", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
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
        {props.children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
