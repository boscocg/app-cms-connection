// components/project/ProjectProvider.tsx
"use client";

import React, { createContext, useContext, useEffect } from "react";
import { ThemeProvider } from "@/components";
import { projectStorage } from "@/services";
import type { GetProjectQuery } from "@/types/graphql";

// Tipo para os dados do projeto
export type ProjectData = NonNullable<GetProjectQuery["projects"]>[0];

// Criação do contexto do projeto
type ProjectContextType = {
  project: ProjectData;
  title: string;
  ref: string;
  hasSEO: boolean;
  hasImages: boolean;
  hasStyles: boolean;
};

// Valor padrão para o contexto (nunca será usado, mas necessário para TypeScript)
const defaultProjectContext: ProjectContextType = {
  project: {} as ProjectData,
  title: "",
  ref: "",
  hasSEO: false,
  hasImages: false,
  hasStyles: false,
};

// Criar o contexto
const ProjectContext = createContext<ProjectContextType>(defaultProjectContext);

// Hook para acessar o contexto do projeto
export const useProject = () => useContext(ProjectContext);

// Props para o ProjectProvider
interface ProjectProviderProps {
  project: ProjectData;
  children: React.ReactNode;
}

/**
 * Componente que fornece o contexto do projeto e aplica o tema
 */
export function ProjectProvider({ project, children }: ProjectProviderProps) {
  // Salvar o projeto no localStorage quando o componente montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      projectStorage.saveProject(project);
      console.log(`Project "${project?.Title ?? ""}" saved to localStorage`);
    }
  }, [project]);

  // Preparar os valores do contexto
  const contextValue: ProjectContextType = {
    project,
    title: project?.Title || "",
    ref: project?.Ref || "",
    hasSEO: !!project?.SEO,
    hasImages: !!project?.Images,
    hasStyles: !!project?.Styles,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      <ThemeProvider projectTitle={project?.Title || ""}>{children}</ThemeProvider>
    </ProjectContext.Provider>
  );
}
