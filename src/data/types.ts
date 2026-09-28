export type Locale = "en" | "fr";

export interface Profile {
  name: string;
  title: string;
  email: string;
  heroSummary: string;
  photo: {
    src: string;
    alt: string;
  };
  intro: string;
  valueTitle: string;
  strengths: Array<{
    title: string;
    description: string;
  }>;
  personalNotesTitle: string;
  personalNotes: string[];
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: string;
}

export interface Experience {
  role: string;
  company: string;
  logo: {
    src: string;
    alt: string;
  };
  location: string;
  period: string;
  startDate: string;
  endDate?: string;
  context: string;
  impacts: string[];
  stack: string[];
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export interface Education {
  degree: string;
  details: string;
}

export interface UiLabels {
  navAriaLabel: string;
  languageSwitchAriaLabel: string;
  profileNav: string;
  experiencesTitle: string;
  skillsTitle: string;
  educationTitle: string;
  contactAction: string;
  contactActionAriaPrefix: string;
  pdfFilename: string;
  pdfFooterPrefix: string;
}
