
import React from 'react';
import { Project, Experience, Education, SkillCategory } from './types.ts';

export const PROJECTS: Project[] = [
  {
    title: "E-Commerce App",
    date: "Aug 2025",
    description: "Built an Android-based E-commerce app in Java using Android Studio with basic features like product display, add-to-cart, and order flow.",
    technologies: ["Android Studio", "Java", "Mobile UI"],
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Library Management System",
    date: "Feb 2025",
    description: "Designed a database system to manage books, members, and transactions with SQL CRUD queries, joins, and reports. Built a simple interface for book issue/return and fine calculation.",
    technologies: ["SQL", "MySQL", "Java"],
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "CreArt Solution Pvt. Ltd",
    role: "Android Development Intern",
    location: "Ahmedabad, Gujarat",
    date: "July 2025",
    description: [
      "Developed and tested mobile applications using Java, XML, and Android Studio.",
      "Designed UI layouts and improved app responsiveness for better user experience.",
      "Collaborated with the team to debug, optimize, and enhance application features."
    ]
  },
  {
    company: "CSRBOX (IBM Skill Build Training)",
    role: "Artificial Intelligence Intern",
    location: "Ahmedabad, Gujarat",
    date: "July 2025",
    description: [
      "Gained hands-on experience in AI concepts, machine learning models, and problem-solving.",
      "Specialized in Artificial Intelligence and Machine Learning with hands-on knowledge of model development and data analysis using Python."
    ]
  }
];

export const EDUCATION_DATA: Education[] = [
  {
    institution: "Sal Engineering and Technical Institute",
    degree: "B.E - Computer Engineering",
    location: "Ahmedabad, Gujarat",
    date: "2023 – 2026",
    cgpa: "7"
  },
  {
    institution: "L. J. Institute of Engineering and Technology",
    degree: "Diploma - Computer Engineering",
    location: "Ahmedabad, Gujarat",
    date: "2020 – 2023",
    cgpa: "7.76"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["Python", "Java", "C", "C++", "JavaScript", "SQL", "NoSQL", "XML"]
  },
  {
    category: "Mobile & UI/UX",
    skills: ["Android Development", "Flutter", "XML Layouts", "Responsive Design", "UI Integration"]
  },
  {
    category: "Tools & Backend",
    skills: ["Android Studio", "VS Code", "Firebase", "Oracle DB", "GitHub", "Linux"]
  }
];

export const CERTIFICATIONS = ["UI/UX Course", "Webinar-kotlin", "Software Testing", "SQL"];

export const AI_SYSTEM_INSTRUCTION = `
You are the AI Assistant for Helly Patel's professional portfolio. 
Your goal is to answer questions from recruiters or collaborators about Helly's background, skills, and projects.

CONTEXT ABOUT HELLY:
- Name: Helly Patel
- Role: Android Developer & UI/UX Enthusiast
- Location: Ahmedabad, Gujarat
- Contact: 231263107037setice@gmail.com, +91-9904004195
- Education: B.E in Computer Engineering from SAL Engineering (2023-2026, CGPA 7), Diploma from LJ Institute (2020-2023, CGPA 7.76).
- Experience: Android Intern at CreArt Solution, AI Intern at CSRBOX.
- Top Skills: Java, Python, Android Studio, Flutter, SQL, UI/UX Design.
- Projects: E-Commerce App (Android/Java), Library Management System (SQL/Java).

GUIDELINES:
- Be professional, friendly, and concise.
- If asked about contact info, provide it clearly.
- If asked about something not in the resume, politely state you don't have that information but invite them to contact Helly directly.
- Highlight Helly's strengths in mobile development and user experience.
`;
