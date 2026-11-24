import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
const base = process.env.SITE_BASE || '/';
function routes(dir = 'dist'): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const file = join(dir, e.name);
    if (e.isDirectory()) return routes(file);
    if (!file.endsWith('.html') || readFileSync(file, 'utf8').includes('http-equiv="refresh"')) return [];
    return [base + relative('dist', file).replace(/index\.html$/, '')];
  });
}
test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).origin === 'http://127.0.0.1:4343' ? route.continue() : route.abort());
});
for (const route of routes()) {
  test(`page health and accessibility: ${route}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.url().startsWith('http://127.0.0.1:4343') && r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
    expect((await page.goto(route))?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    await page.locator('img').evaluateAll(images => images.forEach(i => { (i as HTMLImageElement).loading = 'eager'; }));
    await expect.poll(async () => await page.locator('img').evaluateAll(images => images.filter(i => !(i as HTMLImageElement).complete || !(i as HTMLImageElement).naturalWidth).map(i => i.getAttribute('src')))).toEqual([]);
    const result = await new AxeBuilder({ page }).analyze();
    await testInfo.attach('axe-review', { body: JSON.stringify(result.incomplete), contentType: 'application/json' });
    expect(result.violations).toEqual([]);
    expect(errors).toEqual([]);
    if (route === base) await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true });
  });
}
test('keyboard navigation and volunteer journey', async ({ page }, testInfo) => {
  await page.goto(base);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  if (testInfo.project.name === 'mobile') {
    const menu = page.locator('.mobile-menu > summary');
    await menu.focus(); await page.keyboard.press('Enter');
    await expect(page.locator('.mobile-menu')).toHaveAttribute('open', '');
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.keyboard.press('Escape');
    await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open');
    await expect(menu).toBeFocused();
  }
  await page.goto(base + 'volunteer/');
  await expect(page.locator('a[href="https://forms.gle/iZt6DJF9YRQfXHHx5"]').first()).toBeVisible();
  await page.goto(base + 'donate/');
  await expect(page.locator('main a[href*="heartlandta.org"]').first()).toBeVisible();
});

test('homepage volunteer journey and navigation at layout boundaries', async ({ page }) => {
  for (const viewport of [
    { width: 320, height: 640 }, { width: 900, height: 800 },
    { width: 1200, height: 800 }, { width: 1201, height: 800 },
    { width: 1280, height: 320 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto(base);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    if (viewport.width > 480) await expect(page.locator('.nav-volunteer')).toBeVisible();
    else await expect(page.locator('.home-hero').getByRole('link', { name: 'Volunteer with SJS', exact: true })).toBeVisible();
    const disclosure = page.locator(viewport.width <= 1200 ? '.mobile-menu > summary' : '.more-menu > summary');
    await disclosure.click();
    const panel = page.locator(viewport.width <= 1200 ? '.mobile-panel' : '.more-panel');
    await expect(panel).toBeVisible();
    const donate = panel.getByRole('link', { name: 'Donate', exact: true });
    if (viewport.width <= 1200) await panel.locator('.mobile-secondary > summary').click();
    await donate.scrollIntoViewIfNeeded();
    await expect(donate).toBeInViewport();
    await page.keyboard.press('Escape');
    await expect(disclosure).toBeFocused();
    await page.locator('.home-hero').getByRole('link', { name: 'Volunteer with SJS', exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${base}volunteer/`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Volunteer with Safe Journey Sanctum');
    await expect(page.locator('a[href="https://forms.gle/iZt6DJF9YRQfXHHx5"]').first()).toBeVisible();
  }
});

test('volunteer entry point works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`http://127.0.0.1:4343${base}`);
  await page.locator('.home-hero').getByRole('link', { name: 'Volunteer with SJS', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Volunteer with Safe Journey Sanctum');
  await context.close();
});
