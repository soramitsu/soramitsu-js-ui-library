import { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu } from '../../components'

export default {
  component: SMenuItemGroup,
  title: 'Design System/Components/Menu/MenuItemGroup',
  excludeStories: /.*Data$/
}

export const basicMenu = () => ({
  components: { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu },
  template: `<s-aside width="220px">
               <s-menu default-active="1">
                 <s-menu-item-group title="First group">
                   <s-menu-item index="1">
                     <i class="s-icon-globe"></i>
                     <span>First item</span>
                   </s-menu-item>
                   <s-menu-item index="2">
                     <i class="s-icon-activity"></i>
                     <span>Second item</span>
                   </s-menu-item>
                 </s-menu-item-group>
                 <s-menu-item-group title="Second group">
                   <s-menu-item index="4">
                     <i class="s-icon-logout"></i>
                     <span>Third item</span>
                   </s-menu-item>
                 </s-menu-item-group>
               </s-menu>
             </s-aside>`
})
