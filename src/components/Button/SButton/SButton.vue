<template>
  <s-tooltip :content="tooltip" :disabled="!tooltip" :placement="tooltipPlacement">
    <el-button
      :type="computedType"
      :native-type="nativeType"
      :size="computedSize"
      :class="computedClasses"
      :style="computedStyles"
      :disabled="disabled"
      :loading="isLoading"
      :autofocus="autofocus"
      :circle="isRounded"
      :icon="elementIcon"
      @click="handleClick"
    >
      <s-icon v-if="availableIcon && iconPosition === IconPosition.LEFT" :name="availableIcon" />
      <slot></slot>
      <s-icon v-if="availableIcon && iconPosition === IconPosition.RIGHT" :name="availableIcon" />
    </el-button>
  </s-tooltip>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Inject } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { ElFormItem } from 'element-ui/types/form-item'
import { PopoverPlacement } from 'element-ui/types/popover'

import { DesignSystemInject } from '../../DesignSystem'
import SizeMixin from '../../../mixins/SizeMixin'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import { SIcon } from '../../Icon'
import { STooltip, TooltipPlacement } from '../../Tooltip'
import { ButtonTypes, ButtonNativeTypes, ButtonIconPosition } from '../consts'

@Component({
  components: { SIcon, STooltip }
})
export default class SButton extends Mixins(SizeMixin, BorderRadiusMixin, DesignSystemInject) {
  readonly IconPosition = ButtonIconPosition
  readonly ButtonTypes = ButtonTypes
  /**
   * Type of button. Possible values: `"primary"`, `"secondary"`, `"tertiary"`, `"action"`, `"link"`.
   *
   * By default it's set to `"secondary"`
   */
  @Prop({ default: ButtonTypes.SECONDARY, type: String }) readonly type!: string
  /**
   * Rounded property for `type="action"` buttons.
   *
   * By default it's set to `false`
   */
  @Prop({ default: false, type: Boolean }) readonly rounded!: boolean
  /**
   * Icon name from icon collection of this library
   */
  @Prop({ default: '', type: String }) readonly icon!: string
  /**
   * Icon position within the text. Possible values: `"left"`, `"right"`.
   *
   * By default it's set to `"left"`
   */
  @Prop({ default: ButtonIconPosition.LEFT, type: String }) readonly iconPosition!: string
  /**
   * Disable state
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Loading state. Only `"link"` and `"action"` button cannot have this state
   *
   * If you use `loading` state for one button, for instance, [Send][Cancel], and "send" button sent
   * request to back-end side, you should use `loading` state ONLY for "send" button and apply this flag
   * to "cancel" button `disabled` state. So, if "send" has `loading` state, "cancel" should be `disabled`
   */
  @Prop({ default: false, type: Boolean }) readonly loading!: boolean
  /**
   * Alternative view of button. Some button types like `"secondary"` have another view.
   * If you set `alternative = true`, you will see the another view.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly alternative!: boolean
  /**
   * Autofocus property, same as native button's `autofocus`
   */
  @Prop({ default: false, type: Boolean }) readonly autofocus!: boolean
  /**
   * Tooltip
   */
  @Prop({ default: '', type: String }) readonly tooltip!: string
  /**
   * Button's native type. Possible values: "button", "submit", "reset".
   * By default it's set to "button"
   */
  @Prop({ default: ButtonNativeTypes.BUTTON, type: String }) readonly nativeType!: string
  /**
   * Button tabindex
   */
  @Prop({ default: '0', type: String }) readonly tabindex!: string
  /**
   * Placement of the tooltip. You can use any value from the `TooltipPlacement` enum.
   *
   * `"top"` by default
   */
  @Prop({ default: TooltipPlacement.TOP, type: String }) readonly tooltipPlacement!: PopoverPlacement

  @Inject({ default: '', from: 'elForm' }) elForm!: ElForm
  @Inject({ default: '', from: 'elFormItem' }) elFormItem!: ElFormItem

  private iconLeftOffset = 0
  elementIcon = ''
  pressed = false

  get computedType (): string {
    if (this.type === ButtonTypes.PRIMARY) {
      return this.type
    }
    return 'plain'
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if ((this.elForm || this.elFormItem || {}).size) {
      cssClasses.push(`s-${(this.elForm || this.elFormItem).size}`)
    } else if (this.isStandardSize) {
      cssClasses.push(`s-${this.size}`)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if ((Object.values(ButtonTypes) as Array<string>).includes(this.type)) {
      cssClasses.push(`s-${this.type}`)
    }
    if (!!this.availableIcon && (Object.values(ButtonIconPosition) as Array<string>).includes(this.iconPosition)) {
      cssClasses.push(`s-i-position-${this.iconPosition}`)
    }
    if (this.isLoading) {
      cssClasses.push('s-loading')
    }
    if (this.alternative) {
      cssClasses.push('s-alternative')
    }
    if (this.pressed) {
      cssClasses.push('s-pressed')
    }
    return cssClasses
  }

  get computedStyles () {
    const styles = {} as any
    if (this.loading) {
      styles['--s-button-loading-left'] = `${this.iconLeftOffset}px`
    }
    return styles
  }

  get availableIcon (): string {
    if (!this.icon) {
      return ''
    }
    if (this.icon.startsWith('el-')) {
      this.elementIcon = this.icon
      return ''
    }
    this.elementIcon = ''
    return this.icon
  }

  get isRounded (): boolean {
    if (([ButtonTypes.LINK, ButtonTypes.ACTION] as Array<string>).includes(this.type)) return false

    return this.rounded
  }

  get isLoading (): boolean {
    if (([ButtonTypes.LINK, ButtonTypes.ACTION] as Array<string>).includes(this.type) || this.isRounded) {
      return false
    }
    return this.loading
  }

  handleClick (event): void {
    this.$emit('click', event)
    this.pressed = true
    setTimeout(() => {
      this.pressed = false
    }, 500)
  }

  mounted (): void {
    this.$el.setAttribute('tabindex', this.tabindex)
    this.$watch('loading', (value) => {
      if (!value) {
        return
      }
      const el = this.$el.querySelector('span') as HTMLSpanElement
      this.iconLeftOffset = el.offsetLeft + (el.offsetWidth / 2) - 10
    }, { immediate: true })
  }
}
</script>
