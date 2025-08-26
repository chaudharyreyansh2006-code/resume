'use client';

import { useState } from 'react';
import { FullResume } from '@/components/resume/FullResume';
import { getThemeConfig, Theme } from '@/lib/themes';
import { ResumeDataSchemaType } from '@/lib/resume';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Demo data for Harvansh Chaudhary
const demoResumeData: ResumeDataSchemaType = {
  header: {
    name: 'Harvansh Chaudhary',
    shortAbout: 'Solo builder shipping stuff that sometimes works.',
    location: 'U.P. India',
    skills: ['NextJs', 'Cursor', 'React', 'Supabase', 'Web Design', 'SEO', 'Blogging'],
    contacts: {
      email: 'harvansh@example.com',
      linkedin: 'https://linkedin.com/',
      github: 'https://github.com/',
      website: 'https://founderswall.com',
      twitter: 'https://x.com/ainotsosmart'
    }
  },
  summary: "I'm a solo builder who has shipped 14 products without writing a single line of code. Everything I've built — from SaaS tools to mobile apps — comes from hacking together AI tools like v0.app, Cursor, ChatGPT, and Claude. I started with blogging in 2022 (GeekDroid, AI-Q) where I wrote SEO guides and AI tutorials that people actually read. Later, I leaned into AI-first building and shipped products like SazeAI, Unrealshot, FoundersWall, and CtrlCut.",
  workExperience: [
    {
      title: 'Product Designer',
      company: 'nova labs',
      link: 'https://novalabs.com',
      location: 'USA',
      start: '2023-03-01',
      end: null,
      contract: 'Full-time',
      description: 'Designed end-to-end user flows for SaaS dashboard used by 20k+ active users. Collaborated with dev team to implement design system improving consistency by 35%'
    },
    {
      title: 'Frontend Developer',
      company: 'pixelforge studios',
      link: 'https://pixelforge.com',
      location: 'San Jose, CA',
      start: '2021-07-01',
      end: '2023-03-01',
      contract: 'Full-time',
      description: 'Built responsive websites and landing pages for 15+ clients in e-commerce and fintech. Optimized React components leading to 40% faster load times. Worked closely with designers to bring Figma prototypes to production'
    },
    {
      title: 'UI/UX Intern',
      company: 'brightpath solutions',
      link: 'https://brightpath.com',
      location: 'France',
      start: '2019-02-01',
      end: '2021-01-01',
      contract: 'Internship',
      description: 'Assisted in designing mobile app wireframes and prototypes. Conducted usability testing sessions with 30+ participants. Learned fundamentals of design thinking and agile workflows'
    }
  ],
  education: [
    {
      school: 'School of Internet',
      degree: 'Self-taught',
      start: '2023',
      end: 'Present'
    }
  ],
  projects: [
    {
      name: 'Unrealshot AI',
      description: 'AI-generated photoshoots. Made $820 in revenue. Proof that fast experiments can be profitable.',
      technologies: ['Nextjs'],
      start: '2024-01-01',
      end: '2024-12-31',
      link: 'https://unrealshot.ai'
    },
    {
      name: 'FoundersWall',
      description: 'A community wall for indie builders and makers. Built to connect people shipping products.',
      technologies: ['No-Code'],
      start: '2025-01-01',
      link: 'https://founderswall.com'
    },
    {
      name: 'BringBack AI',
      description: 'Helps users bring back lost accounts/content. Still in early growth phase.',
      technologies: ['AI'],
      start: '2025-01-01',
      link: 'https://bringback.ai'
    },
    {
      name: 'PFP Maker App',
      description: 'Android app for creating social media profile pictures. Published on Google Play, fully AI-built.',
      technologies: ['Flutter'],
      start: '2024-01-01',
      link: 'https://play.google.com/store/apps/details?id=com.pfpmaker'
    }
  ],
  certifications: [
    {
      name: 'Shipped 14 Products Without Code',
      issuer: 'Internet University',
      date: '2025-08-01',
      link: 'https://internetuniversity.com/cert/ship-14-prod'
    }
  ],
  languages: [
    {
      language: 'English',
      proficiency: 'Intermediate'
    },
    {
      language: 'Hindi',
      proficiency: 'Native'
    }
  ],
  sectionVisibility: {
    summary: true,
    workExperience: true,
    education: true,
    skills: true,
    projects: true,
    certifications: true,
    languages: true,
    cvfolioBadge: true
  },
  theme: 'default',
  profilePicture: '/placeholder-user.jpg'
};

const themes: Theme[] = ['default', 'minimal', 'zinc', 'slate', 'stone', 'gray', 'orange', 'zen-garden', 'blue'];

export default function DemoPage() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('default');
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const switchTheme = () => {
    const nextIndex = (currentThemeIndex + 1) % themes.length;
    setCurrentThemeIndex(nextIndex);
    setCurrentTheme(themes[nextIndex]);
  };

  const themeConfig = getThemeConfig(currentTheme);

  // Update the demo data theme dynamically
  const currentDemoData = {
    ...demoResumeData,
    theme: currentTheme
  };

  return (
    <div className={`min-h-screen ${themeConfig.backgroundClass} ${themeConfig.containerClass} relative`}>
      {/* Theme Switcher Button */}
      <Button
        onClick={switchTheme}
        className="fixed bottom-4 right-4 z-50 rounded-full w-12 h-12 p-0 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        title={`Current theme: ${currentTheme}. Click to switch themes.`}
      >
        <Palette className="w-5 h-5" />
      </Button>

      {/* Theme Indicator */}
      <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium">
        {currentTheme}
      </div>

      {/* Resume Content */}
      <FullResume 
        resume={currentDemoData} 
        profilePicture="/placeholder-user.jpg"
        theme={currentTheme}
      />
    </div>
  );
}