import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/lib.ts',
      formats: ['cjs'],
      fileName: () => 'vite-plugin-svg.cjs'
    },
    rollupOptions: {
      external: ['@vue/compiler-sfc', 'svgo', 'fs/promises']
    },
    sourcemap: true,
    minify: false,
    target:  'esnext'        
  }
})
