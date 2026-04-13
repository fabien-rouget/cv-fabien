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
  title: "Ingénieur logiciel • Technical lead • C#",
  email: "freelance@fabien-rouget.fr",
  heroSummary:
    "Je conçois et pilote des systèmes backend fiables à forte volumétrie, et j’accompagne les équipes dans les décisions techniques clés.",
  intro:
    "J’accompagne des équipes et des produits sur des sujets de backend, d’architecture et d’intégration, de la conception jusqu’à la mise en production et à l’amélioration continue.",
  valueTitle: "Ce que j’apporte",
  strengths: [
    {
      title: "Backend C#",
      description:
        "Conception et mise en production d’API C#/.NET et de systèmes event-driven performants et maintenables, avec une forte exigence de qualité et de robustesse.",
    },
    {
      title: "Architecture et qualité logicielle",
      description:
        "Mise en place d’architectures évolutives, avec un fort focus sur la qualité logicielle, les tests, l’observabilité et la performance.",
    },
    {
      title: "Cadrage et accompagnement technique",
      description:
        "Cadrage technique des projets, arbitrage des choix structurants, accompagnement des équipes et sécurisation des livraisons.",
    },
  ],
  personalNotesTitle: "En dehors du code",
  personalNotes: ["Fervent partisan du BÉPO", "Ceinture noire de judo"],
};
