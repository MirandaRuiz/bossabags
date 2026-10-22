import type { Metadata } from "next";
import { GoldCurves } from "@/components/brand/GoldLines";
import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { PaymentCard } from "@/components/sections/PaymentCard";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getSettings } from "@/lib/data/settings";
import { whatsappUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Método de pago",
  description: "Pagos únicamente por transferencia bancaria. Consulta los datos de nuestra cuenta.",
  alternates: { canonical: "/metodo-de-pago" },
};

export default async function PaymentPage() {
  const settings = await getSettings();

  return (
    <section className="bg-marble relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <GoldCurves />
      <GoldCurves variant="bottom-right" />
      <div className="relative mx-auto max-w-xl">
        <SectionHeading
          as="h1"
          line1="Método de"
          line2="pago"
          subtitle="Aceptamos únicamente transferencia bancaria."
        />
        <PaymentCard settings={settings} showHeading={false} className="mt-12" />
        <div className="mt-10 text-center">
          <p className="mx-auto max-w-sm text-ink-muted">
            Al transferir, envíanos tu <strong className="font-medium text-ink">comprobante de pago</strong>{" "}
            por WhatsApp para confirmar tu pedido.
          </p>
          <ButtonLink
            href={whatsappUrl(settings.whatsappNumber, "¡Hola Bossa! 👜 Te comparto mi comprobante de pago.")}
            external
            size="lg"
            className="mt-8"
          >
            <WhatsAppIcon className="size-5" /> Enviar comprobante
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
