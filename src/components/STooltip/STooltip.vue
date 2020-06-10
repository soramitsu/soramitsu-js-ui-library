<template>
  <el-tooltip
    ref="tooltip"
    :effect="theme"
    :content="content"
    :placement="placement"
    :disabled="disabled"
  >
    <slot></slot>
    <slot name="content"></slot>
  </el-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { ElTooltip, TooltipEffect } from 'element-ui/types/tooltip'

@Component
export default class STooltip extends Vue {
  @Prop({ default: 'dark', type: String }) readonly theme!: TooltipEffect
  @Prop({ default: '', type: String }) readonly content!: string
  @Prop({ default: 'right', type: String }) readonly placement!: string
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.el-tooltip__popper {
  &.is-dark {
    background-color: $black;
  }
  &.is-light {
    color: $black;
  }
  border-color: $black;
}
</style>
