import { SSwitch } from '@/lib'
import { defineMeta, defineStory } from './util'

export default defineMeta({
  title: 'Example/Switch',
})

export const SwitchWithLabel = defineStory(() => ({
  components: {
    SSwitch,
  },
  setup() {},
  template: `
    <SSwitch
      id="id"
      label="Label"
    />
  `,
}))

export const SwitchDisabledWithLabel = defineStory(() => ({
  components: {
    SSwitch,
  },
  setup() {},
  template: `
    <SSwitch
      id="id"
      label="Label"
      checked="false"
      disabled
    />
  `,
}))

// export const SwitchDisabledWithLabel = Template.bind({})
// SwitchDisabledWithLabel.args = {
//   props: {
//     id: 'id',
//     label: 'Label',
//     disabled: true,
//     checked: false,
//   },
// }

// export const SwitchDisabledAndCheckedWithLabel = Template.bind({})
// SwitchDisabledAndCheckedWithLabel.args = {
//   props: {
//     id: 'id',
//     label: 'Label',
//     disabled: true,
//   },
// }
