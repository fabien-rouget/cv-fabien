export interface SkillCategory {
  title: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Langages et frameworks",
    items: ["C#", ".NET", "ASP .NET", "Python", "SQL", "Cypher"],
  },
  {
    title: "Base de données",
    items: ["SQL", "MongoDB", "Snowflake", "DBT", "Redis", "Neo4j"],
  },
  {
    title: "Outils et plateformes",
    items: ["RabbitMQ", "Apache Kafka", "AWS Cloud", "Git", "Sonar"],
  },
  {
    title: "Méthodologies",
    items: ["SCRUM", "Kanban", "CICD", "Testing"],
  },
];
