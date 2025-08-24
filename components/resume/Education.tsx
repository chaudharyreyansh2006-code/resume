import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { getShortMonth, getYear } from './resumeUtils';
import { useMemo } from 'react';
import { type Theme, getThemeConfig } from '@/lib/themes';

/**
 * Individual education card component
 */
function EducationItem({
  education,
  theme,
}: {
  education: ResumeDataSchemaType['education'][0];
  theme?: Theme;
}) {
  const { school, start, end, degree } = education;
  const themeConfig = getThemeConfig(theme || 'default');

  // Skip rendering if required fields are missing
  if (!school || !degree || !start) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
          <h3
            className={`font-semibold leading-none ${themeConfig.primaryTextClass}`}
            id={`education-${school.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {school}
          </h3>
          <div
            className={`text-sm tabular-nums ${themeConfig.secondaryTextClass}`}
            aria-label={`Period: ${getYear(start)} to ${
              end ? ` ${getYear(end)}` : 'Present'
            }`}
          >
            {getYear(start)} - {end ? `${getYear(end)}` : 'Present'}
          </div>
        </div>
      </CardHeader>
      <CardContent
        className={`mt-2 ${themeConfig.mutedTextClass} print:text-[12px]`}
        aria-labelledby={`education-${school
          .toLowerCase()
          .replace(/\s+/g, '-')}`}
      >
        {degree}
      </CardContent>
    </Card>
  );
}

/**
 * Main education section component
 * Renders a list of education experiences
 */
export function Education({
  educations,
  theme,
}: {
  educations: ResumeDataSchemaType['education'];
  theme?: Theme;
}) {
  // Filter out invalid education entries
  const validEducations = useMemo(
    () => educations.filter((edu) => edu.school && edu.degree && edu.start),
    [educations]
  );

  if (validEducations.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold" id="education-section">
        Education
      </h2>
      <div
        className="space-y-4"
        role="feed"
        aria-labelledby="education-section"
      >
        {validEducations.map((item, idx) => (
          <article key={idx} role="article">
            <EducationItem education={item} theme={theme} />
          </article>
        ))}
      </div>
    </Section>
  );
}
