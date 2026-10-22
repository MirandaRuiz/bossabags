import type { ReactNode } from "react";
import type { ProductStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const statusLabels: Record<ProductStatus, string> = {
  disponible: "Disponible",
  agotado: "Agotado",
  proximamente: "Próximamente",
};

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-blush px-3 py-1 font-sans text-[0.65rem] font-medium uppercase tracking-[0.16em] text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status, className }: { status: ProductStatus; className?: string }) {
  return (
    <Badge
      className={cn(
        status === "agotado" && "bg-ink/85 text-white",
        status === "disponible" && "bg-white/80",
        className,
      )}
    >
      {statusLabels[status]}
    </Badge>
  );
}
