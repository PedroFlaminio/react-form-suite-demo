import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import {
  FormBuilder,
  FormRenderer,
  validateForm,
  type FormAnswer,
  type FormError,
  type FormField,
} from "react-form-builder"

const initialFields: FormField[] = [
  {
    id: "nome",
    order: 1,
    type: "text",
    label: "Como podemos chamar você?",
    placeholder: "Digite seu nome",
    description: "Use o nome pelo qual você prefere ser chamado.",
    maxlength: 80,
    required: true,
  },
  {
    id: "documento",
    order: 2,
    type: "cpf",
    label: "CPF",
    placeholder: "000.000.000-00",
    sensitive: true,
  },
  {
    id: "assunto",
    order: 3,
    type: "select",
    label: "Assunto",
    placeholder: "Escolha uma opção",
    required: true,
    formularioCampoOpcao: [
      { order: 1, value: "Iluminação pública", selected: true },
      { order: 2, value: "Limpeza urbana" },
      { order: 3, value: "Trânsito" },
    ],
  },
  {
    id: "detalhes",
    order: 4,
    type: "textarea",
    label: "Conte o que aconteceu",
    placeholder: "Descreva sua solicitação...",
    maxlength: 500,
    required: true,
  },
]

type Tab = "builder" | "preview" | "json"
type Theme = "light" | "dark"

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

export function App() {
  const [tab, setTab] = useState<Tab>("builder")
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [fields, setFields] = useState<FormField[]>(initialFields)
  const [answers, setAnswers] = useState<FormAnswer[]>([])
  const [errors, setErrors] = useState<FormError[]>([])
  const [submitted, setSubmitted] = useState<FormAnswer[] | null>(null)

  const showTab = (nextTab: Tab) => {
    setTab(nextTab)
    setSubmitted(null)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("rfb-demo-theme", theme)
  }, [theme])

  return (
    <div className="demo-shell">
      <header>
        <div>
          <span className="demo-eyebrow">Pacote React + TypeScript</span>
          <h1 className="demo-title">Formulários que começam simples.</h1>
        </div>
        <div className="demo-header">
          <p>
            Construa a estrutura, teste o preenchimento e veja o JSON — tudo usando somente a API pública do componente.
          </p>
          <div className="demo-header-actions">
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
        <button className={tab === "json" ? "active" : ""} type="button" onClick={() => showTab("json")}>
          <span>03</span> JSON
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
                  setSubmitted(nextErrors.length === 0 ? nextAnswers : null)
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
