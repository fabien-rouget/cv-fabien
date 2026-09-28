import type { SkillCategory } from "../types.ts";

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages & Frameworks",
    items: ["C#", ".NET", "ASP .NET", "Python", "SQL", "Cypher"],
  },
  {
    title: "AI",
    items: ["Claude Code", "Cursor", "Codex", "GitHub Copilot", "Worktrees"],
  },
  {
    title: "Databases",
    items: ["SQL", "MongoDB", "Snowflake", "DBT", "Redis", "Neo4j"],
  },
  {
    title: "Tools & Platforms",
    items: ["RabbitMQ", "Apache Kafka", "AWS Cloud", "Git", "Sonar"],
  },
];
