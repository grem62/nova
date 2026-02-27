# Vidéos d'intro

Les vidéos MP4 (~114 Mo) ne sont pas versionnées sur GitHub pour garder le dépôt léger.

## En local

Place les 4 fichiers dans `public/` :
- `0_Exercise_Gym_3840x2160.mp4`
- `0_Fitness_Gym_3840x2160.mp4`
- `6035952_Gym_Fitness_3840x2160.mp4`
- `run.mp4`

## En production (Vercel, etc.)

1. Héberge les vidéos sur un CDN (Vercel Blob, Cloudflare R2, etc.)
2. Ajoute dans `.env.local` :
   ```
   NEXT_PUBLIC_VIDEO_BASE_URL=https://ton-cdn.com/videos
   ```
3. L’URL finale sera : `https://ton-cdn.com/videos/run.mp4` etc.
