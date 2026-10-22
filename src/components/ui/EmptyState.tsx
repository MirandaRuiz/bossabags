import type { ReactNode } from "react";
import { BagPlaceholder } from "@/components/product/BagPlaceholder";

/** Estado vacío en estilo de marca. */
export function EmptyState({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
      <div className="aspect-square w-28 overflow-hidden rounded-full shadow-warm">
        <BagPlaceholder />
      </div>
      <p className="mt-8 font-serif text-2xl uppercase text-ink">{title}</p>
      {text && <p className="mt-3 text-ink-muted">{text}</p>}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
