import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft, MapPinned, Package, ShieldCheck } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/SocialIcons";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { GoldDivider, SectionHeading } from "@/components/ui/SectionHeading";
import { getProductBySlug, getProducts } from "@/lib/data/catalog";
import { getSettings } from "@/lib/data/settings";
import { toCardData, type Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { productOrderUrl } from "@/lib/whatsapp";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Producto no encontrado" };

  const title = `${product.brand?.name ?? ""} ${product.name}`.trim();
  const description = `${formatPrice(product.price)} · ${product.description || "Bolsa original de diseñador."}`.slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/producto/${product.slug}` },
    openGraph: {
      title: `${title} – ${formatPrice(product.price)}`,
      description,
      url: `/producto/${product.slug}`,
      images: product.images[0] ? [{ url: product.images[0], alt: title }] : undefined,
    },
  };
}

export default function ProductPage(props: PageProps<"/producto/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductDetails params={props.params} />
    </Suspense>
  );
}

async function ProductDetails({ params }: Pick<PageProps<"/producto/[slug]">, "params">) {
  const { slug } = await params;
  const [product, settings, all] = await Promise.all([
    getProductBySlug(slug),
    getSettings(),
    getProducts(),
  ]);
  if (!product) notFound();

  const related = relatedProducts(product, all);
  const title = `${product.brand?.name ?? ""} ${product.name}`.trim();
  const soldOut = product.status === "agotado";
  const comingSoon = product.status === "proximamente";

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        <Link
          href="/catalogo"
          className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted hover:text-accent-strong"
        >
          <ChevronLeft size={14} strokeWidth={1.6} /> Catálogo
        </Link>
      </div>

      <article className="mx-auto grid max-w-6xl gap-10 px-4 pt-6 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <ProductGallery images={product.images} alt={title} dimmed={comingSoon} />
          <div
            className={cn(
              "pointer-events-none absolute top-4 left-4 flex gap-1.5",
              product.images.length > 1 && "lg:left-28",
            )}
          >
            {product.isNew && product.status === "disponible" && <Badge>Nuevo</Badge>}
            {product.status !== "disponible" && <StatusBadge status={product.status} />}
          </div>
        </div>

        <div className="lg:pt-6">
          {product.brand && (
            <Link
              href={`/catalogo?marca=${product.brand.slug}`}
              className="text-xs font-medium uppercase tracking-[0.3em] text-ink-muted hover:text-accent-strong"
            >
              {product.brand.name}
            </Link>
          )}
          <h1 className="mt-2 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-2xl font-medium text-accent-strong">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-lg text-ink-muted line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <StatusBadge status={product.status} />
          </div>

          <GoldDivider className="my-8 justify-start" />

          {product.description && (
            <p className="whitespace-pre-line text-ink-muted">{product.description}</p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {soldOut ? (
              <Button size="lg" disabled className="sm:flex-1">
                Agotado
              </Button>
            ) : (
              <ButtonLink
                href={productOrderUrl(settings.whatsappNumber, product)}
                external
                size="lg"
                className="sm:flex-1"
              >
                <WhatsAppIcon className="size-5" />
                {comingSoon ? "Pregunta por WhatsApp" : "Pedir por WhatsApp"}
              </ButtonLink>
            )}
            {product.instagramPostUrl && (
              <ButtonLink
                href={product.instagramPostUrl}
                external
                size="lg"
                variant="secondary"
              >
                <InstagramIcon className="size-5" />
                Ver en Instagram
              </ButtonLink>
            )}
          </div>
          {soldOut && (
            <p className="mt-3 text-sm text-ink-muted">
              Esta pieza ya se vendió. Escríbenos y te avisamos si llega una similar.
            </p>
          )}

          <ul className="mt-10 space-y-4 rounded-[24px] border border-white/70 bg-white/40 p-6 text-sm">
            <Perk icon={<ShieldCheck size={20} strokeWidth={1.3} />}>
              100% original. Piezas únicas.
            </Perk>
            <Perk icon={<MapPinned size={20} strokeWidth={1.3} />}>
              Envíos a toda Guatemala por {formatPrice(settings.shippingCost)}*
            </Perk>
            <Perk icon={<Package size={20} strokeWidth={1.3} />}>
              Entrega estimada de {settings.deliveryTimeText}
            </Perk>
          </ul>
          <p className="mt-4 text-xs text-ink-muted">
            Pago por transferencia bancaria.{" "}
            <Link href="/politica-de-compras" className="underline underline-offset-2 hover:text-accent-strong">
              Ver política de compras
            </Link>
          </p>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-gold/25 bg-bg-soft/40 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHeading line1="También te" line2="puede gustar" size="md" />
            <GoldDivider className="mt-8 mb-12" />
            <ProductGrid products={related.map(toCardData)} />
          </div>
        </section>
      )}
    </>
  );
}

function Perk({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-ink">
      <span className="text-accent-strong">{icon}</span>
      {children}
    </li>
  );
}

/** Misma categoría o marca primero, luego el resto; los agotados al final. */
function relatedProducts(product: Product, all: Product[]): Product[] {
  const score = (p: Product) =>
    (p.category?.id === product.category?.id ? 2 : 0) +
    (p.brand?.id === product.brand?.id ? 1 : 0) -
    (p.status === "agotado" ? 3 : 0);
  return all
    .filter((p) => p.id !== product.id)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, 4)
    .map(({ p }) => p);
}

function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16" aria-busy="true">
      <div className="skeleton aspect-[4/5] rounded-2xl" />
      <div className="space-y-4 lg:pt-6">
        <div className="skeleton h-3 w-24 rounded-full" />
        <div className="skeleton h-10 w-3/4 rounded-full" />
        <div className="skeleton h-6 w-28 rounded-full" />
        <div className="skeleton mt-8 h-24 w-full rounded-2xl" />
        <div className="skeleton h-13 w-full rounded-full" />
      </div>
    </div>
  );
}
