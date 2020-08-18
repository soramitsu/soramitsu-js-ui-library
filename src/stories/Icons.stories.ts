import { SCol, SRow, SMain } from '../components'
import { Icons } from '../types'

export default {
  title: 'Design System/Icons'
}

export const allIcons = () => ({
  components: { SMain, SRow, SCol },
  template: `<s-main>
               <s-row :gutter="20">
                 <s-col
                   :span="3"
                   v-for="icon in icons"
                   :key="icon"
                   class="flex"
                   style="flex-direction: column; padding-bottom: 20px;"
                 >
                   <i :class="'s-icon-' + icon" style="font-size: 16px;"></i>
                   <span style="font-size: 12px;">s-icon-{{ icon }}</span>
                 </s-col>
               </s-row>
             </s-main>`,
  data: () => ({
    icons: Object.values(Icons)
  })
})
