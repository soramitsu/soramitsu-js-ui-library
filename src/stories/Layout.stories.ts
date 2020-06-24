import { text, boolean, select, withKnobs } from '@storybook/addon-knobs'

import { SApp } from '../components'

export default {
  component: SApp,
  title: 'Design System/Layout',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const defaultTemplate = () => ({
  components: { SApp },
  template: `<s-app>
               <template #aside><div style="height: 100%; background-color: #2D2926;"></div></template>
               <template #header>Header</template>
               <template #main>Main</template>
               <template #footer>Footer</template>
             </s-app>`
})
