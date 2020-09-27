<template>
  <el-option-group :label="label" :disabled="disabled">
    <slot></slot>
  </el-option-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SOptionGroup extends Vue {
  /**
   * Label of the option group
   */
  @Prop({ type: String, default: '' }) readonly label!: string
  /**
   * Disabled state of the option group.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-select-group__wrap:not(:last-of-type)::after {
  background-color: $s-color-neutral-hover;
}
.el-select-group__title {
  color: $s-color-neutral-tertiary;
}
</style>
