import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { ResumeDataSchemaType } from '@/lib/resume';
import { getShortMonth, getYear } from './resumeUtils';
import { useMemo } from 'react';

/**
 * Individual project card component
 */
function ProjectItem({
  project,
}: {
  project: ResumeDataSchemaType['projects'][0];
}) {
  const { name, description, technologies, link, github, start, end } = project;

  // Skip rendering if required fields are missing
  if (!name || !description) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-base">
          <h3
            className="font-semibold leading-none"
            id={`project-${name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {link ? (
              <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          {start && (
            <div
              className="text-sm tabular-nums text-gray-500"
              aria-label={`Period: ${getYear(start)} to ${
                end ? ` ${getYear(end)}` : 'Present'
              }`}
            >
              {getYear(start)} - {end ? `${getYear(end)}` : 'Present'}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent
        className="mt-2 text-design-resume print:text-[12px]"
        aria-labelledby={`project-${name.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <p className="mb-2">{description}</p>
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        {github && (
          <div className="mt-2">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              View on GitHub
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

/**
 * Projects section component
 */
export function Projects({
  projects,
}: {
  projects: ResumeDataSchemaType['projects'];
}) {
  const validProjects = useMemo(() => {
    return projects?.filter((project) => project.name && project.description) || [];
  }, [projects]);

  if (validProjects.length === 0) {
    return null;
  }

  return (
    <Section>
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="space-y-3">
        {validProjects.map((project, index) => (
          <ProjectItem key={index} project={project} />
        ))}
      </div>
    </Section>
  );
}