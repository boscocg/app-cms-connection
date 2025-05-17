// app/[ref]/rescue/page.tsx
import { Metadata } from "next";
import { ProjectContainer } from "@/components/project";

export const metadata: Metadata = {
  title: "Dados Salvos",
};

/**
 * Página principal para salvar os dados do projeto
 */
export default function RescuePage() {
  return (
    <ProjectContainer showNavigation={true}>
      <div className="flex items-center justify-center py-16">
        <div className="text-center max-w-lg">
          <h1 className="text-3xl font-bold mb-4 text-primary">Dados Salvos!</h1>

          <p className="mb-8 text-lg text-primary">
            Os dados do projeto foram salvos com sucesso e agora você pode explorar as diferentes
            seções do projeto.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/"
              className="px-5 py-3 rounded-lg bg-primary hover:opacity-90 transition text-center text-secondary"
            >
              Voltar para o início
            </a>

            <a
              href="/example"
              className="px-5 py-3 rounded-lg border border-primary text-primary hover:bg-primary hover:bg-opacity-10 transition text-center"
            >
              Ver demonstração
            </a>
          </div>
        </div>
      </div>
    </ProjectContainer>
  );
}
