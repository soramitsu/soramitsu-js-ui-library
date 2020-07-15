import { boolean, withKnobs, text } from '@storybook/addon-knobs'

import { SButton, SForm, SFormItem, SInput } from '../../components'

export default {
  component: SFormItem,
  title: 'Design System/Form/Form Item',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SButton, SForm, SFormItem, SInput },
  template: `<s-form
               :model="form"
             >
               <s-form-item
                 prop="user"
                 :rules="[
                   { min: 3, max: 6, message: 'Length should be 3 to 6' }
                 ]"
                 :required="required"
                 :error="error"
                 :show-message="showMessage"
               >
                 <s-input v-model="form.user" placeholder="Username"></s-input>
               </s-form-item>
               <s-form-item>
                 <s-button type="primary" size="medium" @click="onSubmit">Submit</s-button>
               </s-form-item>
             </s-form>`,
  data: () => ({
    form: {
      user: ''
    }
  }),
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  },
  props: {
    required: {
      default: boolean('Required', true)
    },
    error: {
      default: text('Error', '')
    },
    showMessage: {
      default: boolean('Show Message', true)
    }
  }
})
