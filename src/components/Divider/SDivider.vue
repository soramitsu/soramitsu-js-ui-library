<template>
  <el-divider :direction="direction" :content-position="contentPosition">
    <slot></slot>
  </el-divider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { DividerDirection, ContentPosition } from './consts'

@Component
export default class SDivider extends Vue {
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
}
</script>
