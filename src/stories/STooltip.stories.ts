import { text, withKnobs, boolean, select, number } from '@storybook/addon-knobs'

import { SButton, STooltip, SRow, SMain } from '../components'
import { TooltipPlacement, TooltipTheme } from '../components/Tooltip'
import { BorderRadius } from '../types'

export default {
  component: STooltip,
  title: 'Design System/Components/Tooltip 🟣',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { STooltip, SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-tooltip
                 :theme="theme"
                 v-model="model"
                 :content="content"
                 :disabled="disabled"
                 :border-radius="borderRadius"
                 :offset="offset"
                 :open-delay="openDelay"
                 :close-delay="closeDelay"
                 :hide-after="hideAfter"
                 @change="handleChange"
               >
                 <s-button style="margin: 40px">Custom tooltip</s-button>
               </s-tooltip>
             </s-row>`,
  data: () => ({
    model: false
  }),
  props: {
    theme: {
      default: select('Theme', Object.values(TooltipTheme), TooltipTheme.AUTO)
    },
    content: {
      default: text('Content', 'Custom tooltip')
    },
    disabled: {
      default: boolean('Disabled', false)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    },
    offset: {
      default: number('Offset', 0)
    },
    openDelay: {
      default: number('Open delay', 1000)
    },
    closeDelay: {
      default: number('Close delay', 0)
    },
    hideAfter: {
      default: number('Hide after', 0)
    }
  },
  methods: {
    handleChange (value) {
      console.log('displayed', value)
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
  components: { STooltip, SButton, SRow, SMain },
  template: `<s-main style="padding: 40px 80px;">
               <s-row v-for="placements in items" :key="placements[0]" style="padding-bottom: 20px;">
                 <s-tooltip v-for="placement in placements" :border-radius="borderRadius" :key="placement" :placement="placement" :content="placement">
                   <s-button>{{ placement }}</s-button>
                 </s-tooltip>
               </s-row>
             </s-main>`,
  props: {
    items: {
      default: () => differentPlacementData
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    }
  }
})

export const withDifferentCustomization = () => ({
  components: { STooltip, SButton, SRow, SMain },
  template: `<s-main>
               <s-row style="padding-bottom: 20px;">
                 <s-tooltip content="Dark" theme="dark">
                   <s-button>Dark</s-button>
                 </s-tooltip>
                 <s-tooltip content="Light" theme="light">
                   <s-button>Light</s-button>
                 </s-tooltip>
               </s-row>
               <s-row style="padding-bottom: 20px;">
                 <s-tooltip content="With arrow" :show-arrow="true">
                   <s-button>With arrow</s-button>
                 </s-tooltip>
                 <s-tooltip content="Without arrow" :show-arrow="false">
                   <s-button>Without arrow</s-button>
                 </s-tooltip>
               </s-row>
             </s-main>`
})

export const withDifferentDelay = () => ({
  components: { STooltip, SButton, SRow },
  template: `<s-row style="padding-bottom: 20px;">
               <s-tooltip content="Opened after 1 sec" theme="dark" :openDelay="1000">
                 <s-button>Before open</s-button>
               </s-tooltip>
               <s-tooltip content="Will close in 1 sec" theme="light" :closeDelay="1000">
                 <s-button>Before close</s-button>
               </s-tooltip>
             </s-row>`
})

export const withManualMode = () => ({
  components: { STooltip, SButton, SRow },
  template: `<s-row style="padding-bottom: 20px;">
               <s-tooltip content="Dark" theme="dark" manual :value="true">
                 <s-button>Dark</s-button>
               </s-tooltip>
               <s-tooltip content="Light" theme="light" manual :value="true">
                 <s-button>Light</s-button>
               </s-tooltip>
             </s-row>`
})

export const withDifferentContent = () => ({
  components: { STooltip, SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button style="margin: 40px" :tooltip="content" @click="handleClick">Click</s-button>
             </s-row>`,
  data: () => ({
    content: 'Click'
  }),
  methods: {
    async handleClick () {
      (this as any).content = 'Clicked!'
      await new Promise((resolve) => setTimeout(resolve, 400));
      (this as any).content = 'Click'
    }
  }
})
