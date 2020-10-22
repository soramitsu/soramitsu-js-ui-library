<template>
  <el-menu-item
    class="s-flex"
    :index="index"
    :route="route"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-menu-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ElMenuItem } from 'element-ui/types/menu-item'

@Component
export default class SMenuItem extends Vue {
  /**
   * Unique index of menu item
   */
  @Prop({ default: '', type: String }) readonly index!: string
  /**
   * Vue Router object
   */
  @Prop({ type: Object }) readonly route!: object
  /**
   * Disabled state of menu item.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly disabled!: boolean

  handleClick (instance: ElMenuItem): void {
    this.$emit('click', instance)
  }
}
</script>
