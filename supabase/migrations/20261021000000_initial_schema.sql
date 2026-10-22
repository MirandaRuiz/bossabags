-- ════════════════════════════════════════════════════════════════
-- BOSSA BAGS GT · Esquema inicial
-- ════════════════════════════════════════════════════════════════

-- ── Tipos ───────────────────────────────────────────────────────
create type public.product_status as enum ('disponible', 'agotado', 'proximamente');
create type public.product_event_type as enum ('view', 'whatsapp_click');

-- ── Utilidades ──────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Administradores ─────────────────────────────────────────────
-- Solo los correos listados aquí pueden escribir. Se agregan con SQL
-- (ver README), nunca desde el sitio.
create table public.admin_users (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
-- Sin políticas: nadie puede leer ni escribir esta tabla vía API.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users a
    where a.email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ── Marcas ──────────────────────────────────────────────────────
create table public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ── Categorías ──────────────────────────────────────────────────
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ── Productos ───────────────────────────────────────────────────
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  description text not null default '',
  price numeric(10, 2) not null check (price >= 0),
  compare_at_price numeric(10, 2) check (compare_at_price is null or compare_at_price >= 0),
  brand_id uuid references public.brands (id) on delete set null,
  category_id uuid references public.categories (id) on delete set null,
  status public.product_status not null default 'disponible',
  is_featured boolean not null default false,
  is_new boolean not null default false,
  instagram_post_url text,
  images text[] not null default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_brand_id_idx on public.products (brand_id);
create index products_category_id_idx on public.products (category_id);
create index products_status_idx on public.products (status);
create index products_sort_idx on public.products (sort_order, created_at desc);

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- ── Configuración (una sola fila) ───────────────────────────────
create table public.settings (
  id boolean primary key default true check (id),
  business_name text not null default 'BOSSA BAGS GT',
  logo_url text,
  whatsapp_number text not null default '',
  instagram_handle text not null default '',
  hero_title_line1 text not null default '',
  hero_title_line2 text not null default '',
  hero_subtitle text not null default '',
  hero_image_url text,
  bank_name text not null default '',
  account_type text not null default '',
  account_number text not null default '',
  account_holder text not null default '',
  shipping_cost numeric(10, 2) not null default 25 check (shipping_cost >= 0),
  delivery_time_text text not null default '',
  order_steps jsonb not null default '[]'::jsonb check (jsonb_typeof(order_steps) = 'array'),
  purchase_policies jsonb not null default '[]'::jsonb check (jsonb_typeof(purchase_policies) = 'array'),
  updated_at timestamptz not null default now()
);

create trigger settings_set_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

-- ── Eventos (vistas y clics de WhatsApp) ────────────────────────
create table public.product_events (
  id bigint generated always as identity primary key,
  product_id uuid not null references public.products (id) on delete cascade,
  type public.product_event_type not null,
  created_at timestamptz not null default now()
);

create index product_events_product_idx on public.product_events (product_id, created_at desc);
create index product_events_type_idx on public.product_events (type, created_at desc);

-- ════════════════════════════════════════════════════════════════
-- Row Level Security
-- ════════════════════════════════════════════════════════════════
alter table public.brands enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.settings enable row level security;
alter table public.product_events enable row level security;

-- Lectura pública
create policy "Lectura pública de marcas" on public.brands
  for select to anon, authenticated using (true);
create policy "Lectura pública de categorías" on public.categories
  for select to anon, authenticated using (true);
create policy "Lectura pública de productos" on public.products
  for select to anon, authenticated using (true);
create policy "Lectura pública de configuración" on public.settings
  for select to anon, authenticated using (true);

-- Escritura solo admin
create policy "Admin gestiona marcas" on public.brands
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admin gestiona categorías" on public.categories
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admin gestiona productos" on public.products
  for all to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admin actualiza configuración" on public.settings
  for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

-- Eventos: cualquiera registra, solo el admin lee
create policy "Público registra eventos" on public.product_events
  for insert to anon, authenticated with check (true);
create policy "Admin lee eventos" on public.product_events
  for select to authenticated using ((select public.is_admin()));
