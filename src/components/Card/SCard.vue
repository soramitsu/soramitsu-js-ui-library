<template>
  <el-card
    class="s-card"
    :class="{ clickable }"
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

import { CardShadow } from './consts'

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
   * Clickable property of the Card component which means that the user can click on the card
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly clickable!: boolean

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

<style lang="scss">
@import "../../styles/variables.scss";

.s-card {
  color: $s-color-basic-black;
  border-radius: 8px;
  border-color: $s-color-neutral-border;
  &.clickable {
    cursor: pointer;
  }
  &:hover, &:focus {
    border-color: $s-color-basic-white;
  }
  .el-card__header {
    border-bottom-color: $s-color-basic-white;
    padding-bottom: 0;
    text-align: left;
  }
  .el-card__body {
    padding: 18px 20px;
  }
}
</style>
