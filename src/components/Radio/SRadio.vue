<template>
  <el-radio
    :class="computedClasses"
    v-model="model"
    :label="label"
    :disabled="disabled"
    :border="border"
    :name="name"
  >
    <slot></slot>
  </el-radio>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

import { RadioSize } from './consts'

@Component
export default class SRadio extends Vue {
  /**
   * Binding value of the radio component. Can be `string` / `number` / `boolean`
   */
  @Prop() readonly value!: string | number | boolean
  /**
   * Value of the radio component. Can be `string` / `number` / `boolean`
   */
  @Prop() readonly label!: string | number | boolean
  /**
   * Disabled state of the radio component.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Will borders be shown.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly border!: boolean
  /**
   * Native name property
   */
  @Prop({ default: '', type: String }) readonly name!: boolean
  /**
   * Size of the radio item. Possible values: `"big"`, `"medium"`, `"small"`.
   *
   * By default it's set to `"medium"`
   */
  @Prop({ default: RadioSize.MEDIUM, type: String }) readonly size!: string

  model = this.value

  @Watch('value')
  private handlePropChange (value: string | number | boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: string | number | boolean): void {
    this.$emit('input', value)
    this.$emit('change', value)
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if ((Object.values(RadioSize) as Array<string>).includes(this.size)) {
      cssClasses.push(`s-${this.size}`)
    }
    return cssClasses
  }
}
</script>
