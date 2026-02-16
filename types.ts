
export interface Project {
  title: string;
  date: string;
  description: string;
  technologies: string[];
  imageUrl: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  date: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
  location: string;
  cgpa: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
