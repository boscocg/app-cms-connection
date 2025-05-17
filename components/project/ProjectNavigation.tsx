// components/project/ProjectNavigation.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProject } from "./ProjectProvider";
import { useTheme } from "@/components";

/**
 * Componente de navegação para as páginas do projeto
 */
export function ProjectNavigation() {
  const { project } = useProject();
  const theme = useTheme();
  const pathname = usePathname();
  const ref = project?.Ref;

  // Se não houver projeto, não renderiza a navegação
  if (!ref) {
    return null;
  }

  // Definir os links de navegação
  const navLinks = [
    { href: `/${ref}/rescue`, label: "Início", id: "rescue" },
    { href: `/${ref}/details`, label: "Detalhes", id: "details" },
    { href: `/${ref}/preview`, label: "Visualização", id: "preview" },
    { href: `/${ref}/colors`, label: "Cores", id: "colors" },
  ];

  // Verificar qual link está ativo
  const getIsActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="border-b border-opacity-10 mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex space-x-4">
          {navLinks.map((link) => {
            const isActive = getIsActive(link.href);

            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={`py-3 px-4 inline-block transition ${
                    isActive ? "border-b-2" : "opacity-80 hover:opacity-100"
                  }`}
                  style={{
                    borderBottomColor: isActive ? theme.primaryColor : "transparent",
                    color: theme.primaryColor,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
