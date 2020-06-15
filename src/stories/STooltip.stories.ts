import { text, withKnobs, boolean, select, number } from '@storybook/addon-knobs'

import { SButton, STooltip } from '@/components'
import { TooltipPlacement, TooltipTheme } from '@/components/STooltip'

export default {
  component: STooltip,
  title: 'Design System/Tooltip',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { STooltip, SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-tooltip
                 :theme="theme"
                 :value="value"
                 :content="content"
                 :disabled="disabled"
                 :offset="offset"
                 :openDelay="openDelay"
                 :manual="manual"
               >
                 <s-button style="margin: 40px">Custom tooltip</s-button>
               </s-tooltip>
             </el-row>`,
  props: {
    theme: {
      default: select('Theme', Object.values(TooltipTheme), TooltipTheme.DARK)
    },
    content: {
      default: text('Content', 'Custom tooltip')
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    value: {
      default: boolean('Value', false)
    },
    offset: {
      default: number('Offset', 0)
    },
    openDelay: {
      default: number('Open delay', 0)
    },
    manual: {
      default: boolean('Manual', false)
    }
  }
})

export const differentPlacementData = [
  [
    TooltipPlacement.TOP_START, TooltipPlacement.TOP, TooltipPlacement.TOP_END
  ],
  [
    TooltipPlacement.LEFT_START, TooltipPlacement.RIGHT_START
  ],
  [
    TooltipPlacement.LEFT, TooltipPlacement.RIGHT
  ],
  [
    TooltipPlacement.LEFT_END, TooltipPlacement.RIGHT_END
  ],
  [
    TooltipPlacement.BOTTOM_START, TooltipPlacement.BOTTOM, TooltipPlacement.BOTTOM_END
  ]
]
export const withDifferentPlacement = () => ({
  components: { STooltip, SButton },
  template: `<el-main style="padding: 40px 80px;">
               <el-row v-for="placements in items" :key="placements[0]" style="padding-bottom: 20px;">
                 <s-tooltip v-for="placement in placements" :key="placement" :placement="placement" :content="placement">
                   <s-button>{{ placement }}</s-button>
                 </s-tooltip>
               </el-row>
             </el-main>`,
  props: {
    items: {
      default: () => differentPlacementData
    }
  }
})

export const withDifferentCustomization = () => ({
  components: { STooltip, SButton },
  template: `<el-main>
               <el-row style="padding-bottom: 20px;">
                 <s-tooltip content="Dark" theme="dark">
                   <s-button>Dark</s-button>
                 </s-tooltip>
                 <s-tooltip content="Light" theme="light">
                   <s-button>Light</s-button>
                 </s-tooltip>
               </el-row>
               <el-row style="padding-bottom: 20px;">
                 <s-tooltip content="With arrow" :show-arrow="true">
                   <s-button>With arrow</s-button>
                 </s-tooltip>
                 <s-tooltip content="Without arrow" :show-arrow="false">
                   <s-button>Without arrow</s-button>
                 </s-tooltip>
               </el-row>
             </el-main>`
})

export const withDifferentDelay = () => ({
  components: { STooltip, SButton },
  template: `<el-row style="padding-bottom: 20px;">
               <s-tooltip content="Opened after 1 sec" theme="dark" :openDelay="1000">
                 <s-button>Before open</s-button>
               </s-tooltip>
               <s-tooltip content="Will close in 1 sec" theme="light" :closeDelay="1000">
                 <s-button>Before close</s-button>
               </s-tooltip>
             </el-row>`
})

export const withManualMode = () => ({
  components: { STooltip, SButton },
  template: `<el-row style="padding-bottom: 20px;">
               <s-tooltip content="Dark" theme="dark" manual :value="true">
                 <s-button>Dark</s-button>
               </s-tooltip>
               <s-tooltip content="Light" theme="light" manual :value="true">
                 <s-button>Light</s-button>
               </s-tooltip>
             </el-row>`
})
