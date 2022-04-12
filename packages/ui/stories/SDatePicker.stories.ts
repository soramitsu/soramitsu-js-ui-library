import { defineMeta, defineStory } from './util'
import { SDatePicker } from '@/lib'
import { IconClose } from '@/components/icons'
import { ref } from 'vue'

export default defineMeta({
  title: 'Example/DatePicker'
})

export const Configurable = defineStory((args) =>  ({
  components: {
    SDatePicker,
  },
  setup() {
    const date = ref(new Date())
    const month = ref(0)
    return {
      args, date, month
    }
  },
  template: `
    <div class="flex flex-col items-start">
    <SDatePicker v-model="date" v-model:month="month"/>
    </div>
    <p>{{date}}</p>
    <p>{{month}}</p>
  `
}))
// Configurable.argTypes = {
//   type: {
//     options: BUTTON_TYPE_VALUES,
//     control: 'inline-radio'
//   },
//   size: {
//     options: BUTTON_SIZE_VALUES,
//     control: 'inline-radio'
//   },
//   icon: { control: 'text' },
//   iconPosition: {
//     options: BUTTON_ICON_POSITION_VALUES,
//     control: 'inline-radio'
//   },
//   disabled: { control: 'boolean' },
//   rounded: { control: 'boolean' },
//   loading: { control: 'boolean' },
//   uppercase: { control: 'boolean' },
// }
// Configurable.args = {
//   type: 'primary',
//   size: 'medium',
//   icon: '',
//   iconPosition: 'left',
//   disabled: false,
//   rounded: false,
//   loading: false,
//   uppercase: false,
// }