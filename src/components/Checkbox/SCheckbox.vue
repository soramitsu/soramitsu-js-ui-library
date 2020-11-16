<template>
  <el-checkbox
    :class="computedClasses"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :border="border"
    :checked="checked"
    :size="getComponentSize(size)"
    :name="name"
    :indeterminate="indeterminate"
    @change="handleChange"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

import StandardPropsMixin from '../../mixins/StandardPropsMixin'
import { Size, BorderRadius } from '../../types'

@Component
export default class SCheckbox extends Mixins(StandardPropsMixin) {
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
   * Border radius of button. Possible values: `"big"`, `"medium"`, `"small"`, `"mini"`.
   *
   * By default it's set to `"mini"`
   */
  @Prop({ default: BorderRadius.MINI, type: String }) readonly borderRadius!: string
  /**
   * Checked state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly checked!: boolean
  /**
   * Size of the checkbox item. Possible values: `"big"`, `"medium"`, `"small"`.
   *
   * By default it's set to `"medium"`
   */
  @Prop({ default: Size.MEDIUM, type: String }) readonly size!: string
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
    if (this.isStandardSize(this.size)) {
      cssClasses.push(`s-${this.size}`)
    }
    if (this.isStandardBorderRadius(this.borderRadius)) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }

  handleChange (value: number | string | boolean): void {
    this.$emit('change', value)
  }
}
</script>
