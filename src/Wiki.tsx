import { useEffect, useState } from "react"
import type { MouseEvent, ReactNode } from "react"

const installCode = `npm install react-form-builder`

const builderCode = `import { useState } from "react"
import { FormBuilder, type FormField } from "react-form-builder"

export function EditorDeFormulario() {
  const [fields, setFields] = useState<FormField[]>([])

  return (
    <FormBuilder
      fields={fields}
      onChange={setFields}
      aria-label="Editor do formulário"
    />
  )
}`

const rendererCode = `import { useState } from "react"
import {
  FormRenderer,
  validateForm,
  type FormAnswer,
  type FormError,
  type FormField,
} from "react-form-builder"

export function MeuFormulario({ fields }: { fields: FormField[] }) {
  const [answers, setAnswers] = useState<FormAnswer[]>([])
  const [errors, setErrors] = useState<FormError[]>([])

  return (
    <FormRenderer
      fields={fields}
      value={answers}
      onChange={setAnswers}
      errors={errors}
      noValidate
      submitLabel="Enviar"
      onSubmit={(nextAnswers) => {
        const nextErrors = validateForm(nextAnswers, fields)
        setErrors(nextErrors)

        if (nextErrors.length === 0) {
          // Envie nextAnswers para a sua API
        }
      }}
    />
  )
}`

const answersCode = `import { FormAnswers, type FormAnswer } from "react-form-builder"

export function Resumo({ answers }: { answers: FormAnswer[] }) {
  return (
    <FormAnswers
      answers={answers}
      emptyMessage="Nenhuma resposta enviada."
    />
  )
}`

const fieldCode = `const fields: FormField[] = [
  {
    id: "email",
    order: 1,
    type: "text",
    label: "E-mail",
    description: "Usaremos apenas para entrar em contato.",
    placeholder: "voce@exemplo.com",
    required: true,
    sensitive: true,
    maxlength: 120,
  },
  {
    id: "assunto",
    order: 2,
    type: "select",
    label: "Assunto",
    formularioCampoOpcao: [
      { order: 1, value: "Suporte", selected: true },
      { order: 2, value: "Comercial" },
    ],
  },
]`

const uncontrolledCode = `<FormBuilder
  defaultFields={camposIniciais}
  onChange={(fields) => console.log(fields)}
/>

<FormRenderer
  fields={fields}
  defaultValue={respostasIniciais}
  onChange={(answers) => console.log(answers)}
/>`

const builderTypesCode = `<FormBuilder
  fields={fields}
  onChange={setFields}
  allowedTypes={["text", "textarea", "select"]}
  currencyPrefix="R$"
  phonePrefix="+55"
/>`

const rendererModesCode = `// Somente leitura: mostra os valores e remove o botão de envio
<FormRenderer fields={fields} value={answers} readOnly />

// Desabilitado: mantém o formulário visível, sem interação
<FormRenderer fields={fields} value={answers} disabled />

// Anônimo: remove campos marcados como sensitive
<FormRenderer fields={fields} anonymous />`

const anonymousCode = `const errors = validateForm(answers, fields, true)

<FormRenderer
  fields={fields}
  anonymous
  errors={errors}
  onSubmit={handleSubmit}
/>`

const themeCode = `.formulario-da-marca {
  --rfb-primary: #6d28d9;
  --rfb-primary-dark: #5b21b6;
  --rfb-primary-soft: #f3e8ff;
  --rfb-danger: #b91c1c;
  --rfb-border: #ddd6fe;
  --rfb-text: #1f2937;
  --rfb-surface: #ffffff;
  --rfb-canvas: #fafafa;
  --rfb-radius: 8px;
}`

const themeUsageCode = `<FormRenderer
  className="formulario-da-marca"
  fields={fields}
/>`

const answerShapeCode = `type FormAnswer = {
  id?: string | number
  fieldId?: string | number
  order?: number
  label: string
  value: string
  type?: FieldType | string
  prefix?: string
  sensitive?: boolean
}`

const answersFormattingCode = `const answers: FormAnswer[] = [
  {
    fieldId: "data",
    order: 1,
    label: "Data da visita",
    value: "2026-07-25",
    type: "date",
  },
  {
    fieldId: "interesses",
    order: 2,
    label: "Interesses",
    value: "Tecnologia",
    type: "checkbox-group",
  },
  {
    fieldId: "interesses",
    order: 2,
    label: "Interesses",
    value: "Design",
    type: "checkbox-group",
  },
]`

