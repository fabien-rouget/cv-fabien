import type { ContactLink } from "../types.ts";

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "freelance@fabien-rouget.fr",
    href: "mailto:freelance@fabien-rouget.fr",
  },
  {
    label: "Linkedin",
    value: "Linkedin",
    href: "https://www.linkedin.com/in/fabien-rouget/",
    external: true,
  },
  {
    label: "PDF",
    value: "Télécharger le CV",
    href: "/cv-fabien-rouget-fr.pdf",
    download: "Fabien_Rouget_CV_FR.pdf",
  },
];
