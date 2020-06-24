import { text, boolean, select, withKnobs } from '@storybook/addon-knobs'

import { SButton, SButtonGroup } from '../components'
import { ButtonSize, ButtonTypes } from '../components/Button'

export default {
  component: SButton,
  title: 'Design System/Button',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SButton },
  template: `<s-button
               :disabled="disabled"
               :loading="loading"
               :tooltip="tooltip"
               :icon="type === 'tertiary' ? 'back' : ''"
               :type="type"
               :size="size"
               @click="handleClick"
             >
               {{ type !== 'tertiary' ? 'Default' : '' }}
             </s-button>`,
  props: {
    disabled: {
      default: boolean('Disabled', false)
    },
    loading: {
      default: boolean('Loading', false)
    },
    type: {
      default: select('Type', Object.values(ButtonTypes), ButtonTypes.PRIMARY)
    },
    size: {
      default: select('Size', Object.values(ButtonSize), ButtonSize.BIG)
    },
    tooltip: {
      default: text('Tooltip', '')
    }
  },
  methods: {
    handleClick: () => alert('clicked')
  }
})

export const differentTypesData = Object.values(ButtonTypes).map(type => {
  const label = type[0].toUpperCase() + type.slice(1)
  const data = { type } as any
  if (type === ButtonTypes.TERTIARY) {
    data.icon = 'back'
    data.tooltip = label
  } else {
    data.label = label
  }
  return data
})
export const withDifferentTypes = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.type"
                 :type="item.type"
                 :tooltip="item.tooltip"
                 :icon="item.icon"
               >
                 {{ item.label }}
               </s-button>
             </el-row>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const differentSizeData = Object.values(ButtonSize).map(size =>
  ({ size, label: size[0].toUpperCase() + size.slice(1) }))
export const withDifferentSize = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.size"
                 :size="item.size"
               >
                 {{ item.label }}
               </s-button>
             </el-row>`,
  props: {
    items: {
      default: () => differentSizeData
    }
  }
})

export const disabled = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
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
             </el-row>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const loading = () => ({
  components: { SButton },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button
                 v-for="item in items"
                 :key="item.type"
                 :type="item.type"
                 :tooltip="item.tooltip"
                 :icon="item.icon"
                 :loading="true"
               >
                 {{ item.label }}
               </s-button>
             </el-row>`,
  props: {
    items: {
      default: () => differentTypesData
    }
  }
})

export const buttonGroup = () => ({
  components: { SButton, SButtonGroup },
  template: `<el-row class="flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button-group>
                 <s-button type="primary">Append</s-button>
                 <s-button type="delete">Remove</s-button>
               </s-button-group>
             </el-row>`
})
