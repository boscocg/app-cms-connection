// app/page.tsx
import { PageList } from "@/components";
import { getAllPages } from "@/services";

export default async function Home() {
  const pages = await getAllPages();

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Páginas Disponíveis</h1>
        <p className="text-gray-600">Selecione uma página para visualizar seu conteúdo</p>
      </header>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <PageList pages={pages} />
      </div>
    </main>
  );
}
