-- Ajouter la colonne photo pour les avis
alter table public.reviews add column if not exists photo_url text;
