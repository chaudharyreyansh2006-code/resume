import {
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ResumeDataSchemaType } from '@/lib/resume';
import { useMemo } from 'react';

interface SocialButtonProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function SocialButton({ href, icon: Icon, label }: SocialButtonProps) {
  return (
    <Button className="size-8" variant="outline" size="icon" asChild>
      <a
        href={
          href.startsWith('mailto:') || href.startsWith('tel:')
            ? href
            : `${href}${href.includes('?') ? '&' : '?'}ref=selfso`
        }
        aria-label={label}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Icon className="size-4" aria-hidden="true" />
      </a>
    </Button>
  );
}

/**
 * Header component displaying personal information and contact details
 */
export function Header({
  header,
  picture,
}: {
  header: ResumeDataSchemaType['header'];
  picture?: string;
}) {
  const prefixUrl = (stringToFix?: string) => {
    if (!stringToFix) return undefined;
    const url = stringToFix.trim();
    return url.startsWith('http') ? url : `https://${url}`;
  };

  const socialLinks = useMemo(() => {
    const formatSocialUrl = (
      url: string | undefined,
      platform: 'github' | 'twitter' | 'linkedin' | 'instagram' | 'youtube'
    ) => {
      if (!url) return undefined;

      const cleanUrl = url.trim();
      if (cleanUrl.startsWith('http')) return cleanUrl;

      // Handle twitter.com and x.com variations
      if (
        platform === 'twitter' &&
        (cleanUrl.startsWith('twitter.com') || cleanUrl.startsWith('x.com'))
      ) {
        return `https://${cleanUrl}`;
      }

      const platformUrls = {
        github: 'github.com',
        twitter: 'x.com',
        linkedin: 'linkedin.com/in',
        instagram: 'instagram.com',
        youtube: 'youtube.com/@',
      } as const;

      return `https://${platformUrls[platform]}/${cleanUrl}`;
    };

    return {
      website: prefixUrl(header.contacts.website),
      github: formatSocialUrl(header.contacts.github, 'github'),
      twitter: formatSocialUrl(header.contacts.twitter, 'twitter'),
      linkedin: formatSocialUrl(header.contacts.linkedin, 'linkedin'),
      instagram: formatSocialUrl(header.contacts.instagram, 'instagram'),
      youtube: formatSocialUrl(header.contacts.youtube, 'youtube'),
    };
  }, [
    header.contacts.website,
    header.contacts.github,
    header.contacts.twitter,
    header.contacts.linkedin,
    header.contacts.instagram,
    header.contacts.youtube,
  ]);

  return (
    <header className="flex items-start md:items-center justify-between gap-4 ">
      <div className="flex-1 space-y-1.5">
        <h1 className="text-2xl font-bold" id="resume-name">
          {header.name}
        </h1>
        <p
          className="max-w-md text-pretty font-mono text-sm text-design-resume print:text-[12px]"
          aria-labelledby="resume-name"
        >
          {header.shortAbout}
        </p>

        <p className="max-w-md items-center text-pretty font-mono text-xs text-foreground">
          <a
            className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline text-[#9CA0A8]"
            href={`https://www.google.com/maps/search/${encodeURIComponent(
              header.location || ''
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Location: ${header.location}`}
          >
            {header.location}
          </a>
        </p>

        <div
          className="flex gap-x-1 pt-1 font-mono text-sm text-design-resume print:hidden"
          role="list"
          aria-label="Contact links"
        >
          {socialLinks.website && (
            <SocialButton
              href={socialLinks.website}
              icon={GlobeIcon}
              label="Personal website"
            />
          )}
          {header.contacts.email && (
            <SocialButton
              href={`mailto:${header.contacts.email}`}
              icon={MailIcon}
              label="Email"
            />
          )}
          {header.contacts.phone && (
            <SocialButton
              href={`tel:${header.contacts.phone}`}
              icon={PhoneIcon}
              label="Phone"
            />
          )}
          {socialLinks.github && (
            <SocialButton
              href={socialLinks.github}
              icon={Github}
              label="GitHub"
            />
          )}
          {socialLinks.twitter && (
            <SocialButton
              href={socialLinks.twitter}
              icon={Twitter}
              label="Twitter"
            />
          )}
          {socialLinks.linkedin && (
            <SocialButton
              href={socialLinks.linkedin}
              icon={Linkedin}
              label="LinkedIn"
            />
          )}
          {socialLinks.instagram && (
            <SocialButton
              href={socialLinks.instagram}
              icon={Instagram}
              label="Instagram"
            />
          )}
          {socialLinks.youtube && (
            <SocialButton
              href={socialLinks.youtube}
              icon={Youtube}
              label="YouTube"
            />
          )}
        </div>

        <div
          className="hidden gap-x-2 font-mono text-sm text-design-resume print:flex print:text-[12px]"
          aria-label="Print contact information"
        >
          {socialLinks.website && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={socialLinks.website}
              >
                {new URL(socialLinks.website).hostname}
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          {header.contacts.email && (
            <>
              <a
                className="underline hover:text-foreground/70"
                href={`mailto:${header.contacts.email}`}
              >
                {header.contacts.email}
              </a>
              <span aria-hidden="true">/</span>
            </>
          )}
          {header.contacts.phone && (
            <a
              className="underline hover:text-foreground/70"
              href={`tel:${header.contacts.phone}`}
            >
              {header.contacts.phone}
            </a>
          )}
        </div>
      </div>

      <Avatar className="size-20 md:size-28" aria-hidden="true">
        <AvatarImage src={picture} alt={`${header.name}'s profile picture`} />
        <AvatarFallback>
          {header.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
    </header>
  );
}
