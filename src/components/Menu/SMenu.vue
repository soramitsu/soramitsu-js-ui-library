<template>
  <el-menu
    class="s-menu"
    ref="el-menu"
    :mode="mode"
    :collapse="collapse"
    :background-color="backgroundColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :unique-opened="uniqueOpened"
    :menu-trigger="menuTrigger"
    :router="router"
    :collapse-transition="collapseTransition"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
    <slot></slot>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Provide } from 'vue-property-decorator'
import { ElMenu } from 'element-ui/types/menu'

import { MenuMode, MenuTrigger } from './consts'

@Component
export default class SMenu extends Vue {
  /**
   * Mode of menu. Possible values: `"horizontal"`, `"vertical"`.
   *
   * By default it's set to `"vertical"`
   */
  @Prop({ default: MenuMode.VERTICAL, type: String }) readonly mode!: string
  /**
   * Collapsed state of menu. It's available only in vertical mode.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly collapse!: boolean
  /**
   * Background color of menu in hex format.
   *
   * By default it's set to `"#2D2926"`
   */
  @Prop({ default: '#2D2926', type: String }) readonly backgroundColor!: string
  /**
   * Text color of menu in hex format.
   *
   * By default it's set to `"#FFFFFF"`
   */
  @Prop({ default: '#FFFFFF', type: String }) readonly textColor!: string
  /**
   * Active text color of menu in hex format.
   *
   * By default it's set to `"#FFFFFF"`
   */
  @Prop({ default: '#FFFFFF', type: String }) readonly activeTextColor!: string
  /**
   * Active hover color of menu in hex format.
   *
   * By default it's set to `"#575451"`
   */
  @Prop({ default: '#575451', type: String }) readonly activeHoverColor!: string
  /**
   * Index of currently active menu
   */
  @Prop({ type: String }) readonly defaultActive!: string
  /**
   * Index of currently active menu
   */
  @Prop({ type: Array }) readonly defaultOpeneds!: Array<string>
  /**
   * Whether only one sub-menu can be active
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly uniqueOpened!: boolean
  /**
   * How sub-menus are triggered, only works when `mode` is `"horizontal"`
   *
   * By default it's set to `"hover"`
   */
  @Prop({ default: MenuTrigger.HOVER, type: String }) readonly menuTrigger!: string
  /**
   * Whether `vue-router` mode is activated.
   * If true, index will be used as 'path' to activate the route action
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly router!: boolean
  /**
   * Whether to enable the collapse transition
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly collapseTransition!: boolean

  @Ref('el-menu') elMenu!: ElMenu

  @Provide('sMenu') sMenu = this

  open (index: string): void {
    this.elMenu.open(index)
  }

  close (index: string): void {
    this.elMenu.close(index)
  }

  handleOpen (index: string, path: Array<string>): void {
    this.$emit('open', index, path)
  }

  handleClose (index: string, path: Array<string>): void {
    this.$emit('close', index, path)
  }

  handleSelect (index: string, path: Array<string>): void {
    this.$emit('select', index, path)
  }
}
</script>

<style lang="scss">
.s-menu {
  padding: 20px 12px;
  &:not(.el-menu--horizontal) > :not(:last-child) {
    margin-bottom: 8px;
  }
  &.el-menu--horizontal > :not(:last-child) {
    margin-right: 8px;
  }
}
</style>
