# BOSSA BAGS GT · Catálogo web

Catálogo de bolsas originales de diseñador. Los pedidos se hacen por WhatsApp y se pagan por transferencia bancaria.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase · Vercel

## Desarrollo local

1. Instala dependencias: `npm install`
2. Copia variables: `cp .env.example .env.local`
3. Inicia: `npm run dev` → http://localhost:3000
4. Guía de estilo (todos los componentes): http://localhost:3000/estilo

## Base de datos (Supabase)

- Proyecto: `bossa-bags-gt` (región `us-east-1`).
- Migraciones en `supabase/migrations/`, datos de ejemplo en `supabase/seed.sql`.
- Tablas: `brands`, `categories`, `products`, `settings` (una sola fila), `product_events`, `admin_users`.
- Permisos (RLS): el público solo lee; solo los correos en `admin_users` pueden escribir.
- Imágenes: bucket público `product-images` (`products/{id}/…` y `site/…`).

### Agregar una administradora

En Supabase → SQL Editor:

```sql
insert into public.admin_users (email) values ('correo@ejemplo.com');
```

Luego crea el usuario en Authentication → Users → *Add user* con ese mismo correo.
Los registros públicos están desactivados: nadie más puede crear cuenta.

### Regenerar los tipos de TypeScript

```bash
npx supabase login
npm run db:types
```

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run lint` | Revisión de código |
| `npm run db:types` | Regenera los tipos de la base de datos |

## Estructura

```
src/
  app/            Páginas (App Router)
  components/
    brand/        Logo, líneas doradas, íconos de redes
    layout/       Header, Footer, botón flotante de WhatsApp
    product/      Tarjeta de producto, placeholder
    ui/           Botones, badges, íconos, títulos, tarjetas
  lib/
    data/         Lecturas con caché (productos, marcas, configuración)
    supabase/     Clientes de Supabase y tipos generados
supabase/
  migrations/     Esquema de la base de datos
  seed.sql        Datos de ejemplo
```

> Este README se completa en la Fase 7 (Supabase, token de Instagram, despliegue en Vercel y uso del admin).
