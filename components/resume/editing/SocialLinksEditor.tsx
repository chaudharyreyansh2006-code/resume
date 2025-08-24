import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { 
  Globe, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  ExternalLink,
  Plus,
  X,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../ui/dialog';

interface SocialLink {
  id: string;
  platform: string;
  label: string;
  prefix: string;
  placeholder: string;
  icon: React.ElementType;
  validation?: (value: string) => boolean;
}

interface SocialLinksEditorProps {
  contacts: {
    website?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    [key: string]: string | undefined;
  };
  onUpdate: (contacts: any) => void;
}

const AVAILABLE_PLATFORMS: SocialLink[] = [
  {
    id: 'website',
    platform: 'website',
    label: 'Website',
    prefix: '',
    placeholder: 'your-website.com',
    icon: Globe,
    validation: (value) => {
      try {
        new URL(value.startsWith('http') ? value : `https://${value}`);
        return true;
      } catch {
        return false;
      }
    }
  },
  {
    id: 'github',
    platform: 'github',
    label: 'GitHub',
    prefix: 'github.com/',
    placeholder: 'username',
    icon: Github,
    validation: (value) => /^[a-zA-Z0-9]([a-zA-Z0-9-]){0,38}$/.test(value)
  },
  {
    id: 'linkedin',
    platform: 'linkedin',
    label: 'LinkedIn',
    prefix: 'linkedin.com/in/',
    placeholder: 'username',
    icon: Linkedin,
    validation: (value) => /^[a-zA-Z0-9-]{3,100}$/.test(value)
  },
  {
    id: 'twitter',
    platform: 'twitter',
    label: 'Twitter/X',
    prefix: 'x.com/',
    placeholder: 'username',
    icon: Twitter,
    validation: (value) => /^[a-zA-Z0-9_]{1,15}$/.test(value)
  },
  {
    id: 'instagram',
    platform: 'instagram',
    label: 'Instagram',
    prefix: 'instagram.com/',
    placeholder: 'username',
    icon: Instagram,
    validation: (value) => /^[a-zA-Z0-9_.]{1,30}$/.test(value)
  },
  {
    id: 'youtube',
    platform: 'youtube',
    label: 'YouTube',
    prefix: 'youtube.com/@',
    placeholder: 'channel',
    icon: Youtube,
    validation: (value) => /^[a-zA-Z0-9_.-]{1,100}$/.test(value)
  }
];

export const SocialLinksEditor: React.FC<SocialLinksEditorProps> = ({
  contacts,
  onUpdate
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const activePlatforms = AVAILABLE_PLATFORMS.filter(platform => 
    contacts[platform.platform] !== undefined && contacts[platform.platform] !== ''
  );

  const availablePlatforms = AVAILABLE_PLATFORMS.filter(platform => 
    !contacts[platform.platform] || contacts[platform.platform] === ''
  );

  const validateField = (platform: SocialLink, value: string): string | null => {
    if (!value.trim()) return null;
    
    if (platform.validation && !platform.validation(value)) {
      switch (platform.platform) {
        case 'website':
          return 'Please enter a valid website URL';
        case 'github':
          return 'GitHub username can only contain letters, numbers, and hyphens';
        case 'linkedin':
          return 'LinkedIn username must be 3-100 characters with letters, numbers, and hyphens';
        case 'twitter':
          return 'Twitter username must be 1-15 characters with letters, numbers, and underscores';
        case 'instagram':
          return 'Instagram username can contain letters, numbers, dots, and underscores';
        case 'youtube':
          return 'YouTube channel name can contain letters, numbers, dots, hyphens, and underscores';
        default:
          return 'Invalid format';
      }
    }
    return null;
  };

  const handleInputChange = (platform: SocialLink, value: string) => {
    const error = validateField(platform, value);
    
    setValidationErrors(prev => ({
      ...prev,
      [platform.platform]: error || ''
    }));

    onUpdate({
      ...contacts,
      [platform.platform]: value
    });
  };

  const handleRemoveLink = (platformId: string) => {
    const newContacts = { ...contacts };
    delete newContacts[platformId];
    
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[platformId];
      return newErrors;
    });
    
    onUpdate(newContacts);
    toast.success('Social link removed');
  };

  const handleAddPlatform = (platform: SocialLink) => {
    onUpdate({
      ...contacts,
      [platform.platform]: ''
    });
    setIsAddDialogOpen(false);
    toast.success(`${platform.label} added`);
  };

  const getPreviewUrl = (platform: SocialLink, value: string): string => {
    if (!value.trim()) return '';
    
    if (platform.platform === 'website') {
      return value.startsWith('http') ? value : `https://${value}`;
    }
    
    return `https://${platform.prefix}${value}`;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-gray-700">
          Social Links
        </Label>
        {availablePlatforms.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsAddDialogOpen(true)}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Platform
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {activePlatforms.map((platform) => {
          const value = contacts[platform.platform] || '';
          const error = validationErrors[platform.platform];
          const previewUrl = getPreviewUrl(platform, value);
          
          return (
            <div key={platform.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <platform.icon className="w-4 h-4 text-gray-500" />
                  <Label htmlFor={platform.id} className="text-sm text-gray-600">
                    {platform.label}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  {previewUrl && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(previewUrl, '_blank')}
                      className="p-1 h-auto"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveLink(platform.platform)}
                    className="p-1 h-auto text-red-500 hover:text-red-700"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {platform.prefix && (
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {platform.prefix}
                  </span>
                )}
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    id={platform.id}
                    value={value}
                    onChange={(e) => handleInputChange(platform, e.target.value)}
                    placeholder={platform.placeholder}
                    className={error ? 'border-red-500' : ''}
                  />
                  {value && !error && (
                    <Check className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                  )}
                </div>
              </div>
              
              {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
              )}
            </div>
          );
        })}
        
        {activePlatforms.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Globe className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No social links added yet</p>
            <p className="text-xs">Click "Add Platform" to get started</p>
          </div>
        )}
      </div>

      {/* Add Platform Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Social Platform</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-3 py-4">
            {availablePlatforms.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                onClick={() => handleAddPlatform(platform)}
                className="justify-start h-auto p-3"
              >
                <platform.icon className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{platform.label}</div>
                  <div className="text-xs text-gray-500">
                    {platform.prefix}{platform.placeholder}
                  </div>
                </div>
              </Button>
            ))}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};