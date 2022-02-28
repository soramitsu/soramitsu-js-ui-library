<script lang="ts">
export default defineComponent({
  name: 'SDatePicker',
})
</script>

<script setup lang="ts">
import { PickerTypes, PickerAlignment, InputTypes, BorderRadius, Size } from './consts'

interface Props {
  /**
    * Value of date picker component. Can be used with `v-model`.
   * Can be date object / array with date objects for date range picker
   */
  modelValue: string

  /**
      * Type of the date picker component. Available values:
   *
   * `"year"`/`"month"`/`"date"`/`"dates"`/`"datetime"`/`"week"`/`"datetimerange"`/`"daterange"`/`"monthrange"`
   */
  readonly type: string

  /**
    * Input type of the datepicker component. Available values: `"input"`, `"select"`.
   * `"input"` can be set only when `type` is not range. Otherwise, `"select"` will be set automatically.
   *
   * `"input"` is set by default
   */
  readonly inputType: string

  /**
    * When in range mode, the left and right panels are linked by default.
   * Set `unlink-panels=true` if you want the two panels to switch current months independently.
   *
   * `false` by default
   */

 readonly unlinkPanels: boolean
  /**
   * Readonly state of the date picker component
   *
   * `false` by default
   */
  readonly readonly: boolean
  /**
   * Disabled state of the date picker component
   *
   * `false` by default
   */
  readonly disabled: boolean
  /**
   * Editable state of the date picker input
   *
   * `true` by default
   */
  readonly editable: boolean
  /**
   * Clearable state of the date picker input. It will be set **only** when `inputType="input"`.
   * TODO: ask design team about it
   *
   * `true` by default
   */
  readonly clearable: boolean
  /**
   * Placeholder in non-range mode
   */
   readonly placeholder: string
  /**
   * Placeholder for the start date in range mode
   */
   readonly startPlaceholder: string
  /**
   * Placeholder for the end date in range mode
   */
   readonly endPlaceholder: string
  /**
   * Format for dates of the displayed value in the input box.
   *
   * See: https://element.eleme.io/#/en-US/component/date-picker#date-formats
   */
   readonly format: string
  /**
   * Alignment. Available values: `"left"`/`"center"`/`"right"`
   *
   * `"left"` is set by default
   */
   readonly align: string
  /**
   * Custom class name for date picker's dropdown
   */
   readonly popperClass: string
  /**
   * Additional set of presets for range date picker component.
   *
   * See: https://element.eleme.io/#/en-US/component/date-picker#picker-options
   */
  readonly pickerOptions: object
  /**
   * Range separator.
   *
   * `"-"` by default
   */
   readonly rangeSeparator: string
  /**
   * Default date of the calendar
   */
   readonly defaultValue: any
  /**
   * The time value to use when selecting date range
   */
   readonly defaultTime: Array<string>
  /**
   * Format of binding value. If not specified, the binding value will be a `Date` object.
   *
   * See https://element.eleme.io/#/en-US/component/date-picker#date-formats
   */
   readonly valueFormat: string
  /**
   * Name of the native input
   */
   readonly name: string
  /**
   * Custom prefix icon class
   */
  /**
   * Clear button icon class.
   *
   * `"el-icon-circle-close"` is set by default
   */
  readonly clearIcon: string
  /**
   * Will be validation event triggered from form.
   *
   * `true` by default
   */
  readonly validateEvent: boolean

  readonly borderRadius?: string

  readonly size?: string
}

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

const props = withDefaults(defineProps<Props>(), {
  type: PickerTypes.DATE,
  inputType: InputTypes.INPUT,
  unlinkPanels: false,
  readonly: false,
  disabled: false,
  editable: true,
  clearable: true,
  placeholder: '',
  startPlaceholder: '',
  endPlaceholder: '',
  align: PickerAlignment.LEFT,
  rangeSeparator: '-',
  clearIcon: 'el-icon-circle-close',
  validateEvent: true,
  borderRadius: BorderRadius.SMALL,
  size: Size.MEDIUM
})

const focused  = ref(false);

const isRange = computed(() => {
  return ([PickerTypes.DATETIMERANGE, PickerTypes.DATERANGE, PickerTypes.MONTHRANGE] as Array<string>).includes(props.type)  
})

const isInputType = computed(() => {
  return !isRange && props.inputType === InputTypes.INPUT
})

const willHaveClearButton = computed(() => {
  return isInputType && props.clearable
})

const willPlaceholderBeShown = computed(() => {
  if (!isInputType) {
    return false
  }
  return !!(props.modelValue && props.placeholder)
})

const computedPopperClass = computed(() => {
  const cssClasses: Array < string > = []
  // if (props.popperClass) {
  //   cssClasses.push(popperClass)
  // }
  // if (isStandardBorderRadius) {
  //   cssClasses.push(`s-border-radius-${borderRadius}`)
  // }
  return cssClasses.join(' ')
})


const computedClasses = computed(() => {
  const cssClasses: Array<string> = ['s-date-picker']
    // if ((elForm || elFormItem || {}).size) {
    //   cssClasses.push(`s-${(elForm || elFormItem).size}`)
    // } else if (isStandardSize) {
    //   cssClasses.push(`s-${props.size}`)
    // }
    if ((Object.values(InputTypes) as Array<string>).includes(props.inputType)) {
      cssClasses.push(`s-${!isInputType ? InputTypes.SELECT : props.inputType}-type`)
    }
    if (isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${props.borderRadius}`)
    }
    if (focused) {
      cssClasses.push('s-focused')
    }
    if (props.disabled) {
      cssClasses.push('s-disabled')
    }
    if ((!isRange && props.modelValue) || (isRange && props.modelValue.length !== 0)) {
      cssClasses.push('s-has-value')
    }
    return cssClasses  
})

const isStandardSize = computed(() => {
    return (Object.values(Size) as Array<string>).includes(props.size)
  })

const computedSize = computed(() => {
    if (props.size === Size.BIG || !isStandardSize) {
      return ''
    }
    return props.size
  })

const isStandardBorderRadius = computed(() => {
    return (Object.values(BorderRadius) as Array<string>).includes(props.borderRadius)
  })

const handleBlur = (component: any) => {
    focused.value = false
    emit('blur', component)
  }

const handleFocus  = (component: any) => {
    if (props.disabled || props.readonly) {
      return
    }
    focused.value = true
    emit('focus', component)
  }

const handleChange  = (values: any) => {
    focused.value = false
  }

</script>

<template>
  <div :class="computedClasses">
    <span
      v-if="willPlaceholderBeShown"
      class="s-placeholder"
    >{{ placeholder }}</span>
    <el-date-picker
      ref="picker"
      :model-value="modelValue"
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
      @input="(event: any) => $emit('update:modelValue', event.target.value)"
    >
      <slot
        slot="range-separator"
        name="range-separator"
      />
    </el-date-picker>
    <s-icon
      v-if="!isInputType"
      name="chevron-down-rounded-16"
    />
  </div>
</template>

<style lang="scss" scoped>
</style>