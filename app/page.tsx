// app/page.tsx
import Link from "next/link";
import { GET_ALL_PROJECTS_REFS, graphqlRequest } from "@/lib/graphql";
import type { GetAllProjectsRefsQuery } from "@/types/graphql";

export default async function Home() {
  const data = await graphqlRequest<GetAllProjectsRefsQuery>(GET_ALL_PROJECTS_REFS);
  const projects = data.projects || [];

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Projetos Disponíveis</h1>
        <p className="text-gray-600">Selecione um projeto para visualizar</p>
      </header>

      <div className="bg-white shadow-sm rounded-lg p-6">
        {projects.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum projeto disponível</p>
        ) : (
          <ul className="space-y-2 divide-y divide-gray-100">
            {projects.map((project, index) => (
              <li key={project?.documentId || index} className="py-3 hover:bg-gray-50 rounded-md">
                <Link
                  href={`/${project?.Ref}/rescue`}
                  className="block px-4 py-2 text-blue-600 hover:underline text-lg font-medium"
                >
                  {project?.Title || "Projeto sem título"}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
