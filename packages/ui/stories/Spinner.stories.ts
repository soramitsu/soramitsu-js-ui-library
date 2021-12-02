import { SSpinner } from '@/lib'
import { defineMeta, defineStory } from './util'

export default defineMeta({
  title: 'Example/Spinner',
})

export const Gallery = defineStory(() => ({
  components: { SSpinner },
  setup() {},
  template: `
    <div class="flex items-center space-x-4 text-accent">
      <SSpinner />
      <SSpinner class="text-blue-500" />
      <SSpinner size="50px" />
      <SSpinner style="fontSize: 50px" />
      <SSpinner size="25" width="2" />
      <SSpinner size="25" width="9" />
    </div>
  `,
}))
