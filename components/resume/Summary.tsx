import { ResumeDataSchemaType } from '@/lib/resume';
import { Section } from '../ui/section';
import { type Theme, getThemeConfig } from '@/lib/themes';
import { splitTextIntoParagraphs, hasMultipleParagraphs } from '@/lib/textUtils';

interface AboutProps {
  summary: ResumeDataSchemaType['summary'];
  className?: string;
  theme?: Theme;
}

/**
 * Summary section component
 * Displays a summary of professional experience and goals
 */
export function Summary({ summary, className, theme }: AboutProps) {
  const themeConfig = getThemeConfig(theme || 'default');
  
  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="about-section">
        About
      </h2>
      <div
        className={`text-pretty font-mono text-sm ${themeConfig.mutedTextClass} print:text-[12px]`}
        aria-labelledby="about-section"
      >
        {summary && hasMultipleParagraphs(summary) ? (
          <div className="space-y-3">
            {splitTextIntoParagraphs(summary).map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>
        ) : (
          <span>{summary || ''}</span>
        )}
      </div>
    </Section>
  );
}
