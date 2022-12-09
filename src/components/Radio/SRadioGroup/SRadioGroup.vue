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
import { Component, Mixins, Prop } from 'vue-property-decorator'
import ElRadioGroup from 'element-ui/lib/radio-group'

import SizeMixin from '../../../mixins/SizeMixin'

@Component({
  components: { ElRadioGroup }
})
export default class SRadio extends Mixins(SizeMixin) {
  /**
   * Whether the nesting radios are disabled.
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Binding value of the radio group. Can be `string` / `number` / `boolean`
   */
  @Prop({ type: [String, Number, Boolean] }) readonly value!: string | number | boolean

  get groupModel (): string | number | boolean {
    return this.value
  }

  set groupModel (value: string | number | boolean) {
    if (this.value !== value) {
      this.$emit('input', value)
    }
  }
}
</script>
