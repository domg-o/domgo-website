const STATE_TTL_SECONDS = 15 * 60;
const STATS_TTL_SECONDS = 60 * 60;

/** @typedef {{ get: (key: string) => Promise<string | null>, put: (key: string, value: string, options?: { expirationTtl?: number }) => Promise<void>, delete: (key: string) => Promise<void> }} KvNamespace */
/** @typedef {{ OAUTH_STATE: KvNamespace, TOKENS: KvNamespace, PUBLIC_STATS: KvNamespace, RATE_LIMIT: KvNamespace, CONNECT_ADMIN_TOKEN: string, TOKEN_ENCRYPTION_KEY: string, INSTAGRAM_APP_ID: string, INSTAGRAM_APP_SECRET: string, TIKTOK_CLIENT_KEY: string, TIKTOK_CLIENT_SECRET: string, PUBLIC_SITE_ORIGIN: string, OAUTH_CALLBACK_ORIGIN: string }} Env */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function json(value, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...extraHeaders },
  });
}

function randomValue() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256Base64Url(value) {
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
  return toBase64(digest).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
}

function toBase64(bytes) {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function fromBase64(value) {
  return Uint8Array.from(atob(value), character => character.charCodeAt(0));
}

async function tokenKey(env) {
  return crypto.subtle.importKey('raw', fromBase64(env.TOKEN_ENCRYPTION_KEY), 'AES-GCM', false, ['encrypt', 'decrypt']);
}

async function encryptToken(env, value) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await tokenKey(env), encoder.encode(JSON.stringify(value)));
  return `${toBase64(iv)}.${toBase64(new Uint8Array(encrypted))}`;
}

async function decryptToken(env, value) {
  const [encodedIv, encodedCiphertext] = value.split('.');
  if (!encodedIv || !encodedCiphertext) throw new Error('Stored token is malformed.');
  const plaintext = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: fromBase64(encodedIv) },
    await tokenKey(env),
    fromBase64(encodedCiphertext),
  );
  return JSON.parse(decoder.decode(plaintext));
}

function callbackUrl(env, platform) {
  return `${env.OAUTH_CALLBACK_ORIGIN}/v1/oauth/${platform}/callback`;
}

function hasAdminAccess(request, env) {
  const authorization = request.headers.get('Authorization');
  return typeof env.CONNECT_ADMIN_TOKEN === 'string'
    && env.CONNECT_ADMIN_TOKEN.length >= 32
    && authorization === `Bearer ${env.CONNECT_ADMIN_TOKEN}`;
}

async function isConnectionRateLimited(request, env) {
  const client = request.headers.get('CF-Connecting-IP');
  if (!client) return true;
  const key = `connection:${client}`;
  if (await env.RATE_LIMIT.get(key)) return true;
  await env.RATE_LIMIT.put(key, '1', { expirationTtl: STATE_TTL_SECONDS });
  return false;
}

function protectedText(message, status = 200) {
  return new Response(message, {
    status,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
      'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    },
  });
}

async function createConnection(request, env, platform) {
  if (!hasAdminAccess(request, env)) return json({ error: 'Unauthorized.' }, 401);
  if (await isConnectionRateLimited(request, env)) return json({ error: 'Try again later.' }, 429);

  const state = randomValue();
  const codeVerifier = randomValue();
  const codeChallenge = await sha256Base64Url(codeVerifier);
  const expiresAt = new Date(Date.now() + STATE_TTL_SECONDS * 1000).toISOString();
  await env.OAUTH_STATE.put(state, JSON.stringify({ platform, expiresAt, codeVerifier }), { expirationTtl: STATE_TTL_SECONDS });

  const authorizationUrl = new URL(
    platform === 'instagram'
      ? 'https://www.instagram.com/oauth/authorize'
      : 'https://www.tiktok.com/v2/auth/authorize/',
  );
  if (platform === 'instagram') {
    authorizationUrl.search = new URLSearchParams({
      client_id: env.INSTAGRAM_APP_ID,
      redirect_uri: callbackUrl(env, platform),
      response_type: 'code',
      scope: 'instagram_business_basic,instagram_business_manage_insights',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state,
    }).toString();
  } else {
    authorizationUrl.search = new URLSearchParams({
      client_key: env.TIKTOK_CLIENT_KEY,
      redirect_uri: callbackUrl(env, platform),
      response_type: 'code',
      scope: 'user.info.basic,user.info.profile,user.info.stats,video.list',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state,
    }).toString();
  }

  return json({ url: authorizationUrl.toString(), expiresAt });
}

