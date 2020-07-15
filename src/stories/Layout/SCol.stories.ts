import { SRow, SCol, SMain } from '../../components'

import { layoutStylesData } from './Layout.stories'

export default {
  component: SCol,
  title: 'Design System/Layout/Col',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="12"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})
