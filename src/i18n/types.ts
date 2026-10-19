export type Locale = 'ar' | 'en';

export const LOCALES: Locale[] = ['ar', 'en'];

export type SectionId =
  | 'home'
  | 'about'
  | 'vision'
  | 'objectives'
  | 'mission'
  | 'services'
  | 'achievements'
  | 'clients'
  | 'contact';

export interface Dictionary {
  meta: { title: string; description: string; ogLocale: string };
  nav: Record<SectionId, string> & { label: string; open: string; close: string };
  controls: {
    language: string;
    toDark: string;
    toLight: string;
    skip: string;
    backToTop: string;
  };
  intro: { caption: string };
  hero: {
    category: string;
    lead: string;
    support: string;
    ctaServices: string;
    ctaContact: string;
    dashboard: string;
    cards: { analysis: string; reports: string; indicators: string };
  };
  about: {
    title: string;
    paragraphs: string[];
    foundedLabel: string;
    incubatedLabel: string;
    incubators: string[];
    imageAlt: string;
  };
  vision: { title: string; items: string[] };
  objectives: { title: string; items: string[] };
  mission: { title: string; paragraphs: string[]; imageAlt: string };
  services: {
    title: string;
    items: { title: string; tag?: string; description: string }[];
  };
  achievements: { title: string; items: string[] };
  why: {
    title: string;
    items: { title: string; description: string }[];
    imageAlt: string;
  };
  clients: { title: string };
  contact: {
    title: string;
    location: string;
    labels: { phone: string; email: string; location: string; social: string };
    form: {
      title: string;
      name: string;
      email: string;
      phone: string;
      message: string;
      submit: string;
      note: string;
      subject: string;
    };
  };
}
