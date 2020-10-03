<template>
  <el-tooltip
    ref="tooltip"
    :effect="theme"
    :content="content"
    :placement="placement"
    v-model="model"
    :disabled="disabled"
    :value="value"
    :offset="offset"
    :transition="animation"
    :visible-arrow="showArrow"
    :open-delay="openDelay"
    :manual="manual"
    :hide-after="closeDelay"
    :tabindex="tabindex"
  >
    <slot slot="content" name="content"></slot>
    <slot></slot>
  </el-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'
import { TooltipEffect } from 'element-ui/types/tooltip'
import { PopoverPlacement } from 'element-ui/types/popover'
import debounce from 'throttle-debounce/debounce'

import { TooltipTheme, TooltipPlacement } from './consts'

@Component
export default class STooltip extends Vue {
  /**
   * Theme of the tooltip. Supported values: `"dark"` or `"light"`.
   *
   * `"dark"` by default
   */
  @Prop({ default: TooltipTheme.DARK, type: String }) readonly theme!: TooltipEffect
  /**
   * Content of the tooltip. You can set content from `content` slot as well
   */
  @Prop({ default: '', type: String }) readonly content!: string
  /**
   * Placement of the tooltip. You can use any value from the `TooltipPlacement` enum.
   *
   * `"top"` by default
   */
  @Prop({ default: TooltipPlacement.TOP, type: String }) readonly placement!: PopoverPlacement
  /**
   * Visibility of the tooltip. You can use `v-model` as well.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly value!: boolean
  /**
   * Whether the tooltip is disabled.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Offset of the tooltip.
   *
   * `0` by default
   */
  @Prop({ default: 0, type: Number }) readonly offset!: number
  /**
   * Animation of the tooltip
   */
  @Prop({ default: 'el-fade-in-linear', type: String }) readonly animation!: string
  /**
   * Flag for showing an arrow.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly showArrow!: boolean
  /**
   * Delay of the tooltip appearance, in millisecond.
   *
   * `0` by default
   */
  @Prop({ default: 0, type: Number }) readonly openDelay!: number
  /**
   * Manual mode of the tooltip. `Mouseenter` and `mouseleave` won't have
   * effects if set to true.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly manual!: boolean
  /**
   * Delay of the tooltip destroying, in millisecond.
   *
   * `0` by default
   */
  @Prop({ default: 0, type: Number }) readonly closeDelay!: number
  /**
   * Tabindex of the tooltip.
   *
   * `0` by default
   */
  @Prop({ default: 0, type: Number }) readonly tabindex!: number

  @Ref('tooltip') tooltip!: any

  model = this.value

  @Watch('value')
  private handlePropChange (value: boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: boolean): void {
    this.$emit('change', value)
  }

  mounted (): void {
    const tooltip = this.tooltip
    if (!tooltip) {
      return
    }
    tooltip.debounceClose = debounce(30, tooltip.handleClosePopper)
  }
}
</script>
