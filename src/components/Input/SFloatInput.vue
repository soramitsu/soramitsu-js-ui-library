<template>
  <s-input
    :placeholder="placeholder"
    :value="value"
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

const decimalsValidator = x => x === undefined || x >= 0

@Component({
  components: {
    SInput
  },
  directives: {
    float: Float
  }
})
export default class SFloatInput extends Vue {
  locale = ''
  delimiters = {
    thousand: ',',
    decimal: '.'
  }

  @Prop({ type: String, default: DEFAULT_VALUE }) readonly value!: string
  @Prop({ type: String, default: '0.0' }) readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly isLocaleString!: boolean
  @Prop({ type: Number, default: undefined, validator: decimalsValidator }) readonly decimals!: number
  @Prop({ type: [String, Number], default: undefined, validator: isNumberLikeValue }) readonly max!: string | number

  created () {
    // Set delimiters' symbols
    this.locale = navigator.language
    const decimalDelimiter = Number(1.1).toLocaleString(this.locale).substring(1, 2)
    if (decimalDelimiter !== this.delimiters.decimal) {
      this.delimiters.decimal = decimalDelimiter
      this.delimiters.thousand = decimalDelimiter === '.' ? ',' : '.'
    }
  }

  handleInput (value: string): void {
    const newValue = [
      (v) => this.formatNumberField(v, this.decimals),
      (v) => isNumberLikeValue(this.isLocaleString ? v.replace(new RegExp(this.delimiters.thousand, 'g'), '') : v) ? v : DEFAULT_VALUE,
      (v) => this.checkValueForExtremum(v)
    ].reduce((buffer, rule) => rule(buffer), value)

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

  private trimNeedlessSymbols (value: string): string {
    // Trim zeros in the beginning
    if (value.indexOf('0') === 0 && value.indexOf(this.delimiters.decimal) !== 1) {
      value = value.replace(/^0+/, '')
    }
    // add leading zero before floating point
    if (value.indexOf(this.delimiters.decimal) === 0) {
      value = '0' + value
    }
    // Trim dot in the end
    if (value.indexOf(this.delimiters.decimal) === value.length - 1) {
      value = value.slice(0, -1)
    }

    return value
  }

  private formatNumberField (value: string, decimals: number): string {
    if (!['string', 'number'].includes(typeof value)) return value

    let formatted = String(value).replace(new RegExp('[^\\d' + this.delimiters.decimal + ']', 'g'), '')
    const decimalDelimiterIndex = formatted.indexOf(this.delimiters.decimal)
    // Add prefix zero if needed
    if (decimalDelimiterIndex === 0) {
      formatted = '0' + formatted
    }
    // Avoid several decimal delimiters
    if ((value.match(new RegExp(this.delimiters.decimal, 'g')) || []).length > 1) {
      formatted = formatted.substring(0, decimalDelimiterIndex + 1) + formatted.substring(decimalDelimiterIndex + 1).replace(this.delimiters.decimal, '')
    }
    if (this.isLocaleString) {
      formatted = this.formatToLocaleString(formatted)
    }

    const lengthLimit = this.valueMaxLength(formatted, decimals)
    if (lengthLimit && formatted.length > lengthLimit) {
      formatted = formatted.slice(0, lengthLimit)
    }

    return formatted
  }

  private formatToLocaleString (formatted: string): string {
    const splittedValue = formatted.replace(this.delimiters.thousand, '').split(this.delimiters.decimal)

    if (splittedValue[0].length > 3) {
      const reversedValue = splittedValue[0].split('').reverse()
      splittedValue[0] = reversedValue.reduce((prev, current, index) => {
        prev += current
        if (++index % 3 === 0 && index !== reversedValue.length) {
          prev += this.delimiters.thousand
        }
        return prev
      }).split('').reverse().join('')
    }

    return splittedValue.join(this.delimiters.decimal)
  }

  private valueMaxLength (value: string, decimals: number) {
    if (value.length === 0 || decimals === undefined) return undefined

    const fpIndex = value.indexOf(this.delimiters.decimal)

    return fpIndex !== -1 ? fpIndex + 1 + decimals + (value.match(new RegExp(this.delimiters.thousand, 'g')) || []).length : undefined
  }

  private checkValueForExtremum (value: string): string {
    const cleanValue = this.isLocaleString ? value.replace(new RegExp(this.delimiters.thousand, 'g'), '') : value
    if (!cleanValue) return cleanValue
    if (this.max && (+cleanValue > +this.max)) return this.isLocaleString ? this.formatToLocaleString(String(this.max)) : String(this.max)

    return value
  }
}
</script>
