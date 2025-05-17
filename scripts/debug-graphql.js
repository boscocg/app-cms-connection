// scripts/debug-graphql.js
// Para executar: node scripts/debug-graphql.js

require('dotenv').config();
const { request, gql } = require('graphql-request');

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const GRAPHQL_ENDPOINT = `${API_URL}/graphql`;

// Função para fazer chamadas GraphQL
async function graphqlRequest(query, variables = {}) {
  try {
    return await request(GRAPHQL_ENDPOINT, query, variables);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}

// Consulta simples para obter páginas
const GET_PAGES = gql`
  query DebugPages {
    pages {
      documentId
      title
      slug
    }
  }
`;

async function main() {
  try {
    console.log('Fazendo consulta GraphQL para obter páginas...');
    const result = await graphqlRequest(GET_PAGES);
    console.log('Resultado:');
    console.log(JSON.stringify(result, null, 2));
    
    // Extrair a estrutura para análise
    console.log('\nEstrutura da resposta:');
    console.log('- Tipo de pages:', typeof result.pages);
    if (Array.isArray(result.pages)) {
      console.log('- pages é um Array com', result.pages.length, 'itens');
      if (result.pages.length > 0) {
        console.log('- Exemplo do primeiro item:');
        console.log(JSON.stringify(result.pages[0], null, 2));
      }
    } else {
      console.log('- Estrutura de pages:', Object.keys(result.pages));
    }
  } catch (error) {
    console.error('Erro ao fazer a consulta:', error);
  }
}

main();
