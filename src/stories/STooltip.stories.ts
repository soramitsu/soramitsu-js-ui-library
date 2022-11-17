import { Meta, Story } from '@storybook/vue'

import { SButton, STooltip, SRow, SMain } from '../components'
import { TooltipPlacement, TooltipTheme } from '../components/Tooltip'
import { BorderRadius } from '../types'

const differentPlacementData = [
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

export default {
  component: STooltip,
  title: 'Design System/Components/Tooltip 🟣',
  excludeStories: /.*Data$/,
  argTypes: {
    theme: {
      name: 'Theme',
      control: {
        type: 'select',
        options: Object.values(TooltipTheme)
      },
      defaultValue: TooltipTheme.AUTO
    },
    content: {
      name: 'Content',
      control: {
        type: 'text'
      },
      defaultValue: 'Custom tooltip'
    },
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    offset: {
      name: 'Offset',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    },
    openDelay: {
      name: 'Open delay',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 1000
    },
    closeDelay: {
      name: 'Close delay',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    },
    hideAfter: {
      name: 'Hide after',
      control: {
        type: 'number',
        min: 0
      },
      defaultValue: 0
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { STooltip, SButton, SRow },
  props: Object.keys(argTypes),
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
  methods: {
    handleChange (value) {
      console.log('displayed', value)
    }
  }
})

export const withDifferentPlacement: Story = (args, { argTypes }) => ({
  components: { STooltip, SButton, SRow, SMain },
  props: Object.keys(argTypes),
  template: `<s-main style="padding: 40px 80px;">
               <s-row v-for="placements in items" :key="placements[0]" style="padding-bottom: 20px;">
                 <s-tooltip v-for="placement in placements" :border-radius="borderRadius" :key="placement" :placement="placement" :content="placement">
                   <s-button>{{ placement }}</s-button>
                 </s-tooltip>
               </s-row>
             </s-main>`,
  data: () => ({
    items: differentPlacementData
  })
})

export const withDifferentCustomization: Story = () => ({
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

export const withDifferentDelay: Story = () => ({
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

export const withManualMode: Story = () => ({
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

export const withDifferentContent: Story = () => ({
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
