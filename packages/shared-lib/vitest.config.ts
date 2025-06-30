import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['__tests__/**/*.ts'],
    coverage: {
      reporter: ['text', 'html', 'lcov'],
      provider: 'v8',
    },
  },
});
