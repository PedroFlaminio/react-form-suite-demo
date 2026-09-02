import { useEffect, useState } from "react"
import type { MouseEvent, ReactNode } from "react"
import { useDemoLocale, type DemoLocale } from "./i18n"

const wikiSpanish: Record<string, string> = {
  "Copied!": "¡Copiado!",
  Copy: "Copiar",
  Property: "Propiedad",
  Type: "Tipo",
  Description: "Descripción",
  Documentation: "Documentación",
  Components: "Componentes",
  "Component documentation": "Documentación de los componentes",
  Overview: "Vista general",
  Usage: "Uso",
  "Import the component and types directly from ": "Importa el componente y los tipos directamente desde ",
  "CSS is already included by the main entry point.": "El CSS ya está incluido en el punto de entrada principal.",
  "Builder configuration": "Configuración del constructor",
  "In controlled mode, ": "En modo controlado, ",
  " is the source of truth. Use ": " es la fuente de verdad. Usa ",
  " to show only the field types supported by your product.": " para mostrar solo los tipos de campo admitidos por tu producto.",
  Add: "Añadir",
  "Drag a type from the palette or double-click it to append it.": "Arrastra un tipo desde la paleta o haz doble clic para añadirlo al final.",
  Edit: "Editar",
  "Labels, descriptions, required and sensitive flags, and limits are configured in the field editor.": "Las etiquetas, descripciones, obligatoriedad, sensibilidad y límites se configuran en el editor del campo.",
  Reorder: "Ordenar",
  "Drag the cards or use the move controls. Order is normalized automatically.": "Arrastra las tarjetas o usa los controles de movimiento. El orden se normaliza automáticamente.",
  "Display modes": "Modos de visualización",
  "Use the component for data entry, read-only, disabled, and anonymous flows.": "Usa el componente para flujos de introducción de datos, solo lectura, desactivados y anónimos.",
  "Explicit validation": "Validación explícita",
  "The renderer does not decide when a value is valid. Run ": "El renderer no decide cuándo un valor es válido. Ejecuta ",
  " on submit and pass the resulting array to ": " al enviar y pasa el array resultante a ",
  "Formatting and grouping": "Formato y agrupación",
  "Answers with the same ": "Las respuestas con el mismo ",
  " are grouped. Without an ID, the label becomes the key. The ": " se agrupan. Sin identificador, la etiqueta se usa como clave. La propiedad ",
  " property preserves form order.": " conserva el orden del formulario.",
  Dates: "Fechas",
  "ISO values such as 2026-07-25 are displayed as 07/25/2026 in en-US.": "Los valores ISO como 2026-07-25 se muestran como 25/07/2026 en es-ES.",
  "Multiple choice": "Selección múltiple",
  "Checkbox values are grouped into a list under the same label.": "Los valores de las casillas se agrupan en una lista bajo la misma etiqueta.",
  Sensitive: "Sensibles",
  "When sensitive is true, the content is replaced with “Answer hidden”.": "Cuando sensitive es verdadero, el contenido se sustituye por «Respuesta oculta».",
  Properties: "Propiedades",
  "Keep exploring": "Sigue explorando",
  "Edit the form structure.": "Edita la estructura del formulario.",
  "Collect and validate answers.": "Recopila y valida las respuestas.",
  "Display submitted results.": "Muestra el resultado enviado.",
  "Build dynamic forms in React": "Crea formularios dinámicos en React",
  "A practical guide from installation to submission: build fields visually, render the form, and display answers with a typed API and no UI dependencies.": "Una guía práctica desde la instalación hasta el envío: crea campos visualmente, renderiza el formulario y muestra las respuestas con una API tipada y sin dependencias de interfaz.",
  "Scoped CSS": "CSS aislado",
  "Install the package": "Instala el paquete",
  "On this page": "En esta página",
  "Documentation contents": "Contenido de la documentación",
  "Getting started": "Primeros pasos",
  "How it works": "Cómo funciona",
  "Field types": "Tipos de campo",
  "Answers and validation": "Respuestas y validación",
  Customization: "Personalización",
  "The main entry point includes the library CSS. If your bundler requires an explicit import, use ": "El punto de entrada principal ya incluye el CSS de la biblioteca. Si tu bundler exige una importación explícita, usa ",
  "1. Build the definition": "1. Construye la definición",
  "The ": "El ",
  " receives an array of fields and returns a new definition after each edit.": " recibe un array de campos y devuelve una nueva definición después de cada edición.",
  "2. Render and validate": "2. Renderiza y valida",
  "Pass the same definition to ": "Pasa la misma definición a ",
  " Answers can live in your state and be sent to any API.": " Las respuestas pueden permanecer en tu estado y enviarse a cualquier API.",
  "3. Display the result": "3. Muestra el resultado",
  " formats dates, currency, and phone values, groups multiple choices, and hides sensitive answers.": " formatea fechas, importes monetarios y teléfonos, agrupa selecciones múltiples y oculta las respuestas sensibles.",
  "Controlled or uncontrolled?": "¿Controlado o no controlado?",
  "Use ": "Usa ",
  " when state belongs to the application. For a simpler integration, use ": " cuando el estado pertenece a la aplicación. Para una integración más sencilla, usa ",
  "Languages and regional formats": "Idiomas y formatos regionales",
  "Use the provider to apply a locale to the entire tree, or the locale prop on one component. Exported locale objects are also typed foundations for additional languages.": "Usa el provider para aplicar un locale a todo el árbol, o la prop locale en un componente. Los objetos exportados también sirven como bases tipadas para añadir otros idiomas.",
  "How the library works": "Cómo funciona la biblioteca",
  Definition: "Definición",
  "The builder creates a portable ": "El builder crea un array portable de ",
  " array.": ".",
  "Data entry": "Introducción de datos",
  "The renderer turns fields into controls and produces ": "El renderer transforma los campos en controles y produce ",
  Output: "Salida",
  "Validate, persist to your API, or display with ": "Valida, guarda en tu API o muestra con ",
  "Field contract": "Contrato de un campo",
  " is optional but recommended for matching answers without relying on labels. ": " es opcional, pero se recomienda para relacionar respuestas sin depender de las etiquetas. ",
  " defines the visual order.": " define el orden visual.",
  "Limit the builder palette with ": "Limita la paleta del constructor con ",
  " when your product supports only part of the catalog. In en-US, CPF and CNPJ are hidden and CEP is presented as ZIP code.": " cuando tu producto solo admita parte del catálogo. En es-ES, CPF y CNPJ se ocultan y CEP se presenta como Código postal.",
  "Relevant settings": "Configuraciones relevantes",
  "Options and default values": "Opciones y valores predeterminados",
  "In choice fields, each item uses ": "En los campos de selección, cada elemento usa ",
  " An option marked as ": " Una opción marcada como ",
  " is included in the initial answers. ": " se incluye en las respuestas iniciales. ",
  " supports multiple values.": " admite varios valores.",
  "Component reference": "Referencia de componentes",
  "Each component has its own page with examples, behavior, and a complete prop reference.": "Cada componente tiene su propia página con ejemplos, comportamiento y una referencia completa de props.",
  "Build and edit the form definition.": "Construye y edita la definición del formulario.",
  "Render fields, collect values, and display errors.": "Renderiza campos, recopila valores y muestra errores.",
  "Group, protect, and display answers.": "Agrupa, protege y muestra las respuestas.",
  "Answers, validation, and privacy": "Respuestas, validación y privacidad",
  "Each answer contains the data needed to persist and display it without looking up the original field. Multiple choices produce one answer per option.": "Cada respuesta contiene los datos necesarios para guardarla y mostrarla sin volver a consultar el campo original. Las selecciones múltiples generan una respuesta por opción.",
  Validation: "Validación",
  " checks required fields and text ": " comprueba los campos obligatorios y ",
  ". It always returns ": " en textos. Siempre devuelve ",
  "Sensitive fields": "Campos sensibles",
  "Mark the field with ": "Marca el campo con ",
  " The summary hides its value while preserving the protected-content indicator.": " El resumen oculta su valor, pero conserva el indicador de contenido protegido.",
  "Anonymous mode": "Modo anónimo",
  "With ": "Con ",
  ", sensitive fields are neither rendered nor included in validation.": ", los campos sensibles no se renderizan ni se incluyen en la validación.",
  "Helpers and constants": "Helpers y constantes",
  "Fields and options": "Campos y opciones",
  Answers: "Respuestas",
  "Validation and masks": "Validación y máscaras",
  Catalog: "Catálogo",
  "Visual customization": "Personalización visual",
  "Internal classes use the ": "Las clases internas usan el prefijo ",
  " prefix. For themes, override the CSS variables in one of your application classes.": ". Para los temas, sobrescribe las variables CSS en una clase de tu aplicación.",
  "Ready to try it?": "¿Listo para probarlo?",
  "Return to the demo tabs to build a form and inspect the generated contract in real time.": "Vuelve a las pestañas de la demo para construir un formulario y consultar el contrato generado en tiempo real.",
  "Back to top ↑": "Volver arriba ↑",
}

