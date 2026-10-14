# Live social figures service

This service is deliberately separate from the GitHub Pages site. It creates short-lived authorisation links for Dom, keeps Instagram/TikTok tokens encrypted, refreshes public follower figures every six hours, and exposes only the safe response used by the portfolio.

## What it exposes

`GET /v1/public/stats` returns only:

```json
{
  "updatedAt": "2026-10-11T09:00:00.000Z",
  "instagram": { "followers": 25001 },
  "tiktok": { "followers": 90123 }
}
```

It never exposes app secrets, access tokens, refresh tokens, profile identifiers, post metadata, or private account data.

## One-time connection links

1. Deploy the Worker after creating the four KV namespaces in `wrangler.toml.example`.
2. Store the following as Worker **secrets**, never in this repository or the Vite website:
   - `CONNECT_ADMIN_TOKEN` — used only to mint a link for Dom.
   - `TOKEN_ENCRYPTION_KEY` — a random 32-byte key encoded with base64.
   - `INSTAGRAM_APP_ID` and `INSTAGRAM_APP_SECRET`.
   - `TIKTOK_CLIENT_KEY` and `TIKTOK_CLIENT_SECRET`.
3. Set `OAUTH_CALLBACK_ORIGIN` to the deployed Worker origin. Register both generated callback addresses in Meta and TikTok before use:
   - `/v1/oauth/instagram/callback`
   - `/v1/oauth/tiktok/callback`
4. Generate a link privately with an authenticated `POST /v1/admin/connections/instagram` or `POST /v1/admin/connections/tiktok` request. It returns a URL that expires after 15 minutes. Send that URL to Dom; he signs in directly with the platform and approves it.
5. Set `VITE_SOCIAL_STATS_URL` in the GitHub Pages build environment to `https://YOUR-WORKER.workers.dev/v1/public/stats`, then rebuild the portfolio.

Do not send Dom an app secret, a client key, access token, refresh token, or an administrator connection token. He only receives the generated approval URL.

## Platform prerequisites

- **Instagram:** Dom must use a professional Creator or Business account and authorise the Meta app. The requested scopes are limited to basic professional-account information and insights.
- **TikTok:** The app must be approved for the Login Kit and the profile/statistics/video scopes requested by the service. Dom authorises the TikTok account through the generated URL.

The relevant platform policies and approved app configuration can change. Before production deployment, confirm the scopes and callback URLs in the current Meta and TikTok developer consoles.

## Operational safeguards

- Connection state is random, PKCE-bound, single-use and expires after 15 minutes.
- OAuth tokens are AES-GCM encrypted before being saved in the Worker KV namespace.
- Only a bearer-protected administrator endpoint can make a connection link.
- Link minting is rate-limited and the admin endpoint has no browser CORS permission.
- A failed provider call retains the last successful public figure; it never replaces it with zero.
- The public endpoint is read-only and contains only follower totals and a timestamp.
- The Worker refreshes every six hours; this can be changed in `wrangler.toml.example` if API rate limits require a slower schedule.
