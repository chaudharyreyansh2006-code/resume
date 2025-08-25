import LoadingFallback from '../LoadingFallback';
import { ResumeData } from '../../lib/server/redisActions';
import { Education } from './Education';
import { Header } from './Header';
import { Skills } from './Skills';
import { Summary } from './Summary';
import { WorkExperience } from './WorkExperience';
import { Projects } from './Projects';
import { Certifications } from './Certifications';
import { Languages } from './Languages';
import { getThemeConfig, type Theme } from '@/lib/themes';

export const FullResume = ({
  resume,
  profilePicture,
  theme = 'default'
}: {
  resume?: ResumeData | null;
  profilePicture?: string;
  theme?: Theme;
}) => {
  if (!resume) {
    return <LoadingFallback message="Loading Resume..." />;
  }

  const visibility = resume.sectionVisibility || {
    summary: true,
    workExperience: true,
    education: true,
    skills: true,
    projects: false,
    certifications: false,
    languages: false,
  };

  const themeConfig = getThemeConfig(theme);

  return (
    <section
      className={`mx-auto w-full max-w-2xl space-y-8 print:space-y-4 my-8 px-4 ${themeConfig.primaryTextClass}`}
      aria-label="Resume Content"
    >
      <Header header={resume?.header} picture={profilePicture} theme={theme} />

      <div className="flex flex-col gap-6">
        {visibility.summary && <Summary summary={resume?.summary} theme={theme} />}

        {visibility.workExperience && <WorkExperience work={resume?.workExperience} theme={theme} />}

        {visibility.education && <Education educations={resume.education} theme={theme} />}

        {visibility.skills && <Skills skills={resume.header.skills} theme={theme} />}


        {visibility.certifications && <Certifications certifications={resume.certifications || []} theme={theme} />}

        {visibility.languages && <Languages languages={resume.languages || []} theme={theme} />}

        {visibility.projects && <Projects projects={resume.projects || []} theme={theme} />}

      </div>
    </section>
  );
};
