// app/example/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/components';
import { projectStorage } from '@/services';

/**
 * Página com tema aplicado
 */
function ThemedPage() {
  const theme = useTheme();
  const [projects, setProjects] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>('');
  
  // Carregar projetos do localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const keys = projectStorage.getStoredProjectKeys();
      const titles = keys.map(k => k.replace('project_', ''));
      setProjects(titles);
      if (titles.length > 0) setSelectedProject(titles[0]);
    }
  }, []);

  return (
    <div style={{ 
      backgroundColor: theme.backgroundColor,
      color: theme.primaryColor,
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: theme.fontFamily
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Demonstração do Tema
      </h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem' }}>
          Selecione um Projeto:
        </label>
        <select 
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            backgroundColor: theme.backgroundColor,
            color: theme.primaryColor,
            border: `1px solid ${theme.primaryColor}`,
            borderRadius: '0.25rem'
          }}
        >
          {projects.map(title => (
            <option key={title} value={title}>{title}</option>
          ))}
        </select>
      </div>
      
      <div style={{ 
        border: `1px solid ${theme.primaryColor}`,
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Detalhes do Tema</h2>
        <p style={{ marginBottom: '0.5rem' }}><strong>Modo:</strong> {theme.mode}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Cor Primária:</strong> {theme.primaryColor}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Cor Secundária:</strong> {theme.secondaryColor}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Cor de Fundo:</strong> {theme.backgroundColor}</p>
        <p style={{ marginBottom: '0.5rem' }}><strong>Fonte:</strong> {theme.fontFamily}</p>
      </div>
      
      <div style={{ 
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <button style={{ 
          backgroundColor: theme.primaryColor,
          color: theme.backgroundColor,
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '0.25rem'
        }}>
          Botão Primário
        </button>
        
        <button style={{ 
          backgroundColor: theme.secondaryColor,
          color: theme.backgroundColor,
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '0.25rem'
        }}>
          Botão Secundário
        </button>
      </div>
    </div>
  );
}

/**
 * Página de exemplo simplificada
 */
export default function ExamplePage() {
  const [availableProjects, setAvailableProjects] = useState<string[]>([]);
  
  // Verificar se existem projetos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const keys = projectStorage.getStoredProjectKeys();
      const titles = keys.map(k => k.replace('project_', ''));
      setAvailableProjects(titles);
    }
  }, []);
  
  // Se não há projetos, mostrar mensagem
  if (availableProjects.length === 0) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '2rem', color: '#1e40af', marginBottom: '1rem' }}>
          Demonstração do Tema
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          Nenhum projeto disponível. Visite a página inicial para selecionar um projeto.
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            borderRadius: '0.25rem',
            textDecoration: 'none'
          }}
        >
          Ir para página inicial
        </a>
      </div>
    );
  }
  
  // Se há projetos, mostrar a página com tema
  return (
    <ThemeProvider projectTitle={availableProjects[0]}>
      <ThemedPage />
    </ThemeProvider>
  );
}
