/* eslint-disable @typescript-eslint/no-explicit-any */
// app/[slug]/page.tsx

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function generateStaticParams() {
  const res = await fetch(`${API_URL}/api/pages`);
  const json = await res.json();
  return json.data.map((page: any) => ({ slug: page.slug || page.attributes.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const res = await fetch(
    `${API_URL}/api/pages?filters[slug][$eq]=${params.slug}&populate[blocks][populate]=*`, 
    { cache: "no-store" }
  );
  const json = await res.json();
  const page = json.data?.[0];

  if (!page) return <div>Página não encontrada</div>;

  const { title, blocks } = page;

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {blocks?.map((block: any, i: number) => (
        <DynamicBlock key={i} block={block} />
      ))}
    </main>
  );
}

function DynamicBlock({ block }: { block: any }) {
  switch (block.__component) {
    case "shared.text-block":
      return <p className="mb-4">{block.text}</p>;

    case "shared.image-block":
      const media = block.media?.[0];
      const imageUrl = media?.url ? `${process.env.NEXT_PUBLIC_API_URL}${media.url}` : "";
      return imageUrl ? (
        <div className="mb-4">
          <img src={imageUrl} alt={media?.alternativeText || ""} className="max-w-full rounded-md" />
        </div>
      ) : null;

    case "shared.cta":
      return (
        <a
          href={block.url}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {block.label}
        </a>
      );

    default:
      return <pre className="bg-red-100 p-4">Bloco não suportado: {block.__component}</pre>;
  }
}
