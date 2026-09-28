import type { Profile } from "../types.ts";

export const profile: Profile = {
  name: "Fabien Rouget",
  title: "Software Engineer • Tech Lead • C# • Freelance",
  email: "freelance@fabien-rouget.fr",
  heroSummary:
    "10 years of .NET backend experience on high-volume distributed systems, from architecture design to team mentoring.",
  photo: {
    src: "/images/fabien-rouget.jpeg",
    alt: "Portrait of Fabien Rouget",
  },
  intro:
    "I support teams and products across backend engineering, software architecture, and system integration, from initial design to production rollout and continuous improvement.",
  valueTitle: "Expertise",
  strengths: [
    {
      title: "C# Backend",
      description:
        "C#/.NET APIs and event-driven systems designed for scalability and high throughput.",
    },
    {
      title: "Architecture & Software Quality",
      description:
        "Design and implementation of scalable, maintainable architectures with a strong focus on software quality, testing, observability, and performance.",
    },
    {
      title: "Technical Leadership & Scoping",
      description:
        "Technical scoping, architectural trade-offs, team mentoring, and reliable production delivery.",
    },
    {
      title: "AI-Assisted Development",
      description:
        "Leveraging AI tools and agentic workflows to accelerate development, code analysis, and delivery.",
    },
  ],
  personalNotesTitle: "Beyond the code",
  personalNotes: ["Avid BÉPO keyboard layout advocate", "Judo black belt"],
};
