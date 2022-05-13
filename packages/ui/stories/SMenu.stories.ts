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
    const selectedItem = ref('1')
    return {
      args,
      collapsed,
      selectedItem,
    }
  },
  template: `
    <div class="flex">
      <div class="w-100px ml-16px order-1">
        Selected:
        <input type="text" v-model="selectedItem" class="block mb-16px border border-black">
        <button @click="collapsed = !collapsed" class="block mb-16px border border-black">collapse</button>
      </div>
  
      <SMenu v-bind="args" v-model="selectedItem" :collapsed="collapsed">
        <template #header>
          <div class="sora-tpg-h2 px-14px py-16px text-center divide-y divide-current">
            <div v-if="!collapsed">Header</div>
            <div v-else>H</div>
          </div>
        </template>

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
  
        <SMenuItem index="01">
          <template #icon="iconProps">
            <IconStatusInfo :class="iconProps.class" />
          </template>
          Long long truncated text
        </SMenuItem>

        <SMenuItem index="02">
          <template #icon="iconProps">
            <IconStatusInfo :class="iconProps.class" />
          </template>
          Long long Text with<br>line break
        </SMenuItem>

        <template #footer>
          <div class="px-30px whitespace-nowrap text-center divide-y divide-current" :class="{ 'invisible': collapsed }">
            <div class="py-16px">Footer content</div>
            <div class="py-16px">Footer content</div>
          </div>
        </template>
      </SMenu>
    </div>
  `,
}))
