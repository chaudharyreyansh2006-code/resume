import React from 'react';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Palette } from 'lucide-react';
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
    preview: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
  },
  {
    value: 'ghibli' as const,
    label: 'Ghibli',
    description: 'Nature-inspired with warm earth tones',
    preview: 'bg-gradient-to-r from-green-50 to-amber-50 border-green-200'
  },
  {
    value: 'minimal' as const,
    label: 'Minimal',
    description: 'Simple black and white design',
    preview: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200'
  },
  {
    value: 'modern' as const,
    label: 'Modern',
    description: 'Bold colors and contemporary layout',
    preview: 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
  }
];

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Portfolio Theme
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme-select" className="text-sm font-medium text-gray-700">
            Choose a theme for your portfolio website
          </Label>
          <Select value={currentTheme} onValueChange={onThemeChange}>
            <SelectTrigger id="theme-select">
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
        
        {/* Theme Preview */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Preview</Label>
          <div className={`p-4 rounded-lg border-2 ${THEMES.find(t => t.value === currentTheme)?.preview || THEMES[0].preview}`}>
            <div className="space-y-2">
              <div className="h-3 bg-gray-400 rounded w-1/3"></div>
              <div className="h-2 bg-gray-300 rounded w-2/3"></div>
              <div className="h-2 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};