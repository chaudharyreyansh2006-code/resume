export function splitTextIntoParagraphs(text: string): string[] {
  if (!text) return [];
  return text.split('\n').filter(p => p.trim().length > 0);
}

export function hasMultipleParagraphs(text: string): boolean {
  return splitTextIntoParagraphs(text).length > 1;
}