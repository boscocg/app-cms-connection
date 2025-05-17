// app/example/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/components';
import { projectStorage } from '@/services';

/**
 * Componente de exemplo para demonstrar o uso do ThemeProvider
 */
function ThemedContent() {
  // Usar o hook de tema
  const theme = useTheme();
  
  return (
    <div style={{ 
      color: theme.fontColor,
      fontFamily: theme.fontFamily,
      backgroundColor: theme.backgroundColor,
      padding: '2rem',
      borderRadius: '0.5rem',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }}>
      <h2 style={{ color: theme.primaryColor, marginBottom: '1rem' }}>
        Exemplo de Conteúdo com Tema
      </h2>
      <p style={{ marginBottom: '1rem' }}>
        Este conteúdo está usando os estilos do projeto selecionado.
      </p>
      <button style={{ 
        backgroundColor: theme.primaryColor,
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer',
      }}>
        Botão Primário
      </button>
      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ color: theme.secondaryColor, marginBottom: '0.5rem' }}>
          Detalhes do Tema:
        </h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><strong>Cor Primária:</strong> {theme.primaryColor}</li>
          <li><strong>Cor Secundária:</strong> {theme.secondaryColor}</li>
          <li><strong>Fonte:</strong> {theme.fontFamily}</li>
          <li><strong>Modo:</strong> {theme.mode}</li>
        </ul>
      </div>
    </div>
  );
}

/**
 * Página de exemplo
 */
export default function ExamplePage() {
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [availableProjects, setAvailableProjects] = useState<string[]>([]);
  
  // Carregar projetos disponíveis no localStorage
  useEffect(() => {
    const keys = projectStorage.getStoredProjectKeys();
    const projectTitles = keys.map(key => {
      // Remover o prefixo 'project_'
      return key.replace('project_', '');
    });
    setAvailableProjects(projectTitles);
  }, []);
  
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Exemplo de Uso do Tema</h1>
      
      <div className="mb-8">
        <label className="block mb-2 text-lg font-medium">Selecione um Projeto:</label>
        <select 
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Selecione um projeto...</option>
          {availableProjects.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>
      
      {selectedProject ? (
        <ThemeProvider projectTitle={selectedProject}>
          <ThemedContent />
        </ThemeProvider>
      ) : (
        <div className="bg-gray-100 p-8 rounded-md text-center">
          <p className="text-gray-600">
            {availableProjects.length > 0 
              ? 'Selecione um projeto para ver o tema aplicado' 
              : 'Nenhum projeto disponível no localStorage. Visite a página inicial e selecione um projeto primeiro.'}
          </p>
        </div>
      )}
    </div>
  );
}
