import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { getRequiredEnv, normalizeBaseUrl } from './env';

dotenv.config();

export default defineConfig({
  testDir: './src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: normalizeBaseUrl(getRequiredEnv('BASE_URL')),
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'api',
    },
  ],
});
