<template>
  <el-collapse-item
    :title="title"
    :name="name"
    :disabled="disabled"
    :class="computedClasses"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-collapse-item>
</template>

<script lang="ts">
import { Vue, Component, Prop, Inject } from 'vue-property-decorator'

@Component
export default class SCollapseItem extends Vue {
  /**
   * Title for the panel of collapse item. Slot `title` can be used as well
   */
  @Prop({ default: '', type: String }) readonly title!: string
  /**
   * Unique identification for the panel of the collapse item. It can be `string/number`
   */
  @Prop() readonly name!: string | number
  /**
   * Disable state of the collapse item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean
  /**
   * Will bottom padding be hidden.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly withoutPadding!: boolean

  @Inject({ default: '', from: 'sCollapse' }) sCollapse

  get computedClasses (): Array<string> {
    const cssClasses: Array<string> = []
    if (!(this.sCollapse || {}).borders) {
      cssClasses.push('s-without-border')
    }
    if (this.withoutPadding) {
      cssClasses.push('s-without-padding')
    }
    return cssClasses
  }
}
</script>
