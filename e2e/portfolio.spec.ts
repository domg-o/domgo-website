import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test('visitor can make and later reopen a privacy choice', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Your privacy choices' })).toBeVisible();
  await page.getByRole('button', { name: 'Use necessary only' }).click();
  await expect(page.getByRole('heading', { name: 'Your privacy choices' })).toBeHidden();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'Your privacy choices' })).toBeHidden();
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await expect(page.getByRole('heading', { name: 'Your privacy choices' })).toBeVisible();
});

test('campaign selection updates the visible case study', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Use necessary only' }).click();
  await page.getByRole('button', { name: /UNiDAYS 2.4M views/i }).click();

  await expect(page.getByRole('heading', { name: /A student budget. A familiar face./i })).toBeVisible();
  await expect(page.getByText('Showing UNiDAYS campaign. 2.4M views.')).toBeAttached();
});

test('direct section links and the page width work at each viewport', async ({ page }) => {
  await page.goto('/#press');
  await page.getByRole('button', { name: 'Use necessary only' }).click();

  await expect(page.getByRole('heading', { name: 'Beyond the feed.' })).toBeInViewport();
  const sizes = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth + 1);
});

test('initial visit is clean, private by default, and crawlable', async ({ page, request }) => {
  const browserErrors: string[] = [];
  const externalRequests: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') browserErrors.push(message.text());
  });
  page.on('pageerror', error => browserErrors.push(error.message));
  page.on('request', outgoing => {
    const url = new URL(outgoing.url());
    if (!['127.0.0.1', 'localhost'].includes(url.hostname)) externalRequests.push(outgoing.url());
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(browserErrors).toEqual([]);
  expect(externalRequests).toEqual([]);

  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain('Sitemap: https://domgo.co.uk/sitemap.xml');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain('<loc>https://domgo.co.uk/</loc>');
});

test('approved sections, filters and testimonial controls work without overflow', async ({ page }) => {
  await page.goto('/#hobbies');
  await page.getByRole('button', { name: 'Use necessary only' }).click();
  await expect(page.getByRole('heading', { name: '100 ways to log off.' })).toBeInViewport();
  await page.getByRole('button', { name: 'Episodes' }).click();
  await expect(page.getByRole('link', { name: /Watch Swimming/i })).toHaveAttribute('href', 'https://vm.tiktok.com/ZN8LpPD2s/');
  await page.getByRole('button', { name: 'Previous testimonial' }).click();
  await expect(page.getByText('“Looks good, thank you!”')).toBeVisible();
  await page.getByRole('button', { name: /Currys × Acer Partnership/i }).click();
  await expect(page.getByText('Sponsored partnership', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: /Rains 11M views/i }).click();
  await expect(page.getByText('Showing Rains campaign. 11M views.')).toBeAttached();
  const colours = await page.evaluate(() => Object.fromEntries(['work', 'hobbies', 'youtube', 'contact'].map(id => [id, getComputedStyle(document.getElementById(id)!).backgroundColor])));
  expect(colours).toEqual({ work: 'rgb(34, 35, 31)', hobbies: 'rgb(34, 35, 31)', youtube: 'rgb(215, 25, 45)', contact: 'rgb(56, 89, 191)' });
  const sizes = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  expect(sizes.scrollWidth).toBeLessThanOrEqual(sizes.clientWidth + 1);
});

test('YouTube loads only after a visitor requests it and can be unloaded', async ({ page }) => {
  // Stub the provider to test our boundary deterministically, not Google's uptime.
  let playerRequests = 0;
  await page.route('https://www.youtube-nocookie.com/embed/**', async route => {
    playerRequests += 1;
    await route.fulfill({ contentType: 'text/html', body: '<html lang="en"><body><button>Play video</button></body></html>' });
  });
  await page.goto('/#youtube');
  await page.getByRole('button', { name: 'Use necessary only' }).click();
  await expect(page.locator('iframe')).toHaveCount(0);
  expect(playerRequests).toBe(0);
  await page.getByRole('button', { name: 'Load YouTube video' }).click();
  await expect(page.getByTitle('Can I profit from an all-you-can-eat buffet?')).toBeVisible();
  await expect(page.frameLocator('iframe').getByRole('button', { name: 'Play video' })).toBeVisible();
  expect(playerRequests).toBe(1);
  const playerSize = await page.locator('iframe').boundingBox();
  expect(playerSize!.height).toBeGreaterThanOrEqual(200);
  expect(playerSize!.width).toBeGreaterThanOrEqual(200);
  await page.getByRole('button', { name: 'Unload video' }).click();
  await expect(page.locator('iframe')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Load video here' })).toBeFocused();
});
