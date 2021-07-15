<template>
  <el-checkbox
    :class="computedClasses"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :border="border"
    :checked="checked"
    :size="computedSize"
    :name="name"
    :indeterminate="indeterminate"
    @change="handleChange"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'
import ElCheckbox from 'element-ui/lib/checkbox'

import SizeMixin from '../../mixins/SizeMixin'
import BorderRadiusMixin from '../../mixins/BorderRadiusMixin'

@Component({
  components: { ElCheckbox }
})
export default class SCheckbox extends Mixins(SizeMixin, BorderRadiusMixin) {
  /**
   * Value of the checkbox item. Can be `string / number / boolean`
   */
  @Prop() readonly value!: string | number | boolean
  /**
   * Label of the checkbox item
   */
  @Prop() readonly label !: string | number | boolean
  /**
   * Disable state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * It is set borders for checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly border!: boolean
  /**
   * Checked state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly checked!: boolean
  /**
   * Native name property of the checkbox item
   */
  @Prop({ default: '', type: String }) readonly name!: string
  /**
   * Native undefined state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly indeterminate!: boolean

  model = this.value

  @Watch('value')
  private handlePropChange (value: string | number | boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string | number | boolean): void {
    this.$emit('input', value)
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.isStandardSize) {
      cssClasses.push(`s-${this.size}`)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }

  handleChange (value: number | string | boolean): void {
    this.$emit('change', value)
  }
}
</script>
