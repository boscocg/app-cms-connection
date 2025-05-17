// components/blocks/TextBlock.tsx
import React from "react";

interface TextBlockProps {
  text: string | null | undefined;
}

export function TextBlock({ text }: TextBlockProps) {
  if (!text) return null;
  return <p className="mb-4 leading-relaxed text-gray-700">{text}</p>;
}
