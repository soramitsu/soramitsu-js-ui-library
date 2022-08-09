<template>
  <div class="s-select" :class="computedClasses">
    <span v-if="willPlaceholderBeShown" class="s-placeholder">{{ placeholder }}</span>
    <el-select
      ref="select"
      v-model="model"
      :placeholder="placeholder"
      :disabled="disabled"
      :loading="loading"
      :size="inputType === 'select' ? size : undefined"
      :multiple="multiple"
      :loading-text="loadingText"
      :clearable="clearable"
      :multiple-limit="multipleLimit"
      :no-data-text="noDataText"
      :popper-class="computedPopperClass"
      @blur="handleBlur"
      @focus="handleFocus"
      @visible-change="handleVisibleChange"
      @clear="handleClear"
      :filterable="filterable"
    >
      <slot name="prefix" slot="prefix"></slot>
      <slot name="empty" slot="empty"></slot>
      <slot></slot>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch, Ref, Inject } from 'vue-property-decorator'
import ElSelect from 'element-ui/lib/select'
import { ElForm } from 'element-ui/types/form'
import { ElFormItem } from 'element-ui/types/form-item'

import SizeMixin from '../../../mixins/SizeMixin'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import DesignSystemInject from '../../DesignSystem/DesignSystemInject'
import { Autocomplete } from '../../Input/consts'
import { InputTypes } from '../consts'

@Component({
  components: { ElSelect }
})
export default class SSelect extends Mixins(SizeMixin, BorderRadiusMixin, DesignSystemInject) {
  /**
   * Selected value. Can be used with `v-model`
   */
  @Prop() readonly value!: any
  /**
   * Input type of the select component. Available values: `"input"`, `"select"`.
   *
   * `"input"` is set by default
   */
  @Prop({ type: String, default: InputTypes.INPUT }) readonly inputType!: string
  /**
   * Placeholder of the select component.
   *
   * `"Select"` is set by default
   */
  @Prop({ type: String, default: 'Select' }) readonly placeholder!: string
  /**
   * Multiple text prefix property. For instance, when user selected 3 items then it should be
   * displayed as `"Something (3)"`. If it's not set then `placeholder` is used by default
   */
  @Prop({ type: String, default: '' }) readonly multipleTextPrefix!: string
  /**
   * Loading text of the select component.
   *
   * `"Loading"` is set by default
   */
  @Prop({ type: String, default: 'Loading' }) readonly loadingText!: string
  /**
   * Displayed text when there is no options, you can also use slot `empty`.
   *
   * `"No data"` is set by default
   */
  @Prop({ type: String, default: 'No data' }) readonly noDataText!: string
  /**
   * Custom class name for the page size Select's dropdown
   */
  @Prop({ default: '', type: String }) readonly popperClass!: string
  /**
   * Name attribute for input
   */
  @Prop({ type: String, default: '' }) readonly name!: string
  /**
   * Autocomplete property of native input. `"off"` by default
   */
  @Prop({ default: Autocomplete.OFF, type: String }) readonly autocomplete!: string
  /**
   * Disabled state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Loading state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly loading!: boolean
  /**
   * Multiple state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly multiple!: boolean
  /**
   * Multiple limit for the select component when `multiple` is true.
   * Has no limit when `multiple-limit=0`.
   *
   * `0` by default
   */
  @Prop({ type: Number, default: 0 }) readonly multipleLimit!: number
  /**
   * Clearable state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly clearable!: boolean
  /**
   * Filterable state of the select component.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly filterable!: boolean

  @Ref('select') select!: any

  @Inject({ default: '', from: 'elForm' }) elForm!: ElForm
  @Inject({ default: '', from: 'elFormItem' }) elFormItem!: ElFormItem

  model = this.value
  focused = false

  private updateInputValue (): void {
    if (!this.multiple) {
      return
    }
    const tags = this.select.$el.getElementsByClassName('el-select__tags')[0] as Element
    if (tags) {
      tags.remove()
    }
    const input = this.select.$el.getElementsByClassName('el-input__inner')[0] as HTMLInputElement
    input.value = this.model.length ? `${this.multipleTextPrefix || this.placeholder} (${this.model.length})` : ''
  }

  @Watch('value')
  private handlePropChange (value: any): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: any): void {
    this.$emit('input', value)
    this.$emit('change', value)
    this.updateInputValue()
  }

  mounted (): void {
    this.$nextTick(this.updateInputValue)
  }

  get computedPopperClass (): string {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.popperClass) {
      cssClasses.push(this.popperClass)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses.join(' ')
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.inputType === 'select') {
      if ((this.elForm || this.elFormItem || {}).size) {
        cssClasses.push(`s-${(this.elForm || this.elFormItem).size}`)
      } else if (this.isStandardSize) {
        cssClasses.push(`s-${this.size}`)
      }
    }
    if ((Object.values(InputTypes) as Array<string>).includes(this.inputType)) {
      cssClasses.push(`s-${this.inputType}-type`)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if (this.focused) {
      cssClasses.push('s-focused')
    }
    if (this.disabled) {
      cssClasses.push('s-disabled')
    }
    if ((!this.multiple && this.model) || (this.multiple && this.model.length !== 0)) {
      cssClasses.push('s-has-value')
    }
    return cssClasses
  }

  get willPlaceholderBeShown (): boolean {
    if (this.inputType !== InputTypes.INPUT) {
      return false
    }
    return !!(
      this.model !== null &&
      this.model !== undefined &&
      (!Array.isArray(this.model) || this.model.length !== 0) &&
      this.placeholder
    )
  }

  handleBlur (event: Event): void {
    this.focused = false
    this.$emit('blur', event)
  }

  handleFocus (event: Event): void {
    if (this.disabled) {
      return
    }
    this.focused = true
    this.$emit('focus', event)
  }

  handleVisibleChange (isAppear: boolean): void {
    this.focused = isAppear
    this.$emit('visible-change', isAppear)
  }

  handleClear (): void {
    this.$emit('clear')
  }

  public focus (): void {
    this.select.focus()
  }

  public blur (): void {
    this.select.blur()
  }
}
</script>
