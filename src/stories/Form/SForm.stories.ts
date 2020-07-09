import { text, boolean, withKnobs, number, select } from '@storybook/addon-knobs'

import { SButton, SForm, SFormItem, SInput } from '../../components'
import { FormItemSize, LabelPosition } from '../../components/Form'

export default {
  component: SForm,
  title: 'Design System/Form',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SButton, SForm, SFormItem, SInput },
  template: `<s-form
               :model="formInline"
               ref="formInline"
               :rules="{
                 user: [
                   { required: true, message: 'Please input user name' },
                   { min: 3, max: 5, message: 'Length should be 3 to 5' }
                 ]
               }"
             >
               <s-form-item prop="user">
                 <s-input v-model="formInline.user" placeholder="Username"></s-input>
               </s-form-item>
               <s-form-item prop="region" :required="true">
                 <s-input v-model="formInline.region" placeholder="Region"></s-input>
               </s-form-item>
               <s-form-item>
                 <s-button type="primary" @click="onSubmit">Query</s-button>
               </s-form-item>
             </s-form>`,
  data: () => ({
    formInline: {
      user: '',
      region: ''
    }
  }),
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
  // props: {
  //   type: {
  //     default: select('Type', Object.values(InputType), InputType.TEXT)
  //   },
  // }
})
