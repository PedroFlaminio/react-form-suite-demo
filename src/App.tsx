import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import {
  FormAnswers,
  FormBuilder,
  FormRenderer,
  validateForm,
  type FormAnswer,
  type FormError,
  type FormField,
} from "react-form-builder"
import { Wiki } from "./Wiki"

const initialFields: FormField[] = [
  {
    id: "nome",
    order: 1,
    type: "text",
    label: "Nome completo",
    placeholder: "Digite seu nome completo",
    description: "Informe como você gostaria de ser identificado.",
    maxlength: 100,
    required: true,
  },
  {
    id: "email",
    order: 2,
    type: "text",
    label: "E-mail",
    placeholder: "voce@exemplo.com",
    description: "Usaremos este endereço apenas para entrar em contato.",
    maxlength: 120,
    required: true,
    sensitive: true,
  },
  {
    id: "data",
    order: 3,
    type: "date",
    label: "Data de referência",
  },
  {
    id: "quantidade",
    order: 4,
    type: "number",
    label: "Quantidade",
    description: "Escolha um valor entre 1 e 20.",
    placeholder: "Digite uma quantidade",
    min: 1,
    max: 20,
  },
  {
    id: "categoria",
    order: 5,
    type: "select",
    label: "Categoria",
    placeholder: "Selecione uma categoria",
    required: true,
    formularioCampoOpcao: [
      { order: 1, value: "Geral", selected: true },
      { order: 2, value: "Pessoal" },
      { order: 3, value: "Profissional" },
    ],
  },
  {
    id: "contato",
    order: 6,
    type: "radio-group",
    label: "Preferência de contato",
    required: true,
    formularioCampoOpcao: [
      { order: 1, value: "E-mail", selected: true },
      { order: 2, value: "Telefone" },
      { order: 3, value: "Sem preferência" },
    ],
  },
  {
    id: "interesses",
    order: 7,
    type: "checkbox-group",
    label: "Áreas de interesse",
    formularioCampoOpcao: [
      { order: 1, value: "Tecnologia" },
      { order: 2, value: "Design" },
      { order: 3, value: "Negócios" },
      { order: 4, value: "Educação" },
    ],
  },
  {
    id: "observacoes",
    order: 8,
    type: "textarea",
    label: "Observações",
    placeholder: "Adicione outras informações que considerar relevantes...",
    maxlength: 500,
  },
]

type Tab = "builder" | "preview" | "answers" | "json"
type Theme = "light" | "dark"
type Page = "demo" | "wiki"

function DemoIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="demo-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

function MoonIcon() {
  return (
    <DemoIcon>
      <path d="M20.9 13.1A8.4 8.4 0 1 1 10.9 3a6.5 6.5 0 0 0 10 10.1Z" />
    </DemoIcon>
  )
}

function SunIcon() {
  return (
    <DemoIcon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.42 1.42" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.35 17.66-1.42 1.41" />
      <path d="m19.07 4.93-1.41 1.42" />
    </DemoIcon>
  )
}

