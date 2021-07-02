<template>
  <el-card
    class="s-card"
    :class="computedClasses"
    :header="header"
    :body-style="bodyStyle"
    :shadow="shadow"
  >
    <slot slot="header" name="header"></slot>
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator'

import { DesignSystemInject } from '../../DesignSystem'
import BorderRadiusMixin from '../../../mixins/BorderRadiusMixin'
import SizeMixin from '../../../mixins/SizeMixin'
import StatusMixin from '../../../mixins/StatusMixin'
import { CardShadow } from '../consts'
import { BorderRadius } from '../../../types'

@Component
export default class SCard extends Mixins(BorderRadiusMixin, SizeMixin, StatusMixin, DesignSystemInject) {
  /**
   * Header of the card. Also it can be set by slot#header
   */
  @Prop({ type: String }) readonly header!: string
  /**
   * CSS style of a body of the card.
   *
   * For instance, `{ padding: '20px' }`
   */
  @Prop({ type: Object }) readonly bodyStyle!: string
  /**
   * When to show card shadow
   *
   * By default, it's set to `"hover"`
   */
  @Prop({ default: CardShadow.NEVER, type: String }) readonly shadow!: string
  /**
   * Clickable property of the Card component which means that the user can click on the card
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly clickable!: boolean

  @Prop({ default: BorderRadius.MEDIUM }) borderRadius!: string
  /**
   * Does card should looks like it's under surface (inner shadow)
   */
  @Prop({ default: false, type: Boolean }) readonly pressed!: boolean
  /**
   * Should it be a main card (app content wrapper)
   */
  @Prop({ default: false, type: Boolean }) readonly primary!: boolean

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.designSystemClass) {
      cssClasses.push(this.designSystemClass)
    }
    if (this.statusClass) {
      cssClasses.push(this.statusClass)
    }
    if (this.isStandardSize) {
      cssClasses.push(`s-size-${this.size}`)
    }
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if (this.clickable) {
      cssClasses.push('s-clickable')
    }
    if (this.primary) {
      cssClasses.push('s-primary')
    }
    if (this.pressed) {
      cssClasses.push('s-pressed')
    }
    return cssClasses
  }

  handleClick (): void {
    if (!this.clickable) {
      return
    }
    this.$emit('click')
  }

  mounted (): void {
    this.$el.addEventListener('click', this.handleClick)
  }

  destroyed (): void {
    this.$el.removeEventListener('click', this.handleClick)
  }
}
</script>
