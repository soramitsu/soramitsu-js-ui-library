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
      :circle="type === ButtonTypes.ACTION && rounded"
      :icon="elementIcon"
      @click="handleClick"
    >
      <s-icon v-if="availableIcon" :name="availableIcon" />
      <slot></slot>
    </el-button>
  </s-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { ElFormItem } from 'element-ui/types/form-item'
import { PopoverPlacement } from 'element-ui/types/popover'

import { SIcon } from '../Icon'
import { STooltip, TooltipPlacement } from '../Tooltip'
import { ButtonTypes, ButtonSize, ButtonNativeTypes } from './consts'

@Component({
  components: { SIcon, STooltip }
})
export default class SButton extends Vue {
  readonly ButtonTypes = ButtonTypes
  /**
   * Type of button. Possible values: `"primary"`, `"secondary"`, `"tertiary"`, `"action"`, `"link"`.
   *
   * By default it's set to `"primary"`
   */
  @Prop({ default: ButtonTypes.PRIMARY, type: String }) readonly type!: string
  /**
   * Rounded property for `type="action"` buttons.
   *
   * By default it's set to `false`
   */
  @Prop({ default: false, type: Boolean }) readonly rounded!: boolean
  /**
   * Size of button. Possible values: `"big"`, `"medium"`, `"small"`.
   *
   * By default it's set to `"big"`
   */
  @Prop({ default: ButtonSize.BIG, type: String }) readonly size!: string
  /**
   * Icon name from icon collection of this library
   */
  @Prop({ default: '', type: String }) readonly icon!: string
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

  get computedSize (): string {
    if (this.size === ButtonSize.BIG ||
      !(Object.values(ButtonSize) as Array<string>).includes(this.size)) {
      return ''
    }
    return this.size
  }

  get computedType (): string {
    if (this.type === ButtonTypes.PRIMARY) {
      return this.type
    }
    return 'plain'
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    // TODO: change to `s-${size}`
    if ((this.elForm || this.elFormItem || {}).size) {
      cssClasses.push((this.elForm || this.elFormItem).size)
    } else if ((Object.values(ButtonSize) as Array<string>).includes(this.size)) {
      cssClasses.push(this.size)
    }
    if ((Object.values(ButtonTypes) as Array<string>).includes(this.type)) {
      cssClasses.push(`s-${this.type}`)
    }
    if (this.isLoading) {
      cssClasses.push('s-loading')
    }
    if (this.alternative) {
      cssClasses.push('s-alternative')
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

  get isLoading (): boolean {
    if (([ButtonTypes.LINK, ButtonTypes.ACTION] as Array<string>).includes(this.type)) {
      return false
    }
    return this.loading
  }

  handleClick (): void {
    this.$emit('click')
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

<style lang="scss">
@import "../../styles/variables.scss";

.s-loading {
  padding: 12px 17.5px;
  i {
    position: absolute;
    left: var(--s-button-loading-left);
  }
  &.small {
    padding: 9px 15px;
    i {
      left: calc(var(--s-button-loading-left) + 2px);
    }
  }
  > :not(i) {
    color: transparent;
  }
}

.s-primary {
  &:hover, &:active, &:focus {
    background-color: $color-main-hover;
    border-color: $color-main-hover;
  }
  &:disabled, &:disabled:hover {
    background-color: $color-main-inactive;
    border-color: $color-main-inactive;
  }
}

.s-secondary {
  &:hover, &:active, &:focus {
    color: $color-main-brand;
    background-color: $color-basic-white;
    border-color: $color-main-brand;
  }
  &:disabled, &:disabled:hover {
    color: $color-neutral-inactive;
    border-color: $color-neutral-border;
  }
  &.s-alternative {
    &:hover, &:active, &:focus {
      color: $color-basic-black;
      background-color: $color-neutral-hover;
      border-color: $color-neutral-hover;
    }
    &:disabled, &:disabled:hover {
      color: $color-neutral-inactive;
      border-color: $color-neutral-border;
      background-color: $color-basic-white;
    }
  }
}

.s-link {
  color: $color-basic-black;
  border: none;
  background-color: transparent;
  &:hover, &:active, &:focus {
    color: $color-main-brand;
    background-color: transparent;
  }
  &:disabled, &:disabled:hover {
    color: $color-neutral-inactive;
  }
}

.s-tertiary {
  color: $color-basic-black;
  border-color: $color-neutral-placeholder;
  background-color: $color-neutral-placeholder;
  &:hover, &:active, &:focus {
    color: $color-main-brand;
    background-color: $color-neutral-placeholder;
    border-color: $color-neutral-placeholder;
  }
  &:disabled, &:disabled:hover {
    color: $color-neutral-inactive;
    background-color: $color-neutral-placeholder;
    border-color: $color-neutral-placeholder;
  }
}

.s-action {
  &.big {
    width: $size-big;
    padding: 12px;
    i {
      font-size: 20px;
    }
  }
  &.medium {
    width: $size-medium;
    padding: 10px;
    i {
      font-size: 18px;
    }
  }
  &.small {
    width: $size-small;
    padding: 9px;
    i {
      font-size: 16px;
      margin-left: -2px;
      margin-top: -2px;
    }
  }
  color: $color-basic-black;
  background-color: $color-neutral-placeholder;
  border-color: $color-neutral-placeholder;
  border-radius: 8px;
  &:hover, &:active, &:focus, &:disabled, &:disabled:hover {
    color: $color-basic-black;
    background-color: $color-neutral-hover;
    border-color: $color-neutral-hover;
  }
  &:disabled, &:disabled:hover {
    color: $color-neutral-inactive;
  }
  &.s-alternative {
    background-color: $color-basic-white;
    border-color: $color-neutral-border;
    &:hover, &:active, &:focus, &:disabled, &:disabled:hover {
      color: $color-basic-black;
      background-color: $color-neutral-placeholder;
      border-color: $color-neutral-placeholder;
    }
    &:disabled, &:disabled:hover {
      color: $color-neutral-inactive;
    }
  }
}

button {
  > span > i {
    &[class^=s-icon-], &[class^=el-icon-] {
      display: inline-block;
      color: inherit;
    }
  }
  &:not(.s-action) > span > i {
    &[class^=s-icon-], &[class^=el-icon-] {
      margin-right: 6px;
    }
  }
}
</style>
