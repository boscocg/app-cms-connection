// lib/graphql-queries.ts
import { gql } from 'graphql-request';

// Consulta para buscar todos os slugs para as páginas estáticas
export const GET_ALL_SLUGS = gql`
  query GetAllSlugs {
    pages {
      documentId
      slug
    }
  }
`;

// Consulta para buscar uma página específica com seus blocos
export const GET_PAGE_BY_SLUG = gql`
  query GetPageBySlug($slug: String!) {
    pages(filters: { slug: { eq: $slug } }) {
      documentId
      title
      slug
      blocks {
        __typename
        ... on ComponentSharedTextBlock {
          id
          text
        }
        ... on ComponentSharedImageBlock {
          id
          media {
            url
            alternativeText
          }
        }
        ... on ComponentSharedCta {
          id
          label
          url
        }
      }
    }
  }
`;

// Consulta para buscar todas as páginas para a página inicial
export const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages {
      documentId
      title
      slug
    }
  }
`;
