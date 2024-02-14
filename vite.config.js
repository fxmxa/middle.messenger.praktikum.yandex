import {defineConfig} from "vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  css: {
    modules: {
      localsConvention: 'dashes'
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  },
})
