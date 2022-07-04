import { defineMeta, defineStory } from './util'
import { SDatePicker } from '@/lib'
import { ref } from 'vue'

export default defineMeta({
  title: 'Example/DatePicker',
})

export const Configurable = defineStory((args) => ({
  components: {
    SDatePicker,
  },
  setup() {
    let date = ref<Date | null>(null)
    return {
      args,
      date,
    }
  },
  template: `
    <div class="flex flex-col items-start">
      <SDatePicker v-model="date" :type="args.type" :time="args.time" :disabled="args.disabled"/>
    </div>
    <div class="flex items-center justify-start">
      <p>@v-model = </p>
      <p>{{date}}</p>
    </div>
  `,
}))
Configurable.argTypes = {
  type: {
    options: ['day', 'range', 'pick'],
    control: 'select',
  },
  time: {
    control: 'boolean',
  },
}
Configurable.args = {
  type: 'day',
  time: true,
  disabled: false,
}
