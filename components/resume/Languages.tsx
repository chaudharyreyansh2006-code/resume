import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { useMemo } from 'react';

/**
 * Individual language card component
 */
function LanguageItem({
  languageItem,
}: {
  languageItem: ResumeDataSchemaType['languages'][0];
}) {
  const { language, proficiency } = languageItem;

  // Skip rendering if required fields are missing
  if (!language) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
          <h3
            className="font-semibold leading-none"
            id={`language-${language.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {language}
          </h3>
          {proficiency && (
            <div
              className="text-sm text-gray-500"
              aria-label={`Proficiency: ${proficiency}`}
            >
              {proficiency}
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

/**
 * Languages section component
 */
export function Languages({
  languages,
}: {
  languages: ResumeDataSchemaType['languages'];
}) {
  const validLanguages = useMemo(() => {
    return languages?.filter((lang) => lang.language) || [];
  }, [languages]);

  if (validLanguages.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold">Languages</h2>
      <div className="space-y-3">
        {validLanguages.map((languageItem, index) => (
          <LanguageItem key={index} languageItem={languageItem} />
        ))}
      </div>
    </Section>
  );
}