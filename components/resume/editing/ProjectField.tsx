import React from 'react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { ResumeDataSchemaType } from '@/lib/resume';

type Project = ResumeDataSchemaType['projects'][0];

interface ProjectFieldProps {
  project: Project;
  index: number;
  onUpdate: (index: number, updatedProject: Project) => void;
  onDelete: (index: number) => void;
}

export const ProjectField: React.FC<ProjectFieldProps> = ({
  project,
  index,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="relative p-4 border rounded-md group">
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
        onClick={() => onDelete(index)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor={`project-name-${index}`} className="text-sm font-medium text-gray-700">
            Project Name
          </Label>
          <Input
            type="text"
            id={`project-name-${index}`}
            value={project.name}
            onChange={(e) => {
              onUpdate(index, {
                ...project,
                name: e.target.value,
              });
            }}
            placeholder="Project name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`project-link-${index}`} className="text-sm font-medium text-gray-700">
            Project URL
          </Label>
          <Input
            type="url"
            id={`project-link-${index}`}
            value={project.link || ''}
            onChange={(e) => {
              onUpdate(index, {
                ...project,
                link: e.target.value,
              });
            }}
            placeholder="https://project-url.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`project-github-${index}`} className="text-sm font-medium text-gray-700">
            GitHub URL
          </Label>
          <Input
            type="url"
            id={`project-github-${index}`}
            value={project.github || ''}
            onChange={(e) => {
              onUpdate(index, {
                ...project,
                github: e.target.value,
              });
            }}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`project-technologies-${index}`} className="text-sm font-medium text-gray-700">
            Technologies (comma-separated)
          </Label>
          <Input
            type="text"
            id={`project-technologies-${index}`}
            value={project.technologies.join(', ')}
            onChange={(e) => {
              onUpdate(index, {
                ...project,
                technologies: e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech),
              });
            }}
            placeholder="React, TypeScript, Node.js"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor={`project-start-${index}`} className="text-sm font-medium text-gray-700">
              Start Date
            </Label>
            <Input
              type="date"
              id={`project-start-${index}`}
              value={project.start}
              onChange={(e) => {
                onUpdate(index, {
                  ...project,
                  start: e.target.value,
                });
              }}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor={`project-end-${index}`} className="text-sm font-medium text-gray-700">
              End Date
            </Label>
            <Input
              type="date"
              id={`project-end-${index}`}
              value={project.end || ''}
              onChange={(e) => {
                onUpdate(index, {
                  ...project,
                  end: e.target.value,
                });
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <Label htmlFor={`project-description-${index}`} className="text-sm font-medium text-gray-700">
            Description
          </Label>
          <textarea
            id={`project-description-${index}`}
            className="w-full p-2 border rounded-md font-mono text-sm"
            value={project.description}
            onChange={(e) => {
              onUpdate(index, {
                ...project,
                description: e.target.value,
              });
            }}
            placeholder="Project description"
            rows={3}
            required
          />
        </div>
      </div>
    </div>
  );
};