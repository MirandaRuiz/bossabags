import { cn } from "@/lib/utils";

/** Ilustración de respaldo cuando un producto aún no tiene fotos. */
export function BagPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex size-full items-center justify-center bg-gradient-to-b from-bg-soft to-blush/60",
        className,
      )}
    >
      <svg viewBox="0 0 120 120" aria-hidden className="w-2/5 text-accent/70">
        <path
          d="M42 44 V36 a18 18 0 0 1 36 0 V44"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path d="M24 44 H96 L104 100 H16 Z" fill="currentColor" opacity="0.35" />
        <path
          d="M24 44 H96 L104 100 H16 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <rect x="72" y="56" width="12" height="16" rx="2" fill="var(--gold)" />
      </svg>
    </div>
  );
}
