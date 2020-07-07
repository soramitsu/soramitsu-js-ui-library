import { SFooter } from '../components'

export default {
  component: SFooter,
  title: 'Design System/Layout/Footer',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SFooter },
  template: `<s-footer>
               <div>Here is s-footer</div>
             </s-footer>`
})
