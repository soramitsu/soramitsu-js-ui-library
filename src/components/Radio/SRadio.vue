<template>
  <component :is="radioComponent"
    v-model="model"
    :class="computedClasses"
    :label="label"
    :disabled="disabled"
    :border="border"
    :name="name"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Mixins, Prop, ModelSync } from 'vue-property-decorator'

import SizeMixin from '../../mixins/SizeMixin'

@Component
export default class SRadio extends Mixins(SizeMixin) {
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
  /**
   * Binding value of the radio component. Can be `string` / `number` / `boolean`
   */
  @ModelSync('value', 'input', { type: [String, Number, Boolean] }) readonly model!: string | number | boolean

  get radioComponent () {
    return this.isRadioButton ? 'el-radio-button' : 'el-radio'
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
