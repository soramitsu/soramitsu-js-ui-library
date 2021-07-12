<template>
  <el-collapse
    :class="computedClasses"
    :value="value"
    :accordion="accordion"
    :style="computedStyles"
    @change="handleChange"
  >
    <slot></slot>
  </el-collapse>
</template>

<script lang="ts">
import { Mixins, Component, Prop, Provide } from 'vue-property-decorator'

import DesignSystemInject from '../../DesignSystem/DesignSystemInject'
import { BorderTypes } from '../consts'

@Component
export default class SCollapse extends Mixins(DesignSystemInject) {
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
  @Prop({ default: false, type: Boolean }) readonly borders!: boolean
  /**
   * Type of borders
   *
   * `internal` by default
   */
  @Prop({ default: BorderTypes.INTERNAL, type: String }) readonly bordersType!: BorderTypes

  @Provide('sCollapse') sCollapse = this

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    return cssClasses
  }

  get computedStyles (): object {
    const styles = {} as any
    if (!this.borders || this.bordersType === BorderTypes.INTERNAL) {
      styles.border = 'none'
    } else if (this.bordersType === BorderTypes.TOP) {
      styles.borderBottom = 'none'
    } else if (this.bordersType === BorderTypes.BOTTOM) {
      styles.borderTop = 'none'
    }
    return styles
  }

  handleChange (activeNames: string | number | Array<string | number>): void {
    this.$emit('change', activeNames)
  }
}
</script>
