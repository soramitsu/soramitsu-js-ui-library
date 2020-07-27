<template>
  <el-collapse
    :value="value"
    :accordion="accordion"
    @change="handleChange"
  >
    <slot></slot>
  </el-collapse>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

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
