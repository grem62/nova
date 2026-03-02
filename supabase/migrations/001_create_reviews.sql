-- Table des avis clients
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  stars integer not null check (stars >= 1 and stars <= 5),
  created_at timestamptz default now()
);

-- RLS : lecture publique, écriture via service role
alter table public.reviews enable row level security;

create policy "Lecture publique des avis"
  on public.reviews for select
  using (true);

create policy "Insert via service role"
  on public.reviews for insert
  with check (false); -- bloqué côté RLS, on utilise service_role qui bypass

create policy "Delete via service role"
  on public.reviews for delete
  using (false); -- idem
