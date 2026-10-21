"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header({ logoUrl }: { logoUrl?: string | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Cierra el menú móvil al navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <button
          type="button"
          className="-ml-2 rounded-full p-2 text-ink lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} strokeWidth={1.4} /> : <Menu size={22} strokeWidth={1.4} />}
        </button>

        <Logo logoUrl={logoUrl} size="sm" />

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors hover:text-accent-strong",
                    isActive(item.href) ? "text-accent-strong" : "text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* "Mi lista" se conecta en la Fase 4 */}
        <Link
          href="/mi-lista"
          className="-mr-2 rounded-full p-2 text-ink transition-colors hover:text-accent-strong"
          aria-label="Mi lista"
        >
          <ShoppingBag size={22} strokeWidth={1.4} />
        </Link>
      </div>

      <nav
        id="menu-movil"
        aria-label="Menú móvil"
        className={cn(
          "overflow-hidden border-t border-gold/25 transition-[max-height] duration-500 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <ul className="flex flex-col px-4 py-3">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block py-3 font-serif text-lg uppercase tracking-wide",
                  isActive(item.href) ? "text-accent-strong" : "text-ink",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
