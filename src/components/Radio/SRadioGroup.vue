<template>
  <el-radio-group
    v-model="model"
    :size="size"
    :disabled="disabled"
  >
    <slot></slot>
  </el-radio-group>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SRadio extends Vue {
  /**
   * Binding value of the radio group. Can be `string` / `number` / `boolean`
   */
  @Prop() readonly value!: string | number | boolean
  /**
   * Size of the radio item. Possible values: `"medium"`, `"small"`, `"mini"`.
   *
   * By default it's set to `"medium"`
   */
  @Prop({ default: 'medium', type: String }) readonly size!: 'medium' | 'small' | 'mini'
  /**
   * Whether the nesting radios are disabled.
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

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
}
</script>
