#!/usr/bin/env node
/**
 * Script pour uploader les vidéos vers Vercel Blob.
 *
 * Prérequis :
 * 1. Créer un Blob Store : Vercel Dashboard → Storage → Create Database → Blob
 * 2. Ajouter BLOB_READ_WRITE_TOKEN dans .env.local
 * 3. Lancer : node scripts/upload-videos-to-blob.mjs
 */

import { put } from "@vercel/blob";
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "public");

const VIDEO_FILES = [
  "0_Exercise_Gym_3840x2160.mp4",
  "0_Fitness_Gym_3840x2160.mp4",
  "6035952_Gym_Fitness_3840x2160.mp4",
  "run.mp4",
];

// Charger .env.local
try {
  const envPath = join(__dirname, "..", ".env.local");
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const match = line.match(/^([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const val = match[2].trim().replace(/^["']|["']$/g, "");
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
} catch (_) {}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("❌ BLOB_READ_WRITE_TOKEN manquant.");
  console.error("   Vercel Dashboard → Storage → Create Blob → copie le token dans .env.local");
  process.exit(1);
}

console.log("📤 Upload des vidéos vers Vercel Blob...\n");

const urls = [];
for (const file of VIDEO_FILES) {
  const path = join(PUBLIC_DIR, file);
  if (!existsSync(path)) {
    console.warn(`⚠️  ${file} introuvable, ignoré`);
    continue;
  }
  const buffer = readFileSync(path);
  const blob = await put(`videos/${file}`, buffer, {
    access: "public", // Le store doit être PUBLIC (Vercel → Storage → ton Blob → Settings)
    contentType: "video/mp4",
  });
  urls.push(blob.url);
  console.log(`✓ ${file}`);
}

if (urls.length === 0) {
  console.error("\n❌ Aucune vidéo trouvée dans public/");
  process.exit(1);
}

// L'URL de base (sans le nom du fichier) pour NEXT_PUBLIC_VIDEO_BASE_URL
const baseUrl = urls[0].replace(/\/[^/]+\.mp4$/, "");
console.log("\n✅ Upload terminé !\n");
console.log("Ajoute cette variable dans Vercel (Settings → Environment Variables) :\n");
console.log("  NEXT_PUBLIC_VIDEO_BASE_URL =", baseUrl);
console.log("\nOu utilise les URLs complètes dans ton code si tu préfères.");
