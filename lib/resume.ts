import { z } from 'zod';

const HeaderContactsSchema = z.object({
  website: z.string().describe('Personal website or portfolio URL').optional(),
  email: z.string().describe('Email address').optional(),
  phone: z.string().describe('Phone number').optional(),
  twitter: z.string().describe('Twitter/X username').optional(),
  linkedin: z.string().describe('LinkedIn username').optional(),
  github: z.string().describe('GitHub username').optional(),
  instagram: z.string().describe('Instagram username').optional(),
  youtube: z.string().describe('YouTube channel').optional(),
});

const HeaderSection = z.object({
  name: z.string(),
  shortAbout: z.string().describe('Short description of your profile'),
  location: z
    .string()
    .describe("Location with format 'City, Country'")
    .optional(),
  contacts: HeaderContactsSchema,
  skills: z
    .array(z.string())
    .describe('Skills used within the different jobs the user has had.'),
});

const SummarySection = z.string().describe('Summary of your profile');

const WorkExperienceSection = z.array(
  z.object({
    company: z.string().describe('Company name'),
    link: z.string().describe('Company website URL'),
    location: z
      .string()
      .describe(
        "Location with format 'City, Country' or could be Hybrid or Remote"
      ),
    contract: z
      .string()
      .describe('Type of work contract like Full-time, Part-time, Contract'),
    title: z.string().describe('Job title'),
    start: z.string().describe("Start date in format 'YYYY-MM-DD'"),
    end: z
      .string()
      .optional()
      .nullable()
      .describe("End date in format 'YYYY-MM-DD'"),
    description: z.string().describe('Job description'),
  })
);

const EducationSection = z.array(
  z.object({
    school: z.string().describe('School or university name'),
    degree: z.string().describe('Degree or certification obtained'),
    start: z.string().describe('Start year'),
    end: z.string().describe('End year'),
  })
);

// New: Section visibility settings
const SectionVisibilitySchema = z.object({
  summary: z.boolean().default(true),
  workExperience: z.boolean().default(true),
  education: z.boolean().default(true),
  skills: z.boolean().default(true),
  // Future sections can be added here
  projects: z.boolean().default(false),
  certifications: z.boolean().default(false),
  languages: z.boolean().default(false),
});

// New: Additional sections schema
const ProjectsSection = z.array(
  z.object({
    name: z.string().describe('Project name'),
    description: z.string().describe('Project description'),
    technologies: z.array(z.string()).describe('Technologies used'),
    link: z.string().optional().describe('Project URL'),
    github: z.string().optional().describe('GitHub repository URL'),
    start: z.string().describe("Start date in format 'YYYY-MM-DD'"),
    end: z.string().optional().describe("End date in format 'YYYY-MM-DD'"),
  })
).default([]);

const CertificationsSection = z.array(
  z.object({
    name: z.string().describe('Certification name'),
    issuer: z.string().describe('Issuing organization'),
    date: z.string().describe('Date obtained'),
    link: z.string().optional().describe('Certification URL'),
  })
).default([]);

const LanguagesSection = z.array(
  z.object({
    language: z.string().describe('Language name'),
    proficiency: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Native']).describe('Proficiency level'),
  })
).default([]);

// Add theme schema
const ThemeSchema = z.enum(['default', 'minimal', 'zinc', 'slate', 'stone', 'gray', 'orange', 'zen-garden', 'blue']).default('default').describe('Portfolio website theme');

export const ResumeDataSchema = z.object({
  header: HeaderSection,
  summary: SummarySection,
  workExperience: WorkExperienceSection,
  education: EducationSection,
  profilePicture: z.string().describe('Profile picture URL from Vercel Blob').optional(),
  // New fields
  sectionVisibility: SectionVisibilitySchema.default({
    summary: true,
    workExperience: true,
    education: true,
    skills: true,
    projects: false,
    certifications: false,
    languages: false,
  }),
  projects: ProjectsSection,
  certifications: CertificationsSection,
  languages: LanguagesSection,
  theme: ThemeSchema, // Add theme field
});

export type ResumeDataSchemaType = z.infer<typeof ResumeDataSchema>;
