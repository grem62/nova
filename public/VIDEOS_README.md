# Vidéo d'intro (Vimeo)

YouTube ne fonctionne pas correctement en embed. Utilise **Vimeo** à la place.

## Étapes

1. **Créer un compte** sur [vimeo.com](https://vimeo.com) (gratuit)
2. **Uploader une vidéo** (ou les 4 en une seule avec un montage)
   - Compte gratuit : 500 Mo/semaine
3. **Récupérer l'ID** : vimeo.com/123456789 → l'ID est `123456789`
4. **Paramètres de la vidéo** : Autoriser le partage → Intégrer sur n'importe quel site
5. **Vercel** : Settings → Environment Variables
   - `NEXT_PUBLIC_VIMEO_VIDEO_ID` = `123456789`

## Pour 4 vidéos

Option A : Monte les 4 en une seule vidéo sur Vimeo  
Option B : Utilise la meilleure des 4 comme vidéo unique
