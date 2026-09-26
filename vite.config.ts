import { defineConfig } from "vite";

export default defineConfig({
  server: { port: 5391 },
  preview: { port: 5392 },
  build: { chunkSizeWarningLimit: 2000 },
  test: { include: ["tests/**/*.test.ts"], testTimeout: 60000 },
} as any);
