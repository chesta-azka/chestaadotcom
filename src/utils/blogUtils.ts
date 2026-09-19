/**
 * Utility to generate meta descriptions from article content
 */

/**
 * Generates a clean meta description from MDX or plain text content.
 * It removes markdown syntax and takes the first few sentences.
 * @param content The article content (string or array of blocks)
 * @param maxLength Maximum length of the description (default 160)
 * @returns A clean string for meta description
 */
export function generateMetaDescription(content: string | (string | { type: string; url: string; alt: string })[], maxLength: number = 160): string {
  if (!content) return '';

  let rawText = '';
  if (Array.isArray(content)) {
    rawText = content
      .filter((block) => typeof block === 'string')
      .join(' ');
  } else {
    rawText = content;
  }

  // Remove MDX/Markdown components and syntax
  let cleanText = rawText
    .replace(/<[^>]+>/g, '') // Remove components like <KeyTakeaways />
    .replace(/#{1,6}\s+.+/g, '') // Remove headings
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Clean links [text](url) -> text
    .replace(/[*_`~]/g, '') // Remove formatting characters
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();

  // If the text starts with a header that wasn't caught or other noise, clean it further
  // (Optional: handle specific common patterns if needed)

  if (cleanText.length <= maxLength) return cleanText;

  // Try to cut at the end of a sentence
  const truncated = cleanText.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1);
  }

  // Fallback: cut at last space to avoid cutting words
  const lastSpace = truncated.lastIndexOf(' ');
  return truncated.substring(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
}
