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
  @Prop({ default: false, type: Boolean }) readonly withBorders!: boolean

  @Provide('sCollapse') sCollapse = this

  get computedStyles (): object {
    const styles = {} as any
    if (!this.withBorders) {
      styles.border = 'none'
    }
    return styles
  }

  handleChange (activeNames: string | number | Array<string | number>): void {
    this.$emit('change', activeNames)
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-collapse {
  border-top-color: $color-neutral-hover;
  border-bottom-color: $color-neutral-hover;
}
</style>
