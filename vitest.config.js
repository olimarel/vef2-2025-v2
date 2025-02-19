// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // This ensures at least 50% line coverage
    coverage: {
      reporter: ['text', 'json', 'html'],
      lines: 50,
    },
  },
});
