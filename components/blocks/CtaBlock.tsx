// components/blocks/CtaBlock.tsx
import React from "react";

interface CtaBlockProps {
  label: string | null | undefined;
  url: string | null | undefined;
}

export function CtaBlock({ label, url }: CtaBlockProps) {
  return (
    <a
      href={url || "#"}
      className="inline-block px-6 py-3 mb-6 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
    >
      {label || "Clique aqui"}
    </a>
  );
}
