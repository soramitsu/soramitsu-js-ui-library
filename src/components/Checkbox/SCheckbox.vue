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
      cssClasses.push(this.size)
    }
    return cssClasses
  }

  handleChange (value: number | string | boolean): void {
    this.$emit('change', value)
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/common.scss";

.el-checkbox {
  &.big {
    @extend .big;
    padding: 17px 0 9px 0;
    &.is-bordered {
      padding: 17px 20px 9px 15px;
    }
  }
  &.medium {
    @extend .medium;
    &, &.is-bordered {
      padding: 9px 15px 7px 10px;
      .el-checkbox__inner {
        height: 16px;
        width: 16px;
        &::after {
          top: 0;
          left: 4px;
          height: 8px;
          width: 4px;
        }
      }
    }
    & {
      padding: 9px 0 7px 0;
    }
  }
  &.small {
    @extend .small;
    border-radius: 4px;
    .el-checkbox__label {
      font-size: 12px;
    }
    &, &.is-bordered {
      padding: 5px 15px 5px 10px;
      .el-checkbox__inner {
        height: 14px;
        width: 14px;
        &::after {
          top: 1px;
          left: 4px;
          height: 6px;
          width: 2px;
        }
      }
    }
    & {
      padding: 5px 0;
    }
  }
}
.el-checkbox__inner {
  border-color: $color-neutral-inactive;
  border-radius: 4px;
  width: 20px;
  height: 20px;
  &::after {
    border-width: 2px;
    height: 10px;
    left: 6px;
    width: 5px;
  }
}
.el-checkbox__input {
  &.is-disabled {
    .el-checkbox__inner {
      background-color: $color-neutral-placeholder;
    }
    & + span.el-checkbox__label {
      color: $color-neutral-inactive;
    }
  }
  &.is-checked {
    &.is-disabled > .el-checkbox__inner {
      background-color: $color-neutral-placeholder;
      &::after {
        border-color: $color-neutral-inactive;
      }
    }
    & + .el-checkbox__label {
      color: $color-basic-black;
    }
  }
}
</style>
