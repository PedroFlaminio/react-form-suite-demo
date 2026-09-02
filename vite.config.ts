import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-form-suite": new URL(
        "../packages/react-form-suite/src/index.ts",
        import.meta.url,
      ).pathname,
    },
  },
});
