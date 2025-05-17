// components/ThemeProvider.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
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
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  fontFamily: 'sans-serif',
  backgroundColor: '#ffffff',
  fontColor: '#111827',
  fontColorDark: '#f3f4f6',
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
  React.useEffect(() => {
    if (!loading && !error && styles) {
      const root = document.documentElement;
      root.style.setProperty('--primary-color', theme.primaryColor);
      root.style.setProperty('--secondary-color', theme.secondaryColor);
      root.style.setProperty('--font-family', theme.fontFamily);
      root.style.setProperty('--background-color', theme.backgroundColor);
      root.style.setProperty('--font-color', theme.fontColor);
      root.style.setProperty('--font-color-dark', theme.fontColorDark);
      
      // Definir o tema claro/escuro
      if (theme.mode === 'dark') {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, [loading, error, styles, theme]);
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}
