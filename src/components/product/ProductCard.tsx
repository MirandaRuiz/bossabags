import Image from "next/image";
import Link from "next/link";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { BagPlaceholder } from "@/components/product/BagPlaceholder";
import type { ProductCardData } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

export function ProductCard({
  product,
  priority = false,
}: {
  product: ProductCardData;
  priority?: boolean;
}) {
  const { slug, name, brand, price, compareAtPrice, status, isNew, image } = product;
  const soldOut = status === "agotado";
  const comingSoon = status === "proximamente";

  return (
    <Link
      href={`/producto/${slug}`}
      className="group block rounded-2xl focus-visible:outline-offset-4"
    >
      <article>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bg-soft shadow-warm">
          {image ? (
            <Image
              src={image}
              alt={`${brand} ${name}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              priority={priority}
              className={cn(
                "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                soldOut && "grayscale-[35%]",
              )}
            />
          ) : (
            <BagPlaceholder />
          )}

          {comingSoon && <div className="absolute inset-0 bg-bg/45 backdrop-blur-[1px]" />}

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {isNew && status === "disponible" && <Badge>Nuevo</Badge>}
            {status !== "disponible" && <StatusBadge status={status} />}
          </div>
        </div>

        <div className="px-1 pt-4">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-ink-muted">
            {brand}
          </p>
          <h3 className="mt-1 line-clamp-2 font-serif text-lg leading-snug text-ink">{name}</h3>
          <p className="mt-1.5 flex items-baseline gap-2">
            <span className="font-medium text-accent-strong">{formatPrice(price)}</span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="text-sm text-ink-muted line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </p>
        </div>
      </article>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden>
      <div className="skeleton aspect-[4/5] rounded-2xl" />
      <div className="space-y-2 px-1 pt-4">
        <div className="skeleton h-2.5 w-16 rounded-full" />
        <div className="skeleton h-4 w-3/4 rounded-full" />
        <div className="skeleton h-3.5 w-14 rounded-full" />
      </div>
    </div>
  );
}
