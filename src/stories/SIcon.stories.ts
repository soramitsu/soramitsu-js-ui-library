import { withKnobs, select, number } from '@storybook/addon-knobs'

import { SCol, SRow, SMain, SIcon } from '../components'
import { Icons } from '../components/Icon'

export default {
  component: SIcon,
  title: 'Design System/Icon',
  decorators: [withKnobs]
}

export const configurable = () => ({
  components: { SMain, SRow, SCol, SIcon },
  template: `<s-main>
               <s-row>
                 <s-icon :name="name" :size="size" />
               </s-row>
             </s-main>`,
  props: {
    name: {
      default: select('Name', Object.values(Icons), Icons.Activity)
    },
    size: {
      default: number('Content position', 16)
    }
  }
})

export const allIcons = () => ({
  components: { SMain, SRow, SCol, SIcon },
  template: `<s-main>
               <s-row :gutter="20">
                 <s-col
                   :span="3"
                   v-for="icon in icons"
                   :key="icon"
                   class="s-flex"
                   style="flex-direction: column; padding-bottom: 20px;"
                 >
                   <s-icon :name="icon" :size="18" />
                   <span style="font-size: 12px;">s-icon-{{ icon }}</span>
                 </s-col>
               </s-row>
             </s-main>`,
  data: () => ({
    icons: Object.values(Icons)
  })
})
