import { Meta, Story } from '@storybook/vue'

import { SButton, SButtonGroup, SRow, SCol, SMain, SIcon } from '../components'
import { ButtonTypes, ButtonIconPosition } from '../components/Button'
import { Size, BorderRadius } from '../types'

export const differentTypeButtonsData = Object.values(ButtonTypes).map(type => {
  const label = type[0].toUpperCase() + type.slice(1)
  const data = { type } as any
  if (type === ButtonTypes.ACTION) {
    data.icon = 'refresh-16'
    data.tooltip = label
  } else {
    data.label = label
  }
  return data
})

const differentSizeData = Object.values(Size).map(size =>
  ({ size, label: size[0].toUpperCase() + size.slice(1) }))

export default {
  component: SButton,
  title: 'Design System/Components/Button 🟣',
  excludeStories: /.*Data$/,
  argTypes: {
    disabled: {
      name: 'Disabled',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    loading: {
      name: 'Loading',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
        options: Object.values(ButtonTypes)
      },
      defaultValue: ButtonTypes.PRIMARY
    },
    size: {
      name: 'Size',
      control: {
        type: 'select',
        options: Object.values(Size)
      },
      defaultValue: Size.BIG
    },
    borderRadius: {
      name: 'Border Radius',
      control: {
        type: 'select',
        options: Object.values(BorderRadius)
      },
      defaultValue: BorderRadius.SMALL
    },
    rounded: {
      name: 'Rounded',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    alternative: {
      name: 'Alternative',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    primary: {
      name: 'Primary',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    tooltip: {
      name: 'Tooltip',
      control: {
        type: 'text'
      }
    },
    content: {
      name: 'Button text',
      control: {
        type: 'text'
      },
      defaultValue: 'Default'
    },
    withTypography: {
      name: 'With Typography css class',
      control: {
        type: 'boolean'
      },
      defaultValue: false
    },
    typography: {
      name: 'Typographic css class',
      control: {
        type: 'text'
      },
      if: { arg: 'withTypography' },
      defaultValue: 's-typography-button--large'
    },
    icon: {
      name: 'Button icon',
      control: {
        type: 'text'
      },
      defaultValue: 'arrows-swap-24'
    },
    iconPosition: {
      name: 'Icon Position',
      control: {
        type: 'select',
        options: Object.values(ButtonIconPosition)
      },
      defaultValue: ButtonIconPosition.LEFT
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SButton, SIcon },
  props: Object.keys(argTypes),
  template: `<s-button
               :class="withTypography ? typography : ''"
               :disabled="disabled"
               :loading="loading"
               :tooltip="tooltip"
               :type="type"
               :size="size"
               :border-radius="borderRadius"
               :rounded="rounded"
               :alternative="alternative"
               :primary="primary"
               @click="handleClick"
             >
               <s-icon v-if="isAction" :name="icon"/>
               <span v-else>{{ content }}</span>
             </s-button>`,
  methods: {
    handleClick: () => alert('clicked')
  },
  computed: {
    isAction () {
      return (this as any).type === ButtonTypes.ACTION
    }
  }
})

export const withDifferentTypes: Story = () => ({
  components: { SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.type"
                 :type="item.type"
                 :tooltip="item.tooltip"
                 :icon="item.icon"
               >
                 {{ item.label }}
               </s-button>
             </s-row>`,
  data: () => ({
    items: differentTypeButtonsData
  })
})

export const withDifferentSize: Story = () => ({
  components: { SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.size"
                 :size="item.size"
               >
                 {{ item.label }}
               </s-button>
             </s-row>`,
  data: () => ({
    items: differentSizeData
  })
})

const differentBorderRadiusData = Object.values(BorderRadius).map(borderRadius =>
  ({ borderRadius, label: borderRadius[0].toUpperCase() + borderRadius.slice(1) }))

export const withDifferentBorderRadius: Story = () => ({
  components: { SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.borderRadius"
                 :border-radius="item.borderRadius"
               >
                 {{ item.label }}
               </s-button>
             </s-row>`,
  data: () => ({
    items: differentBorderRadiusData
  })
})

export const disabled: Story = () => ({
  components: { SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.type"
                 :type="item.type"
                 :tooltip="item.tooltip"
                 :icon="item.icon"
                 disabled
               >
                 {{ item.label }}
               </s-button>
             </s-row>`,
  data: () => ({
    items: differentTypeButtonsData
  })
})

export const loading: Story = () => ({
  components: { SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.type"
                 :type="item.type"
                 :tooltip="item.tooltip"
                 :icon="item.icon"
                 loading
               >
                 {{ item.label }}
               </s-button>
             </s-row>`,
  data: () => ({
    items: differentTypeButtonsData
  })
})

const withIcon = (icon: string) => ({
  components: { SButton, SRow, SCol, SMain },
  template: `<s-main>
               <s-row :gutter="20">
                 <s-col :span="6" v-for="item in differentTypesData" :key="item.type" style="padding-bottom: 20px;">
                   <s-button size="big" :icon="icon" :icon-position="iconPosition" :type="item.type" :tooltip="item.tooltip">
                     {{ item.label }}
                   </s-button>
                 </s-col>
                 <s-col :span="6" v-for="item in differentTypesData" :key="item.type + 'Disabled'" style="padding-bottom: 20px;">
                   <s-button size="big" :icon="icon" :icon-position="iconPosition" :type="item.type" :tooltip="item.tooltip" disabled>
                     {{ item.label }}
                   </s-button>
                 </s-col>
                 <s-col :span="4" v-for="item in differentSizeData" :key="item.size">
                   <s-button :size="item.size" :icon="icon" :icon-position="iconPosition">
                     {{ item.label }}
                   </s-button>
                 </s-col>
               </s-row>
             </s-main>`,
  data: () => ({
    icon,
    differentSizeData,
    differentTypesData: differentTypeButtonsData
  })
})

export const withIcon16: Story = () => withIcon('refresh-16')

export const withIcon24: Story = () => withIcon('arrows-swap-24')

export const buttonGroup: Story = () => ({
  components: { SButton, SButtonGroup, SRow, SCol },
  template: `<s-row>
               <s-col :xs="12" :sm="12" :md="12" :lg="12">
                 <s-button-group size="big" border-radius="big">
                   <s-button type="primary">Primary #1</s-button>
                   <s-button type="primary">Primary #2</s-button>
                   <s-button type="primary">Primary #3</s-button>
                 </s-button-group>
               </s-col>
               <s-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-top: 24px;">
                 <s-button-group size="big" border-radius="big">
                   <s-button type="primary" alternative>Primary Alt #1</s-button>
                   <s-button type="primary" alternative>Primary Alt #2</s-button>
                   <s-button type="primary" alternative>Primary Alt #3</s-button>
                 </s-button-group>
               </s-col>
               <s-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-top: 24px;">
                 <s-button-group size="big" border-radius="big">
                   <s-button type="secondary">Secondary #1</s-button>
                   <s-button type="secondary">Secondary #2</s-button>
                   <s-button type="secondary">Secondary #3</s-button>
                 </s-button-group>
               </s-col>
               <s-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-top: 24px;">
                 <s-button-group size="big" border-radius="big">
                   <s-button type="secondary" alternative>Secondary Alt #1</s-button>
                   <s-button type="secondary" alternative>Secondary Alt #2</s-button>
                   <s-button type="secondary" alternative>Secondary Alt #3</s-button>
                 </s-button-group>
               </s-col>
               <s-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-top: 24px;">
                 <s-button-group size="big" border-radius="big">
                   <s-button type="tertiary">Tertiary #1</s-button>
                   <s-button type="tertiary">Tertiary #2</s-button>
                   <s-button type="tertiary">Tertiary #3</s-button>
                 </s-button-group>
               </s-col>
               <s-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-top: 24px;">
                 <s-button-group size="big" border-radius="big">
                   <s-button type="primary">Primary #1</s-button>
                   <s-button type="secondary">Secondary #2</s-button>
                   <s-button type="tertiary">Tertiary #3</s-button>
                 </s-button-group>
               </s-col>
               <s-col :xs="12" :sm="12" :md="12" :lg="12" style="margin-top: 24px;">
                 <s-button-group size="big" border-radius="big" style="margin-right: 24px;">
                   <s-button type="action" icon="basic-circle-plus-24"></s-button>
                   <s-button type="action" icon="basic-circle-x-24"></s-button>
                   <s-button type="action" icon="basic-eye-24"></s-button>
                 </s-button-group>
                 <s-button-group size="big" border-radius="big" style="margin-right: 24px;">
                   <s-button type="action" alternative icon="basic-circle-plus-24"></s-button>
                   <s-button type="action" alternative icon="basic-circle-x-24"></s-button>
                   <s-button type="action" alternative icon="basic-eye-24"></s-button>
                 </s-button-group>
                 <s-button-group size="big" border-radius="big">
                   <s-button type="action" primary icon="basic-circle-plus-24"></s-button>
                   <s-button type="action" primary icon="basic-circle-x-24"></s-button>
                   <s-button type="action" primary icon="basic-eye-24"></s-button>
                 </s-button-group>
               </s-col>
             </s-row>`
})
