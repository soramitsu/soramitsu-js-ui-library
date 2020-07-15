<template>
  <el-card
    class="s-card"
    :header="header"
    :body-style="bodyStyle"
    :shadow="shadow"
  >
    <slot slot="header" name="header"></slot>
    <slot></slot>
  </el-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

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
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";

.s-card {
  border-radius: 8px;
  border-color: $color-neutral-border;
  &:hover, &:focus {
    border-color: $color-basic-white;
  }
  .el-card__header {
    border-bottom-color: $color-basic-white;
    padding-bottom: 0;
  }
  .el-card__body {
    padding: 18px 20px;
  }
}
</style>
