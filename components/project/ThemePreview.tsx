// components/project/ThemePreview.tsx
"use client";

import React from "react";
import { useProject } from "./ProjectProvider";
import { useTheme } from "@/components";

/**
 * Componente que exibe uma prévia do tema aplicado
 */
export function ThemePreview() {
  const { project } = useProject();
  const theme = useTheme();

  return (
    <div className="space-y-8">
      <section className="bg-primary bg-opacity-5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">Prévia do Tema</h2>

        <p className="mb-4">
          Esta página mostra como o tema se comporta quando aplicado a diversos elementos de
          interface. Todos os estilos são baseados nas configurações definidas para este projeto.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="border border-primary border-opacity-20 rounded-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h3 className="text-xl font-bold text-white">Tipografia</h3>
          </div>

          <div className="p-6">
            <h1 className="text-3xl font-bold mb-3 text-primary">Título Principal (H1)</h1>
            <h2 className="text-2xl font-bold mb-3 text-primary">Subtítulo (H2)</h2>
            <h3 className="text-xl font-bold mb-3 text-primary">Título de Seção (H3)</h3>
            <h4 className="text-lg font-bold mb-3 text-primary">Título Menor (H4)</h4>

            <p className="mb-3">
              Este é um parágrafo de texto normal. O texto usa a fonte{" "}
              {project?.Styles?.font_family || "padrão"} e a cor principal definida no tema. Este
              texto deve ter boa legibilidade sobre a cor de fundo.
            </p>

            <p className="mb-3">
              <strong>Texto em negrito</strong> e <em>texto em itálico</em> também devem ser
              legíveis e manter a consistência com o resto do tema.
            </p>

            <blockquote className="pl-4 border-l-4 border-primary italic my-4 text-opacity-80">
              Este é um bloco de citação que usa a cor primária como destaque.
            </blockquote>

            <div className="my-3">
              <a href="#" className="text-primary hover:underline">
                Este é um link de texto
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div
                className="aspect-square flex items-center justify-center"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span className="text-white">Primary</span>
              </div>
              <div
                className="aspect-square flex items-center justify-center"
                style={{ backgroundColor: theme.secondaryColor }}
              >
                <span className="text-white">Secondary</span>
              </div>
              <div
                className="aspect-square flex items-center justify-center border"
                style={{ borderColor: theme.primaryColor }}
              >
                <span style={{ color: theme.primaryColor }}>Text</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border border-primary border-opacity-20 rounded-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h3 className="text-xl font-bold text-white">Componentes</h3>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 text-primary">Botões</h4>

              <div className="flex flex-wrap gap-3 mb-4">
                <button className="px-4 py-2 bg-primary text-white rounded">Botão Primário</button>

                <button
                  style={{ backgroundColor: theme.secondaryColor, color: "white" }}
                  className="px-4 py-2 rounded"
                >
                  Botão Secundário
                </button>

                <button className="px-4 py-2 border border-primary text-primary rounded">
                  Botão Contorno
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-primary text-white rounded opacity-70">
                  Desabilitado
                </button>

                <button className="px-4 py-2 bg-primary text-white rounded" disabled>
                  Botão Desabilitado
                </button>

                <button className="px-4 py-2 bg-primary text-white rounded text-sm">
                  Botão Pequeno
                </button>

                <button className="px-4 py-2 bg-primary text-white rounded text-lg">
                  Botão Grande
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3 text-primary">Formulários</h4>

              <div className="mb-4">
                <label className="block mb-2">Campo de Texto</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: theme.primaryColor }}
                  placeholder="Digite aqui..."
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">Seleção</label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  style={{ borderColor: theme.primaryColor }}
                >
                  <option>Opção 1</option>
                  <option>Opção 2</option>
                  <option>Opção 3</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Checkbox</label>
                <div className="flex items-center">
                  <input type="checkbox" id="checkbox1" className="mr-2" />
                  <label htmlFor="checkbox1">Opção de checkbox</label>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3 text-primary">Cards</h4>

              <div className="border border-primary border-opacity-20 rounded-lg p-4">
                <h5 className="font-bold mb-2">Título do Card</h5>
                <p className="text-sm mb-3">Este é um exemplo de card com borda e conteúdo.</p>
                <button className="text-sm px-3 py-1 bg-primary text-white rounded">Ação</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-primary bg-opacity-5 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">Exemplo de Página</h2>

        <div className="border border-primary border-opacity-20 rounded-lg overflow-hidden">
          <div className="bg-primary p-3 flex justify-between items-center">
            <div className="text-white font-bold">Exemplo de Layout</div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-white bg-opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-white bg-opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-white bg-opacity-50"></div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-primary">Dashboard</h3>
                <p className="text-sm opacity-70">Bem-vindo ao seu painel</p>
              </div>

              <button className="px-4 py-2 bg-primary text-white rounded">+ Novo Item</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 border border-primary border-opacity-20 rounded-lg">
                <h4 className="font-bold mb-1">Usuários</h4>
                <p className="text-3xl font-bold">1,234</p>
              </div>

              <div className="p-4 border border-primary border-opacity-20 rounded-lg">
                <h4 className="font-bold mb-1">Receita</h4>
                <p className="text-3xl font-bold">$5,678</p>
              </div>

              <div className="p-4 border border-primary border-opacity-20 rounded-lg">
                <h4 className="font-bold mb-1">Conversões</h4>
                <p className="text-3xl font-bold">12.3%</p>
              </div>
            </div>

            <div className="p-4 border border-primary border-opacity-20 rounded-lg">
              <h4 className="font-bold mb-3">Atividade Recente</h4>

              <div className="space-y-3">
                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <span className="text-white text-xs">JS</span>
                  </div>
                  <div>
                    <p className="font-medium">John Smith</p>
                    <p className="text-sm opacity-70">Adicionou um novo documento</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                    style={{ backgroundColor: theme.secondaryColor }}
                  >
                    <span className="text-white text-xs">MD</span>
                  </div>
                  <div>
                    <p className="font-medium">Maria Doe</p>
                    <p className="text-sm opacity-70">Atualizou seu perfil</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