const wikiFrench: Record<string, string> = {
  "Copied!": "Copié !",
  Copy: "Copier",
  Property: "Propriété",
  Type: "Type",
  Description: "Description",
  Documentation: "Documentation",
  Components: "Composants",
  "Component documentation": "Documentation des composants",
  Overview: "Vue d’ensemble",
  Usage: "Utilisation",
  "Import the component and types directly from ": "Importez le composant et les types directement depuis ",
  "CSS is already included by the main entry point.": "Le CSS est déjà inclus dans le point d’entrée principal.",
  "Builder configuration": "Configuration du constructeur",
  "In controlled mode, ": "En mode contrôlé, ",
  " is the source of truth. Use ": " est la source de vérité. Utilisez ",
  " to show only the field types supported by your product.": " pour afficher uniquement les types de champ pris en charge par votre produit.",
  Add: "Ajouter",
  "Drag a type from the palette or double-click it to append it.": "Faites glisser un type depuis la palette ou double-cliquez pour l’ajouter à la fin.",
  Edit: "Modifier",
  "Labels, descriptions, required and sensitive flags, and limits are configured in the field editor.": "Les libellés, descriptions, indicateurs obligatoires et sensibles ainsi que les limites sont configurés dans l’éditeur de champ.",
  Reorder: "Réorganiser",
  "Drag the cards or use the move controls. Order is normalized automatically.": "Faites glisser les cartes ou utilisez les commandes de déplacement. L’ordre est normalisé automatiquement.",
  "Display modes": "Modes d’affichage",
  "Use the component for data entry, read-only, disabled, and anonymous flows.": "Utilisez le composant pour la saisie, la lecture seule, les parcours désactivés et anonymes.",
  "Explicit validation": "Validation explicite",
  "The renderer does not decide when a value is valid. Run ": "Le renderer ne décide pas si une valeur est valide. Exécutez ",
  " on submit and pass the resulting array to ": " lors de l’envoi et transmettez le tableau obtenu à ",
  "Formatting and grouping": "Formatage et regroupement",
  "Answers with the same ": "Les réponses ayant le même ",
  " are grouped. Without an ID, the label becomes the key. The ": " sont regroupées. Sans identifiant, le libellé devient la clé. La propriété ",
  " property preserves form order.": " conserve l’ordre du formulaire.",
  Dates: "Dates",
  "ISO values such as 2026-07-25 are displayed as 07/25/2026 in en-US.": "Les valeurs ISO comme 2026-07-25 sont affichées au format 25/07/2026 en fr-FR.",
  "Multiple choice": "Choix multiple",
  "Checkbox values are grouped into a list under the same label.": "Les valeurs des cases à cocher sont regroupées dans une liste sous le même libellé.",
  Sensitive: "Données sensibles",
  "When sensitive is true, the content is replaced with “Answer hidden”.": "Lorsque sensitive vaut true, le contenu est remplacé par « Réponse masquée ».",
  Properties: "Propriétés",
  "Keep exploring": "Poursuivre l’exploration",
  "Edit the form structure.": "Modifiez la structure du formulaire.",
  "Collect and validate answers.": "Collectez et validez les réponses.",
  "Display submitted results.": "Affichez les résultats envoyés.",
  "Build dynamic forms in React": "Créez des formulaires dynamiques avec React",
  "A practical guide from installation to submission: build fields visually, render the form, and display answers with a typed API and no UI dependencies.": "Un guide pratique de l’installation à l’envoi : construisez visuellement les champs, affichez le formulaire et présentez les réponses avec une API typée sans dépendance d’interface.",
  "Scoped CSS": "CSS isolé",
  "Install the package": "Installez le package",
  "On this page": "Sur cette page",
  "Documentation contents": "Sommaire de la documentation",
  "Getting started": "Premiers pas",
  "How it works": "Fonctionnement",
  "Field types": "Types de champ",
  "Answers and validation": "Réponses et validation",
  Customization: "Personnalisation",
  "The main entry point includes the library CSS. If your bundler requires an explicit import, use ": "Le point d’entrée principal inclut le CSS de la bibliothèque. Si votre bundler exige un import explicite, utilisez ",
  "1. Build the definition": "1. Construisez la définition",
  "The ": "Le ",
  " receives an array of fields and returns a new definition after each edit.": " reçoit un tableau de champs et renvoie une nouvelle définition après chaque modification.",
  "2. Render and validate": "2. Affichez et validez",
  "Pass the same definition to ": "Transmettez la même définition à ",
  " Answers can live in your state and be sent to any API.": " Les réponses peuvent rester dans votre état et être envoyées à n’importe quelle API.",
  "3. Display the result": "3. Affichez le résultat",
  " formats dates, currency, and phone values, groups multiple choices, and hides sensitive answers.": " formate les dates, les montants et les téléphones, regroupe les choix multiples et masque les réponses sensibles.",
  "Controlled or uncontrolled?": "Contrôlé ou non contrôlé ?",
  "Use ": "Utilisez ",
  " when state belongs to the application. For a simpler integration, use ": " lorsque l’état appartient à l’application. Pour une intégration plus simple, utilisez ",
  "Languages and regional formats": "Langues et formats régionaux",
  "Use the provider to apply a locale to the entire tree, or the locale prop on one component. Exported locale objects are also typed foundations for additional languages.": "Utilisez le provider pour appliquer une locale à toute l’arborescence, ou la prop locale sur un seul composant. Les objets exportés servent aussi de bases typées pour ajouter d’autres langues.",
  "How the library works": "Fonctionnement de la bibliothèque",
  Definition: "Définition",
  "The builder creates a portable ": "Le builder crée un tableau portable de ",
  " array.": ".",
  "Data entry": "Saisie",
  "The renderer turns fields into controls and produces ": "Le renderer transforme les champs en contrôles et produit ",
  Output: "Sortie",
  "Validate, persist to your API, or display with ": "Validez, enregistrez dans votre API ou affichez avec ",
  "Field contract": "Contrat d’un champ",
  " is optional but recommended for matching answers without relying on labels. ": " est facultatif, mais recommandé pour associer les réponses sans dépendre des libellés. ",
  " defines the visual order.": " définit l’ordre visuel.",
  "Limit the builder palette with ": "Limitez la palette du constructeur avec ",
  " when your product supports only part of the catalog. In en-US, CPF and CNPJ are hidden and CEP is presented as ZIP code.": " lorsque votre produit ne prend en charge qu’une partie du catalogue. En fr-FR, CPF et CNPJ sont masqués et CEP devient Code postal.",
  "Relevant settings": "Paramètres utiles",
  "Options and default values": "Options et valeurs par défaut",
  "In choice fields, each item uses ": "Dans les champs de choix, chaque élément utilise ",
  " An option marked as ": " Une option marquée ",
  " is included in the initial answers. ": " est incluse dans les réponses initiales. ",
  " supports multiple values.": " accepte plusieurs valeurs.",
  "Component reference": "Référence des composants",
  "Each component has its own page with examples, behavior, and a complete prop reference.": "Chaque composant possède sa propre page avec des exemples, son comportement et la référence complète de ses props.",
  "Build and edit the form definition.": "Construisez et modifiez la définition du formulaire.",
  "Render fields, collect values, and display errors.": "Affichez les champs, collectez les valeurs et présentez les erreurs.",
  "Group, protect, and display answers.": "Regroupez, protégez et affichez les réponses.",
  "Answers, validation, and privacy": "Réponses, validation et confidentialité",
  "Each answer contains the data needed to persist and display it without looking up the original field. Multiple choices produce one answer per option.": "Chaque réponse contient les données nécessaires à son enregistrement et à son affichage sans consulter le champ d’origine. Les choix multiples produisent une réponse par option.",
  Validation: "Validation",
  " checks required fields and text ": " vérifie les champs obligatoires et la propriété ",
  ". It always returns ": " des textes. Il renvoie toujours ",
  "Sensitive fields": "Champs sensibles",
  "Mark the field with ": "Marquez le champ avec ",
  " The summary hides its value while preserving the protected-content indicator.": " Le résumé masque sa valeur tout en conservant l’indicateur de contenu protégé.",
  "Anonymous mode": "Mode anonyme",
  "With ": "Avec ",
  ", sensitive fields are neither rendered nor included in validation.": ", les champs sensibles ne sont ni affichés ni inclus dans la validation.",
  "Helpers and constants": "Helpers et constantes",
  "Fields and options": "Champs et options",
  Answers: "Réponses",
  "Validation and masks": "Validation et masques",
  Catalog: "Catalogue",
  "Visual customization": "Personnalisation visuelle",
  "Internal classes use the ": "Les classes internes utilisent le préfixe ",
  " prefix. For themes, override the CSS variables in one of your application classes.": ". Pour les thèmes, remplacez les variables CSS dans une classe de votre application.",
  "Ready to try it?": "Prêt à essayer ?",
  "Return to the demo tabs to build a form and inspect the generated contract in real time.": "Revenez aux onglets de la démo pour construire un formulaire et consulter le contrat généré en temps réel.",
  "Back to top ↑": "Retour en haut ↑",
}

