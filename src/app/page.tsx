import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GoldCurves } from "@/components/brand/GoldLines";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { BagPlaceholder } from "@/components/product/BagPlaceholder";
import { ProductGrid } from "@/components/product/ProductGrid";
import { OrderSteps } from "@/components/sections/OrderSteps";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider, SectionHeading } from "@/components/ui/SectionHeading";
import { getBrands, getProducts } from "@/lib/data/catalog";
import { getSettings } from "@/lib/data/settings";
import { toCardData } from "@/lib/types";
import { instagramUrl } from "@/lib/utils";

export default async function HomePage() {
  const [settings, products, brands] = await Promise.all([
    getSettings(),
    getProducts(),
    getBrands(),
  ]);

  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = products
    .filter((p) => p.isNew)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);
  const brandsWithProducts = brands.filter((b) => products.some((p) => p.brand?.id === b.id));
  const heroImage = settings.heroImageUrl ?? featured.find((p) => p.images[0])?.images[0] ?? null;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-marble relative overflow-hidden">
        <GoldCurves variant="top-left" />
        <GoldCurves variant="bottom-right" className="hidden md:block" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div className="text-center md:text-left">
            <Logo logoUrl={settings.logoUrl} size="lg" asLink={false} className="md:hidden" />
            <h1 className="heading-display mt-8 text-5xl sm:text-6xl md:mt-0 lg:text-7xl">
              <span className="block text-ink">{settings.heroTitleLine1}</span>
              <span className="block pb-1 text-copper-gradient">{settings.heroTitleLine2}</span>
            </h1>
            {settings.heroSubtitle && (
              <p className="mx-auto mt-6 max-w-md text-lg text-ink-muted md:mx-0">
                {settings.heroSubtitle}
              </p>
            )}
            <div className="mt-10 flex flex-wrap justify-center gap-3 md:justify-start">
              <ButtonLink href="/catalogo" size="lg">
                Ver catálogo
              </ButtonLink>
              <ButtonLink href="/como-comprar" size="lg" variant="secondary">
                Cómo comprar
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm md:max-w-none">
            <div className="absolute inset-4 -z-0 translate-x-4 translate-y-4 rounded-[32px] border border-gold/60" />
            <div className="relative size-full overflow-hidden rounded-[32px] shadow-warm">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt="Bolsa destacada de BOSSA BAGS GT"
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 90vw"
                  className="object-cover"
                />
              ) : (
                <BagPlaceholder />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Destacados ───────────────────────────────────────── */}
      {featured.length > 0 && (
        <Section line1="Nuestras" line2="favoritas" eyebrow="Destacados">
          <ProductGrid products={featured.map(toCardData)} />
        </Section>
      )}

      {/* ── Novedades ────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <Section line1="Recién" line2="llegadas" eyebrow="Novedades" soft>
          <ProductGrid products={newArrivals.map(toCardData)} />
        </Section>
      )}

      {/* ── Por marca ────────────────────────────────────────── */}
      {brandsWithProducts.length > 0 && (
        <Section line1="Compra por" line2="marca" eyebrow="Marcas originales" showMore={false}>
          <ul className="flex flex-wrap justify-center gap-3">
            {brandsWithProducts.map((brand, i) => (
              <li key={brand.id}>
                <Reveal delay={i * 50}>
                  <Link
                    href={`/catalogo?marca=${brand.slug}`}
                    className="inline-flex min-h-12 items-center rounded-full border border-gold/60 bg-white/50 px-6 font-serif text-lg uppercase tracking-wide text-ink transition-colors hover:border-accent-strong hover:bg-accent-strong hover:text-white"
                  >
                    {brand.name}
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ── Cómo hacer tu pedido ─────────────────────────────── */}
      <section className="bg-marble relative overflow-hidden py-20 sm:py-24">
        <GoldCurves variant="bottom-right" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading line1="¿Cómo hacer" line2="tu pedido?" />
          <GoldDivider className="my-10" />
          <OrderSteps steps={settings.orderSteps} />
          <div className="mt-12 text-center">
            <ButtonLink href="/como-comprar" variant="secondary">
              Más detalles
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── Instagram ────────────────────────────────────────── */}
      {settings.instagramHandle && (
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <Reveal>
            <span className="mx-auto inline-flex size-16 items-center justify-center rounded-full bg-accent text-white shadow-warm">
              <InstagramIcon className="size-8" />
            </span>
            <SectionHeading
              className="mt-8"
              line1="Síguenos en"
              line2="Instagram"
              subtitle="Publicamos las piezas nuevas primero en Instagram. ¡Activa las notificaciones para no perderte nada!"
            />
            <ButtonLink
              href={instagramUrl(settings.instagramHandle)}
              external
              className="mt-10"
              size="lg"
            >
              @{settings.instagramHandle.replace(/^@/, "")}
            </ButtonLink>
          </Reveal>
        </section>
      )}
    </>
  );
}

function Section({
  line1,
  line2,
  eyebrow,
  soft,
  showMore = true,
  children,
}: {
  line1: string;
  line2: string;
  eyebrow?: string;
  soft?: boolean;
  showMore?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={soft ? "bg-bg-soft/50 py-20 sm:py-24" : "py-20 sm:py-24"}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading line1={line1} line2={line2} eyebrow={eyebrow} size="md" />
        <GoldDivider className="mt-8 mb-12" />
        {children}
        {showMore && (
          <div className="mt-12 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent-strong hover:text-ink"
            >
              Ver todo el catálogo <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
