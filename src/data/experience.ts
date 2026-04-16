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
    context:
      "Refonte du service de gestion des transactions vers une architecture distribuée multi-services.",
    impacts: [
      "Découpage d’un monolithe en services spécialisés pour améliorer l’évolutivité du système.",
      "Pilotage du rollout de l’ancien vers le nouveau système sans interruption de service.",
      "Remplacement des échanges synchrones par une communication événementielle pour renforcer la résilience et le découplage.",
    ],
    stack: [
      ".Net 8",
      "ComosDb",
      "AWS Cloud",
      "Azure container apps",
      "Jenkins pipeline",
    ],
  },
  {
    role: "Leader technique",
    company: "Floa",
    location: "Bordeaux",
    period: "de mars 2023 à mai 2025",
    context: "Conception de contrôles de souscription et d’un pipeline graphe pour la détection de fraude.",
    impacts: [
      "Conception et mise en production d’API de contrôle intégrées au parcours de souscription.",
      "Modélisation et mise en place de bases de données adaptées aux usages de cache, de référentiel et d’exploitation.",
      "Conception et maintenance d’un ETL alimentant Neo4j pour détecter les communautés frauduleuses.",
      "Structuration de l’architecture du périmètre et sécurisation de son évolution.",
      "Encadrement technique de l’équipe et alignement des choix d’implémentation.",
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
      "Construction de la chaîne ETL de bout en bout, de l’ingestion des événements au calcul des agrégats.",
      "Déploiement d’une architecture cloud sur AWS pour absorber les volumes et simplifier l’exploitation.",
      "Production et exposition des agrégats dans Snowflake pour les usages analytiques.",
      "Développement des API du backoffice pour rendre les données exploitables.",
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
    context: "Construction d’une plateforme Big Data de la collecte à l’exposition des données.",
    impacts: [
      "Construction de la chaîne ETL de bout en bout pour fiabiliser les flux de données.",
      "Déploiement d’une architecture cloud sur AWS pour industrialiser la plateforme.",
      "Mise en place de la CI/CD pour accélérer et sécuriser les déploiements.",
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
    context: "Pilotage technique de services backend e-commerce, de l’architecture à la mise en production.",
    impacts: [
      "Conception de l’architecture microservices du référentiel produit Octopia.",
      "Développement du backend du tracking interne.",
      "Développement du backend de la plateforme de produits sponsorisés.",
      "Fiabilisation du flux d’export du catalogue vers Google Shopping.",
      "Encadrement de plusieurs équipes (2 à 5 développeurs) et sécurisation des livraisons.",
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
      "Conception et mise en place des bases de données du nouveau modèle.",
      "Évolution des web services pour exposer et exploiter le référentiel.",
      "Adaptation des frontaux pour assurer une transition sans rupture fonctionnelle.",
    ],
    stack: ["TFS - .NET framework - WCF", "SQL Server", "Sonar - Kanban"],
  }
];
