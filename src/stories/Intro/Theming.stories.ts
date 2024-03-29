import Theme from '../../types/Theme'
import DesignSystem from '../../types/DesignSystem'
import { SButton, SDivider } from '../../components'
import { switchTheme, setDesignSystem } from '../../utils'
import mainStore from '../../store'

export default {
  title: 'Design System/Intro/Theming (WIP)',
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SButton, SDivider },
  template: `<div>
               <h4>This feature has Work In Progress status</h4>
               <div class="s-flex" style="align-items: center;">
                 <h4 style="margin-right: 10px;">Theme:</h4>
                 <s-button @click="handleThemeChange">{{ theme }}</s-button>
                 <s-button @click="handleDesignSystemChange(designSystem)">{{ designSystem || 'default' }}</s-button>
               </div>
               <s-divider />
               <h4>You can check all components, these theme settings are applied to the whole library</h4>
             </div>`,
  computed: {
    theme: () => mainStore?.getters?.libraryTheme as Theme,
    designSystem: () => mainStore?.getters?.libraryDesignSystem as DesignSystem
  },
  methods: {
    handleThemeChange: () => {
      switchTheme()
    },
    handleDesignSystemChange: (designSystem: DesignSystem) => {
      const newDesignSystem = designSystem === DesignSystem.DEFAULT ? DesignSystem.NEUMORPHIC : DesignSystem.DEFAULT
      setDesignSystem(newDesignSystem)
    }
  }
})
