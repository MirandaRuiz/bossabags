import { WhatsAppIcon } from "@/components/brand/SocialIcons";
import { whatsappUrl } from "@/lib/utils";

export function WhatsAppFloat({ phone }: { phone: string }) {
  return (
    <a
      href={whatsappUrl(phone, "¡Hola Bossa! 👜 Quisiera más información.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-accent-strong text-white shadow-warm ring-4 ring-bg/70 transition-transform duration-300 hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
