<template>
  <el-radio-button v-if="isRadioButton"
    :class="computedClasses"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :border="border"
    :name="name"
  >
    <slot></slot>
  </el-radio-button>
  <el-radio v-else
    :class="computedClasses"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :border="border"
    :name="name"
  >
    <slot></slot>
  </el-radio>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator'

import SizeMixin from '../../mixins/SizeMixin'

@Component
export default class SRadio extends Mixins(SizeMixin) {
  /**
   * Binding value of the radio component. Can be `string` / `number` / `boolean`
   */
  @Prop() readonly value!: string | number | boolean
  /**
   * Value of the radio component. Can be `string` / `number` / `boolean`
   */
  @Prop() readonly label!: string | number | boolean
  /**
   * Change redio element to radio button
   */
  @Prop({ default: false, type: Boolean }) readonly isRadioButton!: boolean
  /**
   * Disabled state of the radio component.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Will borders be shown.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly border!: boolean
  /**
   * Native name property
   */
  @Prop({ default: '', type: String }) readonly name!: string

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

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.isStandardSize) {
      cssClasses.push(`s-${this.size}`)
    }
    return cssClasses
  }
}
</script>
