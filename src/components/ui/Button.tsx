import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium uppercase tracking-[0.14em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-white shadow-warm hover:bg-ink disabled:hover:bg-accent-strong",
  secondary:
    "border border-accent-strong text-accent-strong bg-transparent hover:bg-accent-strong hover:text-white",
  ghost: "text-accent-strong hover:bg-bg-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.7rem]",
  md: "h-11 px-6 text-xs",
  lg: "h-13 px-8 text-sm",
};

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode };

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Omit<Common, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  ...props
}: Common & ComponentProps<"button">) {
  return <button className={buttonClasses({ variant, size, className })} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  external,
  ...props
}: Common & ComponentProps<typeof Link> & { external?: boolean }) {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <Link className={buttonClasses({ variant, size, className })} {...extra} {...props} />;
}
