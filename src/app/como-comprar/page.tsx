import type { Metadata } from "next";
import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { OrderSteps } from "@/components/sections/OrderSteps";
import { PageHeader } from "@/components/sections/PageHeader";
import { PaymentCard } from "@/components/sections/PaymentCard";
import { ButtonLink } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/SectionHeading";
import { getSettings } from "@/lib/data/settings";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cómo comprar",
  description:
    "Haz tu pedido en 4 pasos: escoge tu bolsa, confirma disponibilidad por WhatsApp, paga por transferencia y comparte tus datos de entrega.",
  alternates: { canonical: "/como-comprar" },
};

export default async function HowToBuyPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHeader
        line1="¿Cómo hacer"
        line2="tu pedido?"
        subtitle="Comprar en BOSSA es fácil y personal: todo se hace por WhatsApp."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <OrderSteps steps={settings.orderSteps} />
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/catalogo" size="lg">
            Ver catálogo
          </ButtonLink>
          <ButtonLink
            href={whatsappUrl(settings.whatsappNumber, "¡Hola Bossa! 👜 Quisiera hacer un pedido.")}
            external
            size="lg"
            variant="secondary"
          >
            <WhatsAppIcon className="size-5" /> Escríbenos
          </ButtonLink>
        </div>
      </section>

      <section className="bg-marble border-t border-gold/20 px-4 py-16 sm:px-6 sm:py-20">
        <PaymentCard settings={settings} />
        <GoldDivider className="mt-12" />
        <p className="mx-auto mt-6 max-w-md text-center text-sm text-ink-muted">
          Después de transferir, envíanos el comprobante por WhatsApp junto con tu nombre, celular y
          dirección de entrega.
        </p>
      </section>
    </>
  );
}
