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
      :checked=false
      disabled
    />
  `,
}))

export const SwitchDisabledAndCheckedWithLabel = defineStory(() => ({
  components: {
    SSwitch,
  },
  setup() {},
  template: `
    <SSwitch
      id="id"
      label="Label"
      disabled
    />
  `,
}))
