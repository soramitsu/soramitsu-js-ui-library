<template>
  <el-submenu
    ref="el-submenu"
    :style="computedStyles"
    :index="index"
    :popper-class="popperClass"
    :show-timeout="showTimeout"
    :hide-timeout="hideTimeout"
    :disabled="disabled"
    :popper-append-to-body="false"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-submenu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject, Ref } from 'vue-property-decorator'
import { ElSubmenu } from 'element-ui/types/submenu'

@Component
export default class SSubmenu extends Vue {
  // popper-append-to-body=false --> https://github.com/ElemeFE/element/issues/17960

  /**
   * Unique index of menu item
   */
  @Prop({ default: '', type: String }) readonly index!: string
  /**
   * Custom class name for the popup menu
   */
  @Prop({ default: '', type: String }) readonly popperClass!: string
  /**
   * Timeout in milliseconds before showing a sub-menu
   */
  @Prop({ default: 300, type: Number }) readonly showTimeout!: number
  /**
   * Timeout in milliseconds before hiding a sub-menu
   */
  @Prop({ default: 300, type: Number }) readonly hideTimeout!: number
  /**
   * Disabled state of submenu.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

  @Inject('sMenu') sMenu

  @Ref('el-submenu') elSubmenu

  get computedStyles (): object {
    const styles = {} as any
    if (this.sMenu.activeHoverColor) {
      styles['--s-menu-color-hover'] = this.sMenu.activeHoverColor
    }
    return styles
  }
}
</script>

<style lang="scss">
.s-menu:not(.el-menu--horizontal) .is-opened .el-submenu__title {
  margin-bottom: 8px;
}
.el-submenu {
  .el-menu-item {
    min-width: 0;
  }
  &.is-opened > .el-menu > :not(:last-child) {
    margin-bottom: 8px;
  }
}
.el-submenu__title {
  display: flex;
  align-items: center;
  border-radius: 6px;
  [class^=s-icon-] {
    margin-right: 12px;
  }
  .is-active > & {
    border-bottom-color: transparent !important;
    background-color: var(--s-menu-color-hover) !important;
  }
  &:not(.is-disabled):hover {
    background-color: var(--s-menu-color-hover) !important;
  }
}
</style>
