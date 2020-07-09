<template>
  <el-form
    ref="form"
    :model="model"
    :rules="rules"
    :inline="inline"
    :label-width="labelWidth"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :status-icon="statusIcon"
    :validate-on-rule-change="validateOnRuleChange"
    :disabled="disabled"
    :size="size"
    :label-position="labelPosition"
  >
    <slot></slot>
  </el-form>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'

import { LabelPosition } from './consts'

@Component
export default class SForm extends Vue {
  @Prop() readonly model!: object
  @Prop() readonly rules!: object
  @Prop({ default: false }) readonly inline!: boolean
  @Prop() readonly labelWidth!: string
  @Prop({ default: LabelPosition.RIGHT }) readonly labelPosition!: string
  @Prop({ default: true }) readonly showMessage!: boolean
  @Prop({ default: false }) readonly inlineMessage!: boolean
  @Prop({ default: false }) readonly statusIcon!: boolean
  @Prop({ default: true }) readonly validateOnRuleChange!: boolean
  @Prop() readonly size!: string
  @Prop({ default: false }) readonly disabled!: boolean

  @Ref('form') form!: ElForm

  public validate (): Promise<boolean> {
    return this.form.validate()
  }

  public validateField (...props: Array<string>): void {
    this.form.validateField(props)
  }

  public resetFields (): void {
    this.form.resetFields()
  }

  public clearValidate (...props: Array<string>): void {
    this.form.clearValidate(props)
  }
}
</script>
