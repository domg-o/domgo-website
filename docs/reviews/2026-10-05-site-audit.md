# Site audit: TDD, security and React testing

Reviewed 5 October 2026. Application code was not changed during this audit.
The review covers the local working tree, not a newly deployed production release.
Skills applied: ECC tdd-workflow, security-review and react-testing.

## Outcome

The current tests and production build pass. The site does **not** yet meet every
requirement of the requested skills. In particular, strict historical TDD cannot
be certified, analytics withdrawal needs strengthening, and several test/error
paths remain uncovered. Passing tests are not proof of complete security or legal
compliance.

## Checks actually run

| Check | Result | Scope / limitation |
| --- | --- | --- |
| ECC package-manager detector | npm, detected from lockfile | Test runner is Vitest; browser runner is Playwright |
| `npm run check` | Lint, coverage and build passed; browser stage initially blocked by sandbox permissions | Local server could not bind port 4175 (`EPERM`), not a test assertion failure |
| `npm run test:e2e`, rerun with permission | 12 passed | Six flows each on desktop Chrome and mobile-sized Chrome |
| `npm audit --json`, rerun with network permission | Zero reported vulnerabilities | Snapshot of known registry advisories, not proof of no vulnerabilities |
| Pattern-based secret scan | No matches in 54 current source/config/document files or 24 revisions reachable across local Git refs | Limited patterns; not an exhaustive detector; secret values were not printed |
| `git diff --check` | Existing trailing whitespace in `FEEDBACK.md:2` | Left untouched; not a functional/security defect |

Vitest: six files, 20 passing tests. Coverage: 95.16% statements, 82.08% branches,
96.29% functions, 97.97% lines. The denominator is the ten explicitly selected
interactive/data modules in `vitest.config.ts`, **not all application code**.
App, Portfolio, StaticSections, icons, legacy unused components and scripts are
not included. Compact JSX lines make line coverage less informative than behavior
and branch coverage. E2E results are separate; they do not inflate unit coverage.

## TDD evidence and limits

Source plan: the user's approved design and conversation; no separate plan file.

The preceding implementation wrote `test/ContentSections.test.tsx` before the new
components and ran `npm test -- test/ContentSections.test.tsx`. It failed because
the imported Hobbies component did not exist. This is missing-implementation
import/compile RED evidence, **not an executed behavior assertion** (zero tests
ran at that point). After implementing the components, that target passed seven
tests. This is partial tests-first evidence, not a complete feature-by-feature
runtime RED/GREEN record.

Browser checks were added after implementation. Subsequent copy, font and default
filter refinements were not each preceded by a recorded failing test. There are
no current-task RED/GREEN/refactor checkpoint commits on the active branch
`feat/jody-is-plotting-something` (HEAD `8099018`); the changes remain in the working
tree. This audit does not rewrite history or manufacture retroactive checkpoints.

For future approved fixes: write the specific failing behavior test, run it and
confirm the intended failure, checkpoint only task-owned files, make the minimal
fix, rerun the same target, checkpoint GREEN, then refactor and rerun coverage and
browser checks. Preserve the evidence here or in a task-specific report.

## User journeys and existing guarantees

| Journey / guarantee | Evidence | Result and boundary |
| --- | --- | --- |
| Visitor ranks recorded hobby counts without changing source data | `test/ContentSections.test.tsx` | PASS; only two known counts, not all TikTok uploads |
| Visitor switches hobby selection and opens a particular post | Same component target; `e2e/portfolio.spec.ts` | PASS; recent order is website series order, not verified upload dates |
| Visitor cycles client feedback in either direction | Component and browser tests | PASS; quote permissions/attribution are editorial checks |
| No YouTube player exists before visitor activation | Component and browser tests | PASS; browser initial-visit test records no external requests |
| Visitor loads/unloads player and regains focus | Component and browser tests | PASS; browser provider response is mocked, not a Google playback guarantee |
| Missing thumbnail keeps playback/external controls available | Component test | PASS; blocked/deleted/private video states are not covered |
| Visitor switches audience platform | Component test | PASS; historical figures are not authenticated live data |
| Visitor chooses necessary-only, persists choice and reopens controls | Privacy tests and browser flow | PASS; withdrawal after real analytics initialization is not tested |
| Campaign selection changes visible case study and announcement | Campaign and browser tests | PASS |
| Email copying succeeds or presents an access-denied fallback | Contact tests | PASS |
| Mobile menu closes after navigation or Escape | Header tests | PASS in JSDOM; native keyboard behavior needs broader browser coverage |
| Section links and mobile page width work | Browser tests | PASS on configured Chrome viewports, not Safari/Firefox/real iOS |
| Selected sections have no axe-detectable violations | Campaign test and combined content-section test | PASS for tested states; color contrast disabled in JSDOM |

