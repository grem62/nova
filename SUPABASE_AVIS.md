# Configuration Supabase pour les avis

## 1. Créer un projet Supabase

1. Va sur [supabase.com](https://supabase.com) et crée un compte
2. New Project → choisis un nom et une région
3. Une fois le projet créé, va dans **Settings → API**
4. Copie :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **service_role** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Créer la table `reviews`

Exécute les migrations dans l'ordre (SQL Editor) :
- `supabase/migrations/001_create_reviews.sql`
- `supabase/migrations/002_add_photo_url.sql` (ajoute la colonne photo)

## 3. Variables d'environnement

Dans `.env.local` (et Vercel → Settings → Environment Variables) :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
ADMIN_PASSWORD=ton_mot_de_passe_pour_admin
```

## 4. Dashboard admin

- URL : `https://ton-site.com/admin/avis`
- Connexion avec le mot de passe défini dans `ADMIN_PASSWORD`
- Permet de supprimer des avis
