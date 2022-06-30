import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const response_headers_cache = function () {
  return {
    name: "configure-response-headers",
    configurePreviewServer: (server) => {
      server.middlewares.use((_req, res, next) => {
        res.setHeader("Cache-Control", "private, max-age=604800");
        next();
      });
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), response_headers_cache()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      }
    }
  }
})
