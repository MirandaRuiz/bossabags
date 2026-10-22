import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import type { ProductCardData } from "@/lib/types";
import { cn } from "@/lib/utils";

const gridClasses = "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4";
// En escritorio, las filas incompletas pueden quedar centradas
const centeredClasses =
  "grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:flex lg:flex-wrap lg:justify-center";

export function ProductGrid({
  products,
  priorityCount = 0,
  centered = true,
  className,
}: {
  products: ProductCardData[];
  priorityCount?: number;
  centered?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn(centered ? centeredClasses : gridClasses, className)}>
      {products.map((p, i) => (
        <li key={p.slug} className={cn(centered && "lg:w-[calc(25%-18px)]")}>
          <Reveal delay={(i % 4) * 70}>
            <ProductCard product={p} priority={i < priorityCount} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className={gridClasses} aria-busy="true" aria-label="Cargando productos">
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
