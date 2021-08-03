import Vue from 'vue'
import { addParameters, addDecorator } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'
import { DocsPage } from '@storybook/addon-docs/blocks'
import ElColorPicker from 'element-ui/lib/color-picker'

import '../../src/styles/index.scss'
import './index.scss'
import './neu-theme-variables.scss'
import mainStore from '../../src/store'
import { setTheme } from '../../src/utils'
import { ElementUIPlugin } from '../../src/plugins'
import { SDesignSystemProvider } from '../../src/components'

Vue.use(ElementUIPlugin)
Vue.use(ElColorPicker)
setTheme()
document.documentElement.style.setProperty('color', 'var(--s-color-base-content-primary)')
document.documentElement.style.setProperty('background-color', 'var(--s-color-utility-body)')

addParameters({
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
  }
})

addDecorator(withA11y)
addDecorator(() => ({
  components: { SDesignSystemProvider },
  template: `<div class="s-flex" style="padding: 20px;">
               <s-design-system-provider :value="designSystem">
                 <story />
               </s-design-system-provider>
             </div>`,
  store: mainStore,
  computed: {
    designSystem: () => mainStore?.getters?.libraryDesignSystem
  }
}))