const fieldTypes = [
  ["text", "Texto em uma linha", "minlength, maxlength, defaultValue"],
  ["number", "Número", "min, max"],
  ["currency", "Valor monetário com máscara", "prefix (padrão: R$)"],
  ["phone", "Telefone com máscara brasileira", "prefix (padrão: +55)"],
  ["date", "Data", "—"],
  ["cpf", "CPF com máscara", "—"],
  ["cnpj", "CNPJ com máscara", "—"],
  ["cep", "CEP com máscara", "—"],
  ["textarea", "Texto em várias linhas", "minlength, maxlength"],
  ["select", "Lista de seleção única", "formularioCampoOpcao"],
  ["radio-group", "Grupo de escolha única", "formularioCampoOpcao"],
  ["checkbox-group", "Grupo de múltipla escolha", "formularioCampoOpcao"],
]

const builderProps = [
  ["fields", "FormField[]", "Campos no modo controlado."],
  ["defaultFields", "FormField[]", "Campos iniciais no modo não controlado."],
  ["onChange", "(fields) => void", "Executado após cada alteração."],
  ["allowedTypes", "readonly FieldType[]", "Restringe os tipos disponíveis na paleta."],
  ["currencyPrefix", "string", "Prefixo inicial de campos monetários. Padrão: R$."],
  ["phonePrefix", "string", "Prefixo inicial de telefones. Padrão: +55."],
  ["disabled", "boolean", "Bloqueia as alterações no construtor."],
  ["emptyMessage", "ReactNode", "Conteúdo exibido quando não há campos."],
  ["className / style", "string / CSSProperties", "Personaliza o elemento raiz."],
  ["aria-label", "string", "Nome acessível do construtor."],
]

const rendererProps = [
  ["fields", "FormField[]", "Definição dos campos do formulário."],
  ["value", "FormAnswer[]", "Respostas no modo controlado."],
  ["defaultValue", "FormAnswer[]", "Respostas iniciais no modo não controlado."],
  ["onChange", "(answers) => void", "Executado sempre que uma resposta muda."],
  ["onSubmit", "(answers, event) => void", "Executado no envio do formulário."],
  ["errors", "FormError[]", "Erros exibidos no resumo e junto aos campos."],
  ["anonymous", "boolean", "Oculta campos marcados como sensíveis."],
  ["disabled / readOnly", "boolean", "Desabilita ou torna o formulário somente leitura."],
  ["submitLabel", "ReactNode", "Conteúdo do botão de envio."],
  ["hideSubmit", "boolean", "Oculta o botão de envio."],
  ["noValidate", "boolean", "Define o atributo HTML noValidate."],
  ["className / style", "string / CSSProperties", "Personaliza o formulário."],
  ["aria-label", "string", "Nome acessível do formulário."],
]

const answerProps = [
  ["answers", "readonly FormAnswer[]", "Respostas produzidas pelo renderizador."],
  ["emptyMessage", "ReactNode", "Conteúdo exibido quando não há respostas."],
  ["className / style", "string / CSSProperties", "Personaliza o elemento raiz."],
  ["aria-label", "string", "Nome acessível da seção."],
]

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="wiki-code">
      <div className="wiki-code__bar">
        <span>{language}</span>
        <button type="button" onClick={() => void copy()}>
          {copied ? "Copiado!" : "Copiar"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}

function PropsTable({ rows }: { rows: string[][] }) {
  return (
    <div className="wiki-table-wrap">
      <table className="wiki-table">
        <thead>
          <tr>
            <th>Propriedade</th>
            <th>Tipo</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, type, description]) => (
            <tr key={name}>
              <td>
                <code>{name}</code>
              </td>
              <td>
                <code>{type}</code>
              </td>
              <td>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

type WikiRoute = "overview" | "form-builder" | "form-renderer" | "form-answers"

function getWikiRoute(): WikiRoute {
  if (typeof window === "undefined") return "overview"
  const path = window.location.pathname.replace(/\/+$/, "")
  if (path.endsWith("/wiki/form-builder")) return "form-builder"
  if (path.endsWith("/wiki/form-renderer")) return "form-renderer"
  if (path.endsWith("/wiki/form-answers")) return "form-answers"
  return "overview"
}

function WikiLink({
  to,
  onNavigate,
  className,
  children,
}: {
  to: WikiRoute
  onNavigate: (route: WikiRoute) => void
  className?: string
  children: ReactNode
}) {
  const path = to === "overview" ? "/wiki" : `/wiki/${to}`

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate(to)
  }

  return (
    <a className={className} href={path} onClick={handleClick}>
      {children}
    </a>
  )
}

