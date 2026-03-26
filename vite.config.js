import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        swipe: resolve(__dirname, 'swipe.html'),
        create: resolve(__dirname, 'create.html'),
      },
    },
  },
})
