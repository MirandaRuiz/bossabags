-- ════════════════════════════════════════════════════════════════
-- BOSSA BAGS GT · Datos iniciales de ejemplo
-- Se puede ejecutar varias veces sin duplicar datos.
-- ════════════════════════════════════════════════════════════════

-- ── Marcas ──────────────────────────────────────────────────────
insert into public.brands (name, slug, sort_order) values
  ('Michael Kors',    'michael-kors',    1),
  ('Steve Madden',    'steve-madden',    2),
  ('Guess',           'guess',           3),
  ('Kate Spade',      'kate-spade',      4),
  ('Tommy Hilfiger',  'tommy-hilfiger',  5),
  ('DKNY',            'dkny',            6),
  ('Karl Lagerfeld',  'karl-lagerfeld',  7)
on conflict (slug) do nothing;

-- ── Categorías ──────────────────────────────────────────────────
insert into public.categories (name, slug, sort_order) values
  ('Bolsas de mano', 'bolsas-de-mano', 1),
  ('Crossbody',      'crossbody',      2),
  ('Totes',          'totes',          3),
  ('Carteras',       'carteras',       4),
  ('Mochilas',       'mochilas',       5)
on conflict (slug) do nothing;

-- ── Configuración ───────────────────────────────────────────────
insert into public.settings (
  id, business_name, whatsapp_number, instagram_handle,
  hero_title_line1, hero_title_line2, hero_subtitle,
  bank_name, account_type, account_number, account_holder,
  shipping_cost, delivery_time_text, order_steps, purchase_policies
) values (
  true,
  'BOSSA BAGS GT',
  '50200000000',
  'bossabags.gt',
  'Bolsas originales',
  'de diseñador',
  'Piezas únicas de tus marcas favoritas, con envío a toda Guatemala.',
  'Banco Industrial',
  'Monetaria',
  '000-000000-0',
  'Nombre del titular',
  25,
  '3 a 5 días hábiles',
  '[
    {"icon": "bag",    "title": "Escoge el producto que más te gusta"},
    {"icon": "camera", "title": "Envíanos foto y te indicamos disponibilidad"},
    {"icon": "money",  "title": "Realiza tu pago por transferencia bancaria"},
    {"icon": "heart",  "title": "Compártenos tu información", "items": ["Nombre", "Celular", "Dirección de entrega", "Comprobante de pago"]}
  ]'::jsonb,
  '[
    {"icon": "camera", "title": "Disponibilidad",        "text": "La disponibilidad se confirma al momento de solicitar tu producto."},
    {"icon": "heart",  "title": "Pedido confirmado",     "text": "Tu pedido queda confirmado al verificar el pago."},
    {"icon": "money",  "title": "Forma de pago",         "text": "Aceptamos únicamente transferencia bancaria."},
    {"icon": "map",    "title": "Envíos",                "text": "Realizamos envíos a toda Guatemala por Q25*."},
    {"icon": "box",    "title": "Tiempo de entrega",     "text": "Entrega estimada de 3 a 5 días hábiles."},
    {"icon": "bag",    "title": "Cambios y devoluciones","text": "No hay cambios ni devoluciones, ya que son piezas únicas."},
    {"icon": "heart",  "title": "Originalidad",          "text": "Todos nuestros artículos son 100% originales."}
  ]'::jsonb
)
on conflict (id) do nothing;

-- ── Productos de ejemplo ────────────────────────────────────────
insert into public.products (
  name, slug, description, price, compare_at_price,
  brand_id, category_id, status, is_featured, is_new, sort_order
)
select
  p.name, p.slug, p.description, p.price, p.compare_at_price,
  b.id, c.id, p.status::public.product_status, p.is_featured, p.is_new, p.sort_order
from (values
  ('Jet Set Travel Tote', 'michael-kors-jet-set-travel-tote',
   'Tote amplia en piel saffiano con herrajes dorados. Perfecta para el día a día: cabe tu laptop, agenda y todo lo que necesitas.',
   1250.00, 1450.00, 'michael-kors', 'totes', 'disponible', true, true, 1),
  ('Knott Medium Satchel', 'kate-spade-knott-medium-satchel',
   'Bolsa de mano estructurada en piel con asa superior y correa ajustable para usar crossbody.',
   1490.00, null, 'kate-spade', 'bolsas-de-mano', 'disponible', true, false, 2),
  ('Noelle Crossbody', 'guess-noelle-crossbody',
   'Crossbody compacta con logo en relieve y cadena dorada. Ideal para salir de noche.',
   690.00, null, 'guess', 'crossbody', 'agotado', false, false, 3),
  ('Bvital Shoulder Bag', 'steve-madden-bvital-shoulder-bag',
   'Bolsa de hombro acolchada en tono nude con correa de cadena.',
   590.00, null, 'steve-madden', 'bolsas-de-mano', 'proximamente', false, true, 4),
  ('Monogram Mini Backpack', 'tommy-hilfiger-monogram-mini-backpack',
   'Mochila mini con monograma clásico y detalles en piel sintética. Ligera y versátil.',
   790.00, null, 'tommy-hilfiger', 'mochilas', 'disponible', true, true, 5)
) as p(name, slug, description, price, compare_at_price, brand_slug, category_slug, status, is_featured, is_new, sort_order)
join public.brands b on b.slug = p.brand_slug
join public.categories c on c.slug = p.category_slug
on conflict (slug) do nothing;
