<template>
  <el-menu-item
    class="flex"
    :style="computedStyles"
    :index="index"
    :route="route"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-menu-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import { ElMenuItem } from 'element-ui/types/menu-item'

@Component
export default class SMenuItem extends Vue {
  /**
   * Unique index of menu item
   */
  @Prop({ default: '', type: String }) readonly index!: string
  /**
   * Vue Router object
   */
  @Prop({ type: Object }) readonly route!: object
  /**
   * Disabled state of menu item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

  @Inject('sMenu') sMenu

  get computedStyles (): object {
    const styles = {} as any
    if (this.sMenu.activeHoverColor) {
      styles['--s-menu-color-hover'] = this.sMenu.activeHoverColor
    }
    return styles
  }

  handleClick (instance: ElMenuItem): void {
    this.$emit('click', instance)
  }
}
</script>

<style lang="scss">
.el-menu-item {
  align-items: center;
  border-radius: 6px;
  &:not(.is-disabled):hover,
  &.is-active {
    background-color: var(--s-menu-color-hover) !important;
    border-bottom-color: var(--s-menu-color-hover) !important;
  }
  [class^=s-icon-] {
    margin-right: 12px;
  }
}
</style>
