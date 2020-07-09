<template>
  <s-tooltip :content="tooltip" placement="right" :disabled="!tooltip">
    <el-button
      :type="computedType"
      :native-type="nativeType"
      :size="computedSize"
      :class="computedClasses"
      :disabled="disabled"
      :loading="isLoading"
      :autofocus="autofocus"
      :circle="type === ButtonTypes.ACTION"
      :icon="elementIcon"
      @click="handleClick"
    >
      <i v-if="availableIcon" :class="[availableIcon]"></i>
      <slot></slot>
    </el-button>
  </s-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'
import { ElForm } from 'element-ui/types/form'
import { ElFormItem } from 'element-ui/types/form-item'

import { STooltip } from '../Tooltip'
import { ButtonTypes, ButtonSize, ButtonNativeTypes } from './consts'

@Component({
  components: { STooltip }
})
export default class SButton extends Vue {
  readonly ButtonTypes = ButtonTypes

  /**
   * Type of button. Possible values: `"primary"`, `"secondary"`, `"tertiary"`, `"action"`.
   *
   * By default it's set to `"primary"`
   */
  @Prop({ default: ButtonTypes.PRIMARY, type: String }) readonly type!: string
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
   * Loading state. Only `"tertiary"` and `"action"` button cannot have this state
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

  @Inject('elForm') elForm!: ElForm
  @Inject('elFormItem') elFormItem!: ElFormItem

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
    if (this.elForm.size || this.elFormItem.size) {
      cssClasses.push(this.elForm.size || this.elFormItem.size)
    } else if ((Object.values(ButtonSize) as Array<string>).includes(this.size)) {
      cssClasses.push(this.size)
    }
    if ((Object.values(ButtonTypes) as Array<string>).includes(this.type)) {
      cssClasses.push(this.type)
    }
    if (this.isLoading) {
      cssClasses.push('loading')
    }
    if (this.alternative) {
      cssClasses.push('alternative')
    }
    return cssClasses
  }

  get availableIcon (): string {
    if (!this.icon) {
      return ''
    }
    if (this.icon.startsWith('el-')) {
      this.elementIcon = this.icon
      return ''
    }
    // TODO: add checks for invalid icons
    this.elementIcon = ''
    return `s-icon-${this.icon}`
  }

  get isLoading (): boolean {
    if (([ButtonTypes.TERTIARY, ButtonTypes.ACTION] as Array<string>).includes(this.type)) {
      return false
    }
    return this.loading
  }

  handleClick (): void {
    this.$emit('click')
  }
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.loading {
  padding: 12px 17.5px;
  > :not(i) {
    color: transparent;
  }
  i {
    position: absolute;
    left: 43%;
  }
}

.big {
  height: $size-big;
}

.medium {
  height: $size-medium;
}

.small {
  height: $size-small;
}

.primary {
  &:hover, &:active, &:focus {
    background-color: $color-main-hover;
    border-color: $color-main-hover;
  }
  &:disabled, &:disabled:hover {
    background-color: $color-main-inactive;
    border-color: $color-main-inactive;
  }
}

.secondary {
  &:hover, &:active, &:focus {
    color: $color-main-brand;
    background-color: $color-basic-white;
    border-color: $color-main-brand;
  }
  &:disabled, &:disabled:hover {
    color: $color-neutral-inactive;
    border-color: $color-neutral-border;
  }
  &.alternative {
    &:hover, &:active, &:focus {
      color: $color-basic-black;
      background-color: $color-neutral-hover;
      border-color: $color-neutral-hover;
    }
    &:disabled, &:disabled:hover {
      color: $color-neutral-inactive;
      border-color: $color-neutral-border;
    }
  }
}

.tertiary {
  color: $color-basic-black;
  border: none;
  &:hover, &:active, &:focus {
    color: $color-main-brand;
    background-color: $color-basic-white;
  }
  &:disabled, &:disabled:hover {
    color: $color-neutral-inactive;
  }
}

.action {
  &.big {
    width: $size-big;
  }
  &.medium {
    width: $size-medium;
  }
  &.small {
    width: $size-small;
  }
  background-color: $color-neutral-placeholder;
  border-color: $color-neutral-placeholder;
  &:hover, &:active, &:focus, &:disabled { // TODO: ux designers will create this state
    background-color: $color-neutral-placeholder;
    border-color: $color-neutral-placeholder;
  }
  &:disabled:hover {
    background-color: $color-neutral-placeholder;
    border-color: $color-neutral-placeholder;
  }
  &.alternative {
    background-color: $color-basic-white;
    border-color: $color-neutral-border;
    &:hover, &:active, &:focus, &:disabled { // TODO: ux designers will create this state
      background-color: $color-basic-white;
      border-color: $color-neutral-border;
    }
    &:disabled:hover {
      background-color: $color-basic-white;
      border-color: $color-neutral-border;
    }
  }
}

button > span > i {
  top: -10px;
  left: -10px;
}
</style>
