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
import { PopoverPlacement } from 'element-ui/types/popover'

@Component
export default class STooltip extends Vue {
  @Prop({ default: 'dark', type: String }) readonly theme!: TooltipEffect
  @Prop({ default: '', type: String }) readonly content!: string
  @Prop({ default: 'right', type: String }) readonly placement!: PopoverPlacement
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.el-tooltip__popper {
  &.is-dark {
    background-color: $color-basic-black;
  }
  &.is-light {
    color: $color-basic-black;
  }
  border-color: $color-basic-black;
}
</style>
