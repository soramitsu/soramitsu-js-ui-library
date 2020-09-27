<template>
  <el-dropdown-item
    :command="value"
    :disabled="disabled"
    :divided="divided"
    :icon="computedIcon"
  >
    <slot></slot>
  </el-dropdown-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ElDropdownItem } from 'element-ui/types/dropdown-item'

@Component
export default class SDropdownItem extends Vue {
  /**
   * A value of the dropdown item which will be returned from select method
   * of the dropdown component. It can be `string/number/object` type
   */
  @Prop() readonly value!: any
  /**
   * Disabled state of the dropdown item
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Display the divider of the dropdown item
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly divided!: boolean
  /**
   * An icon of the dropdown item
   */
  @Prop({ type: String }) readonly icon!: string

  get computedIcon (): string {
    // TODO: add checks for invalid icons
    return `s-icon-${this.icon}`
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-dropdown-menu__item:not(.is-disabled) {
  &:hover, &:focus {
    background-color: $s-color-neutral-placeholder;
    color: $s-color-basic-black;
  }
}
</style>
