// components/project/ProjectContainer.tsx
'use client';

import React from 'react';
import { ProjectHeader, ProjectNavigation } from './';

interface ProjectContainerProps {
  children: React.ReactNode;
  pageTitle?: string;
  showNavigation?: boolean;
  showHeader?: boolean;
  showBackButton?: boolean;
}

/**
 * Componente container para as páginas de projeto
 * Fornece um layout consistente com cabeçalho e navegação opcional
 */
export function ProjectContainer({ 
  children, 
  pageTitle,
  showNavigation = true,
  showHeader = true,
  showBackButton = true
}: ProjectContainerProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <ProjectHeader pageTitle={pageTitle} showBackButton={showBackButton} />
      )}
      
      {showNavigation && <ProjectNavigation />}
      
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
      
      <footer className="py-4 text-center opacity-70 text-sm">
        <div className="max-w-6xl mx-auto px-4">
          &copy; {new Date().getFullYear()} - Powered by Project Themes
        </div>
      </footer>
    </div>
  );
}
