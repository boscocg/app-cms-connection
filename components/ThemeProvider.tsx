// components/ThemeProvider.tsx
'use client';

import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useProject } from '@/hooks';

// Criar um contexto para o tema
type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
  fontColor: string;
  fontColorDark: string;
  mode: string;
};

const defaultTheme: ThemeContextType = {
  primaryColor: '#3b82f6', // azul
  secondaryColor: '#1e40af', // azul escuro
  fontFamily: 'sans-serif',
  backgroundColor: '#ffffff', // branco
  fontColor: '#111827', // quase preto
  fontColorDark: '#f3f4f6', // quase branco
  mode: 'light',
};

const ThemeContext = createContext<ThemeContextType>(defaultTheme);

/**
 * Hook para usar o tema do projeto
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * Provedor de tema que usa os estilos do projeto
 */
export function ThemeProvider({ 
  children, 
  projectTitle 
}: { 
  children: ReactNode; 
  projectTitle: string;
}) {
  // Usar o hook de projeto para obter os estilos
  const { getStyles, loading, error } = useProject(projectTitle);
  
  // Obter os estilos do projeto
  const styles = getStyles();
  
  // Criar o tema com base nos estilos do projeto ou usar o tema padrão
  const theme: ThemeContextType = {
    primaryColor: styles?.primary_color || defaultTheme.primaryColor,
    secondaryColor: styles?.secondary_color || defaultTheme.secondaryColor,
    fontFamily: styles?.font_family || defaultTheme.fontFamily,
    backgroundColor: styles?.background_color || defaultTheme.backgroundColor,
    fontColor: styles?.font_color || defaultTheme.fontColor,
    fontColorDark: styles?.font_color_dark || defaultTheme.fontColorDark,
    mode: styles?.mode || defaultTheme.mode,
  };
  
  // Adicionar as variáveis CSS de tema
  useEffect(() => {
    if (!loading && !error && styles) {
      // Definir variáveis CSS personalizadas
      const root = document.documentElement;
      root.style.setProperty('--primary-color', theme.primaryColor);
      root.style.setProperty('--secondary-color', theme.secondaryColor);
      root.style.setProperty('--font-family', theme.fontFamily);
      
      // Configurar o tema com base no modo definido no CMS
      if (theme.mode === 'dark') {
        // Modo escuro
        root.style.setProperty('--bg-color', theme.backgroundColor === '#ffffff' ? '#1f2937' : theme.backgroundColor);
        root.style.setProperty('--text-color', theme.fontColorDark);
        
        // Adicionar classe dark para o suporte ao Tailwind
        document.body.classList.add('dark');
        // Remover qualquer classe light que possa ter sido adicionada
        document.body.classList.remove('light');
      } else {
        // Modo claro
        root.style.setProperty('--bg-color', theme.backgroundColor);
        root.style.setProperty('--text-color', theme.fontColor);
        
        // Remover classe dark
        document.body.classList.remove('dark');
        // Adicionar classe light (opcional)
        document.body.classList.add('light');
      }
      
      // Aplicar estilos base ao body
      document.body.style.backgroundColor = theme.mode === 'dark' 
        ? (theme.backgroundColor === '#ffffff' ? '#111827' : theme.backgroundColor)
        : theme.backgroundColor;
      
      document.body.style.color = theme.mode === 'dark' 
        ? theme.fontColorDark 
        : theme.fontColor;
      
      document.body.style.fontFamily = theme.fontFamily;
    }
    
    // Cleanup ao desmontar
    return () => {
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
      
      const root = document.documentElement;
      root.style.removeProperty('--primary-color');
      root.style.removeProperty('--secondary-color');
      root.style.removeProperty('--font-family');
      root.style.removeProperty('--bg-color');
      root.style.removeProperty('--text-color');
    };
  }, [loading, error, styles, theme]);
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
