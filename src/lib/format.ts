export function formatCompact(num: number | null | undefined): string {
  if (num === null || num === undefined) return '—';
  if (num >= 1_000_000) return trimTrailingZero((num / 1_000_000).toFixed(1)) + 'M';
  if (num >= 1_000) return trimTrailingZero((num / 1_000).toFixed(1)) + 'K';
  return num.toLocaleString();
}

function trimTrailingZero(s: string): string {
  return s.replace(/\.0$/, '');
}