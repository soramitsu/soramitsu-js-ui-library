<template>
  <el-form-item
    ref="formItem"
    :prop="prop"
    :label="label"
    :label-width="labelWidth"
    :required="required"
    :rules="computedRules"
    :error="error"
    :show-message="showMessage"
    :inline-message="inlineMessage"
    :size="size"
  >
    <slot slot="label" name="label"></slot>
    <slot></slot>
    <i v-if="willMessageBeShown && errorState" class="s-icon-error"></i>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Inject } from 'vue-property-decorator'
import { ElFormItem } from 'element-ui/types/form-item'
import { ElForm } from 'element-ui/types/form'
import cloneDeep from 'lodash/cloneDeep'
import isArray from 'lodash/isArray'

import { LabelPosition } from './consts'

@Component
export default class SFormItem extends Vue {
  /**
   * A key of `model` - form property.
   * If you use the validation, then this property is required
   */
  @Prop({ type: String, default: '' }) readonly prop!: string
  /**
   * A label of the form item
   */
  @Prop({ type: String }) readonly label!: string
  /**
   * Width of a label. It can be any value of css width property
   */
  @Prop({ type: String }) readonly labelWidth!: string
  /**
   * The validation rule `required`.
   *
   * `false` by default
   */
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  /**
   * Validation rules of the form item.
   * When you set rules object for form component, then you don't need this.
   *
   * For instance, `[{ required: true, message: 'Please input user name' }]`
   */
  @Prop() readonly rules!: object
  /**
   * If `error` is set, the field will validate error and show this message immediately
   */
  @Prop({ type: String }) readonly error!: string
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
   * Size of form items. Possible values: `"big"`, `"medium"`, `"small"`
   */
  @Prop({ type: String }) readonly size!: string // TODO: think about size for all items, not only for button

  @Ref('formItem') formItem!: ElFormItem

  @Inject({ default: '', from: 'elForm' }) elForm!: ElForm

  errorState = false

  mounted (): void {
    this.$nextTick(() => {
      this.$watch('$refs.formItem.validateState', (state) => {
        this.errorState = state === 'error'
      }, { deep: true })
    })
  }

  get willMessageBeShown (): boolean {
    return this.showMessage && (this.elForm || {}).showMessage
  }

  get computedRules (): object {
    const rules = (this.rules || (this.elForm.rules || {})[this.prop]) as any
    if (!rules) {
      return rules
    }
    if (!isArray(rules) && !rules.trigger) {
      rules.trigger = 'blur'
      return rules
    }
    return rules.map(rule => {
      rule.trigger = rule.trigger || 'blur'
      return rule
    })
  }

  get isError (): boolean {
    if (!this.formItem) return false
    return !!this.formItem.error
  }

  public resetField (): void {
    this.formItem.resetField()
  }

  public clearValidate (): void {
    this.formItem.clearValidate()
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-form-item {
  margin-bottom: 26px;
  &__content {
    line-height: 20px;
    > button {
      width: 100%;
    }
  }
  &.is-error {
    margin-bottom: 6px;
    > .el-form-item__content {
      > .el-form-item__error {
        position: relative;
        padding-top: 8px;
        padding-left: 30px;
        color: $s-color-basic-black;
        &::before {
          content: '';
        }
      }
      > [class^="s-input"]:not(.disabled) {
        .placeholder {
          color: $s-color-error;
          background-color: $s-color-main-base;
        }
        input, textarea {
          background-color: $s-color-main-base;
          &::placeholder {
            color: $s-color-error;
          }
        }
        &:hover {
          .placeholder,
          .el-input > input,
          .el-textarea > textarea {
            background-color: $s-color-main-hover-light;
          }
          .el-input > input,
          .el-textarea > textarea {
            border-color: $s-color-error;
          }
        }
        &.focused {
          .placeholder,
          .el-input > input,
          .el-textarea > textarea {
            background-color: $s-color-basic-white;
          }
          .el-input > input,
          .el-textarea > textarea {
            border-color: $s-color-error;
          }
        }
      }
    }
    .s-icon-error {
      position: absolute;
      bottom: 0;
      left: 4px;
      font-size: 16px;
      color: $s-color-error;
    }
  }
}
</style>
