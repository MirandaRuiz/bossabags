import type { SiteSettings } from "@/lib/types";

/** Valores de respaldo si no se puede leer la tabla `settings`. */
export const siteDefaults = {
  businessName: "BOSSA BAGS GT",
  logoUrl: null as string | null,
  whatsappNumber: "50200000000",
  instagramHandle: "bossabags.gt",
  shippingCost: 25,
  deliveryTimeText: "3 a 5 días hábiles",
} as const;

export type SiteInfo = Pick<
  SiteSettings,
  "businessName" | "logoUrl" | "whatsappNumber" | "instagramHandle"
>;

export const mainNav = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/como-comprar", label: "Cómo comprar" },
  { href: "/politica-de-compras", label: "Política de compras" },
  { href: "/metodo-de-pago", label: "Método de pago" },
] as const;
