import Link from "next/link";
import { cacheLife } from "next/cache";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, WhatsAppIcon } from "@/components/brand/SocialIcons";
import { GoldDivider } from "@/components/ui/SectionHeading";
import { mainNav, type SiteInfo } from "@/lib/site";
import { instagramUrl, whatsappUrl } from "@/lib/utils";

export function Footer({ site }: { site: SiteInfo }) {
  return (
    <footer className="bg-marble border-t border-gold/30">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
        <Logo logoUrl={site.logoUrl} size="md" />
        <p className="mx-auto mt-5 max-w-sm text-sm text-ink-muted">
          Bolsas originales de diseñador. Envíos a toda Guatemala.
        </p>

        <GoldDivider className="my-8" />

        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-ink hover:text-accent-strong"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href={instagramUrl(site.instagramHandle)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram @${site.instagramHandle}`}
            className="inline-flex size-11 items-center justify-center rounded-full border border-accent-strong text-accent-strong transition-colors hover:bg-accent-strong hover:text-white"
          >
            <InstagramIcon className="size-5" />
          </a>
          <a
            href={whatsappUrl(site.whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex size-11 items-center justify-center rounded-full border border-accent-strong text-accent-strong transition-colors hover:bg-accent-strong hover:text-white"
          >
            <WhatsAppIcon className="size-5" />
          </a>
        </div>

        <p className="mt-10 text-xs text-ink-muted">
          © <CurrentYear /> {site.businessName}. Todos nuestros artículos son
          originales.
        </p>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
