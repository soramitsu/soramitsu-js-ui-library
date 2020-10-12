import { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu } from '../../components'

export default {
  component: SMenu,
  title: 'Design System/Components/Menu',
  excludeStories: /.*Data$/
}

export const basicMenu = () => ({
  components: { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu },
  template: `<s-aside width="220px">
               <s-menu
                 default-active="1"
                 @open="handleOpen"
                 @select="handleSelect"
                 @close="handleClose">
                 <s-menu-item-group>
                   <s-menu-item index="1">
                     <i class="s-icon-globe"></i>
                     <span>Iroha networks</span>
                   </s-menu-item>
                   <s-menu-item index="2">
                     <i class="s-icon-activity"></i>
                     <span>Monitoring</span>
                   </s-menu-item>
                   <s-menu-item index="3">
                     <i class="s-icon-activity"></i>
                     <span>Logs</span>
                   </s-menu-item>
                 </s-menu-item-group>
                 <s-menu-item-group>
                   <s-menu-item index="4">
                     <i class="s-icon-logout"></i>
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

export const sideBar = () => ({
  components: { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu },
  template: `<s-aside width="220px">
               <s-menu
                 default-active="2"
                 @open="handleOpen"
                 @select="handleSelect"
                 @close="handleClose">
                 <s-submenu index="1">
                   <template slot="title">
                     <i class="s-icon-globe"></i>
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
                   <i class="s-icon-activity"></i>
                   <span>Navigator Two</span>
                 </s-menu-item>
                 <s-menu-item index="3" disabled>
                   <i class="s-icon-globe"></i>
                   <span>Navigator Three</span>
                 </s-menu-item>
                 <s-menu-item index="4">
                   <i class="s-icon-activity"></i>
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

export const topBar = () => ({
  components: { SMenu, SMenuItem, SMenuItemGroup, SSubmenu },
  template: `<s-menu
               default-active="4"
               mode="horizontal"
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
