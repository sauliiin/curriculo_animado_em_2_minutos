export type Lang = 'pt' | 'en';

export interface NavItem {
  label: string;
  /** Id de uma seção da página atual (rolagem suave). */
  fragment?: string;
  /** Rota interna do Angular. */
  route?: string;
  /** Link externo. */
  href?: string;
}

export interface Slide {
  img: string;
  alt: string;
  caption: string;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  /** Valor inicial da contagem (padrão 0) — permite contar "para baixo", ex.: 90 → 30. */
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface SkillGroup {
  name: string;
  icon: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

export interface Fact {
  label: string;
  value: string;
}

export interface FeaturedProject {
  /** Âncora na página de projetos. */
  id: string;
  title: string;
  text: string;
  metric: string;
  tags: string[];
  link?: LinkItem;
}

export interface Education {
  course: string;
  school: string;
  period: string;
}

export interface HomeContent {
  pageTitle: string;
  nav: NavItem[];
  hero: {
    badge: string;
    ctaContact: string;
    ctaCv: string;
    title: string;
    subtitle: string;
    subtitleAfter: string;
    photoFunAlt: string;
    photoRealAlt: string;
    caption: string;
    scrollHint: string;
  };
  hobbies: {
    title: string;
    slides: Slide[];
    prev: string;
    next: string;
    goTo: string;
  };
  prefeitura: {
    title: string;
    intro: string;
    realizedBefore: string;
    realizedTyped: string;
    realizedAfter: string;
    /** HTML simples (strong). */
    flowIntro: string;
    fluxoAlt: string;
    processoAlt: string;
    mobileHint: string;
    popover: string[];
  };
  services: {
    title: string;
    links: LinkItem[];
  };
  fluxao: {
    title: string;
    /** HTML simples (strong). */
    paragraphs: string[];
    stats: Stat[];
    alt: string;
    /** HTML simples (strong). */
    instruction: string;
    zoomIn: string;
    zoomOut: string;
    reset: string;
  };
  snapshot: {
    title: string;
    /** Resumo profissional do currículo (HTML simples). */
    summary: string;
    stats: Stat[];
    facts: Fact[];
  };
  featured: {
    title: string;
    subtitle: string;
    details: string;
    all: string;
    items: FeaturedProject[];
  };
  about: {
    title: string;
    text: string;
    quote: string;
  };
  skills: {
    title: string;
    groups: SkillGroup[];
  };
  experience: {
    title: string;
    items: Experience[];
  };
  education: {
    title: string;
    items: Education[];
    languagesTitle: string;
    languages: string[];
  };
  cta: {
    title: string;
    text: string;
    button: string;
    buttonAria: string;
  };
  contact: {
    name: string;
    title: string;
    location: string;
    phoneLabel: string;
    phone: string;
    emailLabel: string;
    email: string;
    copy: string;
    copied: string;
    whatsapp: string;
    whatsappMessage: string;
    sendEmail: string;
    close: string;
    cv: string;
    cvHref: string;
    floating: string;
  };
}

export type ProjectBlock =
  | { type: 'p'; html: string }
  | { type: 'list'; items: string[] }
  | { type: 'heading'; text: string }
  | { type: 'flow'; steps: string[] }
  | { type: 'tree'; text: string }
  | { type: 'video'; src: string }
  | { type: 'summary'; html: string };

export interface Project {
  id: string;
  nav: string;
  title: string;
  tags: string[];
  links?: LinkItem[];
  blocks: ProjectBlock[];
}

export interface ProjectsContent {
  pageTitle: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  back: string;
  others: string;
  projects: Project[];
}

export interface SiteContent {
  controls: {
    themeLabel: string;
    langSwitch: string;
    langSwitchAria: string;
  };
  home: HomeContent;
  projects: ProjectsContent;
}
