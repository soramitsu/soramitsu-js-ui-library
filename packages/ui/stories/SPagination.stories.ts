import { defineMeta, defineStory } from './util'
import { SPagination } from '@/lib'

export default defineMeta({
  title: 'Example/Pagination',
})

export const Configurable = defineStory((args: Record<string, unknown>) => ({
  components: {
    SPagination,
  },
  setup() {
    return {
      args,
    }
  },
  template: `<SPagination
    :total="202"
    :page-sizes="[10, 20, 100, 200, 500]"
  />`,
}))
