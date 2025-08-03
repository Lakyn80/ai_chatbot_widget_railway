import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  base: "/",
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {},
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `chat-widget.js`,     // ✅ název JS souboru
        assetFileNames: `frontend.css`,       // ✅ název CSS souboru
      },
    },
    lib: {
      entry: path.resolve(__dirname, "src/embed.jsx"),
      name: "ChatbotWidget",
      formats: ["iife"],
      fileName: () => `chat-widget.js`, // ✅ nutné pro formát iife
    },
    outDir: "../backend/static",  // ✅ správná složka
    emptyOutDir: false,           // ✅ NEmazat složku (zachová init-chat-widget.js)
  },
});
