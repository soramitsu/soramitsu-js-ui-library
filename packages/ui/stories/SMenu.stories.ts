import { defineMeta, defineStory } from './util'
import { SMenu, SMenuItem, SSubmenu } from '@/lib'
import { IconStatusInfo } from '@/components/icons'

export default defineMeta({
  title: 'Example/Menu',
})

export const Configurable = defineStory((args: Record<string, unknown>) => ({
  components: {
    SMenuItem,
    SMenu,
    SSubmenu,
    IconStatusInfo,
  },
  setup() {
    const collapsed = ref(false)

    return {
      args,
      collapsed,
    }
  },
  template: `
    <button @click="collapsed = !collapsed">collapse</button>
    <SMenu v-bind="args" default-active="10" :collapsed="collapsed">
      <SMenuItem v-for="i in 5" :index="String(i)">
        <template #icon="iconProps">
          <IconStatusInfo :class="iconProps.class" />
        </template>
        Option {{ String(i) }}
      </SMenuItem>

      <SSubmenu>
        <template #title>Submenu</template>
        <SMenuItem v-for="i in 5" :index="String(i) + 0">
          Option {{ String(i) + 0 }}
        </SMenuItem>
      </SSubmenu>

      <SMenuItem v-for="i in 5" :index="0 + String(i)">
        Option {{ 0 + String(i) }}
      </SMenuItem>
    </SMenu>
  `,
}))
