<template>
  <s-input
    v-float
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

const getNumberParts = (a: string | number): Array<number> => {
  const [int, dec] = String(a).split('.')

  return [int, dec].map(p => isNumberLikeValue(p) ? +p : 0)
}

const isGreater = (a: string | number, b: string | number): boolean => {
  const [aInt, aDec] = getNumberParts(a)
  const [bInt, bDec] = getNumberParts(b)

  return aInt > bInt || (aInt === bInt && aDec > bDec)
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
  @Prop({ type: String, default: '0.0' }) readonly placeholder!: string
  @Prop({ type: Number, default: undefined, validator: decimalsValidator }) readonly decimals!: number
  @Prop({ type: [String, Number], default: undefined, validator: isNumberLikeValue }) readonly max!: string | number

  handleInput (value: string): void {
    const newValue = [
      (v) => this.checkValueLeadingPoint(v),
      (v) => this.checkValueDecimals(v, this.decimals),
      (v) => isNumberLikeValue(v) ? v : DEFAULT_VALUE,
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
    if (value.indexOf('0') === 0 && value.indexOf('.') !== 1) {
      value = value.replace(/^0+/, '')
    }
    // Trim dot in the end
    if (value.indexOf('.') === value.length - 1) {
      value = value.slice(0, -1)
    }

    return value
  }

  private valueMaxLength (value: string, decimals: number) {
    if (value.length === 0 || decimals === undefined) return undefined

    const fpIndex = value.indexOf('.')

    return fpIndex !== -1 ? fpIndex + 1 + decimals : undefined
  }

  private checkValueLeadingPoint (value: string): string {
    if (!['string', 'number'].includes(typeof value)) return value

    const formatted = String(value).replace(/[^\d.]/g, '')

    if (formatted.indexOf('.') === 0) {
      return '0' + formatted
    }

    return formatted
  }

  private checkValueDecimals (value: string, decimals: number) {
    const lengthLimit = this.valueMaxLength(value, decimals)

    if (lengthLimit && value.length > lengthLimit) {
      return value.slice(0, lengthLimit)
    }

    return value
  }

  private checkValueForExtremum (value: string): string {
    if (!value) return value
    if (isNumberLikeValue(this.max) && isGreater(value, this.max)) return String(this.max)

    return value
  }
}
</script>
