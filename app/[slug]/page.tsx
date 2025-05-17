/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[slug]/page.tsx
import { GET_ALL_SLUGS, GET_PAGE_BY_SLUG, graphqlRequest } from '@/lib/graphql';
import { notFound } from 'next/navigation';
import type { GetAllSlugsQuery, GetPageBySlugQuery } from '@/types/graphql';

export async function generateStaticParams() {
  try {
    // Usando o tipo correto para a consulta
    const data = await graphqlRequest<GetAllSlugsQuery>(GET_ALL_SLUGS);
    
    // A estrutura correta da resposta, baseada nos tipos gerados
    const pages = data.pages || [];
    
    return pages.map((page) => ({
      slug: page.slug || '',
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Tipando o bloco com base nos tipos gerados
type PageBlock = NonNullable<NonNullable<GetPageBySlugQuery['pages']>[0]['blocks']>[0];

// Componente para lidar com os blocos dinâmicos
function DynamicBlock({ block }: { block: PageBlock }) {
  // Identificamos o tipo do bloco usando __typename
  switch (block.__typename) {
    case 'ComponentSharedTextBlock':
      return <p className="mb-4">{block.text}</p>;

    case 'ComponentSharedImageBlock':
      if (!block.media?.url) return null;
      
      const imageUrl = block.media.url.startsWith('http') 
        ? block.media.url 
        : `${process.env.NEXT_PUBLIC_API_URL}${block.media.url}`;
      
      return (
        <div className="mb-4">
          <img src={imageUrl} alt={block.media?.alternativeText || ''} className="max-w-full rounded-md" />
        </div>
      );

    case 'ComponentSharedCta':
      return (
        <a
          href={block.url || '#'}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {block.label || 'Clique aqui'}
        </a>
      );

    default:
      return <pre className="bg-red-100 p-4">Bloco não suportado: {block.__typename}</pre>;
  }
}

async function getPageData(slug: string) {
  try {
    // Usando o tipo correto para a consulta
    const data = await graphqlRequest<GetPageBySlugQuery>(GET_PAGE_BY_SLUG, { slug });
    
    // A estrutura correta da resposta, baseada nos tipos gerados
    return data.pages?.[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await getPageData(params.slug);
  
  if (!pageData) {
    return notFound();
  }

  const { title, blocks = [] } = pageData;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">{title || ''}</h1>
      {blocks.map((block, i) => (
        <DynamicBlock key={i} block={block} />
      ))}
    </main>
  );
}
