import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import { copyFileSync } from "fs";

// 🟢 Vlastní plugin pro zkopírování init skriptu
function copyInitScriptPlugin() {
  return {
    name: "copy-init-chat-widget",
    closeBundle: () => {
      const src = path.resolve(__dirname, "public/init-chat-widget.js");
      const dest = path.resolve(__dirname, "../backend/static/init-chat-widget.js");
      try {
        copyFileSync(src, dest);
        console.log("✅ init-chat-widget.js byl zkopírován do backend/static/");
      } catch (err) {
        console.error("❌ Chyba při kopírování init-chat-widget.js:", err);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), copyInitScriptPlugin()], // 🟢 Přidán plugin
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
    lib: {
      entry: path.resolve(__dirname, "src/embed.jsx"),
      name: "ChatbotWidget",
      fileName: "chat-widget",
      formats: ["iife"],
    },
    outDir: "../backend/static",
    emptyOutDir: true,
  },
});
