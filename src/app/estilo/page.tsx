import type { Metadata } from "next";
import { Banknote, Camera, HeartHandshake, MapPinned, Package, ShoppingBag } from "lucide-react";
import { GoldCurves } from "@/components/brand/GoldLines";
import { Logo } from "@/components/brand/Logo";
import { ProductCard, ProductCardSkeleton } from "@/components/product/ProductCard";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconCircle } from "@/components/ui/IconCircle";
import { InfoCard } from "@/components/ui/InfoCard";
import { Reveal } from "@/components/ui/Reveal";
import { GoldDivider, SectionHeading } from "@/components/ui/SectionHeading";
import type { ProductCardData } from "@/lib/types";

export const metadata: Metadata = {
  title: "Guía de estilo",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "--bg", hex: "#F7EFE6", label: "Crema" },
  { name: "--bg-soft", hex: "#EFE0D3", label: "Nude" },
  { name: "--text", hex: "#3B2418", label: "Chocolate" },
  { name: "--accent", hex: "#B0754F", label: "Cobre" },
  { name: "--accent-strong", hex: "#935C3A", label: "Cobre profundo" },
  { name: "--gold", hex: "#C9A27A", label: "Dorado" },
  { name: "--blush", hex: "#E8CBBE", label: "Blush" },
];

const sampleProducts: ProductCardData[] = [
  { slug: "demo-1", brand: "Michael Kors", name: "Jet Set Travel Tote", price: 1250, status: "disponible", isNew: true },
  { slug: "demo-2", brand: "Kate Spade", name: "Knott Medium Satchel", price: 1490, compareAtPrice: 1690, status: "disponible" },
  { slug: "demo-3", brand: "Guess", name: "Noelle Crossbody", price: 690, status: "agotado" },
  { slug: "demo-4", brand: "Steve Madden", name: "Bvital Shoulder Bag", price: 590, status: "proximamente" },
];

const icons = [ShoppingBag, Camera, Banknote, HeartHandshake, Package, MapPinned];

export default function StylePage() {
  return (
    <div className="mx-auto max-w-6xl space-y-24 px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Fase 1" line1="Guía de" line2="estilo" size="xl" as="h1" />

      <section className="space-y-6">
        <h2 className="heading-display text-2xl">Logo</h2>
        <div className="flex flex-wrap items-end gap-12">
          <Logo size="sm" asLink={false} />
          <Logo size="md" asLink={false} />
          <Logo size="lg" asLink={false} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-display text-2xl">Colores</h2>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {colors.map((c) => (
            <li key={c.name} className="text-sm">
              <span
                className="block aspect-square rounded-2xl border border-gold/30 shadow-warm"
                style={{ background: c.hex }}
              />
              <span className="mt-2 block font-medium">{c.label}</span>
              <span className="block text-ink-muted">{c.hex}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-10">
        <h2 className="heading-display text-2xl">Titulares a dos tonos</h2>
        <SectionHeading line1="Política de" line2="compras" />
        <SectionHeading line1="¿Cómo hacer" line2="tu pedido?" subtitle="Texto de apoyo en sans ligera con interlineado cómodo." />
        <GoldDivider />
      </section>

      <section className="space-y-6">
        <h2 className="heading-display text-2xl">Botones y badges</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Pedir por WhatsApp</Button>
          <Button variant="secondary">Ver en Instagram</Button>
          <Button variant="ghost">Ver más</Button>
          <Button disabled>Agotado</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="disponible" />
          <StatusBadge status="agotado" />
          <StatusBadge status="proximamente" />
          <Badge>Nuevo</Badge>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-display text-2xl">Íconos</h2>
        <div className="flex flex-wrap gap-4">
          {icons.map((Icon, i) => (
            <IconCircle key={i} icon={Icon} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="heading-display text-2xl">Tarjetas de producto</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
          {sampleProducts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
        <h3 className="pt-6 font-serif text-lg">Skeleton de carga</h3>
        <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>

      <section className="bg-marble relative overflow-hidden rounded-[32px] px-4 py-14 sm:px-10">
        <GoldCurves />
        <div className="relative mx-auto max-w-md">
          <InfoCard>
            <SectionHeading line1="Método de" line2="pago" size="md" />
            <dl className="mt-8 space-y-3 text-sm">
              <div className="flex justify-between gap-4 border-b border-gold/30 pb-3">
                <dt className="text-ink-muted">Banco</dt>
                <dd className="font-medium">Banco Industrial</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-gold/30 pb-3">
                <dt className="text-ink-muted">Tipo de cuenta</dt>
                <dd className="font-medium">Monetaria</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">No. de cuenta</dt>
                <dd className="font-medium">000-000000-0</dd>
              </div>
            </dl>
          </InfoCard>
        </div>
      </section>
    </div>
  );
}
