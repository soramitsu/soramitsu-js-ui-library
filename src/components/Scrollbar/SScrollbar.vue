<template>
  <el-scrollbar
    :native="native"
    :noresize="noresize"
    :tag="tag"
    :view-class="viewClass"
    :view-style="viewStyle"
    :wrap-class="wrapClass"
    :wrap-style="wrapStyle"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import ElScrollbar from 'element-ui/lib/scrollbar'

@Component({
  components: { ElScrollbar }
})
export default class SScrollbar extends Vue {
  /**
   * Native scrollbar.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly native!: boolean
  /**
   * If the container does not resize, it is best to use it to optimize performance.
   *
   * `false` by default
   */
  @Prop({ default: false, type: Boolean }) readonly noresize!: boolean
  /**
   * Tag which represents scrollbar section.
   *
   * `"div"` by default
   */
  @Prop({ type: String, default: 'div' }) readonly tag!: string
  /**
   * CSS class for view section of the scrollbar
   */
  @Prop({ type: String }) readonly viewClass!: string
  /**
   * Inline styles for view section of the scrollbar
   */
  @Prop({ type: [String, Object, Array] }) readonly viewStyle!: string | object | Array<any>
  /**
   * CSS class for wrap section of the scrollbar
   */
  @Prop({ type: String }) readonly wrapClass!: string
  /**
   * Inline styles for wrap section of the scrollbar
   */
  @Prop({ type: [String, Object, Array] }) readonly wrapStyle!: string | object | Array<any>
}
</script>
