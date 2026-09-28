import type { ContactLink } from "../types.ts";

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "freelance@fabien-rouget.fr",
    href: "mailto:freelance@fabien-rouget.fr",
  },
  {
    label: "Linkedin",
    value: "LinkedIn",
    href: "https://www.linkedin.com/in/fabien-rouget/",
    external: true,
  },
  {
    label: "PDF",
    value: "Download CV",
    href: "/cv-fabien-rouget-en.pdf",
    download: "Fabien_Rouget_CV_EN.pdf",
  },
];
