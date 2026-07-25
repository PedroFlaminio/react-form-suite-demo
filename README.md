# Demo — React Form Builder

Aplicação de demonstração do pacote `react-form-builder`, criada com React, TypeScript e Vite.

A interface permite:

- montar e reordenar a estrutura de um formulário;
- preencher uma prévia interativa;
- validar campos obrigatórios com a API pública da biblioteca;
- exibir as respostas efetivamente enviadas;
- visualizar e copiar a definição atual em JSON;
- consultar em `/wiki` uma documentação completa com guia de uso, referência da API e exemplos copiáveis;
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

Esse comando compila a biblioteca e inicia a demo em modo de desenvolvimento. O endereço local será exibido pelo Vite no terminal.

## Executar somente a demo

Esta aplicação depende do pacote local localizado em `../packages/react-form-builder`. Com as dependências do workspace já instaladas:

```bash
cd demo
npm run dev
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/`. |
| `npm run check` | Executa a verificação de tipos do TypeScript. |

## Estrutura

```text
demo/
├── src/
│   ├── App.tsx       # Interface e estado da demonstração
│   ├── Wiki.tsx      # Documentação integrada da biblioteca
│   ├── demo.css      # Estilos e temas da página
│   └── main.tsx      # Ponto de entrada React
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Durante o desenvolvimento, o alias configurado no Vite aponta `react-form-builder` diretamente para o código-fonte do pacote local. Assim, alterações na biblioteca podem ser testadas imediatamente na demo.

## Gerar a versão de produção

Na pasta da demo:

```bash
npm run build
```

Os arquivos gerados ficam em `dist/`.
