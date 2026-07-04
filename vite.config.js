import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base: "/",          // REQUIRED for DigitalOcean root domain
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Landing/first-visit performance: keep the initial chunk lean and make
    // large libraries load only for the routes that actually use them, while
    // caching well across deploys (they only change when the dep changes).
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          // Core React runtime — shared by every page, long-term cacheable.
          if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|react-router-hash-link|scheduler)[\\/]/.test(id))
            return "react-vendor";
          // Heavy, route-specific libraries — isolated so they stay lazy and
          // never get merged into the initial landing bundle.
          if (id.includes("framer-motion")) return "framer-motion";
          if (id.includes("swiper")) return "swiper";
          if (id.includes("recharts") || id.includes("/d3-")) return "charts";
        },
      },
    },
  },
});
