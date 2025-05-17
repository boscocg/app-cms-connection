// components/PageList.tsx
import React from "react";
import Link from "next/link";
import type { GetAllPagesQuery } from "@/types/graphql";

type PageListItem = NonNullable<GetAllPagesQuery["pages"]>[0];

interface PageListProps {
  pages: PageListItem[];
}

export function PageList({ pages }: PageListProps) {
  if (pages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 italic">Nenhuma página disponível.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2 divide-y divide-gray-100">
      {pages.map((page) => (
        <>
          {page && (
            <li key={page.documentId || page.slug} className="py-3 hover:bg-gray-50 rounded-md">
              <Link
                href={`/${page.slug}`}
                className="block px-4 py-2 text-blue-600 hover:underline text-lg font-medium"
              >
                {page.title || page.slug || "Página sem título"}
              </Link>
            </li>
          )}
        </>
      ))}
    </ul>
  );
}
