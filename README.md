# BOSSA BAGS GT · Catálogo web

Catálogo de bolsas originales de diseñador. Los pedidos se hacen por WhatsApp y se pagan por transferencia bancaria.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Supabase · Vercel

## Desarrollo local

1. Instala dependencias: `npm install`
2. Copia variables: `cp .env.example .env.local`
3. Inicia: `npm run dev` → http://localhost:3000
4. Guía de estilo (todos los componentes): http://localhost:3000/estilo

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compilación de producción |
| `npm run lint` | Revisión de código |

## Estructura

```
src/
  app/            Páginas (App Router)
  components/
    brand/        Logo, líneas doradas, íconos de redes
    layout/       Header, Footer, botón flotante de WhatsApp
    product/      Tarjeta de producto, placeholder
    ui/           Botones, badges, íconos, títulos, tarjetas
  lib/            Utilidades, tipos, valores por defecto
```

> Este README se completa en la Fase 7 (Supabase, token de Instagram, despliegue en Vercel y uso del admin).
