import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function domainReplacePlugin(): Plugin {
  return {
    name: "domain-replace",
    apply: "build",
    closeBundle() {
      const domain: string | undefined = process.env.VITE_DOMAIN;
      if (!domain) return;
      const distDir: string = resolve(process.cwd(), "dist");
      for (const file of ["sitemap.xml", "robots.txt"]) {
        const fp: string = resolve(distDir, file);
        if (existsSync(fp)) {
          const content: string = readFileSync(fp, "utf-8");
          writeFileSync(fp, content.replace(/%VITE_DOMAIN%/g, domain), "utf-8");
        }
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    domainReplacePlugin(),

    // 2. CONFIGURACIÓN DEL PLUGIN AÑADIDA AL FINAL
    VitePWA({
      registerType: "autoUpdate",
      // Incluye aquí los archivos estáticos que necesitan cachearse offline
      includeAssets: ["icon-192.png", "icon-512.png"],
      manifest: {
        name: "LiquidChofer",
        short_name: "LiquidChofer",
        description: "Calculadora de liquidación para conductores",
        start_url: "/",
        display: "standalone",
        background_color: "#130c2a",
        theme_color: "#8b5cf6",
        icons: [
          { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
