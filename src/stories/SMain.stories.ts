import { SMain } from '../components'

export default {
  component: SMain,
  title: 'Design System/Layout/Main',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SMain },
  template: `<s-main style="background-color: #d3dce6; height: 90px; padding: 32px; border-radius: 8px;">
               Here is s-main
             </s-main>`
})