function useWikiText() {
  const { locale } = useDemoLocale()
  return (portuguese: string, english: string, spanish?: string) => {
    if (locale === "en-US") return english
    if (locale === "es-ES") return spanish ?? wikiSpanish[english] ?? portuguese
    if (locale === "fr-FR") return wikiFrench[english] ?? english
    return portuguese
  }
}

const installCode = `npm install react-form-suite`

const builderCode = `import { useState } from "react"
import { FormBuilder, type FormField } from "react-form-suite"

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
} from "react-form-suite"

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

const answersCode = `import { FormAnswers, type FormAnswer } from "react-form-suite"

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
  --rfs-primary: #6d28d9;
  --rfs-primary-dark: #5b21b6;
  --rfs-primary-soft: #f3e8ff;
  --rfs-danger: #b91c1c;
  --rfs-border: #ddd6fe;
  --rfs-text: #1f2937;
  --rfs-surface: #ffffff;
  --rfs-canvas: #fafafa;
  --rfs-radius: 8px;
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

const localeCode = `import {
  FormBuilderLocaleProvider,
  EN_US_LOCALE,
  ES_ES_LOCALE,
  FR_FR_LOCALE,
  type FormBuilderLocale,
} from "react-form-suite"

// Applies one locale to every library component below the provider.
<FormBuilderLocaleProvider locale="es-ES">
  <FormBuilder fields={fields} onChange={setFields} />
  <FormRenderer fields={fields} />
  <FormAnswers answers={answers} />
</FormBuilderLocaleProvider>

// A new language can provide a complete, typed locale definition.
const customLocale: FormBuilderLocale = {
  ...EN_US_LOCALE,
  code: "en-CA",
  // Override catalog, messages, defaults, masks, and formatDate as needed.
}`

const fieldTypes = [
  ["text", "Texto em uma linha", "minlength, maxlength, defaultValue"],
  ["number", "Número", "min, max"],
  ["currency", "Valor monetário com máscara", "prefix (padrão: R$)"],
  ["phone", "Telefone com máscara brasileira", "prefix (padrão: +55)"],
  ["date", "Data", "—"],
  ["cpf", "CPF com máscara", "—"],
  ["cnpj", "CNPJ com máscara", "—"],
  ["postal-code", "CEP com máscara", "—"],
  ["textarea", "Texto em várias linhas", "minlength, maxlength"],
  ["select", "Lista de seleção única", "formularioCampoOpcao"],
  ["radio-group", "Grupo de escolha única", "formularioCampoOpcao"],
  ["checkbox-group", "Grupo de múltipla escolha", "formularioCampoOpcao"],
]

const fieldTypesEn = [
  ["text", "Single-line text", "minlength, maxlength, defaultValue"],
  ["number", "Number", "min, max"],
  ["currency", "Currency with localized mask", "prefix (default: $)"],
  ["phone", "US phone number", "prefix (default: +1)"],
  ["date", "Date displayed as MM/DD/YYYY", "—"],
  ["postal-code", "ZIP or ZIP+4 code", "—"],
  ["textarea", "Multi-line text", "minlength, maxlength"],
  ["select", "Single-selection list", "formularioCampoOpcao"],
  ["radio-group", "Single-choice group", "formularioCampoOpcao"],
  ["checkbox-group", "Multiple-choice group", "formularioCampoOpcao"],
]

const fieldTypesEs = [
  ["text", "Texto en una línea", "minlength, maxlength, defaultValue"],
  ["number", "Número", "min, max"],
  ["currency", "Importe monetario con máscara localizada", "prefix (predeterminado: €)"],
  ["phone", "Teléfono español", "prefix (predeterminado: +34)"],
  ["date", "Fecha con formato DD/MM/YYYY", "—"],
  ["postal-code", "Código postal de cinco dígitos", "—"],
  ["textarea", "Texto en varias líneas", "minlength, maxlength"],
  ["select", "Lista de selección única", "formularioCampoOpcao"],
  ["radio-group", "Grupo de elección única", "formularioCampoOpcao"],
  ["checkbox-group", "Grupo de elección múltiple", "formularioCampoOpcao"],
]

const fieldTypesFr = [
  ["text", "Texte sur une ligne", "minlength, maxlength, defaultValue"],
  ["number", "Nombre", "min, max"],
  ["currency", "Montant avec masque localisé", "prefix (par défaut : €)"],
  ["phone", "Téléphone français", "prefix (par défaut : +33)"],
  ["date", "Date au format DD/MM/YYYY", "—"],
  ["postal-code", "Code postal à cinq chiffres", "—"],
  ["textarea", "Texte sur plusieurs lignes", "minlength, maxlength"],
  ["select", "Liste à sélection unique", "formularioCampoOpcao"],
  ["radio-group", "Groupe à choix unique", "formularioCampoOpcao"],
  ["checkbox-group", "Groupe à choix multiples", "formularioCampoOpcao"],
]

