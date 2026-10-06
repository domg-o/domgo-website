# Dom: content to confirm before publishing

The approved design is now in the React source. It is not deployed by this change.
Voice: first-person, funny, witty and direct, grounded in Dom's current public site rather than invented brand claims. Please have Dom approve the final wording.

## 100 Hobbies

- Four episodes and the separate Bowls funnel post have public links on domgo.co.uk (checked 5 October 2026).
- The episode view is the default so visitors see the four real episodes first; the recorded-views filter remains available.
- Only the Bowls episode (85K) and funnel post (476K) have published view counts there. The earlier preview's sample counts and unlinked Sprinting/Gym/Studio items were not copied into production.
- The public filters are “Popular picks” and “Episodes”. Popular picks contains the two posts with recorded counts; it does not promise a complete top five.
- Episodes follows the four selected episodes in reverse website-series order, without claiming live upload chronology. Supply each episode's URL, title, episode number, upload date and dated view count before introducing a genuine latest/top-five feed. These editorial requirements belong here, not in visitor-facing copy.
- No TikTok API, scraping or automatic playlist synchronisation has been added. Direct post links and the full playlist are separate options; the football episode currently points to Instagram.

## YouTube

- Featured video: `FTV8gAQ1dLM`, “Can I profit from an all-you-can-eat buffet?” Confirm this is the video intended and that embedding is enabled in YouTube Studio.
- The video slot is manually maintained in `src/components/portfolio/content.ts`. It is labelled “Featured video”, not “Latest”, because there is no automatic channel feed.
- The poster is stored locally. The privacy-enhanced YouTube iframe is created only after a visitor explicitly clicks a load control. It does not autoplay and can be unloaded. An external watch link remains available if embedding is unavailable.
- Loading a player connects the visitor to Google/YouTube and may process device data/use storage. The inline notice describes this, separately from optional Google Analytics. Privacy-enhanced mode is not a guarantee of zero tracking after activation.

## Testimonials and campaign links

- The three original public quotes are preserved, without inventing clients, roles or campaign attribution. Ask for permission to publish client names, job titles and which campaign each quote refers to.
- TOCA Social and Currys × Acer are included, but the live site only links to Dom's profiles. Ask for exact campaign post links; these buttons currently say they open the profile.
- Confirm permissions to use partner logos and the selected video thumbnail.

## Analytics and dates

- Headline following now matches the live site's 103,975: TikTok 82,187 + Instagram 21,788.
- Campaign metrics are carried over from the public site, not a live counter.
- Audience views are 20.3M over TikTok's stated 60-day period and 6.1M over Instagram's stated 30-day period. Age percentages align with the published breakdown (86.5% and 83.1% aged 18–34).
- The live site gives periods ending 19 August but does not state the year. Please obtain a dated media kit and confirm which periods should be used before describing any figures as current. The public audience caption is simply “Recorded audience figures”; missing-year commentary is not displayed.

## Privacy / terms discussion

Ask Dom who is responsible for the website and handling enquiries, what data is collected through email and analytics, which providers are used, how long enquiry information is retained and how people can contact him about it. Include the optional YouTube player in the privacy information. Obtain appropriate professional review of the final privacy wording and any terms needed for his actual business workflow; no generic policy or unsupported compliance claim has been published here.

Automatic YouTube refresh, complete TikTok rankings and named testimonial attribution need content or integration decisions. The design does not depend on these being invented to look finished.

## Public-copy cleanup — 5 October 2026

- Removed website-snapshot explanations, testimonial-source commentary and “exact post link to follow” messages from the public page. Profile links still say “Visit my TikTok/Instagram”, matching their actual destination.
- Retained Dom's voice, genuine feedback, campaign descriptions, email brief guidance and privacy controls. The YouTube disclosure is concise; activation behavior is unchanged.
- Test-first evidence: `npm test -- test/PublicCopy.test.tsx` executed four tests and failed for the intended existing notes/old labels. After the copy changes, `npm test -- test/PublicCopy.test.tsx test/ContentSections.test.tsx test/PrivacyPreferences.test.tsx` passed all 14 tests. No checkpoint commits were made; existing working-tree changes were preserved.
- Final `npm run check` passed: lint, 24 component/integration tests, coverage, production build and 12 desktop/mobile browser checks. No deployment was performed.
