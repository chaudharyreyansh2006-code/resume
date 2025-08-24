import React from 'react';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { ResumeDataSchemaType } from '@/lib/resume';

type Language = ResumeDataSchemaType['languages'][0];

interface LanguageFieldProps {
  language: Language;
  index: number;
  onUpdate: (index: number, updatedLanguage: Language) => void;
  onDelete: (index: number) => void;
}

const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Native'] as const;

export const LanguageField: React.FC<LanguageFieldProps> = ({
  language,
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
          <Label htmlFor={`language-name-${index}`} className="text-sm font-medium text-gray-700">
            Language
          </Label>
          <Input
            type="text"
            id={`language-name-${index}`}
            value={language.language}
            onChange={(e) => {
              onUpdate(index, {
                ...language,
                language: e.target.value,
              });
            }}
            placeholder="Language name"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor={`language-proficiency-${index}`} className="text-sm font-medium text-gray-700">
            Proficiency Level
          </Label>
          <Select
            value={language.proficiency}
            onValueChange={(value: typeof language.proficiency) => {
              onUpdate(index, {
                ...language,
                proficiency: value,
              });
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select proficiency level" />
            </SelectTrigger>
            <SelectContent>
              {PROFICIENCY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};