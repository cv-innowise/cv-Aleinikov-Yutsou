import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    watch: false,
    setupFiles: ["test/setup.ts"],
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
  },
});
