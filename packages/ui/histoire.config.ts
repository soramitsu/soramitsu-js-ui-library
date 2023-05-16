import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import path from 'path'
import { __dirname } from 'histoire/dist/node/util/vendors'

export default defineConfig({
  plugins: [HstVue()],
  theme: {
    title: 'Web Design System',
  },
  setupFile: '.histoire/setup.ts',
  vite: {
    server: {
      fs: {
        // FIXME: there is a bug, so I disabled it
        strict: false,
        // allow: [path.resolve(__dirname), path.resolve(__dirname, '../../')]
      },
    },
  },
})
