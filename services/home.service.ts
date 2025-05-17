// services/home.service.ts
import { GET_ALL_PAGES, graphqlRequest } from "@/lib/graphql";
import type { GetAllPagesQuery } from "@/types/graphql";

export async function getAllPages() {
  try {
    const data = await graphqlRequest<GetAllPagesQuery>(GET_ALL_PAGES);
    return data.pages || [];
  } catch (error) {
    console.error("[getAllPages] Error fetching pages:", error);
    return [];
  }
}
