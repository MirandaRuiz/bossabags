import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Tarjeta crema semitransparente con esquinas amplias (estilo post de método de pago). */
export function InfoCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[28px] border border-white/70 bg-white/45 p-6 shadow-warm backdrop-blur-sm sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
