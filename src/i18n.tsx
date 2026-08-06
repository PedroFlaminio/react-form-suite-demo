import { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { BuiltInLocale } from "react-form-builder"

export type DemoLocale = BuiltInLocale

const messages = {
  "pt-BR": {
    language: "Idioma",
    portuguese: "Português",
    english: "English",
    spanish: "Español",
    french: "Français",
    docs: "Documentação",
    docsSubtitle: "Documentação",
    backToDemo: "← Voltar para a demo",
    enableTheme: (theme: string) => `Ativar tema ${theme}`,
    dark: "escuro",
    light: "claro",
    darkLabel: "Escuro",
    lightLabel: "Claro",
    eyebrow: "Pacote React + TypeScript",
    title: "Formulários que começam simples.",
    intro:
      "Construa a estrutura, teste o preenchimento, confira as respostas e veja o JSON — tudo usando somente a API pública dos componentes.",
    demosAria: "Demonstrações",
    builderTab: "Construtor",
    formTab: "Formulário",
    answersTab: "Respostas",
    structure: "Estrutura",
    buildForm: "Monte seu formulário",
    fields: (count: number) => `${count} campo${count === 1 ? "" : "s"}`,
    interactivePreview: "Prévia interativa",
    previewIntro:
      "Os valores são controlados pelo projeto de demonstração. Campos obrigatórios usam a validação exportada pela biblioteca.",
    answers: (count: number) => `${count} resposta${count === 1 ? "" : "s"}`,
    newRequest: "Nova solicitação",
    localData: "Todos os dados ficam neste navegador",
    submitDemo: "Enviar demonstração",
    validForm: (count: number) =>
      `Formulário válido. ${count} resposta(s) prontas para envio.`,
    submittedAnswers: "Respostas enviadas",
    answersIntro:
      "Este componente recebe diretamente o array produzido pelo FormRenderer e agrupa respostas múltiplas por campo.",
    emptyAnswers:
      "Preencha e envie o formulário na etapa anterior para exibir as respostas aqui.",
    editAnswers: "Editar respostas",
    goToForm: "Ir para o formulário",
    portableContract: "Contrato portátil",
    jsonDefinition: "Definição em JSON",
    answersJson: "Respostas em JSON",
    viewJson: "Ver JSON",
    copyJson: "Copiar JSON",
    closeModal: "Fechar modal",
    footer: "TypeScript · ESM · CSS isolado",
    initialFields: {
      name: "Nome completo",
      namePlaceholder: "Digite seu nome completo",
      nameHelp: "Informe como você gostaria de ser identificado.",
      emailHelp: "Usaremos este endereço apenas para entrar em contato.",
      date: "Data de referência",
      quantity: "Quantidade",
      quantityHelp: "Escolha um valor entre 1 e 20.",
      quantityPlaceholder: "Digite uma quantidade",
      category: "Categoria",
      categoryPlaceholder: "Selecione uma categoria",
      categories: ["Geral", "Pessoal", "Profissional"],
      contact: "Preferência de contato",
      contacts: ["E-mail", "Telefone", "Sem preferência"],
      interests: "Áreas de interesse",
      interestOptions: ["Tecnologia", "Design", "Negócios", "Educação"],
      notes: "Observações",
      notesPlaceholder: "Adicione outras informações que considerar relevantes...",
      postalCode: "CEP",
      postalCodePlaceholder: "00000-000",
    },
  },
  "en-US": {
    language: "Language",
    portuguese: "Português",
    english: "English",
    spanish: "Español",
    french: "Français",
    docs: "Documentation",
    docsSubtitle: "Documentation",
    backToDemo: "← Back to demo",
    enableTheme: (theme: string) => `Enable ${theme} theme`,
    dark: "dark",
    light: "light",
    darkLabel: "Dark",
    lightLabel: "Light",
    eyebrow: "React + TypeScript package",
    title: "Forms that start simple.",
    intro:
      "Build the structure, test the form, review the answers, and inspect the JSON — using only the components' public API.",
    demosAria: "Demos",
    builderTab: "Builder",
    formTab: "Form",
    answersTab: "Answers",
    structure: "Structure",
    buildForm: "Build your form",
    fields: (count: number) => `${count} field${count === 1 ? "" : "s"}`,
    interactivePreview: "Interactive preview",
    previewIntro:
      "Values are controlled by the demo project. Required fields use the validation exported by the library.",
    answers: (count: number) => `${count} answer${count === 1 ? "" : "s"}`,
    newRequest: "New request",
    localData: "All data stays in this browser",
    submitDemo: "Submit demo",
    validForm: (count: number) =>
      `Valid form. ${count} answer${count === 1 ? " is" : "s are"} ready to submit.`,
    submittedAnswers: "Submitted answers",
    answersIntro:
      "This component receives the array produced by FormRenderer and groups multiple answers by field.",
    emptyAnswers:
      "Fill out and submit the form in the previous step to display the answers here.",
    editAnswers: "Edit answers",
    goToForm: "Go to form",
    portableContract: "Portable contract",
    jsonDefinition: "JSON definition",
    answersJson: "Answers as JSON",
    viewJson: "View JSON",
    copyJson: "Copy JSON",
    closeModal: "Close modal",
    footer: "TypeScript · ESM · scoped CSS",
    initialFields: {
      name: "Full name",
      namePlaceholder: "Enter your full name",
      nameHelp: "Tell us how you would like to be identified.",
      emailHelp: "We will only use this address to contact you.",
      date: "Reference date",
      quantity: "Quantity",
      quantityHelp: "Choose a value from 1 to 20.",
      quantityPlaceholder: "Enter a quantity",
      category: "Category",
      categoryPlaceholder: "Select a category",
      categories: ["General", "Personal", "Professional"],
      contact: "Contact preference",
      contacts: ["Email", "Phone", "No preference"],
      interests: "Areas of interest",
      interestOptions: ["Technology", "Design", "Business", "Education"],
      notes: "Notes",
      notesPlaceholder: "Add any other information you consider relevant...",
      postalCode: "ZIP code",
      postalCodePlaceholder: "00000-0000",
    },
  },
  "es-ES": {
    language: "Idioma",
    portuguese: "Português",
    english: "English",
    spanish: "Español",
    french: "Français",
    docs: "Documentación",
    docsSubtitle: "Documentación",
    backToDemo: "← Volver a la demo",
    enableTheme: (theme: string) => `Activar tema ${theme}`,
    dark: "oscuro",
    light: "claro",
    darkLabel: "Oscuro",
    lightLabel: "Claro",
    eyebrow: "Paquete React + TypeScript",
    title: "Formularios que empiezan de forma sencilla.",
    intro:
      "Construye la estructura, prueba el formulario, revisa las respuestas y consulta el JSON, utilizando únicamente la API pública de los componentes.",
    demosAria: "Demostraciones",
    builderTab: "Constructor",
    formTab: "Formulario",
    answersTab: "Respuestas",
    structure: "Estructura",
    buildForm: "Construye tu formulario",
    fields: (count: number) => `${count} campo${count === 1 ? "" : "s"}`,
    interactivePreview: "Vista previa interactiva",
    previewIntro:
      "Los valores están controlados por el proyecto de demostración. Los campos obligatorios usan la validación exportada por la biblioteca.",
    answers: (count: number) => `${count} respuesta${count === 1 ? "" : "s"}`,
    newRequest: "Nueva solicitud",
    localData: "Todos los datos permanecen en este navegador",
    submitDemo: "Enviar demostración",
    validForm: (count: number) =>
      `Formulario válido. ${count} respuesta${count === 1 ? "" : "s"} lista${count === 1 ? "" : "s"} para enviar.`,
    submittedAnswers: "Respuestas enviadas",
    answersIntro:
      "Este componente recibe directamente el array producido por FormRenderer y agrupa las respuestas múltiples por campo.",
    emptyAnswers:
      "Completa y envía el formulario en el paso anterior para mostrar aquí las respuestas.",
    editAnswers: "Editar respuestas",
    goToForm: "Ir al formulario",
    portableContract: "Contrato portable",
    jsonDefinition: "Definición JSON",
    answersJson: "Respuestas en JSON",
    viewJson: "Ver JSON",
    copyJson: "Copiar JSON",
    closeModal: "Cerrar modal",
    footer: "TypeScript · ESM · CSS aislado",
    initialFields: {
      name: "Nombre completo",
      namePlaceholder: "Introduce tu nombre completo",
      nameHelp: "Indica cómo quieres que te identifiquemos.",
      emailHelp: "Solo utilizaremos esta dirección para contactar contigo.",
      date: "Fecha de referencia",
      quantity: "Cantidad",
      quantityHelp: "Elige un valor entre 1 y 20.",
      quantityPlaceholder: "Introduce una cantidad",
      category: "Categoría",
      categoryPlaceholder: "Selecciona una categoría",
      categories: ["General", "Personal", "Profesional"],
      contact: "Preferencia de contacto",
      contacts: ["Correo electrónico", "Teléfono", "Sin preferencia"],
      interests: "Áreas de interés",
      interestOptions: ["Tecnología", "Diseño", "Negocios", "Educación"],
      notes: "Observaciones",
      notesPlaceholder: "Añade cualquier otra información que consideres relevante...",
      postalCode: "Código postal",
      postalCodePlaceholder: "00000",
    },
  },
  "fr-FR": {
    language: "Langue",
    portuguese: "Português",
    english: "English",
    spanish: "Español",
    french: "Français",
    docs: "Documentation",
    docsSubtitle: "Documentation",
    backToDemo: "← Retour à la démo",
    enableTheme: (theme: string) => `Activer le thème ${theme}`,
    dark: "sombre",
    light: "clair",
    darkLabel: "Sombre",
    lightLabel: "Clair",
    eyebrow: "Package React + TypeScript",
    title: "Des formulaires simples dès le départ.",
    intro:
      "Construisez la structure, testez le formulaire, consultez les réponses et inspectez le JSON — uniquement avec l’API publique des composants.",
    demosAria: "Démonstrations",
    builderTab: "Constructeur",
    formTab: "Formulaire",
    answersTab: "Réponses",
    structure: "Structure",
    buildForm: "Construisez votre formulaire",
    fields: (count: number) => `${count} champ${count === 1 ? "" : "s"}`,
    interactivePreview: "Aperçu interactif",
    previewIntro:
      "Les valeurs sont contrôlées par le projet de démonstration. Les champs obligatoires utilisent la validation exportée par la bibliothèque.",
    answers: (count: number) => `${count} réponse${count === 1 ? "" : "s"}`,
    newRequest: "Nouvelle demande",
    localData: "Toutes les données restent dans ce navigateur",
    submitDemo: "Envoyer la démonstration",
    validForm: (count: number) =>
      `Formulaire valide. ${count} réponse${count === 1 ? " est prête" : "s sont prêtes"} à être envoyée${count === 1 ? "" : "s"}.`,
    submittedAnswers: "Réponses envoyées",
    answersIntro:
      "Ce composant reçoit directement le tableau produit par FormRenderer et regroupe les réponses multiples par champ.",
    emptyAnswers:
      "Remplissez et envoyez le formulaire à l’étape précédente pour afficher les réponses ici.",
    editAnswers: "Modifier les réponses",
    goToForm: "Accéder au formulaire",
    portableContract: "Contrat portable",
    jsonDefinition: "Définition JSON",
    answersJson: "Réponses en JSON",
    viewJson: "Voir le JSON",
    copyJson: "Copier le JSON",
    closeModal: "Fermer la fenêtre",
    footer: "TypeScript · ESM · CSS isolé",
    initialFields: {
      name: "Nom complet",
      namePlaceholder: "Saisissez votre nom complet",
      nameHelp: "Indiquez comment vous souhaitez être identifié.",
      emailHelp: "Nous utiliserons cette adresse uniquement pour vous contacter.",
      date: "Date de référence",
      quantity: "Quantité",
      quantityHelp: "Choisissez une valeur entre 1 et 20.",
      quantityPlaceholder: "Saisissez une quantité",
      category: "Catégorie",
      categoryPlaceholder: "Sélectionnez une catégorie",
      categories: ["Général", "Personnel", "Professionnel"],
      contact: "Préférence de contact",
      contacts: ["E-mail", "Téléphone", "Sans préférence"],
      interests: "Centres d’intérêt",
      interestOptions: ["Technologie", "Design", "Entreprise", "Éducation"],
      notes: "Observations",
      notesPlaceholder: "Ajoutez toute autre information que vous jugez utile...",
      postalCode: "Code postal",
      postalCodePlaceholder: "00000",
    },
  },
} as const

export type DemoMessages =
  | (typeof messages)["pt-BR"]
  | (typeof messages)["en-US"]
  | (typeof messages)["es-ES"]
  | (typeof messages)["fr-FR"]

const DemoLocaleContext = createContext<{
  locale: DemoLocale
  messages: DemoMessages
}>({ locale: "pt-BR", messages: messages["pt-BR"] })

export function DemoLocaleProvider({
  locale,
  children,
}: {
  locale: DemoLocale
  children: ReactNode
}) {
  return (
    <DemoLocaleContext.Provider value={{ locale, messages: messages[locale] }}>
      {children}
    </DemoLocaleContext.Provider>
  )
}

export function useDemoLocale() {
  return useContext(DemoLocaleContext)
}

export function getDemoMessages(locale: DemoLocale): DemoMessages {
  return messages[locale]
}
