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

export const FullResume = ({
  resume,
  profilePicture,
}: {
  resume?: ResumeData | null;
  profilePicture?: string;
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

  return (
    <section
      className="mx-auto w-full max-w-2xl space-y-8  print:space-y-4 my-8 px-4"
      aria-label="Resume Content"
    >
      <Header header={resume?.header} picture={profilePicture} />

      <div className="flex flex-col gap-6">
        {visibility.summary && <Summary summary={resume?.summary} />}

        {visibility.workExperience && <WorkExperience work={resume?.workExperience} />}

        {visibility.education && <Education educations={resume.education} />}

        {visibility.skills && <Skills skills={resume.header.skills} />}

        {visibility.projects && <Projects projects={resume.projects || []} />}

        {visibility.certifications && <Certifications certifications={resume.certifications || []} />}

        {visibility.languages && <Languages languages={resume.languages || []} />}
      </div>
    </section>
  );
};
