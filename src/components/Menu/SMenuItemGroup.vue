<template>
  <el-menu-item-group :title="title">
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-menu-item-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SMenuItemGroup extends Vue {
  /**
   * Title for group menu items
   */
  @Prop({ default: '', type: String }) readonly title!: string
}
</script>

<style lang="scss">
.el-menu-item-group > ul > .el-menu-item:not(:last-child),
.el-menu-item-group__title {
  margin-bottom: 8px;
}
</style>
