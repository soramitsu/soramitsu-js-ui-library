import { number, text, boolean, object, select, withKnobs } from '@storybook/addon-knobs'

import { SFloatInput, SRow, SDesignSystemProvider } from '../components'
import { DesignSystemTypes } from '../utils/DesignSystem'

export default {
  component: SFloatInput,
  title: 'Design System/Components/Input/Float',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SFloatInput, SRow, SDesignSystemProvider },
  template: `
            <s-design-system-provider :value="designSystem">
              <s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
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
              </s-row>
            </s-design-system-provider>`,
  data: () => ({
    model: ''
  }),
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystemTypes), DesignSystemTypes.DEFAULT)
    },
    decimals: {
      default: number('Decimals', 18)
    },
    max: {
      default: text('Max', '90000000')
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
