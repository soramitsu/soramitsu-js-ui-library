import { Meta, Story } from '@storybook/vue'

import { SButton, SForm, SFormItem, SInput } from '../../components'
import { LabelPosition } from '../../components/Form'

export default {
  component: SForm,
  title: 'Design System/Components/Form 🟣',
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    inline: {
      name: 'Inline',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    showMessage: {
      name: 'Show Message',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    labelPosition: {
      name: 'Label Position',
      control: {
        type: 'select',
        options: Object.values(LabelPosition)
      },
      defaultValue: LabelPosition.LEFT
    }
  }
} as Meta

const Template: Story = (args, { argTypes }) => ({
  components: { SButton, SForm, SFormItem, SInput },
  props: Object.keys(argTypes),
  template: `<s-form
               :model="form"
               :disabled="disabled"
               :inline="inline"
               :label-position="labelPosition"
               :show-message="showMessage"
               :rules="{
                 user: [
                   { required: true, message: 'Please input user name' },
                   { min: 3, max: 6, message: 'Length should be 3 to 6' }
                 ]
               }"
             >
               <s-form-item prop="user" label="Username">
                 <s-input v-model="form.user" placeholder="Username"></s-input>
               </s-form-item>
               <s-form-item prop="region" label="Region" required>
                 <s-input v-model="form.region" placeholder="Region"></s-input>
               </s-form-item>
               <s-form-item>
                 <s-button type="primary" size="medium" @click="onSubmit">Submit</s-button>
               </s-form-item>
             </s-form>`,
  data: () => ({
    form: {
      user: '',
      region: ''
    }
  }),
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
})

export const Configurable = Template.bind({})

export const InlineForm = Template.bind({})
InlineForm.args = {
  inline: true
}
