import { text, boolean, withKnobs, number, select } from '@storybook/addon-knobs'

import { SInput, SRow, SCol, SDesignSystemProvider } from '../components'
import { BorderRadius } from '../types'
import { InputType, InputSize } from '../components/Input'
import { DesignSystemTypes } from '../utils/DesignSystem'

export default {
  component: SInput,
  title: 'Design System/Components/Input',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SInput, SDesignSystemProvider },
  template: `
            <s-design-system-provider :value="designSystem">
              <s-input
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
              </s-input>
            </s-design-system-provider>`,
  data: () => ({
    input: ''
  }),
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystemTypes), DesignSystemTypes.DEFAULT)
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
    },
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
