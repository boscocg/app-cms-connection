// components/project/ProjectDetails.tsx
"use client";

import React from "react";
import { useProject } from "./ProjectProvider";
import { useTheme } from "@/components";

/**
 * Componente que exibe os detalhes do projeto
 */
export function ProjectDetails() {
  const { project } = useProject();
  const theme = useTheme();

  if (!project) {
    return (
      <div className="space-y-8">
        <section className="bg-primary bg-opacity-5 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-primary">Informações Gerais</h2>
          <p>Projeto não encontrado ou não carregado.</p>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="bg-primary bg-opacity-5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">Informações Gerais</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="font-medium text-lg">Título</h3>
              <p>{project.Title || "Não especificado"}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-lg">Referência</h3>
              <p>{project.Ref || "Não especificado"}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-lg">ID do Documento</h3>
              <p>{project.documentId || "Não especificado"}</p>
            </div>
          </div>

          {project.SEO && (
            <div>
              <h3 className="font-medium text-lg mb-2">SEO</h3>

              <div className="p-4 border border-primary border-opacity-20 rounded">
                <div className="mb-2">
                  <span className="font-medium">Título:</span>{" "}
                  {project.SEO.title || "Não especificado"}
                </div>

                <div className="mb-2">
                  <span className="font-medium">Descrição:</span>{" "}
                  {project.SEO.description || "Não especificado"}
                </div>

                {project.SEO.image?.url && (
                  <div>
                    <span className="font-medium">Imagem:</span>{" "}
                    {project.SEO.image.name || "Sem nome"}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {project.Styles && (
        <section className="p-6 border border-primary border-opacity-20 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-primary">Estilos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h3 className="font-medium text-lg">Modo</h3>
                <p>{project.Styles.mode || "Não especificado"}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-medium text-lg">Família da Fonte</h3>
                <p style={{ fontFamily: project.Styles.font_family ?? undefined }}>
                  {project.Styles.font_family || "Não especificado"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <h3 className="font-medium text-lg">Cor de Fundo</h3>
                  <div className="flex items-center mt-1">
                    <div
                      className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                      style={{ backgroundColor: project.Styles.background_color ?? undefined }}
                    ></div>
                    <span>{project.Styles.background_color || "Não especificado"}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-medium text-lg">Cor do Texto</h3>
                  <div className="flex items-center mt-1">
                    {project.Styles.mode === "light" ? (
                      <>
                        <div
                          className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                          style={{ backgroundColor: project.Styles.font_color ?? undefined }}
                        ></div>
                        <span>{project.Styles.font_color || "Não especificado"}</span>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                          style={{ backgroundColor: project.Styles.font_color_dark ?? undefined }}
                        ></div>
                        <span>{project.Styles.font_color_dark || "Não especificado"}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Cores do Tema</h3>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center">
                  <div
                    className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: project.Styles.primary_color ?? undefined }}
                  ></div>
                  <span>
                    <strong>Primária:</strong> {project.Styles.primary_color || "Não especificado"}
                  </span>
                </div>

                <div className="flex items-center">
                  <div
                    className="w-6 h-6 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: project.Styles.secondary_color ?? undefined }}
                  ></div>
                  <span>
                    <strong>Secundária:</strong>{" "}
                    {project.Styles.secondary_color || "Não especificado"}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex flex-col space-y-2">
                    <button className="px-4 py-2 bg-primary text-white rounded">
                      Botão Primário
                    </button>

                    <button
                      style={{ backgroundColor: theme.secondaryColor, color: "white" }}
                      className="px-4 py-2 rounded"
                    >
                      Botão Secundário
                    </button>

                    <button className="px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:bg-opacity-10">
                      Botão Contorno
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {project.Images && (
        <section className="bg-primary bg-opacity-5 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-primary">Imagens</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {project.Images.client_image?.url && (
              <div>
                <h3 className="font-medium text-sm mb-2">Imagem do Cliente</h3>
                <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
                  <img
                    src={
                      project.Images.client_image.url.startsWith("http")
                        ? project.Images.client_image.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${project.Images.client_image.url}`
                    }
                    alt={project.Images.client_image.name || "Imagem do cliente"}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {project.Images.client_logo1?.url && (
              <div>
                <h3 className="font-medium text-sm mb-2">Logo do Cliente 1</h3>
                <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
                  <img
                    src={
                      project.Images.client_logo1.url.startsWith("http")
                        ? project.Images.client_logo1.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${project.Images.client_logo1.url}`
                    }
                    alt={project.Images.client_logo1.name || "Logo do cliente 1"}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {project.Images.client_logo2?.url && (
              <div>
                <h3 className="font-medium text-sm mb-2">Logo do Cliente 2</h3>
                <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
                  <img
                    src={
                      project.Images.client_logo2.url.startsWith("http")
                        ? project.Images.client_logo2.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${project.Images.client_logo2.url}`
                    }
                    alt={project.Images.client_logo2.name || "Logo do cliente 2"}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {project.Images.favicon?.url && (
              <div>
                <h3 className="font-medium text-sm mb-2">Favicon</h3>
                <div className="aspect-square overflow-hidden rounded-lg bg-white shadow-sm">
                  <img
                    src={
                      project.Images.favicon.url.startsWith("http")
                        ? project.Images.favicon.url
                        : `${process.env.NEXT_PUBLIC_API_URL}${project.Images.favicon.url}`
                    }
                    alt={project.Images.favicon.name || "Favicon"}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
