import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = {
  sm: { box: "size-12", icon: 20 },
  md: { box: "size-16", icon: 28 },
  lg: { box: "size-20", icon: 34 },
};

/** Círculo sólido cobre con ícono de línea fina blanco. */
export function IconCircle({
  icon: Icon,
  size = "md",
  className,
}: {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full bg-accent text-white shadow-warm",
        s.box,
        className,
      )}
    >
      <Icon size={s.icon} strokeWidth={1.1} />
    </span>
  );
}
