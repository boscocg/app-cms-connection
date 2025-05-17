// components/blocks/ImageBlock.tsx
import React from "react";

interface ImageMedia {
  url: string | null | undefined;
  alternativeText: string | null | undefined;
}

interface ImageBlockProps {
  media: ImageMedia | null | undefined;
}

export function ImageBlock({ media }: ImageBlockProps) {
  if (!media?.url) return null;

  const imageUrl = media.url.startsWith("http")
    ? media.url
    : `${process.env.NEXT_PUBLIC_API_URL}${media.url}`;

  return (
    <div className="mb-6">
      <img
        src={imageUrl}
        alt={media.alternativeText || ""}
        className="max-w-full rounded-lg shadow-md"
      />
    </div>
  );
}
