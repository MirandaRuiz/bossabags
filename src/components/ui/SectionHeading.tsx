import type { ElementType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  line1: string;
  line2?: string;
  eyebrow?: string;
  subtitle?: string;
  as?: ElementType;
  align?: "center" | "left";
  size?: "md" | "lg" | "xl";
  className?: string;
};

const sizes = {
  md: "text-3xl sm:text-4xl",
  lg: "text-4xl sm:text-5xl md:text-6xl",
  xl: "text-5xl sm:text-6xl md:text-7xl",
};

/** Titular a dos tonos: línea 1 en chocolate, línea 2 en cobre. */
export function SectionHeading({
  line1,
  line2,
  eyebrow,
  subtitle,
  as: Tag = "h2",
  align = "center",
  size = "lg",
  className,
}: Props) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.4em] text-accent-strong">
          {eyebrow}
        </p>
      )}
      <Tag className={cn("heading-display", sizes[size])}>
        <span className="block text-ink">{line1}</span>
        {line2 && <span className="block text-copper-gradient pb-1">{line2}</span>}
      </Tag>
      {subtitle && (
        <p
          className={cn(
            "mt-5 max-w-xl text-base text-ink-muted sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("flex items-center justify-center gap-3", className)}>
      <span className="h-px w-16 bg-gold/70" />
      <span className="size-1.5 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-gold/70" />
    </div>
  );
}
