export interface Profile {
  name: string;
  title: string;
  email: string;
  positioning: string;
  heroSummary: string;
  intro: string;
  valueTitle: string;
  valueIntro: string;
  strengths: Array<{
    title: string;
    description: string;
  }>;
  personalNotesTitle: string;
  personalNotes: string[];
}

export const profile: Profile = {
  name: "Fabien Rouget",
  title: "Ingénieur logiciel C#",
  email: "freelance@fabien-rouget.fr",
  positioning:
    "Leader technique spécialisé en backend C#, API REST, architecture applicative et .NET 8.",
  heroSummary:
    "J’accompagne la conception et l’évolution de services backend fiables, de flux événementiels et de processus ETL, en lien étroit avec les enjeux produit et métier.",
  intro:
    "Ingénieur logiciel et leader technique indépendant basé à Bordeaux, j’ai acquis plus de 8 ans d'expérience dans le développement et la conception de solutions informatiques innovantes. Spécialiste du backend en C#, j’ai notamment intégré et piloté des projets exploitant des architectures microservices, des API REST performantes, des flux événementiels et des processus ETL, aussi bien en environnements on-premise que cloud.",
  valueTitle: "Ce que j’apporte",
  valueIntro:
    "Une intervention à la fois technique, structurante et orientée livraison, pour faire avancer un produit, une équipe et une architecture.",
  strengths: [
    {
      title: "Expertise technique",
      description:
        "Une expérience et une maîtrise des technologies actuelles pour concevoir des solutions fiables et évolutives, incluant la mise en place de systèmes de monitoring et de testing.",
    },
    {
      title: "Vision proactive",
      description:
        "Anticiper les défis technologiques pour transformer des idées en projets concrets, alignés avec les objectifs commerciaux.",
    },
    {
      title: "Accompagnement fonctionnel",
      description:
        "Soutien dans la définition et la mise en œuvre des besoins fonctionnels pour garantir des solutions pertinentes.",
    },
    {
      title: "Leadership collaboratif",
      description:
        "Management technique favorisant la coopération et le développement des compétences, assurant le succès à long terme des projets.",
    },
  ],
  personalNotesTitle: "En dehors du code",
  personalNotes: ["Fervent partisan du BÉPO", "Ceinture noire de judo"],
};
