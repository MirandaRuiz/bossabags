import { CopyButton } from "@/components/ui/CopyButton";
import { InfoCard } from "@/components/ui/InfoCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  settings: Pick<SiteSettings, "bankName" | "accountType" | "accountNumber" | "accountHolder">;
  showHeading?: boolean;
  className?: string;
};

/** Tarjeta con los datos de la cuenta bancaria (desde Configuración). */
export function PaymentCard({ settings, showHeading = true, className }: Props) {
  const rows = [
    { label: "Banco", value: settings.bankName },
    { label: "Tipo de cuenta", value: settings.accountType },
    { label: "No. de cuenta", value: settings.accountNumber, copy: true },
    { label: "A nombre de", value: settings.accountHolder },
  ].filter((r) => r.value);

  return (
    <InfoCard className={cn("mx-auto w-full max-w-md", className)}>
      {showHeading && <SectionHeading line1="Método de" line2="pago" size="md" as="h3" />}
      <dl className={cn("space-y-1", showHeading && "mt-8")}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={cn(
              "flex min-h-12 items-center justify-between gap-4 py-2",
              i < rows.length - 1 && "border-b border-gold/30",
            )}
          >
            <dt className="text-sm text-ink-muted">{row.label}</dt>
            <dd className="flex items-center gap-1 text-right font-medium text-ink">
              <span>{row.value}</span>
              {row.copy && <CopyButton value={row.value} label="Copiar número de cuenta" />}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-6 text-center text-sm text-ink-muted">
        Pago únicamente por transferencia bancaria.
      </p>
    </InfoCard>
  );
}
