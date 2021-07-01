import Vue from 'vue'
import { addParameters, addDecorator } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'
import { DocsPage } from '@storybook/addon-docs/blocks'

import '../../src/styles/index.scss'
import mainStore from '../../src/store'
import { ElementUIPlugin } from '../../src/plugins'

Vue.use(ElementUIPlugin)

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
  template: `<div class="s-flex" style="padding: 20px;">
               <story/>
             </div>`,
  store: mainStore
}))
