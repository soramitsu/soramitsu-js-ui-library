import { Meta } from '@storybook/vue3'
import { STab, STabsPanel } from '@/lib'

const meta: Meta = {
  title: 'Example/Tab',
}

export default meta

const defaultUsageStory = () => ({
  components: { STabsPanel, STab },
  template: `
 <STabsPanel v-model="currentTab">
   <STab :border-radius="'left'">First</STab>
   <STab>Second</STab>
   <STab :border-radius="'right'">Third</STab>
   <STab class="ml-4" :border-radius="'full'" :disabled="true">Disabled</STab>
 </STabsPanel>`,
  setup() {
    let currentTab = ref(0)
    return { currentTab }
  },
})

export const defaultUsage = defaultUsageStory.bind({})
