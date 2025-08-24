import React from 'react';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { ResumeDataSchemaType } from '@/lib/resume';

interface ThemeSelectorProps {
  currentTheme: ResumeDataSchemaType['theme'];
  onThemeChange: (theme: ResumeDataSchemaType['theme']) => void;
}

const THEMES = [
  {
    value: 'default' as const,
    label: 'Default',
    description: 'Clean and professional design',
    preview: 'bg-gray-50 border-blue-300'
  },
  {
    value: 'minimal' as const,
    label: 'Minimal',
    description: 'Simple and clean design',
    preview: 'bg-white border-gray-300'
  },
  {
    value: 'zinc' as const,
    label: 'Zinc',
    description: 'Dark theme with zinc colors',
    preview: 'bg-zinc-900 border-zinc-700'
  },
  {
    value: 'slate' as const,
    label: 'Slate',
    description: 'Dark theme with slate colors',
    preview: 'bg-slate-900 border-slate-700'
  },
  {
    value: 'stone' as const,
    label: 'Stone',
    description: 'Dark theme with stone colors',
    preview: 'bg-stone-900 border-stone-700'
  },
  {
    value: 'gray' as const,
    label: 'Gray',
    description: 'Dark theme with gray colors',
    preview: 'bg-gray-900 border-gray-700'
  },
  {
    value: 'orange' as const,
    label: 'Orange',
    description: 'Warm theme with orange accents',
    preview: 'bg-orange-900 border-orange-700'
  },
  {
    value: 'zen-garden' as const,
    label: 'Zen Garden',
    description: 'Peaceful green theme',
    preview: 'bg-green-900 border-blue-500'
  },
  {
    value: 'blue' as const,
    label: 'Blue',
    description: 'Dark theme with blue accents',
    preview: 'bg-blue-900 border-blue-700'
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  return (
    <div className="space-y-3">
      <Label htmlFor="theme-select" className="text-sm font-medium text-gray-700">
        Portfolio Theme
      </Label>
      <Select value={currentTheme} onValueChange={onThemeChange}>
        <SelectTrigger id="theme-select" className="w-full">
          <SelectValue placeholder="Select a theme" />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map((theme) => (
            <SelectItem key={theme.value} value={theme.value}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded border-2 ${theme.preview}`} />
                <div>
                  <div className="font-medium">{theme.label}</div>
                  <div className="text-xs text-gray-500">{theme.description}</div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};