const builderProps = [
  ["fields", "FormField[]", "Campos no modo controlado."],
  ["defaultFields", "FormField[]", "Campos iniciais no modo não controlado."],
  ["onChange", "(fields) => void", "Executado após cada alteração."],
  ["allowedTypes", "readonly FieldType[]", "Restringe os tipos disponíveis na paleta."],
  ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Idioma, textos e formatos regionais."],
  ["currencyPrefix", "string", "Prefixo inicial de campos monetários. Padrão: R$."],
  ["phonePrefix", "string", "Prefixo inicial de telefones. Padrão: +55."],
  ["disabled", "boolean", "Bloqueia as alterações no construtor."],
  ["emptyMessage", "ReactNode", "Conteúdo exibido quando não há campos."],
  ["className / style", "string / CSSProperties", "Personaliza o elemento raiz."],
  ["aria-label", "string", "Nome acessível do construtor."],
]

const rendererProps = [
  ["fields", "FormField[]", "Definição dos campos do formulário."],
  ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Idioma, textos e formatos regionais."],
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
  ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Idioma, textos e formatos regionais."],
  ["emptyMessage", "ReactNode", "Conteúdo exibido quando não há respostas."],
  ["className / style", "string / CSSProperties", "Personaliza o elemento raiz."],
  ["aria-label", "string", "Nome acessível da seção."],
]

const wikiCodeReplacements: Record<DemoLocale, Array<[string, string]>> = {
  "pt-BR": [
    [
      "// Applies one locale to every library component below the provider.",
      "// Aplica um idioma a todos os componentes da biblioteca abaixo do provider.",
    ],
    [
      "// A new language can provide a complete, typed locale definition.",
      "// Um novo idioma pode fornecer uma definição de locale completa e tipada.",
    ],
    [
      "// Override catalog, messages, defaults, masks, and formatDate as needed.",
      "// Sobrescreva catálogo, mensagens, padrões, máscaras e formatDate conforme necessário.",
    ],
  ],
  "en-US": [
    ["EditorDeFormulario", "FormEditor"],
    ["Editor do formulário", "Form editor"],
    ["MeuFormulario", "MyForm"],
    ["submitLabel=\"Enviar\"", "submitLabel=\"Submit\""],
    ["// Envie nextAnswers para a sua API", "// Send nextAnswers to your API"],
    ["export function Resumo", "export function Summary"],
    ["Nenhuma resposta enviada.", "No answers submitted."],
    ["label: \"E-mail\"", "label: \"Email\""],
    ["Usaremos apenas para entrar em contato.", "We will only use it to contact you."],
    ["voce@exemplo.com", "you@example.com"],
    ["id: \"assunto\"", "id: \"subject\""],
    ["label: \"Assunto\"", "label: \"Subject\""],
    ["value: \"Suporte\"", "value: \"Support\""],
    ["value: \"Comercial\"", "value: \"Sales\""],
    ["camposIniciais", "initialFields"],
    ["respostasIniciais", "initialAnswers"],
    ["currencyPrefix=\"R$\"", "currencyPrefix=\"$\""],
    ["phonePrefix=\"+55\"", "phonePrefix=\"+1\""],
    [
      "// Somente leitura: mostra os valores e remove o botão de envio",
      "// Read-only: displays values and removes the submit button",
    ],
    [
      "// Desabilitado: mantém o formulário visível, sem interação",
      "// Disabled: keeps the form visible without interaction",
    ],
    [
      "// Anônimo: remove campos marcados como sensitive",
      "// Anonymous: removes fields marked as sensitive",
    ],
    ["formulario-da-marca", "brand-form"],
    ["fieldId: \"data\"", "fieldId: \"date\""],
    ["label: \"Data da visita\"", "label: \"Visit date\""],
    ["fieldId: \"interesses\"", "fieldId: \"interests\""],
    ["label: \"Interesses\"", "label: \"Interests\""],
    ["value: \"Tecnologia\"", "value: \"Technology\""],
  ],
  "es-ES": [
    ["Editor do formulário", "Editor del formulario"],
    ["MeuFormulario", "MiFormulario"],
    ["// Envie nextAnswers para a sua API", "// Envía nextAnswers a tu API"],
    ["export function Resumo", "export function Resumen"],
    ["Nenhuma resposta enviada.", "No se ha enviado ninguna respuesta."],
    ["label: \"E-mail\"", "label: \"Correo electrónico\""],
    ["Usaremos apenas para entrar em contato.", "Solo lo usaremos para contactar contigo."],
    ["voce@exemplo.com", "tu@ejemplo.com"],
    ["label: \"Assunto\"", "label: \"Asunto\""],
    ["value: \"Suporte\"", "value: \"Soporte\""],
    ["camposIniciais", "camposIniciales"],
    ["respostasIniciais", "respuestasIniciales"],
    ["currencyPrefix=\"R$\"", "currencyPrefix=\"€\""],
    ["phonePrefix=\"+55\"", "phonePrefix=\"+34\""],
    [
      "// Somente leitura: mostra os valores e remove o botão de envio",
      "// Solo lectura: muestra los valores y elimina el botón de envío",
    ],
    [
      "// Desabilitado: mantém o formulário visível, sem interação",
      "// Deshabilitado: mantiene el formulario visible, sin interacción",
    ],
    [
      "// Anônimo: remove campos marcados como sensitive",
      "// Anónimo: elimina los campos marcados como sensitive",
    ],
    ["formulario-da-marca", "formulario-de-marca"],
    ["label: \"Data da visita\"", "label: \"Fecha de la visita\""],
    ["label: \"Interesses\"", "label: \"Intereses\""],
    ["value: \"Tecnologia\"", "value: \"Tecnología\""],
    ["value: \"Design\"", "value: \"Diseño\""],
    [
      "// Applies one locale to every library component below the provider.",
      "// Aplica un idioma a todos los componentes de la biblioteca bajo el provider.",
    ],
    [
      "// A new language can provide a complete, typed locale definition.",
      "// Un nuevo idioma puede proporcionar una definición de locale completa y tipada.",
    ],
    [
      "// Override catalog, messages, defaults, masks, and formatDate as needed.",
      "// Sobrescribe catálogo, mensajes, valores predeterminados, máscaras y formatDate según sea necesario.",
    ],
  ],
  "fr-FR": [
    ["EditorDeFormulario", "EditeurDeFormulaire"],
    ["Editor do formulário", "Éditeur de formulaire"],
    ["MeuFormulario", "MonFormulaire"],
    ["submitLabel=\"Enviar\"", "submitLabel=\"Envoyer\""],
    ["// Envie nextAnswers para a sua API", "// Envoyez nextAnswers à votre API"],
    ["export function Resumo", "export function Resume"],
    ["Nenhuma resposta enviada.", "Aucune réponse envoyée."],
    ["Usaremos apenas para entrar em contato.", "Nous l’utiliserons uniquement pour vous contacter."],
    ["voce@exemplo.com", "vous@exemple.fr"],
    ["id: \"assunto\"", "id: \"sujet\""],
    ["label: \"Assunto\"", "label: \"Sujet\""],
    ["value: \"Suporte\"", "value: \"Assistance\""],
    ["value: \"Comercial\"", "value: \"Commercial\""],
    ["camposIniciais", "champsInitiaux"],
    ["respostasIniciais", "reponsesInitiales"],
    ["currencyPrefix=\"R$\"", "currencyPrefix=\"€\""],
    ["phonePrefix=\"+55\"", "phonePrefix=\"+33\""],
    [
      "// Somente leitura: mostra os valores e remove o botão de envio",
      "// Lecture seule : affiche les valeurs et retire le bouton d’envoi",
    ],
    [
      "// Desabilitado: mantém o formulário visível, sem interação",
      "// Désactivé : conserve le formulaire visible, sans interaction",
    ],
    [
      "// Anônimo: remove campos marcados como sensitive",
      "// Anonyme : retire les champs marqués comme sensitive",
    ],
    ["formulario-da-marca", "formulaire-de-marque"],
    ["fieldId: \"data\"", "fieldId: \"date\""],
    ["label: \"Data da visita\"", "label: \"Date de la visite\""],
    ["fieldId: \"interesses\"", "fieldId: \"interets\""],
    ["label: \"Interesses\"", "label: \"Centres d’intérêt\""],
    ["value: \"Tecnologia\"", "value: \"Technologie\""],
    [
      "// Applies one locale to every library component below the provider.",
      "// Applique une langue à tous les composants de la bibliothèque sous le provider.",
    ],
    [
      "// A new language can provide a complete, typed locale definition.",
      "// Une nouvelle langue peut fournir une définition de locale complète et typée.",
    ],
    [
      "// Override catalog, messages, defaults, masks, and formatDate as needed.",
      "// Remplacez le catalogue, les messages, les valeurs par défaut, les masques et formatDate selon vos besoins.",
    ],
  ],
}

