import type { Experience } from "../types.ts";

export const experiences: Experience[] = [
  {
    role: "Software Engineer",
    company: "Betclic",
    logo: {
      src: "/logos/betclic.svg",
      alt: "Betclic logo",
    },
    location: "Bordeaux",
    period: "from May 2025 to Present",
    context:
      "Redesign of the transaction management service into a distributed multi-service architecture.",
    impacts: [
      "Decomposed a monolith into specialized services to improve system scalability and maintainability.",
      "Executed a zero-downtime rollout from the legacy system to the new architecture.",
      "Replaced synchronous calls with event-driven communication to strengthen resilience and decoupling.",
    ],
    stack: [
      ".NET 8",
      "Cosmos DB",
      "AWS Cloud",
      "Azure Container Apps",
      "Jenkins pipeline",
      "Datadog",
      "Agentic AI development",
      "Claude Code",
      "GitHub Copilot",
      "Cursor",
    ],
  },
  {
    role: "Tech Lead",
    company: "Floa",
    logo: {
      src: "/logos/floa.png",
      alt: "FLOA logo",
    },
    location: "Bordeaux",
    period: "from March 2023 to May 2025",
    context: "Design of subscription validation controls and a graph pipeline for fraud detection.",
    impacts: [
      "Designed and shipped validation APIs integrated into the customer subscription flow.",
      "Modeled and implemented databases tailored for caching, master data, and operational workloads.",
      "Built and maintained an ETL pipeline feeding Neo4j to detect fraudulent communities.",
      "Structured the domain architecture and secured its long-term evolution.",
      "Provided technical leadership to the team and aligned implementation standards.",
    ],
    stack: [
      ".NET 6",
      "Neo4J - Cypher",
      "Redis",
      "SQL Server - MongoDB",
      "RabbitMQ",
      "Kibana - Dynatrace - Grafana",
    ],
  },
  {
    role: "Software Engineer",
    company: "Betclic",
    logo: {
      src: "/logos/betclic.svg",
      alt: "Betclic logo",
    },
    location: "Bordeaux",
    period: "from January 2022 to March 2023",
    context:
      "Redesign of a user activity collection and aggregation pipeline.",
    impacts: [
      "Built the end-to-end ETL pipeline, from event ingestion to aggregate computation.",
      "Deployed a cloud architecture on AWS to handle high throughput and simplify operations.",
      "Produced and exposed aggregates in Snowflake for analytics workloads.",
      "Developed back-office APIs to make the data actionable.",
    ],
    stack: [
      ".NET 6 - Python",
      "AWS: ECS, SQS, SNS, S3",
      "Snowflake - DBT - MongoDB",
      "GitHub, Jenkins, Terraform",
    ],
  },
  {
    role: "Software Engineer",
    company: "Believe",
    logo: {
      src: "/logos/believe.svg",
      alt: "Believe logo",
    },
    location: "Paris",
    period: "from January 2021 to January 2022",
    context: "Built a Big Data platform from data collection to data exposure.",
    impacts: [
      "Built the end-to-end ETL pipeline to ensure reliable data flows.",
      "Deployed a cloud architecture on AWS to industrialize the platform.",
      "Implemented CI/CD pipelines across the entire scope.",
    ],
    stack: [
      "Python",
      "AWS: StepFunctions, Lambda, DMS, S3, RDS Aurora, Batch",
      "Snowflake - SQL - DBT - Sqitch",
      "GitLab - Pulumi",
    ],
  },
  {
    role: "Tech Lead",
    company: "Cdiscount",
    logo: {
      src: "/logos/cdiscount.svg",
      alt: "Cdiscount logo",
    },
    location: "Bordeaux",
    period: "from August 2018 to December 2020",
    context: "Technical leadership of e-commerce backend services, from architecture to production.",
    impacts: [
      "Designed the microservices architecture for the Octopia product catalog.",
      "Developed the internal tracking backend.",
      "Developed the backend for the sponsored products platform.",
      "Improved reliability of the catalog export feed to Google Shopping.",
      "Led multiple teams (2 to 5 developers) and secured production deliveries.",
    ],
    stack: [
      "Microservices Architecture - REST API",
      ".NET Core - C# - Kubernetes",
      "MongoDB - PostgreSQL - SQL Server",
      "Apache Kafka",
      "Apache Solr",
      "TFS - Azure DevOps - JIRA",
      "CI/CD - Sonar - SpecFlow",
      "Liquibase",
      "SCRUM",
    ],
  },
  {
    role: ".NET Developer",
    company: "Cdiscount",
    logo: {
      src: "/logos/cdiscount.svg",
      alt: "Cdiscount logo",
    },
    location: "Bordeaux",
    period: "from September 2016 to August 2018",
    context:
      "Product catalog migration to a new data model and redesign of associated systems.",
    impacts: [
      "Designed and implemented the databases for the new data model.",
      "Evolved web services to expose and operate the product repository.",
      "Adapted front-end integrations to ensure a seamless transition.",
    ],
    stack: ["TFS - .NET Framework - WCF", "SQL Server", "Sonar - Kanban"],
  },
];
