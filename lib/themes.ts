export type Theme = 'default' | 'minimal' | 'zinc' | 'slate' | 'stone' | 'gray' | 'orange' | 'zen-garden' | 'blue';

export interface ThemeConfig {
  containerClass: string;
  backgroundClass: string;
  textClass: string;
  cardClass: string;
  accentClass: string;
  // New theme-aware color properties
  primaryTextClass: string;     // For titles, names, headings
  secondaryTextClass: string;   // For dates, descriptions, subtitles
  mutedTextClass: string;       // For very light text
  linkClass: string;            // For links and clickable elements
  badgeClass: string;           // For badges and tags
  badgeTextClass: string;       // For text inside badges
}

export function getThemeConfig(theme: Theme): ThemeConfig {
  switch (theme) {
    case 'zinc':
      return {
        containerClass: 'zinc-theme',
        backgroundClass: 'bg-[#09090b]',
        textClass: 'text-[#aeabab]',
        cardClass: 'bg-[#27272a] border-[#27272a] shadow-lg rounded-lg',
        accentClass: 'text-[#aeabab] border-[#27272a]',
        primaryTextClass: 'text-[#aeabab]',
        secondaryTextClass: 'text-[#a1a1aa]',
        mutedTextClass: 'text-[#909095]',
        linkClass: 'text-[#a8a8a8] hover:text-[#d4d4d8]',
        badgeClass: 'bg-[#3f3f46] border-[#3f3f46]',
        badgeTextClass: 'text-[#d4d4d8]'
      };
    case 'slate':
      return {
        containerClass: 'slate-theme',
        backgroundClass: 'bg-[#020817]',
        textClass: 'text-[#f8fafc]',
        cardClass: 'bg-[#1e293b] border-[#1e293b] shadow-lg rounded-lg',
        accentClass: 'text-[#f8fafc] border-[#1e293b]',
        primaryTextClass: 'text-[#f8fafc]',
        secondaryTextClass: 'text-[#cbd5e1]',
        mutedTextClass: 'text-[#bac7d9]',
        linkClass: 'text-[#f8fafc] hover:text-[#e2e8f0]',
        badgeClass: 'bg-[#334155] border-[#334155]',
        badgeTextClass: 'text-[#e2e8f0]'
      };
    case 'stone':
      return {
        containerClass: 'stone-theme',
        backgroundClass: 'bg-[#0c0a09]',
        textClass: 'text-[#fafaf9]',
        cardClass: 'bg-[#292524] border-[#292524] shadow-lg rounded-lg',
        accentClass: 'text-[#fafaf9] border-[#292524]',
        primaryTextClass: 'text-[#ceb8a7]',
        secondaryTextClass: 'text-[#a8a29e]',
        mutedTextClass: 'text-[#8e7c6e]',
        linkClass: 'text-[#fafaf9] hover:text-[#e7e5e4]',
        badgeClass: 'bg-[#44403c] border-[#44403c]',
        badgeTextClass: 'text-[#e7e5e4]'
      };
    case 'gray':
      return {
        containerClass: 'gray-theme',
        backgroundClass: 'bg-[#030712]',
        textClass: 'text-[#f9fafb]',
        cardClass: 'bg-[#1f2937] border-[#1f2937] shadow-lg rounded-lg',
        accentClass: 'text-[#f9fafb] border-[#1f2937]',
        primaryTextClass: 'text-[#f9fafb]',
        secondaryTextClass: 'text-[#d1d5db]',
        mutedTextClass: 'text-[#b6bdc9]',
        linkClass: 'text-[#f9fafb] hover:text-[#e5e7eb]',
        badgeClass: 'bg-[#374151] border-[#374151]',
        badgeTextClass: 'text-[#e5e7eb]'
      };
    case 'orange':
      return {
        containerClass: 'orange-theme',
        backgroundClass: 'bg-[#0c0a09]',
        textClass: 'text-[#fafaf9]',
        cardClass: 'bg-[#292524] border-[#292524] shadow-lg rounded-lg',
        accentClass: 'text-[#fafaf9] border-[#292524]',
        primaryTextClass: 'text-[#fafaf9]',
        secondaryTextClass: 'text-[#fed7aa]',
        mutedTextClass: 'text-[#fdba74]',
        linkClass: 'text-[#fb923c] hover:text-[#f97316]',
        badgeClass: 'bg-[#ea580c] border-[#ea580c]',
        badgeTextClass: 'text-[#fafaf9]'
      };
    case 'zen-garden':
      return {
        containerClass: 'zen-garden-theme',
        backgroundClass: 'bg-[#101810]',
        textClass: 'text-[#e7efe7]',
        cardClass: 'bg-[#212c21] border-[#43846a] shadow-lg rounded-lg',
        accentClass: 'text-[#edf4f7] border-[#43846a]',
        primaryTextClass: 'text-[#e7efe7]',
        secondaryTextClass: 'text-[#a7c3a7]',
        mutedTextClass: 'text-[#7a9a7a]',
        linkClass: 'text-[#43846a] hover:text-[#629b53]',
        badgeClass: 'bg-[#2d4a2d] border-[#43846a]',
        badgeTextClass: 'text-[#a7c3a7]'
      };
    case 'blue':
      return {
        containerClass: 'blue-theme',
        backgroundClass: 'bg-[#020817]',
        textClass: 'text-[#f8fafc]',
        cardClass: 'bg-[#1e293b] border-[#1e293b] shadow-lg rounded-lg',
        accentClass: 'text-[#f8fafc] border-[#1e293b]',
        primaryTextClass: 'text-[#f8fafc]',
        secondaryTextClass: 'text-[#93c5fd]',
        mutedTextClass: 'text-[#60a5fa]',
        linkClass: 'text-[#3b82f6] hover:text-[#2563eb]',
        badgeClass: 'bg-[#1e40af] border-[#1e40af]',
        badgeTextClass: 'text-[#dbeafe]'
      };
    case 'minimal':
      return {
        containerClass: 'minimal-theme',
        backgroundClass: 'bg-white',
        textClass: 'text-gray-900',
        cardClass: 'bg-gray-50 border-gray-200 rounded-lg',
        accentClass: 'text-gray-600 border-gray-300',
        primaryTextClass: 'text-gray-900',
        secondaryTextClass: 'text-gray-600',
        mutedTextClass: 'text-gray-500',
        linkClass: 'text-gray-600 hover:text-gray-800',
        badgeClass: 'bg-gray-100 border-gray-200',
        badgeTextClass: 'text-gray-700'
      };
    default:
      return {
        containerClass: 'default-theme',
        backgroundClass: 'bg-gray-50',
        textClass: 'text-gray-900',
        cardClass: 'bg-white border-gray-200 shadow-sm rounded-lg',
        accentClass: 'text-blue-600 border-blue-300',
        primaryTextClass: 'text-gray-900',
        secondaryTextClass: 'text-gray-600',
        mutedTextClass: 'text-gray-500',
        linkClass: 'text-gray-400 hover:text-blue-800',
        badgeClass: 'bg-gray-200 border-gray-300',
        badgeTextClass: 'text-gray-500'
      };
  }
}