import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSettings } from "@/lib/data/settings";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "BOSSA BAGS GT · Bolsas originales de diseñador en Guatemala",
    template: "%s · BOSSA BAGS GT",
  },
  description:
    "Bolsas originales de Michael Kors, Steve Madden, Guess, Kate Spade y más. Pide por WhatsApp y recibe en toda Guatemala.",
  openGraph: { type: "website", locale: "es_GT", siteName: "BOSSA BAGS GT" },
};

export const viewport: Viewport = {
  themeColor: "#f7efe6",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const site = await getSettings();

  return (
    <html lang="es-GT" className={`${bodoni.variable} ${jost.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <Header logoUrl={site.logoUrl} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer site={site} />
        <WhatsAppFloat phone={site.whatsappNumber} />
      </body>
    </html>
  );
}
