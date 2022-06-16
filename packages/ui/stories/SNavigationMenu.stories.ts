import { defineMeta, defineStory } from './util'
import { SNavigationMenu, SNavigationMenuItem, SNavigationSubmenu } from '@/lib'
import { IconStatusInfo } from '@/components/icons'

export default defineMeta({
  title: 'Example/NavigationMenu',
})

export const Configurable = defineStory((args: Record<string, unknown>) => ({
  components: {
    SNavigationMenuItem,
    SNavigationMenu,
    SNavigationSubmenu,
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
  
      <SNavigationMenu v-bind="args" v-model="selectedItem" :collapsed="collapsed">
        <template #header>
          <div class="sora-tpg-h2 px-14px py-16px text-center divide-y divide-current">
            <div v-if="!collapsed">Header</div>
            <div v-else>H</div>
          </div>
        </template>

        <SNavigationMenuItem v-for="i in 5" :value="String(i)">
          <template #icon="iconProps">
            <IconStatusInfo :class="iconProps.class" />
          </template>
          Option {{ String(i) }}
        </SNavigationMenuItem>
  
        <SNavigationSubmenu>
          <template #title>Submenu</template>
          <SNavigationMenuItem v-for="i in 5" :value="String(i) + 0">
            Option {{ String(i) + 0 }}
          </SNavigationMenuItem>
        </SNavigationSubmenu>
  
        <SNavigationMenuItem value="01">
          <template #icon="iconProps">
            <IconStatusInfo :class="iconProps.class" />
          </template>
          Long long truncated text
        </SNavigationMenuItem>

        <SNavigationMenuItem value="02">
          <template #icon="iconProps">
            <IconStatusInfo :class="iconProps.class" />
          </template>
          Long long Text with<br>line break
        </SNavigationMenuItem>

        <template #footer>
          <div class="px-30px whitespace-nowrap text-center divide-y divide-current" :class="{ 'invisible': collapsed }">
            <div class="py-16px">Footer content</div>
            <div class="py-16px">Footer content</div>
          </div>
        </template>
      </SNavigationMenu>
    </div>
  `,
}))
