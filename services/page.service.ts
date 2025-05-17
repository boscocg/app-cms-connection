// services/page.service.ts
import { GET_ALL_SLUGS, GET_PAGE_BY_SLUG, graphqlRequest } from "@/lib/graphql";
import type { GetAllSlugsQuery, GetPageBySlugQuery } from "@/types/graphql";

export type Page = NonNullable<GetPageBySlugQuery["pages"]>[0];

/**
 * Busca todos os slugs de páginas para geração estática
 * @returns Array de objetos com os slugs das páginas
 */
export async function getAllPageSlugs() {
  try {
    const data = await graphqlRequest<GetAllSlugsQuery>(GET_ALL_SLUGS);
    const pages = (data.pages || []).filter(
      (page): page is NonNullable<typeof page> => page != null
    );

    return pages.map((page) => ({
      slug: page.slug || "",
    }));
  } catch (error) {
    console.error("[getAllPageSlugs] Error fetching pages:", error);
    return [];
  }
}

/**
 * Busca os dados da página pelo slug
 * @param slug - O slug da página a ser buscada
 * @returns Dados da página ou null se não encontrada
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const data = await graphqlRequest<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, { slug });

    return data.pages?.[0] || null;
  } catch (error) {
    console.error("[getPageBySlug] Error fetching page data:", error);
    return null;
  }
}
