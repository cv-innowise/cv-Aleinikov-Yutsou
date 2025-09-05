/// <reference types="vitest/config" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    watch: false,
    setupFiles:["test/setup.ts"],
    include: ["src/**/*.test.{ts,js,jsx,tsx}"],
    coverage: {
      include: ["src/**/*.{ts,tsx,js,jsx}"],
      reporter: ["text", "json-summary", "json"],
      reportsDirectory: "./coverage",
    },
    browser: {
      provider: "playwright", // or 'webdriverio'
      enabled: true,
      headless: true,
      // at least one instance is required
      instances: [{ browser: "chromium" }],
    },
    // projects: [{
    //   extends: true,
    //   plugins: [
    //   // The plugin will run tests for the stories defined in your Storybook config
    //   // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    //   storybookTest({
    //     configDir: path.join(dirname, '.storybook')
    //   })],
    //   test: {
    //     name: 'storybook',
    //     browser: {
    //       enabled: true,
    //       headless: true,
    //       provider: 'playwright',
    //       instances: [{
    //         browser: 'chromium'
    //       }]
    //     },
    //     setupFiles: ['.storybook/vitest.setup.ts']
    //   }
    // }]
  },
});