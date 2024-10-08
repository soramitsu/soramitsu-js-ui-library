<template>
  <el-dropdown
    ref="dropdown"
    :split-button="splitButton"
    :size="computedSize"
    :class="computedClasses"
    :type="computedType"
    :placement="placement"
    :trigger="computedTrigger"
    :hide-on-click="hideOnClick"
    :show-timeout="showTimeout"
    :hide-timeout="hideTimeout"
    :tabindex="tabindexFormatted"
    @click="handleClick"
    @command="handleSelect"
    @visible-change="handleVisibleChange"
    @click.native="handleVisibleEventChange"
  >
    <span v-if="type === DropdownType.DEFAULT || splitButton">
      <slot></slot>
      <i v-if="!splitButton" class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <template v-else>
      <s-button
        v-if="type === DropdownType.BUTTON"
        :type="computedButtonType"
        :size="size"
      >
        <slot></slot>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </s-button>
      <s-tooltip v-else :disabled="!this.$slots.default || willTooltipBeDisabled">
        <s-icon :name="icon" />
        <template slot="content">
          <slot></slot>
        </template>
      </s-tooltip>
    </template>
    <el-dropdown-menu :class="computedPopperClass" :append-to-body="appendToBody">
      <slot name="menu"></slot>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Ref } from 'vue-property-decorator'
import Dropdown from 'element-ui/lib/dropdown'
import DropdownMenu from 'element-ui/lib/dropdown-menu'
import { ElDropdown } from 'element-ui/types/dropdown'

import SizeMixin from '../../../mixins/SizeMixin'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import { ButtonTypes } from '../../Button/consts'
import { SButton } from '../../Button/SButton'
import { Icons24 } from '../../Icon/consts'
import { SIcon } from '../../Icon/SIcon'
import { STooltip } from '../../Tooltip'
import { DropdownType, DropdownPlacement, DropdownTrigger } from '../consts'

@Component({
  components: {
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    SButton,
    SIcon,
    STooltip
  }
})
export default class SDropdown extends Mixins(SizeMixin, BorderRadiusMixin) {
  readonly DropdownType = DropdownType
  /**
   * A type of the dropdown component. Possible values: `"default"`, `"button"`, `"ellipsis"`.
   *
   * By default, it's set to `"default"`
   */
  @Prop({ type: String, default: DropdownType.DEFAULT }) readonly type!: string
  /**
   * An icon for dropdown with `type="ellipsis"`.
   *
   * By default, it's set to `"more-horizontal"`
   */
  @Prop({ type: String, default: Icons24.BasicMoreHorizontal }) readonly icon!: string
  /**
   * Button type of dropdown component. It can be used with `type="button"`.
   * Possible values: `"primary"`, `"secondary"`, `"tertiary"`.
   *
   * By default, it's set to `"secondary"`
   */
  @Prop({ type: String, default: ButtonTypes.SECONDARY }) readonly buttonType!: string
  /**
   * A placement of the popup menu. You can use any value from `DropdownPlacement` enum.
   *
   * By default, it's set to `"bottom"`
   */
  @Prop({ type: String, default: DropdownPlacement.BOTTOM }) readonly placement!: string
  /**
   * A trigger action of the dropdown component. Can be `"hover"` or `"click"`.
   * When dropdown type is "ellipsis", `trigger = "click"`.
   *
   * By default, it's set to `"hover"`
   */
  @Prop({ type: String, default: DropdownTrigger.HOVER }) readonly trigger!: string
  /**
   * Hide menu after clicking menu item.
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: true }) readonly hideOnClick!: boolean
  /**
   * Displayed button group
   *
   * `true` by default
   */
  @Prop({ type: Boolean, default: false }) readonly splitButton!: boolean
  /**
   * Delay time before show the dropdown (only works when trigger is `"hover"`).
   *
   * `250` by default
   */
  @Prop({ type: Number, default: 250 }) readonly showTimeout!: number
  /**
   * Delay time before hide a dropdown (only works when trigger is `"hover"`).
   *
   * `150` by default
   */
  @Prop({ type: Number, default: 150 }) readonly hideTimeout!: number
  /**
   * Tab index of the dropdown component.
   *
   * `0` by default
   */
  @Prop({ type: [Number, String], default: 0 }) readonly tabindex!: number | string
  /**
   * Popper class
   */
  @Prop({ type: String, default: '' }) readonly popperClass!: string
  /**
   * Will the dropdown menu component be appended to body.
   *
   * `true` by default
   */
  @Prop({ default: true, type: Boolean }) readonly appendToBody!: boolean

  @Ref('dropdown') dropdown!: ElDropdown

  willTooltipBeDisabled = false

  get tabindexFormatted (): number {
    return +this.tabindex
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    return cssClasses
  }

  get computedPopperClass (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.type === DropdownType.ELLIPSIS) {
      cssClasses.push('ellipsis')
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if (this.popperClass) {
      cssClasses.push(this.popperClass)
    }
    return cssClasses
  }

  get computedType () {
    if (this.type === DropdownType.BUTTON) {
      return this.computedButtonType
    }
    return ''
  }

  get computedTrigger (): string {
    if (this.type === DropdownType.ELLIPSIS) {
      return DropdownTrigger.CLICK
    }
    if (!(Object.values(DropdownTrigger) as Array<string>).includes(this.trigger)) {
      return DropdownTrigger.HOVER
    }
    return this.trigger
  }

  get computedButtonType (): string {
    if (this.buttonType === ButtonTypes.ACTION ||
      !(Object.values(ButtonTypes) as Array<string>).includes(this.buttonType)) {
      console.warn(`"${this.buttonType}" button type is unsupported! Secondary button type is set.`)
      return ButtonTypes.SECONDARY
    }
    return this.buttonType
  }

  mounted (): void {
    if (this.splitButton) {
      this.$nextTick(() => {
        this.dropdown.$children[0].$children.forEach(button => {
          button.$el.classList.add(`s-${this.size}`, `s-${this.computedButtonType}`)
        })
      })
    }
    if (this.type === DropdownType.ELLIPSIS) {
      this.$watch('$refs.dropdown.visible', (visible) => { this.willTooltipBeDisabled = visible })
    }
  }

  handleClick (): void {
    this.$emit('click')
  }

  handleSelect (command: string): void {
    this.$emit('select', command)
  }

  handleVisibleChange (isAppear: boolean): void {
    this.$emit('visible-change', isAppear)
  }

  handleVisibleEventChange (event: MouseEvent): void {
    event.stopPropagation()
  }
}
</script>
