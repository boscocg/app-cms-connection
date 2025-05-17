// app/[slug]/page.tsx
import { notFound } from "next/navigation";
import { DynamicBlock } from "@/components";
import { getAllPageSlugs, getPageBySlug } from "@/services";

type PageParams = { params: { slug: string } };

export async function generateStaticParams() {
  return await getAllPageSlugs();
}

export default async function Page({ params }: PageParams) {
  const pageData = await getPageBySlug(params.slug);

  if (!pageData) {
    return notFound();
  }

  const { title, blocks = [] } = pageData;

  return (
    <article className="max-w-4xl mx-auto p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">{title || "Sem título"}</h1>
      </header>

      <div className="content">
        {blocks && blocks.length > 0 ? (
          blocks.map((block, index) => (
            <>{block && <DynamicBlock key={`${block.__typename}-${index}`} block={block} />}</>
          ))
        ) : (
          <p className="text-gray-500 italic">Esta página não possui conteúdo.</p>
        )}
      </div>
    </article>
  );
}
