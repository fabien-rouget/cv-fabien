import { contactLinks as enContactLinks } from "./en/contact.ts";
import { educationItems as enEducationItems } from "./en/education.ts";
import { experiences as enExperiences } from "./en/experience.ts";
import { profile as enProfile } from "./en/profile.ts";
import { skillCategories as enSkillCategories } from "./en/skills.ts";
import { contactLinks as frContactLinks } from "./fr/contact.ts";
import { educationItems as frEducationItems } from "./fr/education.ts";
import { experiences as frExperiences } from "./fr/experience.ts";
import { profile as frProfile } from "./fr/profile.ts";
import { skillCategories as frSkillCategories } from "./fr/skills.ts";
import type {
  ContactLink,
  Education,
  Experience,
  Locale,
  Profile,
  SkillCategory,
  UiLabels,
} from "./types.ts";

export interface CvData {
  locale: Locale;
  profile: Profile;
  contactLinks: ContactLink[];
  experiences: Experience[];
  skillCategories: SkillCategory[];
  educationItems: Education[];
  ui: UiLabels;
}

const uiByLocale: Record<Locale, UiLabels> = {
  en: {
    navAriaLabel: "Section navigation",
    languageSwitchAriaLabel: "Language selector",
    profileNav: "Profile",
    experiencesTitle: "Experience",
    skillsTitle: "Skills",
    educationTitle: "Education",
    contactAction: "Contact me",
    contactActionAriaPrefix: "Contact me by email at",
    pdfFilename: "cv-fabien-rouget-en.pdf",
    pdfFooterPrefix: "Fabien Rouget - CV - page",
  },
  fr: {
    navAriaLabel: "Navigation des sections",
    languageSwitchAriaLabel: "Choix de la langue",
    profileNav: "Profil",
    experiencesTitle: "Expériences",
    skillsTitle: "Compétences",
    educationTitle: "Formations",
    contactAction: "Me contacter",
    contactActionAriaPrefix: "Me contacter par email à",
    pdfFilename: "cv-fabien-rouget-fr.pdf",
    pdfFooterPrefix: "Fabien Rouget - CV - page",
  },
};

export const cvDataByLocale: Record<Locale, CvData> = {
  en: {
    locale: "en",
    profile: enProfile,
    contactLinks: enContactLinks,
    experiences: enExperiences,
    skillCategories: enSkillCategories,
    educationItems: enEducationItems,
    ui: uiByLocale.en,
  },
  fr: {
    locale: "fr",
    profile: frProfile,
    contactLinks: frContactLinks,
    experiences: frExperiences,
    skillCategories: frSkillCategories,
    educationItems: frEducationItems,
    ui: uiByLocale.fr,
  },
};

export const locales: Locale[] = ["en", "fr"];

export const getCvData = (locale: Locale): CvData => cvDataByLocale[locale];
