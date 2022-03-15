import { defineMeta, defineStory } from './util'
import { LINK_ICON_POSITION_VALUES, LINK_UNDERLINE_TYPE_VALUES, SLink } from '@/lib'
import { IconStatusInfo } from '@/components/icons'

export default defineMeta({
  title: 'Example/Link',
})

export const Configurable = defineStory((args) => ({
  components: {
    SLink,
    IconStatusInfo,
  },
  setup() {
    return {
      args,
    }
  },
  template: `
    <div class="flex flex-col items-start">
      <SLink
        v-bind="args"
        href="https://soramitsu.co.jp/"
        target="_blank"
      >
        Link
        <template #icon="iconProps">
          <IconStatusInfo :class="iconProps.class" />
        </template>
      </SLink>
    </div>
  `,
}))
Configurable.argTypes = {
  underline: {
    options: LINK_UNDERLINE_TYPE_VALUES,
    control: 'inline-radio',
  },
  iconPosition: {
    options: LINK_ICON_POSITION_VALUES,
    control: 'inline-radio',
  },
  icon: {
    control: 'boolean',
  },
}
Configurable.args = {
  underline: 'solid',
  icon: true,
  iconPosition: 'left',
}
