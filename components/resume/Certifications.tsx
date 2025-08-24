import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { getShortMonth, getYear } from './resumeUtils';
import { useMemo } from 'react';
import { type Theme, getThemeConfig } from '@/lib/themes';

/**
 * Individual certification card component
 */
function CertificationItem({
  certification,
  theme,
}: {
  certification: ResumeDataSchemaType['certifications'][0];
  theme?: Theme;
}) {
  const { name, issuer, date, link } = certification;
  const themeConfig = getThemeConfig(theme || 'default');

  // Skip rendering if required fields are missing
  if (!name || !issuer) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
          <h3
            className={`font-semibold leading-none ${themeConfig.primaryTextClass}`}
            id={`certification-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className={`hover:underline ${themeConfig.linkClass}`}>
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          {date && (
            <div
              className={`text-sm tabular-nums ${themeConfig.secondaryTextClass}`}
              aria-label={`Date: ${getShortMonth(date)} ${getYear(date)}`}
            >
              {getShortMonth(date)} {getYear(date)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent
        className={`mt-2 ${themeConfig.mutedTextClass} print:text-[12px]`}
        aria-labelledby={`certification-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <p>{issuer}</p>
      </CardContent>
    </Card>
  );
}

/**
 * Certifications section component
 */
export function Certifications({
  certifications,
  theme,
}: {
  certifications: ResumeDataSchemaType['certifications'];
  theme?: Theme;
}) {
  const validCertifications = useMemo(() => {
    return certifications?.filter((cert) => cert.name && cert.issuer) || [];
  }, [certifications]);

  if (validCertifications.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold">Certifications</h2>
      <div className="space-y-3">
        {validCertifications.map((certification, index) => (
          <CertificationItem key={index} certification={certification} theme={theme} />
        ))}
      </div>
    </Section>
  );
}