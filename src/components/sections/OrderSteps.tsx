import { brandIcons } from "@/components/ui/BrandIcon";
import { IconCircle } from "@/components/ui/IconCircle";
import { Reveal } from "@/components/ui/Reveal";
import type { OrderStep } from "@/lib/types";

/** Los pasos de "¿Cómo hacer tu pedido?" con íconos en círculo cobre. */
export function OrderSteps({ steps }: { steps: OrderStep[] }) {
  return (
    <ol className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li key={i}>
          <Reveal delay={i * 80} className="flex items-start gap-5">
            <IconCircle icon={brandIcons[step.icon]} size="lg" />
            <div className="pt-2">
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-accent-strong">
                Paso {i + 1}
              </p>
              <p className="mt-1 text-lg leading-snug text-ink">{step.title}</p>
              {step.items && step.items.length > 0 && (
                <ul className="mt-2 space-y-0.5 text-ink-muted">
                  {step.items.map((item) => (
                    <li key={item}>– {item}</li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
