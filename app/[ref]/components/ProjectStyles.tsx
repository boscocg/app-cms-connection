"use client";

import React from "react";
import type { GetProjectQuery } from "@/types/graphql";

type ProjectStylesProps = {
  project: NonNullable<GetProjectQuery["projects"]>[0];
};

/**
 * Componente do lado do cliente para gerenciar estilos do projeto
 */
export function ProjectStyles({ project }: ProjectStylesProps) {
  // Script para carregar a fonte
  React.useEffect(() => {
    if (project.Styles?.font_family) {
      const fontFamily = project.Styles.font_family;
      const link = document.createElement("link");
      link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(
        /\s+/g,
        "+"
      )}:wght@300;400;500;700&display=swap`;
      link.rel = "stylesheet";
      document.head.appendChild(link);
      
      return () => {
        // Remover o link quando o componente for desmontado
        document.head.removeChild(link);
      };
    }
  }, [project.Styles?.font_family]);

  // Aplicar estilos CSS
  React.useEffect(() => {
    document.documentElement.classList.add(
      project.Styles?.mode === "dark" ? "dark" : "light"
    );
    
    const root = document.documentElement;
    root.style.setProperty("--primary-color", project.Styles?.primary_color || "#3b82f6");
    root.style.setProperty("--secondary-color", project.Styles?.secondary_color || "#1e40af");
    root.style.setProperty("--background-color", project.Styles?.background_color || "white");
    root.style.setProperty(
      "--text-color",
      project.Styles?.mode === "dark"
        ? project.Styles?.font_color_dark || "white"
        : project.Styles?.font_color || "black"
    );
    root.style.setProperty(
      "--font-family",
      `"${project.Styles?.font_family || "sans-serif"}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
    );
    
    document.body.style.backgroundColor = project.Styles?.background_color || "white";
    document.body.style.color =
      project.Styles?.mode === "dark"
        ? project.Styles?.font_color_dark || "white"
        : project.Styles?.font_color || "black";
    document.body.style.fontFamily = `"${
      project.Styles?.font_family || "sans-serif"
    }", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`;
    
    return () => {
      // Limpar os estilos quando o componente for desmontado
      document.documentElement.classList.remove(
        project.Styles?.mode === "dark" ? "dark" : "light"
      );
      // Remover as variáveis CSS
      root.style.removeProperty("--primary-color");
      root.style.removeProperty("--secondary-color");
      root.style.removeProperty("--background-color");
      root.style.removeProperty("--text-color");
      root.style.removeProperty("--font-family");
      
      // Resetar os estilos do body
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
      document.body.style.fontFamily = "";
    };
  }, [project.Styles]);

  return (
    <style jsx global>{`
      :root {
        --primary-color: ${project.Styles?.primary_color || "#3b82f6"};
        --secondary-color: ${project.Styles?.secondary_color || "#1e40af"};
        --background-color: ${project.Styles?.background_color || "white"};
        --text-color: ${project.Styles?.mode === "dark"
          ? project.Styles?.font_color_dark || "white"
          : project.Styles?.font_color || "black"};
        --font-family: "${project.Styles?.font_family || "sans-serif"}", -apple-system,
          BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
    `}</style>
  );
}
