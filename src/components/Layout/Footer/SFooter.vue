<template>
  <el-footer :height="height" class="s-footer">
    <slot></slot>
  </el-footer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElFooter from 'element-ui/lib/footer'

@Component({
  components: { ElFooter }
})
export default class SFooter extends Vue {
  /**
   * Height of the footer component. Default value is `"56px"`.
   *
   * In this context, the value of the height property must match the valid value of the
   * **CSS height** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '56px', type: String }) readonly height!: string
}
</script>
