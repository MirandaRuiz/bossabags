"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ErrorPage({ error, retry }: { error: Error; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Algo salió mal"
      text="No pudimos cargar esta página. Intenta de nuevo en un momento."
      action={
        <div className="flex flex-wrap justify-center gap-3">
          <Button onClick={() => retry()}>Reintentar</Button>
          <ButtonLink href="/" variant="secondary">
            Ir al inicio
          </ButtonLink>
        </div>
      }
    />
  );
}
