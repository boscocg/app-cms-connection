// components/project/ProjectHeader.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useProject } from "./ProjectProvider";
import { useTheme } from "@/components";

interface ProjectHeaderProps {
  pageTitle?: string;
  showBackButton?: boolean;
}

/**
 * Componente de cabeçalho para as páginas de projeto
 */
export function ProjectHeader({ pageTitle, showBackButton = true }: ProjectHeaderProps) {
  const { project } = useProject();
  const theme = useTheme();

  return (
    <header className="py-4 mb-6">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <Link
              href="/"
              className="text-primary hover:opacity-80 transition"
              style={{ color: theme.primaryColor }}
            >
              ← Voltar
            </Link>
          )}

          <div>
            <h1 className="text-2xl font-bold">{pageTitle || project?.Title || "Projeto"}</h1>
            {pageTitle && <p className="text-sm opacity-80">{project?.Title}</p>}
          </div>
        </div>

        {project && project.Images?.client_logo2?.url && (
          <div className="h-10">
            <img
              src={
                project.Images.client_logo2.url.startsWith("http")
                  ? project.Images.client_logo2.url
                  : `${process.env.NEXT_PUBLIC_API_URL}${project.Images.client_logo2.url}`
              }
              alt={project.Images.client_logo2.name || `${project.Title} logo`}
              className="h-full w-auto object-contain"
            />
          </div>
        )}
      </div>
    </header>
  );
}
