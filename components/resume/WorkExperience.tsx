import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { getShortMonth, getYear } from './resumeUtils';
import { useMemo } from 'react';
import { type Theme, getThemeConfig } from '@/lib/themes';
import { splitTextIntoParagraphs, hasMultipleParagraphs } from '@/lib/textUtils';

export function WorkExperience({
  work,
  theme,
}: {
  work: ResumeDataSchemaType['workExperience'];
  theme?: Theme;
}) {
  const themeConfig = getThemeConfig(theme || 'default');
  
  const validWork = useMemo(() => {
    return work
      .filter(
        (item) =>
          item.company && item.location && item.title && item.description
      )
      .map((item) => ({
        ...item,
        formattedDate: `${getShortMonth(item.start)} ${getYear(item.start)} - ${
          !!item.end
            ? `${getShortMonth(item.end)} ${getYear(item.end)}`
            : 'Present'
        }`,
        companyLower: item.company.toLowerCase(),
      }));
  }, [work]);

  if (validWork.length === 0) {
    return null;
  }

  const showTimeline = validWork.length > 1;

  return (
    <Section>
      <h2 className="text-lg font-bold" id="work-experience">
        Work Experience
      </h2>
      <div
        className={showTimeline ? "relative" : "flex flex-col gap-4"}
        role="feed"
        aria-labelledby="work-experience"
      >
        {/* Global connecting line for timeline */}
        {showTimeline && (
          <div className={`absolute left-2 top-0 bottom-0 w-px ${
            themeConfig.mutedTextClass === 'text-[#909095]' ? 'bg-[#909095]' : 
            themeConfig.mutedTextClass === 'text-[#bac7d9]' ? 'bg-[#bac7d9]' : 
            'bg-gray-200'
          }`}></div>
        )}
        
        <div className={showTimeline ? "space-y-8" : "flex flex-col gap-4"}>
          {validWork.map((item, index) => {
            return (
              <div
                key={item.company + item.location + item.title}
                className={showTimeline ? "relative flex items-start gap-6" : "font-mono flex flex-col justify-start items-start gap-1 print:mb-4"}
              >
                {showTimeline && (
                  <div className={`relative z-10 w-4 h-4 rounded-full flex-shrink-0 mt-1 ${
                    themeConfig.primaryTextClass === 'text-[#aeabab]' ? 'bg-[#aeabab]' : 
                    themeConfig.primaryTextClass === 'text-[#f8fafc]' ? 'bg-[#f8fafc]' : 
                    'bg-black'
                  }`}></div>
                )}
                
                <div className={showTimeline ? "flex-1" : "w-full"}>
                  <div className="font-mono flex flex-col justify-start items-start gap-1 print:mb-4">
                    <div className="flex flex-wrap justify-between items-start self-stretch gap-2">
                      <div className="flex flex-wrap justify-start items-center gap-2">
                        <p className={`text-base font-semibold text-left ${themeConfig.primaryTextClass}`}>
                          {item.title}
                        </p>
                        <div className={`flex justify-center items-center relative overflow-hidden gap-2.5 px-[7px] py-0.5 rounded ${themeConfig.badgeClass}`}>
                          <p className={`text-[12px] font-semibold text-center ${themeConfig.badgeTextClass}`}>
                            {item.location}
                          </p>
                        </div>
                      </div>
                      <p className={`text-sm text-right ${themeConfig.secondaryTextClass}`}>
                        {item.formattedDate}
                      </p>
                    </div>
                    <div className="flex flex-col justify-start items-start relative gap-1.5">
                      <p className={`self-stretch text-sm font-medium text-left font-mono capitalize flex flex-wrap gap-1 ${themeConfig.secondaryTextClass}`}>
                        <span>{item.companyLower}</span>
                        {item.company && item.contract && <span>·</span>}
                        <span>{item.contract}</span>
                      </p>
                      <div className={`self-stretch text-sm font-medium text-left ${themeConfig.mutedTextClass}`}>
                        {hasMultipleParagraphs(item.description) ? (
                          <div className="space-y-3">
                            {splitTextIntoParagraphs(item.description).map((paragraph, index) => (
                              <p key={index} className="text-justify">{paragraph.trim()}</p>
                            ))}
                          </div>
                        ) : (
                          <span>{item.description}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
