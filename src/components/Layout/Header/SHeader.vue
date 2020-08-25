<template>
  <el-header :height="height">
    <slot></slot>
  </el-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SHeader extends Vue {
  /**
   * Height of the header component. Default value is `"56px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '56px', type: String }) readonly height!: string
}
</script>

<style lang="scss">
.el-header {
  padding: 12px;
  box-shadow: 0px 0px 8px rgba(45, 41, 38, 0.2);
  font-size: 18px;
  z-index: 1;
}
</style>
