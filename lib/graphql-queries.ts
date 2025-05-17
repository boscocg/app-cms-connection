// lib/graphql-queries.ts
import { gql } from 'graphql-request';

// Consulta para buscar todos os projetos e suas refs
export const GET_ALL_PROJECTS_REFS = gql`
  query GetAllProjectsRefs {
    projects {
      documentId
      Ref
      Title
    }
  }
`;

// Consulta para buscar um projeto específico por ref
export const GET_PROJECT = gql`
  query GetProject($ref: String!) {
    projects(filters: { Ref: { eq: $ref } }) {
      documentId
      Title
      Ref
      Images {
        client_image {
          url
          name
        }
        client_cover_image {
          url
          name
        }
        thumbnail_path {
          url
          name
        }
        fallback_thumbnail {
          url
          name
        }
        favicon {
          url
          name
        }
        client_logo1 {
          url
          name
        }
        client_logo2 {
          url
          name
        }
        client_transition_image {
          url
          name
        }
      }
      SEO {
        title
        description
        image {
          url
          name
        }
      }
      Styles {
        font_family
        primary_color
        secondary_color
        font_color
        background_color
        font_color_dark
        mode
      }
    }
  }
`;
