<template>
  <div class="s-row" :class="computedClasses" :style="computedStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { RowJustify, RowAlignment } from './consts'

@Component
export default class SRow extends Vue {
  /**
   * Grid spacing.
   *
   * By default it's set to `0`
   */
  @Prop({ type: Number, default: 0 }) readonly gutter!: number
  /**
   * Horizontal alignment of the flex layout.
   *
   * By default it's set to `"start"`
   */
  @Prop({ default: RowJustify.START, type: String }) readonly justify!: string
  /**
   * Flex flag which is used for the flex layout.
   *
   * By default it's set to `false`
   */
  @Prop({ default: false, type: Boolean }) readonly flex!: boolean
  /**
   * Vertical alignment of the flex layout.
   *
   * By default it's set to `"top"`
   */
  @Prop({ default: RowAlignment.TOP, type: String }) readonly align!: string

  get computedStyles (): object {
    const styles = {} as any
    if (this.gutter) {
      styles.marginLeft = `-${this.gutter / 2}px`
      styles.marginRight = styles.marginLeft
    }
    if (this.justify !== RowJustify.START) {
      styles.justifyContent = this.justify !== RowJustify.END ? this.justify : 'flex-end'
    }
    if (this.align !== RowAlignment.TOP) {
      styles.alignItems = this.align === RowAlignment.MIDDLE ? 'center' : 'flex-end'
    }
    return styles
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.flex) {
      cssClasses.push('row-flex')
    }
    return cssClasses
  }
}
</script>
