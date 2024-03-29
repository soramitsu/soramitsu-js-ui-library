import Vue from 'vue'
import { DocsPage } from '@storybook/addon-docs'
import ElColorPicker from 'element-ui/lib/color-picker'

import '../../src/styles/index.scss'
import './index.scss'
import './neu-theme-variables.scss'

import Theme from '../../src/types/Theme'
import DesignSystem from '../../src/types/DesignSystem'
import mainStore from '../../src/store'
import { setTheme, switchTheme, setDesignSystem } from '../../src/utils'
import { ElementUIPlugin } from '../../src/plugins'
import { SDesignSystemProvider, SButton, SCheckbox } from '../../src/components'

Vue.use(ElementUIPlugin)
Vue.use(ElColorPicker)
setTheme()
document.documentElement.style.setProperty('color', 'var(--s-color-base-content-primary)')
document.documentElement.style.setProperty('background-color', 'var(--s-color-utility-body)')

export const parameters = {
  options: {
    showRoots: true
  },
  docs: { page: DocsPage },
  dependencies: {
    // display only dependencies/dependents that have a story in storybook
    // by default this is false
    withStoriesOnly: true,

    // completely hide a dependency/dependents block if it has no elements
    // by default this is false
    hideEmpty: true
  },
  a11y: {
    element: '#storybook-root',
    config: {},
    options: {},
    manual: true
  }
}

export const decorators = [
  () => ({
    components: { SDesignSystemProvider, SButton, SCheckbox },
    template: `<s-design-system-provider :value="designSystem" class="s-flex" style="flex-direction: column;">
                 <div class="s-flex" style="align-items: center; justify-content: flex-end; margin-right: 10px;">
                   <s-checkbox
                     style="margin-right: 10px;"
                     label="NEUMORPHISM"
                     :value="!!designSystem"
                     @change="(value) => handleDesignSystemChange(designSystem)"
                   />
                   <s-button
                     type="action"
                     rounded
                     :icon="theme === 'light' ? 'various-brightness-low-24' : 'various-moon-24'"
                     @click="handleThemeChange"
                   />
                 </div>
                 <div class="s-flex" style="padding: 20px;">
                   <story />
                 </div>
               </s-design-system-provider>`,
    store: mainStore,
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
]
