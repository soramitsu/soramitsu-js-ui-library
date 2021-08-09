import { boolean, withKnobs, select } from '@storybook/addon-knobs'

import { SButton, SForm, SFormItem, SInput } from '../../components'
import { LabelPosition } from '../../components/Form'

export default {
  component: SForm,
  title: 'Design System/Components/Form 🟣',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SButton, SForm, SFormItem, SInput },
  template: `<s-form
               :model="form"
               :disabled="disabled"
               :inline="inline"
               :show-message="showMessage"
               :rules="{
                 user: [
                   { required: true, message: 'Please input user name' },
                   { min: 3, max: 6, message: 'Length should be 3 to 6' }
                 ]
               }"
             >
               <s-form-item prop="user">
                 <s-input v-model="form.user" placeholder="Username"></s-input>
               </s-form-item>
               <s-form-item prop="region" required>
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
  },
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    inline: {
      default: boolean('Inline', false)
    },
    showMessage: {
      default: boolean('Show Message', true)
    }
  }
})

export const inlineForm = () => ({
  components: { SButton, SForm, SFormItem, SInput },
  template: `<s-form :model="form" inline>
               <s-form-item prop="property1">
                 <s-input v-model="form.property1" placeholder="Property 1"></s-input>
               </s-form-item>
               <s-form-item prop="property2">
                 <s-input v-model="form.property2" placeholder="Property 2"></s-input>
               </s-form-item>
               <s-form-item>
                 <s-button type="primary" @click="onSubmit">Submit</s-button>
               </s-form-item>
             </s-form>`,
  data: () => ({
    form: {
      property1: '',
      property2: ''
    }
  }),
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
})

export const alignment = () => ({
  components: { SButton, SForm, SFormItem, SInput },
  template: `<s-form :model="form" :label-position="labelPosition" label-width="100px">
               <s-form-item prop="property1" label="Name">
                 <s-input v-model="form.property1" placeholder="Property 1"></s-input>
               </s-form-item>
               <s-form-item prop="property2" label="Password">
                 <s-input v-model="form.property2" placeholder="Property 2"></s-input>
               </s-form-item>
             </s-form>`,
  data: () => ({
    form: {
      property1: '',
      property2: ''
    }
  }),
  props: {
    labelPosition: {
      default: select('Label Position', Object.values(LabelPosition), LabelPosition.LEFT)
    }
  }
})

export const validation = () => ({
  components: { SButton, SForm, SFormItem, SInput },
  template: `<s-form
               :model="form"
               :rules="{
                 user: [
                   { required: true, message: 'Please input user name' },
                   { min: 3, max: 6, message: 'Length should be 3 to 6' }
                 ]
               }"
             >
               <s-form-item prop="user">
                 <s-input v-model="form.user" placeholder="Username"></s-input>
               </s-form-item>
               <s-form-item prop="region" required>
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
