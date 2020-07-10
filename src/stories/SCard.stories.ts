import { text, withKnobs, select } from '@storybook/addon-knobs'

import { SCard, SRow, SButton } from '../components'
import { CardShadow } from '../components/Card'

export default {
  component: SCard,
  title: 'Design System/Card',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SCard, SRow, SButton },
  template: `<s-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-card :shadow="shadow">
                 <template slot="header">
                   <span>{{ header }}</span>
                   <s-button type="tertiary" size="medium">Close</s-button>
                 </template>
                 <div v-for="o in 4" :key="o" style="margin-bottom: 18px;">
                   {{'List item ' + o }}
                 </div>
               </s-card>
             </s-row>`,
  data: () => ({
    model: false
  }),
  props: {
    shadow: {
      default: select('Shadow', Object.values(CardShadow), CardShadow.HOVER)
    },
    header: {
      default: text('Header', 'Card header')
    }
  }
})
