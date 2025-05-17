// app/[ref]/rescue/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GET_PROJECT, graphqlRequest } from '@/lib/graphql';
import { projectStorage } from '@/services';
import type { GetProjectQuery } from '@/types/graphql';

type Project = NonNullable<GetProjectQuery['projects']>[0];

/**
 * Componente principal da página de resgate
 */
export default function RescuePage({ 
  params 
}: { 
  params: { ref: string } 
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true);
        
        // Extrair o ref para evitar acesso direto a params.ref dentro da função assíncrona
        const ref = params.ref;
        
        // Buscar os dados do projeto
        const data = await graphqlRequest<GetProjectQuery>(GET_PROJECT, { ref });
        const projectData = data.projects?.[0];
        
        if (!projectData) {
          setError('Projeto não encontrado');
          setLoading(false);
          return;
        }
        
        // Salvar o projeto no localStorage
        projectStorage.saveProject(projectData);
        
        // Atualizar o estado
        setProject(projectData);
        setLoading(false);
        
        // Deslogar que salvou no localStorage
        console.log(`Project "${projectData.Title}" saved to localStorage`);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Erro ao carregar o projeto');
        setLoading(false);
      }
    }
    
    fetchProject();
  }, [params.ref]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Carregando projeto...</h1>
          <p className="text-gray-600">Aguarde enquanto salvamos as informações</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-red-600">Erro</h1>
          <p className="text-gray-600">{error || 'Projeto não encontrado'}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  // Exibir apenas o título conforme solicitado
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{project.Title}</h1>
        <p className="text-green-600 text-lg mb-6">
          Dados do projeto salvos com sucesso!
        </p>
        <button 
          onClick={() => router.push('/')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Voltar para o início
        </button>
      </div>
    </div>
  );
}
