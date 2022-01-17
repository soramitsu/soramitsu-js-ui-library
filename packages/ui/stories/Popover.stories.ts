import { SPopoverWrappedTransition, SPopover } from '@/lib'
import { defineMeta, defineStory } from './util'
import './Popover.stories.scss'

export default defineMeta({
  title: 'Example/Popover',
})

const TriggerBtn = defineComponent({
  template: `
    <button class="p-2 border border-solid border-blue-500 rounded">
      <slot />
    </button>
  `,
})

const Tooltip = defineComponent({
  template: `
    <span class="bg-green-600 text-white p-1 rounded shadow">Voila!</span>
  `,
})

export const TriggerHover = defineStory(() => ({
  components: { SPopover, TriggerBtn, Tooltip },
  template: `
    <SPopover
      distance="4"
      placement="bottom"
      hide-delay="300"
      show-delay="100"
    >
      <template #trigger>
        <TriggerBtn>Hover me</TriggerBtn>
      </template>

      <template #popper="{ show }">
        <Tooltip v-if="show" />
      </template>
    </SPopover>
  `,
}))

export const TriggerClick = defineStory(() => ({
  components: { SPopover, TriggerBtn, Tooltip },
  template: `
    <SPopover
      distance="4"
      trigger="click"
      placement="bottom-end"
    >
      <template #trigger>
        <TriggerBtn>Click me</TriggerBtn>
      </template>

      <template #popper="{ show }">
        <Tooltip v-if="show" />
      </template>
    </SPopover>

    <div class="text-xs text-gray-400 mt-4">Also try click outside</div>
  `,
}))

export const WithTransition = defineStory(() => ({
  components: { SPopover, SPopoverWrappedTransition, TriggerBtn, Tooltip },
  template: `
    <div class="p-16">
      <SPopover
        trigger="click"
        placement="right-start"
        distance="-8"
        skidding="-8"
      >
        <template #trigger>
          <TriggerBtn>Click me</TriggerBtn>
        </template>

        <template #popper>
          <SPopoverWrappedTransition name="test-popover-transition">
            <Tooltip />
          </SPopoverWrappedTransition>
        </template>
      </SPopover>
    </div>
  `,
}))
