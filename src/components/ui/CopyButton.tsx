"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // El portapapeles no está disponible (p. ej. sin HTTPS): no hacemos nada.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copiado" : label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-accent-strong transition-colors hover:bg-bg-soft"
    >
      {copied ? <Check size={16} strokeWidth={1.6} /> : <Copy size={16} strokeWidth={1.4} />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copiado" : ""}
      </span>
    </button>
  );
}
