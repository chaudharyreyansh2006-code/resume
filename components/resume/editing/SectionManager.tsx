import { Eye, EyeOff, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ResumeDataSchemaType } from '@/lib/resume';

interface SectionManagerProps {
  sectionVisibility: ResumeDataSchemaType['sectionVisibility'];
  onVisibilityChange: (section: keyof ResumeDataSchemaType['sectionVisibility'], visible: boolean) => void;
}

const AVAILABLE_SECTIONS = [
  { key: 'summary', label: 'About/Summary', description: 'Professional summary section' },
  { key: 'workExperience', label: 'Work Experience', description: 'Employment history and roles' },
  { key: 'education', label: 'Education', description: 'Academic background and qualifications' },
  { key: 'skills', label: 'Skills', description: 'Technical and professional skills' },
  { key: 'projects', label: 'Projects', description: 'Personal and professional projects' },
  { key: 'certifications', label: 'Certifications', description: 'Professional certifications and licenses' },
  { key: 'languages', label: 'Languages', description: 'Language proficiencies' },
  { key: 'cvfolioBadge', label: 'CVFolio.Me Badge', description: 'Show "Built with CVFolio.Me" branding badge' },
] as const;

export function SectionManager({ sectionVisibility, onVisibilityChange }: SectionManagerProps) {
  return (
    <Card>
      <CardHeader className='mb-2'>
        <CardTitle className="flex items-center gap-2 text-md">
          <Eye className="w-5 h-5" />
          Section Visibility
        </CardTitle>
        <p className="text-sm text-gray-600">
          Control which sections appear on your resume
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {AVAILABLE_SECTIONS.map((section) => {
          const isVisible = sectionVisibility[section.key];
          return (
            <div key={section.key} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {isVisible ? (
                    <Eye className="w-4 h-4 text-green-600" />
                  ) : (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  )}
                  <Label htmlFor={`section-${section.key}`} className="font-medium">
                    {section.label}
                  </Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">{section.description}</p>
              </div>
              <Switch
                id={`section-${section.key}`}
                checked={isVisible}
                onCheckedChange={(checked) => onVisibilityChange(section.key, checked)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}