<template>
  <el-menu
    ref="el-menu"
    :class="computedClasses"
    :style="computedStyles"
    :mode="mode"
    :collapse="collapse"
    :background-color="backgroundColor"
    :box-shadow="boxShadow"
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
import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import { ElMenu } from 'element-ui/types/menu'

import StandardPropsMixin from '../../mixins/StandardPropsMixin'
import { BorderRadius } from '../../types'
import { MenuMode, MenuTrigger } from './consts'

@Component
export default class SMenu extends Mixins(StandardPropsMixin) {
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
   * Menu shadow if it exists
   */
  @Prop({ default: 'none', type: String }) readonly boxShadow!: string
  /**
   * Border radius of button. Possible values: `"big"`, `"medium"`, `"small"`, `"mini"`.
   *
   * By default it's set to `"small"`
   */
  @Prop({ default: BorderRadius.SMALL, type: String }) readonly borderRadius!: string
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

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = ['s-menu']
    if (this.isStandardBorderRadius(this.borderRadius)) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }

  get computedStyles (): object {
    const styles = {} as any
    if (this.boxShadow) {
      styles['--s-menu-box-shadow'] = this.boxShadow
    }
    if (this.activeHoverColor) {
      styles['--s-menu-color-hover'] = this.activeHoverColor
    }
    if (this.textColor) {
      styles['--s-menu-text-color'] = this.textColor
    }
    if (this.activeTextColor) {
      styles['--s-menu-text-color-active'] = this.activeTextColor
    }
    return styles
  }

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
