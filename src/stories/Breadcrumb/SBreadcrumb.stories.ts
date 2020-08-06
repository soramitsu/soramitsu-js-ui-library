import { SBreadcrumb, SBreadcrumbItem } from '../../components'

export default {
  component: SBreadcrumb,
  title: 'Design System/Breadcrumb'
}

export const configurable = () => ({
  components: { SBreadcrumb, SBreadcrumbItem },
  template: `<s-breadcrumb separator=">" style="flex: 1;">
               <s-breadcrumb-item :to="{ path: '/' }">Homepage</s-breadcrumb-item>
               <s-breadcrumb-item :to="{ path: '/main' }">Main Page</s-breadcrumb-item>
               <s-breadcrumb-item :to="{ path: '/main/child' }">Child Page</s-breadcrumb-item>
               <s-breadcrumb-item :to="{ path: '/main/child/shown' }">Shown Page</s-breadcrumb-item>
             </s-breadcrumb>`
})
