import { GoldCurves } from "@/components/brand/GoldLines";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

// Vista previa del hero. La página de inicio completa se construye en la Fase 3.
export default function HomePage() {
  return (
    <section className="bg-marble relative overflow-hidden">
      <GoldCurves variant="top-left" />
      <GoldCurves variant="bottom-right" />
      <div className="relative mx-auto flex min-h-[80dvh] max-w-6xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <Logo size="lg" asLink={false} />
        <h1 className="heading-display mt-10 text-5xl sm:text-6xl md:text-7xl">
          <span className="block text-ink">Bolsas originales</span>
          <span className="block text-copper-gradient pb-1">de diseñador</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-muted">
          Piezas únicas de tus marcas favoritas, con envío a toda Guatemala.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/catalogo" size="lg">
            Ver catálogo
          </ButtonLink>
          <ButtonLink href="/estilo" size="lg" variant="secondary">
            Guía de estilo
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
