import { SBreadcrumb, SBreadcrumbItem } from '../../components'

export default {
  component: SBreadcrumbItem,
  title: 'Design System/Breadcrumb/Breadcrumb Item'
}

export const configurable = () => ({
  components: { SBreadcrumb, SBreadcrumbItem },
  template: `<s-breadcrumb style="flex: 1;">
               <s-breadcrumb-item to="path">Main page</s-breadcrumb-item>
               <s-breadcrumb-item>Shown page</s-breadcrumb-item>
             </s-breadcrumb>`
})
