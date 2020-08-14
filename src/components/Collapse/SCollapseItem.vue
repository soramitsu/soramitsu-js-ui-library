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

  @Inject({ default: '', from: 'sCollapse' }) sCollapse

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (!(this.sCollapse || {}).withBorders) {
      cssClasses.push('without-border')
    }
    return cssClasses
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
// @import "../../styles/icons.scss";

.without-border .el-collapse-item__ {
  &wrap, &header {
    border: none;
  }
}
.el-collapse-item__ {
  &wrap {
    border-bottom-color: $color-neutral-hover;
  }
  &header {
    color: $color-basic-black;
    border-bottom-color: $color-neutral-hover;
    &.is-active {
      border-bottom-color: transparent;
    }
    // TODO: fix it. @extend doesn't work in the current implementation
    .el-icon-arrow-right {
      // @extend .s-icon-arrow-top;
      padding: 10px;
      // padding: 8px;
      width: 32px;
      height: 32px;
      background-color: $color-neutral-placeholder;
      border-radius: 50%;
      &::before {
        // content: '';
        color: $color-basic-black; // TODO: remove these lines
        font-weight: bold;
      }
      transform: rotate(90deg); // TODO: remove it
      &.is-active {
        // transform: rotate(180deg);
        transform: rotate(270deg);
      }
    }
  }
  &content {
    color: $color-basic-black;
  }
}
.el-collapse-item.is-disabled .el-collapse-item__header {
  color: $color-neutral-inactive;
}
</style>
