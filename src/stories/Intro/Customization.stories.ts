import { withKnobs } from '@storybook/addon-knobs'

import { AccentColors, ContentColors, MiscColors, SecondaryColors, StatusColors, TertiaryButtonColors, UtilityColors } from '../../types'
import { SRow, SButton, SInput, SCol, SDivider } from '../../components'
import { differentTypeButtonsData } from '../SButton.stories'

export default {
  title: 'Design System/Intro/Customization',
  decorators: [withKnobs],
  excludeStories: /.*Data$/
}

const colorPropertyPrefix = '--s-color-'
const getColorsData = (colors) => Object.values(colors).map(colorPropertyName => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`${colorPropertyPrefix}${colorPropertyName}`)
  const isRgb = value.includes('rgb')
  return { label: colorPropertyName, value, isRgb }
})
export const colorsSectionsData = [
  { title: 'Theme / Accent', colors: getColorsData(AccentColors) },
  { title: 'Theme / Secondary', colors: getColorsData(SecondaryColors) },
  { title: 'Base / Content', colors: getColorsData(ContentColors) },
  { title: 'Base / Misc.', colors: getColorsData(MiscColors) },
  { title: 'Utility', colors: getColorsData(UtilityColors) },
  { title: 'Status', colors: getColorsData(StatusColors) },
  { title: 'Button / Tertiary', colors: getColorsData(TertiaryButtonColors) }
]
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
                 style="flex-direction: column;"
                 v-for="section in sections"
                 :key="section.title"
                 :lg="4" :md="4" :sm="6" :xs="12"
               >
                 <span style="padding-right: 10px; font-weight: bold;">{{ section.title }}</span>
                 <div v-for="color in section.colors" :key="color.label" class="s-flex" style="align-items: center;">
                   <span style="padding-right: 10px;">{{ color.label }}</span>
                   <el-color-picker
                     style="flex: 1; text-align: right; padding-right: 20%;"
                     :show-alpha="color.isRgb"
                     size="small"
                     v-model="color.value"
                     @change="(value) => handleColorChange(color.label, value)"
                   />
                 </div>
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
    sections: colorsSectionsData,
    buttons: differentTypeButtonsData,
    inputs: themeInputsData
  }),
  methods: {
    handleColorChange: (label: string, color: string) => {
      document.documentElement.style.setProperty(`${colorPropertyPrefix}${label}`, color)
    }
  }
})
