import { SAside, SMenu, SMenuItem, SSubmenu } from '../../components'

export default {
  component: SSubmenu,
  title: 'Design System/Menu/Submenu'
}

export const defaultUsage = () => ({
  components: { SAside, SMenu, SMenuItem, SSubmenu },
  template: `<s-aside width="220px">
               <s-menu>
                 <s-submenu index="1">
                   <template slot="title">Navigator One</template>
                   <s-menu-item index="1-1">item one</s-menu-item>
                   <s-menu-item index="1-2">item two</s-menu-item>
                 </s-submenu>
               </s-menu>
             </s-aside>`
})
