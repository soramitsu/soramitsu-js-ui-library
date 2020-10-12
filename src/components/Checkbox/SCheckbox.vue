<template>
  <el-checkbox
    :class="computedClasses"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :border="border"
    :checked="checked"
    :size="computedSize"
    :name="name"
    :indeterminate="indeterminate"
    @change="handleChange"
  >
    <slot></slot>
  </el-checkbox>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import { CheckboxSize } from './consts'

@Component
export default class SCheckbox extends Vue {
  /**
   * Value of the checkbox item. Can be `string / number / boolean`
   */
  @Prop() readonly value!: string | number | boolean
  /**
   * Label of the checkbox item
   */
  @Prop() readonly label !: string | number | boolean
  /**
   * Disable state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * It is set borders for checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly border!: boolean
  /**
   * Checked state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly checked!: boolean
  /**
   * Size of the checkbox item. Possible values: `"big"`, `"medium"`, `"small"`.
   *
   * By default it's set to `"medium"`
   */
  @Prop({ default: CheckboxSize.MEDIUM, type: String }) readonly size!: string
  /**
   * Native name property of the checkbox item
   */
  @Prop({ default: '', type: String }) readonly name!: string
  /**
   * Native undefined state of the checkbox item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly indeterminate!: boolean

  model = this.value

  @Watch('value')
  private handlePropChange (value: string | number | boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string | number | boolean): void {
    this.$emit('input', value)
  }

  get computedSize (): string {
    if (this.size === CheckboxSize.BIG ||
      !(Object.values(CheckboxSize) as Array<string>).includes(this.size)) {
      return ''
    }
    return this.size
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if ((Object.values(CheckboxSize) as Array<string>).includes(this.size)) {
      cssClasses.push(`s-${this.size}`)
    }
    return cssClasses
  }

  handleChange (value: number | string | boolean): void {
    this.$emit('change', value)
  }
}
</script>
