import { SAside } from '../components'

export default {
  component: SAside,
  title: 'Design System/Layout/Aside',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SAside },
  template: `<s-aside style="background-color: #d3dce6; height: 90px; padding: 32px; border-radius: 8px;">
               Here is s-aside
             </s-aside>`
})
