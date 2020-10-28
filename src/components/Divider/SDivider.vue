<template>
  <el-divider :direction="direction" :content-position="contentPosition">
    <slot></slot>
  </el-divider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { DividerDirection, ContentPosition, DividerType } from './consts'

@Component
export default class SDivider extends Vue {
  /**
   * Divider type property. Can be `"primary"` or `"secondary"`.
   *
   * By default it's set to `"secondary"`
   */
  @Prop({ default: DividerType.SECONDARY, type: String }) readonly type!: string
  /**
   * Divider direction property. Can be `"horizontal"` or `"vertical"`.
   *
   * By default it's set to `"horizontal"`
   */
  @Prop({ default: DividerDirection.HORIZONTAL, type: String }) readonly direction!: string
  /**
   * Position of the content. Can be `"left"`, `"right"` or `"center"`.
   *
   * By default it's set to `"center"`
   */
  @Prop({ default: ContentPosition.CENTER, type: String }) readonly contentPosition!: string

  mounted (): void {
    this.$watch('type', (value) => {
      const el = this.$el as Element
      el.classList.remove('s-divider-primary', 's-divider-secondary')
      el.classList.add(`s-divider-${this.type}`)
    }, { immediate: true })
  }
}
</script>
