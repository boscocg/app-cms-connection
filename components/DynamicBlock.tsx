// components/DynamicBlock.tsx
import React, { JSX } from "react";
import { TextBlock, ImageBlock, CtaBlock } from "./blocks";
import type { GetPageBySlugQuery } from "@/types/graphql";

export type PageBlock = NonNullable<NonNullable<GetPageBySlugQuery["pages"]>[0]["blocks"]>[0];

interface DynamicBlockProps {
  block: PageBlock;
}

export function DynamicBlock({ block }: DynamicBlockProps) {
  const blockComponents: Record<string, () => JSX.Element | null> = {
    ComponentSharedTextBlock: () => (
      <TextBlock text={block.__typename === "ComponentSharedTextBlock" ? block.text : null} />
    ),

    ComponentSharedImageBlock: () => (
      <ImageBlock media={block.__typename === "ComponentSharedImageBlock" ? block.media : null} />
    ),

    ComponentSharedCta: () => (
      <CtaBlock
        label={block.__typename === "ComponentSharedCta" ? block.label : null}
        url={block.__typename === "ComponentSharedCta" ? block.url : null}
      />
    ),
  };

  return blockComponents[block.__typename] ? (
    blockComponents[block.__typename]()
  ) : (
    <div className="p-4 my-4 bg-red-100 text-red-800 rounded-md">
      <p className="font-medium">Bloco não suportado</p>
      <code className="text-sm">{block.__typename}</code>
    </div>
  );
}
