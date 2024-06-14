import 'virtual:windi.css'
import './custom.scss'
import { useDark, useToggle } from '@vueuse/core'

const isNeomorph = useDark({
  attribute: 'theme',
  valueDark: 'neumorphism',
})

const toggleNeumorphism = useToggle(isNeomorph)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withThemeProvider = (Story) => {
  return {
    components: { Story },
    template: `
      <div>
        <p>Neumorphism theme: {{ isNeomorph }}</p>
        <button @click="toggleNeumorphism()">
          Toggle Neumorphism
        </button>
        <story />
      </div>
    `,
    setup() {
      return {
        isNeomorph,
        toggleNeumorphism,
      }
    },
  }
}

export const decorators = [withThemeProvider]
