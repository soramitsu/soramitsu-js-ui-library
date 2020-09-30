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

<style lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/common.scss";

.el-radio {
  &.s-big {
    @extend .s-big;
    line-height: $s-size-big;
    &.is-bordered {
      padding-top: 18px;
    }
    > .el-radio__input .el-radio__inner {
      width: 20px;
      height: 20px;
      border-width: 2px;
      &::after {
        width: 10px;
        height: 10px;
      }
    }
  }
  &.s-medium {
    @extend .s-medium;
    line-height: $s-size-medium;
    > .el-radio__input .el-radio__inner {
      width: 16px;
      height: 16px;
      border-width: 2px;
      &::after {
        width: 8px;
        height: 8px;
      }
    }
  }
  &.s-small {
    @extend .s-small;
    line-height: $s-size-small;
    &.is-bordered {
      padding-top: 9px;
    }
    > .el-radio__label {
      font-size: 12px;
    }
    > .el-radio__input .el-radio__inner {
      width: 14px;
      height: 14px;
      border-width: 2px;
      &::after {
        width: 6px;
        height: 6px;
      }
    }
  }
  &.is-bordered {
    line-height: 0;
    &.is-disabled {
      border-color: $s-color-neutral-border;
    }
  }
  > .el-radio__input {
    .el-radio__inner {
      background-color: $s-color-basic-white;
      &::after {
        background-color: $s-color-main-brand;
      }
    }
    &.is-checked .el-radio__inner {
      background-color: $s-color-basic-white;
    }
    &.is-disabled {
      .el-radio__inner {
        background-color: $s-color-neutral-placeholder;
        border-color: $s-color-neutral-border;
      }
      &.is-checked .el-radio__inner {
        background-color: $s-color-neutral-placeholder;
        border-color: $s-color-neutral-border;
        &::after {
          background-color: $s-color-neutral-inactive;
        }
      }
      & + span.el-radio__label {
        color: $s-color-neutral-inactive;
      }
    }
  }
}
</style>