const componentPages = {
  "form-builder": {
    name: "FormBuilder",
    eyebrow: "Editor visual",
    description:
      "Cria e edita a definição do formulário. O usuário pode adicionar campos pela paleta, reordenar, duplicar e configurar cada item.",
    code: builderCode,
    props: builderProps,
  },
  "form-renderer": {
    name: "FormRenderer",
    eyebrow: "Preenchimento",
    description:
      "Transforma uma definição FormField[] em um formulário acessível e produz as respostas em um array FormAnswer[].",
    code: rendererCode,
    props: rendererProps,
  },
  "form-answers": {
    name: "FormAnswers",
    eyebrow: "Apresentação",
    description:
      "Apresenta as respostas enviadas, com formatação por tipo, agrupamento de múltiplas escolhas e proteção de valores sensíveis.",
    code: answersCode,
    props: answerProps,
  },
} as const

function ComponentPage({
  route,
  onNavigate,
}: {
  route: Exclude<WikiRoute, "overview">
  onNavigate: (route: WikiRoute) => void
}) {
  const page = componentPages[route]

  return (
    <section className="wiki wiki-component-page">
      <div className="wiki-component-hero" id="inicio">
        <div className="wiki-breadcrumb">
          <WikiLink to="overview" onNavigate={onNavigate}>
            Documentação
          </WikiLink>
          <span>/</span>
          <span>Componentes</span>
        </div>
        <span className="demo-kicker">{page.eyebrow}</span>
        <h2>{page.name}</h2>
        <p>{page.description}</p>
      </div>

      <div className="wiki-layout wiki-component-layout">
        <aside className="wiki-sidebar">
          <strong>Componentes</strong>
          <nav aria-label="Documentação dos componentes">
            <WikiLink to="overview" onNavigate={onNavigate}>
              Visão geral
            </WikiLink>
            <WikiLink
              className={route === "form-builder" ? "active" : ""}
              to="form-builder"
              onNavigate={onNavigate}
            >
              FormBuilder
            </WikiLink>
            <WikiLink
              className={route === "form-renderer" ? "active" : ""}
              to="form-renderer"
              onNavigate={onNavigate}
            >
              FormRenderer
            </WikiLink>
            <WikiLink
              className={route === "form-answers" ? "active" : ""}
              to="form-answers"
              onNavigate={onNavigate}
            >
              FormAnswers
            </WikiLink>
          </nav>
        </aside>

        <article className="wiki-content">
          <section className="wiki-section">
            <span className="wiki-section__number">01</span>
            <h3>Uso</h3>
            <p>
              Importe o componente e os tipos diretamente de <code>react-form-builder</code>. O CSS já acompanha o
              entrypoint principal.
            </p>
            <CodeBlock code={page.code} />
          </section>

          {route === "form-builder" && (
            <section className="wiki-section">
              <span className="wiki-section__number">02</span>
              <h3>Configuração do construtor</h3>
              <p>
                No modo controlado, <code>fields</code> é a fonte de verdade. Use <code>allowedTypes</code> para
                apresentar somente os tipos aceitos pelo seu produto.
              </p>
              <CodeBlock code={builderTypesCode} />
              <div className="wiki-grid">
                <div className="wiki-card">
                  <strong>Adicionar</strong>
                  <p>Arraste um tipo da paleta ou use duplo clique para inseri-lo no final.</p>
                </div>
                <div className="wiki-card">
                  <strong>Editar</strong>
                  <p>Rótulo, descrição, obrigatoriedade, sensibilidade e limites ficam no editor do campo.</p>
                </div>
                <div className="wiki-card">
                  <strong>Ordenar</strong>
                  <p>Arraste os cartões ou use os controles de movimento. A ordem é normalizada automaticamente.</p>
                </div>
              </div>
            </section>
          )}

          {route === "form-renderer" && (
            <section className="wiki-section">
              <span className="wiki-section__number">02</span>
              <h3>Modos de exibição</h3>
              <p>
                O mesmo componente cobre preenchimento, consulta e fluxos anônimos. Os aliases <code>anonimo</code> e{" "}
                <code>formErrors</code> existem apenas para compatibilidade.
              </p>
              <CodeBlock code={rendererModesCode} />
              <div className="wiki-note wiki-note--compact">
                <strong>Validação explícita</strong>
                <p>
                  O renderer não decide quando um valor é válido. Execute <code>validateForm</code> no envio e devolva
                  o array resultante em <code>errors</code>.
                </p>
              </div>
            </section>
          )}

          {route === "form-answers" && (
            <section className="wiki-section">
              <span className="wiki-section__number">02</span>
              <h3>Formatação e agrupamento</h3>
              <p>
                Respostas com o mesmo <code>fieldId</code> são agrupadas. Sem identificador, o rótulo é usado como
                chave. A propriedade <code>order</code> preserva a sequência do formulário.
              </p>
              <CodeBlock code={answersFormattingCode} language="ts" />
              <div className="wiki-grid">
                <div className="wiki-card">
                  <strong>Datas</strong>
                  <p>Valores ISO como 2026-07-25 são apresentados no formato 25/07/2026.</p>
                </div>
                <div className="wiki-card">
                  <strong>Múltipla escolha</strong>
                  <p>Os valores de checkbox são reunidos em uma lista sob o mesmo rótulo.</p>
                </div>
                <div className="wiki-card">
                  <strong>Sensíveis</strong>
                  <p>Quando sensitive é verdadeiro, o conteúdo é substituído por “Resposta ocultada”.</p>
                </div>
              </div>
            </section>
          )}

          <section className="wiki-section">
            <span className="wiki-section__number">03</span>
            <h3>Propriedades</h3>
            <PropsTable rows={page.props.map((row) => [...row])} />
          </section>

          <section className="wiki-section wiki-next-section">
            <span className="wiki-section__number">04</span>
            <h3>Continue explorando</h3>
            <div className="wiki-component-links">
              {(
                [
                  ["form-builder", "FormBuilder", "Edite a estrutura do formulário."],
                  ["form-renderer", "FormRenderer", "Colete e valide as respostas."],
                  ["form-answers", "FormAnswers", "Apresente o resultado enviado."],
                ] as const
              )
                .filter(([itemRoute]) => itemRoute !== route)
                .map(([itemRoute, name, description]) => (
                  <WikiLink key={itemRoute} to={itemRoute} onNavigate={onNavigate}>
                    <span>{name}</span>
                    <small>{description}</small>
                    <i aria-hidden="true">→</i>
                  </WikiLink>
                ))}
            </div>
          </section>
        </article>
      </div>
    </section>
  )
}

