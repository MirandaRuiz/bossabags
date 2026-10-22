import { cn } from "@/lib/utils";

/** Líneas curvas doradas finas, decorativas (esquinas del hero y secciones). */
export function GoldCurves({
  className,
  variant = "top-left",
}: {
  className?: string;
  variant?: "top-left" | "bottom-right";
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 300"
      fill="none"
      className={cn(
        "pointer-events-none absolute w-72 text-gold sm:w-96",
        variant === "top-left" ? "-top-6 -left-10" : "-right-10 -bottom-6 rotate-180",
        className,
      )}
    >
      <path
        d="M-20 40 C 80 10, 160 60, 120 120 S 20 180, 60 230 S 220 260, 300 200"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M-10 90 C 60 70, 110 100, 90 150 S 40 220, 140 250"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
