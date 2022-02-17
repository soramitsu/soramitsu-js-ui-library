import { Meta } from '@storybook/vue3'
import { STab, STabsPanel, BackgroundTypeValues, BackgroundType } from '@/lib'

const meta: Meta = {
  title: 'Example/Tab',
}

export default meta

interface configurableArgs {
  backgroundType: BackgroundType
}

const configurableStory = (args: configurableArgs) => ({
  components: { STabsPanel, STab },
  template: `
 <STabsPanel v-model="currentTab" :background="backgroundType">
   <STab :name="'first'">First</STab>
   <STab :name="'Second'">Second</STab>
   <STab :name="'Third'">Third</STab>
   <STab :name="'Disabled'" :disabled="true">Disabled</STab>
 </STabsPanel>`,
  setup() {
    let currentTab = ref('first')
    let { backgroundType } = args
    return { currentTab, backgroundType }
  },
})

export const configurable = configurableStory.bind({})

const backgroundTypeValues = Object.values(BackgroundTypeValues).filter((t) => typeof t === 'string')

configurable.args = {
  backgroundType: 'primary',
}

configurable.argTypes = {
  backgroundType: {
    options: backgroundTypeValues,
    control: { type: 'select' },
  },
}

const primaryStory = (args: configurableArgs) => ({
  components: { STabsPanel, STab },
  template: `
 <STabsPanel v-model="currentTab" :background="'primary'">
   <STab :name="'first'">First</STab>
   <STab :name="'Second'">Second</STab>
   <STab :name="'Third'">Third</STab>
   <STab :name="'Disabled'" :disabled="true">Disabled</STab>
 </STabsPanel>`,
  setup() {
    let currentTab = ref('first')
    return { currentTab }
  },
})

export const primary = primaryStory.bind({})

const secondaryStory = (args: configurableArgs) => ({
  components: { STabsPanel, STab },
  template: `
 <STabsPanel v-model="currentTab" :background="'secondary'">
   <STab :name="'first'">First</STab>
   <STab :name="'Second'">Second</STab>
   <STab :name="'Third'">Third</STab>
   <STab :name="'Disabled'" :disabled="true">Disabled</STab>
 </STabsPanel>`,
  setup() {
    let currentTab = ref('first')
    return { currentTab }
  },
})

export const secondary = secondaryStory.bind({})

const noneStory = (args: configurableArgs) => ({
  components: { STabsPanel, STab },
  template: `
 <STabsPanel v-model="currentTab" :background="'none'">
   <STab :name="'first'">First</STab>
   <STab :name="'Second'">Second</STab>
   <STab :name="'Third'">Third</STab>
   <STab :name="'Disabled'" :disabled="true">Disabled</STab>
 </STabsPanel>`,
  setup() {
    let currentTab = ref('first')
    return { currentTab }
  },
})

export const none = noneStory.bind({})
