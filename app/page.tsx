// app/page.tsx
import Link from 'next/link';
import { graphqlRequest, GET_ALL_PAGES } from '@/lib/graphql';

export default async function Home() {
  try {
    const { pages } = await graphqlRequest(GET_ALL_PAGES);
    
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Páginas Disponíveis</h1>
        
        <ul className="space-y-2">
          {pages.map((page: any, index: number) => (
            <li key={index} className="border-b pb-2">
              <Link 
                href={`/${page.slug}`}
                className="text-blue-600 hover:underline text-lg"
              >
                {page.title || page.slug}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    console.error('Error fetching pages:', error);
    return <div>Erro ao carregar as páginas</div>;
  }
}
