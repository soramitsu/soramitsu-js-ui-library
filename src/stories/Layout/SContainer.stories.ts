import { SContainer } from '../../components'

export default {
  component: SContainer,
  title: 'Design System/Layout/Container',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SContainer },
  template: `<s-container style="background-color: #d3dce6; height: 90px; padding: 32px; border-radius: 8px;">
               Here is s-container
             </s-container>`
})
