export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  context: string;
  impacts: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Betclic",
    location: "Bordeaux",
    period: "de mai 2025 à aujourd’hui",
    context: "Réécriture du service de gestion des transactions et passage à une architecture multi-services.",
    impacts: [
      "Découpage d'un monolithe en architecture multi-services.",
      "Migration d'une bdd SQL Serveur vers CosmosDb.",
      "Remplacement d'une communication via API par de l'évènementiel.",
    ],
    stack: [
      ".Net 8",
      "ComosDb",
      "AWS SNS/SQS",
      "Azure container apps",
      "Jenkins pipeline",
    ],
  },
  {
    role: "Leader technique",
    company: "Floa",
    location: "Bordeaux",
    period: "de mars 2023 à mai 2025",
    context:
      "Contrôles de souscription et ETL orienté graphe pour la détection de communautés frauduleuses.",
    impacts: [
      "Développement d’API de contrôle intégrées au parcours de souscription.",
      "Modélisation et mise en places de bases de données à différents usages : cache, référentiel, exploitation.",
      "Construction et maintenance d’un ETL pour alimenter une BDD graphe (Neo4J).",
      "Construction et cadrage architecturels du périmètre de l’équipe.",
      "Management technique de l’équipe.",
    ],
    stack: [
      "C# - .NET 6 - .NET 8",
      "Neo4J - Cypher",
      "Redis",
      "SQL Serveur - MongoDb",
      "RabbitMQ",
      "Kibana - Dynatrace - Grafana",
    ],
  },
  {
    role: "Software Engineer",
    company: "Betclic",
    location: "Bordeaux",
    period: "de janvier 2022 à mars 2023",
    context:
      "Refonte d’un pipeline temps réel de collecte et d’agrégation des actions utilisateurs.",
    impacts: [
      "Réalisation de la chaine complète de l’ETL.",
      "Architecture full cloud sur AWS.",
      "Développement et mise à disposition des agrégats sous snowflake.",
      "Développement des API du backoffice.",
    ],
    stack: [
      "C# - .NET 6 - Python",
      "AWS : ECS, SQS, SNS, S3",
      "Snowflake - DBT - MongoDB",
      "Github, Jenkins, Terraform",
    ],
  },
  {
    role: "Software Engineer",
    company: "Believe",
    location: "Paris",
    period: "de janvier 2021 à janvier 2022",
    context:
      "Construction de la nouvelle plateforme Big Data, de la collecte à l’exposition des données.",
    impacts: [
      "Réalisation de la chaine complète de l’ETL.",
      "Architecture full cloud sur AWS.",
      "Développement et mise en place complète de la CICD.",
    ],
    stack: [
      "Python",
      "AWS : StepFunctions, Lambda, DMS, S3, RDS Aurora, Batch",
      "Snowflake - SQL- DBT - Sqitch",
      "Gitlab - Pulumi",
    ],
  },
  {
    role: "Leader technique",
    company: "Cdiscount",
    location: "Bordeaux",
    period: "d’août 2018 à décembre 2020",
    context: "Pilotage technique de plusieurs équipes et produits, de l’architecture au déploiement.",
    impacts: [
      "Modélisation de l’architecture µService du référentiel produit Octopia.",
      "Mise en place du backend du nouveau tracking interne de Cdiscount.",
      "Mise en place du backend de la nouvelle plateforme de produits sponsorisés.",
      "Maintenance et évolution du flux d’export du catalogue Cdiscount vers Google Shopping.",
      "Gestion de diverses équipes de dev de 2 à 5 personnes.",
    ],
    stack: [
      "Architecture µServices - API REST",
      ".NET Core - C# - Kubernetes",
      "MongoDB - PostgreSQL - SQL Server",
      "Apache Kafka",
      "Apache Solr",
      "TFS - Azure Devops - JIRA",
      "CICD - Sonar - Specflow",
      "Liquibase",
      "SCRUM",
    ],
  },
  {
    role: "Développeur .NET",
    company: "Cdiscount",
    location: "Bordeaux",
    period: "de septembre 2016 à août 2018",
    context:
      "Migration du catalogue produit vers un nouveau modèle de données et refonte des systèmes associés.",
    impacts: [
      "Modification et création de nouvelles bases de données.",
      "Évolution des web services pour utiliser le nouveau modèle.",
      "Adaptation des frontaux pour exploiter le nouveau modèle.",
    ],
    stack: ["TFS - .NET framework - WCF", "SQL Server", "Sonar - Kanban"],
  }
];
