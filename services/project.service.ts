// services/project.service.ts
import { GET_ALL_PROJECTS_REFS, GET_PROJECT, graphqlRequest } from '@/lib/graphql';
import type { GetAllProjectsRefsQuery, GetProjectQuery } from '@/types/graphql';

export type Project = NonNullable<GetProjectQuery['projects']>[0];

/**
 * Busca todas as refs de projetos para geração estática
 * @returns Array de objetos com as refs dos projetos
 */
export async function getAllProjectRefs() {
  try {
    const data = await graphqlRequest<GetAllProjectsRefsQuery>(GET_ALL_PROJECTS_REFS);
    const projects = data.projects || [];
    
    return projects.map((project) => ({
      ref: project?.Ref || '',
    }));
  } catch (error) {
    console.error('[getAllProjectRefs] Error fetching projects:', error);
    return [];
  }
}

/**
 * Busca os dados de um projeto pelo ref
 * @param ref - A referência do projeto a ser buscado
 * @returns Dados do projeto ou null se não encontrado
 */
export async function getProjectByRef(ref: string): Promise<Project | null> {
  try {
    const data = await graphqlRequest<GetProjectQuery>(GET_PROJECT, { ref });
    
    return data.projects?.[0] || null;
  } catch (error) {
    console.error('[getProjectByRef] Error fetching project data:', error);
    return null;
  }
}
