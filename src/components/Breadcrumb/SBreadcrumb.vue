<template>
  <el-breadcrumb :separator="separator">
    <slot></slot>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SBreadcrumb extends Vue {
  /**
   * Separator character of the breadcrumb component
   */
  @Prop({ default: '/', type: String }) readonly separator!: string
}
</script>

<style lang="scss">
@import "../../styles/variables.scss";
.el-breadcrumb__separator {
  color: $s-color-neutral-secondary;
  font-weight: normal;
}
</style>
