-- ════════════════════════════════════════════════════════════════
-- Mueve is_admin() a un esquema privado (no expuesto por la API REST)
-- para que no se pueda invocar vía /rest/v1/rpc/is_admin.
-- ════════════════════════════════════════════════════════════════
create schema if not exists private;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
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

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to anon, authenticated;

-- Políticas apuntando a la función privada
alter policy "Admin gestiona marcas" on public.brands
  using ((select private.is_admin())) with check ((select private.is_admin()));
alter policy "Admin gestiona categorías" on public.categories
  using ((select private.is_admin())) with check ((select private.is_admin()));
alter policy "Admin gestiona productos" on public.products
  using ((select private.is_admin())) with check ((select private.is_admin()));
alter policy "Admin actualiza configuración" on public.settings
  using ((select private.is_admin())) with check ((select private.is_admin()));
alter policy "Admin lee eventos" on public.product_events
  using ((select private.is_admin()));

alter policy "Admin sube imágenes" on storage.objects
  with check (bucket_id = 'product-images' and (select private.is_admin()));
alter policy "Admin actualiza imágenes" on storage.objects
  using (bucket_id = 'product-images' and (select private.is_admin()))
  with check (bucket_id = 'product-images' and (select private.is_admin()));
alter policy "Admin elimina imágenes" on storage.objects
  using (bucket_id = 'product-images' and (select private.is_admin()));
alter policy "Admin lista imágenes" on storage.objects
  using (bucket_id = 'product-images' and (select private.is_admin()));

-- La versión pública ya no se usa: nadie puede ejecutarla
revoke execute on function public.is_admin() from public, anon, authenticated;
