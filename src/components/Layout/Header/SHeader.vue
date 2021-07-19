<template>
  <el-header :height="height" class="s-header">
    <slot></slot>
  </el-header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElHeader from 'element-ui/lib/header'

@Component({
  components: { ElHeader }
})
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
