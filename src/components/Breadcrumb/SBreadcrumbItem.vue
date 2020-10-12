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
