import { withKnobs, select, number } from '@storybook/addon-knobs'

import { SCol, SRow, SMain, SIcon } from '../components'
import { Icons16, Icons24 } from '../components/Icon'

export default {
  component: SIcon,
  title: 'Design System/Components/Icon',
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
      default: select('Name', [...Object.values(Icons16), ...Object.values(Icons24)], Icons16.Refresh)
    },
    size: {
      default: number('Icon Size', 16)
    }
  }
})

const showIconsSet = (iconsEnum: any) => ({
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
                   <s-icon :name="icon" />
                   <span style="font-size: 12px;">s-icon-{{ icon }}</span>
                 </s-col>
               </s-row>
             </s-main>`,
  data: () => ({
    icons: Object.values(iconsEnum)
  })
})

export const iconsWith16pxSize = () => showIconsSet(Icons16)

export const iconsWith24pxSize = () => showIconsSet(Icons24)
