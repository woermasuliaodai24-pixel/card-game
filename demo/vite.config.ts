import { defineConfig } from 'vitest/config'

const repositoryRoot = decodeURIComponent(new URL('../', import.meta.url).pathname).replace(
  /^\/([A-Za-z]:)/,
  '$1',
)

export default defineConfig({
  base: './',
  server: {
    fs: {
      allow: [repositoryRoot],
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
  },
})
