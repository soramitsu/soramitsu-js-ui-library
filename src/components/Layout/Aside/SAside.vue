<template>
  <el-aside :width="width">
    <slot></slot>
  </el-aside>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElAside from 'element-ui/lib/aside'

@Component({
  components: { ElAside }
})
export default class SAside extends Vue {
  /**
   * Width of aside component. Default value is `"196px"`.
   *
   * In this context, the value of the width property must match the valid value of the
   * **CSS width** property. For instance, `"auto"`, `"200px"`, `"100vh"` etc.
   */
  @Prop({ default: '196px', type: String }) readonly width!: string
}
</script>
