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
import ElDropdownItem from 'element-ui/lib/dropdown-item'

import { iconClass } from '../../Icon/utils'

@Component({
  components: { ElDropdownItem }
})
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
    return iconClass(this.icon)
  }
}
</script>
