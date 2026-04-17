export interface Profile {
  name: string;
  title: string;
  email: string;
  heroSummary: string;
  intro: string;
  valueTitle: string;
  strengths: Array<{
    title: string;
    description: string;
  }>;
  personalNotesTitle: string;
  personalNotes: string[];
}

export const profile: Profile = {
  name: "Fabien Rouget",
  title: "Ingénieur logiciel • Lead tech • C#  • Freelance",
  email: "freelance@fabien-rouget.fr",
  heroSummary:
    "10 ans d’expérience en backend .NET sur des systèmes distribués à forte volumétrie, de la conception d’architecture à l’accompagnement des équipes.",
  intro:
    "J’accompagne des équipes et des produits sur des sujets de backend, d’architecture et d’intégration, de la conception jusqu’à la mise en production et à l’amélioration continue.",
  valueTitle: "Expertise",
  strengths: [
    {
      title: "Backend C#",
      description:
        "API C#/.NET et systèmes event-driven conçus pour la scabilité et la montée en charge.",
    },
    {
      title: "Architecture et qualité logicielle",
      description:
        "Mise en place d’architectures évolutives, avec un fort focus sur la qualité logicielle, les tests, l’observabilité et la performance.",
    },
    {
      title: "Cadrage et accompagnement technique",
      description:
        "Cadrage technique, arbitrage des décisions structurantes, accompagnement des équipes et sécurisation des livraisons."
    },
  ],
  personalNotesTitle: "En dehors du code",
  personalNotes: ["Fervent partisan du BÉPO", "Ceinture noire de judo"],
};
