// lib/schema-explorer.ts
import { graphqlRequest, gql } from './graphql';

// Definindo a query de introspecção aqui já que não está mais exportada do arquivo graphql.ts
const INTROSPECTION_QUERY = gql`
  query SchemaIntrospection {
    __schema {
      queryType {
        fields {
          name
          description
        }
      }
    }
  }
`;

/**
 * Esta função explora a estrutura do esquema GraphQL do Strapi
 * e ajuda a determinar a estrutura correta das consultas
 */
export async function exploreSchema() {
  try {
    // Obter o esquema
    const schemaInfo = await graphqlRequest(INTROSPECTION_QUERY);
    console.log('Schema Query Types:', schemaInfo.__schema.queryType.fields);
    
    // Tentar obter a estrutura de pages
    const pagesStructure = await graphqlRequest(gql`
      query PageTypeStructure {
        __type(name: "Page") {
          name
          kind
          fields {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    `);
    console.log('Pages Structure:', pagesStructure);

    // Tentar uma consulta simples para pages
    const pagesQuery = await graphqlRequest(gql`
      query SimplePages {
        pages {
          __typename
        }
      }
    `);
    console.log('Pages Query Result:', pagesQuery);
    
    return {
      schema: schemaInfo,
      pagesStructure,
      pagesQuery
    };
  } catch (error) {
    console.error('Error exploring schema:', error);
    throw error;
  }
}
