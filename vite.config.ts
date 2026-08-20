import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

/**
 * The live-stats API returns Access-Control-Allow-Origin for the production
 * site only, so the browser blocks it when the page is served from localhost.
 * In development the page therefore calls this same-origin path instead and
 * Vite forwards it — server to server, where CORS does not apply — so local
 * development sees the same real figures production does, with no backend
 * change and nothing to remember to switch off. Dev-only: `server.proxy` is
 * not part of the build.
 *
 * Keep the target in step with API_BASE in app/constants.ts.
 */
const DEV_API_PROXY = "/__api";
const API_ORIGIN =
  "https://chatlivecontainer.wonderfulbeach-a47f64a5.southafricanorth.azurecontainerapps.io";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
  ],
  server: {
    proxy: {
      [DEV_API_PROXY]: {
        target: API_ORIGIN,
        changeOrigin: true,
        rewrite: path => path.replace(new RegExp(`^${DEV_API_PROXY}`), "/api"),
      },
    },
  },
});
