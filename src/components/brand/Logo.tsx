import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  /** URL del logo subido en Configuración. Si no hay, se usa el logotipo tipográfico. */
  logoUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
  asLink?: boolean;
};

const sizes = {
  sm: { word: "text-2xl", sub: "text-[0.55rem] tracking-[0.55em]", img: 40 },
  md: { word: "text-4xl", sub: "text-[0.65rem] tracking-[0.6em]", img: 56 },
  lg: { word: "text-6xl sm:text-7xl", sub: "text-xs sm:text-sm tracking-[0.7em]", img: 120 },
};

export function Logo({ logoUrl, size = "md", className, asLink = true }: Props) {
  const s = sizes[size];

  const content = logoUrl ? (
    <Image
      src={logoUrl}
      alt="BOSSA BAGS GT"
      width={s.img * 3}
      height={s.img}
      className="h-auto w-auto object-contain"
      style={{ maxHeight: s.img }}
      priority
    />
  ) : (
    <span className="flex flex-col items-center leading-none">
      <span className={cn("heading-display text-copper-gradient tracking-[-0.01em]", s.word)}>
        Bossa
      </span>
      <span className={cn("mt-1 pl-[0.6em] font-sans font-normal text-ink uppercase", s.sub)}>
        Bags GT
      </span>
    </span>
  );

  if (!asLink) return <span className={className}>{content}</span>;

  return (
    <Link href="/" aria-label="BOSSA BAGS GT — Inicio" className={cn("inline-flex", className)}>
      {content}
    </Link>
  );
}
