import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/PageHeader";
import { brandIcons } from "@/components/ui/BrandIcon";
import { IconCircle } from "@/components/ui/IconCircle";
import { Reveal } from "@/components/ui/Reveal";
import { getSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Política de compras",
  description:
    "Disponibilidad, confirmación de pedido, pago por transferencia, envíos a toda Guatemala y originalidad de nuestros artículos.",
  alternates: { canonical: "/politica-de-compras" },
};

export default async function PoliciesPage() {
  const { purchasePolicies } = await getSettings();

  return (
    <>
      <PageHeader
        line1="Política de"
        line2="compras"
        subtitle="Queremos que tu experiencia sea clara y segura de principio a fin."
      />
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <ul className="grid gap-5 sm:grid-cols-2">
          {purchasePolicies.map((policy, i) => (
            <li key={i}>
              <Reveal
                delay={(i % 2) * 80}
                className="flex h-full items-start gap-5 rounded-[24px] border border-white/70 bg-white/45 p-6 shadow-warm"
              >
                <IconCircle icon={brandIcons[policy.icon]} size="sm" />
                <div>
                  <h2 className="font-serif text-lg uppercase tracking-wide text-ink">
                    {policy.title}
                  </h2>
                  <p className="mt-1 text-ink-muted">{policy.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center text-xs text-ink-muted">
          *El costo de envío puede variar para direcciones fuera de cobertura regular.
        </p>
      </section>
    </>
  );
}
