<template>
  <div :class="computedClasses">
    <span v-if="willPlaceholderBeShown" class="s-placeholder">{{ placeholder }}</span>
    <el-date-picker
      ref="picker"
      v-model="model"
      :type="type"
      :unlink-panels="unlinkPanels"
      :readonly="readonly"
      :disabled="disabled"
      :size="size"
      :editable="editable"
      :clearable="willHaveClearButton"
      :placeholder="placeholder"
      :start-placeholder="startPlaceholder"
      :end-placeholder="endPlaceholder"
      :format="format"
      :align="align"
      :popper-class="computedPopperClass"
      :picker-options="pickerOptions"
      :range-separator="rangeSeparator"
      :default-value="defaultValue"
      :default-time="defaultTime"
      :value-format="valueFormat"
      prefix-icon="-"
      :clear-icon="clearIcon"
      :validate-event="validateEvent"
      @blur="handleBlur"
      @focus="handleFocus"
      @change="handleChange"
    >
      <slot name="range-separator" slot="range-separator"></slot>
    </el-date-picker>
    <s-icon v-if="!isInputType" name="chevron-down-rounded-16" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch, Ref, Inject } from 'vue-property-decorator'
import ElDatePicker from 'element-ui/lib/date-picker'
import { ElForm } from 'element-ui/types/form'
import { ElFormItem } from 'element-ui/types/form-item'

// TODO: ask do we need size prop for the component?
// Prev comment => TODO: ask design team
import { SIcon } from '../../Icon/SIcon'
import SizeMixin from '../../../mixins/SizeMixin'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import { PickerTypes, PickerAlignment, InputTypes } from '../consts'

@Component({
  components: { ElDatePicker, SIcon }
})
export default class SDatePicker extends Mixins(SizeMixin, BorderRadiusMixin) {
  /**
   * Value of date picker component. Can be used with `v-model`.
   * Can be date object / array with date objects for date range picker
   */
  @Prop() readonly value!: any
  /**
   * Type of the date picker component. Available values:
   *
   * `"year"`/`"month"`/`"date"`/`"dates"`/`"datetime"`/`"week"`/`"datetimerange"`/`"daterange"`/`"monthrange"`
   */
  @Prop({ type: String, default: PickerTypes.DATE }) readonly type!: string
  /**
   * Input type of the datepicker component. Available values: `"input"`, `"select"`.
   * `"input"` can be set only when `type` is not range. Otherwise, `"select"` will be set automatically.
   *
   * `"input"` is set by default
   */
  @Prop({ type: String, default: InputTypes.INPUT }) readonly inputType!: string
  /**
   * When in range mode, the left and right panels are linked by default.
   * Set `unlink-panels=true` if you want the two panels to switch current months independently.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly unlinkPanels!: boolean
  /**
   * Readonly state of the date picker component
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly readonly!: boolean
  /**
   * Disabled state of the date picker component
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean
  /**
   * Editable state of the date picker input
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly editable!: boolean
  /**
   * Clearable state of the date picker input. It will be set **only** when `inputType="input"`.
   * TODO: ask design team about it
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly clearable!: boolean
  /**
   * Placeholder in non-range mode
   */
  @Prop({ type: String, default: '' }) readonly placeholder!: string
  /**
   * Placeholder for the start date in range mode
   */
  @Prop({ type: String, default: '' }) readonly startPlaceholder!: string
  /**
   * Placeholder for the end date in range mode
   */
  @Prop({ type: String, default: '' }) readonly endPlaceholder!: string
  /**
   * Format for dates of the displayed value in the input box.
   *
   * See: https://element.eleme.io/#/en-US/component/date-picker#date-formats
   */
  @Prop({ type: String }) readonly format!: string
  /**
   * Alignment. Available values: `"left"`/`"center"`/`"right"`
   *
   * `"left"` is set by default
   */
  @Prop({ type: String, default: PickerAlignment.LEFT }) readonly align!: string
  /**
   * Custom class name for date picker's dropdown
   */
  @Prop({ type: String }) readonly popperClass!: string
  /**
   * Additional set of presets for range date picker component.
   *
   * See: https://element.eleme.io/#/en-US/component/date-picker#picker-options
   */
  @Prop({ type: Object }) readonly pickerOptions!: object
  /**
   * Range separator.
   *
   * `"-"` by default
   */
  @Prop({ type: String, default: '-' }) readonly rangeSeparator!: string
  /**
   * Default date of the calendar
   */
  @Prop() readonly defaultValue!: any
  /**
   * The time value to use when selecting date range
   */
  @Prop({ type: Array }) readonly defaultTime!: Array<string>
  /**
   * Format of binding value. If not specified, the binding value will be a `Date` object.
   *
   * See https://element.eleme.io/#/en-US/component/date-picker#date-formats
   */
  @Prop({ type: String }) readonly valueFormat!: string
  /**
   * Name of the native input
   */
  @Prop({ type: String }) readonly name!: string
  /**
   * Custom prefix icon class
   * TODO: ask design team about it
   */
  // @Prop({ type: String, default: '-' }) readonly prefixIcon!: string
  /**
   * Clear button icon class.
   *
   * `"el-icon-circle-close"` is set by default
   */
  @Prop({ type: String, default: 'el-icon-circle-close' }) readonly clearIcon!: string
  /**
   * Will be validation event triggered from form.
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly validateEvent!: boolean

  get model (): any {
    return this.value
  }

  set model (value: any) {
    if (this.value !== value) {
      this.$emit('input', value)
    }
  }

  @Watch('value')
  private handlePropChange (value: any): void {
    this.focused = false
  }

  @Ref('picker') picker!: any

  @Inject({ default: '', from: 'elForm' }) elForm!: ElForm
  @Inject({ default: '', from: 'elFormItem' }) elFormItem!: ElFormItem

  focused = false

  get isRange (): boolean {
    return ([PickerTypes.DATETIMERANGE, PickerTypes.DATERANGE, PickerTypes.MONTHRANGE] as Array<string>).includes(this.type)
  }

  get isInputType (): boolean {
    return !this.isRange && this.inputType === InputTypes.INPUT
  }

  get willHaveClearButton (): boolean {
    return this.isInputType && this.clearable
  }

  get willPlaceholderBeShown (): boolean {
    if (!this.isInputType) {
      return false
    }
    return !!(this.model && this.placeholder)
  }

  get computedPopperClass (): string {
    const cssClasses: Array<string> = []
    if (this.popperClass) {
      cssClasses.push(this.popperClass)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses.join(' ')
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = ['s-date-picker']
    if ((this.elForm || this.elFormItem || {}).size) {
      cssClasses.push(`s-${(this.elForm || this.elFormItem).size}`)
    } else if (this.isStandardSize) {
      cssClasses.push(`s-${this.size}`)
    }
    if ((Object.values(InputTypes) as Array<string>).includes(this.inputType)) {
      cssClasses.push(`s-${!this.isInputType ? InputTypes.SELECT : this.inputType}-type`)
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
    if ((!this.isRange && this.model) || (this.isRange && this.model.length !== 0)) {
      cssClasses.push('s-has-value')
    }
    return cssClasses
  }

  handleBlur (component: any): void {
    this.focused = false
    this.$emit('blur', component)
  }

  handleFocus (component: any): void {
    if (this.disabled || this.readonly) {
      return
    }
    this.focused = true
    this.$emit('focus', component)
  }

  handleChange (values: any): void {
    this.focused = false
    this.$emit('change', values)
  }

  public focus (): void {
    this.picker.focus()
  }
}
</script>
