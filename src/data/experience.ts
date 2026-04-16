export interface Experience {
  role: string;
  company: string;
  meta: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Betclic",
    meta: "Bordeaux – de mai 2025 à aujourd’hui",
    summary:
      "Projet de réécriture from scratch du service de gestion des transactions",
    achievements: [
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
    meta: "Bordeaux – de mars 2023 à mai 2025",
    summary:
      "Au sein de l’équipe Fraude et Conformité, ma mission est de mettre à disposition, au sein du parcours de souscription à un produit bancaire, différents contrôles nécessaires à la validation d’un dossier pour sa finalisation. À cela s’ajoute la construction d’un ETL permettant l’alimentation et l’exploitation d’une base de données orientée graphe ayant pour but la détection de communautés frauduleuses.",
    achievements: [
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
    meta: "Bordeaux – de janvier 2022 à mars 2023",
    summary:
      "Dans une équipe dédiée à la refonte d’un système qui a pour objectif, en temps réel, de collecter et d’agréger au sein d’un ETL toutes les actions utilisateurs de la plateforme, j’ai participé au développement de tout le processus de traitement, de la réception des évènements jusqu’aux calculs d’agrégats sur le stockage gold.",
    achievements: [
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
    meta: "Paris – de janvier 2021 à janvier 2022",
    summary:
      "Dans une équipe chargée de construire la nouvelle plateforme Big Data de l’entreprise, nous étions responsables de la collecte, de l’ingestion, de la préparation et transformation de la data jusqu’à son exposition.",
    achievements: [
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
    meta: "Bordeaux – d’août 2018 à décembre 2020",
    summary:
      "Leader technique de différentes équipes avant de passer leader technique transverse, j’ai participé à la réalisation de divers projets passionnants, de la conception de l’architecture jusqu’au déploiement, en passant par le cadrage du besoin. J’ai également fait parti de l’équipe d’astreinte, passant certaines nuits et certains weekends sur mon clavier. C#, les µServices, kafka et mongo étaient mes meilleurs amis.",
    achievements: [
      "Modélisation de l’architecture µService du référentiel produit Octopia.",
      "Mise en place du backend du nouveau tracking interne de Cdiscount.",
      "Mise en place du backend de la nouvelle plateforme de produits sponsorisés.",
      "Maintenance et évolution du flux d’export du catalogue Cdiscount vers Google Shopping.",
      "Gestion de diverses équipes de dev de 2 à 5 personnes.",
      "Cadrage des besoins.",
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
    meta: "Bordeaux – via SII – de septembre 2016 à août 2018",
    summary:
      "Intégré au sein d’une équipe d’une dizaine de personnes sur un projet ambitieux, l’objectif a été de faire migrer le catalogue produit de Cdiscount sur un nouveau modèle de données complètement différent. Au delà de cette migration, il a également fallu redévelopper tous les systèmes impactés, des couches les plus basses jusqu’au front en passant par la gestion des commandes.",
    achievements: [
      "Modification et création de nouvelles bases de données.",
      "Évolution des web services pour utiliser le nouveau modèle.",
      "Adaptation des frontaux pour exploiter le nouveau modèle.",
    ],
    stack: ["TFS - .NET framework - WCF", "SQL Server", "Sonar - Kanban"],
  }
];
