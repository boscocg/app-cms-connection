/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[slug]/page.tsx
import { GET_ALL_SLUGS, GET_PAGE_BY_SLUG, graphqlRequest } from '@/lib/graphql';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  try {
    const { pages } = await graphqlRequest(GET_ALL_SLUGS);
    return pages.map((page: any) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Componente para lidar com os blocos dinâmicos
function DynamicBlock({ block }: { block: any }) {
  // Identificamos o tipo do bloco usando __typename
  switch (block.__typename) {
    case 'ComponentSharedTextBlock':
      return <p className="mb-4">{block.text}</p>;

    case 'ComponentSharedImageBlock':
      const imageUrl = block.media?.url 
        ? `${block.media.url.startsWith('http') ? '' : process.env.NEXT_PUBLIC_API_URL}${block.media.url}` 
        : '';
      
      return imageUrl ? (
        <div className="mb-4">
          <img src={imageUrl} alt={block.media?.alternativeText || ''} className="max-w-full rounded-md" />
        </div>
      ) : null;

    case 'ComponentSharedCta':
      return (
        <a
          href={block.url}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {block.label}
        </a>
      );

    default:
      return <pre className="bg-red-100 p-4">Bloco não suportado: {block.__typename}</pre>;
  }
}

async function getPageData(slug: string) {
  try {
    const { pages } = await graphqlRequest(GET_PAGE_BY_SLUG, { slug });
    return pages?.[0] || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await getPageData(params.slug);

  console.log('joao', pageData);
  
  if (!pageData) {
    return notFound();
  }

  const { title, blocks = [] } = pageData;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {blocks.map((block: any, i: number) => (
        <DynamicBlock key={i} block={block} />
      ))}
    </main>
  );
}
