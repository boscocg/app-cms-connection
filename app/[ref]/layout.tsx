// app/[ref]/layout.tsx
import { Metadata } from "next";
import { GET_PROJECT, graphqlRequest } from "@/lib/graphql";
import { ProjectProvider } from "@/components/project";
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
        default: project.SEO.title ?? project.Title ?? "Projeto",
      },
      description: project.SEO.description,
      openGraph: imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt:
                  project.SEO.image?.name !== null && project.SEO.image?.name !== undefined
                    ? project.SEO.image.name
                    : project.Title || "",
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
      <html lang="pt-BR">
        <body>
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
        </body>
      </html>
    );
  }

  // SSR: Renderizar o HTML com o estilo inicial
  // Isso garante que os crawlers vejam o conteúdo estilizado
  return (
    <html
      lang="pt-BR"
      className={project.Styles?.mode === "dark" ? "dark" : "light"}
      style={{
        backgroundColor: project.Styles?.background_color || "white",
        color:
          project.Styles?.mode === "dark"
            ? project.Styles?.font_color_dark || "white"
            : project.Styles?.font_color || "black",
        fontFamily: `${
          project.Styles?.font_family || "sans-serif"
        }, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,
      }}
    >
      <head>
        {/* Carregar a fonte se especificada */}
        {project.Styles?.font_family && (
          <link
            href={`https://fonts.googleapis.com/css2?family=${project.Styles.font_family.replace(
              /\s+/g,
              "+"
            )}&display=swap`}
            rel="stylesheet"
          />
        )}

        {/* Estilo inline para garantir que as cores sejam aplicadas antes do JavaScript carregar */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --primary-color: ${project.Styles?.primary_color || "#3b82f6"};
            --secondary-color: ${project.Styles?.secondary_color || "#1e40af"};
            --background-color: ${project.Styles?.background_color || "white"};
            --text-color: ${
              project.Styles?.mode === "dark"
                ? project.Styles?.font_color_dark || "white"
                : project.Styles?.font_color || "black"
            };
            --font-family: ${
              project.Styles?.font_family || "sans-serif"
            }, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          
          body {
            background-color: var(--background-color);
            color: var(--text-color);
            font-family: var(--font-family);
            margin: 0;
            padding: 0;
          }
          
          .bg-primary {
            background-color: var(--primary-color);
          }
          
          .text-primary {
            color: var(--primary-color);
          }
          
          .border-primary {
            border-color: var(--primary-color);
          }
        `,
          }}
        />
      </head>
      <body>
        {/* Componente do lado do cliente para gerenciar o contexto do projeto */}
        <ProjectProvider project={project}>{children}</ProjectProvider>
      </body>
    </html>
  );
}
