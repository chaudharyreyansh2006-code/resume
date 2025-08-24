import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { useMemo } from 'react';
import { type Theme, getThemeConfig } from '@/lib/themes';

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
  theme,
}: {
  languages: ResumeDataSchemaType['languages'];
  theme?: Theme;
}) {
  const themeConfig = getThemeConfig(theme || 'default');
  
  const validLanguages = useMemo(() => {
    return languages?.filter((lang) => lang.language) || [];
  }, [languages]);

  if (validLanguages.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold">Languages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {validLanguages.map((language, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className={themeConfig.primaryTextClass}>{language.language}</span>
            {language.proficiency && (
              <span className={`text-sm ${themeConfig.secondaryTextClass}`}>
                {language.proficiency}
              </span>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}