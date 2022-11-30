import { Meta, Story } from '@storybook/vue'

import { SFloatInput, SRow } from '../../components'

export default {
  component: SFloatInput,
  title: 'Design System/Components/Input 🟣/Float',
  argTypes: {
    decimals: {
      name: 'Decimals',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 18
    },
    max: {
      name: 'Max',
      control: {
        type: 'text'
      },
      defaultValue: '90000000'
    },
    hasLocaleString: {
      name: 'Has Locale String',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    delimiters: {
      name: 'Delimiters',
      control: {
        type: 'object'
      },
      defaultValue: {
        thousand: ',',
        decimal: '.'
      }
    },
    top: {
      name: 'Top slot content',
      control: {
        type: 'text'
      }
    },
    bottom: {
      name: 'Bottom slot content',
      control: {
        type: 'text'
      }
    },
    left: {
      name: 'Left slot content',
      control: {
        type: 'text'
      }
    },
    right: {
      name: 'Right slot content',
      control: {
        type: 'text'
      }
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SFloatInput, SRow },
  props: Object.keys(argTypes),
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
    model: ''
  })
})
