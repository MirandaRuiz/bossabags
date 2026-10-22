import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogBrowser, type CatalogItem } from "@/components/catalog/CatalogBrowser";
import { ProductGridSkeleton } from "@/components/product/ProductGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { getBrands, getCategories, getProducts } from "@/lib/data/catalog";
import { toCardData } from "@/lib/types";
import { normalizeText } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Catálogo",
  description:
    "Explora nuestras bolsas originales de Michael Kors, Kate Spade, Guess, Steve Madden y más. Filtra por marca, categoría y disponibilidad.",
  alternates: { canonical: "/catalogo" },
};

export default async function CatalogPage() {
  const [products, brands, categories] = await Promise.all([
    getProducts(),
    getBrands(),
    getCategories(),
  ]);

  const items: CatalogItem[] = products.map((p, i) => ({
    ...toCardData(p),
    brandSlug: p.brand?.slug ?? null,
    categorySlug: p.category?.slug ?? null,
    searchText: normalizeText(`${p.name} ${p.brand?.name ?? ""} ${p.category?.name ?? ""}`),
    createdAt: p.createdAt,
    position: i,
  }));

  const usedBrands = brands.filter((b) => products.some((p) => p.brand?.id === b.id));

  return (
    <>
      <PageHeader
        line1="Nuestro"
        line2="catálogo"
        subtitle="Piezas originales y únicas. Cuando encuentres la tuya, pídela por WhatsApp."
      />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* useSearchParams necesita un límite de Suspense */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <CatalogBrowser items={items} brands={usedBrands} categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
