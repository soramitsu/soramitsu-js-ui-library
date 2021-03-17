import { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu, SIcon } from '../../components'

export default {
  component: SMenuItemGroup,
  title: 'Design System/Components/Menu/MenuItemGroup',
  excludeStories: /.*Data$/
}

export const basicMenu = () => ({
  components: { SAside, SMenu, SMenuItem, SMenuItemGroup, SSubmenu, SIcon },
  template: `<s-aside width="220px">
               <s-menu default-active="1">
                 <s-menu-item-group title="First group">
                   <s-menu-item index="1">
                     <s-icon name="basic-globe-24" />
                     <span>First item</span>
                   </s-menu-item>
                   <s-menu-item index="2">
                     <s-icon name="basic-globe-24" />
                     <span>Second item</span>
                   </s-menu-item>
                 </s-menu-item-group>
                 <s-menu-item-group title="Second group">
                   <s-menu-item index="4">
                     <s-icon name="basic-globe-24" />
                     <span>Third item</span>
                   </s-menu-item>
                 </s-menu-item-group>
               </s-menu>
             </s-aside>`
})
