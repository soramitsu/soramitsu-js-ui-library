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
    <i v-if="!isInputType" class="s-icon-chevron-bottom"></i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'

import { PickerTypes, PickerSize, PickerAlignment, InputTypes, BorderRadius } from './consts'

@Component
export default class SDatePicker extends Vue {
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
   * Size of the date picker input
   * TODO: ask design team
   * `"medium"` by default
   */
  // @Prop({ type: String, default: PickerSize.MEDIUM }) readonly size!: string
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
   * Border radius of button. Possible values: `"big"`, `"medium"`, `"small"`, `"mini"`.
   *
   * By default it's set to `"small"`
   */
  @Prop({ default: BorderRadius.SMALL, type: String }) readonly borderRadius!: string
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

  @Ref('picker') picker!: any

  model = this.value
  focused = false

  @Watch('value')
  private handlePropChange (value: any): void {
    this.model = value
    this.focused = false
  }

  @Watch('model')
  private handleValueChange (value: any): void {
    this.$emit('input', value)
    this.$emit('change', value)
  }

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

  get computedBorderRadius (): string {
    if (this.borderRadius === BorderRadius.SMALL ||
      !(Object.values(BorderRadius) as Array<string>).includes(this.borderRadius)) {
      return ''
    }
    return this.borderRadius
  }

  get computedPopperClass (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.popperClass) {
      cssClasses.push(this.popperClass)
    }
    if ((Object.values(BorderRadius) as Array<string>).includes(this.borderRadius)) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = ['s-date-picker']
    if ((Object.values(InputTypes) as Array<string>).includes(this.inputType)) {
      cssClasses.push(`s-${!this.isInputType ? InputTypes.SELECT : this.inputType}-type`)
    }
    if ((Object.values(BorderRadius) as Array<string>).includes(this.borderRadius)) {
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
  }

  public focus (): void {
    this.picker.focus()
  }
}
</script>
