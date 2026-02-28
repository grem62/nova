# Vidéos d'intro (YouTube)

## Variable Vercel — Configuration exacte

1. Vercel → ton projet → **Settings** → **Environment Variables**
2. **Add New** :
   - **Key** : `NEXT_PUBLIC_YOUTUBE_VIDEO_IDS`
   - **Value** : `WkxwB9hGExE,RADDFCCN_LY,FeiIkkfe7LU,8vPWF4JJXIY`
   - **Important** : pas d'espaces, pas de guillemets, juste les IDs séparés par des virgules
3. Coche **Production** et **Preview**
4. **Save**
5. **Redeploy** (Deployments → ⋮ → Redeploy)

## Erreurs fréquentes

- ❌ `NEXT_PUBLIC_YOUTUBE_VIDEO_IDS = "WkxwB9hGExE,..."` → pas de guillemets dans la valeur
- ❌ Espaces : `WkxwB9hGExE, RADDFCCN_LY` → éviter les espaces après les virgules
- ❌ Mauvaise casse : `next_public_youtube_video_ids` → doit être exactement `NEXT_PUBLIC_YOUTUBE_VIDEO_IDS`

## Vidéos YouTube

Les 4 vidéos doivent être **Public** et **Autoriser l'intégration** activé (YouTube Studio → Détails de la vidéo).
