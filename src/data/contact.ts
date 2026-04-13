export interface ContactLink {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

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
];
