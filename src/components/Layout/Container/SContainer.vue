<template>
  <el-container :direction="computedDirection">
    <slot></slot>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { ContainerDirection } from './consts'

@Component
export default class SContainer extends Vue {
  /**
   * Layout direction property. Can be `"horizontal"` or `"vertical"`.
   *
   * By default it's set to `"vertical"` when nested with `s-header` or `s-footer`;
   * `"horizontal"` otherwise
   */
  @Prop({ default: '', type: String }) readonly direction!: string

  get computedDirection (): string {
    if (this.direction) {
      return this.direction
    }
    if (!(this.$slots && this.$slots.default)) {
      return ContainerDirection.HORIZONTAL
    }
    const isVertical = this.$slots.default.some(vnode => {
      const tag = vnode.componentOptions && vnode.componentOptions.tag
      return tag === 's-header' || tag === 's-footer'
    })
    return isVertical ? ContainerDirection.VERTICAL : ContainerDirection.HORIZONTAL
  }
}
</script>
