import { Meta, Story } from '@storybook/vue'

import { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu, SIcon } from '../../components'
import { BorderRadius } from '../../types'

export default {
  component: SMenu,
  title: 'Design System/Components/Menu',
  excludeStories: /.*Data$/,
  argTypes: {
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    }
  }
} as Meta

export const basicMenu: Story = (args, { argTypes }) => ({
  components: { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu, SIcon },
  props: Object.keys(argTypes),
  template: `<s-aside width="220px">
               <s-menu
                 default-active="1"
                 :border-radius="borderRadius"
                 @open="handleOpen"
                 @select="handleSelect"
                 @close="handleClose">
                 <s-menu-item-group>
                   <s-menu-item index="1">
                     <s-icon name="basic-globe-24" />
                     <span>Iroha networks</span>
                   </s-menu-item>
                   <s-menu-item index="2">
                     <s-icon name="basic-globe-24" />
                     <span>Monitoring</span>
                   </s-menu-item>
                   <s-menu-item index="3">
                     <s-icon name="basic-globe-24" />
                     <span>Logs</span>
                   </s-menu-item>
                 </s-menu-item-group>
                 <s-menu-item-group>
                   <s-menu-item index="4">
                     <s-icon name="basic-globe-24" />
                     <span>Log out</span>
                   </s-menu-item>
                 </s-menu-item-group>
               </s-menu>
             </s-aside>`,
  methods: {
    handleOpen (key: string, keyPath: Array<string>): void {
      console.log('handleOpen', key, keyPath)
    },
    handleClose (key: string, keyPath: Array<string>): void {
      console.log('handleClose', key, keyPath)
    },
    handleSelect (key: string, keyPath: Array<string>): void {
      console.log('handleSelect', key, keyPath)
    }
  }
})

export const sideBar: Story = (args, { argTypes }) => ({
  components: { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu, SIcon },
  props: Object.keys(argTypes),
  template: `<s-aside width="220px">
               <s-menu
                 default-active="2"
                 :border-radius="borderRadius"
                 @open="handleOpen"
                 @select="handleSelect"
                 @close="handleClose">
                 <s-submenu index="1">
                   <template slot="title">
                     <s-icon name="basic-globe-24" />
                     <span>Navigator One</span>
                   </template>
                   <s-menu-item-group title="Group One">
                     <s-menu-item index="1-1">item one</s-menu-item>
                     <s-menu-item index="1-2">item one</s-menu-item>
                   </s-menu-item-group>
                   <s-menu-item-group title="Group Two">
                     <s-menu-item index="1-3">item three</s-menu-item>
                   </s-menu-item-group>
                   <s-submenu index="1-4">
                     <template slot="title">item four</template>
                     <s-menu-item index="1-4-1">item one</s-menu-item>
                     <s-menu-item index="1-4-2">item two</s-menu-item>
                   </s-submenu>
                 </s-submenu>
                 <s-menu-item index="2">
                   <s-icon name="basic-globe-24" />
                   <span>Navigator Two</span>
                 </s-menu-item>
                 <s-menu-item index="3" disabled>
                   <s-icon name="basic-globe-24" />
                   <span>Navigator Three</span>
                 </s-menu-item>
                 <s-menu-item index="4">
                   <s-icon name="basic-globe-24" />
                   <span>Navigator Four</span>
                 </s-menu-item>
               </s-menu>
             </s-aside>`,
  methods: {
    handleOpen (key: string, keyPath: Array<string>): void {
      console.log('handleOpen', key, keyPath)
    },
    handleClose (key: string, keyPath: Array<string>): void {
      console.log('handleClose', key, keyPath)
    },
    handleSelect (key: string, keyPath: Array<string>): void {
      console.log('handleSelect', key, keyPath)
    }
  }
})

export const topBar: Story = (args, { argTypes }) => ({
  components: { SMenu, SMenuItem, SMenuItemGroup, SSubmenu },
  props: Object.keys(argTypes),
  template: `<s-menu
               default-active="4"
               mode="horizontal"
               :border-radius="borderRadius"
               @select="handleSelect">
               <s-menu-item index="1">Navigator One</s-menu-item>
               <s-submenu index="2">
                 <template slot="title">Navigator Two</template>
                 <s-menu-item index="2-1">item one</s-menu-item>
                 <s-menu-item index="2-2">item two</s-menu-item>
                 <s-menu-item index="2-3">item three</s-menu-item>
                 <s-submenu index="2-4">
                   <template slot="title">item four</template>
                   <s-menu-item index="2-4-1">item one</s-menu-item>
                   <s-menu-item index="2-4-2">item two</s-menu-item>
                   <s-menu-item index="2-4-3">item three</s-menu-item>
                 </s-submenu>
               </s-submenu>
               <s-menu-item index="3" disabled>Navigator Three</s-menu-item>
               <s-menu-item index="4">Navigator Four</s-menu-item>
             </s-menu>`,
  methods: {
    handleSelect (key: string, keyPath: Array<string>): void {
      console.log('handleSelect', key, keyPath)
    }
  }
})
