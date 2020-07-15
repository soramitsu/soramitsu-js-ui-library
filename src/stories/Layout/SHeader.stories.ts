import { SHeader } from '../../components'

export default {
  component: SHeader,
  title: 'Design System/Layout/Header',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SHeader },
  template: `<s-header>
               <div>Here is s-header</div>
             </s-header>`
})
