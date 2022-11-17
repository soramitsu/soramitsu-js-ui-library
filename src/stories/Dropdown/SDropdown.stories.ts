import { Meta, Story } from '@storybook/vue'

import { SCol, SDropdown, SDropdownItem, SRow } from '../../components'
import { Size, BorderRadius } from '../../types'
import { DropdownPlacement, DropdownTrigger, DropdownType } from '../../components/Dropdown'
import { ButtonTypes } from '../../components/Button'

const differentTypesData = Object.values(DropdownType).map(type => {
  const data = { type } as any
  data.label = type[0].toUpperCase() + type.slice(1)
  return data
})

const buttonTypesData = Object.values(ButtonTypes).map(buttonType => {
  const data = { buttonType, type: DropdownType.BUTTON } as any
  data.label = buttonType[0].toUpperCase() + buttonType.slice(1) + ' button'
  return data
})

const differentSizeData = Object.values(Size).map(size => {
  const data = { size, type: DropdownType.BUTTON, buttonType: ButtonTypes.PRIMARY } as any
  data.label = size[0].toUpperCase() + size.slice(1)
  return data
})

const differentTriggerData = Object.values(DropdownTrigger).map(trigger => {
  const data = { trigger, type: DropdownType.BUTTON, buttonType: ButtonTypes.PRIMARY } as any
  data.label = trigger[0].toUpperCase() + trigger.slice(1)
  return data
})

