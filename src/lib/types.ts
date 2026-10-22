import type { Enums } from "@/lib/supabase/database.types";

export type ProductStatus = Enums<"product_status">;

export type IconKey = "bag" | "camera" | "money" | "heart" | "box" | "map";

export type OrderStep = { icon: IconKey; title: string; items?: string[] };
export type PurchasePolicy = { icon: IconKey; title: string; text: string };

export type SiteSettings = {
  businessName: string;
  logoUrl: string | null;
  whatsappNumber: string;
  instagramHandle: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroSubtitle: string;
  heroImageUrl: string | null;
  bankName: string;
  accountType: string;
  accountNumber: string;
  accountHolder: string;
  shippingCost: number;
  deliveryTimeText: string;
  orderSteps: OrderStep[];
  purchasePolicies: PurchasePolicy[];
};

export type Brand = { id: string; name: string; slug: string };
export type Category = { id: string; name: string; slug: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice: number | null;
  status: ProductStatus;
  isFeatured: boolean;
  isNew: boolean;
  instagramPostUrl: string | null;
  images: string[];
  brand: Brand | null;
  category: Category | null;
  createdAt: string;
};

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

export function toCardData(p: Product): ProductCardData {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand?.name ?? "",
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    status: p.status,
    isNew: p.isNew,
    image: p.images[0] ?? null,
  };
}