function CheckIcon() {
  return (
    <DemoIcon>
      <path d="m5 12 4 4L19 6" />
    </DemoIcon>
  )
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  const savedTheme = window.localStorage.getItem("rfb-demo-theme")
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getInitialPage(): Page {
  if (typeof window === "undefined") return "demo"
  return /(^|\/)wiki(?:\/|$)/.test(window.location.pathname) ? "wiki" : "demo"
}

export function App() {
  const [page, setPage] = useState<Page>(getInitialPage)
  const [tab, setTab] = useState<Tab>("builder")
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [fields, setFields] = useState<FormField[]>(initialFields)
  const [answers, setAnswers] = useState<FormAnswer[]>([])
  const [errors, setErrors] = useState<FormError[]>([])
  const [submitted, setSubmitted] = useState<FormAnswer[] | null>(null)

  const showTab = (nextTab: Tab) => {
    setTab(nextTab)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("rfb-demo-theme", theme)
  }, [theme])

  useEffect(() => {
    const updatePage = () => setPage(getInitialPage())
    window.addEventListener("popstate", updatePage)
    return () => window.removeEventListener("popstate", updatePage)
  }, [])

  const navigateTo = (nextPage: Page) => {
    const nextPath = nextPage === "wiki" ? "/wiki" : "/"
    window.history.pushState({}, "", nextPath)
    setPage(nextPage)
    window.scrollTo({ top: 0 })
  }

  if (page === "wiki") {
    return (
      <div className="demo-shell demo-shell--wiki">
        <header className="wiki-page-header">
          <button className="wiki-brand" type="button" onClick={() => navigateTo("demo")}>
            <span className="wiki-brand__mark">RFB</span>
            <span>
              <strong>react-form-builder</strong>
              <small>Documentação</small>
            </span>
          </button>
          <div className="demo-header-actions">
            <button className="wiki-back" type="button" onClick={() => navigateTo("demo")}>
              ← Voltar para a demo
            </button>
            <button
              className="demo-theme-toggle"
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              aria-label={`Ativar tema ${theme === "light" ? "escuro" : "claro"}`}
              title={`Ativar tema ${theme === "light" ? "escuro" : "claro"}`}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
              {theme === "light" ? "Escuro" : "Claro"}
            </button>
          </div>
        </header>

        <main className="wiki-page-content">
          <Wiki />
        </main>

        <footer className="demo-footer">
          <span>react-form-builder</span>
          <span>TypeScript · ESM · CSS isolado</span>
        </footer>
      </div>
    )
  }

  return (
    <div className="demo-shell">
      <header>
        <span className="demo-eyebrow">Pacote React + TypeScript</span>

        <div className="demo-header">
          <div>
            <h1 className="demo-title">Formulários que começam simples.</h1>
            <p>
              Construa a estrutura, teste o preenchimento, confira as respostas e veja o JSON — tudo usando somente a
              API pública dos componentes.
            </p>{" "}
          </div>
          <div className="demo-header-actions">
            <button className="demo-docs-link" type="button" onClick={() => navigateTo("wiki")}>
              Documentação
            </button>
            <button
              className="demo-theme-toggle"
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              aria-label={`Ativar tema ${theme === "light" ? "escuro" : "claro"}`}
              title={`Ativar tema ${theme === "light" ? "escuro" : "claro"}`}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
              {theme === "light" ? "Escuro" : "Claro"}
            </button>
            <div className="demo-badge">
              <span>runtime</span>
              <strong>React only</strong>
            </div>
          </div>
        </div>
      </header>

      <nav className="demo-tabs" aria-label="Demonstrações">
        <button className={tab === "builder" ? "active" : ""} type="button" onClick={() => showTab("builder")}>
          <span>01</span> Construtor
        </button>
        <button className={tab === "preview" ? "active" : ""} type="button" onClick={() => showTab("preview")}>
          <span>02</span> Formulário
        </button>
        <button className={tab === "answers" ? "active" : ""} type="button" onClick={() => showTab("answers")}>
          <span>03</span> Respostas
        </button>
        <button className={tab === "json" ? "active" : ""} type="button" onClick={() => showTab("json")}>
          <span>04</span> JSON
        </button>
      </nav>

      <main className="demo-content">
        {tab === "builder" && (
          <section>
            <div className="demo-section-heading">
              <div>
                <span className="demo-kicker">Estrutura</span>
                <h2>Monte seu formulário</h2>
              </div>
              <span>{fields.length} campos</span>
            </div>
            <FormBuilder fields={fields} onChange={setFields} />
          </section>
        )}

        {tab === "preview" && (
          <section className="demo-preview-layout">
            <div className="demo-preview-copy">
              <span className="demo-kicker">FormRenderer</span>
              <h2>Prévia interativa</h2>
              <p>
                Os valores são controlados pelo projeto de demonstração. Campos obrigatórios usam a validação exportada
                pela biblioteca.
              </p>
              <dl>
                <div>
                  <dt>{fields.length}</dt>
                  <dd>campos</dd>
                </div>
                <div>
                  <dt>{answers.length}</dt>
                  <dd>respostas</dd>
                </div>
              </dl>
            </div>
            <div className="demo-form-card">
              <div className="demo-form-card__header">
                <span>Nova solicitação</span>
                <small>Todos os dados ficam neste navegador</small>
              </div>
              <FormRenderer
                fields={fields}
                value={answers}
                onChange={(nextAnswers) => {
                  setAnswers(nextAnswers)
                  setErrors([])
                  setSubmitted(null)
                }}
                errors={errors}
                noValidate
                onSubmit={(nextAnswers) => {
                  const nextErrors = validateForm(nextAnswers, fields)
                  setErrors(nextErrors)
                  if (nextErrors.length === 0) {
                    setSubmitted(nextAnswers)
                    setTab("answers")
                  } else {
                    setSubmitted(null)
                  }
                }}
                submitLabel="Enviar demonstração"
              />
              {submitted && (
                <div className="demo-success" role="status">
                  <CheckIcon />
                  <span>Formulário válido. {submitted.length} resposta(s) prontas para envio.</span>
                </div>
              )}
            </div>
          </section>
        )}

        {tab === "answers" && (
          <section className="demo-answers-layout">
            <div className="demo-section-heading">
              <div>
                <span className="demo-kicker">FormAnswers</span>
                <h2>Respostas enviadas</h2>
              </div>
              <span>{submitted?.length ?? 0} respostas</span>
            </div>
            <p className="demo-answers-intro">
              Este componente recebe diretamente o array produzido pelo <code>FormRenderer</code> e agrupa respostas
              múltiplas por campo.
            </p>
            <div className="demo-answers-card">
              <FormAnswers
                answers={submitted ?? []}
                emptyMessage="Preencha e envie o formulário na etapa anterior para exibir as respostas aqui."
              />
            </div>
            <button className="demo-copy" type="button" onClick={() => showTab("preview")}>
              {submitted ? "Editar respostas" : "Ir para o formulário"}
            </button>
          </section>
        )}

        {tab === "json" && (
          <section>
            <div className="demo-section-heading">
              <div>
                <span className="demo-kicker">Contrato portátil</span>
                <h2>Definição em JSON</h2>
              </div>
              <button
                className="demo-copy"
                type="button"
                onClick={() => void navigator.clipboard.writeText(JSON.stringify(fields, null, 2))}
              >
                Copiar JSON
              </button>
            </div>
            <pre className="demo-code">
              <code>{JSON.stringify(fields, null, 2)}</code>
            </pre>
          </section>
        )}
      </main>

      <footer className="demo-footer">
        <span>react-form-builder</span>
        <span>TypeScript · ESM · CSS isolado</span>
      </footer>
    </div>
  )
}
