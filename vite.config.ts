import { defineConfig } from "vite";

// /api is served by the local AI bridge (npm run bridge)
const proxy = { "/api": { target: "http://127.0.0.1:8787", changeOrigin: true } };

export default defineConfig({
  server: { port: 5391, proxy },
  preview: { port: 5392, proxy },
  build: { chunkSizeWarningLimit: 2000 },
  // files run one after another: the garment timing test must not compete with other test workers
  test: { include: ["tests/**/*.test.ts"], testTimeout: 60000, fileParallelism: false },
} as any);
