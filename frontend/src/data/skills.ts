export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: "Proficient" | "Working Knowledge" | "Exploring";
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    description: "Core languages used across system architecture, algorithms, and application engineering.",
    skills: [
      { name: "Python", level: "Proficient" },
      { name: "C", level: "Working Knowledge" },
      { name: "Java", level: "Working Knowledge" },
      { name: "JavaScript", level: "Working Knowledge" }
    ]
  },
  {
    category: "Web & Frontend",
    description: "Modern client-side interfaces, responsive styling, and interactive component architectures.",
    skills: [
      { name: "React", level: "Proficient" },
      { name: "HTML & CSS", level: "Proficient" }
    ]
  },
  {
    category: "Backend Frameworks",
    description: "High-performance REST API services, asynchronous engines, and enterprise application frameworks.",
    skills: [
      { name: "FastAPI", level: "Proficient" },
      { name: "Spring Boot", level: "Exploring" }
    ]
  },
  {
    category: "Databases & Storage",
    description: "Flexible document databases and structured relational data modeling.",
    skills: [
      { name: "MongoDB", level: "Proficient" },
      { name: "MySQL / SQL", level: "Working Knowledge" }
    ]
  },
  {
    category: "Scientific Computing",
    description: "High-throughput numerical analysis, multidimensional array operations, and data pipelines.",
    skills: [
      { name: "NumPy", level: "Proficient" }
    ]
  },
  {
    category: "Developer Tools & Testing",
    description: "Distributed version control, collaborative workflows, and API endpoint verification suites.",
    skills: [
      { name: "Git & GitHub", level: "Proficient" },
      { name: "Postman", level: "Working Knowledge" }
    ]
  }
];
