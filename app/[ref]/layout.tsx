// app/[ref]/layout.tsx
import { Metadata } from "next";
import { GET_PROJECT, graphqlRequest } from "@/lib/graphql";
import { ProjectProvider } from "@/components/project";
import { ProjectStyles } from "./components/ProjectStyles";
import type { GetProjectQuery } from "@/types/graphql";

// Tipo para os parâmetros do layout
type LayoutParams = {
  params: {
    ref: string;
  };
  children: React.ReactNode;
};

/**
 * Função para gerar metadados dinâmicos com base nos dados do projeto
 */
export async function generateMetadata({
  params,
}: Omit<LayoutParams, "children">): Promise<Metadata> {
  const ref = params.ref;

  try {
    // Buscar os dados do projeto para SEO
    const data = await graphqlRequest<GetProjectQuery>(GET_PROJECT, { ref });
    const project = data.projects?.[0];

    if (!project || !project.SEO) {
      return {
        title: "Projeto",
        description: "Visualização do projeto",
      };
    }

    // Construir a URL da imagem
    const imageUrl = project.SEO.image?.url
      ? project.SEO.image.url.startsWith("http")
        ? project.SEO.image.url
        : `${process.env.NEXT_PUBLIC_API_URL}${project.SEO.image.url}`
      : undefined;

    // Retornar os metadados baseados no SEO do projeto
    return {
      title: {
        template: `%s | ${project.Title}`,
        default: project.SEO.title || project.Title || "Projeto",
      },
      description: project.SEO.description,
      openGraph: imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: project.SEO.image?.name ?? project.Title ?? undefined,
              },
            ],
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching project metadata:", error);
    return {
      title: "Projeto",
      description: "Visualização do projeto",
    };
  }
}

/**
 * Layout compartilhado para todas as rotas dentro de [ref]
 */
export default async function ProjectLayout({ params, children }: LayoutParams) {
  // Extrair o ref para evitar acesso direto a params.ref dentro da função assíncrona
  const ref = params.ref;

  // Buscar os dados do projeto
  const data = await graphqlRequest<GetProjectQuery>(GET_PROJECT, { ref });
  const project = data.projects?.[0];

  // Se o projeto não for encontrado
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 max-w-lg bg-white rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Projeto não encontrado</h1>
          <p className="text-gray-600 mb-6">
            Não foi possível encontrar o projeto com a referência "{ref}".
          </p>
          <a
            href="/"
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition inline-block"
          >
            Voltar para o início
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Componente do lado do cliente para os estilos */}
      <ProjectStyles project={project} />

      {/* Componente do lado do cliente para gerenciar o contexto do projeto */}
      <ProjectProvider project={project}>{children}</ProjectProvider>
    </>
  );
}
