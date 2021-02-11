<template>
  <el-collapse
    :value="value"
    :accordion="accordion"
    :style="computedStyles"
    @change="handleChange"
  >
    <slot></slot>
  </el-collapse>
</template>

<script lang="ts">
import { Vue, Component, Prop, Provide } from 'vue-property-decorator'

import { BorderTypes } from './consts'

@Component
export default class SCollapse extends Vue {
  /**
   * Value of the collapse component. Can be `string / number / Array (non-accordion mode)`
   */
  @Prop() readonly value!: string | number | Array<string | number>
  /**
   * Accordion mode of the collapse component.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly accordion!: boolean
  /**
   * Will borders be shown.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly borders!: boolean | BorderTypes

  @Provide('sCollapse') sCollapse = this

  get computedStyles (): object {
    const styles = {} as any
    if (!this.borders || this.borders === BorderTypes.INTERNAL) {
      styles.border = 'none'
    } else if (this.borders === BorderTypes.TOP) {
      styles.borderBottom = 'none'
    } else if (this.borders === BorderTypes.BOTTOM) {
      styles.borderTop = 'none'
    }
    return styles
  }

  handleChange (activeNames: string | number | Array<string | number>): void {
    this.$emit('change', activeNames)
  }
}
</script>
