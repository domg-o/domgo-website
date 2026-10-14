import { useEffect, useState } from 'react';

export type PublicSocialStats = {
  updatedAt: string;
  instagram?: { followers: number };
  tiktok?: { followers: number };
};

export type SocialStatsFetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

function isFollowerCount(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

export function parsePublicSocialStats(value: unknown): PublicSocialStats | null {
  if (!value || typeof value !== 'object') return null;

  const candidate = value as {
    updatedAt?: unknown;
    instagram?: { followers?: unknown };
    tiktok?: { followers?: unknown };
  };
  if (typeof candidate.updatedAt !== 'string' || Number.isNaN(Date.parse(candidate.updatedAt))) return null;

  const instagram = isFollowerCount(candidate.instagram?.followers)
    ? { followers: candidate.instagram.followers }
    : undefined;
  const tiktok = isFollowerCount(candidate.tiktok?.followers)
    ? { followers: candidate.tiktok.followers }
    : undefined;

  return instagram || tiktok ? { updatedAt: candidate.updatedAt, instagram, tiktok } : null;
}

export function usePublicSocialStats(url: string | undefined, fetchStats: SocialStatsFetcher = window.fetch) {
  const [stats, setStats] = useState<PublicSocialStats | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    void fetchStats(url, {
      credentials: 'omit',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })
      .then(async response => response.ok ? parsePublicSocialStats(await response.json()) : null)
      .then(nextStats => {
        if (nextStats) setStats(nextStats);
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, [url, fetchStats]);

  return stats;
}

export function formatFollowerCount(value: number): string {
  return new Intl.NumberFormat('en-GB').format(value);
}

export function formatStatsDate(isoDate: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(isoDate));
}
