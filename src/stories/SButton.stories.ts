import { text, boolean, select, withKnobs } from '@storybook/addon-knobs'

import { SButton, SButtonGroup, SRow, SCol, SMain, SDesignSystemProvider } from '../components'
import { Size, BorderRadius } from '../types'
import { ButtonTypes, ButtonIconPosition } from '../components/Button'
import { DesignSystemTypes } from '../components/DesignSystem'

export default {
  component: SButton,
  title: 'Design System/Components/Button',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const configurable = () => ({
  components: { SButton, SDesignSystemProvider },
  template: `
            <s-design-system-provider :value="designSystem">
              <s-button
               :disabled="disabled"
               :loading="loading"
               :tooltip="tooltip"
               :icon="type === 'action' ? 'arrows-swap-24' : ''"
               :type="type"
               :size="size"
               :border-radius="borderRadius"
               :rounded="rounded"
               :alternative="alternative"
               @click="handleClick"
              >
               {{ type !== 'action' ? 'Default' : '' }}
              </s-button>
            </s-design-system-provider>`,
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystemTypes), DesignSystemTypes.DEFAULT)
    },
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
      default: select('Size', Object.values(Size), Size.BIG)
    },
    borderRadius: {
      default: select('BorderRadius', Object.values(BorderRadius), BorderRadius.SMALL)
    },
    rounded: {
      default: boolean('Rounded', false)
    },
    alternative: {
      default: boolean('Alternative', false)
    },
    tooltip: {
      default: text('Tooltip', '')
    }
  },
  methods: {
    handleClick: () => alert('clicked')
  }
})

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
export const withDifferentTypes = () => ({
  components: { SButton, SRow, SDesignSystemProvider },
  template: `
            <s-design-system-provider :value="designSystem">
              <s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
                <s-button
                  v-for="item in items"
                  :key="item.type"
                  :type="item.type"
                  :tooltip="item.tooltip"
                  :icon="item.icon"
                >
                  {{ item.label }}
                </s-button>
              </s-row>
            <s-design-system-provider />`,
  props: {
    designSystem: {
      default: select('Design System', Object.values(DesignSystemTypes), DesignSystemTypes.DEFAULT)
    },
    items: {
      default: () => differentTypeButtonsData
    }
  }
})

export const differentSizeData = Object.values(Size).map(size =>
  ({ size, label: size[0].toUpperCase() + size.slice(1) }))
export const withDifferentSize = () => ({
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
  props: {
    items: {
      default: () => differentSizeData
    }
  }
})

export const differentBorderRadiusData = Object.values(BorderRadius).map(borderRadius =>
  ({ borderRadius, label: borderRadius[0].toUpperCase() + borderRadius.slice(1) }))
export const withDifferentBorderRadius = () => ({
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
  props: {
    items: {
      default: () => differentBorderRadiusData
    }
  }
})

export const disabled = () => ({
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
  props: {
    items: {
      default: () => differentTypeButtonsData
    }
  }
})

export const loading = () => ({
  components: { SButton, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
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
             </s-row>`,
  props: {
    items: {
      default: () => differentTypeButtonsData
    }
  }
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
  props: {
    differentSizeData: {
      default: () => differentSizeData
    },
    differentTypesData: {
      default: () => differentTypeButtonsData
    },
    iconPosition: {
      default: select('IconPosition', Object.values(ButtonIconPosition), ButtonIconPosition.LEFT)
    }
  },
  data: () => ({
    icon
  })
})

export const withIcon16 = withIcon('refresh-16')

export const withIcon24 = withIcon('arrows-swap-24')

export const buttonGroup = () => ({
  components: { SButton, SButtonGroup, SRow },
  template: `<s-row class="s-flex" style="flex: 1; justify-content: space-between; align-items: center;">
               <s-button-group>
                 <s-button type="primary">Append</s-button>
                 <s-button type="delete">Remove</s-button>
               </s-button-group>
             </s-row>`
})
