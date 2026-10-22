"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BagPlaceholder } from "@/components/product/BagPlaceholder";
import { cn } from "@/lib/utils";

/** Galería deslizable (scroll-snap) con miniaturas en escritorio. */
export function ProductGallery({
  images,
  alt,
  dimmed = false,
}: {
  images: string[];
  alt: string;
  dimmed?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function goTo(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== active) setActive(index);
  }

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-warm">
        <BagPlaceholder />
      </div>
    );
  }

  return (
    <div className="lg:flex lg:flex-row-reverse lg:gap-4">
      <div className="relative flex-1">
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="flex aspect-[4/5] snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-2xl bg-bg-soft shadow-warm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carrusel"
          aria-label="Fotos del producto"
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-full w-full shrink-0 snap-center"
              aria-roledescription="foto"
              aria-label={`${i + 1} de ${images.length}`}
            >
              <Image
                src={src}
                alt={i === 0 ? alt : `${alt} — foto ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className={cn("object-cover", dimmed && "opacity-70")}
              />
            </div>
          ))}
        </div>

        {images.length > 1 && (
          <>
            <GalleryArrow side="left" disabled={active === 0} onClick={() => goTo(active - 1)} />
            <GalleryArrow
              side="right"
              disabled={active === images.length - 1}
              onClick={() => goTo(active + 1)}
            />
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 lg:hidden">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === active ? "w-5 bg-accent-strong" : "w-1.5 bg-white/80",
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 hidden gap-3 lg:mt-0 lg:flex lg:w-20 lg:flex-col">
          {images.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === active}
                className={cn(
                  "relative block aspect-[4/5] w-full overflow-hidden rounded-lg border-2 transition-colors",
                  i === active ? "border-accent" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function GalleryArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Foto anterior" : "Foto siguiente"}
      className={cn(
        "absolute top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-ink shadow-warm backdrop-blur transition-opacity hover:bg-white disabled:opacity-0 sm:flex",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon size={20} strokeWidth={1.4} />
    </button>
  );
}
