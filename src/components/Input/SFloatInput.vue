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
  @Prop({ type: String, default: DEFAULT_VALUE }) readonly value!: string
  @Prop({ type: String, default: '0.0' }) readonly placeholder!: string
  @Prop({ type: Boolean, default: false }) readonly isLocaleString?: boolean
  @Prop({ type: Object, default: () => {} }) readonly delimiters?: object
  @Prop({ type: Number, default: undefined, validator: decimalsValidator }) readonly decimals!: number
  @Prop({ type: [String, Number], default: undefined, validator: isNumberLikeValue }) readonly max!: string | number

  get delimitersConfig (): any {
    return this.isLocaleString && this.delimiters ? this.delimiters : { thousand: ',', decimal: '.' }
  }

  handleInput (value: string): void {
    const newValue = [
      (v) => this.formatNumberField(v, this.decimals),
      (v) => isNumberLikeValue(this.formatToNumber(v)) ? v : DEFAULT_VALUE,
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

  private formatToNumber (value: string) {
    if (!this.isLocaleString) return value
    return value.replace(new RegExp('\\' + this.delimitersConfig.thousand, 'g'), '').replace(/,/g, '.')
  }

  private trimNeedlessSymbols (value: string): string {
    // Trim zeros in the beginning
    if (value.indexOf('0') === 0 && value.indexOf(this.delimitersConfig.decimal) !== 1) {
      value = value.replace(/^0+/, '')
    }
    // add leading zero before floating point
    if (value.indexOf(this.delimitersConfig.decimal) === 0) {
      value = '0' + value
    }
    // Trim dot in the end
    if (value.indexOf(this.delimitersConfig.decimal) === value.length - 1) {
      value = value.slice(0, -1)
    }

    return value
  }

  private formatNumberField (value: string, decimals: number): string {
    if (!['string', 'number'].includes(typeof value)) return value

    let formatted = String(value).replace(new RegExp('[^\\d' + this.delimitersConfig.decimal + ']', 'g'), '')
    const decimalDelimiterIndex = formatted.indexOf(this.delimitersConfig.decimal)

    // Add prefix zero if needed
    if (decimalDelimiterIndex === 0) {
      formatted = '0' + formatted
    }

    // Avoid several decimal delimiters
    if ((value.match(new RegExp(this.delimitersConfig.decimal, 'g')) || []).length > 1) {
      formatted = formatted.substring(0, decimalDelimiterIndex + 1) + formatted.substring(decimalDelimiterIndex + 1).replace(this.delimitersConfig.decimal, '')
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
    const splittedValue = formatted.replace(this.delimitersConfig.thousand, '').split(this.delimitersConfig.decimal)

    if (splittedValue[0].length > 3) {
      const reversedValue = splittedValue[0].split('').reverse()
      splittedValue[0] = reversedValue.reduce((prev, current, index) => {
        prev += current
        if (++index % 3 === 0 && index !== reversedValue.length) {
          prev += this.delimitersConfig.thousand
        }
        return prev
      }).split('').reverse().join('')
    }

    return splittedValue.join(this.delimitersConfig.decimal)
  }

  private valueMaxLength (value: string, decimals: number) {
    if (value.length === 0 || decimals === undefined) return undefined

    const fpIndex = value.indexOf(this.delimitersConfig.decimal)

    return fpIndex !== -1 ? fpIndex + 1 + decimals + (value.match(new RegExp('\\' + this.delimitersConfig.thousand, 'g')) || []).length : undefined
  }

  private checkValueForExtremum (value: string): string {
    const cleanValue = this.isLocaleString ? this.formatToNumber(value) : value
    if (!cleanValue) return cleanValue
    if (this.max && (+cleanValue > +this.max)) return this.isLocaleString ? this.formatToLocaleString(String(this.max)) : String(this.max)

    return value
  }
}
</script>
