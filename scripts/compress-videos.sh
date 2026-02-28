#!/bin/bash
# Compresse les 4 vidéos d'intro pour le web (720p, sans audio)
# Prérequis : ffmpeg installé (brew install ffmpeg)
# Usage : ./scripts/compress-videos.sh

set -e
cd "$(dirname "$0")/.."
INPUTS=(
  "public/0_Exercise_Gym_3840x2160.mp4"
  "public/0_Fitness_Gym_3840x2160.mp4"
  "public/6035952_Gym_Fitness_3840x2160.mp4"
  "public/run.mp4"
)
OUTPUTS=("intro1" "intro2" "intro3" "intro4")

for i in "${!INPUTS[@]}"; do
  inp="${INPUTS[$i]}"
  out="${OUTPUTS[$i]}"
  if [[ ! -f "$inp" ]]; then
    echo "⚠️  $inp introuvable, ignoré"
    continue
  fi
  echo "📹 $inp → ${out}_720.mp4 + ${out}.webm"
  # MP4 720p (fallback, large compatibilité)
  ffmpeg -y -i "$inp" -vf "scale=1280:-2" -crf 30 -preset slow -an "public/${out}_720.mp4"
  # WebM VP9 (20-40% plus léger)
  ffmpeg -y -i "$inp" -vf "scale=1280:-2" -c:v libvpx-vp9 -crf 35 -b:v 0 -an "public/${out}.webm"
done
echo "✅ Terminé. Place les fichiers dans public/ et mets à jour IntroVideoSection."
