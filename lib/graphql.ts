// lib/graphql.ts
import { request, gql } from 'graphql-request';
import { 
  GET_ALL_SLUGS, 
  GET_PAGE_BY_SLUG, 
  GET_ALL_PAGES 
} from './graphql-queries';

export { 
  GET_ALL_SLUGS, 
  GET_PAGE_BY_SLUG, 
  GET_ALL_PAGES,
  gql 
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;

export async function graphqlRequest<T = unknown, V extends object = Record<string, unknown>>(
  query: string, 
  variables?: V
): Promise<T> {
  try {
    return await request<T>(GRAPHQL_ENDPOINT, query, variables);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
