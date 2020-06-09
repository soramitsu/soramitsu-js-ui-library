<template>
  <el-tooltip :content="tooltip" placement="right" :disabled="!tooltip">
    <el-button
      :type="computedType"
      :native-type="nativeType"
      :size="computedSize"
      :class="computedClasses"
      :disabled="disabled"
      :loading="isLoading"
      :autofocus="autofocus"
      :circle="type === ButtonTypes.TERTIARY"
      :icon="elementIcon"
      @click="handleClick"
    >
      <i v-if="availableIcon" :class="[availableIcon]"></i>
      <slot></slot>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { ButtonTypes, ButtonSize, ButtonNativeTypes } from './consts'

@Component
export default class SButton extends Vue {
  readonly ButtonTypes = ButtonTypes

  /**
   * Type of button. Possible values: "primary", "secondary", "tertiary", "delete".
   * By default it's set to "primary"
   */
  @Prop({ default: ButtonTypes.PRIMARY, type: String }) readonly type!: string
  /**
   * Size of button. Possible values: "big", "medium", "small".
   * By default it's set to "big"
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
   * Loading state. Only "tertiary" button cannot have this state
   *
   * If you use `loading` state for one button, for instance, [Send][Cancel], and "send" button sent
   * request to back-end side, you should use `loading` state ONLY for "send" button and apply this flag
   * to "cancel" button `disabled` state. So, if "send" has `loading` state, "cancel" should be `disabled`
   */
  @Prop({ default: false, type: Boolean }) readonly loading!: boolean
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
    if ((Object.values(ButtonSize) as Array<string>).includes(this.size)) {
      cssClasses.push(this.size)
    }
    if ((Object.values(ButtonTypes) as Array<string>).includes(this.type)) {
      cssClasses.push(this.type)
    }
    if (this.isLoading) {
      cssClasses.push('loading')
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
    return `icon-${this.icon}`
  }

  get isLoading (): boolean {
    if (this.type === ButtonTypes.TERTIARY) {
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
@import "~@/styles/variables.scss";

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
  height: $big-size;
}

.medium {
  height: $medium-size;
}

.small {
  height: $small-size;
}

.primary {
  &:disabled {
    background-color: $pink-disabled;
    border-color: $pink-disabled;
    &:hover {
      background-color: $pink-disabled;
      border-color: $pink-disabled;
    }
  }
}

.secondary {
  &:hover, &:active, &:focus {
    color: $black;
    background-color: $gray;
    border-color: $gray9;
  }
  &:disabled {
    color: $gray3;
    border-color: $gray1;
    &:hover {
      color: $gray3;
      border-color: $gray1;
    }
  }
}

.tertiary {
  &.big {
    width: $big-size;
  }
  &.medium {
    width: $medium-size;
  }
  &.small {
    width: $small-size;
  }
  background-color: $gray;
  border-color: $gray;
  &:hover, &:active, &:focus, &:disabled { // TODO: ux designers will create this state
    background-color: $gray;
    border-color: $gray;
  }
  &:disabled:hover {
    background-color: $gray;
    border-color: $gray;
  }
}

.delete {
  color: $error;
  border-color: $error;
  &:disabled {
    color: $pink-disabled;
    border-color: $pink-disabled;
    &:hover {
      color: $pink-disabled;
      border-color: $pink-disabled;
    }
  }
}

button > span > i {
  top: -10px;
  left: -10px;
}
</style>
