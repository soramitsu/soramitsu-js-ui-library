<template>
  <el-breadcrumb-item
    :to="to"
    :replace="replace"
  >
    <slot></slot>
  </el-breadcrumb-item>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SBreadcrumbItem extends Vue {
  /**
   * Target route of the link, same as to of `vue-router`
   */
  @Prop({ default: '' }) readonly to!: any
  /**
   * If `true`, the navigation will not leave a history record.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly replace!: boolean
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.el-breadcrumb__inner {
  color: $color-neutral-secondary;
  &.is-link {
    color: $color-neutral-secondary;
    font-weight: normal;
  }
}
.el-breadcrumb__item:last-child {
  pointer-events: none;
}
</style>
