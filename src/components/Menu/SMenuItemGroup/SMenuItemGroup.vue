<template>
  <el-menu-item-group :title="title">
    <slot slot="title" name="title"></slot>
    <slot></slot>
  </el-menu-item-group>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ElMenuItemGroup from 'element-ui/lib/menu-item-group'

@Component({
  components: { ElMenuItemGroup }
})
export default class SMenuItemGroup extends Vue {
  /**
   * Title for group menu items
   */
  @Prop({ default: '', type: String }) readonly title!: string
}
</script>
