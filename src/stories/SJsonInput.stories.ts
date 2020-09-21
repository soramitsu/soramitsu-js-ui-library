import { text, withKnobs, boolean } from '@storybook/addon-knobs'

import { SJsonInput, SRow } from '../components'

export default {
  component: SJsonInput,
  title: 'Design System/JSON Input',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const jsonData = {
  object: {
    string: 'I am a string!',
    array: [1, 2, 3],
    null: null,
    boolean: true
  },
  anotherArray: [1, 2, 3.5],
  boolean: false,
  null: null,
  number: 21
}
export const configurable = () => ({
  components: { SJsonInput, SRow },
  template: `<s-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-json-input
                 v-model="json"
                 :height="height"
                 :disabled="disabled"
                 :readonly="readonly"
               >
               </s-json-input>
             </s-row>`,
  data: () => ({
    json: jsonData
  }),
  props: {
    height: {
      default: text('Height', '400px')
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    readonly: {
      default: boolean('Readonly', false)
    }
  }
})
