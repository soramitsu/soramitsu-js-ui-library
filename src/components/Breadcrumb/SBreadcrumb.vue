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
