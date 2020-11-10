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
import { Vue, Component, Prop } from 'vue-property-decorator'

import { CardShadow, BorderRadius } from './consts'

@Component
export default class SCard extends Vue {
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
   * Border radius of button. Possible values: `"big"`, `"medium"`, `"small"`, `"mini"`.
   *
   * By default it's set to `"small"`
   */
  @Prop({ default: BorderRadius.SMALL, type: String }) readonly borderRadius!: string
  /**
   * Clickable property of the Card component which means that the user can click on the card
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly clickable!: boolean

  get computedBorderRadius (): string {
    if (this.borderRadius === BorderRadius.SMALL ||
      !(Object.values(BorderRadius) as Array<string>).includes(this.borderRadius)) {
      return ''
    }
    return this.borderRadius
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if ((Object.values(BorderRadius) as Array<string>).includes(this.borderRadius)) {
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
