import { defineConfig } from '@playwright/test';
const base = process.env.SITE_BASE || '/';
export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 45000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4343',
    trace: 'retain-on-failure', screenshot: 'only-on-failure', serviceWorkers: 'block',
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: `npm run preview -- --host 127.0.0.1 --port 4343 --base ${base}`,
    url: `http://127.0.0.1:4343${base}`,
    reuseExistingServer: false,
  },
});