export default {
  component: SDropdown,
  title: 'Design System/Components/Dropdown',
  excludeStories: /.*Data$/,
  argTypes: {
    buttonType: {
      name: 'Button Type',
      control: {
        type: 'select',
        options: Object.values(ButtonTypes)
      },
      defaultValue: ButtonTypes.SECONDARY
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
    placement: {
      name: 'Placement',
      control: {
        type: 'select',
        options: Object.values(DropdownPlacement)
      },
      defaultValue: DropdownPlacement.BOTTOM_END
    },
    hideOnClick: {
      name: 'Hide On Click',
      control: {
        type: 'boolean'
      },
      defaultValue: true
    },
    showTimeout: {
      name: 'Show Timeout',
      control: {
        type: 'number'
      },
      defaultValue: 250
    },
    hideTimeout: {
      name: 'Hide Timeout',
      control: {
        type: 'number'
      },
      defaultValue: 150
    }
  }
} as Meta

export const configurable: Story = (args, { argTypes }) => ({
  components: { SDropdown, SDropdownItem },
  props: Object.keys(argTypes),
  template: `<s-dropdown
               type="button"
               :size="size"
               :border-radius="borderRadius"
               :buttonType="buttonType"
               :placement="placement"
               :hide-on-click="hideOnClick"
               :show-timeout="showTimeout"
               :hide-timeout="hideTimeout"
               @select="handleSelect"
             >
               Dropdown menu
               <template slot="menu">
                 <s-dropdown-item value="action1">Action 1</s-dropdown-item>
                 <s-dropdown-item value="action2">Action 2</s-dropdown-item>
                 <s-dropdown-item value="action3">Action 3</s-dropdown-item>
                 <s-dropdown-item value="action4">Action 4</s-dropdown-item>
               </template>
             </s-dropdown>`,
  methods: {
    handleSelect: (value: string) => alert(`${value} is selected`)
  }
})

export const differentTypes: Story = () => ({
  components: { SCol, SDropdown, SDropdownItem, SRow },
  template: `<s-row :gutter="20" style="width: 100%;">
               <s-col :span="12" style="margin-bottom: 20px;"><span>Different types</span></s-col>
               <s-col :span="4" v-for="item in differentTypesData" :key="item.type" style="height: 56px; margin-bottom: 20px;">
                 <s-dropdown
                   :type="item.type"
                 >
                   {{ item.label }}
                   <template slot="menu">
                     <s-dropdown-item>Action 1</s-dropdown-item>
                     <s-dropdown-item>Action 2</s-dropdown-item>
                     <s-dropdown-item>Action 3</s-dropdown-item>
                     <s-dropdown-item>Action 4</s-dropdown-item>
                   </template>
                 </s-dropdown>
               </s-col>
               <s-col :span="12" style="margin-bottom: 20px;"><span>Different button types</span></s-col>
               <s-col :xs="6" :sm="6" :md="4" :lg="3" :xl="3" v-for="item in buttonTypesData" :key="item.buttonType + 'withoutSplit'" style="height: 56px; margin-bottom: 20px;">
                 <s-dropdown
                   :type="item.type"
                   :button-type="item.buttonType"
                 >
                   {{ item.label }}
                   <template slot="menu">
                     <s-dropdown-item>Action 1</s-dropdown-item>
                     <s-dropdown-item>Action 2</s-dropdown-item>
                     <s-dropdown-item>Action 3</s-dropdown-item>
                     <s-dropdown-item>Action 4</s-dropdown-item>
                   </template>
                 </s-dropdown>
               </s-col>
               <s-col :span="12" style="margin-bottom: 20px;"><span>Different button types with splitted button</span></s-col>
               <s-col :xs="6" :sm="6" :md="4" :lg="3" :xl="3" v-for="item in buttonTypesData" :key="item.buttonType" style="height: 56px; margin-bottom: 20px;">
                 <s-dropdown
                   :type="item.type"
                   split-button
                   :button-type="item.buttonType"
                   @click="handleClick"
                 >
                   {{ item.label }}
                   <template slot="menu">
                     <s-dropdown-item>Action 1</s-dropdown-item>
                     <s-dropdown-item>Action 2</s-dropdown-item>
                     <s-dropdown-item>Action 3</s-dropdown-item>
                     <s-dropdown-item>Action 4</s-dropdown-item>
                   </template>
                 </s-dropdown>
               </s-col>
             </s-row>`,
  data: () => ({
    differentTypesData,
    buttonTypesData: buttonTypesData.filter(data => data.buttonType !== ButtonTypes.ACTION)
  }),
  methods: {
    handleClick: () => alert('clicked')
  }
})

export const differentSize: Story = () => ({
  components: { SCol, SDropdown, SDropdownItem, SRow },
  template: `<s-row :gutter="20" style="width: 100%;">
               <s-col :span="4" v-for="item in differentSizeData" :key="item.size" style="height: 56px; margin-bottom: 20px;">
                 <s-dropdown
                   :type="item.type"
                   :button-type="item.buttonType"
                   :size="item.size"
                 >
                   {{ item.label }}
                   <template slot="menu">
                     <s-dropdown-item>Action 1</s-dropdown-item>
                     <s-dropdown-item>Action 2</s-dropdown-item>
                     <s-dropdown-item>Action 3</s-dropdown-item>
                     <s-dropdown-item>Action 4</s-dropdown-item>
                   </template>
                 </s-dropdown>
               </s-col>
             </s-row>`,
  data: () => ({
    differentSizeData
  })
})

export const differentTrigger: Story = () => ({
  components: { SCol, SDropdown, SDropdownItem, SRow },
  template: `<s-row :gutter="20" style="width: 100%;">
               <s-col :span="4" v-for="item in differentTriggerData" :key="item.trigger" style="height: 56px; margin-bottom: 20px;">
                 <s-dropdown
                   :type="item.type"
                   :button-type="item.buttonType"
                   :trigger="item.trigger"
                 >
                   {{ item.label }}
                   <template slot="menu">
                     <s-dropdown-item>Action 1</s-dropdown-item>
                     <s-dropdown-item>Action 2</s-dropdown-item>
                     <s-dropdown-item>Action 3</s-dropdown-item>
                     <s-dropdown-item>Action 4</s-dropdown-item>
                   </template>
                 </s-dropdown>
               </s-col>
             </s-row>`,
  data: () => ({
    differentTriggerData
  })
})
