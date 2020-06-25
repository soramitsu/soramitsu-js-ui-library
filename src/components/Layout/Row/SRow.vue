<template>
  <div class="s-row" :class="computedClasses" :style="computedStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import { RowJustify, RowAlignment } from './consts'

@Component
export default class SRow extends Vue {
  @Prop({ type: Number }) readonly gutter!: number
  @Prop({ default: RowJustify.START, type: String }) readonly justify!: string
  @Prop({ default: false, type: Boolean }) readonly flex!: boolean
  @Prop({ default: RowAlignment.TOP, type: String }) readonly align!: string

  get computedStyles (): object {
    const styles = {} as any
    if (this.gutter) {
      styles.marginLeft = `-${this.gutter / 2}px`
      styles.marginRight = styles.marginLeft
    }
    if (this.justify !== RowJustify.START) {
      styles.justifyContent = this.justify !== RowJustify.END ? this.justify : 'flex-end'
    }
    return styles
  }

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (this.flex) {
      cssClasses.push('row-flex')
    }
    if (this.align !== RowAlignment.TOP) {
      cssClasses.push(`row-align-${this.align}`)
    }
    return cssClasses
  }
}
</script>

<style lang="scss">
.row-{
  &flex {
    display: flex;
    &:before,
    &:after {
      display: none;
    }
  }
  &align- {
    &middle {
      align-items: center;
    }
    &bottom {
      align-items: flex-end;
    }
  }
}

@include when(justify-center) {
      justify-content: center;
    }
    @include when(justify-end) {
      justify-content: flex-end;
    }
    @include when(justify-space-between) {
      justify-content: space-between;
    }
    @include when(justify-space-around) {
      justify-content: space-around;
    }

    @include when(align-middle) {
      align-items: center;
    }
    @include when(align-bottom) {
      align-items: flex-end;
    }

</style>
