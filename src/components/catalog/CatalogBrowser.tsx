"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { statusLabels } from "@/components/ui/Badge";
import type { Brand, Category, ProductCardData, ProductStatus } from "@/lib/types";
import { cn, normalizeText } from "@/lib/utils";

export type CatalogItem = ProductCardData & {
  brandSlug: string | null;
  categorySlug: string | null;
  searchText: string;
  createdAt: string;
  position: number;
};

const sortOptions = [
  { value: "", label: "Recomendados" },
  { value: "nuevos", label: "Más nuevos" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
] as const;

const statuses: ProductStatus[] = ["disponible", "proximamente", "agotado"];

export function CatalogBrowser({
  items,
  brands,
  categories,
}: {
  items: CatalogItem[];
  brands: Brand[];
  categories: Category[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const marca = params.get("marca") ?? "";
  const categoria = params.get("categoria") ?? "";
  const estado = params.get("estado") ?? "";
  const orden = params.get("orden") ?? "";
  const [query, setQuery] = useState(params.get("q") ?? "");

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  function clearAll() {
    setQuery("");
    startTransition(() => router.replace(pathname, { scroll: false }));
  }

  const results = useMemo(() => {
    const q = normalizeText(query);
    const filtered = items.filter(
      (p) =>
        (!marca || p.brandSlug === marca) &&
        (!categoria || p.categorySlug === categoria) &&
        (!estado || p.status === estado) &&
        (!q || p.searchText.includes(q)),
    );
    const sorted = [...filtered];
    if (orden === "nuevos") sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    else if (orden === "precio-asc") sorted.sort((a, b) => a.price - b.price);
    else if (orden === "precio-desc") sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => a.position - b.position);
    return sorted;
  }, [items, marca, categoria, estado, orden, query]);

  const hasFilters = Boolean(marca || categoria || estado || orden || query);

  return (
    <div>
      <div className="space-y-3">
        <label className="relative block">
          <span className="sr-only">Buscar productos</span>
          <Search
            size={18}
            strokeWidth={1.4}
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              update("q", e.target.value.trim());
            }}
            placeholder="Buscar por marca o modelo…"
            className="h-12 w-full rounded-full border border-gold/50 bg-white/60 pr-5 pl-12 text-ink placeholder:text-ink-muted/70 focus:border-accent focus:outline-none"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <FilterSelect
            label="Marca"
            value={marca}
            onChange={(v) => update("marca", v)}
            options={brands.map((b) => ({ value: b.slug, label: b.name }))}
            allLabel="Todas las marcas"
          />
          <FilterSelect
            label="Categoría"
            value={categoria}
            onChange={(v) => update("categoria", v)}
            options={categories.map((c) => ({ value: c.slug, label: c.name }))}
            allLabel="Todas las categorías"
          />
          <FilterSelect
            label="Disponibilidad"
            value={estado}
            onChange={(v) => update("estado", v)}
            options={statuses.map((s) => ({ value: s, label: statusLabels[s] }))}
            allLabel="Todas"
          />
          <FilterSelect
            label="Ordenar por"
            value={orden}
            onChange={(v) => update("orden", v)}
            options={sortOptions.filter((o) => o.value).map((o) => ({ ...o }))}
            allLabel={sortOptions[0].label}
          />
        </div>
      </div>

      <div className="mt-6 mb-8 flex min-h-9 items-center justify-between gap-4 border-b border-gold/30 pb-4">
        <p className="text-sm text-ink-muted" aria-live="polite">
          {results.length} {results.length === 1 ? "producto" : "productos"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-accent-strong hover:text-ink"
          >
            <X size={14} strokeWidth={1.6} /> Limpiar filtros
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ProductGrid products={results} priorityCount={4} centered={false} />
      ) : (
        <EmptyState
          title="Sin resultados"
          text="No encontramos piezas con esos filtros. Prueba con otra búsqueda o escríbenos: quizá la tenemos en camino."
          action={
            hasFilters ? (
              <Button variant="secondary" onClick={clearAll}>
                Ver todo
              </Button>
            ) : undefined
          }
        />
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  allLabel: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block pl-4 text-[0.6rem] font-medium uppercase tracking-[0.25em] text-ink-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-11 w-full appearance-none rounded-full border bg-white/60 px-4 text-sm focus:border-accent focus:outline-none",
          "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23935c3a%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_1rem_center] bg-no-repeat pr-9",
          value ? "border-accent-strong text-ink" : "border-gold/50 text-ink-muted",
        )}
      >
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
