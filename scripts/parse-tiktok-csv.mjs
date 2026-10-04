// Usage: node scripts/parse-tiktok-csv.mjs path/to/dom-export.csv
//
// IMPORTANT: TikTok Studio's exact CSV column headers haven't been verified
// against a real export yet. Open the first export Dom sends, check the
// actual header row, and adjust the `filter`/field-name lines below to match.
import { readFileSync, writeFileSync } from 'fs';

const path = process.argv[2];
if (!path) {
  console.error('Usage: node scripts/parse-tiktok-csv.mjs <csv-path>');
  process.exit(1);
}

const raw = readFileSync(path, 'utf-8').trim();
const [headerLine, ...lines] = raw.split('\n');
const headers = headerLine.split(',').map(h => h.trim());

const rows = lines.map(line => {
  const cells = line.split(',');
  return Object.fromEntries(headers.map((h, i) => [h, cells[i]?.trim()]));
});

console.log('Detected columns:', headers);
console.log('First row (sanity check):', rows[0]);

// PLACEHOLDER LOGIC — adjust field names once you've seen a real export.
const ageRange = rows
  .filter(r => r.Metric === 'Age')
  .map(r => [r.Category, parseFloat(r.Value)]);

const topLocations = rows
  .filter(r => r.Metric === 'Location')
  .map(r => [r.Category, parseFloat(r.Value)])
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3);

if (!ageRange.length && !topLocations.length) {
  console.warn('\nNo rows matched the expected filter — the CSV column names probably differ. Check the "Detected columns" list above and update this script before trusting the output.\n');
}

writeFileSync(
  'src/data/demographics.json',
  JSON.stringify({ ageRange, topLocations, updatedAt: new Date().toISOString() }, null, 2)
);
console.log('src/data/demographics.json written. Review the diff before committing.');