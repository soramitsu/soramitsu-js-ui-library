import { number, text, boolean, object, withKnobs } from '@storybook/addon-knobs'

import { SFloatInput, SRow } from '../../components'

export default {
  component: SFloatInput,
  title: 'Design System/Components/Input 🟣/Float',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SFloatInput, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-float-input
                 v-model="model"
                 :decimals="decimals"
                 :hasLocaleString="hasLocaleString"
                 :delimiters="delimiters"
                 :max="max"
               >
                 <div v-if="top" slot="top">{{ top }}</div>
                 <div v-if="bottom" slot="bottom">{{ bottom }}</div>
                 <div v-if="left" slot="left">{{ left }}</div>
                 <div v-if="right" slot="right">{{ right }}</div>
               </s-float-input>
             </s-row>`,
  data: () => ({
    model: '10000'
  }),
  props: {
    decimals: {
      default: number('Decimals', 18)
    },
    max: {
      default: text('Max', '9000000000000000000000000000000000')
    },
    hasLocaleString: {
      default: boolean('Has Locale String', false)
    },
    delimiters: {
      default: object(
        'Delimiters',
        {
          thousand: ',',
          decimal: '.'
        }
      )
    },
    top: {
      default: text('Top slot content', '')
    },
    bottom: {
      default: text('Bottom slot content', '')
    },
    left: {
      default: text('Left slot content', '')
    },
    right: {
      default: text('Right slot content', '')
    }
  }
})