function localizeWikiCode(code: string, locale: DemoLocale) {
  return wikiCodeReplacements[locale].reduce(
    (localizedCode, [source, translation]) =>
      localizedCode.replaceAll(source, translation),
    code,
  )
}

function CodeBlock({ code, language = "tsx" }: { code: string; language?: string }) {
  const text = useWikiText()
  const { locale } = useDemoLocale()
  const [copied, setCopied] = useState(false)
  const localizedCode = localizeWikiCode(code, locale)

  const copy = async () => {
    await navigator.clipboard.writeText(localizedCode)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="wiki-code">
      <div className="wiki-code__bar">
        <span>{language}</span>
        <button type="button" onClick={() => void copy()}>
          {copied ? text("Copiado!", "Copied!") : text("Copiar", "Copy")}
        </button>
      </div>
      <pre>
        <code>{localizedCode}</code>
      </pre>
    </div>
  )
}

function PropsTable({ rows }: { rows: string[][] }) {
  const text = useWikiText()
  return (
    <div className="wiki-table-wrap">
      <table className="wiki-table">
        <thead>
          <tr>
            <th>{text("Propriedade", "Property")}</th>
            <th>{text("Tipo", "Type")}</th>
            <th>{text("Descrição", "Description")}</th>
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

const componentPagesEn = {
  "form-builder": {
    name: "FormBuilder",
    eyebrow: "Visual editor",
    description:
      "Creates and edits a form definition. Users can add fields from the palette, reorder, duplicate, and configure each item.",
    code: builderCode,
    props: [
      ["fields", "FormField[]", "Fields in controlled mode."],
      ["defaultFields", "FormField[]", "Initial fields in uncontrolled mode."],
      ["onChange", "(fields) => void", "Runs after each change."],
      ["allowedTypes", "readonly FieldType[]", "Limits the field types in the palette."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "UI language and regional formats."],
      ["currencyPrefix", "string", "Initial currency prefix."],
      ["phonePrefix", "string", "Initial phone prefix."],
      ["disabled", "boolean", "Prevents changes in the builder."],
      ["emptyMessage", "ReactNode", "Content displayed when there are no fields."],
      ["className / style", "string / CSSProperties", "Customizes the root element."],
      ["aria-label", "string", "Accessible name for the builder."],
    ],
  },
  "form-renderer": {
    name: "FormRenderer",
    eyebrow: "Data entry",
    description:
      "Turns a FormField[] definition into an accessible form and produces its answers as FormAnswer[].",
    code: rendererCode,
    props: [
      ["fields", "FormField[]", "Form field definition."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "UI language and regional formats."],
      ["value", "FormAnswer[]", "Answers in controlled mode."],
      ["defaultValue", "FormAnswer[]", "Initial answers in uncontrolled mode."],
      ["onChange", "(answers) => void", "Runs whenever an answer changes."],
      ["onSubmit", "(answers, event) => void", "Runs when the form is submitted."],
      ["errors", "FormError[]", "Errors shown in the summary and fields."],
      ["anonymous", "boolean", "Hides fields marked as sensitive."],
      ["disabled / readOnly", "boolean", "Disables the form or makes it read-only."],
      ["submitLabel", "ReactNode", "Submit button content."],
      ["hideSubmit", "boolean", "Hides the submit button."],
      ["noValidate", "boolean", "Sets the HTML noValidate attribute."],
      ["className / style", "string / CSSProperties", "Customizes the form."],
      ["aria-label", "string", "Accessible name for the form."],
    ],
  },
  "form-answers": {
    name: "FormAnswers",
    eyebrow: "Presentation",
    description:
      "Displays submitted answers with type-aware formatting, grouping for multiple choices, and protection for sensitive values.",
    code: answersCode,
    props: [
      ["answers", "readonly FormAnswer[]", "Answers produced by the renderer."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "UI language and regional formats."],
      ["emptyMessage", "ReactNode", "Content displayed when there are no answers."],
      ["className / style", "string / CSSProperties", "Customizes the root element."],
      ["aria-label", "string", "Accessible name for the section."],
    ],
  },
} as const

const componentPagesEs = {
  "form-builder": {
    name: "FormBuilder",
    eyebrow: "Editor visual",
    description:
      "Crea y edita la definición de un formulario. Permite añadir campos desde la paleta, reordenarlos, duplicarlos y configurar cada elemento.",
    code: builderCode,
    props: [
      ["fields", "FormField[]", "Campos en modo controlado."],
      ["defaultFields", "FormField[]", "Campos iniciales en modo no controlado."],
      ["onChange", "(fields) => void", "Se ejecuta después de cada cambio."],
      ["allowedTypes", "readonly FieldType[]", "Limita los tipos de campo de la paleta."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Idioma y formatos regionales."],
      ["currencyPrefix", "string", "Prefijo monetario inicial."],
      ["phonePrefix", "string", "Prefijo telefónico inicial."],
      ["disabled", "boolean", "Impide cambios en el constructor."],
      ["emptyMessage", "ReactNode", "Contenido mostrado cuando no hay campos."],
      ["className / style", "string / CSSProperties", "Personaliza el elemento raíz."],
      ["aria-label", "string", "Nombre accesible del constructor."],
    ],
  },
  "form-renderer": {
    name: "FormRenderer",
    eyebrow: "Introducción de datos",
    description:
      "Transforma una definición FormField[] en un formulario accesible y produce sus respuestas como FormAnswer[].",
    code: rendererCode,
    props: [
      ["fields", "FormField[]", "Definición de los campos."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Idioma y formatos regionales."],
      ["value", "FormAnswer[]", "Respuestas en modo controlado."],
      ["defaultValue", "FormAnswer[]", "Respuestas iniciales en modo no controlado."],
      ["onChange", "(answers) => void", "Se ejecuta cuando cambia una respuesta."],
      ["onSubmit", "(answers, event) => void", "Se ejecuta al enviar el formulario."],
      ["errors", "FormError[]", "Errores mostrados en el resumen y los campos."],
      ["anonymous", "boolean", "Oculta los campos marcados como sensibles."],
      ["disabled / readOnly", "boolean", "Desactiva el formulario o lo hace de solo lectura."],
      ["submitLabel", "ReactNode", "Contenido del botón de envío."],
      ["hideSubmit", "boolean", "Oculta el botón de envío."],
      ["noValidate", "boolean", "Define el atributo HTML noValidate."],
      ["className / style", "string / CSSProperties", "Personaliza el formulario."],
      ["aria-label", "string", "Nombre accesible del formulario."],
    ],
  },
  "form-answers": {
    name: "FormAnswers",
    eyebrow: "Presentación",
    description:
      "Muestra las respuestas enviadas con formato por tipo, agrupación de selecciones múltiples y protección de valores sensibles.",
    code: answersCode,
    props: [
      ["answers", "readonly FormAnswer[]", "Respuestas producidas por el renderer."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Idioma y formatos regionales."],
      ["emptyMessage", "ReactNode", "Contenido mostrado cuando no hay respuestas."],
      ["className / style", "string / CSSProperties", "Personaliza el elemento raíz."],
      ["aria-label", "string", "Nombre accesible de la sección."],
    ],
  },
} as const

const componentPagesFr = {
  "form-builder": {
    name: "FormBuilder",
    eyebrow: "Éditeur visuel",
    description:
      "Crée et modifie la définition d’un formulaire. Il permet d’ajouter des champs depuis la palette, de les réorganiser, de les dupliquer et de configurer chaque élément.",
    code: builderCode,
    props: [
      ["fields", "FormField[]", "Champs en mode contrôlé."],
      ["defaultFields", "FormField[]", "Champs initiaux en mode non contrôlé."],
      ["onChange", "(fields) => void", "Exécuté après chaque modification."],
      ["allowedTypes", "readonly FieldType[]", "Limite les types de champ de la palette."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Langue et formats régionaux."],
      ["currencyPrefix", "string", "Préfixe monétaire initial."],
      ["phonePrefix", "string", "Préfixe téléphonique initial."],
      ["disabled", "boolean", "Empêche les modifications dans le constructeur."],
      ["emptyMessage", "ReactNode", "Contenu affiché lorsqu’il n’y a aucun champ."],
      ["className / style", "string / CSSProperties", "Personnalise l’élément racine."],
      ["aria-label", "string", "Nom accessible du constructeur."],
    ],
  },
  "form-renderer": {
    name: "FormRenderer",
    eyebrow: "Saisie",
    description:
      "Transforme une définition FormField[] en formulaire accessible et produit ses réponses sous forme de FormAnswer[].",
    code: rendererCode,
    props: [
      ["fields", "FormField[]", "Définition des champs."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Langue et formats régionaux."],
      ["value", "FormAnswer[]", "Réponses en mode contrôlé."],
      ["defaultValue", "FormAnswer[]", "Réponses initiales en mode non contrôlé."],
      ["onChange", "(answers) => void", "Exécuté lorsqu’une réponse change."],
      ["onSubmit", "(answers, event) => void", "Exécuté lors de l’envoi du formulaire."],
      ["errors", "FormError[]", "Erreurs affichées dans le résumé et les champs."],
      ["anonymous", "boolean", "Masque les champs marqués comme sensibles."],
      ["disabled / readOnly", "boolean", "Désactive le formulaire ou le rend accessible en lecture seule."],
      ["submitLabel", "ReactNode", "Contenu du bouton d’envoi."],
      ["hideSubmit", "boolean", "Masque le bouton d’envoi."],
      ["noValidate", "boolean", "Définit l’attribut HTML noValidate."],
      ["className / style", "string / CSSProperties", "Personnalise le formulaire."],
      ["aria-label", "string", "Nom accessible du formulaire."],
    ],
  },
  "form-answers": {
    name: "FormAnswers",
    eyebrow: "Présentation",
    description:
      "Affiche les réponses envoyées avec un formatage par type, le regroupement des choix multiples et la protection des valeurs sensibles.",
    code: answersCode,
    props: [
      ["answers", "readonly FormAnswer[]", "Réponses produites par le renderer."],
      ["locale", '"pt-BR" | "en-US" | "es-ES" | "fr-FR" | FormBuilderLocale', "Langue et formats régionaux."],
      ["emptyMessage", "ReactNode", "Contenu affiché lorsqu’il n’y a aucune réponse."],
      ["className / style", "string / CSSProperties", "Personnalise l’élément racine."],
      ["aria-label", "string", "Nom accessible de la section."],
    ],
  },
} as const

function ComponentPage({
  route,
  onNavigate,
}: {
  route: Exclude<WikiRoute, "overview">
  onNavigate: (route: WikiRoute) => void
}) {
  const { locale } = useDemoLocale()
  const text = useWikiText()
  const page =
    locale === "en-US"
      ? componentPagesEn[route]
      : locale === "es-ES"
        ? componentPagesEs[route]
        : locale === "fr-FR"
          ? componentPagesFr[route]
          : componentPages[route]

  return (
    <section className="wiki wiki-component-page">
      <div className="wiki-component-hero" id="inicio">
        <div className="wiki-breadcrumb">
          <WikiLink to="overview" onNavigate={onNavigate}>
            {text("Documentação", "Documentation")}
          </WikiLink>
          <span>/</span>
          <span>{text("Componentes", "Components")}</span>
        </div>
        <span className="demo-kicker">{page.eyebrow}</span>
        <h2>{page.name}</h2>
        <p>{page.description}</p>
      </div>

      <div className="wiki-layout wiki-component-layout">
        <aside className="wiki-sidebar">
          <strong>{text("Componentes", "Components")}</strong>
          <nav aria-label={text("Documentação dos componentes", "Component documentation")}>
            <WikiLink to="overview" onNavigate={onNavigate}>
              {text("Visão geral", "Overview")}
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
            <h3>{text("Uso", "Usage")}</h3>
            <p>
              {text(
                "Importe o componente e os tipos diretamente de ",
                "Import the component and types directly from ",
              )}
              <code>react-form-suite</code>.{" "}
              {text(
                "O CSS já acompanha o entrypoint principal.",
                "CSS is already included by the main entry point.",
              )}
            </p>
            <CodeBlock code={page.code} />
          </section>

          {route === "form-builder" && (
            <section className="wiki-section">
              <span className="wiki-section__number">02</span>
              <h3>{text("Configuração do construtor", "Builder configuration")}</h3>
              <p>
                {text("No modo controlado, ", "In controlled mode, ")}
                <code>fields</code>
                {text(
                  " é a fonte de verdade. Use ",
                  " is the source of truth. Use ",
                )}
                <code>allowedTypes</code>
                {text(
                  " para apresentar somente os tipos aceitos pelo seu produto.",
                  " to show only the field types supported by your product.",
                )}
              </p>
              <CodeBlock code={builderTypesCode} />
              <div className="wiki-grid">
                <div className="wiki-card">
                  <strong>{text("Adicionar", "Add")}</strong>
                  <p>{text("Arraste um tipo da paleta ou use duplo clique para inseri-lo no final.", "Drag a type from the palette or double-click it to append it.")}</p>
                </div>
                <div className="wiki-card">
                  <strong>{text("Editar", "Edit")}</strong>
                  <p>{text("Rótulo, descrição, obrigatoriedade, sensibilidade e limites ficam no editor do campo.", "Labels, descriptions, required and sensitive flags, and limits are configured in the field editor.")}</p>
                </div>
                <div className="wiki-card">
                  <strong>{text("Ordenar", "Reorder")}</strong>
                  <p>{text("Arraste os cartões ou use os controles de movimento. A ordem é normalizada automaticamente.", "Drag the cards or use the move controls. Order is normalized automatically.")}</p>
                </div>
              </div>
            </section>
          )}

          {route === "form-renderer" && (
            <section className="wiki-section">
              <span className="wiki-section__number">02</span>
              <h3>{text("Modos de exibição", "Display modes")}</h3>
              <p>
                {text(
                  "Use o componente para fluxos de preenchimento, somente leitura, desabilitados e anônimos.",
                  "Use the component for data entry, read-only, disabled, and anonymous flows.",
                )}
              </p>
              <CodeBlock code={rendererModesCode} />
              <div className="wiki-note wiki-note--compact">
                <strong>{text("Validação explícita", "Explicit validation")}</strong>
                <p>
                  {text("O renderer não decide quando um valor é válido. Execute ", "The renderer does not decide when a value is valid. Run ")}
                  <code>validateForm</code>
                  {text(" no envio e devolva o array resultante em ", " on submit and pass the resulting array to ")}
                  <code>errors</code>.
                </p>
              </div>
            </section>
          )}

          {route === "form-answers" && (
            <section className="wiki-section">
              <span className="wiki-section__number">02</span>
              <h3>{text("Formatação e agrupamento", "Formatting and grouping")}</h3>
              <p>
                {text("Respostas com o mesmo ", "Answers with the same ")}<code>fieldId</code>
                {text(" são agrupadas. Sem identificador, o rótulo é usado como chave. A propriedade ", " are grouped. Without an ID, the label becomes the key. The ")}
                <code>order</code>{text(" preserva a sequência do formulário.", " property preserves form order.")}
              </p>
              <CodeBlock code={answersFormattingCode} language="ts" />
              <div className="wiki-grid">
                <div className="wiki-card">
                  <strong>{text("Datas", "Dates")}</strong>
                  <p>{text("Valores ISO como 2026-07-25 são apresentados no formato 25/07/2026.", "ISO values such as 2026-07-25 are displayed as 07/25/2026 in en-US.")}</p>
                </div>
                <div className="wiki-card">
                  <strong>{text("Múltipla escolha", "Multiple choice")}</strong>
                  <p>{text("Os valores de checkbox são reunidos em uma lista sob o mesmo rótulo.", "Checkbox values are grouped into a list under the same label.")}</p>
                </div>
                <div className="wiki-card">
                  <strong>{text("Sensíveis", "Sensitive")}</strong>
                  <p>{text("Quando sensitive é verdadeiro, o conteúdo é substituído por “Resposta ocultada”.", "When sensitive is true, the content is replaced with “Answer hidden”.")}</p>
                </div>
              </div>
            </section>
          )}

          <section className="wiki-section">
            <span className="wiki-section__number">03</span>
            <h3>{text("Propriedades", "Properties")}</h3>
            <PropsTable rows={page.props.map((row) => [...row])} />
          </section>

          <section className="wiki-section wiki-next-section">
            <span className="wiki-section__number">04</span>
            <h3>{text("Continue explorando", "Keep exploring")}</h3>
            <div className="wiki-component-links">
              {(
                [
                  ["form-builder", "FormBuilder", text("Edite a estrutura do formulário.", "Edit the form structure.")],
                  ["form-renderer", "FormRenderer", text("Colete e valide as respostas.", "Collect and validate answers.")],
                  ["form-answers", "FormAnswers", text("Apresente o resultado enviado.", "Display submitted results.")],
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
  const text = useWikiText()
  const { locale } = useDemoLocale()
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
          <span className="demo-kicker">{text("Documentação", "Documentation")}</span>
          <h2>{text("Crie formulários dinâmicos em React", "Build dynamic forms in React")}</h2>
          <p>
            {text(
              "Um guia prático da instalação ao envio: construa campos visualmente, renderize o formulário e apresente as respostas usando uma API tipada e sem dependências de interface.",
              "A practical guide from installation to submission: build fields visually, render the form, and display answers with a typed API and no UI dependencies.",
            )}
          </p>
          <div
            className="wiki-tags"
            aria-label={text("Características", "Features", "Características")}
          >
            <span>React 18+</span>
            <span>TypeScript</span>
            <span>ESM</span>
            <span>{text("CSS isolado", "Scoped CSS")}</span>
          </div>
        </div>
        <div className="wiki-install">
          <span>{text("Instale o pacote", "Install the package")}</span>
          <CodeBlock code={installCode} language="terminal" />
        </div>
      </div>

      <div className="wiki-layout">
        <aside className="wiki-sidebar">
          <strong>{text("Nesta página", "On this page")}</strong>
          <nav aria-label={text("Sumário da documentação", "Documentation contents")}>
            <a href="#primeiros-passos">{text("Primeiros passos", "Getting started")}</a>
            <a href="#fluxo">{text("Como funciona", "How it works")}</a>
            <a href="#campos">{text("Tipos de campo", "Field types")}</a>
            <a href="#componentes">{text("Componentes", "Components")}</a>
            <a href="#respostas">{text("Respostas e validação", "Answers and validation")}</a>
            <a href="#helpers">Helpers</a>
            <a href="#estilos">{text("Personalização", "Customization")}</a>
          </nav>
        </aside>

        <article className="wiki-content">
          <section id="primeiros-passos" className="wiki-section">
            <span className="wiki-section__number">01</span>
            <h3>{text("Primeiros passos", "Getting started")}</h3>
            <p>
              {text("O entrypoint principal já inclui o CSS da biblioteca. Se o seu bundler exigir uma importação explícita, use ", "The main entry point includes the library CSS. If your bundler requires an explicit import, use ")}
              <code>import "react-form-suite/styles.css"</code>.
            </p>

            <h4>{text("1. Construa a definição", "1. Build the definition")}</h4>
            <p>
              {text("O ", "The ")}<code>FormBuilder</code>{text(" recebe um array de campos e devolve a nova definição a cada edição.", " receives an array of fields and returns a new definition after each edit.")}
            </p>
            <CodeBlock code={builderCode} />

            <h4>{text("2. Renderize e valide", "2. Render and validate")}</h4>
            <p>
              {text("Passe a mesma definição ao ", "Pass the same definition to ")}<code>FormRenderer</code>.
              {text(" As respostas podem ficar no seu estado e ser enviadas para qualquer API.", " Answers can live in your state and be sent to any API.")}
            </p>
            <CodeBlock code={rendererCode} />

            <h4>{text("3. Mostre o resultado", "3. Display the result")}</h4>
            <p>
              {text("O ", "The ")}<code>FormAnswers</code>
              {text(" formata datas, valores monetários e telefones, agrupa múltiplas escolhas e oculta o conteúdo de respostas sensíveis.", " formats dates, currency, and phone values, groups multiple choices, and hides sensitive answers.")}
            </p>
            <CodeBlock code={answersCode} />

            <div className="wiki-note">
              <strong>{text("Controlado ou não controlado?", "Controlled or uncontrolled?")}</strong>
              <p>
                {text("Use ", "Use ")}<code>fields</code>/<code>value</code>
                {text(" quando o estado pertence à aplicação. Para uma integração mais simples, use ", " when state belongs to the application. For a simpler integration, use ")}
                <code>defaultFields</code>/<code>defaultValue</code>.
              </p>
              <CodeBlock code={uncontrolledCode} />
            </div>

            <div className="wiki-note">
              <strong>{text("Idiomas e formatos regionais", "Languages and regional formats")}</strong>
              <p>
                {text(
                  "Use o provider para aplicar um locale à árvore inteira, ou a prop locale em um componente. Os objetos exportados também servem como base tipada para novas traduções.",
                  "Use the provider to apply a locale to the entire tree, or the locale prop on one component. Exported locale objects are also typed foundations for additional languages.",
                )}
              </p>
              <CodeBlock code={localeCode} />
            </div>
          </section>

          <section id="fluxo" className="wiki-section">
            <span className="wiki-section__number">02</span>
            <h3>{text("Como a biblioteca funciona", "How the library works")}</h3>
            <div className="wiki-flow">
              <div>
                <span>1</span>
                <strong>{text("Definição", "Definition")}</strong>
                <p>{text("O builder cria um array portátil de ", "The builder creates a portable ")}<code>FormField</code>{text(".", " array.")}</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>2</span>
                <strong>{text("Preenchimento", "Data entry")}</strong>
                <p>{text("O renderer transforma campos em controles e produz ", "The renderer turns fields into controls and produces ")}<code>FormAnswer[]</code>.</p>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>3</span>
                <strong>{text("Saída", "Output")}</strong>
                <p>{text("Valide, persista na sua API ou apresente com ", "Validate, persist to your API, or display with ")}<code>FormAnswers</code>.</p>
              </div>
            </div>

            <h4>{text("Contrato de um campo", "Field contract")}</h4>
            <CodeBlock code={fieldCode} />
            <p className="wiki-caption">
              <code>id</code>{text(" é opcional, mas recomendado para relacionar respostas sem depender do rótulo. ", " is optional but recommended for matching answers without relying on labels. ")}
              <code>order</code>{text(" define a sequência visual.", " defines the visual order.")}
            </p>
          </section>

          <section id="campos" className="wiki-section">
            <span className="wiki-section__number">03</span>
            <h3>{text("Tipos de campo", "Field types")}</h3>
            <p>
              {text("Restrinja a paleta do construtor com ", "Limit the builder palette with ")}<code>allowedTypes</code>
              {text(" quando seu produto aceitar apenas parte do catálogo.", " when your product supports only part of the catalog. In en-US, CPF and CNPJ are hidden and CEP is presented as ZIP code.")}
            </p>
            <div className="wiki-table-wrap">
              <table className="wiki-table">
                <thead>
                  <tr>
                    <th>{text("Tipo", "Type")}</th>
                    <th>{text("Uso", "Usage")}</th>
                    <th>{text("Configurações relevantes", "Relevant settings")}</th>
                  </tr>
                </thead>
                <tbody>
                  {(locale === "en-US"
                    ? fieldTypesEn
                    : locale === "es-ES"
                      ? fieldTypesEs
                      : locale === "fr-FR"
                        ? fieldTypesFr
                        : fieldTypes
                  ).map(([type, description, settings]) => (
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
              <strong>{text("Opções e valores padrão", "Options and default values")}</strong>
              <p>
                {text("Em campos de seleção, cada item usa ", "In choice fields, each item uses ")}<code>{`{ order, value, selected? }`}</code>.
                {text(" Uma opção marcada com ", " An option marked as ")}<code>selected</code>
                {text(" entra nas respostas iniciais. ", " is included in the initial answers. ")}<code>checkbox-group</code>
                {text(" aceita várias.", " supports multiple values.")}
              </p>
            </div>
          </section>

          <section id="componentes" className="wiki-section">
            <span className="wiki-section__number">04</span>
            <h3>{text("Referência dos componentes", "Component reference")}</h3>
            <p>{text("Cada componente possui uma página própria com exemplos, comportamentos e referência completa de props.", "Each component has its own page with examples, behavior, and a complete prop reference.")}</p>
            <div className="wiki-component-links wiki-component-links--overview">
              <WikiLink to="form-builder" onNavigate={navigate}>
                <span>FormBuilder</span>
                <small>{text("Construa e edite a definição do formulário.", "Build and edit the form definition.")}</small>
                <i aria-hidden="true">→</i>
              </WikiLink>
              <WikiLink to="form-renderer" onNavigate={navigate}>
                <span>FormRenderer</span>
                <small>{text("Renderize campos, colete valores e mostre erros.", "Render fields, collect values, and display errors.")}</small>
                <i aria-hidden="true">→</i>
              </WikiLink>
              <WikiLink to="form-answers" onNavigate={navigate}>
                <span>FormAnswers</span>
                <small>{text("Agrupe, proteja e apresente as respostas.", "Group, protect, and display answers.")}</small>
                <i aria-hidden="true">→</i>
              </WikiLink>
            </div>
          </section>

          <section id="respostas" className="wiki-section">
            <span className="wiki-section__number">05</span>
            <h3>{text("Respostas, validação e privacidade", "Answers, validation, and privacy")}</h3>
            <p>
              {text(
                "Cada resposta carrega os dados necessários para ser persistida e apresentada sem consultar novamente o campo original. Múltiplas escolhas geram uma resposta por opção.",
                "Each answer contains the data needed to persist and display it without looking up the original field. Multiple choices produce one answer per option.",
              )}
            </p>
            <CodeBlock code={answerShapeCode} language="ts" />

            <div className="wiki-grid">
              <div className="wiki-card">
                <strong>{text("Validação", "Validation")}</strong>
                <p>
                  <code>validateForm</code>{text(" verifica campos obrigatórios e ", " checks required fields and text ")}
                  <code>minlength</code>{text(" em textos. O retorno é sempre ", ". It always returns ")}
                  <code>FormError[]</code>.
                </p>
              </div>
              <div className="wiki-card">
                <strong>{text("Campos sensíveis", "Sensitive fields")}</strong>
                <p>
                  {text("Marque o campo com ", "Mark the field with ")}<code>sensitive: true</code>.
                  {text(" O resumo oculta o valor, mas preserva a indicação de conteúdo protegido.", " The summary hides its value while preserving the protected-content indicator.")}
                </p>
              </div>
              <div className="wiki-card">
                <strong>{text("Modo anônimo", "Anonymous mode")}</strong>
                <p>
                  {text("Com ", "With ")}<code>anonymous</code>
                  {text(", campos sensíveis não são renderizados nem considerados na validação.", ", sensitive fields are neither rendered nor included in validation.")}
                </p>
              </div>
            </div>
            <CodeBlock code={anonymousCode} />
          </section>

          <section id="helpers" className="wiki-section">
            <span className="wiki-section__number">06</span>
            <h3>{text("Helpers e constantes", "Helpers and constants")}</h3>
            <div className="wiki-helper-groups">
              <div>
                <strong>{text("Campos e opções", "Fields and options")}</strong>
                <code>createField</code>
                <code>duplicateField</code>
                <code>normalizeFields</code>
                <code>normalizeOptions</code>
                <code>isFieldType</code>
              </div>
              <div>
                <strong>{text("Respostas", "Answers")}</strong>
                <code>createAnswer</code>
                <code>answerForField</code>
                <code>answersForField</code>
                <code>getDefaultAnswers</code>
                <code>setFieldAnswer</code>
                <code>toggleFieldAnswer</code>
              </div>
              <div>
                <strong>{text("Validação e máscaras", "Validation and masks")}</strong>
                <code>validateForm</code>
                <code>maskDigits</code>
                <code>maskCurrency</code>
                <code>maskPhone</code>
              </div>
              <div>
                <strong>{text("Catálogo", "Catalog")}</strong>
                <code>FIELD_TYPES</code>
                <code>FIELD_CATALOG</code>
                <code>DEFAULT_CURRENCY_PREFIX</code>
                <code>DEFAULT_PHONE_PREFIX</code>
                <code>PT_BR_LOCALE</code>
                <code>EN_US_LOCALE</code>
                <code>ES_ES_LOCALE</code>
                <code>FR_FR_LOCALE</code>
                <code>FormBuilderLocaleProvider</code>
              </div>
            </div>
          </section>

          <section id="estilos" className="wiki-section">
            <span className="wiki-section__number">07</span>
            <h3>{text("Personalização visual", "Visual customization")}</h3>
            <p>
              {text("As classes internas usam o prefixo ", "Internal classes use the ")}<code>rfs-</code>
              {text(" . Para temas, prefira sobrescrever as variáveis CSS em uma classe da sua aplicação.", " prefix. For themes, override the CSS variables in one of your application classes.")}
            </p>
            <CodeBlock code={themeCode} language="css" />
            <CodeBlock code={themeUsageCode} />
          </section>

        </article>
      </div>
    </section>
  )
}
