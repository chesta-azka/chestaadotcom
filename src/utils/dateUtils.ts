/**
 * Safely parse a date string (including Indonesian formatted strings like '27 AGU 2026')
 * to a valid ISO 8601 string, or returns undefined if invalid without throwing errors.
 */
const ID_MONTHS: Record<string, number> = {
  JAN: 0,
  FEB: 1,
  PEB: 1,
  MAR: 2,
  APR: 3,
  MEI: 4,
  MAY: 4,
  JUN: 5,
  JUL: 6,
  AGU: 7,
  AUG: 7,
  SEP: 8,
  OKT: 9,
  OCT: 9,
  NOV: 10,
  NOP: 10,
  DES: 11,
  DEC: 11,
};

export function parseDateToISOString(dateStr?: string | null): string | undefined {
  if (!dateStr || typeof dateStr !== 'string') return undefined;

  // Try standard parsing first
  try {
    const parsed = new Date(dateStr);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString();
    }
  } catch {
    // Continue to custom parser
  }

  // Handle formats like "27 AGU 2026" or "10 JUN 2026"
  try {
    const parts = dateStr.trim().split(/[\s-]+/);
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const monthKey = parts[1].toUpperCase().slice(0, 3);
      const year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(year) && ID_MONTHS[monthKey] !== undefined) {
        const d = new Date(Date.UTC(year, ID_MONTHS[monthKey], day));
        if (!isNaN(d.getTime())) {
          return d.toISOString();
        }
      }
    }
  } catch {
    // Return fallback
  }

  return undefined;
}
