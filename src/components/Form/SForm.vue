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
    @validate="handleValidate"
    @focusout.native="updateIfFormValidated"
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
  /**
   * Data of a form
   */
  @Prop({ type: Object }) readonly model!: object
  /**
   * Validation rules of the form.
   *
   * For instance, `{ name: [{ required: true, message: 'Please input user name' }] }`
   */
  @Prop({ type: Object }) readonly rules!: object
  /**
   * Inline form state
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly inline!: boolean
  /**
   * Width of a label. It can be any value of css width property
   */
  @Prop({ type: String }) readonly labelWidth!: string
  /**
   * Position of the label. Possible values: `"left"`, `"right"`, `"top"`.
   * `label-width` is required when you use this property.
   *
   * By default it's set to `"right"`
   */
  @Prop({ type: String, default: LabelPosition.RIGHT }) readonly labelPosition!: string
  /**
   * Show error message state of the form.
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly showMessage!: boolean
  /**
   * Display the error message inline with the form item.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly inlineMessage!: boolean
  /**
   * Display an icon indicating the validation result.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly statusIcon!: boolean
  /**
   * Trigger validation when the `rules` property is changed.
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly validateOnRuleChange!: boolean
  /**
   * Size of form items. Possible values: `"big"`, `"medium"`, `"small"`
   */
  @Prop({ type: String }) readonly size!: string
  /**
   * Disabled form state. You can disable all form's elements using this property.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly disabled!: boolean

  @Ref('form') form!: ElForm

  isDirty = false

  handleValidate (propNameIfSuccessOrError: string): void {
    this.$emit('validate', propNameIfSuccessOrError)
  }

  // TODO: think about event when we can change dirty state
  updateIfFormValidated (): void {
    const fields = (this.$refs.form as any).fields
    if (fields.find((f) => f.validateState === 'validating')) {
      setTimeout(() => { this.updateIfFormValidated() }, 100)
    } else {
      this.isDirty = !fields.reduce((acc, f) => {
        const valid = (f.isRequired && f.validateState === 'success')
        const notErroring = (!f.isRequired && f.validateState !== 'error')
        return acc && (valid || notErroring)
      }, true)
    }
  }

  public get dirty (): boolean {
    return this.isDirty
  }

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
