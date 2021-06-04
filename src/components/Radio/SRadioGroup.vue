<template>
  <el-radio-group
    v-model="groupModel"
    :size="computedSize"
    :disabled="disabled"
  >
    <slot></slot>
  </el-radio-group>
</template>

<script lang="ts">
import { Component, Mixins, Prop, ModelSync } from 'vue-property-decorator'

import SizeMixin from '../../mixins/SizeMixin'

@Component
export default class SRadio extends Mixins(SizeMixin) {
  /**
   * Whether the nesting radios are disabled.
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Binding value of the radio group. Can be `string` / `number` / `boolean`
   */
  @ModelSync('value', 'input', { type: [String, Number, Boolean] }) readonly groupModel!: string | number | boolean
}
</script>