export function Wiki() {
  const [route, setRoute] = useState<WikiRoute>(getWikiRoute)

  useEffect(() => {
    const updateRoute = () => setRoute(getWikiRoute())
    window.addEventListener("popstate", updateRoute)
    return () => window.removeEventListener("popstate", updateRoute)
  }, [])

  const navigate = (nextRoute: WikiRoute) => {
    const nextPath = nextRoute === "overview" ? "/wiki" : `/wiki/${nextRoute}`
    window.history.pushState({}, "", nextPath)
    setRoute(nextRoute)
    window.scrollTo({ top: 0 })
  }

  if (route !== "overview") {
    return <ComponentPage route={route} onNavigate={navigate} />
  }

  return (
    <section className="wiki">
      <div className="wiki-hero" id="inicio">
        <div>
          <span className="demo-kicker">Documentação</span>
          <h2>Crie formulários dinâmicos em React</h2>
          <p>
            Um guia prático da instalação ao envio: construa campos visualmente, renderize o formulário e apresente as
            respostas usando uma API tipada e sem dependências de interface.
          </p>
          <div className="wiki-tags" aria-label="Características">
            <span>React 18+</span>
            <span>TypeScript</span>
            <span>ESM</span>
            <span>CSS isolado</span>
          </div>
        </div>
        <div className="wiki-install">
          <span>Instale o pacote</span>
          <CodeBlock code={installCode} language="terminal" />
        </div>
      </div>

      <div className="wiki-layout">
        <aside className="wiki-sidebar">
          <strong>Nesta página</strong>
          <nav aria-label="Sumário da documentação">
            <a href="#primeiros-passos">Primeiros passos</a>
            <a href="#fluxo">Como funciona</a>
            <a href="#campos">Tipos de campo</a>
            <a href="#componentes">Componentes</a>
            <a href="#respostas">Respostas e validação</a>
            <a href="#helpers">Helpers</a>
            <a href="#estilos">Personalização</a>
            <a href="#compatibilidade">Compatibilidade</a>
          </nav>
        </aside>

        <article className="wiki-content">
          <section id="primeiros-passos" className="wiki-section">
            <span className="wiki-section__number">01</span>
            <h3>Primeiros passos</h3>
            <p>
              O entrypoint principal já inclui o CSS da biblioteca. Se o seu bundler exigir uma importação explícita,
              use <code>import "react-form-builder/styles.css"</code>.
            </p>

            <h4>1. Construa a definição</h4>
            <p>
              O <code>FormBuilder</code> recebe um array de campos e devolve a nova definição a cada edição.
            </p>
            <CodeBlock code={builderCode} />

            <h4>2. Renderize e valide</h4>
            <p>
              Passe a mesma definição ao <code>FormRenderer</code>. As respostas podem ficar no seu estado e ser
              enviadas para qualquer API.
            </p>
            <CodeBlock code={rendererCode} />

            <h4>3. Mostre o resultado</h4>
            <p>
              O <code>FormAnswers</code> formata datas, valores monetários e telefones, agrupa múltiplas escolhas e
              oculta o conteúdo de respostas sensíveis.
            </p>
            <CodeBlock code={answersCode} />

            <div className="wiki-note">
              <strong>Controlado ou não controlado?</strong>
              <p>
                Use <code>fields</code>/<code>value</code> quando o estado pertence à aplicação. Para uma integração
                mais simples, use <code>defaultFields</code>/<code>defaultValue</code>.
              </p>
              <CodeBlock code={uncontrolledCode} />
            </div>
          </section>

          <section id="fluxo" className="wiki-section">
            <span className="wiki-section__number">02</span>
            <h3>Como a biblioteca funciona</h3>
            <div className="wiki-flow">
              <div>
                <span>1</span>
                <strong>Definição</strong>
                <p>O builder cria um array portátil de <code>FormField</code>.</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>2</span>
                <strong>Preenchimento</strong>
                <p>O renderer transforma campos em controles e produz <code>FormAnswer[]</code>.</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>3</span>
                <strong>Saída</strong>
                <p>Valide, persista na sua API ou apresente com <code>FormAnswers</code>.</p>
              </div>
            </div>

            <h4>Contrato de um campo</h4>
            <CodeBlock code={fieldCode} />
            <p className="wiki-caption">
              <code>id</code> é opcional, mas recomendado para relacionar respostas sem depender do rótulo.{" "}
              <code>order</code> define a sequência visual.
            </p>
          </section>

          <section id="campos" className="wiki-section">
            <span className="wiki-section__number">03</span>
            <h3>Tipos de campo</h3>
            <p>
              Restrinja a paleta do construtor com <code>allowedTypes</code> quando seu produto aceitar apenas parte do
              catálogo.
            </p>
            <div className="wiki-table-wrap">
              <table className="wiki-table">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Uso</th>
                    <th>Configurações relevantes</th>
                  </tr>
                </thead>
                <tbody>
                  {fieldTypes.map(([type, description, settings]) => (
                    <tr key={type}>
                      <td>
                        <code>{type}</code>
                      </td>
                      <td>{description}</td>
                      <td>{settings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="wiki-note wiki-note--compact">
              <strong>Opções e valores padrão</strong>
              <p>
                Em campos de seleção, cada item usa <code>{`{ order, value, selected? }`}</code>. Uma opção marcada
                com <code>selected</code> entra nas respostas iniciais. <code>checkbox-group</code> aceita várias.
              </p>
            </div>
          </section>

          <section id="componentes" className="wiki-section">
            <span className="wiki-section__number">04</span>
            <h3>Referência dos componentes</h3>
            <p>Cada componente possui uma página própria com exemplos, comportamentos e referência completa de props.</p>
            <div className="wiki-component-links wiki-component-links--overview">
              <WikiLink to="form-builder" onNavigate={navigate}>
                <span>FormBuilder</span>
                <small>Construa e edite a definição do formulário.</small>
                <i aria-hidden="true">→</i>
              </WikiLink>
              <WikiLink to="form-renderer" onNavigate={navigate}>
                <span>FormRenderer</span>
                <small>Renderize campos, colete valores e mostre erros.</small>
                <i aria-hidden="true">→</i>
              </WikiLink>
              <WikiLink to="form-answers" onNavigate={navigate}>
                <span>FormAnswers</span>
                <small>Agrupe, proteja e apresente as respostas.</small>
                <i aria-hidden="true">→</i>
              </WikiLink>
            </div>
          </section>

          <section id="respostas" className="wiki-section">
            <span className="wiki-section__number">05</span>
            <h3>Respostas, validação e privacidade</h3>
            <p>
              Cada resposta carrega os dados necessários para ser persistida e apresentada sem consultar novamente o
              campo original. Múltiplas escolhas geram uma resposta por opção.
            </p>
            <CodeBlock code={answerShapeCode} language="ts" />

            <div className="wiki-grid">
              <div className="wiki-card">
                <strong>Validação</strong>
                <p>
                  <code>validateForm</code> verifica campos obrigatórios e <code>minlength</code> em textos. O retorno é
                  sempre <code>FormError[]</code>.
                </p>
              </div>
              <div className="wiki-card">
                <strong>Campos sensíveis</strong>
                <p>
                  Marque o campo com <code>sensitive: true</code>. O resumo oculta o valor, mas preserva a indicação de
                  conteúdo protegido.
                </p>
              </div>
              <div className="wiki-card">
                <strong>Modo anônimo</strong>
                <p>
                  Com <code>anonymous</code>, campos sensíveis não são renderizados nem considerados na validação.
                </p>
              </div>
            </div>
            <CodeBlock code={anonymousCode} />
          </section>

          <section id="helpers" className="wiki-section">
            <span className="wiki-section__number">06</span>
            <h3>Helpers e constantes</h3>
            <div className="wiki-helper-groups">
              <div>
                <strong>Campos e opções</strong>
                <code>createField</code>
                <code>duplicateField</code>
                <code>normalizeFields</code>
                <code>normalizeOptions</code>
                <code>isFieldType</code>
              </div>
              <div>
                <strong>Respostas</strong>
                <code>createAnswer</code>
                <code>answerForField</code>
                <code>answersForField</code>
                <code>getDefaultAnswers</code>
                <code>setFieldAnswer</code>
                <code>toggleFieldAnswer</code>
              </div>
              <div>
                <strong>Validação e máscaras</strong>
                <code>validateForm</code>
                <code>validate</code>
                <code>maskDigits</code>
                <code>maskCurrency</code>
                <code>maskPhone</code>
              </div>
              <div>
                <strong>Catálogo</strong>
                <code>FIELD_TYPES</code>
                <code>FIELD_CATALOG</code>
                <code>DEFAULT_CURRENCY_PREFIX</code>
                <code>DEFAULT_PHONE_PREFIX</code>
              </div>
            </div>
          </section>

          <section id="estilos" className="wiki-section">
            <span className="wiki-section__number">07</span>
            <h3>Personalização visual</h3>
            <p>
              As classes internas usam o prefixo <code>rfb-</code>. Para temas, prefira sobrescrever as variáveis CSS
              em uma classe da sua aplicação.
            </p>
            <CodeBlock code={themeCode} language="css" />
            <CodeBlock code={themeUsageCode} />
          </section>

          <section id="compatibilidade" className="wiki-section">
            <span className="wiki-section__number">08</span>
            <h3>Compatibilidade e aliases</h3>
            <p>
              Para facilitar migrações, a biblioteca mantém nomes equivalentes. Em código novo, prefira sempre os
              nomes da primeira coluna.
            </p>
            <div className="wiki-aliases">
              <span>
                <code>FormRenderer</code> <i>→</i> <code>FormRender</code>
              </span>
              <span>
                <code>FormField</code> <i>→</i> <code>FormFieldType</code>
              </span>
              <span>
                <code>FormAnswer</code> <i>→</i> <code>Answer</code>
              </span>
              <span>
                <code>FieldType</code> <i>→</i> <code>TipoType</code>
              </span>
              <span>
                <code>anonymous</code> <i>→</i> <code>anonimo</code>
              </span>
              <span>
                <code>errors</code> <i>→</i> <code>formErrors</code>
              </span>
            </div>
            <div className="wiki-end">
              <span>Pronto para experimentar?</span>
              <p>Volte às abas da demo para construir um formulário e acompanhar o contrato gerado em tempo real.</p>
              <a href="#inicio">Voltar ao início ↑</a>
            </div>
          </section>
        </article>
      </div>
    </section>
  )
}
