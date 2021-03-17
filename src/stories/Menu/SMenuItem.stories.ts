import { SMenu, SMenuItem, SIcon } from '../../components'

export default {
  component: SMenuItem,
  title: 'Design System/Components/Menu/MenuItem'
}

export const defaultUsage = () => ({
  components: { SMenu, SMenuItem, SIcon },
  template: `<s-menu>
               <s-menu-item index="1">
                 <s-icon name="basic-globe-24" />
                 <span>Menu Item</span>
               </s-menu-item>
             </s-menu>`
})
