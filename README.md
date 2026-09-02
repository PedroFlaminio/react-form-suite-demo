# Demo — React Form Suite

Aplicação de demonstração do pacote `react-form-suite`, criada com React, TypeScript e Vite.

A interface permite:

- montar e reordenar a estrutura de um formulário;
- preencher uma prévia interativa;
- validar campos obrigatórios com a API pública da biblioteca;
- exibir as respostas efetivamente enviadas;
- visualizar e copiar a definição atual em JSON;
- consultar em `/wiki` uma documentação completa com guia de uso e páginas individuais para `FormBuilder`,
  `FormRenderer` e `FormAnswers`;
- alternar entre os temas claro e escuro.

## Pré-requisitos

- Node.js 20.19 ou superior, ou Node.js 22.12 ou superior;
- npm com suporte a workspaces.

## Executar pelo workspace

Na raiz do repositório:

```bash
npm install
npm run dev
```

Esse comando inicia a demo em modo de desenvolvimento com um alias para o
código-fonte da biblioteca. Alterações em TypeScript e CSS são refletidas por
hot reload. O endereço local será exibido pelo Vite no terminal.

## Executar somente a demo

Com as dependências instaladas:

```bash
cd demo
npm run dev
```

Para testar exatamente a versão publicada no npm:

```bash
npm run dev:package
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Usa a fonte local da biblioteca com hot reload. |
| `npm run dev:package` | Usa a versão instalada do npm. |
| `npm run build` | Valida a API publicada e gera a versão de produção em `dist/`. |
| `npm run check` | Verifica tipos contra a fonte local. |
| `npm run check:package` | Verifica tipos contra o pacote instalado. |

## Estrutura

```text
demo/
├── src/
│   ├── App.tsx       # Interface e estado da demonstração
│   ├── Wiki.tsx      # Documentação integrada da biblioteca
│   ├── demo.css      # Estilos e temas da página
│   ├── routing.ts    # Rotas compatíveis com o caminho base do Pages
│   └── main.tsx      # Ponto de entrada React
├── index.html
├── package.json
├── tsconfig.build.json
├── tsconfig.json
└── vite.config.ts
```

No modo `workspace`, o alias do Vite aponta `react-form-suite` diretamente para o
código-fonte do pacote irmão. Nos demais modos, a importação é resolvida pela
dependência publicada no npm.

## Gerar a versão de produção

Na pasta da demo:

```bash
npm run build
```

Os arquivos gerados ficam em `dist/` e usam `/react-form-suite-demo/` como base
para publicação no GitHub Pages.