async function exchangeInstagramCode(env, code, codeVerifier) {
  const body = new URLSearchParams({
    client_id: env.INSTAGRAM_APP_ID,
    client_secret: env.INSTAGRAM_APP_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: callbackUrl(env, 'instagram'),
    code,
    code_verifier: codeVerifier,
  });
  const response = await fetch('https://api.instagram.com/oauth/access_token', { method: 'POST', body });
  if (!response.ok) throw new Error(`Instagram authorization failed (${response.status}).`);
  const token = await response.json();

  const exchange = new URL('https://graph.instagram.com/access_token');
  exchange.search = new URLSearchParams({
    grant_type: 'ig_exchange_token',
    client_secret: env.INSTAGRAM_APP_SECRET,
    access_token: token.access_token,
  }).toString();
  const longLivedResponse = await fetch(exchange);
  if (!longLivedResponse.ok) throw new Error(`Instagram token exchange failed (${longLivedResponse.status}).`);
  const longLived = await longLivedResponse.json();
  return { accessToken: longLived.access_token, refreshToken: null, userId: String(token.user_id), expiresAt: Date.now() + Number(longLived.expires_in) * 1000 };
}

async function exchangeTikTokCode(env, code, codeVerifier) {
  const body = new URLSearchParams({
    client_key: env.TIKTOK_CLIENT_KEY,
    client_secret: env.TIKTOK_CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
    redirect_uri: callbackUrl(env, 'tiktok'),
    code_verifier: codeVerifier,
  });
  const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!response.ok) throw new Error(`TikTok authorization failed (${response.status}).`);
  const responseBody = await response.json();
  const token = responseBody.data ?? responseBody;
  return {
    accessToken: token.access_token,
    refreshToken: token.refresh_token,
    userId: String(token.open_id ?? ''),
    expiresAt: Date.now() + Number(token.expires_in) * 1000,
  };
}

async function handleCallback(env, platform, url) {
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  if (!state || !code || !/^[a-f0-9]{64}$/u.test(state) || code.length > 2048) {
    return protectedText('The connection could not be completed. You can close this window.', 400);
  }

  const storedState = await env.OAUTH_STATE.get(state);
  await env.OAUTH_STATE.delete(state);
  if (!storedState) return protectedText('This connection link has expired. Ask for a new one.', 400);

  const connection = JSON.parse(storedState);
  if (connection.platform !== platform || Date.parse(connection.expiresAt) < Date.now()) {
    return protectedText('This connection link has expired. Ask for a new one.', 400);
  }

  try {
    const token = platform === 'instagram'
      ? await exchangeInstagramCode(env, code, connection.codeVerifier)
      : await exchangeTikTokCode(env, code, connection.codeVerifier);
    await env.TOKENS.put(platform, await encryptToken(env, token));
    await refreshPublicStats(env);
    return protectedText('Connection complete. Your public follower figure will update shortly. You can close this window.');
  } catch {
    return protectedText('The connection could not be completed. Ask for a new connection link.', 502);
  }
}

async function refreshInstagramToken(env, token) {
  if (token.expiresAt - Date.now() > 14 * 24 * 60 * 60 * 1000) return token;
  const refresh = new URL('https://graph.instagram.com/refresh_access_token');
  refresh.search = new URLSearchParams({ grant_type: 'ig_refresh_token', access_token: token.accessToken }).toString();
  const response = await fetch(refresh);
  if (!response.ok) throw new Error(`Instagram token refresh failed (${response.status}).`);
  const next = await response.json();
  return { ...token, accessToken: next.access_token, expiresAt: Date.now() + Number(next.expires_in) * 1000 };
}

