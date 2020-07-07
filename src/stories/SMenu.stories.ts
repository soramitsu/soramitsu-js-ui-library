import { SMenu } from '../components'

export default {
  component: SMenu,
  title: 'Design System/Menu',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SMenu },
  template: `<s-menu style="background-color: #d3dce6; height: 90px; padding: 32px; border-radius: 8px;">
               Here is s-menu
             </s-menu>`
})
