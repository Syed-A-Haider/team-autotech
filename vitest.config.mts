import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true, // Replaces vite-tsconfig-paths plugin
  },
  test: {
    // Use a fake in-memory browser - React Testing Library renders here
    environment: 'jsdom',

    // Runs setup file once before test files.
    setupFiles: ['./vitest.setup.ts'],

    // Keep Playwright tests out of Vitest's runs
    exclude: ['tests/**', 'node_modules/**'],
  },
});
