import { number, withKnobs } from '@storybook/addon-knobs'

import { SFloatInput, SRow } from '../components'

export default {
  component: SFloatInput,
  title: 'Design System/Components/Float Input',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SFloatInput, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-float-input
                 v-model="model"
                 :decimals="decimals"
               />
             </s-row>`,
  data: () => ({
    model: ''
  }),
  props: {
    decimals: {
      default: number('Decimals', 18)
    }
  }
})
