import { Badge } from '@/components/ui/badge';
import { Section } from '@/components/ui/section';
import { cn } from '@/lib/utils';
import { type Theme, getThemeConfig } from '@/lib/themes';

type Skills = readonly string[];

interface SkillsProps {
  skills: Skills;
  className?: string;
  theme?: Theme;
}

/**
 * Skills section component
 * Displays a list of professional skills as badges
 */
export function Skills({ skills, className, theme }: SkillsProps) {
  const themeConfig = getThemeConfig(theme || 'default');
  
  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="skills-section">
        Skills
      </h2>
      <ul
        className={cn('flex list-none flex-wrap gap-1 p-0')}
        aria-label="List of skills"
        aria-labelledby="skills-section"
      >
        {skills.map((skill) => (
          <li key={skill}>
            <Badge
              className={`print:text-[10px] pointer-events-none ${themeConfig.badgeClass} ${themeConfig.badgeTextClass}`}
              aria-label={`Skill: ${skill}`}
            >
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </Section>
  );
}
