<template>
  <el-dropdown
    ref="dropdown"
    :split-button="splitButton"
    :size="computedSize"
    :type="computedType"
    :placement="placement"
    :trigger="trigger"
    :hide-on-click="hideOnClick"
    :show-timeout="showTimeout"
    :hide-timeout="hideTimeout"
    :tabindex="tabindex"
    @click="handleClick"
    @command="handleSelect"
    @visible-change="handleVisibleChange"
  >
    <slot v-if="![DropdownType.BUTTON, DropdownType.ELLIPSIS].includes(type) || splitButton"></slot>
    <template v-else>
      <s-button
        v-if="type === DropdownType.BUTTON"
        :type="buttonType"
        :size="size"
      >
        <slot></slot>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </s-button>
      <s-tooltip>

      </s-tooltip>
    </template>
    <el-dropdown-menu>
      <slot name="menu"></slot>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref } from 'vue-property-decorator'
import { ElDropdown } from 'element-ui/types/dropdown'

import { DropdownType, DropdownSize, DropdownPlacement, DropdownTrigger } from './consts'
import { ButtonTypes } from '../Button'
import { SButton, STooltip } from '../../components'

@Component({
  components: { SButton, STooltip }
})
export default class SDropdown extends Vue {
  readonly DropdownType = DropdownType
  /**
   * A type of the dropdown component. Possible values: `"default"`, `"button"`, `"ellipsis"`.
   *
   * By default, it's set to `"default"`
   */
  @Prop({ type: String, default: DropdownType.DEFAULT }) readonly type!: string
  /**
   * Button type of dropdown component. It can be used with `type="button"`.
   * Possible values: `"primary"`, `"secondary"`, `"tertiary"`.
   *
   * By default, it's set to `"secondary"`
   */
  @Prop({ type: String, default: ButtonTypes.SECONDARY }) readonly buttonType!: string
  /**
   * A size of the dropdown items. Possible values: `"big"`, `"medium"`, `"small"`.
   * It affects on the button size if `type="button"` as well.
   *
   * By default, it's set to `"big"`
   */
  @Prop({ type: String, default: DropdownSize.BIG }) readonly size!: string
  /**
   * A placement of the popup menu. You can use any value from `DropdownPlacement` enum.
   *
   * By default, it's set to `"bottom-end"`
   */
  @Prop({ type: String, default: DropdownPlacement.BOTTOM_END }) readonly placement!: string
  /**
   * A trigger action of the dropdown component. Can be `"hover"` or `"click"`.
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
  @Prop({ type: Number, default: 0 }) readonly tabindex!: number

  @Ref('dropdown') dropdown!: ElDropdown

  get computedType () {
    if (this.type === DropdownType.BUTTON) {
      return this.computedButtonType
    }
    return ''
  }

  get computedSize (): string {
    if (this.size === DropdownSize.BIG ||
      !(Object.values(DropdownSize) as Array<string>).includes(this.size)) {
      return ''
    }
    return this.size
  }

  get computedButtonType (): string {
    if (this.buttonType === ButtonTypes.ACTION) {
      console.warn(`"${this.buttonType}" button type is unsupported! Secondary button type is set.`)
      return ButtonTypes.SECONDARY
    }
    return this.buttonType
  }

  mounted (): void {
    this.$nextTick(() => {
      if (this.splitButton) {
        this.dropdown.$children[0].$children.forEach(button => {
          button.$el.classList.add(this.size, this.computedButtonType)
        })
      }
    })
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
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.el-dropdown {
  > .el-button-group {
    > .el-button {
      float: left;
    }
    .el-dropdown__caret-button {
      &.secondary {
        &::before {
          background-color: $color-neutral-border;
        }
        &:hover, &:active, &:focus {
          &::before {
            background-color: $color-main-brand;
          }
        }
      }
      &.tertiary {
        &::before {
          background-color: transparent;
        }
        &:hover, &:active, &:focus {
          &::before {
            background-color: transparent;
          }
        }
      }
    }
  }
}
</style>
