# Vidéos d'intro (compressées 720p)

## 1. Compresser les vidéos

Place les 4 vidéos originales dans `public/`, puis :

```bash
chmod +x scripts/compress-videos.sh
./scripts/compress-videos.sh
```

**Prérequis** : ffmpeg (`brew install ffmpeg`)

Le script génère :
- `intro1_720.mp4`, `intro1.webm`
- `intro2_720.mp4`, `intro2.webm`
- `intro3_720.mp4`, `intro3.webm`
- `intro4_720.mp4`, `intro4.webm`

~4–6 Mo par vidéo au lieu de 50+ Mo.

## 2. Supprimer les originaux (optionnel)

```bash
rm public/0_Exercise_Gym_3840x2160.mp4 public/0_Fitness_Gym_3840x2160.mp4 public/6035952_Gym_Fitness_3840x2160.mp4 public/run.mp4
```

## 3. Commit et push

Les fichiers compressés sont versionnés. Plus de YouTube, plus de limite Vercel.
