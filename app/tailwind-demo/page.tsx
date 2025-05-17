// app/tailwind-demo/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from '@/components';
import { projectStorage } from '@/services';

/**
 * Componente de demonstração usando classes Tailwind
 */
function TailwindDemo() {
  // Obter as configurações do tema
  const theme = useTheme();
  
  // Criar classes CSS customizadas
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const style = document.createElement('style');
      style.innerHTML = `
        .theme-bg { background-color: ${theme.backgroundColor} !important; }
        .theme-text { color: ${theme.primaryColor} !important; }
        .theme-primary-bg { background-color: ${theme.primaryColor} !important; }
        .theme-primary-text { color: ${theme.backgroundColor} !important; }
        .theme-secondary-bg { background-color: ${theme.secondaryColor} !important; }
        .theme-border { border-color: ${theme.primaryColor} !important; }
      `;
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [theme]);
  
  return (
    <div className="theme-bg theme-text p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Demonstração com Tailwind</h1>
      <p className="mb-6">Esta página usa classes Tailwind com as variáveis do tema. Fundo na cor backgroundColor e texto na cor primary.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="theme-bg theme-text p-4 rounded theme-border border">
          <h2 className="text-xl font-bold mb-2">Detalhes do Tema</h2>
          <ul className="space-y-1">
            <li><strong>Modo:</strong> {theme.mode}</li>
            <li><strong>Cor Primária:</strong> {theme.primaryColor}</li>
            <li><strong>Cor Secundária:</strong> {theme.secondaryColor}</li>
            <li><strong>Cor de Fundo:</strong> {theme.backgroundColor}</li>
            <li><strong>Família da Fonte:</strong> {theme.fontFamily}</li>
          </ul>
        </div>
        
        <div className="theme-bg theme-text p-4 rounded theme-border border">
          <h2 className="text-xl font-bold mb-2">Elementos de Interface</h2>
          <div className="space-y-2">
            <button className="theme-primary-bg theme-primary-text py-2 px-4 rounded w-full">
              Botão Primário
            </button>
            <button className="theme-secondary-bg theme-primary-text py-2 px-4 rounded w-full">
              Botão Secundário
            </button>
            <button className="theme-bg theme-text py-2 px-4 rounded w-full theme-border border">
              Botão Contorno
            </button>
          </div>
        </div>
      </div>
      
      <div className="theme-bg theme-text p-4 rounded theme-border border mb-6">
        <h2 className="text-xl font-bold mb-2">Amostras de Cores</h2>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="theme-primary-bg h-20 rounded-t flex items-center justify-center">
              <span className="theme-primary-text">Primária</span>
            </div>
            <div className="theme-bg theme-text text-center border theme-border border-t-0 py-1 rounded-b">
              Primária
            </div>
          </div>
          
          <div>
            <div className="theme-secondary-bg h-20 rounded-t flex items-center justify-center">
              <span className="theme-primary-text">Secundária</span>
            </div>
            <div className="theme-bg theme-text text-center border theme-border border-t-0 py-1 rounded-b">
              Secundária
            </div>
          </div>
          
          <div>
            <div className="theme-bg h-20 rounded-t flex items-center justify-center theme-border border">
              <span className="theme-text">Fundo</span>
            </div>
            <div className="theme-bg theme-text text-center border theme-border border-t-0 py-1 rounded-b">
              Fundo
            </div>
          </div>
        </div>
      </div>
      
      <div className="theme-bg theme-text p-4 rounded theme-border border">
        <h2 className="text-xl font-bold mb-2">Exemplo de Texto</h2>
        <p className="mb-2">
          Este texto usa a cor primária do tema sobre o fundo da cor backgroundColor. 
          Isso permite visualizar o contraste entre essas duas cores.
        </p>
        <p>
          O contraste adequado é essencial para garantir boa legibilidade e acessibilidade 
          na interface do usuário.
        </p>
      </div>
    </div>
  );
}

/**
 * Componente que exibe o seletor de projeto e aplica o tema
 */
function ThemedApp() {
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
      <div className="max-w-4xl mx-auto">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          Visualização do Tema
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
              borderRadius: '0.25rem',
              marginBottom: '2rem'
            }}
          >
            {projects.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>
        </div>
        
        <TailwindDemo />
      </div>
    </div>
  );
}

/**
 * Página de demonstração Tailwind
 */
export default function TailwindDemoPage() {
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
      <ThemedApp />
    </ThemeProvider>
  );
}
