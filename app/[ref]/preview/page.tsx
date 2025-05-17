// app/[ref]/preview/page.tsx
import { Metadata } from 'next';
import { ProjectContainer } from '@/components/project';
import { ThemePreview } from '@/components/project/ThemePreview';

export const metadata: Metadata = {
  title: 'Visualização do Tema',
};

/**
 * Página de visualização do tema
 */
export default function ThemePreviewPage() {
  return (
    <ProjectContainer pageTitle="Visualização do Tema">
      <ThemePreview />
    </ProjectContainer>
  );
}
