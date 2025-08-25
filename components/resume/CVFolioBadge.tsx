import { getThemeConfig, type Theme } from '@/lib/themes';
import { cn } from '@/lib/utils';

interface CVFolioBadgeProps {
  theme?: Theme;
  className?: string;
}

export function CVFolioBadge({ theme = 'default', className }: CVFolioBadgeProps) {
  const themeConfig = getThemeConfig(theme);
  
  return (
    <div className={cn(
      "text-center text-xs text-gray-500 mt-12 print:text-gray-400",
      themeConfig.mutedTextClass,
      className
    )}>
      Built with <a href="https://cvfolio.me" target="_blank" rel="noopener noreferrer">CVFolio.Me</a>
    </div>
  );
}