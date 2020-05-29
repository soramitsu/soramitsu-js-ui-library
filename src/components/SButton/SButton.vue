<template>
  <el-tooltip :content="tooltip" placement="right" :disabled="!tooltip">
    <el-button
      :type="computedType"
      :size="computedSize"
      :class="computedClasses"
      :disabled="disabled"
      :circle="type === ButtonTypes.TERTIARY"
      @click="handleClick"
    >
      <i v-if="availableIcon" :class="[availableIcon]"></i>
      <slot></slot>
    </el-button>
  </el-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { ButtonTypes, ButtonSize } from './consts'

@Component
export default class SButton extends Vue {
  readonly ButtonTypes = ButtonTypes

  /**
   * Type of button. Possible values: "primary", "secondary", "tertiary".
   * By default it's set to "primary"
   */
  @Prop({ default: ButtonTypes.PRIMARY }) readonly type!: string
  /**
   * Size of button. Possible values: "big", "medium", "small".
   * By default it's set to "big"
   */
  @Prop({ default: ButtonSize.BIG }) readonly size!: string
  /**
   * Icon name from icon collection of this library
   */
  @Prop({ default: '' }) readonly icon!: string
  /**
   * Disable state
   */
  @Prop({ default: false }) readonly disabled!: boolean
  /**
   * Tooltip
   */
  @Prop({ default: '' }) readonly tooltip!: string
  /**
   * Error
   */
  @Prop({ default: '' }) readonly error!: string

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
    return cssClasses
  }

  get availableIcon (): string {
    if (!this.icon) {
      return ''
    }
    // TODO: add checks for invalid icons
    return `icon-${this.icon}`
  }

  handleClick (): void {
    this.$emit('click')
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.primary {
  &:disabled {
    background-color: $pink-disabled;
    border-color: $pink-disabled;
  }
}

.secondary {
  color: $black;
  &:disabled {
    color: $gray3;
    border-color: $gray1;
  }
  &:hover, &:active, &:focus {
    color: $black;
    background-color: $gray;
    border-color: $gray9;
  }
}

.tertiary {
  color: $black;
  background-color: $gray;
  border-color: $gray;
  &:hover, &:active, &:focus, &:disabled { // TODO: ask about disabled
    color: $black;
    background-color: $gray;
    border-color: $gray;
  }
}

button > span > i {
  top: -10px;
  left: -10px; // TODO: need to set relative paddings
}
// red secondary - delete button. only secondary can be delete button
// add loading state for primary secondary
// disabled without focus
// fix size, big 48, medium and small ...
// fix colors name like primary, secondary etc.
</style>
