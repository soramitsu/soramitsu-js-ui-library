import { defineConfig } from 'vite'
import windi from 'vite-plugin-windicss'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': `${path.resolve(__dirname, '../src')}`,
    },
  },
  plugins: [windi({ config: path.resolve(__dirname, '../windi.config.ts') })],
})
