<template>
  <div class="s-col" :class="computedClasses" :style="computedStyles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SCol extends Vue {
  /**
   * Number of column the grid spans.
   *
   * By default it's set to `12`
   */
  @Prop({ type: Number, default: 12 }) readonly span!: number
  /**
   * Number of spacing on the left side of the grid.
   *
   * By default it's set to `0`
   */
  @Prop({ type: Number, default: 0 }) readonly offset!: number
  /**
   * Number of columns that grid moves to the right.
   *
   * By default it's set to `0`
   */
  @Prop({ type: Number, default: 0 }) readonly push!: number
  /**
   * Number of columns that grid moves to the left.
   *
   * By default it's set to `0`
   */
  @Prop({ type: Number, default: 0 }) readonly pull!: number
  /**
   * `<640px` Responsive columns or column props object
   */
  @Prop() readonly xs!: number | object
  /**
   * `≥640px` Responsive columns or column props object
   */
  @Prop() readonly sm!: number | object
  /**
   * `≥1024px` Responsive columns or column props object
   */
  @Prop() readonly md!: number | object
  /**
   * `≥1200px` Responsive columns or column props object
   */
  @Prop() readonly lg!: number | object
  /**
   * `≥1920px` Responsive columns or column props object
   */
  @Prop() readonly xl!: number | object

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    for (const prop of ['span', 'offset', 'pull', 'push']) {
      if (this[prop] || this[prop] === 0) {
        cssClasses.push(
          prop !== 'span'
            ? `s-col-${prop}-${this[prop]}`
            : `s-col-${this[prop]}`
        )
      }
    }
    for (const size of ['xs', 'sm', 'md', 'lg', 'xl']) {
      if (typeof this[size] === 'number') {
        cssClasses.push(`s-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        const props = this[size]
        Object.keys(props).forEach(prop => {
          cssClasses.push(
            prop !== 'span'
              ? `s-col-${size}-${prop}-${props[prop]}`
              : `s-col-${size}-${props[prop]}`
          )
        })
      }
    }
    return cssClasses
  }

  get gutter (): number {
    let parent = this.$parent as any
    while (parent && parent.$options.name !== 'SRow') {
      parent = parent.$parent
    }
    return parent ? parent.gutter : 0
  }

  get computedStyles (): object {
    const styles = {} as any
    if (this.gutter) {
      styles.paddingLeft = `${this.gutter / 2}px`
      styles.paddingRight = styles.paddingLeft
    }
    return styles
  }
}
</script>
