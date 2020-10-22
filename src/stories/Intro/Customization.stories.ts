import { withKnobs } from '@storybook/addon-knobs'

import { Colors } from '../../types'
import { SRow, SButton, SInput, SCol, SDivider } from '../../components'
import { differentTypeButtonsData } from '../SButton.stories'

export default {
  title: 'Design System/Intro/Customization',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

export const colorsData = Object.values(Colors).map(color => ({
  label: color,
  value: getComputedStyle(document.documentElement).getPropertyValue(color)
}))
export const themeInputsData = [
  'text',
  'textarea',
  'text-file'
]
export const configurable = () => ({
  components: { SRow, SCol, SButton, SInput, SDivider },
  template: `<div style="flex: 1;">
             <s-row>
               <s-col
                 class="s-flex"
                 style="align-items: center;"
                 v-for="color in colors"
                 :key="color.label"
                 :span="4"
               >
                 <span style="padding-right: 10px;">{{ color.label }}</span>
                 <el-color-picker size="small" v-model="color.value" @change="(value) => handleColorChange(color.label, value)" />
               </s-col>
             </s-row>
             <s-divider />
             <s-row>
               <s-col class="s-flex" :span="12" style="justify-content: space-between;">
                 <s-button
                   v-for="button in buttons"
                   :key="button.type"
                   size="small"
                   icon="refresh"
                   :type="button.type"
                   :tooltip="button.tooltip"
                 >
                   {{ button.label }}
                 </s-button>
               </s-col>
             </s-row>
             <s-divider />
             <s-row :gutter="20">
               <s-col v-for="input in inputs" :key="input" :span="4">
                 <s-input :placeholder="input" :type="input" />
               </s-col>
             </s-row>
             <s-divider />
             <h4>You can also check another components, these colors are applied to the whole library</h4>
             </div>`,
  data: () => ({
    colors: colorsData,
    buttons: differentTypeButtonsData,
    inputs: themeInputsData
  }),
  methods: {
    handleColorChange: (label: string, color: string) => {
      document.documentElement.style.setProperty(label, color)
    }
  }
})
