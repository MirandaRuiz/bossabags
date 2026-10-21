import type { ProductStatus } from "@/components/ui/Badge";

/** Datos mínimos que necesita una tarjeta de producto. */
export type ProductCardData = {
  slug: string;
  name: string;
  brand: string;
  price: number;
  compareAtPrice?: number | null;
  status: ProductStatus;
  isNew?: boolean;
  image?: string | null;
};
