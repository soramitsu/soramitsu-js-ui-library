import { addParameters, addDecorator } from '@storybook/vue'
import { withA11y } from '@storybook/addon-a11y'
import { DocsPage } from '@storybook/addon-docs/blocks'

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
             </div>`
}))
