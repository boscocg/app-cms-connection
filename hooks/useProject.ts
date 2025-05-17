// hooks/useProject.ts
'use client';

import { useState, useEffect } from 'react';
import { projectStorage } from '@/services';
import type { Project } from '@/services/project.service';

/**
 * Hook para acessar os dados de um projeto armazenado no localStorage
 * @param projectTitle - Título do projeto
 */
export function useProject(projectTitle: string) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Carregar projeto do localStorage
      const projectData = projectStorage.getProjectByTitle(projectTitle);
      
      if (projectData) {
        setProject(projectData);
      } else {
        setError('Projeto não encontrado no localStorage');
      }
    } catch (err) {
      console.error(`Error loading project "${projectTitle}" from localStorage:`, err);
      setError('Erro ao carregar dados do projeto');
    } finally {
      setLoading(false);
    }
  }, [projectTitle]);

  /**
   * Função para obter os estilos do projeto
   */
  const getStyles = () => {
    return project?.Styles || null;
  };

  /**
   * Função para obter as imagens do projeto
   */
  const getImages = () => {
    return project?.Images || null;
  };

  /**
   * Função para obter os dados de SEO do projeto
   */
  const getSEO = () => {
    return project?.SEO || null;
  };

  /**
   * Função para obter um dado específico do projeto
   */
  const getData = <K extends keyof Project>(key: K): Project[K] | null => {
    return project ? project[key] : null;
  };

  return {
    project,
    loading,
    error,
    getStyles,
    getImages,
    getSEO,
    getData,
  };
}