async function refreshTikTokToken(env, token) {
  if (token.expiresAt - Date.now() > 24 * 60 * 60 * 1000) return token;
  const body = new URLSearchParams({
    client_key: env.TIKTOK_CLIENT_KEY,
    client_secret: env.TIKTOK_CLIENT_SECRET,
    grant_type: 'refresh_token',
    refresh_token: token.refreshToken,
  });
  const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!response.ok) throw new Error(`TikTok token refresh failed (${response.status}).`);
  const next = await response.json();
  return {
    ...token,
    accessToken: next.access_token,
    refreshToken: next.refresh_token ?? token.refreshToken,
    expiresAt: Date.now() + Number(next.expires_in) * 1000,
  };
}

async function instagramFollowers(token) {
  const profile = new URL(`https://graph.instagram.com/${token.userId}`);
  profile.search = new URLSearchParams({ fields: 'followers_count', access_token: token.accessToken }).toString();
  const response = await fetch(profile);
  if (!response.ok) throw new Error(`Instagram stats fetch failed (${response.status}).`);
  return Number((await response.json()).followers_count);
}

async function tiktokFollowers(token) {
  const profile = new URL('https://open.tiktokapis.com/v2/user/info/');
  profile.search = new URLSearchParams({ fields: 'follower_count' }).toString();
  const response = await fetch(profile, { headers: { Authorization: `Bearer ${token.accessToken}` } });
  if (!response.ok) throw new Error(`TikTok stats fetch failed (${response.status}).`);
  return Number((await response.json()).data?.user?.follower_count);
}

async function refreshPlatform(env, platform) {
  const storedToken = await env.TOKENS.get(platform);
  if (!storedToken) return null;
  const decrypted = await decryptToken(env, storedToken);
  const token = platform === 'instagram'
    ? await refreshInstagramToken(env, decrypted)
    : await refreshTikTokToken(env, decrypted);
  await env.TOKENS.put(platform, await encryptToken(env, token));
  const followers = platform === 'instagram' ? await instagramFollowers(token) : await tiktokFollowers(token);
  return Number.isSafeInteger(followers) && followers >= 0 ? { followers } : null;
}

async function refreshPublicStats(env) {
  const previous = await env.PUBLIC_STATS.get('current');
  const cached = previous ? JSON.parse(previous) : {};
  const [instagram, tiktok] = await Promise.all([
    refreshPlatform(env, 'instagram').catch(() => cached.instagram),
    refreshPlatform(env, 'tiktok').catch(() => cached.tiktok),
  ]);
  if (!instagram && !tiktok) return;
  await env.PUBLIC_STATS.put('current', JSON.stringify({ updatedAt: new Date().toISOString(), instagram, tiktok }));
}

function publicHeaders(request, env) {
  const origin = request.headers.get('Origin');
  return origin === env.PUBLIC_SITE_ORIGIN
    ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin', 'Cache-Control': `public, max-age=${STATS_TTL_SECONDS}` }
    : { 'Cache-Control': `public, max-age=${STATS_TTL_SECONDS}` };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const match = url.pathname.match(/^\/v1\/oauth\/(instagram|tiktok)\/callback$/);
    if (request.method === 'GET' && match) return handleCallback(env, match[1], url);

    const platformMatch = url.pathname.match(/^\/v1\/admin\/connections\/(instagram|tiktok)$/);
    if (request.method === 'POST' && platformMatch) return createConnection(request, env, platformMatch[1]);

    if (request.method === 'GET' && url.pathname === '/v1/public/stats') {
      const stats = await env.PUBLIC_STATS.get('current');
      return stats
        ? new Response(stats, { headers: { 'Content-Type': 'application/json; charset=utf-8', ...publicHeaders(request, env) } })
        : json({ error: 'No figures connected yet.' }, 503, publicHeaders(request, env));
    }

    return json({ error: 'Not found.' }, 404);
  },

  async scheduled(_, env) {
    await refreshPublicStats(env);
  },
};
