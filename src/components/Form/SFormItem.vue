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
    <slot slot="error" name="error">
      <i v-if="isError" class="s-icon-error"></i>
    </slot>
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
  @Prop({ default: '' }) readonly prop!: string
  @Prop() readonly label!: string
  @Prop() readonly labelWidth!: string
  @Prop({ default: false }) readonly required!: boolean
  @Prop() readonly rules!: object
  @Prop() readonly error!: string
  @Prop({ default: true }) readonly showMessage!: boolean
  @Prop({ default: false }) readonly inlineMessage!: boolean
  @Prop() readonly size!: string

  @Ref('formItem') formItem!: ElFormItem

  @Inject('elForm') elForm!: ElForm

  get computedRules (): object {
    const rules = (this.rules || this.elForm.rules[this.prop]) as any
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
@import "../../styles/icons.scss";

.el-form-item {
  margin-bottom: 26px;
  &__content {
    line-height: 20px;
    > button {
      width: 100%;
    }
  }
}
.is-error {
  > .el-form-item__content {
    > .el-form-item__error {
      padding-top: 8px;
      color: $color-basic-black;
      &::before {
        @extend .s-icon-error;
        content: '000';
        background-repeat: no-repeat;
        color: transparent;
        position: relative;
      }
    }
    > [class^="s-input"] /* here will be also s-input-json */ {
      .placeholder {
        color: $color-error;
        background-color: $color-main-base;
      }
      input, textarea {
        background-color: $color-main-base;
        &::placeholder {
          color: $color-error;
        }
      }
      &:hover {
        .placeholder,
        .el-input > input,
        .el-textarea > textarea {
          background-color: $color-main-hover-light;
        }
        .el-input > input,
        .el-textarea > textarea {
          border-color: $color-error;
        }
      }
      &.focused {
        .placeholder,
        .el-input > input,
        .el-textarea > textarea {
          background-color: $color-basic-white;
        }
        .el-input > input,
        .el-textarea > textarea {
          border-color: $color-error;
        }
      }
    }
  }
}
</style>
