// scripts/explore-schema.js
// Para executar: node scripts/explore-schema.js

require('dotenv').config();

// Precisamos usar require-esm ou similar para importar módulos ES
// Mas para simplificar, vamos criar uma versão CommonJS da exploração

// Definindo a função para fazer request GraphQL
const { request, gql } = require('graphql-request');

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;

// Definindo a query de introspecção
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

// Função para fazer chamadas GraphQL
async function graphqlRequest(query, variables = {}) {
  try {
    return await request(GRAPHQL_ENDPOINT, query, variables);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}

// Função de exploração
async function exploreSchema() {
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

async function main() {
  try {
    console.log('Explorando o esquema GraphQL do Strapi...');
    const result = await exploreSchema();
    console.log('Exploração concluída!');
    
    // Salvar os resultados em um arquivo para análise
    const fs = require('fs');
    fs.writeFileSync('schema-exploration.json', JSON.stringify(result, null, 2));
    console.log('Resultados salvos em schema-exploration.json');
  } catch (error) {
    console.error('Erro ao explorar o esquema:', error);
  }
}

main();
