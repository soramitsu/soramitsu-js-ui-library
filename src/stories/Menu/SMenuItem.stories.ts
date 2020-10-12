import { SMenu, SMenuItem } from '../../components'

export default {
  component: SMenuItem,
  title: 'Design System/Components/Menu/MenuItem'
}

export const defaultUsage = () => ({
  components: { SMenu, SMenuItem },
  template: `<s-menu>
               <s-menu-item index="1">
                 <i class="s-icon-globe"></i>
                 <span>Menu Item</span>
               </s-menu-item>
             </s-menu>`
})
