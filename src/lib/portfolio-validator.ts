import { PortfolioItem } from '../data/portfolio';

export function validatePortfolioItem(item: any): item is PortfolioItem {
  if (!item || typeof item !== 'object') return false;
  const requiredKeys = ['slug', 'title', 'category', 'metrics', 'description', 'schemaData'];
  for (const key of requiredKeys) {
    if (!item[key]) {
      console.warn(`Portfolio validation warning: Missing required key [${key}] in item:`, item);
      return false;
    }
  }
  return true;
}

export function validatePortfolioItems(items: any[]): PortfolioItem[] {
  if (!Array.isArray(items)) {
    throw new Error('Critical Portfolio Error: PORTFOLIO_ITEMS must be an array.');
  }
  const validItems: PortfolioItem[] = [];
  for (const item of items) {
    if (validatePortfolioItem(item)) {
      validItems.push(item as PortfolioItem);
    } else {
      console.error('Portfolio item failed strict validation, applying fallback/skipping:', item);
    }
  }
  return validItems;
}
