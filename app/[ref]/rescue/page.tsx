// app/[ref]/rescue/page.tsx
import { Metadata } from "next";
import { GET_PROJECT, graphqlRequest } from "@/lib/graphql";
import { ThemeProvider } from "@/components";
import { projectStorage } from "@/services";
import type { GetProjectQuery } from "@/types/graphql";

// Tipo para os parâmetros da página
type PageParams = {
  params: {
    ref: string;
  };
};

/**
 * Função para gerar metadados dinâmicos com base nos dados do projeto
 */
export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const ref = params.ref;

  try {
    // Buscar os dados do projeto para SEO
    const data = await graphqlRequest<GetProjectQuery>(GET_PROJECT, { ref });
    const project = data.projects?.[0];

    if (!project || !project.SEO) {
      return {
        title: "Projeto - Dados salvos",
        description: "Dados do projeto foram salvos no localStorage",
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
      title: project.SEO.title || project.Title,
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
      title: "Projeto - Dados salvos",
      description: "Dados do projeto foram salvos no localStorage",
    };
  }
}

/**
 * Componente para exibir o conteúdo do projeto
 */
function ProjectContent({
  project,
}: {
  project: NonNullable<GetProjectQuery["projects"]>[0] | null;
}) {
  // Salvar o projeto no localStorage via client-side
  if (typeof window !== "undefined" && project) {
    projectStorage.saveProject(project);
    console.log(`Project "${project.Title}" saved to localStorage`);
  }

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-4xl font-bold mb-4 text-primary">{project.Title}</h1>
        <p className="text-lg mb-6 text-primary">Dados do projeto salvos com sucesso!</p>

        <div className="flex justify-center space-x-4">
          <a
            href="/"
            className="px-5 py-3 rounded-lg bg-primary text-secondary hover:opacity-90 transition"
          >
            Voltar para o início
          </a>

          <a
            href="/example"
            className="px-5 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:bg-opacity-10 transition"
          >
            Ver demonstração
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Componente principal da página com o tema aplicado
 */
export default async function RescuePage({ params }: PageParams) {
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

  // SSR: Renderizar o HTML com o estilo inicial
  // Isso garante que os crawlers vejam o conteúdo estilizado
  return (
    <html
      lang="pt-BR"
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
          }
          
          body {
            background-color: var(--background-color);
            color: var(--text-color);
            font-family: ${
              project.Styles?.font_family || "sans-serif"
            }, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
        <div id="themed-content">
          {/* Componente do lado do cliente para aplicar o tema */}
          <ThemeProviderWrapper projectTitle={project.Title ?? "Projeto"} project={project}>
            <ProjectContent project={project} />
          </ThemeProviderWrapper>
        </div>
      </body>
    </html>
  );
}

/**
 * Componente wrapper para o ThemeProvider (client-side)
 */
function ThemeProviderWrapper({
  projectTitle,
  project,
  children,
}: {
  projectTitle: string;
  project: NonNullable<GetProjectQuery["projects"]>[0];
  children: React.ReactNode;
}) {
  "use client";

  // Salvar o projeto no localStorage
  if (typeof window !== "undefined") {
    projectStorage.saveProject(project);
  }

  return <ThemeProvider projectTitle={projectTitle}>{children}</ThemeProvider>;
}
