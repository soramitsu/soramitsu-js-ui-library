import { number, withKnobs, select, boolean } from '@storybook/addon-knobs'

import { SCol, SDropdown, SDropdownItem, SRow } from '../../components'
import { DropdownPlacement, DropdownSize, DropdownTrigger, DropdownType } from '../../components/Dropdown'
import { ButtonTypes } from '../../components/Button'

export default {
  component: SDropdown,
  title: 'Design System/Components/Dropdown',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SDropdown, SDropdownItem },
  template: `<s-dropdown
               type="button"
               size="big"
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
  props: {
    buttonType: {
      default: select('Button Type', Object.values(ButtonTypes), ButtonTypes.SECONDARY)
    },
    placement: {
      default: select('Placement', Object.values(DropdownPlacement), DropdownPlacement.BOTTOM_END)
    },
    hideOnClick: {
      default: boolean('Hide On Click', true)
    },
    showTimeout: {
      default: number('Show Timeout', 250)
    },
    hideTimeout: {
      default: number('Hide Timeout', 150)
    }
  },
  methods: {
    handleSelect: (value: string) => alert(`${value} is selected`)
  }
})

export const differentTypesData = Object.values(DropdownType).map(type => {
  const data = { type } as any
  data.label = type[0].toUpperCase() + type.slice(1)
  return data
})
export const buttonTypesData = Object.values(ButtonTypes).map(buttonType => {
  const data = { buttonType, type: DropdownType.BUTTON } as any
  data.label = buttonType[0].toUpperCase() + buttonType.slice(1) + ' button'
  return data
})
export const differentTypes = () => ({
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
               <s-col :span="3" v-for="item in buttonTypesData" :key="item.buttonType + 'withoutSplit'" style="height: 56px; margin-bottom: 20px;">
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
               <s-col :span="3" v-for="item in buttonTypesData" :key="item.buttonType" style="height: 56px; margin-bottom: 20px;">
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
  props: {
    differentTypesData: {
      default: () => differentTypesData
    },
    buttonTypesData: {
      default: () => buttonTypesData.filter(data => data.buttonType !== ButtonTypes.ACTION)
    }
  },
  methods: {
    handleClick: () => alert('clicked')
  }
})

export const differentSizeData = Object.values(DropdownSize).map(size => {
  const data = { size, type: DropdownType.BUTTON, buttonType: ButtonTypes.PRIMARY } as any
  data.label = size[0].toUpperCase() + size.slice(1)
  return data
})
export const differentSize = () => ({
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
  props: {
    differentSizeData: {
      default: () => differentSizeData
    }
  }
})

export const differentTriggerData = Object.values(DropdownTrigger).map(trigger => {
  const data = { trigger, type: DropdownType.BUTTON, buttonType: ButtonTypes.PRIMARY } as any
  data.label = trigger[0].toUpperCase() + trigger.slice(1)
  return data
})
export const differentTrigger = () => ({
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
  props: {
    differentTriggerData: {
      default: () => differentTriggerData
    }
  }
})
