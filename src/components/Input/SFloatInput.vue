<template>
  <s-input
    v-float
    :placeholder="placeholder"
    :value="value"
    :maxlength="maxlength"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      input: handleInput,
      blur: onBlur
    }"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import SInput from './SInput.vue'
import { Float } from '../../directives'

const DEFAULT_VALUE = ''

const isNumberLikeValue = (value: any): boolean => {
  return Number.isFinite(Number(value))
}

@Component({
  components: {
    SInput
  },
  directives: {
    float: Float
  }
})
export default class SFloatInput extends Vue {
  @Prop({ type: String, default: DEFAULT_VALUE }) readonly value!: string
  @Prop({ default: '0.0', type: String }) readonly placeholder!: string
  @Prop({
    type: Number,
    default: undefined,
    validator: x => x === undefined || x >= 0
  }) readonly decimals!: number

  get maxlength (): any {
    return this.valueMaxLength(this.value, this.decimals)
  }

  handleInput (value: string): void {
    const formatted = this.formatNumberField(value, this.decimals)
    const newValue = isNumberLikeValue(formatted) ? formatted : DEFAULT_VALUE

    this.onInput(newValue)
  }

  onBlur (event: Event): void {
    const preparedValue = +this.value === 0
      ? DEFAULT_VALUE
      : this.trimNeedlessSymbols(this.value)

    if (preparedValue !== this.value) {
      this.onInput(preparedValue)
    }

    this.$emit('blur', event)
  }

  onInput (value: string): void {
    this.$emit('input', value)
  }

  private trimNeedlessSymbols = (value: string): string => {
    // Trim zeros in the beginning
    if (value.indexOf('0') === 0 && value.indexOf('.') !== 1) {
      value = value.replace(/^0+/, '')
    }
    // add leading zero before floating point
    if (value.indexOf('.') === 0) {
      value = '0' + value
    }
    // Trim dot in the end
    if (value.indexOf('.') === value.length - 1) {
      value = value.slice(0, -1)
    }

    return value
  }

  private formatNumberField = (value: string, decimals: number): string => {
    if (!['string', 'number'].includes(typeof value)) return value

    let formatted = String(value)

    if (formatted.indexOf('.') === 0) {
      formatted = '0' + formatted
    }

    const lengthLimit = this.valueMaxLength(formatted, decimals)

    if (lengthLimit && formatted.length > lengthLimit) {
      formatted = formatted.slice(0, lengthLimit)
    }

    return formatted
  }

  private valueMaxLength = (value: string, decimals: number) => {
    if (value.length === 0 || decimals === undefined) return undefined

    const fpIndex = value.indexOf('.')

    return fpIndex !== -1 ? fpIndex + 1 + decimals : undefined
  }
}
</script>
