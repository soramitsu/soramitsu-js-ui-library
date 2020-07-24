<template>
  <el-footer :height="height">
    <slot></slot>
  </el-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class SFooter extends Vue {
  /**
   * Height of the footer component. Default value is `"56px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '56px', type: String }) readonly height!: string
  // TODO: 56px is set because of big size right?
}
</script>

<style lang="scss">
.el-footer {
  padding: 16px;
  box-shadow: 0px 0px 8px rgba(45, 41, 38, 0.2);
  font-size: 18px;
}
</style>
