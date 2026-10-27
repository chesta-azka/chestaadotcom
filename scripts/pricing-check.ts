import { PRICING_PACKAGES, PRICING_CARE_PACKAGES, PRICING_ADDONS } from '../src/data/pricing';

console.log('--------------------------------------------------');
console.log('CHECKING PRICING SINGLE SOURCE OF TRUTH (data/pricing.ts)');
console.log('--------------------------------------------------');

// Verify that data/pricing exports valid data
const packageCount = PRICING_PACKAGES.length;
const careCount = PRICING_CARE_PACKAGES.length;
const addonCount = PRICING_ADDONS.length;

console.log(`✓ Packages loaded: ${packageCount} items`);
console.log(`✓ Care packages loaded: ${careCount} items`);
console.log(`✓ Addons loaded: ${addonCount} items`);

if (packageCount !== 6) {
  console.error(`❌ Expected 6 pricing packages, found ${packageCount}`);
  process.exit(1);
}

if (careCount !== 2) {
  console.error(`❌ Expected 2 care packages, found ${careCount}`);
  process.exit(1);
}

if (addonCount !== 10) {
  console.error(`❌ Expected 10 addons, found ${addonCount}`);
  process.exit(1);
}

console.log('✓ Pricing data structure validation passed successfully.');
console.log('--------------------------------------------------');
