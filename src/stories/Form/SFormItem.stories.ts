import { Meta, Story } from '@storybook/vue'

import { SButton, SForm, SFormItem, SInput } from '../../components'

export default {
  component: SFormItem,
  title: 'Design System/Components/Form 🟣/Form Item',
  argTypes: {
    required: {
      name: 'Required',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    error: {
      name: 'Error',
      control: {
        type: 'text'
      },
      defaultValue: ''
    },
    showMessage: {
      name: 'Show Message',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SButton, SForm, SFormItem, SInput },
  props: Object.keys(argTypes),
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
  }
})
