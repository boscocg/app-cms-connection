// app/[ref]/details/page.tsx
import { Metadata } from 'next';
import { ProjectContainer } from '@/components/project';
import { ProjectDetails } from '@/components/project/ProjectDetails';

export const metadata: Metadata = {
  title: 'Detalhes do Projeto',
};

/**
 * Página de detalhes do projeto
 */
export default function ProjectDetailsPage() {
  return (
    <ProjectContainer pageTitle="Detalhes do Projeto">
      <ProjectDetails />
    </ProjectContainer>
  );
}
