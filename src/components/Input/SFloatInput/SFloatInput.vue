<template>
  <s-input
    ref="input"
    :placeholder="placeholderValue"
    :value="formatted"
    v-bind="$attrs"
    v-on="{
      ...$listeners,
      input: handleInput,
      blur: onBlur,
      dblclick: onDblClick
    }"
  >
    <template v-for="(_, scopedSlotName) in $scopedSlots" v-slot:[scopedSlotName]="slotData">
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </s-input>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'

import SInput from '../SInput'
import { Float } from '../../../directives'

const DEFAULT_VALUE = ''
const DEFAULT_DECIMAL_DELIMITER = '.'
const DEFAULT_DELIMITERS = {
  thousand: ',',
  decimal: DEFAULT_DECIMAL_DELIMITER
}

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
  @Prop({ type: String }) readonly placeholder!: string
  @Prop({ type: Number, default: undefined, validator: decimalsValidator }) readonly decimals!: number
  @Prop({ type: Boolean, default: false }) readonly hasLocaleString?: boolean
  @Prop({ type: Object, default: () => DEFAULT_DELIMITERS }) readonly delimiters?: any
  @Prop({ type: [String, Number], default: undefined, validator: isNumberLikeValue }) readonly max!: string | number

  @Ref('input') inputComponent!: any

  charsCountBeforeSelection = 0

  get placeholderValue (): string {
    return this.placeholder || '0'.concat(this.delimiters.decimal, '0')
  }

  get formatted (): string {
    return this.hasLocaleString ? this.toLocaleString() : this.value
  }

  get input (): HTMLInputElement {
    return this.inputComponent.$refs['el-input'].$refs.input
  }

  saveSelectionPosition (value: string): void {
    const pos = this.input.selectionStart as number
    const chars = value.slice(0, pos).replace(new RegExp('\\' + this.delimiters.thousand, 'g'), '')

    this.charsCountBeforeSelection = chars.length
  }

  updateSelectionPosition (): void {
    const {
      charsCountBeforeSelection: charsCount,
      formatted: value,
      delimiters: { thousand }
    } = this

    let selection = 0

    for (let handledChars = 0; handledChars < charsCount; selection++) {
      if (value.charAt(selection) !== thousand) {
        handledChars++
      }
    }

    this.input.selectionStart = this.input.selectionEnd = selection
  }

  async handleInput (value: string): Promise<void> {
    // save selection position to update it later in new formatted value
    this.saveSelectionPosition(value)

    const newValue = [
      (v) => this.normalizeDelimeters(v),
      (v) => this.formatNumberField(v, this.decimals),
      (v) => isNumberLikeValue(v) ? v : DEFAULT_VALUE,
      (v) => this.checkValueForExtremum(v)
    ].reduce((buffer, rule) => rule(buffer), value)

    this.onInput(newValue)

    await this.$nextTick()
    this.updateSelectionPosition()
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

  onDblClick (event: Event): void {
    const target = event.target as any
    target.select()
  }

  onInput (value: string): void {
    this.$emit('input', value)
  }

  private trimNeedlessSymbols (value: string): string {
    // Trim zeros in the beginning
    if (value.indexOf('0') === 0 && value.indexOf(DEFAULT_DECIMAL_DELIMITER) !== 1) {
      value = value.replace(/^0+/, '')
    }
    // add leading zero before floating point
    if (value.indexOf(DEFAULT_DECIMAL_DELIMITER) === 0) {
      value = '0' + value
    }
    // Trim dot in the end
    if (value.indexOf(DEFAULT_DECIMAL_DELIMITER) === value.length - 1) {
      value = value.slice(0, -1)
    }

    return value
  }

  private normalizeDelimeters (value: string): string {
    const formatted = value.replace(new RegExp('\\' + this.delimiters.thousand, 'g'), '')

    if (this.delimiters.decimal !== DEFAULT_DECIMAL_DELIMITER) {
      return formatted.replace(this.delimiters.decimal, DEFAULT_DECIMAL_DELIMITER)
    }

    return formatted
  }

  private formatNumberField (value: string, decimals: number): string {
    if (!['string', 'number'].includes(typeof value)) return value

    // remove non digits & decimal delimeter symbols
    let formatted = String(value).replace(new RegExp('[^\\d' + DEFAULT_DECIMAL_DELIMITER + ']', 'g'), '')

    // remove non significant leading zeros
    if (/^0+/.test(formatted) && formatted.indexOf(DEFAULT_DECIMAL_DELIMITER) !== -1) {
      formatted = formatted.replace(/^0+(\d)/, '$1')
    }

    // Add prefix zero if needed
    if (formatted.indexOf(DEFAULT_DECIMAL_DELIMITER) === 0) {
      formatted = '0' + formatted
      this.charsCountBeforeSelection++
    }

    // Avoid several decimal delimiters
    if ((value.match(new RegExp(`\\${DEFAULT_DECIMAL_DELIMITER}`, 'g')) || []).length > 1) {
      const decimalDelimiterIndex = formatted.indexOf(DEFAULT_DECIMAL_DELIMITER)
      formatted = formatted.substring(0, decimalDelimiterIndex + 1) + formatted.substring(decimalDelimiterIndex + 1).replace(DEFAULT_DECIMAL_DELIMITER, '')
    }

    const lengthLimit = this.valueMaxLength(formatted, decimals)
    if (lengthLimit && formatted.length > lengthLimit) {
      formatted = formatted.slice(0, lengthLimit)
    }

    return formatted
  }

  private toLocaleString (): string {
    const hasDecimalDelimiter = this.value.indexOf(DEFAULT_DECIMAL_DELIMITER) !== -1
    let [integer, decimal] = this.value.split(DEFAULT_DECIMAL_DELIMITER)

    if (integer.length > 3) {
      const integerReversed = integer.split('').reverse()
      const lastIndex = integerReversed.length - 1
      integer = integerReversed.reduce((prev, current, index) => {
        prev += current
        if (++index % 3 === 0 && index !== integerReversed.length) {
          // Avoid thousands' delimiter for negative numbers
          if (index === lastIndex && integerReversed[lastIndex] === '-') {
            return prev
          }
          prev += this.delimiters.thousand
        }
        return prev
      }).split('').reverse().join('')
    }

    let localeString = integer

    if (hasDecimalDelimiter) {
      localeString += this.delimiters.decimal
    }

    if (decimal) {
      localeString += decimal
    }

    return localeString
  }

  private valueMaxLength (value: string, decimals: number) {
    if (value.length === 0 || decimals === undefined) return undefined

    const fpIndex = value.indexOf(DEFAULT_DECIMAL_DELIMITER)

    return fpIndex !== -1 ? fpIndex + 1 + decimals : undefined
  }

  private checkValueForExtremum (value: string): string {
    if (!value) return value
    if (this.max && (+value > +this.max)) return String(this.max)

    return value
  }
}
</script>
