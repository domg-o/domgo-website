import worker from '../social-sync/worker.mjs';

function namespace(initial: Record<string, string> = {}) {
  const values = new Map(Object.entries(initial));
  return {
    get: vi.fn(async (key: string) => values.get(key) ?? null),
    put: vi.fn(async (key: string, value: string) => { values.set(key, value); }),
    delete: vi.fn(async (key: string) => { values.delete(key); }),
  };
}

function environment() {
  return {
    OAUTH_STATE: namespace(),
    TOKENS: namespace(),
    PUBLIC_STATS: namespace({ current: JSON.stringify({
      updatedAt: '2026-10-11T09:00:00.000Z',
      instagram: { followers: 25001 },
      tiktok: { followers: 90123 },
    }) }),
    RATE_LIMIT: namespace(),
    CONNECT_ADMIN_TOKEN: 'a'.repeat(32),
    TOKEN_ENCRYPTION_KEY: '',
    INSTAGRAM_APP_ID: '',
    INSTAGRAM_APP_SECRET: '',
    TIKTOK_CLIENT_KEY: '',
    TIKTOK_CLIENT_SECRET: '',
    PUBLIC_SITE_ORIGIN: 'https://domgo.co.uk',
    OAUTH_CALLBACK_ORIGIN: 'https://domgo-social.example',
  };
}

describe('social connection service', () => {
  test('does not mint an authorisation link without the administrator token', async () => {
    const response = await worker.fetch(
      new Request('https://domgo-social.example/v1/admin/connections/instagram', { method: 'POST' }),
      environment(),
    );

    expect(response.status).toBe(401);
    expect(await response.json()).toEqual({ error: 'Unauthorized.' });
  });

  test('returns only the intended public follower figures to the portfolio origin', async () => {
    const response = await worker.fetch(
      new Request('https://domgo-social.example/v1/public/stats', { headers: { Origin: 'https://domgo.co.uk' } }),
      environment(),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('access-control-allow-origin')).toBe('https://domgo.co.uk');
    expect(await response.json()).toEqual({
      updatedAt: '2026-10-11T09:00:00.000Z',
      instagram: { followers: 25001 },
      tiktok: { followers: 90123 },
    });
  });

  test('does not grant another website CORS access to the public service', async () => {
    const response = await worker.fetch(
      new Request('https://domgo-social.example/v1/public/stats', { headers: { Origin: 'https://untrusted.example' } }),
      environment(),
    );

    expect(response.headers.get('access-control-allow-origin')).toBeNull();
  });
});
