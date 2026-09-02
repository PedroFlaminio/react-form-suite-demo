import { useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import {
  FormAnswers,
  FormBuilder,
  FormBuilderLocaleProvider,
  FormRenderer,
  validateForm,
  type FormAnswer,
  type FormError,
  type FormField,
} from "react-form-suite"
import { Wiki } from "./Wiki"
import {
  DemoLocaleProvider,
  getDemoMessages,
  type DemoMessages,
  type DemoLocale,
} from "./i18n"
import { withBase } from "./routing"

function getInitialFields(locale: DemoLocale): FormField[] {
  const text = getDemoMessages(locale).initialFields
  return [
  {
    id: "nome",
    order: 1,
    type: "text",
    label: text.name,
    placeholder: text.namePlaceholder,
    description: text.nameHelp,
    maxlength: 100,
    required: true,
  },
  {
    id: "email",
    order: 2,
    type: "text",
    label: "E-mail",
    placeholder: "voce@exemplo.com",
    description: text.emailHelp,
    maxlength: 120,
    required: true,
    sensitive: true,
  },
  {
    id: "data",
    order: 3,
    type: "date",
    label: text.date,
  },
  {
    id: "quantidade",
    order: 4,
    type: "number",
    label: text.quantity,
    description: text.quantityHelp,
    placeholder: text.quantityPlaceholder,
    min: 1,
    max: 20,
  },
  {
    id: "categoria",
    order: 5,
    type: "select",
    label: text.category,
    placeholder: text.categoryPlaceholder,
    required: true,
    formularioCampoOpcao: [
      { order: 1, value: text.categories[0], selected: true },
      { order: 2, value: text.categories[1] },
      { order: 3, value: text.categories[2] },
    ],
  },
  {
    id: "contato",
    order: 6,
    type: "radio-group",
    label: text.contact,
    required: true,
    formularioCampoOpcao: [
      { order: 1, value: text.contacts[0], selected: true },
      { order: 2, value: text.contacts[1] },
      { order: 3, value: text.contacts[2] },
    ],
  },
  {
    id: "interesses",
    order: 7,
    type: "checkbox-group",
    label: text.interests,
    formularioCampoOpcao: [
      { order: 1, value: text.interestOptions[0] },
      { order: 2, value: text.interestOptions[1] },
      { order: 3, value: text.interestOptions[2] },
      { order: 4, value: text.interestOptions[3] },
    ],
  },
  {
    id: "postal-code",
    order: 8,
    type: "postal-code",
    label: text.postalCode,
    placeholder: text.postalCodePlaceholder,
  },
  {
    id: "observacoes",
    order: 9,
    type: "textarea",
    label: text.notes,
    placeholder: text.notesPlaceholder,
    maxlength: 500,
  },
  ]
}

type Tab = "builder" | "preview" | "answers"
type Theme = "light" | "dark"
type Page = "demo" | "wiki"
type JsonModalContent = {
  eyebrow: string
  title: string
  value: unknown
}

function DemoIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="demo-icon"
      width="24"
      height="24"
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

function CountryFlag({ locale }: { locale: DemoLocale }) {
  if (locale === "pt-BR") {
    return (
      <svg className="demo-flag" width="32" height="22" viewBox="0 0 32 22" aria-hidden="true">
        <rect width="32" height="22" fill="#229e45" />
        <path d="M16 3 29 11 16 19 3 11Z" fill="#ffdf38" />
        <circle cx="16" cy="11" r="5.2" fill="#2354a5" />
        <path
          d="M11.2 9.5c3.7-.7 7.5.1 9.7 2.1"
          fill="none"
          stroke="#fff"
          strokeWidth="1.1"
        />
      </svg>
    )
  }

  if (locale === "en-US") {
    return (
      <svg className="demo-flag" width="32" height="22" viewBox="0 0 32 22" aria-hidden="true">
        <rect width="32" height="22" fill="#fff" />
        {[0, 4, 8, 12, 16, 20].map((y) => (
          <rect width="32" height="2" y={y} fill="#d83a46" key={y} />
        ))}
        <rect width="14" height="12" fill="#24457f" />
        {[3, 7, 11].flatMap((x) =>
          [2.5, 6, 9.5].map((y) => (
            <circle cx={x} cy={y} r="0.65" fill="#fff" key={`${x}-${y}`} />
          )),
        )}
      </svg>
    )
  }

  if (locale === "es-ES") {
    return (
      <svg className="demo-flag" width="32" height="22" viewBox="0 0 32 22" aria-hidden="true">
        <rect width="32" height="22" fill="#f4c430" />
        <rect width="32" height="5.5" fill="#c92b36" />
        <rect width="32" height="5.5" y="16.5" fill="#c92b36" />
        <rect x="9" y="8" width="2.8" height="6" rx="0.5" fill="#b52b35" />
        <path d="M8.3 8h4.2M8.6 14h3.6" stroke="#b52b35" strokeWidth="0.8" />
      </svg>
    )
  }

  return (
    <svg className="demo-flag" width="32" height="22" viewBox="0 0 32 22" aria-hidden="true">
      <rect width="32" height="22" fill="#fff" />
      <rect width="10.67" height="22" fill="#224a9b" />
      <rect x="21.33" width="10.67" height="22" fill="#e43d4c" />
    </svg>
  )
}

function JsonModal({
  content,
  messages,
  onClose,
}: {
  content: JsonModalContent
  messages: DemoMessages
  onClose: () => void
}) {
  const json = JSON.stringify(content.value, null, 2)

  return (
    <div
      className="demo-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="demo-json-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-json-modal-title"
      >
        <div className="demo-json-modal__header">
          <div>
            <span className="demo-kicker">{content.eyebrow}</span>
            <h2 id="demo-json-modal-title">{content.title}</h2>
          </div>
          <div className="demo-json-modal__actions">
            <button
              className="demo-copy"
              type="button"
              onClick={() => void navigator.clipboard.writeText(json)}
            >
              {messages.copyJson}
            </button>
            <button
              className="demo-modal-close"
              type="button"
              onClick={onClose}
              aria-label={messages.closeModal}
              title={messages.closeModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
        <pre className="demo-code demo-json-modal__code">
          <code>{json}</code>
        </pre>
      </section>
    </div>
  )
}

function LanguageSelect({
  locale,
  messages,
  onChange,
}: {
  locale: DemoLocale
  messages: DemoMessages
  onChange: (locale: DemoLocale) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const options = [
    { value: "pt-BR", label: messages.portuguese },
    { value: "en-US", label: messages.english },
    { value: "es-ES", label: messages.spanish },
    { value: "fr-FR", label: messages.french },
  ] satisfies Array<{ value: DemoLocale; label: string }>
  const selected = options.find((option) => option.value === locale) ?? options[0]

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }

    document.addEventListener("mousedown", closeOnOutsideClick)
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick)
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [open])

  if (!selected) return null

  return (
    <div className="demo-language-select" ref={rootRef}>
      <button
        className="demo-language-select__trigger"
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${messages.language}: ${selected.label}`}
      >
        <span className="demo-language-select__flag" aria-hidden="true">
          <CountryFlag locale={selected.value} />
        </span>
        <span className="demo-language-select__value">
          <strong>{selected.label}</strong>
          <small>{selected.value}</small>
        </span>
        <svg
          className={`demo-language-select__chevron${open ? " open" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="m6 8 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="demo-language-select__menu"
          role="listbox"
          aria-label={messages.language}
        >
          <span className="demo-language-select__heading">
            {messages.language}
          </span>
          {options.map((option) => {
            const active = option.value === locale
            return (
              <button
                className={`demo-language-select__option${active ? " active" : ""}`}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                key={option.value}
              >
                <span className="demo-language-select__option-flag" aria-hidden="true">
                  <CountryFlag locale={option.value} />
                </span>
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.value}</small>
                </span>
                {active && (
                  <span className="demo-language-select__check" aria-hidden="true">
                    <CheckIcon />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light"
  const savedTheme = window.localStorage.getItem("rfs-demo-theme")
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function getInitialPage(): Page {
  if (typeof window === "undefined") return "demo"
  return /(^|\/)wiki(?:\/|$)/.test(window.location.pathname) ? "wiki" : "demo"
}

function getInitialLocale(): DemoLocale {
  if (typeof window === "undefined") return "pt-BR"
  const savedLocale = window.localStorage.getItem("rfs-demo-locale")
  if (
    savedLocale === "pt-BR" ||
    savedLocale === "en-US" ||
    savedLocale === "es-ES" ||
    savedLocale === "fr-FR"
  ) {
    return savedLocale
  }
  if (window.navigator.language.toLowerCase().startsWith("es")) return "es-ES"
  if (window.navigator.language.toLowerCase().startsWith("fr")) return "fr-FR"
  return window.navigator.language.toLowerCase().startsWith("en")
    ? "en-US"
    : "pt-BR"
}

export function App() {
  const [locale, setLocale] = useState<DemoLocale>(getInitialLocale)
  const t = getDemoMessages(locale)
  const [page, setPage] = useState<Page>(getInitialPage)
  const [tab, setTab] = useState<Tab>("builder")
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [fields, setFields] = useState<FormField[]>(() => getInitialFields(locale))
  const [answers, setAnswers] = useState<FormAnswer[]>([])
  const [errors, setErrors] = useState<FormError[]>([])
  const [submitted, setSubmitted] = useState<FormAnswer[] | null>(null)
  const [jsonModal, setJsonModal] = useState<JsonModalContent | null>(null)

  const showTab = (nextTab: Tab) => {
    setTab(nextTab)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem("rfs-demo-theme", theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem("rfs-demo-locale", locale)
  }, [locale])

  useEffect(() => {
    const updatePage = () => setPage(getInitialPage())
    window.addEventListener("popstate", updatePage)
    return () => window.removeEventListener("popstate", updatePage)
  }, [])

  useEffect(() => {
    if (!jsonModal) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setJsonModal(null)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", closeOnEscape)
    }
  }, [jsonModal])

  const navigateTo = (nextPage: Page) => {
    const nextPath = nextPage === "wiki" ? withBase("/wiki") : withBase("/")
    window.history.pushState({}, "", nextPath)
    setPage(nextPage)
    window.scrollTo({ top: 0 })
  }

  const changeLocale = (nextLocale: DemoLocale) => {
    if (nextLocale === locale) return
    setLocale(nextLocale)
    setFields(getInitialFields(nextLocale))
    setAnswers([])
    setErrors([])
    setSubmitted(null)
    setJsonModal(null)
  }

  const languageControl = (
    <LanguageSelect locale={locale} messages={t} onChange={changeLocale} />
  )

  if (page === "wiki") {
    return (
      <FormBuilderLocaleProvider locale={locale}>
      <DemoLocaleProvider locale={locale}>
      <div className="demo-shell demo-shell--wiki">
        <header className="wiki-page-header">
          <button className="wiki-brand" type="button" onClick={() => navigateTo("demo")}>
            <span className="wiki-brand__mark">RFS</span>
            <span>
              <strong>react-form-suite</strong>
              <small>{t.docsSubtitle}</small>
            </span>
          </button>
          <div className="demo-header-actions">
            <button className="wiki-back" type="button" onClick={() => navigateTo("demo")}>
              {t.backToDemo}
            </button>
            {languageControl}
            <button
              className="demo-theme-toggle"
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              aria-label={t.enableTheme(theme === "light" ? t.dark : t.light)}
              title={t.enableTheme(theme === "light" ? t.dark : t.light)}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
              {theme === "light" ? t.darkLabel : t.lightLabel}
            </button>
          </div>
        </header>

        <main className="wiki-page-content">
          <Wiki />
        </main>

        <footer className="demo-footer">
          <span>react-form-suite</span>
          <span>{t.footer}</span>
        </footer>
      </div>
      </DemoLocaleProvider>
      </FormBuilderLocaleProvider>
    )
  }

  return (
    <FormBuilderLocaleProvider locale={locale}>
    <DemoLocaleProvider locale={locale}>
    <div className="demo-shell">
      <header>
        <span className="demo-eyebrow">{t.eyebrow}</span>

        <div className="demo-header">
          <div>
            <h1 className="demo-title">{t.title}</h1>
            <p>{t.intro}</p>{" "}
          </div>
          <div className="demo-header-actions">
            <button className="demo-docs-link" type="button" onClick={() => navigateTo("wiki")}>
              {t.docs}
            </button>
            {languageControl}
            <button
              className="demo-theme-toggle"
              type="button"
              onClick={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
              aria-label={t.enableTheme(theme === "light" ? t.dark : t.light)}
              title={t.enableTheme(theme === "light" ? t.dark : t.light)}
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
              {theme === "light" ? t.darkLabel : t.lightLabel}
            </button>
          </div>
        </div>
      </header>

      <nav className="demo-tabs" aria-label={t.demosAria}>
        <button className={tab === "builder" ? "active" : ""} type="button" onClick={() => showTab("builder")}>
          <span>01</span> {t.builderTab}
        </button>
        <button className={tab === "preview" ? "active" : ""} type="button" onClick={() => showTab("preview")}>
          <span>02</span> {t.formTab}
        </button>
        <button className={tab === "answers" ? "active" : ""} type="button" onClick={() => showTab("answers")}>
          <span>03</span> {t.answersTab}
        </button>
      </nav>

      <main className="demo-content">
        {tab === "builder" && (
          <section>
            <div className="demo-section-heading">
              <div>
                <span className="demo-kicker">{t.structure}</span>
                <h2>{t.buildForm}</h2>
              </div>
              <div className="demo-section-heading__actions">
                <span>{t.fields(fields.length)}</span>
                <button
                  className="demo-copy"
                  type="button"
                  onClick={() =>
                    setJsonModal({
                      eyebrow: t.portableContract,
                      title: t.jsonDefinition,
                      value: fields,
                    })
                  }
                >
                  {t.viewJson}
                </button>
              </div>
            </div>
            <FormBuilder fields={fields} onChange={setFields} />
          </section>
        )}

        {tab === "preview" && (
          <section className="demo-preview-layout">
            <div className="demo-preview-copy">
              <span className="demo-kicker">FormRenderer</span>
              <h2>{t.interactivePreview}</h2>
              <p>{t.previewIntro}</p>
              <dl>
                <div>
                  <dt>{fields.length}</dt>
                  <dd>{t.fields(fields.length).replace(String(fields.length), "").trim()}</dd>
                </div>
                <div>
                  <dt>{answers.length}</dt>
                  <dd>{t.answers(answers.length).replace(String(answers.length), "").trim()}</dd>
                </div>
              </dl>
            </div>
            <div className="demo-form-card">
              <div className="demo-form-card__header">
                <span>{t.newRequest}</span>
                <small>{t.localData}</small>
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
                  const nextErrors = validateForm(nextAnswers, fields, false, locale)
                  setErrors(nextErrors)
                  if (nextErrors.length === 0) {
                    setSubmitted(nextAnswers)
                    setTab("answers")
                  } else {
                    setSubmitted(null)
                  }
                }}
                submitLabel={t.submitDemo}
              />
              {submitted && (
                <div className="demo-success" role="status">
                  <CheckIcon />
                  <span>{t.validForm(submitted.length)}</span>
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
                <h2>{t.submittedAnswers}</h2>
              </div>
              <div className="demo-section-heading__actions">
                <span>{t.answers(submitted?.length ?? 0)}</span>
                <button
                  className="demo-copy"
                  type="button"
                  onClick={() =>
                    setJsonModal({
                      eyebrow: "FormAnswers",
                      title: t.answersJson,
                      value: submitted ?? [],
                    })
                  }
                >
                  {t.viewJson}
                </button>
              </div>
            </div>
            <p className="demo-answers-intro">
              {t.answersIntro}
            </p>
            <div className="demo-answers-card">
              <FormAnswers
                answers={submitted ?? []}
                emptyMessage={t.emptyAnswers}
              />
            </div>
            <button className="demo-copy" type="button" onClick={() => showTab("preview")}>
              {submitted ? t.editAnswers : t.goToForm}
            </button>
          </section>
        )}

      </main>

      {jsonModal && (
        <JsonModal
          content={jsonModal}
          messages={t}
          onClose={() => setJsonModal(null)}
        />
      )}

      <footer className="demo-footer">
        <span>react-form-suite</span>
        <span>{t.footer}</span>
      </footer>
    </div>
    </DemoLocaleProvider>
    </FormBuilderLocaleProvider>
  )
}
