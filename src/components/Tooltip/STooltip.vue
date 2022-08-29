<template>
  <el-tooltip
    ref="tooltip"
    :effect="computedTheme"
    :content="content"
    :placement="placement"
    v-model="model"
    :disabled="disabled"
    :value="value"
    :offset="offset"
    :transition="animation"
    :visible-arrow="showArrow"
    :open-delay="openDelay"
    :popper-class="computedPopperClass"
    :manual="manual"
    :hide-after="hideAfter"
    :tabindex="tabindexFormatted"
  >
    <slot slot="content" name="content"></slot>
    <slot></slot>
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Watch, Ref } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { PopoverPlacement } from 'element-ui/types/popover'
import debounce from 'throttle-debounce/debounce'
import ElTooltip from 'element-ui/lib/tooltip'

import DesignSystemInject from '../DesignSystem/DesignSystemInject'
import BorderRadiusMixin from '../../mixins/BorderRadiusMixin'
import Theme from '../../types/Theme'
import { TooltipTheme, TooltipPlacement } from './consts'

@Component({
  components: { ElTooltip }
})
export default class STooltip extends Mixins(BorderRadiusMixin, DesignSystemInject) {
  /**
   * Theme of the tooltip. Supported values: `"dark"`, `"light"`, or `"auto"`.
   * `"auto"` means that it will be managed with theming controller by `setTheme` function
   *
   * `"auto"` is set by default
   */
  @Prop({ default: TooltipTheme.AUTO, type: String }) readonly theme!: string
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
   * `500` by default
   */
  @Prop({ default: 500, type: Number }) readonly openDelay!: number
  /**
   * Custom class name for tooltip's popper
   */
  @Prop({ type: String }) readonly popperClass!: string
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
   * Timeout in milliseconds to hide tooltip after appearing.
   *
   * `0` by default
   */
  @Prop({ default: 0, type: Number }) readonly hideAfter!: number
  /**
   * Tabindex of the tooltip.
   *
   * `0` by default
   */
  @Prop({ default: 0, type: [Number, String] }) readonly tabindex!: number | string

  @Ref('tooltip') tooltip!: any

  @Getter libraryTheme!: Theme

  get tabindexFormatted (): number {
    return +this.tabindex
  }

  get computedPopperClass (): string {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.popperClass) {
      cssClasses.push(this.popperClass)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses.join(' ')
  }

  model = this.value

  @Watch('value')
  private handlePropChange (value: boolean): void {
    this.model = value
  }

  @Watch('model')
  private handleValueChange (value: boolean): void {
    this.$emit('change', value)
  }

  @Watch('closeDelay')
  private handleChangeCloseDelay (value: number): void {
    this.updateCloseDelay(value)
  }

  mounted (): void {
    this.updateCloseDelay(this.closeDelay)
    window.addEventListener('focus', this.handleWindowFocus)
  }

  beforeDestroy (): void {
    window.removeEventListener('focus', this.handleWindowFocus)
  }

  handleWindowFocus () {
    setTimeout(() => {
      if (this.tooltip && this.tooltip.hide) {
        this.tooltip.hide()
      }
    }, this.openDelay)
  }

  get computedTheme (): string {
    if (this.theme === TooltipTheme.AUTO) {
      if (this.libraryTheme) {
        return this.libraryTheme
      } else {
        throw new Error('Please provide a storage for the ui-library')
      }
    }
    return this.theme
  }

  updateCloseDelay (value: number): void {
    const tooltip = this.tooltip
    if (!tooltip) {
      return
    }
    tooltip.debounceClose = debounce(value, tooltip.handleClosePopper)
  }
}
</script>
