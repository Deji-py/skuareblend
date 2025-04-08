import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Skuareblend",
        theme_color: "#ffffff",
        short_name: "Skuareblend",
        background_color: "#ffffff",
        display: "standalone",
        icons: [
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
          },
          {
            src: "/maskable_icon_x192.png",
            sizes: "192x192",
            purpose: "maskable",
          },
          {
            src: "/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            src: "/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            src: "/favicon.ico",
            sizes: "32x32",
          },
        ],
      },
    }),
  ],
});
