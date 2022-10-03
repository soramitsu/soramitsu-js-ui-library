import { defineMeta, defineStory } from './util'
import { STooltip } from '@/lib'

export default defineMeta({
  title: 'Example/Tooltip',
})

export const Configurable = defineStory((args) => ({
  components: {
    STooltip,
    SomeElement: { template: `<div class="bg-red-400 text-white rounded-md px-2 py-1"><slot/></div>` },
  },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="flex justify-around py-56px">
      <STooltip
        content="Body text"
      >
        <SomeElement>Default tooltip</SomeElement>
      </STooltip>

      <STooltip placement="left">
        <SomeElement>Tooltip with header</SomeElement>

        <template #content>
          <div class="sora-tpg-p1 mb-4px">Header</div>
          Body text
        </template>
      </STooltip>
    </div>
    
    <div class="flex justify-around py-56px">
      <STooltip
        placement="top"
        primary-button-text="Button"
      >
        <SomeElement>Tooltip with buttons</SomeElement>
  
        <template #content>
          Body text
        </template>
      </STooltip>
    
      <STooltip
        placement="right"
        primary-button-text="Button"
        secondary-button-text="Button"
      >
        <SomeElement>Tooltip with header and buttons</SomeElement>

        <template #content>
          <div class="sora-tpg-p1 mb-4px">Header</div>
          Body text
        </template>
      </STooltip>
    </div>
  `,
}))
