export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  location: string;
  availability: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    twitter?: string;
  };
  resumeUrl: string;
  education: {
    institution: string;
    degree: string;
    period: string;
    details: string;
  }[];
  experience: {
    role: string;
    organization: string;
    period: string;
    type: "Leadership" | "Technical" | "Community" | "Internship";
    description: string;
    achievements: string[];
  }[];
}

export const profileData: Profile = {
  name: "Punith Kumar B S",
  role: "AI/ML Developer & Software Builder",
  tagline: "Building intelligent systems with machine learning, data, and resilient software.",
  bio: [
    "Hey! I'm Punith, a second-year AI & Machine Learning undergraduate at BMS College of Engineering, Bangalore. Passionate about building things that matter — whether it's writing code at 2AM or sketching circuit ideas on paper, I'm all in.",
    "I believe in learning by doing. From small Python scripts to exploring data structures and algorithms, I'm on a continuous mission to turn curiosity into capability.",
    "Outside of academics, I love stargazing, reading about emerging tech, exploring math rabbit holes, and occasionally building weird little projects just to see if they work."
  ],
  location: "Bengaluru",
  availability: "Open to AI/ML internships, research collaborations, & project building",
  email: "punithkumar062008@gmail.com",
  socials: {
    github: "https://github.com/punithkumar-060308",
    linkedin: "https://www.linkedin.com/in/punith-kumar-b-s-707426373/",
  },
  resumeUrl: "/PunithKumar_Resume.pdf",
  education: [
    {
      institution: "Bachelor of Engineering in Artificial Intelligence & Machine Learning",
      degree: "B.E. in AI & ML",
      period: "2025 — Present",
      details: "Core focus: Deep Learning, Computer Vision, Data Structures & Algorithms, Distributed Systems, Software Engineering."
    }
  ],
  experience: [
    {
      role: "Lead Technical Coordinator / Member",
      organization: "ACM Student Chapter",
      period: "2023 — Present",
      type: "Leadership",
      description: "Spearheaded technical workshops and hackathons, built internal automation tools to streamline chapter operations and event certifications.",
      achievements: [
        "Architected automated certificate generation and participant validation pipelines.",
        "Mentored junior developers in Git workflows and Python development.",
        "Organized community coding jams and hands-on ML bootcamps."
      ]
    },
    {
      role: "AI & ML Project Builder",
      organization: "Open Source & Academic Research",
      period: "2023 — Present",
      type: "Technical",
      description: "Engineered domain-specific machine learning pipelines including photometric data analysis and autonomous agent incident responders.",
      achievements: [
        "Built Exo-Scan AI for processing NASA TESS light-curve signals and detecting planetary transit dips.",
        "Designed SentinelMesh AI with multi-agent orchestration for automated system monitoring and remediation."
      ]
    }
  ]
};
