import 'virtual:windi.css'
import './custom.scss'
import { useDark, useToggle } from '@vueuse/core'
import { SCheckboxSolo } from '@/lib'

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
    components: { Story, SCheckboxSolo },
    template: `
      <div>
        <SCheckboxSolo
          v-model="isNeomorph"
          style="margin-bottom: 10px;"
          :checked="isNeomorph"
          @click="toggleNeumorphism()"
        >
          Toggle Neumorphism
        </SCheckboxSolo>
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
