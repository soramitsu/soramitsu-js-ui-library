import { withKnobs } from '@storybook/addon-knobs'

import Theme from '../../types/Theme'
import DesignSystem from '../../types/DesignSystem'
import { SButton, SDivider } from '../../components'
import { setTheme, setDesignSystem } from '../../utils'
import mainStore from '../../store'

export default {
  title: 'Design System/Intro/Theming',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SButton, SDivider },
  template: `<div>
               <s-button @click="handleThemeChange(theme)">{{ theme }}</s-button>
               <s-button @click="handleDesignSystemChange(designSystem)">{{ designSystem || 'default' }}</s-button>
               <s-divider />
               <h4>You can also check another components, these colors are applied to the whole library</h4>
             </div>`,
  computed: {
    theme: () => mainStore?.getters?.libraryTheme,
    designSystem: () => mainStore?.getters?.libraryDesignSystem
  },
  methods: {
    handleThemeChange: (theme: Theme) => {
      const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
      setTheme(newTheme)
    },
    handleDesignSystemChange: (designSystem: DesignSystem) => {
      const newDesignSystem = designSystem === DesignSystem.DEFAULT ? DesignSystem.NEUMORPHIC : DesignSystem.DEFAULT
      setDesignSystem(newDesignSystem)
    }
  }
})
