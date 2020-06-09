import { text, boolean, withKnobs, number, select } from '@storybook/addon-knobs'

import { SInput, SJsonInput } from '@/components'
import { InputType } from '@/components/SInput'

export default {
  component: SInput,
  title: 'Design System/Input',
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
               :show-password="showPassword"
               :readonly="readonly"
               :show-text-limit="showTextLimit"
               :maxlength="maxlength"
             />`,
  data: () => ({
    input: ''
  }),
  props: {
    type: {
      default: select('Type', Object.values(InputType), InputType.TEXT)
    },
    placeholder: {
      default: text('Placeholder', 'Placeholder')
    },
    disabled: {
      default: boolean('Disabled', false)
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
  components: { SInput },
  template: `<el-col>
               <el-row
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
               </el-row>
             </el-col>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const disabled = () => ({
  components: { SInput },
  template: `<el-col>
               <el-row
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
               </el-row>
             </el-col>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const focused = () => ({
  components: { SInput },
  template: `<el-col>
               <el-row
                 v-for="item in items"
                 :key="item.type"
                 style="padding-bottom: 20px;"
               >
                 <s-input
                   ref="input"
                   class="focused"
                   v-model="item.model"
                   :type="item.type"
                   :placeholder="item.placeholder"
                 />
               </el-row>
             </el-col>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const password = () => ({
  components: { SInput },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-input
                 v-model="input"
                 placeholder="Password"
                 show-password
               />
             </el-row>`,
  data: () => ({
    input: 123456
  })
})

export const withTextLimit = () => ({
  components: { SInput },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-input
                 v-model="input"
                 placeholder="Limited text"
                 show-text-limit
                 maxlength="255"
               />
             </el-row>`,
  data: () => ({
    input: 'Here is an example of limited text'
  })
})

export const jsonInput = () => ({
  components: { SJsonInput },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-json-input :json="json"></s-json-input>
             </el-row>`,
  props: {
    json: {
      default: {
        object: {
          a: 'String',
          b: [
            1, 2, 3
          ],
          c: 55,
          e: false
        },
        array: [
          1,
          2,
          3,
          -4,
          -3,
          -2
        ],
        boolean: false,
        null: null,
        number: 21,
        string: 'Hi liquor-tree user!'
      }
    }
  }
})
