import { expect, test } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.clearCookies();
});

test('visitor can make and later reopen a privacy choice', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'A small note about analytics.' })).toBeVisible();
  await page.getByRole('button', { name: 'Use necessary only' }).click();
  await expect(page.getByRole('heading', { name: 'A small note about analytics.' })).toBeHidden();

  await page.reload();
  await expect(page.getByRole('heading', { name: 'A small note about analytics.' })).toBeHidden();
  await page.getByRole('button', { name: 'Privacy choices' }).click();
  await expect(page.getByRole('heading', { name: 'A small note about analytics.' })).toBeVisible();
});

test('campaign selection updates the visible case study', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Use necessary only' }).click();
  await page.getByRole('button', { name: /UNiDAYS, 2.4M views/i }).click();

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
