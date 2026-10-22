import { BagPlaceholder } from "@/components/product/BagPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="mb-10 aspect-square w-40 overflow-hidden rounded-full">
        <BagPlaceholder />
      </div>
      <SectionHeading
        as="h1"
        line1="Página no"
        line2="encontrada"
        size="md"
        subtitle="Lo que buscas ya no está aquí, pero tenemos muchas piezas que te van a encantar."
      />
      <ButtonLink href="/catalogo" className="mt-10">
        Ver catálogo
      </ButtonLink>
    </section>
  );
}
