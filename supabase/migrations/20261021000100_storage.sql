-- ════════════════════════════════════════════════════════════════
-- Storage: imágenes de productos y de marca (logo, hero)
--   products/{product_id}/...  fotos de productos
--   site/...                   logo e imagen del hero
-- ════════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-images',
  'product-images',
  true,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do nothing;

-- El bucket es público: las imágenes se sirven por URL pública sin política SELECT
-- (así nadie puede listar el contenido del bucket vía API).

create policy "Admin sube imágenes" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and (select public.is_admin()));

create policy "Admin actualiza imágenes" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and (select public.is_admin()))
  with check (bucket_id = 'product-images' and (select public.is_admin()));

create policy "Admin elimina imágenes" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and (select public.is_admin()));

-- El admin necesita SELECT para que upsert/delete funcionen desde el cliente
create policy "Admin lista imágenes" on storage.objects
  for select to authenticated
  using (bucket_id = 'product-images' and (select public.is_admin()));
