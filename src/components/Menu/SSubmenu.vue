<template>
  <el-submenu
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
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SSubmenu extends Vue {
  // TODO: An error is occurred due to this issue: https://github.com/ElemeFE/element/issues/17960
  // To fix it, popper-append-to-body=false is set

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
}
</script>
