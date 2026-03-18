import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { inspectOverlay } from "./inspect-overlay.vite.ts";

// https://vite.dev/config/
export default defineConfig({
  server: { allowedHosts: [".trycloudflare.com"] },
  plugins: [
    react({
      babel: {
        plugins: ["@react-dev-inspector/babel-plugin"],
      },
    }),
    tailwindcss(),
    inspectOverlay(),
  ],
});
