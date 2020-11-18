<template>
  <el-radio-group
    v-model="model"
    :size="computedSize"
    :disabled="disabled"
  >
    <slot></slot>
  </el-radio-group>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

import SizeMixin from '../../mixins/SizeMixin'

@Component
export default class SRadio extends Mixins(SizeMixin) {
  /**
   * Binding value of the radio group. Can be `string` / `number` / `boolean`
   */
  @Prop() readonly value!: string | number | boolean
  /**
   * Whether the nesting radios are disabled.
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

  model = this.value

  @Watch('value')
  private handlePropChange (value: string | number | boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string | number | boolean): void {
    this.$emit('input', value)
    this.$emit('change', value)
  }
}
</script>
