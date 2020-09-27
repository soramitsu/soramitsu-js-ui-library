<template>
  <el-collapse-item
    :title="title"
    :name="name"
    :disabled="disabled"
    :class="computedClasses"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-collapse-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'

@Component
export default class SCollapseItem extends Vue {
  /**
   * Title for the panel of collapse item. Slot `title` can be used as well
   */
  @Prop({ default: '', type: String }) readonly title!: string
  /**
   * Unique identification for the panel of the collapse item. It can be `string/number`
   */
  @Prop() readonly name!: string | number
  /**
   * Disable state of the collapse item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Will bottom padding be hidden.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly withoutPadding!: boolean

  @Inject({ default: '', from: 'sCollapse' }) sCollapse

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (!(this.sCollapse || {}).borders) {
      cssClasses.push('without-border')
    }
    if (this.withoutPadding) {
      cssClasses.push('without-padding')
    }
    return cssClasses
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/icons.scss";

.without-border {
  > div > .el-collapse-item__header,
  > .el-collapse-item__wrap {
    border: none;
  }
}
.without-padding > .el-collapse-item__wrap > .el-collapse-item__content {
  padding-bottom: 0;
}
.el-collapse-item__ {
  &wrap {
    border-bottom-color: #F5F5F5;
  }
  &header {
    color: $s-color-basic-black;
    border-bottom-color: #F5F5F5;
    &.is-active {
      border-bottom-color: transparent;
    }
    .el-icon-arrow-right {
      font-family: 'soramitsu-icons' !important;
      @extend .s-icon-chevron-top;
      font-size: 16px;
      padding: 8px;
      width: 32px;
      height: 32px;
      background-color: $s-color-neutral-placeholder;
      border-radius: 50%;
      &.is-active {
        transform: rotate(180deg);
      }
    }
  }
  &content {
    color: $s-color-basic-black;
  }
}
.el-collapse-item.is-disabled .el-collapse-item__header {
  color: $s-color-neutral-inactive;
}
</style>
