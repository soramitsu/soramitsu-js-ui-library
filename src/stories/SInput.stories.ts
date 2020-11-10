import { text, boolean, withKnobs, number, select } from '@storybook/addon-knobs'

import { SInput, SRow, SCol } from '../components'
import { InputType, InputSize, BorderRadius } from '../components/Input'

export default {
  component: SInput,
  title: 'Design System/Components/Input',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SInput },
  template: `<s-input
               v-model="input"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :borderRadius="borderRadius"
               :show-password="showPassword"
               :readonly="readonly"
               :show-text-limit="showTextLimit"
               :maxlength="maxlength"
               :size="size"
               :prefix="prefix"
               :suffix="suffix"
             />`,
  data: () => ({
    input: ''
  }),
  props: {
    type: {
      default: select('Type', Object.values(InputType), InputType.TEXT)
    },
    size: {
      default: select('Size', Object.values(InputSize), InputSize.BIG)
    },
    placeholder: {
      default: text('Placeholder', 'Placeholder')
    },
    prefix: {
      default: text('Prefix icon', 'el-icon-search')
    },
    suffix: {
      default: text('Suffix icon', 'el-icon-search')
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.MINI)
    },
    showPassword: {
      default: boolean('Show password', false)
    },
    readonly: {
      default: boolean('Readonly', false)
    },
    showTextLimit: {
      default: boolean('Show text limit', false)
    },
    maxlength: {
      default: number('Maxlength', 255)
    }
  }
})

export const differentTypesData = [InputType.TEXT, InputType.TEXTAREA].map(type => {
  const model = type[0].toUpperCase() + type.slice(1)
  const data = { type, model, placeholder: 'placeholder' } as any
  return data
})
export const filledAndReadonly = () => ({
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

export const disabled = () => ({
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

export const focused = () => ({
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

export const password = () => ({
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

export const withTextLimit = () => ({
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

export const textFileInput = () => ({
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
    changeValue: ''
  }),
  props: {
    accept: {
      default: text('Accept', '*/*')
    }
  }
})
