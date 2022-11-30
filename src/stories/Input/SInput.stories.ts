import { Meta, Story } from '@storybook/vue'

import { SInput, SRow, SCol } from '../../components'
import { InputType, InputSize } from '../../components/Input'
import { BorderRadius } from '../../types'

const differentTypesData = [InputType.TEXT, InputType.TEXTAREA].map(type => {
  const model = type[0].toUpperCase() + type.slice(1)
  const data = { type, model, placeholder: 'placeholder' } as any
  return data
})

export default {
  component: SInput,
  title: 'Design System/Components/Input 🟣',
  excludeStories: /.*Data$/,
  argTypes: {
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
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
        options: Object.values(InputType)
      },
      defaultValue: InputType.TEXT
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(InputSize)
      },
      defaultValue: InputSize.BIG
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.MINI
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text'
      },
      defaultValue: 'Placeholder'
    },
    prefix: {
      name: 'Prefix icon',
      control: {
        type: 'text'
      },
      defaultValue: 'el-icon-search'
    },
    suffix: {
      name: 'Suffix icon',
      control: {
        type: 'text'
      },
      defaultValue: 's-icon-clear-X-16'
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showPassword: {
      name: 'Show password',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    readonly: {
      name: 'Readonly',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showTextLimit: {
      name: 'Show text limit',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    maxlength: {
      name: 'Max length',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 255
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SInput },
  props: Object.keys(argTypes),
  template: `<s-input
               v-model="input"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :border-radius="borderRadius"
               :show-password="showPassword"
               :readonly="readonly"
               :show-text-limit="showTextLimit"
               :maxlength="maxlength"
               :size="size"
               :prefix="prefix"
               :suffix="suffix"
             >
               <div v-if="top" slot="top">{{ top }}</div>
               <div v-if="bottom" slot="bottom">{{ bottom }}</div>
               <div v-if="left" slot="left">{{ left }}</div>
               <div v-if="right" slot="right">{{ right }}</div>
             </s-input>`,
  data: () => ({
    input: ''
  })
})

export const filledAndReadonly: Story = () => ({
  components: { SInput, SCol, SRow },
  template: `<s-col>
               <s-row
                 v-for="item in items"
                 :key="item.type"
                 style="padding-bottom: 20px;"
               >
                 <s-input
                   v-model="item.model"
                   :type="item.type"
                   :placeholder="item.placeholder"
                   readonly
                 />
               </s-row>
             </s-col>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const disabled: Story = () => ({
  components: { SInput, SRow, SCol },
  template: `<s-col>
               <s-row
                 v-for="item in items"
                 :key="item.type"
                 style="padding-bottom: 20px;"
               >
                 <s-input
                   v-model="item.model"
                   :type="item.type"
                   :placeholder="item.placeholder"
                   disabled
                 />
               </s-row>
             </s-col>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const focused: Story = () => ({
  components: { SInput, SRow, SCol },
  template: `<s-col>
               <s-row
                 v-for="item in items"
                 :key="item.type"
                 style="padding-bottom: 20px;"
               >
                 <s-input
                   class="s-focused"
                   v-model="item.model"
                   :type="item.type"
                   :placeholder="item.placeholder"
                 />
               </s-row>
             </s-col>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const password: Story = () => ({
  components: { SInput, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-input
                 v-model="input"
                 placeholder="Password"
                 show-password
               />
             </s-row>`,
  data: () => ({
    input: 123456
  })
})

export const withTextLimit: Story = () => ({
  components: { SInput, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-input
                 v-model="input"
                 placeholder="Limited text"
                 show-text-limit
                 maxlength="255"
               />
             </s-row>`,
  data: () => ({
    input: 'Here is an example of limited text'
  })
})

export const textFileInput: Story = () => ({
  components: { SInput },
  template: `<div class="s-flex" style="flex: 1; flex-direction: column;">
               <s-input
                 v-model="vModelValue"
                 type="text-file"
                 placeholder="Upload or input text"
                 :accept="accept"
                 @change="(value) => changeValue = value"
               />
               <span style="margin-top: 40px;">
                 v-model="{{ vModelValue }}", @change="{{ changeValue }}"
               </span>
             </div>`,
  data: () => ({
    vModelValue: '',
    changeValue: '',
    accept: '*/*'
  })
})