## Findings, ordered by importance

### S1 — High priority: analytics withdrawal does not reliably disable an initialized tag

`src/components/Analytics.tsx:41–44` removes the script node and deletes global
helpers. That does not undo event listeners/timers installed by a script that has
already executed. There is no GA measurement-ID disable flag or consent-state
update before cleanup. The user-facing privacy panel promises withdrawal at any
time, but existing tests check DOM cleanup rather than cessation of collection.

This is a code-review finding, not a claim that a real post-withdrawal beacon was
captured in this audit. It matters when a valid GA ID is configured and a visitor
first allows then withdraws permission. Before publishing with analytics enabled,
add provider-aware disabling and a network-level regression test, including rapid
grant/withdraw while the library is loading. Handle cookie cleanup according to
the agreed privacy behavior. Preserve the current no-request-before-opt-in model;
do not silently switch to cookieless pings.

[Google's documented analytics-disable mechanism](https://developers.google.com/tag-platform/security/guides/privacy)
uses `window['ga-disable-MEASUREMENT_ID']`; deleting a script is not that mechanism.

### R1 — Medium: player-load success is not playback success

`src/components/portfolio/YouTube.tsx:19` treats iframe `onLoad` as readiness.
Blocked/failed navigation and a provider error screen are not reliably identified
by that event. There is no player-specific error state or timeout/retry behavior.
The external watch link is a useful existing fallback. Add browser tests for
aborted/blocked requests and unavailable playback; if automatic player-error
feedback is desired, use YouTube's supported player API rather than inspecting a
cross-origin document. Do not claim the current mocked browser test proves this.

### R2 — Medium: coverage enforcement and accessibility checks are incomplete

`vitest.config.ts:29` enforces 70% branches, whereas the requested TDD skill calls
for 80% minimum. Aggregate branches currently exceed 80%, but Header is 50%,
Hobbies 71.42%, and CampaignWork/Contact 75%. Aggregate passing coverage does not
prove all edge cases are tested.

Add storage-blocked/invalid preference cases, analytics withdrawal and regrant,
hobby empty/unknown-count/boundary datasets, and player failure scenarios. Pure
ranking tests are tied to the current five-record fixture; there is no test of
more than five qualifying records. Header, Contact and PrivacyPreferences do not
have axe checks; the combined content axe test covers initial states only, not
loaded player and changed filters. Add meaningful keyboard/focus/browser checks
and browser-level contrast verification. Unit selectors should prefer accessible
queries: replace the iframe absence `container.querySelector` in the content test
with a title-based query. DOM inspection for script lifecycle is an intentional
side-effect assertion, not a substitute for analytics network testing.

### C1 — Medium: filter labels promise more than the content supports

`src/components/portfolio/content.ts:12–22` contains four ordered episodes and one
separate Bowls clip. Only two records have view counts. There are no upload
timestamps. Therefore “Top 5” cannot show a complete five-post ranking, and “Most
recent” is not true upload chronology. The explanatory notes are honest but too
much implementation detail for the public page. The sparse ranked view is the
direct consequence of replacing prototype sample entries with verified content.

Until real metadata is available, recommend “Most watched” / “Selected episodes”
and a concise dated snapshot note. After an authorized sync, use actual upload
dates and rank the identified hobby-series posts by refreshed view count. Confirm
whether clips/promos and full episodes should compete in the same ranking.

### S2 — Low: deployment/CSP hardening remains

`index.html:9` permits inline styles and local-development WebSocket hosts in the
production policy. Inline styles support the trusted audience bars, but this is
compatibility debt: move styling to a stricter approach before removing the
permission. This is **not** an inline-JavaScript permission; script policy has no
`unsafe-inline` or `unsafe-eval`.

There is no repository-defined HTTP `frame-ancestors` policy or other server
security-header configuration. A meta CSP cannot enforce `frame-ancestors`;
hosting/edge configuration must supply it. This is lower impact for a read-only
portfolio without accounts or transactions. Production response headers were not
certified by this local audit. Action versions are tag-pinned, not immutable SHA
pinned; Dependabot is configured. Consider splitting build/deploy permissions and
pinning Actions to reviewed SHAs.

[CSP framing limitations](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)

### I1 — Integration prerequisite: the old fetch script is not a working content sync

`scripts/fetch-stats.mjs:29–37` puts TikTok `fields` in the JSON body instead of the
documented URL query parameter. It fetches at most 20 videos without pagination,
does not check TikTok's application-level `error.code`, has no token-refresh
handling, and returns aggregate engagement rather than the video list. Its
YouTube path fetches channel statistics, not uploads. Failed fetches are replaced
with null and still written to disk, instead of preserving last-known-good data.
It is not called by the deployment workflow, and the active portfolio does not
consume its output. It must be corrected and tested before use; merely adding
credentials will not make these sections update.

Before connecting providers, validate response schemas and HTTPS destination
hosts, redact error logs, implement timeouts/retries and pagination, refresh tokens
securely, and keep credentials server-side or in CI secrets (never `VITE_*`). Do
not insert returned `embed_html` through untrusted HTML. Preserve cache on failure
and make freshness visible. This script was inspected, **not executed** with
account credentials during the audit.

## Security positives / scope exclusions

- React renders trusted text; no `dangerouslySetInnerHTML`/`eval` path was found.
- Active portfolio external new-tab links have `noopener noreferrer`.
- GA IDs are validated before constructing the script URL.
- Fonts and poster are local; initial browser tests observed no third-party
  requests. YouTube is a cross-origin iframe on an explicit allowed origin.
- `.env` is ignored, `.env.local` is covered by `*.local`, and only `.env.example`
  is tracked. Provider credentials in the old script are read from environment.
- This portfolio has no login, user uploads, database, checkout, or state-changing
  public API. SQL injection, authentication, CSRF, payment and wallet checks are
  not applicable to the current deployed application architecture. Those checks
  become relevant if an integration backend/admin interface is introduced.

## YouTube button and updates

The load gate delays contact with YouTube/Google until the visitor chooses. It is
not a requirement for embedding itself. Privacy-enhanced mode reduces
personalization; it is not a zero-data-transfer guarantee. Keep an explicit
activation step, but simplify the duplicate controls to one clear thumbnail
action, such as “Load YouTube player”, with the privacy explanation beside it.
The current player does not autoplay, so another Play click inside YouTube is
normally needed. Changing that interaction should be a separate approved change.

Current video ID `FTV8gAQ1dLM` is fixed in `content.ts:24–29`. A new client upload
does **not** update it. A proposed scheduled sync would retrieve the channel's
uploads playlist, choose the newest eligible public video, update its ID/title/
thumbnail together, and retain the previous valid result if the provider fails.
This could publish cached public JSON for the static site; no visitor needs to
authorize or receive credentials. Updates occur at the agreed refresh interval,
not instantly. Decide whether Shorts, livestreams and premieres are eligible.

[YouTube embedding/privacy mode](https://support.google.com/youtube/answer/171780?hl=en)
and [official uploads retrieval](https://developers.google.com/youtube/v3/sample_requests).

## TikTok: possible, but not an unauthenticated playlist fetch

TikTok's Display API supports public-video metadata, creation dates and view
counts for an authorized creator. An approved developer app, Login Kit/API
access, relevant scopes and Dom's account authorization are required. Secrets and
refresh tokens must remain server-side. The standard video-list interface is
paginated and newest-first; its documented request/video object does not provide
a ready-made hobby-playlist ranking. Recommendation/inference: identify hobby
posts by approved video IDs or a consistent series tag, then sort the cached
subset by date or views. This is not a claim that every TikTok product lacks
playlist capabilities. Covers expire, so thumbnail handling needs a refresh
strategy too.

[TikTok setup requirements](https://developers.tiktok.com/docs/en/display-api-get-started),
[list request and pagination](https://developers.tiktok.com/docs/en/tiktok-api-v2-video-list),
[available video fields and cover lifetime](https://developers.tiktok.com/docs/en/tiktok-api-v2-video-object),
[server-side token requirements](https://developers.tiktok.com/docs/en/login-kit-overview).

## Questions for Dom before integration/publishing

1. Is he comfortable authorizing a read-only TikTok integration, and is there
   already an approved developer app? No password needs to be shared in this chat.
2. Should hobby ranking include clips/promos, or only full episodes? What reliably
   identifies new posts in that series?
3. Should the YouTube feature show every public upload or just long-form videos?
4. Who owns the site/enquiry data, which analytics/providers will be enabled, and
   what privacy notice/retention wording should be professionally reviewed?
5. Confirm current metric dates, testimonial publication permissions and exact
   missing campaign links as already listed in `CONTENT_HANDOFF.md`.

No new service, sync schedule, credentials, production deployment or application
fix was added during this review. Proposed fixes require the user's go-ahead.
