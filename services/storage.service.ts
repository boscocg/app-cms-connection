// services/storage.service.ts
import type { GetProjectQuery } from "@/types/graphql";

type Project = NonNullable<GetProjectQuery["projects"]>[0];

/**
 * Classe de serviço para gerenciar projetos no localStorage
 */
class ProjectStorageService {
  /**
   * Salva um projeto no localStorage
   * @param project - Dados do projeto
   */
  saveProject(project: Project): void {
    if (typeof window === "undefined" || !project) return;

    try {
      // Salvar usando o Title como chave
      const key = `project_${project.Title}`;
      localStorage.setItem(key, JSON.stringify(project));

      // Manter uma lista de chaves de projetos
      const storedKeys = this.getStoredProjectKeys();
      if (!storedKeys.includes(key)) {
        storedKeys.push(key);
        localStorage.setItem("project_keys", JSON.stringify(storedKeys));
      }
    } catch (error) {
      console.error("[ProjectStorageService] Failed to save project:", error);
    }
  }

  /**
   * Obtém as chaves de todos os projetos armazenados
   */
  getStoredProjectKeys(): string[] {
    if (typeof window === "undefined") return [];

    try {
      const keys = localStorage.getItem("project_keys");
      return keys ? JSON.parse(keys) : [];
    } catch (error) {
      console.error("[ProjectStorageService] Failed to get project keys:", error);
      return [];
    }
  }

  /**
   * Obtém um projeto pelo título
   * @param title - Título do projeto
   */
  getProjectByTitle(title: string): Project | null {
    if (typeof window === "undefined") return null;

    try {
      const key = `project_${title}`;
      const projectData = localStorage.getItem(key);
      return projectData ? JSON.parse(projectData) : null;
    } catch (error) {
      console.error(`[ProjectStorageService] Failed to get project by title "${title}":`, error);
      return null;
    }
  }

  /**
   * Obtém os estilos de um projeto pelo título
   * @param title - Título do projeto
   */
  getProjectStyles(title: string): any | null {
    const project = this.getProjectByTitle(title);
    return project?.Styles || null;
  }

  /**
   * Obtém dados específicos de um projeto pelo título
   * @param title - Título do projeto
   * @param key - Chave do dado desejado
   */
  getProjectData<K extends keyof Project>(title: string, key: K): Project[K] | null {
    const project = this.getProjectByTitle(title);
    return project ? project[key] : null;
  }

  /**
   * Remove um projeto do localStorage
   * @param title - Título do projeto
   */
  removeProject(title: string): void {
    if (typeof window === "undefined") return;

    try {
      const key = `project_${title}`;
      localStorage.removeItem(key);

      // Atualizar lista de chaves
      const storedKeys = this.getStoredProjectKeys();
      const updatedKeys = storedKeys.filter((k) => k !== key);
      localStorage.setItem("project_keys", JSON.stringify(updatedKeys));
    } catch (error) {
      console.error(`[ProjectStorageService] Failed to remove project "${title}":`, error);
    }
  }

  /**
   * Limpa todos os projetos do localStorage
   */
  clearAllProjects(): void {
    if (typeof window === "undefined") return;

    try {
      const storedKeys = this.getStoredProjectKeys();

      // Remover cada projeto
      storedKeys.forEach((key) => {
        localStorage.removeItem(key);
      });

      // Limpar a lista de chaves
      localStorage.removeItem("project_keys");
    } catch (error) {
      console.error("[ProjectStorageService] Failed to clear all projects:", error);
    }
  }
}

// Exportar uma instância única do serviço
export const projectStorage = new ProjectStorageService();
