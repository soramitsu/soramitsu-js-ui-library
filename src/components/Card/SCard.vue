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

import BorderRadiusMixin from '../../mixins/BorderRadiusMixin'
import { CardShadow } from './consts'

@Component
export default class SCard extends Mixins(BorderRadiusMixin) {
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
  @Prop({ default: CardShadow.HOVER, type: String }) readonly shadow!: string
  /**
   * Clickable property of the Card component which means that the user can click on the card
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly clickable!: boolean

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.isStandardBorderRadius) {
      cssClasses.push(`s-border-radius-${this.borderRadius}`)
    }
    if (this.clickable) {
      cssClasses.push('s-clickable')
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
