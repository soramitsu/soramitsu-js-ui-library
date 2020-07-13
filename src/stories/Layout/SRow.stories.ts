import { SRow, SCol, SMain } from '../../components'

import { layoutStylesData } from './Layout.stories'

export default {
  component: SRow,
  title: 'Design System/Layout/Row',
  excludeStories: /.*Data$/
}

export const defaultUsage = () => ({
  components: { SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="20" :style="[rowBg]">
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
                 <s-col :span="3"><div :style="[gridContent, bgPurple]"></div></s-col>
               </s-row>
             </s-main>`,
  data: () => layoutStylesData
})
