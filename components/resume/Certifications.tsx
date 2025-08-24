import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { getShortMonth, getYear } from './resumeUtils';
import { useMemo } from 'react';

/**
 * Individual certification card component
 */
function CertificationItem({
  certification,
}: {
  certification: ResumeDataSchemaType['certifications'][0];
}) {
  const { name, issuer, date, link } = certification;

  // Skip rendering if required fields are missing
  if (!name || !issuer) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
          <h3
            className="font-semibold leading-none"
            id={`certification-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          {date && (
            <div
              className="text-sm tabular-nums text-gray-500"
              aria-label={`Issued: ${getYear(date)}`}
            >
              {getYear(date)}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent
        className="mt-2 text-design-resume print:text-[12px]"
        aria-labelledby={`certification-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <p className="text-gray-600">{issuer}</p>
      </CardContent>
    </Card>
  );
}

/**
 * Certifications section component
 */
export function Certifications({
  certifications,
}: {
  certifications: ResumeDataSchemaType['certifications'];
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
          <CertificationItem key={index} certification={certification} />
        ))}
      </div>
    </Section>
  );
}