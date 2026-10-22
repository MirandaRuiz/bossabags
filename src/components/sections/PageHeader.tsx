import { GoldCurves } from "@/components/brand/GoldLines";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Encabezado de páginas internas con titular a dos tonos. */
export function PageHeader({
  line1,
  line2,
  subtitle,
}: {
  line1: string;
  line2?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-marble relative overflow-hidden border-b border-gold/20">
      <GoldCurves className="opacity-70" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionHeading as="h1" line1={line1} line2={line2} subtitle={subtitle} size="lg" />
      </div>
    </section>
  );
}
